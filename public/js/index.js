function borrarCampos(formularioId) {
    $("#" + formularioId)
        .find(
            "input[type=text], input[type=number], input[type=date], textarea"
        )
        .val("");
}

$(document).ready(function () {
    //$("#modal-inscripcion").modal("show");
    $("#modal-recibo").modal("show");

    function autocompletar(inputId, array) {
        $("#" + inputId).on("keyup", function () {
            var input = $(this).val().toLowerCase();
            var suggestionBox = $("#suggestion-" + inputId);
            suggestionBox.empty();
            if (input.length > 0) {
                var suggestions = array.filter((item) =>
                    item.toLowerCase().includes(input)
                );
                suggestions.forEach((suggestion) => {
                    var li = $("<li>")
                        .text(suggestion)
                        .addClass("list-group-item")
                        .css("cursor", "pointer");
                    li.on("click", function () {
                        $("#" + inputId).val(suggestion);
                        suggestionBox.empty();
                    });
                    suggestionBox.append(li);
                });
            }
        });
    }

    // Uso de la función
    autocompletar("colegio", colegios);
    autocompletar("departamento", departamentos);
    autocompletar("provincia", provincias);
    autocompletar("distrito", distritos);

    function limitarLongitud(id, longitudMaxima) {
        $("#" + id).on("input", function () {
            if ($(this).val().length > longitudMaxima) {
                $(this).val($(this).val().slice(0, longitudMaxima));
            }
        });
    }

    // Uso de la función
    limitarLongitud("dni", 8);
    limitarLongitud("telefono", 9);

    $("#form-inscripcion").on("submit", function (event) {
        event.preventDefault(); // Evita la recarga de la página

        // Verifica que ningún campo esté vacío
        var camposVacios = $(this)
            .find("input")
            .filter(function () {
                return !this.value;
            });
        if (camposVacios.length) {
            swal("Error", "Por favor, completa todos los campos", "error");
            return;
        }

        $.ajax({
            url: $(this).attr("action"), // La URL a la que quieres enviar el formulario
            type: "POST",
            data: new FormData(this), // Los datos del formulario
            processData: false,
            contentType: false,
            success: function (response) {
                swal("Éxito", "Se ha inscrito correctamente", "success");
                borrarCampos("form-inscripcion");
            },
            error: function (error) {
                swal(
                    "Error",
                    "Error: " + error?.responseJSON?.message,
                    "error"
                );
                console.log("Error: ", error?.responseJSON?.message);
            },
        });
    });
});
