import { app } from '../server';
import supertest from 'supertest';

const server = app.server;
const request = supertest(server);

describe('Testes dos Endpoints', () => {
  it('Deve retornar todos os clientes', async () => {
    const response = await request.get('/clients');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array)); // Verifica se o retorno é um array
  });

  it('Deve criar um novo cliente', async () => {
    const newClient = {
      name: 'Teste',
      email: 'teste@teste.com',
      cpf: '12345678901'
    };
    const response = await request.post('/clients').send(newClient);
    expect(response.status).toBe(201);
  });

  it('Deve retornar um cliente específico', async () => {
    const response = await request.get('/clients/:id');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object)); // Verifica se o retorno é um objeto
  });

  it('Deve deletar um cliente', async () => {
    const response = await request.delete('/clients/:id');
    expect(response.status).toBe(204);
  });

  it('Deve atualizar um cliente existente', async () => {
    const updatedClient = {
      id: '1', // Substitua '1' pelo ID válido de um cliente existente
      name: 'Novo Nome',
      email: 'novoemail@teste.com',
      cpf: '12345678901'
    };
    const response = await request.put('/clients').send(updatedClient);
    expect(response.status).toBe(204);
  });
});
