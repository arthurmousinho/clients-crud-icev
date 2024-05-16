import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FormEvent, ReactNode, useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { Client, useClient } from "@/hooks/useClients";

interface NewClientDialogProps {
    children: ReactNode,
    getClientsFn: () => void;
    editing?: boolean,
    data?: Client,
}

export function NewClientDialog(props: NewClientDialogProps) {

    const [ name, setName ] = useState(props.data?.name || "");
    const [ email, setEmail ] = useState(props.data?.email || "");
    const [ cpf, setCpf ] = useState(props.data?.cpf || "");

    const { createClient, updateClient } = useClient();

    function clearFields() {
        setName("");
        setEmail("");
        setCpf("");
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (props.editing) {
            await updateClient({ id: props.data?.id, name,email,cpf });   
        } else {
            await createClient({ name,email,cpf });
        }
        props.getClientsFn();
        clearFields();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {props.children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        { props.editing ? 'Editar Cliente' : 'Novo Cliente' }
                    </AlertDialogTitle>
                    <form className="space-y-4 text-muted-foreground" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="name-input">Nome</Label>
                            <Input id='name-input' type="text" placeholder="Nome do Cliente" 
                                onChange={event => setName(event.target.value)}
                                value={name}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email-input">Email</Label>
                            <Input id="email-input" type="email" placeholder="Email do Cliente"
                                onChange={event => setEmail(event.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpf-input">CPF</Label>
                            <Input id="cpf-input" type="text" placeholder="CPF do Cliente" 
                                onChange={event => setCpf(event.target.value)}
                                value={cpf}
                            />
                        </div>
                        <footer className="w-full flex justify-end gap-2">
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <Button type="submit">
                                Salvar
                            </Button>
                        </footer>
                    </form>    
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}