<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscripcion extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'dni',
        'telefono',
        'colegio',
        'grado',
        'nivel',
        'departamento',
        'provincia',
        'distrito',
        'cod_pago',
        'fecha_pago',
        'imagen',
        'id_apoderado',
    ];
}
