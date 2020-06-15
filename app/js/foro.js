var db = firebase.firestore();
var storage = firebase.app().storage("gs://usuarios-fc2d0.appspot.com");
var correo;

$(() => {
    observador();

    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().email == correo) {
                $("#nombre").html(doc.data().first);
                $("#perfil").val(doc.data().profile);
                $("#ident").val(doc.data().doc);
                $("#correo").val(doc.data().email);
            }
        });
    });
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
            $("#imgPerfil").attr("src", photoURL);
        } else {
            console.log("No existe usuario loggeado.");
            let info = `<div class="container mt-5">
                <div class="alert alert-warning" role="alert">
                    <p>Sesión no iniciada...</p>
                    <p>Para iniciar sesión, de click en el botón Ingresar.</p>
                    <button class="btn btn-outline-danger" id="irIngreso"><a href="ingreso.html">Ingresar</a></button>
                </div>
            </div>`
            $(".informacion").html(info);

        }
    });
}