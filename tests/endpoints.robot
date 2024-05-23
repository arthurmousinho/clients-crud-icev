*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    JSONLibrary

*** Variables ***
${API_URL}       http://localhost:3333
${VALID_CLIENT_PAYLOAD}    {"name": "John Doe", "email": "john@example.com", "cpf": "123456789"}
${VALID_CLIENT_ID}     26eac405-b5ab-4e06-88f7-22623232c28e	

*** Test Cases ***
Testar Requisição GET
    [Documentation]    Este caso de teste verifica se os clientes estão sendo retornados
    ${response}=    GET    ${API_URL}/clients
    Should Be Equal As Strings    ${response.status_code}    200
    Log    ${response.text}


Testar Requisição POST
    [Documentation]    Este caso de teste verifica se um novo cliente é criado com sucesso
    Create Session    ${API_URL}    ${API_URL}
    ${headers}=    Create Dictionary    Content-Type    application/json
    ${response}=    POST On Session    ${API_URL}    /clients    data=${VALID_CLIENT_PAYLOAD}    headers=${headers}
    Should Be Equal As Strings    ${response.status_code}    201
    Log    ${response.text}


Testar Requisição GET por ID Existente
    [Documentation]    Este caso de teste verifica se um cliente é retornado com sucesso quando o ID existe
    Create Session    ${API_URL}    ${API_URL}
    ${response}=    GET    ${API_URL}/clients/${VALID_CLIENT_ID}
    Should Be Equal As Strings    ${response.status_code}    200
    Log    ${response.text}