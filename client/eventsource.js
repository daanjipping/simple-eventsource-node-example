const eventSource = new EventSource("./subscribe")
let eventSourceMessageCount = 0

const setContent = (content) => document.getElementById("eventSourceResult").innerHTML = content
const increaseEventSourceMessageCount = () => document.getElementById("eventSourceMessageCount").innerHTML = eventSourceMessageCount++
const closeEventSource = () => eventSource.close()

eventSource.onmessage = (e) => {
  setContent(e.data)
  increaseEventSourceMessageCount()
}

eventSource.onerror = (error) => {
  console.error(error)
  setContent("An error occurred, see console")

  closeEventSource()
}

document.getElementById("stopEventSource").onclick = () => {
  closeEventSource()
}
