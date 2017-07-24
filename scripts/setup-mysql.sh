#!/usr/bin/env bash

# Setting up mysql
echo "Setting up mysql!"

mysqld

mysql -u $MYSQL_USER --password="$MYSQL_PW" --execute="CREATE DATABASE IF NOT EXISTS OpenDF;"
mysql -u $MYSQL_USER --password="$MYSQL_PW" --execute="CREATE USER '${OPENDF_DB_USER}'@'%' IDENTIFIED BY '${OPENDF_DB_PW}';"
mysql -u $MYSQL_USER --password="$MYSQL_PW" --execute="GRANT  INSERT, SELECT, UPDATE, DELETE ON OpenDF.* TO '${OPENDF_DB_USER}'@'%';"
mysql -u $MYSQL_USER --password="$MYSQL_PW" OpenDF < /OpenDF/db/OpenDF.sql

service mysql restart