#!/bin/bash

echo "Setup in progress!"

cd /home/OpenDF

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
asadmin deploy "OpenDF-ear/targetOpenDF-ear-1.0-SNAPSHOT.ear"




