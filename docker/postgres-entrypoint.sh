#!/bin/sh
echo "Starting Postgres container"

# Set su permissions
chmod 4755 /bin/su

# Enter in postgres user
su postgres -

# Navigate to home directory
cd ~

# Run pwd
pwd /var/lib/postgresql

# Create postgresql data
# mkdir /var/lib/postgresql/data
# chmod 0700 /var/lib/postgresql/data

# Init postgres
initdb --encoding=UTF-8 --allow-group-access --locale=pt_BR --auth=trust -D /var/lib/postgresql/data

echo "host all all 0.0.0.0/0 md5" >> /var/lib/postgresql/data/pg_hba.conf
echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf

# Start oistgres
pg_ctl -D /var/lib/postgresql/data -l /database/log.txt start

# Set postgres password
echo "Creating password to postgres user"
psql -U postgres -c "ALTER USER postgres PASSWORD 'postgres'";

# Run sql file
psql -U postgres -a -f "/database/database.sql"

tail -f /dev/null