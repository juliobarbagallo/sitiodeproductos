console.log("Cargado desde el lado cliente")

fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
  .then(response => response.json())
  .then(data =>{ 
    
    console.log(data)

  for (i in data.sort()){
    if (i > 0){  
    if (data[i].categoria != data[i-1].categoria){
        document.getElementById('drop').insertAdjacentHTML(`beforeend`, `<a class="dropdown-item" href="/categorias/${data[i].categoria}">${data[i].categoria}</a>`)
        console.log(data[i].categoria)
    }}
    else{
        document.getElementById('drop').insertAdjacentHTML(`beforeend`, `<a class="dropdown-item" href="/categorias/${data[i].categoria}">${data[i].categoria}</a>`)
        console.log(data[i].categoria)}
    }   
});

function search(event){
var a = event.target.value
    console.log(a)
var buscar = a.length
console.log(buscar)
fetch('https://raw.githubusercontent.com/juliobarbagallo/sitiodeproductos/master/data/productos.json')
.then(response => response.json())
.then(data =>{ 
var lista = []
for (prod of data){
if(buscar > 0 && prod.nombre.slice(0,buscar).toLowerCase() === a.toLowerCase()){
console.log(prod.nombre+prod.id)
lista += `<li><a style="margin: 1% 0;" class="dropdown-item" href="/producto/${prod.id}">${prod.nombre}</a></li>`
}
}
document.getElementById('buscar').innerHTML = lista  
})
}

