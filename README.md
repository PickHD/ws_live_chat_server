# ws_live_chat_server

## Live Chat Server Example with Pure Websockets, Multiple lightweight container node servers with docker, Redis (Pub &amp; Sub) &amp; Load Balancing with Nginx

### Setup

1. Make sure have been already installed docker & docker-compose in your OS (Mac OS / Linux / Windows).
2. You can build your own images :

   ``` docker build -t <yourusername/yourimagename>:addyourtag . ```

   And change image src ("lb" service section) in ```docker-compose.yml``` configuration with your images.

   Or you can pull from my images hosted in Docker Hub :

   ``` docker pull pickezdocker/ws_live_chat_server:0.1 ```

3. Run Commands :

   ``` docker-compose up ```
   
   add ``` -d ``` parameter if want to running on background.

   Reverse Proxy will run in port ```8080```
  
### Client code example

1. Spin up 2 or more window / tab browsers
2. Then create new ```Websocket``` instances each browser with ex. ```Javascript``` code :

```
// Initialize web socket instance
const webSocket = new WebSocket("ws://localhost:8080")

// Create "onmessage" events
webSocket.onmessage = (message)= > console.log(`You receive the messages : ${message.data}`)

// Try to send a message
webSocket.send("<yourmessagehere>")

```

3. Try to send message each other 


####PS : It is just in dev mode, not ready for production.
