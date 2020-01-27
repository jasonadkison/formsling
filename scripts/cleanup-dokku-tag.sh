#!/bin/bash
# This script ensures we don't have excess tags hanging around after image deployment by destroying any tag older than 'previous'

if [ -z "$1" ]
then
        echo "ERROR! The dokku app name must be passed as an argument."
        exit 1
fi

DOKKU_APP=$1
TAG=$(docker images --filter=reference="dokku/${DOKKU_APP}:*" --filter "before=dokku/${DOKKU_APP}:previous" --format '{{.Tag}}')

echo "Checking ${DOKKU_APP} for old tag..."

if [ -z "$TAG" ]
then
        echo "No tag needs destroyed for ${DOKKU_APP}."
else
        echo "Destroying tag ${TAG} for ${DOKKU_APP}"

        # first we need to cleanup any non-running containers so there is not a reference to the image we're deleting
        dokku cleanup

        # then we can destroy the tag/image
        dokku tags:destroy $DOKKU_APP $TAG
fi
