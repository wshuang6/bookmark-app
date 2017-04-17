const path = require('path');
const express = require('express');
const {DEV, PROD} = require('./config');
const knex = require('knex')(DEV);

const app = express();

// API endpoints go here!
app.get('/users', (req, res) => {
    knex('users')
        .select(['email', 'userid'])
        .then(results => {
            console.log('someone queried something');
            console.log(results);
            res.json(results);
        })
})

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(process.env.PORT || 3001, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
