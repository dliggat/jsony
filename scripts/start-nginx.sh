#!/usr/bin/env bash

cd `dirname $0`
cd ..

port=8080
projectdir=`pwd`
vmdir=/var/jsony

if [ "$1" ]; then
  port="$1"
fi

docker run -p $port:80 -d -v $projectdir:$vmdir:ro soconnor/jsony
