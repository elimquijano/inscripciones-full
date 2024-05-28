@extends('layouts.structure')
@section('head')
    <title>CNA UNHEVAL - Inscripción Virtual</title>
@endsection
@section('main')
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" href="{{ route('grupal') }}">Inscribir Muchos Alumnos con Tutor por I.E.</a>
        </li>
        <li class="nav-item">
            <a class="nav-link btn-danger" href="{{ route('index') }}">Inscribir Un Solo Alumno Sin Tutor</a>
        </li>
    </ul>
    <form id="form-inscripcion-grupal" action="{{ route('inscripcion') }}" method="POST" enctype="multipart/form-data"
        class="row m-0">
        @csrf
        <div class="col-sm-12 form-group p-2">
            <strong>DATOS DEL TUTOR O APODERADO</strong>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="name_apoderado" class="d-flex">Apellidos y Nombres(<p class="text-danger">*</p>):</label>
            <input type="text" class="form-control" placeholder="" id="name_apoderado" name="name_apoderado" required
                autocomplete="off">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="dni_apoderado" class="d-flex">DNI(<p class="text-danger">*</p>):</label>
            <input type="number" class="form-control" placeholder="ejm: 22334455" id="dni_apoderado" name="dni_apoderado"
                required autocomplete="off" maxlength="8">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="telefono" class="d-flex">N° de Celular(<p class="text-danger">*</p>):</label>
            <input type="number" class="form-control" placeholder="ejem: 987654321" id="telefono" name="telefono" required
                autocomplete="off" maxlength="9">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="email_apoderado" class="d-flex">Correo Electrónico(<p class="text-danger">*</p>):</label>
            <input type="email" class="form-control" placeholder="" id="email_apoderado" name="email_apoderado" required
                autocomplete="off">
        </div>
        <div class="col-sm-12 form-group p-2">
            <strong>LUGAR DE PROCEDENCIA</strong>
        </div>
        <div class="col-sm-12 col-md-4 form-group p-2">
            <label for="departamento" class="d-flex">Departamento(<p class="text-danger">*</p>):</label>
            <input type="text" class="form-control input-autocomplete" id="departamento" name="departamento" required
                autocomplete="off">
            <ul id="suggestion-departamento" class="list-group"
                style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
            </ul>
        </div>
        <div class="col-sm-12 col-md-4 form-group p-2">
            <label for="provincia" class="d-flex">Provincia(<p class="text-danger">*</p>):</label>
            <input type="text" class="form-control input-autocomplete" id="provincia" name="provincia" required
                autocomplete="off">
            <ul id="suggestion-provincia" class="list-group"
                style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
            </ul>
        </div>
        <div class="col-sm-12 col-md-4 form-group p-2">
            <label for="distrito" class="d-flex">Distrito(<p class="text-danger">*</p>):</label>
            <input type="text" class="form-control input-autocomplete" id="distrito" name="distrito" required
                autocomplete="off">
            <ul id="suggestion-distrito" class="list-group"
                style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
            </ul>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="colegio" class="d-flex">Institución Educativa(<p class="text-danger">*</p>
                ):</label>
            <input type="text" class="form-control input-autocomplete" placeholder="" id="colegio" name="colegio"
                required autocomplete="off">
            <ul id="suggestion-colegio" class="list-group"
                style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
            </ul>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="cod_modular" class="d-flex">Código Modular I.E.(<p class="text-danger">*</p>):</label>
            <input type="text" class="form-control" placeholder="" id="cod_modular" name="cod_modular" required
                autocomplete="off">
        </div>
        <div class="col-sm-12 form-group p-2 card">
            <div class="row m-0" id="box-estudiante">
                <div class="col-sm-12 form-group p-2">
                    <strong>DATOS DEL ESTUDIANTE</strong>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                    <label for="name" class="d-flex">Apellidos y Nombres(<p class="text-danger">*</p>):</label>
                    <input type="text" class="form-control" placeholder="" id="name" name="name" required
                        autocomplete="off">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                    <label for="dni" class="d-flex">DNI(<p class="text-danger">*</p>):</label>
                    <input type="number" class="form-control" placeholder="ejm: 22334455" id="dni"
                        name="dni" required autocomplete="off" maxlength="8">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                    <label for="nivel" class="d-flex">Nivel(<p class="text-danger">*</p>):</label>
                    <select class="form-control" id="nivel" name="nivel" required>
                        <option value="">Seleccione</option>
                        <option value="INICIAL">INICIAL</option>
                        <option value="PRIMARIA">PRIMARIA</option>
                        <option value="SECUNDARIA">SECUNDARIA</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                    <label for="grado" class="d-flex">Grado(<p class="text-danger">*</p>):</label>
                    <select class="form-control" id="grado" name="grado" required>
                        <option value="">Seleccione primero un nivel</option>
                    </select>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                    <label for="cod_pago" class="d-flex">Código de Pago(<p class="text-danger">*</p>):</label>
                    <input type="text" class="form-control" placeholder="" id="cod_pago" name="cod_pago" required
                        autocomplete="off">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                    <label for="fecha_pago" class="d-flex">Fecha y hora del pago(<p class="text-danger">*</p>):</label>
                    <input type="datetime-local" class="form-control" id="fecha_pago" name="fecha_pago" required
                        autocomplete="off">
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                    <label for="image" class="d-flex">Foto del Voucher(<p class="text-danger">*</p>en imagen o foto):</label>
                    <input type="file" accept="image/x-png,image/jpeg,image/jpg" class="form-control" id="imagen"
                        name="imagen">
                </div>
                <div class="col-sm-12 form-group p-2">
                    <button type="submit" class="btn btn-success">AGREGAR ESTUDIANTE</button>
                </div>
                <div class="col-sm-12 p-2">
                    <table class="table table-responsive table-hover w-100">
                        <thead>
                            <tr>
                                <th>APELLIDOS Y NOMBRES</th>
                                <th>DNI</th>
                                <th>NIVEL</th>
                                <th>GRADO</th>
                                <th>CODIGO DE PAGO</th>
                                <th>FECHA DE PAGO</th>
                                <th>IMAGEN</th>
                                <th>ACCION</th>
                            </tr>
                        </thead>
                        <tbody id="lista-preinscritos">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-sm-12 form-group p-2 d-flex justify-content-center">
            (<p class="text-danger">*</p>) Campos obligatorios
        </div>
        <div class="col-12 p-2 d-flex align-items-center justify-content-center">
            <button type="reset" class="btn btn-secondary py-2 d-flex align-items-center justify-content-center m-1"><i
                    class="material-icons">cleaning_services</i>
                <span>LIMPIAR</span></button>
            <button type="button" id="btn-submit"
                class="btn btn-primary py-2 d-flex align-items-center justify-content-center m-1"><i
                    class="material-icons">send</i>
                <span>ENVIAR Y DESCARGAR CONSTANCIA</span></button>
        </div>
    </form>
@endsection
