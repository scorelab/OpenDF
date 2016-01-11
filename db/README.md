# Setting up the database
In the following, the preparation of a database for use with OpenDF
is going to be described.


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
CREATE USER 'OpenDFU'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON OpenDF.* TO 'OpenDFU'@'localhost';
```

Select the database:
```sql
USE OpenDF;
```

Then, run the OpenDF.sql script to fill the database with tables:
```sql
SOURCE OpenDF.sql
```

Then just exit the mysql CLI:
```bash
exit
```

Congratulations! You've successfully set up your database server for
use with OpenDF!
