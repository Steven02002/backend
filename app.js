const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // desactiva la verificación de certificados
    },
};

sql.connect(config).then(pool => {
    // ...
}).catch(err => {
    console.error('Database connection failed: ', err);
});

const productRoutes = require('./api/routes/products');
const supplierRoutes = require('./api/routes/suppliers');
const locationRoutes = require('./api/routes/locations');
const brandRoutes = require('./api/routes/brands');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Rutas
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/locations', locationRoutes);
app.use('/brands', brandRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => { 
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

/*const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));*/
/*app.use(express.json());

const clients = [
    {id: 1, name: 'Alice', age: 25, enroll: true},
    {id: 2, name: 'Bob', age: 30, enroll: false},
    {id: 3, name: 'Charlie', age: 35, enroll: false}
]

app.get('/', (req, res) => {
    res.send('Node Js api');
})

app.get('/api/clients', (req, res) => {
    res.send(clients);
});

app.get('/api/clients/:id', (req, res) => {
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (!client) res.status(404).send('Client not found');
    res.send(client);
});

app.post('/api/clients', (req, res) => {
    const client = {
        id: clients.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };
    clients.push(client);
    res.send(client);
});

app.delete('/api/clients/:id', (req, res) => {
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (!client) res.status(404).send('Client not found');
    const index = clients.indexOf(client);
    clients.splice(index, 1);
    res.send(client);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));*/