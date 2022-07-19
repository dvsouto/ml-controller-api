#!/bin/bash

name=$1

echo "Creating ${name} migration..."

yarn typeorm migration:create ./src/migrations/${name}