// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();

observador();

function ingresar() {
    var email = $("#email").val();
    var contrasena = $("#contrasena").val();

    firebase.auth().signInWithEmailAndPassword(email, contrasena).then(function () {
        aparece();
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
    var nombre = $("#nombre").val();
    var documeto = $("#documento").val();
    var edad = $("#edad").val();
    var perfil = $("#select").val();
    /* var foto = $("#exampleFormControlFile1"); */

    firebase.auth().createUserWithEmailAndPassword(email2, contrasena2).then(function () {
        alert("Registro completado, por favor revisa tu correo para verificar su cuenta.");
        var user = firebase.auth().currentUser;
        

        user.updateProfile({
            displayName: nombre,
            profile: perfil
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
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
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
        alert("Valide sus datos.");
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
            var profile = user.profile;
            console.log('*************');
            console.log(user.emailVerified);
            console.log('*************');
            /* location.assign("home.html"); */
        } else {
            // User is signed out.
        }
    });
}


function aparece() {
    location.assign("home.html");
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
        alert("Por favor revise su correo para restablecer su contraseña...");
        alert("Hecho")
    }).catch(function (error) {
        // An error happened.
        alert("Es necesario haber ingresado un correo...");
        alert(error)
    });
}