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
                console.log('*************');
                console.log(user.emailVerified);
                console.log('*************');
                /* location.assign("home.html"); */
            } else {
                // User is signed out.
                let info =`<div class="container mt-5">
                <div class="alert alert-warning" role="alert">
                    Sesión no iniciada...
                </div>
            </div>`
            $("#informacion").html(info);
            }
        });
    }
})