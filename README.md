# Backbone Chat Service
Dummy service to test the backbone chat application.
This service is responsible for returning information associated with the dummy users registered in the system and for storing volatiles chats sent by the users of the application.

## Instalation
Clone project from repo [project repo](https://github.com/dani17b/backbone-chat-service)

```bash
$ git clone https://github.com/dani17b/backbone-chat-service.git

$ cd backbone-chat-service
```

Next, download all project dependencies

```bash
$ npm install
```

## Usage
To run the dummy chats server, launch the chatService.js file with nodejs which will boot the server to port 8081 by default.

In case you want to change the port, it will have to be specified at startup using the env entry PORT.

See available endpoints into chatService.js file.

```bash
$ node chatService.js
```
