const botones = document.querySelector('#botones')
const nombreUsuario = document.querySelector('#nombreUsuario')
const contenidoProtegido = document.querySelector('#contenidoProtegido')
const formulario = document.querySelector('#formulario')
const inputChat = document.querySelector('#inputChat')

$(() => {
    observador();
    function observador() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Existe usuario activo.");
                // User is signed in.
                var displayName = user.displayName;
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
                    <button class="btn btn-outline-danger" id="irIngreso"><a href="ingreso.html">Ingresar</a></button>
                </div>
            </div>`
                $("#informacion").html(info);
            }
        });
    }



    function contenidoChat(user) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault() //Para que no se recargue la página...
            /* console.log(inputChat.value) */
            if (!inputChat.value.trim()) { // .trim()Elimina espacios ingresados al inicio y al final del mensaje...
                alert("No ha ingresado ningún mensaje... Intente nuevamente");
                return
            }

            firebase.firestore().collection('chat').add({
                texto: inputChat.value,
                uid: user.uid,
                fecha: Date.now()
            })
                .then(res => { /* Guarda Mensaje */ })
                .catch(e => console.log(e))

            inputChat.value = ''

        })

        firebase.firestore().collection('chat').orderBy('fecha')
            .onSnapshot(query => {
                contenidoProtegido.innerHTML = ''
                query.forEach(doc => {
                    if (doc.data().uid === user.uid) {
                        contenidoProtegido.innerHTML += /*html*/`
                        <div class="d-flex justify-content-end sms">
                            <span class="badge badge-pills badge-enviado txt">${doc.data().texto}</span>
                        </div>
                    `
                    } else {
                        contenidoProtegido.innerHTML += /*html*/`
                        <div class="d-flex justify-content-start sms">
                            <span class="badge badge-pills badge-recibido txt">${doc.data().texto}</span>
                        </div>
                    `
                    }
                    contenidoProtegido.scrollTop = contenidoProtegido.scrollHeight //Al cargar o enviar un mensaje baje automaticamente
                })
            })
    }
})