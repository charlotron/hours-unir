#!/bin/sh

#Build the docker stack
docker-compose build

#Tag docker images with latest version
docker tag $(docker images -q horas-unir) charlotron/horas-unir

#Push docker images to docker hub
docker push charlotron/horas-unir
