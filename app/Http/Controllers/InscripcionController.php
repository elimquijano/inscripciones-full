<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    public function index()
    {
        $inscripciones = Inscripcion::all();
        return response()->json($inscripciones);
    }

    public function show($id)
    {
        $inscripción = Inscripcion::find($id);

        if (!$inscripción) {
            return response()->json(['message' => 'Inscripción no encontrado'], 404);
        }

        return response()->json($inscripción);
    }

    public function store(Request $request)
    {
        // Verifica si existe el input "_token"
        if (!$request->has('_token')) {
            return response()->json(['message' => 'No tiene permisos'], 403);
        }

        // Define el tamaño máximo de la imagen en kilobytes
        $maxImageSize = 2048;  // 2MB

        // Verifica si todos los campos necesarios están presentes y si la imagen existe y no supera el tamaño máximo
        $request->validate([
            'name' => 'required',
            'dni' => 'required',
            'telefono' => 'required',
            'colegio' => 'required',
            'grado' => 'required',
            'nivel' => 'required',
            'departamento' => 'required',
            'provincia' => 'required',
            'distrito' => 'required',
            'num_voucher' => 'required',
            'cod_pago' => 'required',
            'fecha_pago' => 'required',
            'imagen' => 'required|image|max:' . $maxImageSize,
        ]);

        // Cambia el nombre, mueve a public y guarda la url de la imagen
        $imagen = $request->file('imagen');
        $nombre = time() . uniqid() . '_' . $imagen->getClientOriginalName() . '.' . $imagen->getClientOriginalExtension();
        $destinoPath = public_path('/imagenes');
        $imagen->move($destinoPath, $nombre);
        $url_img = '/imagenes/' . $nombre;

        $datos = $request->all();
        $datos['imagen'] = $url_img;

        $inscripcion = Inscripcion::create($datos);

        return response()->json($inscripcion, 201);
    }

    public function update(Request $request, $id)
    {
        /* 
        $Inscripción = Inscripcion::find($id);

        if (!$Inscripción) {
            return response()->json(['message' => 'Inscripción no encontrado'], 404);
        }

        $compañia->update($request->all());
        return response()->json($compañia, 201); */
    }

    public function destroy($id)
    {
        /* $Inscripción = Inscripcion::find($id);

        if (!$Inscripción) {
            return response()->json(['message' => 'Inscripción no encontrado'], 404);
        }

        $Inscripción->delete();
        return response()->json(['message' => 'Inscripción eliminado con éxito']); */
    }
}
