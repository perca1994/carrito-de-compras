//variables
const carrito  = document.querySelector('#carrito');
const  contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
     //Cuando Agregas un curso presionando "Agregar al carrito"
    listaCurso.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
         articulosCarrito = [];
         limpiarHTML();
    });

}


//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
//Eliminar un curso del carrito
function eliminarCurso(e){
       if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //eliminar del arreglo por el data id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
   
        carritoHTML();

       }
}
//lee el contenido del HTML al que le dimos clic y extrae la informacion del curso
function leerDatosCurso(curso){
    //crear un objeto con el contenido del curso actual
    infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos cantidad
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso];
    
      
    }

    //agregar objeto al carrito
    carritoHTML();
}

//Muestra el carrito de compras en el html
function carritoHTML(){

    //limpiar el html
     limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso=>{

        const {imagen,titulo,precio,id,cantidad} = curso;
      

        const row = document.createElement('TR');
        row.innerHTML = `
        <td>
           <img src="${imagen}" width="100" >
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
          <a href="#"  class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;


        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
