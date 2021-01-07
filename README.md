# ws_live_chat_server
## Live Chat Server Example with Pure Websockets, Multiple lightweight container node servers with docker, Redis (Pub &amp; Sub) &amp; Load Balancing with Nginx

### Setup
1. Make sure have been already installed docker & docker-compose in your OS (Mac OS / Linux / Windows).
2. You can build your own images :
```
docker build -t<yourusername/yourimagename>:tag
```
   And change image src ("lb" service section) in ```docker-compose.yml``` configuration with your images.
   
   Or you can pull from my images hosted in docker hub
```
docker pull pickezdocker/ws_live_chat_server:0.1
```
3. Run Commands :
```
docker-compose up
```
   add ``` -d ``` parameter if want to running on background.

Reverse Proxy will run in ```http://localhost:8080```

 
### Client code example
Just create new ```Websocket``` instance ex. Browsers with ```Javascript``` :
```
// Initialize web socket instance
const webSocket = new WebSocket("http://localhost:8080")

// Create "onmessage" events
webSocket.onmessage = (message)= > console.log(`You receive the messages : ${message.data}`)

// Try to send a message
webSocket.send("<yourmessagehere>")

```