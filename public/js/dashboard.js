$(document).ready(function () {
    let tablaInscripciones = $("#table-inscripciones").DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        ajax: {
            url: window.location.origin + "/api/inscripcion",
            dataSrc: "",
            type: "GET",
        },
        drawCallback: function () {
            let api = this.api();
            let info = api.page.info();
            $("#cantidad-inscritos").html(info.recordsTotal);
        },
        columns: [
            { data: "id" },
            { data: "name" },
            { data: "dni" },
            { data: "telefono" },
            { data: "colegio" },
            { data: "grado" },
            { data: "nivel" },
            { data: "departamento" },
            { data: "provincia" },
            { data: "distrito" },
            { data: "num_voucher" },
            { data: "cod_pago" },
            { data: "fecha_pago" },
            {
                data: "imagen",
                render: function (data, type, row) {
                    return (
                        '<a href="' +
                        data +
                        '">' +
                        window.location.origin +
                        data +
                        "</a>"
                    );
                },
            },
        ],
        language: {
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron resultados",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty:
                "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            sSearch: "Buscar:",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            sProcessing: "Procesando...",
        },
        //para usar los botones
        responsive: "true",
        dom: "Bfrtip",
        buttons: {
            dom: {
                button: {
                    className: "btn",
                },
            },
            buttons: [
                {
                    //definimos estilos del boton de excel
                    extend: "excel",
                    text: '<i class="fas fa-file-excel"></i> ',
                    className: "btn btn-success",

                    excelStyles: {
                        template: [
                            "green_medium",
                            "header_green",
                            "title_medium",
                        ],
                    },
                },
                {
                    extend: "pdfHtml5",
                    text: '<i class="fas fa-file-pdf"></i> ',
                    titleAttr: "Exportar a PDF",
                    className: "btn btn-danger",
                },
                {
                    extend: "print",
                    text: '<i class="fa fa-print"></i> ',
                    titleAttr: "Imprimir",
                    className: "btn btn-info",
                },
            ],
        },
    });

    // Asegúrate de que la tabla se haya inicializado completamente antes de agregar los campos de búsqueda
    tablaInscripciones.on("init.dt", function () {
        // Agrega una nueva fila al encabezado de la tabla
        let fila = $("<tr>").appendTo("#table-inscripciones thead");

        // Búsqueda por encabezado
        $("#table-inscripciones thead th").each(function (i) {
            // Agrega un nuevo encabezado a la fila con el campo de búsqueda
            fila.append(
                '<th><input class="form-control" type="text" placeholder="Buscar..." /></th>'
            );

            $("input", fila.children().last()).on("keyup change", function () {
                if (tablaInscripciones.column(i).search() !== this.value) {
                    tablaInscripciones.column(i).search(this.value).draw();
                }
            });
        });
    });
});
