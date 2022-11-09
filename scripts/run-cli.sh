#!/bin/bash

# Script name
name=$(echo $1 | awk 'BEGIN{FS="";RS="-";ORS=""} {$0=toupper(substr($0,1,1)) substr($0,2)} 1')
name=${name,}

# Check if parameter exists
if [ $# -eq 0 ]; then
  echo "No script supplied."

  exit
fi

# Check if script exists
if test -f "./src/cli/${name}.ts"; then
  echo "Running ${name} script..."

  # Run script
  yarn --silent ts-node-dev -r tsconfig-paths/register --exit-child --transpile-only --ignore-watch node_modules --no-notify --poll ./src/cli/run.ts ${name}
else
  echo "Script ${name} doesn't exists."
fi