const config1 = { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const config2 = { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../projetoweb-92f39-firebase-adminsdk-p9zgp-7dfc4f811c.json');


const inicializa = config1.initializeApp({
    credential: config1.cert(serviceAccount)
});

const db = getFirestore();



module.exports = {
    config1: config1,
    config2: config2,
    serviceAccount: serviceAccount,
    initializeApp: inicializa,
    db: db,
}