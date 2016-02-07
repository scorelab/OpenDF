#!/usr/bin/env bash

# This script is executed by Vagrant to install OpenDF
# and its dependencies.

# DO NOT RUN MANUALLY!

mkdir -p /home/OpenDF
mkdir -p /opt/glassfish

# Don't build the sources in /vagrant directly as it
# is in sync with the host system.
cp -r /vagrant/* /home/OpenDF

apt-get update
apt-get -y install openjdk-7-jdk unzip git

echo -n "Downloading glassfish server... "
wget -q download.java.net/glassfish/4.0/release/glassfish-4.0.zip
RETCODE=$?
if [ "$RETCODE" == 0 ]; then
    echo "done."
else
    echo "error! - code $RETCODE"
    exit $RETCODE
fi
unzip glassfish-4.0.zip -d /opt/glassfish
rm glassfish-4.0.zip
export PATH=/opt/glassfish/glassfish4/bin:$PATH

cd /home/OpenDF/scripts
./setup.sh
