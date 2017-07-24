#!/usr/bin/env bash

cd /home/OpenDF

echo "Setting up Glashfish resources!"
# Replace database username and password in glassfish-resources.xml
(cd OpenDF-web; mvn replacer:replace)
mvn clean install

echo "Setting up Glashfish server!"
asadmin start-domain
touch /tmp/password.txt
chmod 600 /tmp/password.txt
echo "AS_ADMIN_PASSWORD=" > /tmp/password.txt
echo "AS_ADMIN_NEWPASSWORD=${GLASSFISH_PW}" >> /tmp/password.txt
asadmin --user admin --passwordfile /tmp/password.txt change-admin-password
asadmin restart-domain
echo "AS_ADMIN_PASSWORD=${GLASSFISH_PW}" > /tmp/password.txt
asadmin --user admin --passwordfile /tmp/password.txt  enable-secure-admin
asadmin restart-domain



echo "Deploying OpenDF to glassfish server!"
# Deploy OpenDF to glassfish server
# The glassfish bin directory should be in the $PATH.
asadmin --user admin --passwordfile /tmp/password.txt add-resources "OpenDF-ejb/src/main/setup/glassfish-resources.xml"
asadmin --user admin --passwordfile /tmp/password.txt add-resources "OpenDF-web/src/main/setup/glassfish-resources.xml"

asadmin --user admin --passwordfile /tmp/password.txt deploy  --contextroot="/OpenDF"  "OpenDF-ear/target/OpenDF-ear-1.0-SNAPSHOT.ear"
echo "OpenDF succefully deployed on http://$(/sbin/ip route|awk '/default/ { print $3 }'):8080/OpenDF-web"

rm /tmp/password.txt
tail -f /dev/null
