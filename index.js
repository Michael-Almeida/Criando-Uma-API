//configuração inicial do servido express
const express = require("express");
const res = require("express/lib/response");
const app = express();

//configuração do banco
const mongoose = require("mongoose");

const Person = require("./models/person");

//informando o tipo de decodificação (explicando ao express qual lib usar para dar parsing ao conteúdo)
app.use(express.urlencoded({ extended: true }));

//aceitando requisição Json
app.use(express.json);

//routes fo methods (post, get, put, delete)
app.post("/person", async (req, res) => {
  const { name, salary, approved } = req.body;

  const Person = {
    name,
    salary,
    approved,
  };
  try {
    await Person.create(Person);
    res.status(201).json({ message: "inserido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/person", async (req, res) => {
  try {
    const peole = await Person.find();
    res.status(200).json(peole);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.patch("/person/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };
  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({ message: "usuário não encontrado" });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/person/id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });

  if (person) {
    res.status(422).json({ message: "usuário não encontrado" });
    return;
  }
  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "user removido" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Nada aqui , página inicial" });
});

mongoose
  .connect("mongodb://localhost:27017/meu_banco")
  .then(() => {
    console.log("conectou com o banco");
    app.listen(3000);
  })
  .catch((error) => console.log(error));
