# ======== COMPILE/BUILD ===============
FROM ubuntu:20.04

#Initialize environment
RUN apt-get update
#Install node and npm
RUN apt-get -y install curl gnupg
RUN printf 'y\n1\n\1n' | apt install nodejs
RUN apt-get -y install npm
#Install puppeteer dependencies, fake graphic environment
RUN apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget x11vnc x11-xkb-utils xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x11-apps xvfb

#Prepare constants
ARG APP_RELATIVE=app
ARG DOCKER_RELATIVE=docker
ARG SRC_RELATIVE=src

ARG DOCKER_APP_ROOT=/$APP_RELATIVE
ARG DOCKER_APP_SRC=$DOCKER_APP_ROOT/$SRC_RELATIVE

#Prepare folders
RUN mkdir -p $DOCKER_APP_SRC

#Copy source files and scripts
COPY package.json $DOCKER_APP_SRC
COPY src $DOCKER_APP_SRC
COPY docker $DOCKER_APP_ROOT

WORKDIR $DOCKER_APP_SRC

#Download node dependencies
RUN npm install

#Change working path to root for executing script
WORKDIR $DOCKER_APP_ROOT

EXPOSE 3000

#Configure and run
ENTRYPOINT ["./init.sh"]