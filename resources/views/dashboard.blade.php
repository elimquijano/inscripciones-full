@extends('layouts.admin')
@section('head')
    <title>Lista de Inscripción Virtual</title>
@endsection
@section('main')
    <div class="window active" id="dashboard">
        <div class="head-title">
            <div class="left">
                <h2>Dashboard</h2>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Dashboard</a>
                    </li>
                    <li><i class='bx bx-chevron-right'></i></li>
                    <li>
                        <a class="active" href="#">Inicio</a>
                    </li>
                </ul>
            </div>
        </div>

        <ul class="box-info">
            <li>
                <i class='bx bxs-calendar-check'></i>
                <span class="text">
                    <h3 id="cantidad-pagos">0</h3>
                    <p>Mis Pagos</p>
                </span>
            </li>
            <li>
                <i class='bx bxs-group'></i>
                <span class="text">
                    <h3 id="cantidad-inscritos">0</h3>
                    <p>Inscritos</p>
                </span>
            </li>
            <li>
                <i class='bx bxs-dollar-circle'></i>
                <span class="text">
                    <h3>$0</h3>
                    <p>Recaudado</p>
                </span>
            </li>
        </ul>
        <div class="row paper m-0">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table id="table-inscripciones" class="table table-striped table-bordered" cellspacing="0"
                        width="100%">
                        <thead>
                            <tr>
                                <th class="text-center" style="min-width: 80px">ID</th>
                                <th class="text-center" style="min-width: 80px">ALUMNO</th>
                                <th class="text-center" style="min-width: 80px">DNI</th>
                                <th class="text-center" style="min-width: 80px">TELEFONO</th>
                                <th class="text-center" style="min-width: 80px">I.E.</th>
                                <th class="text-center" style="min-width: 80px">GRADO</th>
                                <th class="text-center" style="min-width: 80px">NIVEL</th>
                                <th class="text-center" style="min-width: 80px">DEPARTAMENTO</th>
                                <th class="text-center" style="min-width: 80px">PROVINCIA</th>
                                <th class="text-center" style="min-width: 80px">DISTRITO</th>
                                <th class="text-center" style="min-width: 80px">N° DE VOUCHER</th>
                                <th class="text-center" style="min-width: 80px">COD. PAGO</th>
                                <th class="text-center" style="min-width: 80px">FECHA</th>
                                <th class="text-center" style="min-width: 80px">IMAGEN</th>
                                {{-- <th class="text-center" style="min-width: 80px">VERIFICADO</th> --}}
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="window" id="my-store">
        <div class="head-title">
            <div class="left">
                <h2>Mis Pagos</h2>
                <ul class="breadcrumb">
                    <li>
                        <a href="#">Mis Pagos</a>
                    </li>
                    <li><i class='bx bx-chevron-right'></i></li>
                    <li>
                        <a class="active" href="#">Inicio</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-lg-12 py-4">
                    <button id="btnNuevo" type="button" class="btn btn-info" data-toggle="modal"><i
                            class="material-icons">library_add</i>Agregar</button>
                </div>
            </div>
        </div>

        <div class="row paper m-0">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table id="tablaUsuarios" class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th class="text-center" style="min-width: 80px">ID</th>
                                <th class="text-center" style="min-width: 80px">N° DE VOUCHER</th>
                                <th class="text-center" style="min-width: 80px">COD. PAGO</th>
                                <th class="text-center" style="min-width: 80px">FECHA</th>
                                <th class="text-center" style="min-width: 80px">ACCION</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
