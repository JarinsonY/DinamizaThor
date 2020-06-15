function equipo1(){
    $("#equipo").html("EQUIPO #1");
    var fila = '';

    fila +=
        `   <tr>
                <td>${"Lucio Balaguer"}</td>
            </tr>
            <tr>
                <td>${"Aquilino Carmona"}</td>
            </tr>
            <tr>
                <td>${"Mia Lucas"}</td>
            </tr>
            <tr>
                <td>${"Rosana del Castillo"}</td>
            </tr>
            <tr>
                <td>${"Gaspar Soriano"}</td>
            </tr>
        `;
        $("#body_tabla").children("tr").remove();
        $("#body_tabla").html(fila);
}
function equipo2(){
    $("#equipo").html("EQUIPO #2");
    var fila = '';

    fila +=
        `   <tr>
                <td>${"Gumersindo Andres"}</td>
            </tr>
            <tr>
                <td>${"Delfina Osuna"}</td>
            </tr>
            <tr>
                <td>${"Joana Gonzales"}</td>
            </tr>
            <tr>
                <td>${"Miquel Berenguer"}</td>
            </tr>
            <tr>
                <td>${"Gertrudis Ibarra"}</td>
            </tr>
        `;
        $("#body_tabla").children("tr").remove();
        $("#body_tabla").html(fila);
}
function equipo3(){
    $("#equipo").html("EQUIPO #3");
    var fila = '';

    fila +=
        `   <tr>
                <td>${"Candela Salas"}</td>
            </tr>
            <tr>
                <td>${"Mireya Mira"}</td>
            </tr>
            <tr>
                <td>${"Carlangas Farruko Posada"}</td>
            </tr>
            <tr>
                <td>${"Olga Alvaro"}</td>
            </tr>
            <tr>
                <td>${"Fernando Jose Hermoso"}</td>
            </tr>
        `;
        $("#body_tabla").children("tr").remove();
        $("#body_tabla").html(fila);
}