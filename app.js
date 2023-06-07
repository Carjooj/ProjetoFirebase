const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('./projetoweb-92f39-firebase-adminsdk-p9zgp-d8ee23eb5d.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.get("/consulta", function(req, res){
    collectionRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {

      // Cria uma referência para um documento em outra coleção usando o ID do documento atual
      const cityRef = db.collection('cities').doc(doc.id);

      // Obtém o documento usando a referência
      const unity = cityRef.get();

      // Acessa os dados do documento obtido
      cityRef.get().then(unity => {
        if (unity && unity.exists) {
          // Imprime o ID do documento e seus dados
          console.log(unity.id, '=>', unity.data());
        }
      })
        .catch(err => {
          // Trata erros ao obter o documento
          console.log(err);
        });
    });
  })
  .catch(error => {
    // Trata erros ao obter os documentos da coleção
    console.error('Erro ao obter documentos:', error);
  });
})

app.get("/editar/:id", function(req, res){
})

app.get("/excluir/:id", function(req, res){
})

app.post("/cadastrar", function(req, res){
    var result = db.collection('agendamentos').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        console.log('Added document');
        res.redirect('/')
    })
})

app.post("/atualizar", function(req, res){
})

app.listen(8081, function(){
    console.log("Servidor ativo!")
})