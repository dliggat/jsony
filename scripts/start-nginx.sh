#!/usr/bin/env bash

cd `dirname $0`
cd ..

port=8080
projectdir=`pwd`
vmdir=/var/jsony

if [ "$1" ]; then
  port="$1"
fi

containerid=`docker ps | grep soconnor/jsony | awk '{ print $1 }'`
if [ -z "$containerid" ]; then
  docker run -p $port:80 -d -v $projectdir:$vmdir:ro soconnor/jsony
else
  echo "Already started"
fi
