$(document).ready(function () {
    let id, method;
    method = "GET";
    id = null;

    tablaUsuarios = $("#tablaUsuarios").DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        ajax: {
            url: window.location.origin + "/api/pago",
            dataSrc: "",
            type: method,
        },
        drawCallback: function () {
            let api = this.api();
            let info = api.page.info();
            $("#cantidad-pagos").html(info.recordsTotal);
        },
        columns: [
            { data: "id" },
            { data: "num_voucher" },
            { data: "cod_pago" },
            { data: "fecha_pago" },
            {
                defaultContent:
                    "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>",
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

    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $("#formUsuarios").submit(function (e) {
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        const idpago = id == null ? "" : "/" + id + "/";
        console.log(idpago, method);
        num_voucher = $.trim($("#num_voucher").val());
        cod_pago = $.trim($("#cod_pago").val());
        fecha_pago = $.trim($("#fecha_pago").val());
        $.ajax({
            url: window.location.origin + "/api/pago" + idpago,
            type: method,
            datatype: "json",
            data: {
                num_voucher: num_voucher,
                cod_pago: cod_pago,
                fecha_pago: fecha_pago,
            },
            success: function (data) {
                tablaUsuarios.ajax.reload(null, false);
            },
        });
        $("#modalCONTACTO").modal("hide");
    });

    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function () {
        method = "POST"; //alta
        id = null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#17a2b8");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Agregar Pago");
        $("#modalCONTACTO").modal("show");
    });

    //Editar
    $(document).on("click", ".btnEditar", function () {
        method = "PUT"; //editar
        fila = $(this).closest("tr");
        id = parseInt(fila.find("td:eq(0)").text()); //capturo el ID
        num_voucher = fila.find("td:eq(1)").text();
        cod_pago = fila.find("td:eq(2)").text();
        fecha_pago = fila.find("td:eq(3)").text();
        $("#num_voucher").val(num_voucher);
        $("#cod_pago").val(cod_pago);
        $("#fecha_pago").val(fecha_pago);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Pago");
        $("#modalCONTACTO").modal("show");
    });

    //Borrar
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);
        id = parseInt($(this).closest("tr").find("td:eq(0)").text());
        var respuesta = confirm(
            "¿Está seguro de borrar el registro " + id + "?"
        );
        if (respuesta) {
            $.ajax({
                url: window.location.origin + "/api/pago/" + id,
                type: "DELETE",
                datatype: "json",
                success: function () {
                    tablaUsuarios.row(fila.parents("tr")).remove().draw();
                },
            });
        }
    });
});
