#!/bin/bash
docker network create mongo-net
docker run --network mongo-net --name FireSocialDB -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example -d mongo:4.4.5-bionic && sleep 5
docker run --network mongo-net --name mongo-express -e ME_CONFIG_MONGODB_ADMINUSERNAME=root -e ME_CONFIG_MONGODB_ADMINPASSWORD=example -e ME_CONFIG_MONGODB_SERVER=FireSocialDB -e ME_CONFIG_BASICAUTH_USERNAME=user -e ME_CONFIG_BASICAUTH_PASSWORD=example -p 8081:8081 -d mongo-express

