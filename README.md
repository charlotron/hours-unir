#Run without docker
###Manual way
Just expose the environment variables, ie in OS:
```
export LOGIN_USER=some@email.com
export LOGIN_PASSWORD=somepwd
export URL1=https://micampus.unir.net/courses/24329/pages/tema-1-por-que-devops?module_item_id=410195
export URL2=https://micampus.unir.net/courses/24329/pages/tema-1-entrevista-a-abel-lorenzo-service-delivery-manager-en-heineken-espana?module_item_id=410196
```
Then execute the command
```
cd horas-unir
npm i
node src/index.js
```

###Docker way
Install docker if you dont have it

Create a file called "docker-compose.yml" and write the following
```
version: '3'

services:

  horas-unir:
    image: charlotron/horas-unir
    restart: unless-stopped
    environment:
      TZ: "Europe/Madrid"
      LOGIN_USER: "someemail"
      LOGIN_PASSWORD: "somepwd"
      URL1: "https://micampus.unir.net/courses/24329/pages/tema-1-por-que-devops?module_item_id=410195"
      URL2: "https://micampus.unir.net/courses/24329/pages/tema-1-entrevista-a-abel-lorenzo-service-delivery-manager-en-heineken-espana?module_item_id=410196"
```
Execute
```
docker-compose up
```