// Varibles del index
const btnEdit = document.querySelector('.edit');
const btnAdd = document.querySelector('.add');

// Url de la Api
const urlApi = 'http://localhost:3001/api/usuario';

document.addEventListener("DOMContentLoaded", function() {

    btnEdit.addEventListener( 'click', e => {
        e.defaultPrevented;
        let url = urlApi + '/updateUser';

        let sexo = ( document.querySelector('#female').checked  ) ? 'Femenino' : 'Masculino';

        const datos = {
            Id: Number(document.querySelector('#id').value),
            Nombre: document.querySelector('#nombre').value,
            ApellidoP: document.querySelector('#apellido-p').value,
            ApellidoM: document.querySelector('#apellido-m').value,
            Curp: document.querySelector('#curp').value,
            Sexo: sexo,
            EstadoCivil: document.querySelector('#estado-civil').value

        }

        fetch( url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'

            }, 
            body: JSON.stringify(datos)

        }).then( response => {
            return response.json();

        }).then( data => {
            Swal.fire( {
                title: 'Se Edito Correctamente',
                icon: 'success'

            });

            generar();

            formFormat();

        }).catch( err => {
            console.log(err);

        });

    });

    btnAdd.addEventListener( 'click', e => {
        e.defaultPrevented;
        let url = urlApi + '/newUser';

        let sexo = ( document.querySelector('#female').checked  ) ? 'Femenino' : 'Masculino';

        const datos = {
            Id: Number(document.querySelector('#id').value),
            Nombre: document.querySelector('#nombre').value,
            ApellidoP: document.querySelector('#apellido-p').value,
            ApellidoM: document.querySelector('#apellido-m').value,
            Curp: document.querySelector('#curp').value,
            Sexo: sexo,
            EstadoCivil: document.querySelector('#estado-civil').value

        }

        fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            }, 
            body: JSON.stringify(datos)

        }).then( response => {
            return response.json();

        }).then( data => {
            if ( data.error ) {
                Swal.fire( {
                    title: data.error,
                    icon: 'info'
    
                });

                return;

            }

            Swal.fire( {
                title: 'Se Agrego Correctamente',
                icon: 'success'

            });

            generar();

            formFormat();

        }).catch( err => {
            console.log(err);

        });

    });

    generar();

});

let generar = () => {
    let url = urlApi + '/getAllUser';

    fetch( url, {
        method: 'GET'

    }).then( response => {
        return response.json();

    }).then( data => {

        $('.panel-usuarios').empty();
        data.forEach(element => {
            const sexo = ( element.Sexo === 'Femenino' ) ? 'mujer' : 'hombre';
            const newUser = `
            <div class="usuario">

                <div class="img">
                    <img src="./img/${sexo}.svg" alt="${sexo}">
                </div>

                <div class="datos">

                    <p><span class="nombre-u">Nombre:</span> ${element.Nombre} ${element.ApellidoP} ${element.ApellidoM}</p>
                    <p><span class="curp-u">Curp:</span> ${element.Curp}</p>
                    <p><span class="sexo-u">Sexo:</span> ${element.Sexo}</p>
                    <p><span class="estadoc-u">Estado Civil:</span> ${element.EstadoCivil}</p>

                    <div class="botones">
                        <input type="hidden" id="valueId" value="${element.Id}">
                        <button onclick="update(this)" class="update">Actualizar</button>
                        <button onclick="deleteUser(this)" class="delete">Eliminar</button>
                    </div>

                </div>

            </div>`;

            $('.panel-usuarios').append(newUser);

        });

    }).catch( err => {
        console.log(err);

    });

}

let update = (e) => {
    let id = e.previousSibling.previousSibling.value;
    let url = urlApi + '/getUserById/' + id;

    Swal.fire( {
        title: `¿Seguro que quieres actualizar el id "${id}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Si`,

    }).then( result => {
        if ( result.isConfirmed ) {
            fetch( url, {
                method: 'GET'
        
            }).then( response => {
                return response.json();
        
            }).then( data => {
                document.querySelector('#nombre').value = data.Nombre;
                document.querySelector('#apellido-p').value = data.ApellidoP;
                document.querySelector('#apellido-m').value = data.ApellidoM;
                document.querySelector('#curp').value = data.Curp;
                document.querySelector('#estado-civil').value = data.EstadoCivil;
        
                if ( data.Sexo === 'Femenino' ) {
                    document.querySelector('#female').checked = true;
        
                } else {
                    document.querySelector('#male').checked = true;
        
                }
        
                document.querySelector('#id').value = Number(data.Id);
                document.querySelector('#id').disabled = true;
        
                btnEdit.disabled = false;
                btnAdd.disabled = true;
        
            }).catch( err => {
                console.log(err);
        
            });

        }

    });

}

let formFormat = () => {
    document.querySelector('#id').value = 1;
    document.querySelector('#id').disabled = false;
    document.querySelector('#nombre').value = '';
    document.querySelector('#apellido-p').value = '';
    document.querySelector('#apellido-m').value = '';
    document.querySelector('#curp').value = '';
    document.querySelector('#female').checked = true;
    document.querySelector('#estado-civil').value = '';

    btnAdd.disabled = false;
    btnEdit.disabled = true;

}

let deleteUser = (e) => {
    let id = e.previousSibling.previousSibling.previousSibling.previousSibling.value;
    let url = urlApi + '/deleteUserById/' + id;

    Swal.fire( {
        title: `¿Seguro que quieres eliminar el id "${id}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Si`,

    }).then( result => {
        if ( result.isConfirmed ) {
            fetch( url, {
                method: 'DELETE'
        
            }).then( response => {
                return response.json();
        
            }).then( data => {
                Swal.fire( {
                    title: 'Eliminado Correctamente',
                    icon: 'success'
        
                });
        
                generar();
        
                formFormat();
        
            }).catch( err => {
                console.log(err);
        
            });

        }

    });

}