*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BROWSER}      Chrome
${URL}          http://localhost:5173/

*** Test Cases ***
Abrir Página e Verificar Título
    Open Browser    ${URL}    ${BROWSER}
    ${title}=    Get Title
    Should Be Equal As Strings    ${title}    Cadastro de Clientes
