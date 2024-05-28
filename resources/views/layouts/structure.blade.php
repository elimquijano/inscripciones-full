<!DOCTYPE html>
<html lang="es-ES" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('img/CNA-UNHEVAL-LOGO.ico') }}" type="image/x-icon">

    <!-- CSS de Google Fonts Icon -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    {{-- OFFLINE --}}
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset('modulos/bootstrap/css/bootstrap.min.css') }}">
    <!-- jQuery, Popper.js, Bootstrap JS -->
    <script src="{{ asset('modulos/jquery/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ asset('modulos/popper/popper.min.js') }}"></script>
    <script src="{{ asset('modulos/bootstrap/js/bootstrap.min.js') }}"></script>
    <!-- JS de SweetAlert -->
    <script src="{{ asset('modulos/sweetalert/sweetalert.min.js') }}"></script>
    <!-- JS de jsPDF-->
    <script src="{{ asset('modulos/jspdf/jspdf.debug.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>

    <!-- CSS de Propio -->
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    @yield('head')
</head>

<body class="bg-dark-10 m-0 p-0">
    <nav class="row bg-primary p-3 m-0" id="navbar">
        <div class="col-sm-12 col-md-3 d-flex align-items-center">
            <img src="{{ asset('img/CNA UNHEVAL.png') }}" alt="logo" width="200px">
        </div>
        <div class="col-sm-12 col-md-9 d-flex align-items-center text-white">
            <h1 class="text-center">XV Concurso Escolar Regional de Conocimientos</h1>
        </div>
    </nav>
    <section class="container p-4">
        <div class="paper">
            @yield('main')
            <div class="row m-0">
                <div class="col-12 py-4">
                    <div class="alert alert-info alert-dismissible fade show">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>¿Tiene alguna inconveniente?</strong> Comuníquese con soporte haciendo click <a rel=""
                            target="_blank"
                            href="https://api.whatsapp.com/send?phone=929804291&text=Tengo un inconveniente con la inscripción!">AQUI</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="{{ asset('js/suggestionDB.js') }}"></script>
    <script src="{{ asset('js/index.js') }}"></script>

    <div class="modal fade" id="modal-recibo">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">¡Atención!</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="alert alert-warning alert-dismissible fade show">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>¡RECUERDE!</strong> Rellenar cuidadosamente estos campos en el formulario.
                    </div>
                    <div class="py-2">
                        N° de Cuenta de Scotiabank:
                        <h4>358-0774648</h4>
                        Nombre:
                        <br>
                        Jorge C. Ludgarda o Aguirre Y. Linda
                    </div>
                    <div class="py-2">
                        Los datos de su comprobante están distribuidos del siguiente modo:
                    </div>
                    <div class="row">
                        <div class="col-6">
                            Con pago en el Agente:
                            <img src="{{ asset('img/VOUCHER AGENTE.jpg') }}" alt="recibo_agente" width="100%">
                        </div>
                        <div class="col-6">
                            Con pago en el Banco:
                            <img src="{{ asset('img/VOUCHER BANCO.jpg') }}" alt="recibo_banco" width="100%">
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>

            </div>
</body>

</html>
