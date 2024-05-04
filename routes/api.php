<?php

use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\UbicacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/inscripcion', [InscripcionController::class, 'search']);
Route::get('/inscripcion/format-image', [InscripcionController::class, 'getImageBase64']);
Route::get('/inscripcion/{id}', [InscripcionController::class, 'show']);
Route::post('/inscripcion', [InscripcionController::class, 'store'])->name('inscripcion');
Route::put('/inscripcion/{id}', [InscripcionController::class, 'update']);
Route::delete('/inscripcion/{id}', [InscripcionController::class, 'destroy']);

Route::get('/pago', [PagoController::class, 'index']);
Route::get('/pago/{id}', [PagoController::class, 'show']);
Route::post('/pago', [PagoController::class, 'store']);
Route::put('/pago/{id}', [PagoController::class, 'update']);
Route::delete('/pago/{id}', [PagoController::class, 'destroy']);
