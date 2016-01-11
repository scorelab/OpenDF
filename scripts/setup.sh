#!/bin/bash

echo "Setup in progress!"

cd /home/OpenDF

echo "Installing tools!"
# Install maven, mysql, automake, libtool, libstdc++, make
# The following two lines prevent mysql from asking for a password (it will be set to rooot)
echo mysql-server mysql-server/root_password password rooot | debconf-set-selections
echo mysql-server mysql-server/root_password_again password rooot | debconf-set-selections
apt-get -y install maven mysql-server mysql-client automake libtool build-essential

echo "Building OpenDF!"
# Build OpenDF
mvn install:install-file -Dfile=sleuthkit/bindings/java/dist/Tsk_DataModel.jar \
-DgroupId=org.sleuthkit -DartifactId=Tsk_DataModel -Dversion=4.1.3 -Dpackaging=jar

mvn clean install

echo "Setting up mysql!"
# Setting up mysql
service mysql start
mysql -u root --password="rooot" --execute="CREATE DATABASE IF NOT EXISTS OpenDF;"
mysql -u root --password="rooot" --execute="CREATE USER 'OpenDFU'@'localhost' IDENTIFIED BY '123';"
mysql -u root --password="rooot" --execute="GRANT ALL PRIVILEGES ON OpenDF.* TO 'OpenDFU'@'localhost';"
mysql -u root --password="rooot" OpenDF < db/OpenDF.sql

echo "Building dependencies!"
# Build dependencies
# Not using the build_sleuthkit script here as it is interactive
git clone https://github.com/sleuthkit/sleuthkit.git sleuthkit_recent
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
asadmin restart-domain

echo "Deploying OpenDF to glassfish server!"
# Deploy OpenDF to glassfish server
# The glassfish bin directory should be in the $PATH.
asadmin add-resources "OpenDF-ejb/src/main/setup/glassfish-resources.xml"
asadmin add-resources "OpenDF-web/src/main/setup/glassfish-resources.xml"

asadmin deploy "OpenDF-ear/target/OpenDF-ear-1.0-SNAPSHOT.ear"

echo "OpenDF succefully deployed on http://$(/sbin/ip route|awk '/default/ { print $3 }'):8080/OpenDF-web"
