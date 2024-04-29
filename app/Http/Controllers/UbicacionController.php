<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;

class UbicacionController extends Controller
{
    public function index()
    {
        $city = City::query();
        $city->select('Name_city')->where('Id_city', '=', 10);
        $departamentos = $city->distinct()->pluck('Name_city')->toArray();

        $provincia = Province::query();
        $provincia->select('Name_province')->where('Id_city', '=', 10);
        $provincias = $provincia->distinct()->pluck('Name_province')->toArray();

        $distrito = District::query();
        $distrito->select('Name_district')->where('Id_city', '=', 10);
        $distritos = $distrito->distinct()->pluck('Name_district')->toArray();

        return response()->json([$departamentos, $provincias, $distritos]);
    }
}
