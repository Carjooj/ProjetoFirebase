const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('./projetoweb-92f39-firebase-adminsdk-p9zgp-1e352acf59.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
  res.render("primeira_pagina")
})

app.get("/consulta", function (req, res) {
  const arr = []
  let obj = {}

  db.collection('agendamentos').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        obj = {
          id: doc.id,
          dataValues: doc.data()
        }
        arr.push(obj)
      });
      console.log(arr);
      res.render("consulta", {
        arr: arr
      })
    }).catch((error) => {
      console.error('Erro ao ler documentos: ', error);
    });
})

app.get("/editar/:id", function (req, res) {
  const { id } = req.params
  const arr = []
  let obj = {}

  db.collection('agendamentos').get(id)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        obj = {
          id: doc.id,
          dataValues: doc.data()
        }
        arr.push(obj)
      });
      res.render("editar", {
        data: arr
      })
    }).catch((error) => {
      console.error('Erro ao ler documentos: ', error);
    });






})

app.get("/excluir/:id", function (req, res) {
  const {id} = req.params

  db.collection('agendamentos').doc(id).delete()
    .then(function() {
      res.redirect("/consulta")
    })
})

app.post("/cadastrar", function (req, res) {
  db.collection('agendamentos').add({
    nome: req.body.nome,
    telefone: req.body.telefone,
    origem: req.body.origem,
    data_contato: req.body.data_contato,
    observacao: req.body.observacao
  }).then(function () {
    console.log('Added document');
    res.redirect("/")
  })
})

app.post("/atualizar/:id", function (req, res) {
  const { id } = req.params
  console.log(id);
  db.collection('agendamentos').doc(id).update({
    nome: req.body.nome,
    telefone: req.body.telefone,
    origem: req.body.origem,
    data_contato: req.body.data_contato,
    observacao: req.body.observacao
  })
    .then(() => {
      console.log('Documento atualizado com sucesso!');
      res.redirect("/consulta")
    })
    .catch((error) => {
      console.error('Erro ao atualizar documento: ', error);
    });

})

app.listen(8081, function () {
  console.log("Servidor ativo!")
})