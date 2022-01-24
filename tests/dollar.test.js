const micro = require("micro");
const assert = require("assert").strict;
const server = require("../index");
const test = require("ava");
const listen = require("test-listen");
const axios = require("axios");

const isDollarSchema = (data) => {
  if (!data) return false;
  if (!data.blue || !data.official) return false;
  else return true;
};

test("It returns dollar price in ARS currency", async (t) => {
  const service = micro(server);
  try {
    const url = await listen(service);
    const { data, status } = await axios.get(`${url}/dollar/price`);
    assert.equal(
      isDollarSchema(data),
      true,
      "Data does not comply with dollar schema"
    );
    t.deepEqual(status, 200);
  } catch (error) {
    throw new Error(error);
  } finally {
    service.close();
  }
});
