# API REST desenvolvida a partir do Prisma e SQLite

## - Instale as dependências com "npm i"
## - Renomeie o arquivo ".env.example" para ".env"
## - Rode a API utilizando o comando "npm run dev"
## - Agora é só testá-la, utilizando seu navegador ou uma ferramenta como o Postman ou Insomnia!

# Entidades

## Book
### Livros que serão cadastrados e disponibilizados para empréstimo

- id: identificação única
- title: título do livro
- amountOfPages: quantidade páginas do livro
- author: autor do livro
- publisherId: ID da editora
- createdAt: data e hora de criação deste dado

## Loan
### Empréstimos própriamente ditos, responsáveis por fazer a ponte entre o cliente e o livro

- id: identificação única     
- bookId: ID do livro emprestado
- clientId: ID do cliente que fez o empréstimo
- loanDate: data e hora da efetivação do empréstimo
- deadline: prazo final para devolução do livro
- fine: multa estipulada a partir do vencimento do prazo
- createdAt: data e hora de criação deste dado

## Client
### Clientes que serão cadastrados, possibilitando o empréstimo de um ou mais livros

- id: identificação única
- name: nome do cliente
- cpf: CPF do cliente
- phone: telefone para contato
- address: endereço do cliente
- createdAt: data e hora de criação deste dado

## Publisher
### Editoras que estarão vinculadas aos respectivos livros

- id: identificação única
- name: nome da editora
- cnpj: CNPJ da editora
- address: endereço da editora
- createdAt: data e hora de criação deste dado

## Casos de uso

- CRUD completo de livros, clientes, editoras e empréstimos
- Contagem e listagem de empréstimos ativos para clientes e livros