function ingresar() {
    var email = $("#email").val();
    var contrasena = $("#contrasena").val();

    firebase.auth().signInWithEmailAndPassword(email, contrasena).then(function () {
        aparece(user);
    }).catch(function (error) {
        alert("Datos inválidos, por favor intente de nuevo...");
        // Handle Errors here.
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

    firebase.auth().createUserWithEmailAndPassword(email2, contrasena2).then(function () {
        alert("Registro completado, por favor revisa tu correo para verificar su cuenta.");
        verificar();
    })
        .catch(function (error) {
            // Handle Errors here.
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
        alert("Valide sus datos.")
        console.log(error);
    });
}

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
            console.log('*************');
            console.log(user.emailVerified);
            console.log('*************');
        } else {
            // User is signed out.
            console.log("No existe usuario activo.");
        }
    });
}

observador();

function aparece() {
    location.assign("home.html");
}
function noAparece(){
    
}

function cerrar() {
    firebase.auth().signOut().then(function () {
        alert("Saliendo...");
        location.assign("ingreso.html");
    }).catch(function (error) {
        console.log("Ocurrió un error.");
        console.log(error);
    })
}

function olvido() {
    var auth = firebase.auth();
    var emailAddress = $("#email").val();

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        alert("Por favor revise su correo para restablecer la contraseña...");
    }).catch(function (error) {
        // An error happened.
        alert("Es necesario haber ingresado un correo...");
    });
}