const url = 'http://localhost:8085/api/colegio'
const listarColegio = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)        
        .then(res => res.json())
        .then(function (data) {


            let listarColegio = data.colegio
            listarColegio.map((colegio) => {
                mensaje += 
                `<tr>
                <td>${colegio.direccion}</td>`+
                `<td>${colegio.latitud}</td>`+
                `<td>${colegio.longitud}</td>`+
                `<td>${colegio.descripcion}</td>`+                  +
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${usuario._id}")'>Eliminar</a>
                </td>
                </tr>`
                body.innerHTML = mensaje
            }   
            )
        })
    }
}

listarColegio()

const registrarColegio = async() =>{
o
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitudd').value
    let descripcion = document.getElementById('descripcion').value
   

    let colegio = {
       direccion: direccion,
       latitud: latitud,
       longitud: longitud,
       descripcion: descripcion
    }

    // if((password.length >0 && confirmarPassword.length>0) && (password == confirmarPassword)){
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    // }
    // else{
    //     alert('El password y la confirmación del Password no coinciden. Por favor verifique')
    // }
}

const editar = (colegio) =>{
    document.getElementById('direccion').value = ''
    document.getElementById('latitud').value = ''
    document.getElementById('longitud').value = ''
    document.getElementById('descripcion').value = ''
    
    

    document.getElementById('direccion').value = colegio.direccion
    document.getElementById('latitud').value = colegio.latitud
    document.getElementById('longitud').value = colegio.longitud
    document.getElementById('descripcion').value = colegio.descripcion
    
}

const actualizarUsuario = async() =>{
    //Captura de valores de datos enviados desde el formulario
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value
    let descripcion = document.getElementById('descripcion').value



    let colegio = {
        direccion: document.getElementById('direccion').value,
        latitud: document.getElementById('latitud').value,
        longitud: document.getElementById('longitud').value,
        descripcion: document.getElementById('descripcion').value,
        
    }

    // if((password.length >0 && confirmarPassword.length>0) && (password == confirmarPassword)){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(colegio),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    // }
    // else{
    //     alert('El password y la confirmación del Password no coinciden. Por favor verifique')
    // }
}

const eliminar =(direccion) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
            //Captura de valores de datos enviados desde el formulario
    let usuario = {
        _id: _id
    }
    
    //console.log(usuario)

       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrar'))
{
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrarUsuario)
}

if(document.querySelector('#btnActualizar'))
{
    document.querySelector('#btnActualizar')
.addEventListener('click', actualizarUsuario)
}


//Installar en la api(backend) los paquetes:
//cors
//body-parser