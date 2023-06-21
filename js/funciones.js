


const url = 'http://localhost:8085/api/colegio'



// -------------------------------------------------------------------------------------------------------------------------------------------------------


const listarColegio = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(function(data) {
                const listarColegio = data.msg;
                listarColegio.map((colegio) => {
                    console.log(colegio);

                    const fecha = new Date(colegio.fecha).toLocaleDateString();

                    mensaje +=
                        `<tr>
                        <td>${colegio.direccion}</td>` +
                        `<td>${colegio.latitud}</td>` +
                        `<td>${colegio.longitud}</td>` +
                        `<td>${colegio.descripcion}</td>` +
                        `<td>${fecha}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(colegio)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${colegio._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};



listarColegio();

// -------------------------------------------------------------------------------------------------------------------------------------------------------

const registrarColegio = async () => {
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value
    let descripcion = document.getElementById('descripcion').value


    let colegio = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion
    };

    if (latitud >= 6.14 && latitud <= 6.2 || longitud >= -75.43 && longitud <= -75.5) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(colegio),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert(data.colegio + ' colegio registrado con exito');
                window.location.href = "grid.html";
            });
    } else {
        alert('Problema al registrar');
    }
};


// -------------------------------------------------------------------------------------------------------------------------------------------------------


const editar = (colegio) => {
    let _id = document.getElementById('_id').value = '';
    let direccion = document.getElementById('direccion').value = '';
    let latitud = document.getElementById('latitud').value = '';
    let longitud = document.getElementById('longitud').value = '';
    let descripcion = document.getElementById('descripcion').value = '';

    document.getElementById('_id').value = colegio._id;
    document.getElementById('direccion').value = colegio.direccion;
    document.getElementById('latitud').value = colegio.latitud;
    document.getElementById('longitud').value = colegio.longitud;
    document.getElementById('descripcion').value = colegio.descripcion;
}




const actualizarColegio = async () => {
    let direccion = document.getElementById('direccion').value;
    let latitud = document.getElementById('latitud').value;
    let longitud = document.getElementById('longitud').value;
    let descripcion = document.getElementById('descripcion').value;


    let colegio = {
        _id: document.getElementById('_id').value,
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion

    }


    if (latitud >= 6.14 && latitud <= 6.2 || longitud >= -75.43 && longitud <= -75.5) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(colegio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                alert(json.mensaje);
                alert("Colegio editado correctamente");
                window.location.href = "grid.html";
            })

    } else {
        alert('No se pudo modificar información del colegio');
    }
};


// -------------------------------------------------------------------------------------------------------------------------------------------------------


const eliminar = (_id) => {
    if (confirm('¿Está seguro de eliminar el colegio?')) {
        
        const colegio = { 
            _id: _id 
        };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(colegio),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje);
                window.location.href = "grid.html";
            })
    }
};



// -------------------------------------------------------------------------------------------------------------------------------------------------------




if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarColegio)

}

if (document.querySelector('#editar')) {
    document.querySelector('#editar')
        .addEventListener('click', editar)
    console.log(_id)

}

const editarButton = document.querySelector('#btnEditar');
if (editarButton) {
    editarButton.addEventListener('click', actualizarColegio);
}