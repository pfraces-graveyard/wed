#!/bin/bash

APP='nw ~/dev/wed'

if test "$1" == "--debug"
then OUTPUT=''
else OUTPUT='2> /dev/null &'
fi

sh -c "$APP $OUTPUT"
