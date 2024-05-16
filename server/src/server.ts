import fastify from "fastify";
import cors from "@fastify/cors";
import { ClientController } from "./clients/clients.controller";

export const app = fastify();

app.register(cors, {
    origin: true,
})

const PORT = 3333

app.register(ClientController)

app.listen({
    port: PORT
}).then(() => {
    console.log(`App is runnig on http://localhost:${PORT}/`)
})