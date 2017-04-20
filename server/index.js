const path = require('path');
const express = require('express');
const {DEV, PROD} = require('./config');
const knex = require('knex')(DEV);
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

const {router: usersRouter} = require('./users');

// API endpoints go here!

app.use('/', usersRouter);

app.get('/api/users', (req, res) => {
    knex('users')
        .select()
        .then(results => {
            res.json(results);
        })
})

// FOLDERS GET ENDPOINTS

app.get('/api/folders', (request, res) => {
    knex('folders')
        .select(['foldername', 'userid'])
        .then(results => {
            res.json(results);
        })
        .catch((error) => {
            console.error('ERROR:', error.message || error);
            res.status(500);
    })
})

app.get('/api/', (request, res) => {
    knex('bookmarks')
        .select(['url', 'title', 'notes', 'folderid', 'image', 'bookmarkid', 'userid'])
        .then(results => {
            res.json(results);
        })
        .catch((error) => {
            console.error('ERROR:', error.message || error);
            res.status(500);
    })
})


app.get('/api/:id', (req, res) => {
    knex('bookmarks')
        .select(['url', 'title', 'notes', 'folderid', 'image', 'bookmarkid', 'userid'])
        .where('userid', req.params.id)
        .then(results => {
            res.json(results);
        })
        .catch((error) => {
            console.error('ERROR:', error.message || error);
            res.status(500);
    })
})

// BOOKMARK POST AND PATCH ENDPOINTS


app.post('/api/', jsonParser, (req, res) => {
    const { url, title, notes, folderid, image, bookmarkid, userid } = req.body;
	if (url === '' || url === ' '|| typeof url === 'undefined') {
		return res.status(404).json({message: 'Bad request: enter valid bookmark url'});
	} 
    knex('bookmarks').insert({
        url: url,
        title: title,
        notes: notes,
        folderid: folderid,
        image: image,
        userid: userid
    })
	.returning(['url', 'title', 'notes', 'folderid', 'image', 'bookmarkid', 'userid'])
	.then(result => {
		return res.status(201).json(result);
	})
	.catch(error => { 
		console.log(error);
		return res.status(500).json({message: "Internal server error"});  
	});
})



// BOOKMARK PUT ENDPOINT

app.patch('/api/:id', jsonParser, (req, res) => {
     knex('bookmarks')
     .where('bookmarkid', req.params.id)
     .update(req.body)
     .then(result => {
     return res.status(202).send('patch was successful');
   })
	 .catch(err => {
   	 console.log(err);
		 return res.status(500).json({message: "Internal server error"}); 
   });
})

// BOOKMARK DELETE ENDPOINT

app.delete('/api/:id', (req, res) => {
	knex.del()
    .where('bookmarkid',req.params.id)
    .from('bookmarks')
   .then(result => {
     return res.status(202).send('delete was successful');
   })
	 .catch(err => {
   	 console.log(err);
		 return res.status(500).json({message: "Internal server error"}); 
   });
})




// FOLDERS SPECIFIC GET ENDPOINT

app.get('/api/folders/:id', (req, res) => {
    knex('folders')
        .select(['foldername', 'userid', 'folderid'])
        .where('userid', req.params.id)
        .then(results => {
            res.json(results);
        })
        .catch((error) => {
            console.error('ERROR:', error.message || error);
            res.status(500);
    })
})

// FOLDERS POST ENDPOINT

app.post('/api/folders', jsonParser, (req, res) => {
    const { foldername, userid } = req.body;
	if (foldername === '' || foldername === ' '|| typeof foldername === 'undefined') {
		return res.status(404).json({message: 'Bad request: enter valid foldername'});
	} 
    knex('folders').insert({
  	foldername: foldername,
    userid: userid
  })
	.returning(['foldername', 'userid'])
	.then(result => {
		return res.status(201).json(result);
	})
	.catch(error => { 
		console.log(error);
		return res.status(500).json({message: "Internal server error"});  
	});
})

// // FOLDER PATCH ENDPOINT

app.patch('/api/folders/:id', jsonParser, (req, res) => {
    knex('folders')
     .where('folderid', req.params.id)
     .update(req.body)
	.returning(['foldername', 'userid'])
	.then(result => {
		return res.status(201).json(result);
	})
	.catch(error => { 
		console.log(error);
		return res.status(500).json({message: "Internal server error"});  
	});
})



// // FOLDER DELETE ENDPOINT

app.delete('/api/folders/:id', (req, res) => {
	knex.del()
    .where('folderid',req.params.id)
    .from('folders')
   .then(result => {
     return res.status(202).send('delete was successful');
   })
	 .catch(err => {
   	 console.log(err);
		 return res.status(500).json({message: "Internal server error"}); 
   });
});







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

