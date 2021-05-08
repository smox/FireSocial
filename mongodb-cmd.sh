#!/bin/bash
docker run --name FireSocialDB -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -d mongo:4.4.5-bionic
