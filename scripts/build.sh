#!/bin/bash

echo "Setup in progress!"

# Set environment variables (or get them from docker if possible)
SLEUTHKIT_REPO=${SLEUTHKIT_REPO:-"https://github.com/sleuthkit/sleuthkit.git"}

echo "Installing tools!"
apt-get -y install maven automake libtool build-essential

echo "Building dependencies!"
# Build dependencies

# a. Build SleuthKit
echo "Building SleuthKit!"
# Not using the build_sleuthkit script here as it is interactive
git clone $SLEUTHKIT_REPO sleuthkit_latest
cd sleuthkit_latest
./bootstrap
./configure
make
make install
cd ..
mvn install:install-file -Dfile=sleuthkit_latest/bindings/java/dist/Tsk_DataModel.jar \
-DgroupId=org.sleuthkit -DartifactId=Tsk_DataModel -Dversion=4.1.3 -Dpackaging=jar

echo "Setting up Glashfish server!"
asadmin start-domain
wget http://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.38.zip
unzip mysql-connector-java-5.1.38.zip
asadmin add-library --type ext mysql-connector-java-5.1.38/mysql-connector-java-5.1.38-bin.jar
asadmin restart-domain
