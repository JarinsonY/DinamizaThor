$(() => {
    $('ul.nav li a:first').addClass('active');
    $('.asignaturas article').hide();
    $('.asignaturas article:first').show();

    $('ul.nav li a').click(function () {
        $('ul.nav li a').removeClass('active');
        $(this).addClass('active');
        $('.asignaturas article').hide();
        var activeTab = $(this).attr('href');
        $(activeTab).show();
        
        return false;
    });
    $("#body_tabla1").append(generarNotas());
    $("#body_tabla2").append(generarNotas());
    $("#body_tabla3").append(generarNotas());
    $("#body_tabla4").append(generarNotas());
    $("#body_tabla5").append(generarNotas());

})

function generarNotas() {
    var min = 1.0;
    var max = 5.0;
    var nota1 = (Math.random() * (max - min) + min).toFixed(2);
    var nota2 = (Math.random() * (max - min) + min).toFixed(2);
    var nota3 = (Math.random() * (max - min) + min).toFixed(2);
    var nota4 = (Math.random() * (max - min) + min).toFixed(2);
    var nota5 = (Math.random() * (max - min) + min).toFixed(2);
    var fila = '';

    fila +=
        `   <tr>
                <td>${"Actividad"}</td>
                <td>${nota1}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota2}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota3}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota4}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota5}</td>
            </tr>
        `;
            
    return fila;
}

function cambiarNotas() {
    var min = 1.0;
    var max = 5.0;
    var nota1 = (Math.random() * (max - min) + min).toFixed(2);
    var nota2 = (Math.random() * (max - min) + min).toFixed(2);
    var nota3 = (Math.random() * (max - min) + min).toFixed(2);
    var nota4 = (Math.random() * (max - min) + min).toFixed(2);
    var nota5 = (Math.random() * (max - min) + min).toFixed(2);
    var fila = '';

    fila +=
        `   <tr>
                <td>${"Actividad"}</td>
                <td>${nota1}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota2}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota3}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota4}</td>
            </tr>
            <tr>
                <td>${"Actividad"}</td>
                <td>${nota5}</td>
            </tr>
        `;
        $("#body_tabla1").children("tr").remove();
        $("#body_tabla1").append(fila);
        $("#body_tabla2").children("tr").remove();
        $("#body_tabla2").append(fila);
        $("#body_tabla3").children("tr").remove();
        $("#body_tabla3").append(fila);
}