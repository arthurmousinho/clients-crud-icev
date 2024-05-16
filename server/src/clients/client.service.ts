import { Client } from "@prisma/client";
import { prisma } from "../lib/prisma";

export interface NewClient {
    name: string;
    cpf: string;
    email: string;
}

export function ClientService() {

    async function getAllClients() {
        const allClients = await prisma.client.findMany();
        return allClients;
    }

    async function createClient(newClient: NewClient) {
        const clientAlreadyExists = await prisma.client.findUnique({
            where: {
                cpf: newClient.cpf
            }
        })

        if (!clientAlreadyExists) {
            await prisma.client.create({
                data: newClient
            })
        } else {
            throw new Error("Client already exists")
        }
    }

    async function getClientById(id: string) {
        const client = await prisma.client.findUniqueOrThrow({
            where: { id }
        })
        return client;
    }

    async function deleteClientByID(id: string) {
        await prisma.client.findUniqueOrThrow({
            where: { id }
        })
        await prisma.client.delete({
            where: { id }
        })
    }

    async function updateClient(clientUpdated: Client) {
        await prisma.client.findUniqueOrThrow({
            where: { id: clientUpdated.id }
        })   
        await prisma.client.update({
            where: { id: clientUpdated.id },
            data: { ...clientUpdated }
        })
    }

    return {
        getAllClients,
        createClient,
        getClientById,
        deleteClientByID,
        updateClient
    }

}