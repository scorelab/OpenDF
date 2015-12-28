# Setting up the database

First, let's enter the mysql CLI:
```bash
mysql -u root -p
```

Create the OpenDF database if it doesn't exists:
```sql
CREATE DATABASE IF NOT EXISTS OpenDF;
```

Create the user OpenDFU and set his password to 123.
Then grant all DB privileges to him.
```sql
CREATE USER IF NOT EXISTS 'OpenDFU'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON OpenDF.* TO 'OpenDFU'@'localhost';

Then, run the OpenDF.sql script to fill the database with tables:
```sql
SOURCE OpenDF.sql
```

Congratulations! You've successfully set up your database server for
use with OpenDF!
