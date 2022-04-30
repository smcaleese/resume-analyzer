# Online Database

## Introduction and initial set up
Our job posts were first stored in CSV files before they were added to a local PostgreSQL server (using the script `csv-to-dv.py`).

To deploy the application online, an online PostgreSQL server is needed which is connected to the Heroku server as an add-on.

Given a local database named `postgres`, its records can be exported to a file named `db.dump` using the following command:
`pg_dump postgres > db.dump`

The data in `db.dump` can then be imported into the online PostgreSQL server using this command:
`heroku pg:psql --app fourth-year-project-api < db.dump`

## Managing the online PostgreSQL server
Command to log in to the remote database: 
`heroku pg:psql postgresql-rectangular-63976 --app fourth-year-project-api`

After logging in to the remote PostgreSQL server, you can then iteract with it in the terminal.

The database is named `d8ag0rnn6stb8o`. After logging in, change to the database with this command:
`\c d8ag0rnn6stb8o`

Tables can be listed with the command `\dt`

The database URL needed to connect to the database in `database.py` can be retrieved with this command:
`heroku config:get DATABASE_URL -a fourth-year-project-api`

Note: the database can be managed in a terminal as described above or in the PgAdmin GUI application.
