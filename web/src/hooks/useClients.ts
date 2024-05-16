import { useToast } from "@/components/ui/use-toast";
import axios from "axios"

export interface Client {
    id?: string;
    name: string;
    email: string;
    cpf: string;
}

const BASE_URL = 'http://localhost:3333/clients'

export function useClient() {

    const { toast } = useToast()

    async function getAllClients() {
        const allClients = await axios.get(`${BASE_URL}`)
        return allClients.data;
    } 

    async function createClient(newClient: Client) {
        try {
            await axios.post(`${BASE_URL}`, newClient)
            toast({
                title: "Sucesso",
                description: "Cliente cadastrado com sucesso!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao cadastrar o cliente",
            })
        }
    }

    async function updateClient(clientUpdated: Client) {
        try {
            await axios.put(`${BASE_URL}`, clientUpdated)
            toast({
                title: "Sucesso",
                description: "Cliente editado com sucesso!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao editar o cliente",
            })
        }
    }

    async function deleteClient(id: string) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            toast({
                title: "Sucesso",
                description: "Cliente excluído com sucesso!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Erro ao deletar o cliente",
            })
        }
    }

    return {
        getAllClients,
        createClient,
        updateClient,
        deleteClient
    }
}