// npm install --save express nunjucks node-fetch
const express = require('express');
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');
var bodyParser = require('body-parser');
// Inicializamos express
const app = express();
// Declaramos public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
app.use('/public', express.static(path.join(__dirname + '/public')));

nunjucks.configure(path.join(__dirname + '/views/'), {
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

app.get('/', function(req, res) {  
  if (req.session.logeado && !req.session.carrito){
    req.session.carrito =[]
  }  
    fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => res.render('index.html', {productos:productos,log:req.session.logeado}))
});


app.all('/carrito', function(req, res) {
fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
  .then(response => response.json())
  .then(productos =>{
if (req.session.logeado === true){
for (producto of productos){ 
if (req.body.id == producto.id){
req.session.carrito.push(`<li>${producto.nombre} - $${producto.precio}</li>`)}}}
res.render('carrito.html', {cart:req.session.carrito, log:req.session.logeado})})
});

app.get('/carro', function(req, res) {    
res.render('carrito.html', {log:req.session.logeado,cart:req.session.carrito})
});

app.all('/login', function(req, res) {
var logeado = ''
var datos = [{"user":"dami","password":"1234"},{"user":"coco","password":"1111"}]
for (dato of datos){
if ( req.body.user === dato.user && req.body.pass === dato.password){
req.session.logeado = true;
logeado = `<a href="/"><input class="btn btn-info my-2 my-sm-0" type="button" value="Volver a comprar"></a>`
}}
res.render('login.html', {logeado:logeado,log:req.session.logeado})
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  var logout = `<h1>Sesión cerrada!</h1>`;
  res.render('logout.html', {logout:logout})
});


app.get('/producto/:id', function(req, res) {
  if (req.session.logeado && !req.session.carrito){
    req.session.carrito =[]
  } 
var input = `<a class="btn btn-info my-2 my-sm-0" href='/login'>Ad to cart</a>`
fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => {
if (req.session.logeado === true){input = `<input class="btn btn-info my-2 my-sm-0" type="submit" value="Ad to cart">`}
res.render('producto.html', {input:input,productos:productos, id:req.params.id, log : req.session.logeado})})
});



app.get('/categorias/:categoria', function(req, res) {
    fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
    .then(response => response.json())
    .then(productos => res.render('categorias.html', {productos:productos, categoria:req.params.categoria, log:req.session.logeado}))
});


app.listen(8080, function(){

  console.log("Iniciado en puerto 8080");
});