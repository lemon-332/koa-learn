const fs = require("fs");

const Router = require("koa-router");

const router = new Router();

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "index.js") return;
  const route = require(`./${file}`);
  router.use(route.routes(), route.allowedMethods());
});

module.exports = router;
