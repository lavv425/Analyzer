const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET, POST, OPTIONS',
//     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
// };

app.use(express.json());

app.use((req, res, next) => {
    // const allowedOrigins = process.env.ORIGIN.split(',');
    // const origin = req.headers.origin;

    // if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', "*");
    // }
    //così posso dichiarare sia prod che dev
    // res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
    // res.header('Access-Control-Allow-Origin', process.env.ORIGIN);
    res.header('Access-Control-Allow-Methods', process.env.METHODS);
    res.header('Access-Control-Allow-Headers', process.env.ALLOWEDHEADERS);
    next();
});

const readAndMergeFiles = (dir, dir2) => {
    const files = fs.readdirSync(dir);
    const filesReports = fs.readdirSync(dir2);
    let mergedFiles = [
        { addReq: [] },
        { reports: [] }
    ];

    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(dir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);
            mergedFiles[0].addReq.push(jsonData);
        }
    });

    filesReports.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(dir2, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);
            mergedFiles[1].reports.push(jsonData);
        }
    });

    return mergedFiles;
};



app.post('/api/saveContactForm', (req, res) => {
    try {
        const data = req.body;
        const pathToSave = data.type ? process.env.SAVEREPORTS : process.env.SAVEADDREQS;

        const filePath = `${pathToSave}${data.uniqueId}.json`;

        fs.writeFileSync(filePath, JSON.stringify(data));

        res.status(200).json({ status: true, message: 'La richiesta è stata inserita, verrà gestita il prima possibile!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Errore generale' });
    }
});

app.get('/api/retrieveRequests', (req, res) => {
    const dir = process.env.SAVEADDREQS;
    const dir2 = process.env.SAVEREPORTS;

    try {
        const mergedData = readAndMergeFiles(dir, dir2);
        res.status(200).json({ status: true, data: mergedData });
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ status: false, error: 'Errore durante il processo di combinazione dei file.' });
    }
});

app.post('/api/body/ShowReqModal', (req, res) => {
    try {
        const modalHTML = `<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div class="modal-content-divs"><div><h3>Unique ID Richiesta</h3><p>${req.body.uniqueId}</p></div><div><h3>Tipo richiesta</h3><p>${req.body.type ? 'Segnalazione' : 'Richiesta per aggiunta'}</p></div><div><h3>Inserito da</h3><p>${req.body.nv.whoIsHe}</p></div><div><h3>Email</h3><p>${req.body.nv.email}</p></div><div><h3>Oggetto</h3><p>${req.body.nv.subject}</p></div><div><h3>Descrizione</h3><p>${req.body.nv.description}</p></div><div><h3>Data scadenza</h3><p>${req.body.nv.dateToSave}</p></div></div></div></div>`;
        res.status(200).json({ status: true, data: modalHTML });
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ status: false, error: 'Errore durante il processo di combinazione dei file.' });
    }
});

app.post('/api/body/ShowReqModal/edit', (req, res) => {

    try {
        const modalHTML = `<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><div class="modal-content-divs"><div><input readonly disabled hidden name="type" class="mod-field" value="${req.body.type}" /><h3>Unique ID Richiesta</h3><input readonly disabled class="mod-field" name="uniqueId" value="${req.body.uniqueId}" /></div><div><h3>Email</h3><input class="mod-field" name="newEmail" value="${req.body.nv.email}" /></div><div><h3>Oggetto</h3><input class="mod-field" name="newSubject" value="${req.body.nv.subject}" /></div><div><h3>Descrizione</h3><input class="mod-field" name="newDescription" value="${req.body.nv.description}" /></div></div><div class="modal-button-container"><button class="save-mods">Salva</button></div></div></div>`;
        res.status(200).json({ status: true, data: modalHTML });
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ status: false, error: 'Errore durante il processo di combinazione dei file.' });
    }
})
app.delete('/api/deleteRequest', (req, res) => {

    const { uniqueId, type } = req.body;

    let source, dest;

    if (type) {
        source = `${process.env.SAVEREPORTS + uniqueId}.json`;
        dest = `${process.env.DELETEDDIRREPORTS + uniqueId}.json`;
    } else {
        source = `${process.env.SAVEADDREQS + uniqueId}.json`;
        dest = `${process.env.DELETEDDIRADDREQ + uniqueId}.json`;
    }

    fs.rename(source, dest, (err) => {
        if (err) {
            res.status(500).json({ status: false, message: 'Errore durante il processo di eliminazione del file. ' + err });
        } else {
            res.status(200).json({ status: true, message: type ? "Segnalazione eliminata con successo" : "RIchiesta eliminata con successo" });
        }
    });
});

app.put('/api/updateRequest', (req, res) => {
    const { newDescription, newEmail, newSubject, uniqueId, type } = req.body;

    let filePath;
    if (type == 1) {
        filePath = `${process.env.SAVEREPORTS}${uniqueId}.json`;
    } else {
        filePath = `${process.env.SAVEADDREQS}${uniqueId}.json`;
    }

    try {
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        if (newEmail) {
            fileContent.nv.email = newEmail;
        }
        if (newSubject) {
            fileContent.nv.subject = newSubject;
        }
        if (newDescription) {
            fileContent.nv.description = newDescription;
        }

        fs.writeFileSync(filePath, JSON.stringify(fileContent));

        res.status(200).json({ status: true, message: 'Richiesta aggiornata con successo!' });
    } catch (error) {
        console.error('Errore nella modifica del file:', error);
        res.status(500).json({ status: false, message: 'Errore nella modifica del file JSON ' + error });
    }

});
app.use((err, req, res, next) => {
    console.error('Errore generale:', err.message);
    res.status(500).json({ error: 'Errore generale ' + err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server Node.js in ascolto sulla porta ${PORT}`);
});
module.exports = app;