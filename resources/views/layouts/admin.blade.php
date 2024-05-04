<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="{{ asset('img/CNA-UNHEVAL-LOGO.ico') }}" type="image/x-icon">

    <!-- Boxicons -->
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
    <!-- JS de SweetAlert -->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <!-- CSS de Google Fonts Icon -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--font awesome con CDN-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">

    {{-- OFFLINE --}}
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset('modulos/bootstrap/css/bootstrap.min.css') }}">
    <!--datables CSS básico-->
    <link rel="stylesheet" type="text/css" href="{{ asset('modulos/datatables/datatables.min.css') }}" />
    <!--datables estilo bootstrap 4 CSS-->
    <link rel="stylesheet" type="text/css"
        href="{{ asset('modulos/datatables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css') }}">
    <!-- jQuery, Popper.js, Bootstrap JS -->
    <script src="{{ asset('modulos/jquery/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ asset('modulos/popper/popper.min.js') }}"></script>
    <script src="{{ asset('modulos/bootstrap/js/bootstrap.min.js') }}"></script>
    <!-- datatables JS -->
    <script type="text/javascript" src="{{ asset('modulos/datatables/datatables.min.js') }}"></script>
    <!-- para usar botones en datatables JS -->
    <script src="{{ asset('modulos/datatables/Buttons-1.5.6/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('modulos/datatables/JSZip-2.5.0/jszip.min.js') }}"></script>
    <script src="{{ asset('modulos/datatables/pdfmake-0.1.36/pdfmake.min.js') }}"></script>
    <script src="{{ asset('modulos/datatables/pdfmake-0.1.36/vfs_fonts.js') }}"></script>
    <script src="{{ asset('modulos/datatables/Buttons-1.5.6/js/buttons.html5.min.js') }}"></script>

    <!-- Para los estilos en Excel     -->
    <script src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.1.1/js/buttons.html5.styles.min.js">
    </script>
    <script
        src="https://cdn.jsdelivr.net/npm/datatables-buttons-excel-styles@1.1.1/js/buttons.html5.styles.templates.min.js">
    </script>
    <!-- JS para FixedHeader -->
    <script type="text/javascript" src="https://cdn.datatables.net/fixedheader/3.1.9/js/dataTables.fixedHeader.min.js">
    </script>

    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    @yield('head')
</head>

<body>


    <!-- SIDEBAR -->
    <aside id="sidebar" class="hide">
        <a href="#" class="brand">
            <i class='bx bxs-smile'></i>
            <span class="text">CNA UNHEVAL</span>
        </a>
        <ul class="side-menu top">
            <li accesskey="dashboard" class="active">
                <a href="#">
                    <i class='bx bxs-dashboard'></i>
                    <span class="text">Dashboard</span>
                </a>
            </li>
            <li accesskey="my-store">
                <a href="#">
                    <i class='bx bxs-coin'></i>
                    <span class="text">Mis Pagos</span>
                </a>
            </li>

        </ul>
        <ul class="side-menu">
            <li>
                <a href="#">
                    <i class='bx bxs-cog'></i>
                    <span class="text">Configuración</span>
                </a>
            </li>
            <li>
                <form method="POST" action="{{ route('logout') }}">
                    <a href="#">
                        <i class='bx bxs-log-out-circle'></i>
                        @csrf
                        <button type="submit" class="btn p-0 d-flex align-items-center justify-content-center"><span
                                class="text">Cerrar Sesión</span></button>

                    </a>
                </form>
            </li>
        </ul>
    </aside>
    <!-- SIDEBAR -->



    <!-- CONTENT -->
    <section id="content">
        <!-- NAVBAR -->
        <nav>
            <i class='bx bx-menu'></i>
            <form action="#">
                <div class="form-input">
                    <input type="search" placeholder="Buscar...">
                    <button type="submit" class="search-btn"><i class='bx bx-search'></i></button>
                </div>
            </form>
            <input type="checkbox" id="switch-mode" hidden>
            <label for="switch-mode" class="switch-mode"></label>
            <a href="#" class="notification">
                <i class='bx bxs-bell'></i>
                <span class="num">8</span>
            </a>
            <a href="#" class="profile">
                <img src="{{ asset('img/user.png') }}">
            </a>
        </nav>
        <!-- NAVBAR -->

        <!-- MAIN -->
        <main>
            @yield('main')
        </main>
        <!-- MAIN -->
    </section>
    <!-- CONTENT -->

    <!--Modal para CRUD CONTACTO-->
    <div class="modal fade" id="modalCONTACTO" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="formUsuarios">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="" class="col-form-label">Codigo de Pago</label>
                                    <input type="text" class="form-control" id="cod_pago">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="" class="col-form-label">Fecha</label>
                                    <input type="datetime-local" class="form-control" id="fecha_pago">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                        <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/crudPago.js') }}"></script>
    <script src="{{ asset('js/dashcontroller.js') }}"></script>
    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>

</html>
