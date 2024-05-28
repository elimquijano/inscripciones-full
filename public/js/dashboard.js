$(document).ready(function () {
    let data = [];
    async function getData() {
        const datos = await $.ajax({
            url: window.location.origin + "/api/pago",
            type: "GET",
        });
        data = datos;
    }
    getData();

    // Inicializa la tabla con los datos de inscripción procesados
    let tablaInscripciones = $("#table-inscripciones").DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        ajax: {
            url: window.location.origin + "/api/inscripcion",
            type: "GET",
            dataSrc: function (datosInscripcion) {
                // Procesa los datos
                const datosInscripcionModificados = datosInscripcion.map(
                    function (inscripcion) {
                        // Inicializa 'verificado' como 'No'
                        let verificado = "No";

                        // Si data no está vacío, busca coincidencias
                        if (data?.length > 0) {
                            let coincide = data.some(function (otra) {
                                return (
                                    otra?.cod_pago === inscripcion?.cod_pago &&
                                    otra?.fecha_pago === inscripcion?.fecha_pago
                                );
                            });

                            // Si hay una coincidencia, cambia 'verificado' a 'Sí'
                            if (coincide) {
                                verificado = "Sí";
                            }
                        }

                        // Agrega el campo 'verificado' a la inscripción
                        inscripcion.verificado = verificado;

                        return inscripcion;
                    }
                );

                return datosInscripcionModificados;
            },
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
            { data: "name_apoderado" },
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
            { data: "created_at" },
            { data: "verificado" },
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
