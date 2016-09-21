import express from "express"
import events from "events"

const app = express()
const dispatcher = new events.EventEmitter()

app.get("/subscribe", (req, res, next) => {
	res.writeHead(200, {
		"Content-Type": "text/event-stream",
		"Cache-control": "no-cache",
		"Connection": "keep-alive"
	})

	let fn = (update) => res.write(`data: ${update}\n\n`)
	dispatcher.on("update", fn)

	let time = setInterval(() => {
		dispatcher.emit("update", new Date().getTime())
	}, 100)

	req.connection.on("close", () => {
		console.log("Connection closed")

		clearInterval(time)
		dispatcher.removeListener("update", fn)
	})
})

app.use(express.static("./client"))
app.listen(process.env.PORT || 4000, () => {
	console.log(`App running on port ${process.env.PORT || 4000}`)
})
