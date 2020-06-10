var db = firebase.firestore();
var correo;
$(() => {
    observador();
    function observador() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Existe usuario activo.");
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                correo = email;
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

            /* $("#pnombre").html(doc.data().first); */
            /* $("#imgPerfil").attr("src", photoURL); */
            /* $("#correo").val(email); */
        });
    }

    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().email == correo){
                $("#nombre").html(doc.data().first);
                $("#documento").html(doc.data().doc);
                $("#edad").html(doc.data().age);
                $("#email").html(doc.data().email);
            }
        });
    });
    
})


function cerrar() {
    firebase.auth().signOut().then(function () {
        alert("Saliendo...");
        location.assign("ingreso.html");
    }).catch(function (error) {
        console.log("Ocurrió un error.");
        console.log(error);
    })
}