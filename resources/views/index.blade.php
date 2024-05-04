@extends('layouts.structure')
@section('head')
    <title>CNA UNHEVAL - Inscripción Virtual</title>
@endsection
@section('main')
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link" href="{{ route('grupal') }}">Inscripción De Alumnos Con Asesor</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" href="{{ route('index') }}">Inscripción Alumno Libre</a>
        </li>
    </ul>
    <form id="form-inscripcion" action="{{ route('inscripcion') }}" method="POST" enctype="multipart/form-data"
        class="row m-0">
        @csrf
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
            <input type="number" class="form-control" placeholder="ejm: 22334455" id="dni" name="dni" required
                autocomplete="off" maxlength="8">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="telefono" class="d-flex">N° de Celular(<p class="text-danger">*</p>):</label>
            <input type="number" class="form-control" placeholder="ejem: 987654321" id="telefono" name="telefono" required
                autocomplete="off" maxlength="9">
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
        <div class="col-sm-12 form-group p-2">
            <strong>DATOS DE PAGO</strong>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="cod_pago" class="d-flex">Código de Pago(<p class="text-danger">*</p>):</label>
            <input type="number" class="form-control" placeholder="" id="cod_pago" name="cod_pago" required
                autocomplete="off">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="fecha_pago" class="d-flex">Fecha y hora(<p class="text-danger">*</p>):</label>
            <input type="datetime-local" class="form-control" id="fecha_pago" name="fecha_pago" required
                autocomplete="off">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
            <label for="image" class="d-flex">Foto del Voucher(<p class="text-danger">*</p>):</label>
            <input type="file" accept="image/x-png,image/jpeg,image/jpg" class="form-control" id="imagen"
                name="imagen">
        </div>
        <div class="col-sm-12 form-group p-2 d-flex justify-content-center">
            (<p class="text-danger">*</p>) Campos obligatorios
        </div>
        <div class="col-12 p-2 d-flex align-items-center justify-content-center">
            <button type="reset" class="btn btn-secondary py-2 d-flex align-items-center justify-content-center m-1"><i
                    class="material-icons">cleaning_services</i>
                <span>LIMPIAR</span></button>
            <button type="submit" class="btn btn-primary py-2 d-flex align-items-center justify-content-center m-1"><i
                    class="material-icons">send</i>
                <span>ENVIAR Y DESCARGAR CONSTANCIA</span></button>
        </div>
    </form>
@endsection
