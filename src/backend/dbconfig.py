import os
from dotenv import dotenv_values

'''
Each setting overrides the previous setting. Note that the '.env.production' is not in the repo and needs
to be created. Comment out a setting to change which database is used by the populate_database.py script.
'''

# needed for unit tests:
env_local = {
    'username': 'postgres',
    'password': 'postgres',
    'host': 'localhost',
    'port': '5432',
    'database': 'postgres',
}

config = {
    **env_local,
    **dotenv_values('.env.production'),
    **os.environ,  # AWS production settings
}
