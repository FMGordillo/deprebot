const dollarService = require("./dollar");
const { send } = require("micro");

const paths = [
  {
    method: "GET",
    url: "/",
  },
  {
    method: "GET",
    url: "/dollar/price",
  },
];

module.exports = async (req, res) => {
  const { method, url } = req;
  const [currentPath] = Object.values(paths).filter(
    (path) => path.url === url && path.method === method
  );

  if (currentPath) {
    switch (currentPath.url) {
      case "/": {
        res.end("Hello world");
        break;
      }
      case "/dollar/price": {
        const data = await dollarService();
        console.log({ data });
        res.end("BAI");
        break;
      }
      default:
        send(res, 404);
    }
  } else {
    send(res, 404);
  }
};
