#!/bin/bash

echo "Setup in progress!"

cd /home/OpenDF

# Command for generating a 16-character pseudo-random password using $RANDOM as source
RAN_PW="echo -n $RANDOM | md5sum | base64 | head -c 16"

# Set environment variables (or get them from docker if possible)
SLEUTHKIT_REPO=${SLEUTHKIT_REPO:-"https://github.com/sleuthkit/sleuthkit.git"}

MYSQL_USER=${MYSQL_USER:-"root"}
MYSQL_PW=${MYSQL_PW:-"$(eval $RAN_PW)"}

OPENDF_DB_USER=${OPENDF_DB_USER:-"OpenDFU"}
OPENDF_DB_PW=${OPENDF_DB_PW:-"$(eval $RAN_PW)"}

echo "Installing tools!"
# Install maven, mysql, automake, libtool, libstdc++, make
# The following two lines prevent mysql from asking for a password (it will be set to $MYSQL_PASS)
echo mysql-server mysql-server/root_password password $MYSQL_PW | debconf-set-selections
echo mysql-server mysql-server/root_password_again password $MYSQL_PW | debconf-set-selections
apt-get -y install maven mysql-server mysql-client automake libtool build-essential

echo "Building OpenDF!"
# Build OpenDF
mvn install:install-file -Dfile=sleuthkit/bindings/java/dist/Tsk_DataModel.jar \
-DgroupId=org.sleuthkit -DartifactId=Tsk_DataModel -Dversion=4.1.3 -Dpackaging=jar

# Replace database username and password in glassfish-resources.xml
(cd OpenDF-web; mvn replacer:replace)

mvn clean install

echo "Setting up mysql!"
# Setting up mysql
service mysql start
mysql -u $MYSQL_USER --password="$MYSQL_PW" --execute="CREATE DATABASE IF NOT EXISTS OpenDF;"
mysql -u $MYSQL_USER --password="$MYSQL_PW" --execute="CREATE USER '${OPENDF_DB_USER}'@'localhost' IDENTIFIED BY '${OPENDF_DB_PW}';"
mysql -u $MYSQL_USER --password="$MYSQL_PW" --execute="GRANT ALL PRIVILEGES ON OpenDF.* TO '${OPENDF_DB_USER}'@'localhost';"
mysql -u $MYSQL_USER --password="$MYSQL_PW" OpenDF < db/OpenDF.sql

echo "Building dependencies!"
# Build dependencies
# Not using the build_sleuthkit script here as it is interactive
git clone $SLEUTHKIT_REPO sleuthkit_recent
cd sleuthkit_recent
./bootstrap
./configure
make
make install
cd ..

echo "Setting up Glashfish server!"
asadmin restart-domain
wget http://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.38.zip
unzip mysql-connector-java-5.1.38.zip
asadmin add-library --type ext mysql-connector-java-5.1.38/mysql-connector-java-5.1.38-bin.jar
asadmin restart-domain  domain1

echo "Deploying OpenDF to glassfish server!"
# Deploy OpenDF to glassfish server
# The glassfish bin directory should be in the $PATH.
asadmin add-resources "OpenDF-ejb/src/main/setup/glassfish-resources.xml"
asadmin add-resources "OpenDF-web/src/main/setup/glassfish-resources.xml"

asadmin deploy "OpenDF-ear/target/OpenDF-ear-1.0-SNAPSHOT.ear"

echo "[INFO] ----- MySQL login: user ${MYSQL_USER}; password ${MYSQL_PW} -----"
echo "[INFO] ----- Access to OpenDF database granted to: user ${OPENDF_DB_USER}; password ${OPENDF_DB_PW} -----"
echo "OpenDF succefully deployed on http://$(/sbin/ip route|awk '/default/ { print $3 }'):8080/OpenDF-web-1.0-SNAPSHOT"

asadmin deploy "OpenDF-ear/target/OpenDF-ear-1.0-SNAPSHOT.ear"

echo "OpenDF succefully deployed on http://$(/sbin/ip route|awk '/default/ { print $3 }'):8080/OpenDF-web"
