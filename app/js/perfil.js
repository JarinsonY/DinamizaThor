var db = firebase.firestore();
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
                var profile = user.profile;
                console.log(user.profile);
                console.log(user.photoURL);
                console.log(user.displayName);
                console.log('*************');
                console.log('*************');
                console.log(user.emailVerified);
                console.log('*************');
                console.log(user.email);
            } else {
                // User is signed out.
            }
            
            /* $("#pnombre").html(doc.data().first); */
            /* $("#imgPerfil").attr("src", photoURL); */
            /* $("#correo").val(email); */
        });
    }
})

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        $("#pnombre").html(doc.data().first);
        $("#perfil").val(doc.data().profile);
        $("#ident").val(doc.data().doc);
        $("#correo").val(doc.data().email);
    });
});

function cerrar() {
    firebase.auth().signOut().then(function () {
        alert("Saliendo...");
        location.assign("ingreso.html");
    }).catch(function (error) {
        console.log("Ocurrió un error.");
        console.log(error);
    })
}