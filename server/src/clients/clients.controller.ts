import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ClientService } from "./client.service";
import { z } from "zod";

const { 
    getAllClients, 
    createClient, 
    getClientById ,
    deleteClientByID,
    updateClient
} = ClientService()

export async function ClientController(app: FastifyInstance) {
        
    app.get('/clients', async (request: FastifyRequest, reply: FastifyReply) => {
        const allCleints = await getAllClients();
        reply.status(200).send(allCleints);
    })

    app.post('/clients', async (request: FastifyRequest, reply: FastifyReply) => {
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            cpf: z.string()
        });
        try {
            await  createClient({...bodySchema.parse(request.body)});
            reply.status(201).send();
        } catch (error: any) {
            reply.status(409).send(error.message);
        }
    })

    app.get('/clients/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(request.params);
        try {
            const clientFound = await getClientById(id);
            reply.status(200).send(clientFound);
        } catch (error: any) {
            reply.status(404).send(error.message)
        }
    })

    app.delete('/clients/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(request.params);
        try {
            await deleteClientByID(id);
            reply.status(204).send();
        } catch (error: any) {
            reply.status(404).send(error.message);
        }
    })

    app.put('/clients', async (request: FastifyRequest, reply: FastifyReply) => {
        const bodySchema = z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email(),
            cpf: z.string()
        });
        try {
            await updateClient({...bodySchema.parse(request.body)})
            reply.status(204).send();
        } catch (error: any) {
            reply.status(404).send(error.message);
        }
    })

}