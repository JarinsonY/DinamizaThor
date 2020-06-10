var db = firebase.firestore();
var storage = firebase.app().storage("gs://usuarios-fc2d0.appspot.com");
var correo;

$(() => {
    observador();

    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().email == correo){
                $("#nombre").val(doc.data().first);
                $("#perfil").val(doc.data().profile);
                $("#ident").val(doc.data().doc);
                $("#correo").val(doc.data().email);
                console.log(doc.data().first)
                console.log(doc.data().profile)
                console.log(doc.data().doc)
                console.log(doc.data().email)
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
            console.log(photoURL)
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
                $("#informacion").html(info);
                
        }
    });
}

function cambiarImgPerfil(){

    var user = firebase.auth().currentUser;
    var file = ($("#inputGroupFile01"))[0].files[0];

    
    console.log(user);
    console.log(file);
    if(!file){
        alert("Debe elegir un archivo.");

    } else{
        var storageRef = storage.ref('/usuarioImgPerfil/'+file.name);
        
        var uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', function(querySnapshot){

        }, function(error){
            console.log(error)
        }, function(){
            /* Cuando se sube el archivo a firebase */
            storageRef.getDownloadURL().then(function(url) {
            user.updateProfile({
                photoURL: url
              }).then(function() {
                // Update successful.
                console.log("Update successful.");
                location.reload(true)
              }).catch(function(error) {
                console.log(e)
              });
            })
        });
    }

}

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