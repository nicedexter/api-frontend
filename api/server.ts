import fastify from "fastify";

const swagger = require("./config/swagger");

const server = fastify();
server.register(require("fastify-axios"), {
  clients: {
    v1: {
      baseURL: "http://127.0.0.1:8080/services",
    },
    v2: {
      baseURL: "https://v2.api.com",
    },
  },
});
server.register(require("fastify-swagger"), swagger.options);



server.get("/", async (req, res) => {
  try {
    const { data, status } = await (server as any).axios.v1.get("/pathologies");

    const response = {
      data,
      error: null,
    };

    res.status(status).send(response);
  } catch (e) {
    res.status(500).send({ data: null, error: e });
  }
});

server.listen(4444, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  (server as any).swagger()
  console.log(`Server listening at ${address}`)
})
