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
        toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 5000})
        //$('#element').toast('show');
        //toastr.error("No ha ingresado Nombre","Aviso!");
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
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var profile = user.profile;
            /* location.assign("home.html"); */
        } else {
            // User is signed out.
            console.log("No existe usuario loggeado.");
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