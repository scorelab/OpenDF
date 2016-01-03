#!/bin/bash

echo "Setup in progress!"

cd /home/OpenDF

# Install maven and mysql and automake
# The following two lines prevent mysql from asking for a password (it will be set to rooot)
echo mysql-server mysql-server/root_password password rooot | debconf-set-selections
echo mysql-server mysql-server/root_password_again password rooot | debconf-set-selections
apt-get -y install maven mysql-server mysql-client automake

# Build OpenDF
mvn install:install-file -Dfile=sleuthkit/bindings/java/dist/Tsk_DataModel.jar \
-DgroupId=org.sleuthkit -DartifactId=Tsk_DataModel -Dversion=4.1.3 -Dpackaging=jar

mvn clean install

# Setting up mysql
service mysql start
mysql -u root --password="rooot" --execute="CREATE DATABASE IF NOT EXISTS OpenDF;"
mysql -u root --password="rooot" --execute="CREATE USER 'OpenDFU'@'localhost' IDENTIFIED BY '123';"
mysql -u root --password="rooot" --execute="GRANT ALL PRIVILEGES ON OpenDF.* TO 'OpenDFU'@'localhost';"
mysql -u root --password="rooot" --execute="SOURCE db/OpenDF.sql"

# Build dependencies
# Not using the build_sleuthkit script here as it is interactive
git clone https://github.com/sleuthkit/sleuthkit.git sleuthkit_recent
cd sleuthkit_recent
./bootstrap
./configure
make
make install
cd ..

# Deploy OpenDF to glassfish server
# The glassfish bin directory should be in the $PATH.
asadmin start-domain domain1
asadmin deploy "OpenDF-ear/targetOpenDF-ear-1.0-SNAPSHOT.ear"

echo "Setup done!"




