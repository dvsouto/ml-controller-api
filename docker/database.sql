-- Database file
SELECT 'CREATE DATABASE ml_controller'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ml_controller')\gexec