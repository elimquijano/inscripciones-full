<?php

namespace App\Http\Controllers;

use App\Models\Apoderado;
use App\Models\Inscripcion;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $maxImageSize = 3072;  // 3MB

        // Define los mensajes de error personalizados
        $messages = [
            'required' => 'No se puede inscribir a ' . $request->input('name') . ', porque el campo :attribute es obligatorio.',
            'image' => 'No se puede inscribir a ' . $request->input('name') . ', porque el campo :attribute debe ser una imagen.',
            'max' => 'No se puede inscribir a ' . $request->input('name') . ', porque el campo :attribute no debe superar los ' . $maxImageSize . 'KB.',
            'dni.size' => 'No se puede inscribir a ' . $request->input('name') . ', porque el DNI debe tener exactamente 8 caracteres.',
            'telefono.size' => 'No se puede inscribir a ' . $request->input('name') . ', porque el teléfono debe tener exactamente 9 caracteres.',
        ];

        // Verifica si todos los campos necesarios están presentes y si la imagen existe y no supera el tamaño máximo
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'dni' => 'required|size:8',
            'telefono' => 'required|size:9',
            'colegio' => 'required',
            'grado' => 'required',
            'nivel' => 'required',
            'departamento' => 'required',
            'provincia' => 'required',
            'distrito' => 'required',
            'cod_pago' => 'required',
            'fecha_pago' => 'required',
            'imagen' => 'required|image|max:' . $maxImageSize,
        ], $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            // Cambia el nombre, mueve a public y guarda la url de la imagen
            $imagen = $request->file('imagen');
            $nombre = time() . uniqid() . '_' . $imagen->getClientOriginalName();
            $destinoPath = public_path('/imagenes');
            $url_img = '/imagenes/' . $nombre;

            $datos = $request->all();
            $datos['imagen'] = $url_img;
            $datos['fecha_pago'] = $this->formatDateTime($request->input('fecha_pago'));

            // Verifica si existe el campo dni_apoderado
            if ($request->has('dni_apoderado')) {
                $apoderado = Apoderado::where('dni', $request->input('dni_apoderado'))->first();
                if (!$apoderado) {
                    $apoderado = new Apoderado;
                    $apoderado->name = $request->input('name_apoderado');
                    $apoderado->dni = $request->input('dni_apoderado');
                    $apoderado->telefono = $request->input('telefono');
                    $apoderado->email = $request->input('email_apoderado');
                    $apoderado->save();
                }
                $datos['id_apoderado'] = $apoderado->id;
            }

            $inscripcion = Inscripcion::create($datos);
            $imagen->move($destinoPath, $nombre);
            return response()->json($inscripcion, 201);
        } catch (\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                return response()->json(['message' => 'No se puede inscribir a ' . $request->input('name') . 'debido a que el DNI y/o CODIGO DE PAGO ya está registrado'], 409);
            }
        }
    }

    public function update(Request $request, $id)
    {
        $Inscripción = Inscripcion::find($id);

        if (!$Inscripción) {
            return response()->json(['message' => 'Inscripción no encontrado'], 404);
        }

        $Inscripción->update($request->all());
        return response()->json($Inscripción, 201);
    }

    public function destroy($id)
    {
        $Inscripción = Inscripcion::find($id);

        if (!$Inscripción) {
            return response()->json(['message' => 'Inscripción no encontrado'], 404);
        }

        $Inscripción->delete();
        return response()->json(['message' => 'Inscripción eliminado con éxito']);
    }

    public function search(Request $request)
    {

        $inscripciones = Inscripcion::query();
        $inscripciones->leftJoin('apoderados', 'inscripcions.id_apoderado', '=', 'apoderados.id');
        $inscripciones->select('apoderados.name as name_apoderado', 'apoderados.dni as dni_apoderado', 'inscripcions.*');
        $inscripciones = $inscripciones->get();

        return response()->json($inscripciones);
    }

    public function getImageBase64(Request $request)
    {
        $client = new Client();
        $response = $client->get($request->input('url'));
        $imageData = $response->getBody()->getContents();
        $base64 = base64_encode($imageData);
        return response()->json(['image' => 'data:image/jpeg;base64,' . $base64], 201);
    }

    function formatDateTime($datetime)
    {
        try {
            $date = Carbon::parse($datetime);
            return $date->format('Y-m-d H:i:s');
        } catch (\Exception $e) {
            return $datetime;
        }
    }
}
