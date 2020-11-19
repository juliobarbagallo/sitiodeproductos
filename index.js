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

session = require('express-session');

app.use(session({
  secret: 'elSecreto',
  name: 'sessionId',
  proxy: true,
  resave: true,
  saveUninitialized: true ,
  cookie: { maxAge: 24 * 60 * 60 * 1000  }  
}));

var Allusers = function(req, res, next) {
    if (req.session.logeado === 'ok')
      return next();
    else
      return res.status(401).send(`Tu sesion expiró o No estas logeado. <a href="/">Home</a>`);
  };

app.get('/', function(req, res) {    
    fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => res.render('index.html', {productos:productos}))
});

app.get('/carrito', Allusers, function(req, res) {    
res.send('hola')    
});

app.get('/login', function(req, res) {
var ref = ''
var dato = ''
/* 
var datos = [{"user":"dami","password":"1234"},{"user":"coco","password":"1111"}]
for (dato of datos){
if ( req.body.user === dato.user && req.body.pass === dato.password){
req.session.logeado === 'ok'}
ref = '/' 
dato = 'Entrar'}
 */
res.render('login.html', {ref:ref,dato:dato})
});    

app.get('/login/:id', function(req, res) { 
    var ref = `/producto/${req.params.id}` 
    var dato = 'Entrar' 
    res.render('login.html', {ref:ref,dato:dato})
    });

app.get('/producto/:id', function(req, res) {
var input = `<input type="submit" value="Ad to cart">`
var ruta= `/login/${req.params.id}`
    fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => {
if (req.session.logeado === true){input = `<input type="submit" value="Ad to cart">`; ruta= `/login`}
res.render('producto.html', {ruta:ruta,input:input,productos:productos, id:req.params.id})})
});



app.get('/categorias/:categoria', function(req, res) {
    fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => res.render('categorias.html', {productos:productos, categoria:req.params.categoria}))
});


app.listen(8080);