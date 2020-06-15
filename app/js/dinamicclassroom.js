const nombreUsuario = document.querySelector('#nombreUsuario')
const contenidoProtegido = document.querySelector('#contenidoProtegido')
const formulario = document.querySelector('#formulario')
const inputChat = document.querySelector('#inputChat')
let nameUsuario;

$(() => {
    observador();
    function observador() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Existe usuario activo.");
                // User is signed in.
                var displayName = user.displayName;
                nameUsuario = displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                /* location.assign("home.html"); */
                $("#nombreUsuario").html(displayName + " - DinamizaThor")
                contenidoChat(user);
            } else {
                console.log("No existe usuario loggeado.");
                // User is signed out.
                let info = `<div class="container mt-5">
                <div class="alert alert-warning" role="alert">
                    <p>Sesión no iniciada...</p>
                    <p>Para iniciar sesión, de click en el botón Ingresar.</p>
                    <a href="ingreso.html"><button class="btn btn-outline-danger" id="irIngreso">Ingresar</button></a>
                </div>
            </div>`
                $(".informacion").html(info);
            }
        });
    }



    function contenidoChat(user) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault() //Para que no se recargue la página...
            /* console.log(inputChat.value) */
            if (!inputChat.value.trim()) { // .trim()Elimina espacios ingresados al inicio y al final del mensaje...
                Swal.fire({
                    text: 'No ha ingresado ningún mensaje... Intente nuevamente...',
                    icon: 'info',
                    toast: true,
                    timer: 2500,
                    timerProgressBar: true,
                    position: 'center',
                    showConfirmButton: false,
                    customClass: {
                        content: 'alerta'
                    }
                })
                return
            }

            firebase.firestore().collection('chat').add({
                texto: inputChat.value,
                uid: user.uid,
                uname: user.displayName,
                fecha: Date.now()
            })
                .then(res => { /* Guarda Mensaje */ })
                .catch(e => console.log(e))

            inputChat.value = ''

        })

        firebase.firestore().collection('chat').orderBy('fecha')
            .onSnapshot(query => {
                contenidoProtegido.innerHTML = '' /* Añado los mensajes leyendolos de la base de datos "chat" y le pongo las clases */
                query.forEach(doc => {
                    if (doc.data().uid === user.uid) {
                        contenidoProtegido.innerHTML += /*html*/`
                        <div class="d-flex justify-content-end sms">
                            <span class="badge badge-pills badge-enviado txt">
                                <p class="uname">${nameUsuario}</p>
                                <p>${doc.data().texto}</p>
                            </span>
                        </div>
                    `
                    } else {
                        contenidoProtegido.innerHTML += /*html*/`
                        <div class="d-flex justify-content-start sms">
                            <span class="badge badge-pills badge-recibido txt">
                                <p class="uname">${doc.data().uname}</p>
                                <p>${doc.data().texto}</p>
                            </span>
                        </div>
                    `
                    }
                    contenidoProtegido.scrollTop = contenidoProtegido.scrollHeight //Al cargar o enviar un mensaje baje automaticamente
                })
            })
    }
})