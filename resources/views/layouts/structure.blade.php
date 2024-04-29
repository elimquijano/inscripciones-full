<!DOCTYPE html>
<html lang="es-ES" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('img/CNA-UNHEVAL-LOGO.ico') }}" type="image/x-icon">

    <!-- JS de SweetAlert -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- CSS de Google Fonts Icon -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    {{-- OFFLINE --}}
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset('modulos/bootstrap/css/bootstrap.min.css') }}">
    <!-- jQuery, Popper.js, Bootstrap JS -->
    <script src="{{ asset('modulos/jquery/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ asset('modulos/popper/popper.min.js') }}"></script>
    <script src="{{ asset('modulos/bootstrap/js/bootstrap.min.js') }}"></script>

    <!-- CSS de Propio -->
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    @yield('head')
</head>

<body class="bg-dark-10">
    @yield('main')

    <script src="{{ asset('js/suggestionDB.js') }}"></script>
    <script src="{{ asset('js/index.js') }}"></script>

    <!-- The Modal -->
    <div class="modal fade" id="modal-inscripcion">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Modal Heading</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    Modal body..
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-recibo">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Formato de los recibos</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    Los datos de su comprobante están distribuidos del siguiente modo:
                    <img src="{{ asset('img/voucher.png') }}" alt="recibo">
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>
</body>

</html>
