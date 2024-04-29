@extends('layouts.structure')
@section('head')
    <title>CNA UNHEVAL - Inscripción Virtual</title>
@endsection
@section('main')
    <nav class="row bg-primary p-3">
        <div class="col-sm-12 col-md-3 d-flex align-items-center">
            <img src="{{ asset('img/CNA UNHEVAL.png') }}" alt="logo" width="200px">
        </div>
        <div class="col-sm-12 col-md-9 d-flex align-items-center text-white">
            <h1 class="text-center">SISTEMA DE INSCRIPCIÓN VIRTUAL</h1>
        </div>
    </nav>
    <section class="container py-4">
        <form id="form-inscripcion" action="{{ route('inscripcion') }}" method="POST" enctype="multipart/form-data"
            class="row paper">
            @csrf
            <div class="col-sm-12 form-group p-2">
                <strong>DATOS DEL ESTUDIANTE</strong>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="name" class="d-flex">Apellidos y Nombres(<p class="text-danger">*</p>):</label>
                <input type="text" class="form-control" placeholder="" id="name" name="name" required>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="dni" class="d-flex">DNI(<p class="text-danger">*</p>):</label>
                <input type="number" class="form-control" placeholder="ejm: 22334455" id="dni" name="dni"
                    required maxlength="8">
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="telefono" class="d-flex">N° de Celular(<p class="text-danger">*</p>):</label>
                <input type="number" class="form-control" placeholder="ejem: 987654321" id="telefono" name="telefono"
                    required maxlength="9">
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="colegio" class="d-flex">Institución Educativa(<p class="text-danger">*</p>
                    ):</label>
                <input type="text" class="form-control input-autocomplete" placeholder="" id="colegio" name="colegio"
                    required>
                <ul id="suggestion-colegio" class="list-group"
                    style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
                </ul>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="grado" class="d-flex">Grado(<p class="text-danger">*</p>):</label>
                <select class="form-control" id="grado" name="grado">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="nivel" class="d-flex">Nivel(<p class="text-danger">*</p>):</label>
                <select class="form-control" id="nivel" name="nivel">
                    <option>Inicial</option>
                    <option>Primaria</option>
                    <option>Secundaria</option>
                </select>
            </div>
            <div class="col-sm-12 form-group p-2">
                <strong>LUGAR DE PROCEDENCIA</strong>
            </div>
            <div class="col-sm-12 col-md-4 form-group p-2">
                <label for="departamento" class="d-flex">Departamento(<p class="text-danger">*</p>):</label>
                <input type="text" class="form-control input-autocomplete" id="departamento" name="departamento"
                    required>
                <ul id="suggestion-departamento" class="list-group"
                    style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
                </ul>
            </div>
            <div class="col-sm-12 col-md-4 form-group p-2">
                <label for="provincia" class="d-flex">Provincia(<p class="text-danger">*</p>):</label>
                <input type="text" class="form-control input-autocomplete" id="provincia" name="provincia" required>
                <ul id="suggestion-provincia" class="list-group"
                    style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
                </ul>
            </div>
            <div class="col-sm-12 col-md-4 form-group p-2">
                <label for="distrito" class="d-flex">Distrito(<p class="text-danger">*</p>):</label>
                <input type="text" class="form-control input-autocomplete" id="distrito" name="distrito" required>
                <ul id="suggestion-distrito" class="list-group"
                    style="position: absolute; background-color: white; z-index: 100; max-height: 200px; overflow-y: auto; width: inherit;">
                </ul>
            </div>
            <div class="col-sm-12 form-group p-2">
                <strong>DATOS DE PAGO</strong>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="num_voucher" class="d-flex">N° de Voucher(<p class="text-danger">*</p>):</label>
                <input type="number" class="form-control" placeholder="" id="num_voucher" name="num_voucher" required>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="cod_pago" class="d-flex">Código de Pago(<p class="text-danger">*</p>):</label>
                <input type="number" class="form-control" placeholder="" id="cod_pago" name="cod_pago" required>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="fecha_pago" class="d-flex">Fecha(<p class="text-danger">*</p>):</label>
                <input type="date" class="form-control" id="fecha_pago" name="fecha_pago" required>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 form-group p-2">
                <label for="image" class="d-flex">Foto del Voucher(<p class="text-danger">*</p>):</label>
                <input type="file" accept="image/x-png,image/jpeg,image/jpg" class="form-control" id="imagen"
                    name="imagen">
            </div>
            <div class="col-sm-12 form-group p-2 d-flex justify-content-center">
                (<p class="text-danger">*</p>) Campos obligatorios
            </div>
            </div>
            <div class="col-12 p-2 d-flex align-items-center justify-content-center">
                <button type="reset"
                    class="btn btn-secondary py-2 d-flex align-items-center justify-content-center w-25 m-1"><i
                        class="material-icons">cleaning_services</i>
                    <span>LIMPIAR</span></button>
                <button type="submit"
                    class="btn btn-primary py-2 d-flex align-items-center justify-content-center w-25 m-1"><i
                        class="material-icons">send</i>
                    <span>ENVIAR</span></button>
            </div>
        </form>
    </section>
@endsection
