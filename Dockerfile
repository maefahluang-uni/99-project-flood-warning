FROM node:7.7-alpine

# install deps
ADD package.json /tmp/package.json
RUN cd /tmp && npm install

# Copy deps
RUN mkdir -p /opt/Flood warning system && cp -a /tmp/node_modules /opt/Flood warning system

# Setup workdir
WORKDIR /opt/Flood warning system
COPY . /opt/Flood warning system

# run
EXPOSE 3000
CMD ["npm", "start"]