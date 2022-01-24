const micro = require("micro");
const server = require("../index");
const test = require("ava");
const listen = require("test-listen");
const axios = require("axios");

test("Server returns 200", async (t) => {
  const service = micro(server);
  try {
    const url = await listen(service);
    const { status } = await axios.request(url);
    t.deepEqual(status, 200);
  } catch {
  } finally {
    service.close();
  }
});

test("Server returns 404 on unknown path", async (t) => {
  const service = micro(server);
  try {
    const url = await listen(service);
    const { status } = await axios.request(`${url}/unknown-route`);
  } catch (error) {
    console.log(error.response.status);
    t.deepEqual(error.response.status, 404);
  } finally {
    service.close();
  }
});
