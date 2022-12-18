const http = require("http");
const userFactory = require("./users/users.factory");
const userController = require("./users/users.controller");
const { Router } = require("./router.decorator");
const DEFAULT_HEADER = { "Content-Type": "application/json" };

const routes = {
  ...userController,
  default: async (req, res) => {
    res.end(
      JSON.stringify({
        message: "Default Router",
      })
    );
  },
};

const app = http.createServer((req, res) => {
  const [, route, id] = req.url.split("/");
  const key = `/${route}:${req.method.toLowerCase()}`;
  req.queryString = { id };
  const chosen = routes[key] || routes.default;
  res.writeHead(200, DEFAULT_HEADER);
  return chosen(req, res);
});

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`listening on port ${port}`));
