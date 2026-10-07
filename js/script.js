// ======================================================
// Jam'sPaoTech - JavaScript principal
// ======================================================


// ======================================================
// 1. URL DE GOOGLE APPS SCRIPT
// ======================================================

// Pega aquí la URL que obtuviste al implementar
// tu Google Apps Script.
//
// Ejemplo:
// const URL_APPS_SCRIPT = "https://script.google.com/macros/s/XXXXXXXX/exec";

const URL_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbxlXJQ4QvQbEELXch09XN4NxsP8dyor1RxxIZ4LlmE08Kqy42s5BQsWgdhIiWQMjpki/exec";


// ======================================================
// 2. ELEMENTOS DEL HTML
// ======================================================

const contenedorCarreras =
    document.getElementById("contenedorCarreras");

const selectCarrera =
    document.getElementById("carrera");

const formulario =
    document.getElementById("formularioRegistro");

const mensajeFormulario =
    document.getElementById("mensajeFormulario");


// ======================================================
// 3. INICIAR LA PÁGINA
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Jam'sPaoTech iniciado correctamente.");

    // Cargar las carreras desde Google Sheets
    cargarCarrerasDesdeGoogleSheets();

});


// ======================================================
// 4. CARGAR CARRERAS DESDE GOOGLE SHEETS
// ======================================================

async function cargarCarrerasDesdeGoogleSheets() {

    try {

        // Mostrar mensaje de carga
        contenedorCarreras.innerHTML = `
            <div class="mensaje-cargando">

                <div
                    class="spinner-border"
                    role="status"
                >
                    <span class="visually-hidden">
                        Cargando...
                    </span>
                </div>

                <p>
                    Cargando programas...
                </p>

            </div>
        `;


        // Comprobar que se haya colocado la URL
        if (
            URL_APPS_SCRIPT ===
            "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT"
        ) {

            throw new Error(
                "No se ha configurado la URL de Google Apps Script."
            );

        }


        // Realizar petición GET
        const respuesta = await fetch(
            `${URL_APPS_SCRIPT}?accion=carreras`
        );


        // Comprobar respuesta
        if (!respuesta.ok) {

            throw new Error(
                "No se pudo conectar con Google Apps Script."
            );

        }


        // Convertir respuesta a JSON
        const datos = await respuesta.json();


        console.log(
            "Respuesta de Google Apps Script:",
            datos
        );


        // Comprobar si Apps Script respondió correctamente
        if (!datos.success) {

            throw new Error(
                datos.message ||
                "No se pudieron obtener las carreras."
            );

        }


        // Mostrar las carreras
        cargarCarreras(datos.carreras);


    } catch (error) {

        console.error(
            "Error al cargar las carreras:",
            error
        );


        contenedorCarreras.innerHTML = `
            <div class="mensaje-cargando">

                <p>
                    No se pudieron cargar los programas.
                </p>

                <small>
                    Verifica la conexión con Google Sheets.
                </small>

            </div>
        `;

    }

}


// ======================================================
// 5. CARGAR LAS CARRERAS RECIBIDAS
// ======================================================

function cargarCarreras(carreras) {

    console.log(
        "Carreras recibidas:",
        carreras
    );


    // Crear las tarjetas
    mostrarCarreras(carreras);


    // Llenar el select
    llenarSelectCarreras(carreras);

}


// ======================================================
// 6. MOSTRAR LAS TARJETAS
// ======================================================

function mostrarCarreras(carreras) {

    // Limpiar contenedor
    contenedorCarreras.innerHTML = "";


    // Comprobar si existen carreras
    if (
        !carreras ||
        carreras.length === 0
    ) {

        contenedorCarreras.innerHTML = `
            <div class="mensaje-cargando">

                <p>
                    No se encontraron programas disponibles.
                </p>

            </div>
        `;

        return;

    }


    // Recorrer las carreras
    carreras.forEach(function (carrera) {

        // Crear tarjeta
        const tarjeta =
            document.createElement("article");


        tarjeta.classList.add(
            "carrera-card"
        );


        // Crear imagen
        const imagen =
            document.createElement("img");


        imagen.classList.add(
            "carrera-card-image"
        );


        imagen.src =
            carrera.imagen || "img/portada.jpg";


        imagen.alt =
            carrera.carrera;


        // Crear cuerpo
        const cuerpo =
            document.createElement("div");


        cuerpo.classList.add(
            "carrera-card-body"
        );


        // Crear título
        const titulo =
            document.createElement("h3");


        titulo.textContent =
            carrera.carrera;


        // Crear descripción
        const descripcion =
            document.createElement("p");


        descripcion.textContent =
            carrera.descripcion;


        // Crear botón
        const boton =
            document.createElement("button");


        boton.type = "button";

        boton.classList.add(
            "btn-mas-info"
        );

        boton.textContent =
            "Más información";


        // Evento del botón
        boton.addEventListener(
            "click",
            function () {

                mostrarInformacion(
                    carrera.carrera
                );

            }
        );


        // Construir tarjeta
        cuerpo.appendChild(titulo);

        cuerpo.appendChild(descripcion);

        cuerpo.appendChild(boton);

        tarjeta.appendChild(imagen);

        tarjeta.appendChild(cuerpo);


        // Agregar tarjeta al contenedor
        contenedorCarreras.appendChild(
            tarjeta
        );

    });

}


// ======================================================
// 7. LLENAR EL SELECT DEL FORMULARIO
// ======================================================

function llenarSelectCarreras(carreras) {

    // Limpiar opciones actuales
    selectCarrera.innerHTML = `
        <option value="">
            Selecciona un programa
        </option>
    `;


    // Agregar carreras
    carreras.forEach(function (carrera) {

        const opcion =
            document.createElement("option");


        opcion.value =
            carrera.carrera;


        opcion.textContent =
            carrera.carrera;


        selectCarrera.appendChild(
            opcion
        );

    });

}


// ======================================================
// 8. BOTÓN MÁS INFORMACIÓN
// ======================================================

function mostrarInformacion(nombreCarrera) {

    alert(
        "Programa seleccionado:\n\n" +
        nombreCarrera +
        "\n\nPróximamente podrás conocer más información sobre este programa."
    );

}


// ======================================================
// 9. EVENTO DEL FORMULARIO
// ======================================================

formulario.addEventListener(
    "submit",
    function (evento) {

        // Evitar recarga de página
        evento.preventDefault();


        // Obtener valores
        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();


        const correo =
            document
                .getElementById("correo")
                .value
                .trim();


        const telefono =
            document
                .getElementById("telefono")
                .value
                .trim();


        const carrera =
            document
                .getElementById("carrera")
                .value;


        const terminos =
            document
                .getElementById("terminos")
                .checked;


        // ==============================================
        // VALIDAR NOMBRE
        // ==============================================

        if (nombre === "") {

            mostrarMensaje(
                "Por favor, ingresa tu nombre completo.",
                "error"
            );

            document
                .getElementById("nombre")
                .focus();

            return;

        }


        // ==============================================
        // VALIDAR CORREO
        // ==============================================

        if (!validarCorreo(correo)) {

            mostrarMensaje(
                "Ingresa un correo electrónico válido.",
                "error"
            );

            document
                .getElementById("correo")
                .focus();

            return;

        }


        // ==============================================
        // VALIDAR TELÉFONO
        // ==============================================

        if (telefono === "") {

            mostrarMensaje(
                "Por favor, ingresa tu número de teléfono.",
                "error"
            );

            document
                .getElementById("telefono")
                .focus();

            return;

        }


        // ==============================================
        // VALIDAR CARRERA
        // ==============================================

        if (carrera === "") {

            mostrarMensaje(
                "Selecciona un programa de interés.",
                "error"
            );

            document
                .getElementById("carrera")
                .focus();

            return;

        }


        // ==============================================
        // VALIDAR TÉRMINOS
        // ==============================================

        if (!terminos) {

            mostrarMensaje(
                "Debes aceptar los términos y condiciones.",
                "error"
            );

            return;

        }


        // ==============================================
        // CREAR OBJETO DE DATOS
        // ==============================================

        const datos = {

            nombre: nombre,

            correo: correo,

            telefono: telefono,

            carrera: carrera,

            terminos: terminos

        };


        console.log(
            "Datos del formulario:",
            datos
        );


        // Enviar a Google Sheets
        enviarFormulario(datos);

    }
);


// ======================================================
// 10. VALIDAR CORREO
// ======================================================

function validarCorreo(correo) {

    const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return expresionCorreo.test(
        correo
    );

}


// ======================================================
// 11. ENVIAR FORMULARIO MEDIANTE POST
// ======================================================

async function enviarFormulario(datos) {

    try {

        // Mostrar mensaje
        mostrarMensaje(
            "Enviando información...",
            "cargando"
        );


        // Crear datos para POST
        const datosFormulario =
            new URLSearchParams();


        datosFormulario.append(
            "nombre",
            datos.nombre
        );


        datosFormulario.append(
            "correo",
            datos.correo
        );


        datosFormulario.append(
            "telefono",
            datos.telefono
        );


        datosFormulario.append(
            "carrera",
            datos.carrera
        );


        datosFormulario.append(
            "terminos",
            datos.terminos
        );


        // Enviar información
        const respuesta =
            await fetch(
                URL_APPS_SCRIPT,
                {
                    method: "POST",
                    body: datosFormulario
                }
            );


        // Comprobar respuesta
        if (!respuesta.ok) {

            throw new Error(
                "No se pudo enviar el formulario."
            );

        }


        // Convertir respuesta
        const resultado =
            await respuesta.json();


        console.log(
            "Respuesta del servidor:",
            resultado
        );


        // Comprobar resultado
        if (!resultado.success) {

            throw new Error(
                resultado.message ||
                "No se pudo guardar el registro."
            );

        }


        // Mostrar éxito
        mostrarMensaje(
            "¡Registro enviado correctamente!",
            "exito"
        );


        // Limpiar formulario
        formulario.reset();


    } catch (error) {

        console.error(
            "Error al enviar formulario:",
            error
        );


        mostrarMensaje(
            "No se pudo enviar el registro. Inténtalo nuevamente.",
            "error"
        );

    }

}


// ======================================================
// 12. MOSTRAR MENSAJES DEL FORMULARIO
// ======================================================

function mostrarMensaje(
    mensaje,
    tipo
) {

    mensajeFormulario.textContent =
        mensaje;


    // Limpiar clases anteriores
    mensajeFormulario.className =
        "";


    mensajeFormulario.classList.add(
        "mensaje-formulario"
    );


    // Mensaje de error
    if (tipo === "error") {

        mensajeFormulario.classList.add(
            "mensaje-error"
        );

    }


    // Mensaje exitoso
    if (tipo === "exito") {

        mensajeFormulario.classList.add(
            "mensaje-exito"
        );

    }


    // Mensaje de carga
    if (tipo === "cargando") {

        mensajeFormulario.classList.add(
            "mensaje-cargando-formulario"
        );

    }

}