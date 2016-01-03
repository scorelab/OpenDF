#!/bin/bash

echo "Setup in progress!"

cd /home/OpenDF

# Install maven and mysql
# The following two lines prevent mysql from asking for a password (it will be set to rooot)
echo mysql-server-5.6 mysql-server-5.6/root_password password rooot | debconf-set-selections
echo mysql-server-5.6 mysql-server-5.6/root_password_again password rooot | debconf-set-selections
apt-get install maven mysql-server-5.6 mysql-client-5.6

# Build OpenDF
mvn install:install-file -Dfile=sleuthkit/bindings/java/dist/Tsk_DataModel.jar \
-DgroupId=org.sleuthkit -DartifactId=Tsk_DataModel -Dversion=4.1.3 -Dpackaging=jar

mvn clean install

# Setting up mysql
mysql -e CREATE DATABASE IF NOT EXISTS OpenDF;
mysql -e CREATE USER IF NOT EXISTS 'OpenDFU'@'localhost' IDENTIFIED BY '123';
mysql -e GRANT ALL PRIVILEGES ON OpenDF.* TO 'OpenDFU'@'localhost';
mysql -e SOURCE db/OpenDF.sql

# Build dependencies
# Not using build_sleuthkit here as it is interactive
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




