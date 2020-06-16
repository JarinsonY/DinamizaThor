// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
$(() => {
    observador();
    Swal.fire({
        title: 'BIENVENIDO PROFESOR',
        text: '\nProfe Posada, a su disposición tendrá la siguiente cuenta: \n\n Email: posada@dinamizathor.com \nContraseña: docente.posada'
        +'\n\nEn todo caso, el botón registrarse sirve y nos gustaría que lo ponga a prueba.',
        icon: 'info',
        confirmButtonText: 'Entendido'
    })
})

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var profile = user.profile;
        } else {
            // User is signed out.
            console.log("No existe usuario loggeado.");
        }
    });
}


function ingresar() {
    var email = $("#email").val();
    var contrasena = $("#contrasena").val();

    firebase.auth().signInWithEmailAndPassword(email, contrasena).then(function () {
        aparece();
    }).catch(function (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Datos inválidos, por favor intente de nuevo...',
            icon: 'error',
            /* footer: 'Asegurese de ingresar datos', */
            confirmButtonText: 'Entendido'
        })
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
}

function registrar() {
    var email2 = $("#email2").val();
    var contrasena2 = $("#contrasena2").val();
    var nombre = $("#nombre").val();
    var documeto = $("#documento").val();
    var edad = $("#edad").val();
    var perfil = $("#select").val();
    /* var foto = $("#exampleFormControlFile1"); */

    firebase.auth().createUserWithEmailAndPassword(email2, contrasena2).then(function () {
        Swal.fire({
            title: 'Bienvenid@!',
            text: 'Registro completado, te llegará un correo para verificar su cuenta...',
            icon: 'success',
            confirmButtonText: 'Entendido'
        })
        var user = firebase.auth().currentUser;


        user.updateProfile({ //Añado info del usuario en la base de datos, con img por defecto...
            displayName: nombre,
            profile: perfil,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/usuarios-fc2d0.appspot.com/o/usuarioImgPerfil%2FuserProfile.png?alt=media&token=c6c2f28b-4212-49ac-b591-a027759d87fb"
            /* photoURL: foto */
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });


        db.collection("users").add({
            first: nombre,
            doc: documeto,
            age: edad,
            email: email2,
            profile: perfil
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        verificar();

        /* ABRIR INTRO */
        $("#intro").click();

    })
        .catch(function (error) {
            // Handle Errors here.
            Swal.fire({
                title: 'Error!',
                text: 'Datos inválidos, por favor complete correctamente todos los campos',
                icon: 'error',
                /* footer: 'Asegurese de ingresar datos', */
                confirmButtonText: 'Intetar de nuevo'
            })
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
}

function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log("Enviando correo...");
    }).catch(function (error) {
        // An error happened.
        Swal.fire({
            title: 'Error!',
            text: 'Verfique sus datos nuevamente.',
            icon: 'error',
            /* footer: 'Asegurese de ingresar datos', */
            confirmButtonText: 'Entendido'
        })
        console.log(error);
    });
}

function aparece() {
    location.assign("home.html");
}


function olvido() {
    var auth = firebase.auth();
    var emailAddress = $("#email").val();

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        Swal.fire({
            title: 'Error!',
            text: 'Por favor revisa tu correo para restablecer su contraseña...',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
    }).catch(function (error) {
        // An error happened.
        Swal.fire({
            title: 'Error!',
            text: 'Es necesario que ingreses un correo...',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
    });
}