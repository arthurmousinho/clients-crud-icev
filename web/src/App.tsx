import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useClient } from "./hooks/useClients";
import { useEffect, useState } from "react";
import { NewClientDialog } from "./components/newClientDialog";

export function App() {

  const [ clients, setClients ] = useState<any[]>([]);
  const { getAllClients, deleteClient } = useClient();

  async function loadClients() {
    const data = await getAllClients();
    setClients(data);
  }

  async function handleDeleteClient(id: string) {
    await deleteClient(id);
    await loadClients();
  }

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <main className="w-screen h-screen p-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h1 className="font-semibold text-xl">
            Clientes Cadastrados
          </h1>
          <NewClientDialog getClientsFn={loadClients} >
            <Button className="flex items-center gap-2">
                <Plus />
                Novo Cliente
            </Button>
          </NewClientDialog>
        </CardHeader>
        <CardContent>
            <Table>
              {
                clients.length > 1 && (
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[350px]">ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead className="text-right">Editar</TableHead>
                      <TableHead className="text-right">Remover</TableHead>
                    </TableRow>
                  </TableHeader>
                )
              }
              <TableBody>
                {clients.map(client => {
                  return (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        {client.id}
                      </TableCell>
                      <TableCell>
                        {client.name}
                      </TableCell>
                      <TableCell>
                        {client.email}
                      </TableCell>
                      <TableCell>
                        {client.cpf}
                      </TableCell>
                      <TableCell className="text-right">
                        <NewClientDialog data={client} getClientsFn={loadClients} editing={true} >
                          <Button variant={"outline"}>
                            <Pencil size={20} className="text-primary" />
                          </Button>
                        </NewClientDialog>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant={"outline"} onClick={() => handleDeleteClient(client.id)}>
                          <Trash size={20} className="text-red-500" />
                        </Button>
                      </TableCell>
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
        </CardContent>
      </Card>

    </main>
  )
}