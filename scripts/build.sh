#!/usr/bin/env bash

cd `dirname $0`
cd ..

projectdir=`pwd`
vmdir=/var/jsony

docker run -w $vmdir -v $projectdir:$vmdir:rw soconnor/jsony bash -c 'grunt build'
