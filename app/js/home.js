$(() => {
    observador();
    /* FECHA */
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var f = new Date();
    $("#fecha").append("Hoy es " + diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());


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
})

function cerrar() {
    Swal.fire({
        text: 'Cerrando sesión',
        icon: 'warning',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        position:'top-end',
        showConfirmButton: false
    })
    firebase.auth().signOut().then(function () {
        location.assign("ingreso.html");
    }).catch(function (error) {
        console.log("Ocurrió un error.");
        console.log(error);
    })
}