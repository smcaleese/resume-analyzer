import os
from dotenv import dotenv_values

'''
Each setting overrides the previous setting. Note that the '.env.production' is not in the repo and needs
to be created. Comment out a setting to change which database is used by the populate_database.py script.
'''

# needed for unit tests:
env_local = {
    'username': 'postgres',
    'password': 'password',
    'host': 'localhost',
    'port': '5432',
    'database': 'postgres',
}

if 'RDS_HOSTNAME' in os.environ:
    aws_config = {
        'username': os.environ['RDS_USERNAME'],
        'password': os.environ['RDS_PASSWORD'],
        'host': os.environ['RDS_HOSTNAME'],
        'port': os.environ['RDS_PORT'],
        'database': os.environ['RDS_DB_NAME'],
    }
else:
    aws_config = {}

config = {
    **env_local,
    **dotenv_values('.env.production'),
    **aws_config,
}
