const micro = require("micro")
const test = require("ava")
const listen = require("test-listen")
const axios = require("axios")

test("Server returns 200", async (t) => {
	const service = micro(async (req, res) => {
		micro.send(res, 200);
	})
	const url = await listen(service);
	const { status } = await axios.request(url);
	t.deepEqual(status, 200)
	service.close();
})
