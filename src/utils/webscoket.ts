let client:any = null
function connectSocket() {
  const wsUrl = "ws://192.168.0.205:7003/"
  if (client) {
    return client
  } else {
    client = new WebSocket(wsUrl)
  }
  return client

}

export default connectSocket