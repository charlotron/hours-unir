#How to run this mess
###Docker way
Install docker if you dont have it: https://www.docker.com/

Create a file called ```docker-compose.yml``` and write the following
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
      REBOOT_AFTER_MINS: 120  #Reboot after 2 hours (i have restart:unless-stopped, so it will be restarting each two hours in loop to prevent timeout bugs, etc..)
```
Then in the same folder, execute:
```
docker-compose up
```
Or you can also run it as daemon (in background)
```
docker-compose up -d
```

OPTIONAL: You can modify/add the following optional environment variables
```
      MIN_WAIT_TIME_SECS: 30            # This will set the minimun wait time between page jumps on URL1/2 (this is to prevent detecting time patterns). Defaults to 30. 
      DEFAULT_MAX_WAIT_TIME_SECS: 50    # This will set the maximun wait time between page jumps on URL1/2 (this is to prevent detecting time patterns). Defaults to 50.
```

###Manual way

Just expose the environment variables, for example in unix based system:
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
