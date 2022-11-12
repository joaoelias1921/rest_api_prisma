import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
    log: ['query']
});

app.get("/books", async (req, res) => {
    const books = await prisma.book.findMany({
        include: {
            _count: {
                select: {
                    loans: true
                }
            }
        }
    });

    return res.status(201).json(books);
});

app.post("/books", async (req, res) => {
    const body = req.body;

    const book = await prisma.book.create({
        data: {
            title: body.title,
            amountOfPages: body.amountOfPages,
            author: body.author,
            publisherId: body.publisherId
        }
    });

    return res.status(201).json(book);
});

app.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const body = req.body;

    const book = await prisma.book.update({
        where: { id: bookId },
        data: {
            title: body.title,
            amountOfPages: body.amountOfPages,
            author: body.author,
            publisherId: body.publisherId
        }
    });

    return res.status(201).json(book);
});

app.delete("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    await prisma.book.delete({ where: { id: bookId }});
    return res.status(201).send("Livro excluído com sucesso!");
});

app.get("/publishers", async (req, res) => {
    const publishers = await prisma.publisher.findMany({
        include: {
            _count: {
                select: {
                    books: true
                }
            }
        }
    });

    return res.status(201).json(publishers);
});

app.post("/publishers", async (req, res) => {
    const body = req.body;

    const publisher = await prisma.publisher.create({
        data: {
            name: body.name,
            cnpj: body.cnpj,
            address: body.address
        }
    });

    return res.status(201).json(publisher);
});

app.put("/publishers/:id", async (req, res) => {
    const publisherId = req.params.id;
    const body = req.body;

    const publisher = await prisma.publisher.update({
        where: { id: publisherId },
        data: {
            name: body.name,
            cnpj: body.cnpj,
            address: body.address
        }
    });

    return res.status(201).json(publisher);
});

app.delete("/publishers/:id", async (req, res) => {
    const publisherId = req.params.id;
    await prisma.publisher.delete({ where: { id: publisherId }});

    return res.status(201).send("Editora excluída com sucesso!");
});

app.get("/clients", async (req, res) => {
    const clients = await prisma.client.findMany({
        include: {
            _count: {
                select: {
                    loans: true
                }
            }
        }
    });

    return res.status(201).json(clients);
});

app.post("/clients", async (req, res) => {
    const body = req.body;

    const client = await prisma.client.create({
        data: {
            name: body.name,
            cpf: body.cpf,
            phone: body.phone,
            address: body.address
        }
    });

    return res.status(201).json(client);
});

app.put("/clients/:id", async (req, res) => {
    const clientId = req.params.id;
    const body = req.body;

    const client = await prisma.client.update({
        where: { id: clientId},
        data: {
            name: body.name,
            cpf: body.cpf,
            phone: body.phone,
            address: body.address
        }
    });

    return res.status(201).json(client);
});

app.delete("/clients/:id", async (req, res) => {
    const clientId = req.params.id;
    await prisma.client.delete({ where: { id: clientId }});

    return res.status(201).send("Cliente excluído com sucesso!");
});

app.get("/loans", async (req, res) => {
    const loans = await prisma.loan.findMany({
        include: {
            loanClient: true,
            borrowedBook: true
        }
    });

    return res.status(201).json(loans);
});

app.post("/loans", async (req, res) => {
    const body = req.body;

    const loan = await prisma.loan.create({
        data: {
            bookId: body.bookId,
            clientId: body.clientId,
            loanDate: new Date(),
            deadline: body.deadline,
            fine: body.fine
        }
    });

    return res.status(201).json(loan);
});

app.put("/loans/:id", async (req, res) => {
    const loanId = req.params.id;
    const body = req.body;

    const loan = await prisma.loan.update({
        where: { id: loanId},
        data: {
            bookId: body.bookId,
            clientId: body.clientId,
            loanDate: body.loanDate,
            deadline: body.deadline,
            fine: body.fine
        }
    });

    return res.status(201).json(loan);
});

app.delete("/loans/:id", async (req, res) => {
    const loanId = req.params.id;
    await prisma.loan.delete({ where: { id: loanId }});

    return res.status(201).send("Empréstimo excluído com sucesso!");
});

app.listen(3333);