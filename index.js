const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
// const {  initializeApp, applicationDefault, cert } = require('firebase-admin/app');
// const { getAuth, GoogleAuthProvider, signInWithPopup } = require("firebase/auth");


// const serviceAccount = require('./projetoweb-92f39-firebase-adminsdk-p9zgp-7dfc4f811c.json');


app.use(express.static('public'));

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("add")
})

app.post("/add", function (req, res) {
    const data = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email
    }
    add(data).then(function () {
        res.redirect("/")
    }).catch(function (erro) {
        res.send("Falha ao adicionar: " + erro)
    })

})

/*app.get("/", function(req, res){
    
})*/

/*app.post("/read", function (req, res) {
    const read = async function (doc) {
        const ref = firestore.db.collection('agendamentos').doc(doc);
        const get = await ref.get();
        const dados = get.data();
        console.log(dados)
        res.render("add", { dados })
    }
    const nome = req.body.nomebusca
    read(nome)
})*/

app.post("/update", function (req, res) {
    let collectionRef = firestore.db.collection('agendamentos');

    const teste = collectionRef.listDocuments().then(documentRefs => {
        return firestore.db.getAll(...documentRefs);
    }).then(documentSnapshots => {
        for (let documentSnapshot of documentSnapshots) {
            if (documentSnapshot.exists) {
                console.log(`Found document with data: ${documentSnapshot.id}`);
            } else {
                console.log(`Found missing document: ${documentSnapshot.id}`);
            }
        }
    });
    /*const update = async function (data) {
        const ref = firestore.db.collection('agendamentos').doc('clodowaldo')
        const res = await ref.update(data)
    }
    const data = {
        nome: req.body.nomeup,
        telefone: req.body.telefoneup,
        email: req.body.emailup
    }

    update(data).then(res.render("add"))*/
})


const add = async function (data) {
    const res = await firestore.db.collection('agendamentos').doc(data.nome).set(data);
}

/*const update = async function (collection, doc, data) {
    const ref = firestore.db.collection(collection).doc(doc)
    const res = await ref.update(data)
}*/


const deletar = async function (collection, doc) {
    const res = await firestore.db.collection(collection).doc(doc).delete();
}


/*const read = async function (doc) {
    const ref = firestore.db.collection('agendamentos').doc(doc);
    const get = await ref.get();
    const data = get.data();
    console.log(data)
    res.render("add", data)
}*/

app.listen(8081, function () {
    console.log("Rodando")
})

