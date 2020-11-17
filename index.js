// npm install --save express nunjucks node-fetch
const express = require('express');
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');

// Inicializamos express
const app = express();
// Declaramos public
app.use(express.static('public'));

// Declaramos la carpeta de las vistas de Nunjucks
nunjucks.configure('views', {
    autoescape: false,
    express: app
});

app.get('/', function(req, res) {    
    fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => res.render('index.html', {productos:productos}))
});

app.get('/producto/:id', function(req, res) {
    fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => res.render('producto.html', {productos:productos, id:req.params.id}))
});

app.listen(8080);