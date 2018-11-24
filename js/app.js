// Variables
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;



// Clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    // Metodo para restar el presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}

// Clase de interfaz, maneja todo lo relacionado al html
class Interfaz {

    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo) {
        const divMnesaje = document.createElement('div');
        divMnesaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divMnesaje.classList.add('alert-danger');
        } else {
            divMnesaje.classList.add('alert-success');
        }

        divMnesaje.appendChild(document.createTextNode(mensaje));

        // Insertar en el dom
        document.querySelector('.primario').insertBefore(divMnesaje, formulario);

        // Quitar la alerta despues de 3 segundos
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    } 

    //Agregamos el listado en
    agregarListadoGasto(nombre, cantidad) {
        const listadoGasto = document.querySelector('#gastos ul');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between -align-items-center';
        li.innerHTML = `
            ${nombre}
            <span class='badge badge-primary badge-pill'>$ ${cantidad}</span>
        `;
        listadoGasto.appendChild(li);
    }

    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        const presRestanteUser = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presRestanteUser}`;

        this.comprobarPresupuesto();
    }

    comprobarPresupuesto() {
        const total = cantidadPresupuesto.presupuesto;
        const restante = cantidadPresupuesto.restante;

        //Comprobar cuando este al 50 y 25% de su presupuesto
        if((total/4) > restante) {
            const rest = document.querySelector('.restante');
            rest.classList.remove('alert-success', 'alert-warning');
            rest.classList.add('alert-danger');
        } else if ((total/2) > restante) {
            const rest = document.querySelector('.restante');
            rest.classList.remove('alert-success');
            rest.classList.add('alert-warning');
        }
    }
}


// Eventos

document.addEventListener('DOMContentLoaded', function() {
    if (presupuestoUsuario === null || presupuestoUsuario === '' || isNaN(presupuestoUsuario)) {
        window.location.reload();
    } else {
        // Instanciar la clase presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        

        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //Leer los datos del formulario
    const nombreGasto = document.getElementById('gasto').value;
    const cantidadGasto = document.getElementById('cantidad').value;    

    // Instancia de la interfaz;
    const ui = new Interfaz();

    if (nombreGasto === '' || cantidadGasto === '' || isNaN(cantidadGasto)) {
        ui.imprimirMensaje('Hubo un error', 'error');
    } else {
        ui.imprimirMensaje('Agregado correctamente','ok');
        ui.agregarListadoGasto(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});