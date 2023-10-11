# Database
For the sake of efficiency and convenience the job posts are stored in a SQL database in addition to being stored in CSV files. The `populate_database.py` script reads the job posts from the CSV files and inserts them into the database. Run this script to populate the database.

PostgreSQL is used as the SQL database and the SQLAlchemy ORM is used to interact with it.

The database can be run locally by changing `SQLALCHEMY_DATABASE_URL` to a local database with the format: `postgresql://username:password@localhost:5432/database_name`. To run the database online, replace this URL string with the URL of an online PostgreSQL server.

### PostgreSQL Setup
1. Login with the default `postgres` username: `sudo -u postgres psql`
2. Create a new database for the new user: `CREATE DATABASE new_username;`
3. Logout: `\q`
4. Create a new user: `sudo -u postgres createuser --interactive`. Note that this user must already exist in Linux.
5. Login with the new user: `sudo -u new_username psql`
6. Set user password: `ALTER USER user_name WITH PASSWORD 'new_password';`
6. Create a new database associated with that user: `CREATE DATABASE db_name;`

Databases can be managed from a terminal or using the pgAdmin4 GUI in the browser: https://www.pgadmin.org/

### Common PostgreSQL Commands
Login: `sudo -u username psql`
List all roles (users): `\dg`
List all databases: `\l`
Connect to database: `\c db_name`
List tables in database: `\dt`
Select first three rows: `SELECT * FROM job_post LIMIT 3;`
Help: `\?`
Logout: `\q`

Set up PostgreSQL on Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04
SQLAlchemy docs: https://docs.sqlalchemy.org/en/14/
