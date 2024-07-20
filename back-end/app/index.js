const express = require('express')
const cors = require('cors')

const router = require('./routes')

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
    res.send('Server is running!');
});
const path = require('path');

// Serviranje favicon.ico
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.use(router)

app.listen(port, () => console.log(`Magic happens on port ${port}`))
