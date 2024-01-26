let client: any = null
function connectSocket() {
  const wsUrl = "ws://192.168.0.205:8001/websocket/" + parseInt(sessionStorage.getItem("userId") as string)
  if (client) {
    return client
  } else {
    client = new WebSocket(wsUrl)
  }
  return client
}

export default connectSocket