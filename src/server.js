const rds = require("redis")
const http = require("http")
const WebsocketServer = require("websocket").server

//!create connections array 
let connections = []

const APPID = process.env.APPID

//!create 2 redis client (for publish & subscribing) 
const pub = rds.createClient({
  port: 6379,
  host: "rds"
})
const sub = rds.createClient({
  port: 6379,
  host: "rds"
})

sub.on("subscribe", (channel, count) => { 
  console.log(`Server with APPID : ${APPID} subscribed successfully to liveChatChannel`)
  
  //!publish liveChatChannel 
  pub.publish("liveChatChannel", "Welcome to Live Chat Channel !!!")
})

sub.on("message", (channel, message) => {
  try {
    //! get the message to anyone (server) subscribed with liveChatChannel 
    console.log(`Server with APPID : ${APPID} received message in channel : ${channel} with message : "${message}"`)

    //!send message to all connection in connections array 
    connections.forEach(c => c.send(`${APPID} : ${message}`))

  } catch (e) {
    console.error(`ERROR:${e}`)
    return
  }
})

sub.subscribe("liveChatChannel")

//!create http server 
const httpServer = http.createServer()

//!attaching http server to a websocket server
const ws = new WebsocketServer({
  httpServer: httpServer
})

ws.on("request", (request) => {
  //!only accept from an allowed origin,if not reject it and return a log 
  if (!request.origin) {
    request.reject()
    console.log(`Connection from origin ${request.origin} rejected.`)
    return
  }
  const con = request.accept(null, request.origin)

  con.on("open", () => console.log("OPENED!!!"))
  con.on("close", () => console.log("CLOSED!!!"))
  con.on("message", message => {
    //!publish the message to redis
    console.log(`From Client : ${APPID} You sent a message : "${message.utf8Data}"`)
    pub.publish("liveChatChannel", message.utf8Data)
  })

  //!set timeout 5s to make sure ws server is running
  setTimeout(() => con.send(`Connected successfully to server ${APPID}`), 5000)

  //! push con to connection arrays 
  connections.push(con)
})

httpServer.listen(8080, () => console.log(`Server is listening on port:${8080}`))

