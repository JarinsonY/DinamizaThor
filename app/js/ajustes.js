var db = firebase.firestore();
var correo;

$(() => {
    observador();
})
function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Existe usuario activo.");
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            correo = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var profile = user.profile;
        } else {
            console.log("No existe usuario loggeado.");
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


db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        $("#pnombre").val(doc.data().first);
        $("#perfil").val(doc.data().profile);
        $("#ident").val(doc.data().doc);
        $("#correo").val(doc.data().email);
    });
});

function modificarClave() {
    var auth = firebase.auth();
    var emailAddress = correo;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        alert("Por favor revise su correo para restablecer su contraseña...");
        alert("Hecho");
    }).catch(function (error) {
        // An error happened.
        alert("Es necesario haber ingresado un correo...");
        alert(error)
    });
}