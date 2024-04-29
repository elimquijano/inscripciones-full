<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function index()
    {
        $pagos = Pago::all();
        return response()->json($pagos);
    }

    public function show($id)
    {
        $pago = Pago::find($id);

        if (!$pago) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        return response()->json($pago);
    }

    public function store(Request $request)
    {
        $request->validate([
            'num_voucher' => 'required',
            'cod_pago' => 'required',
            'fecha_pago' => 'required',
        ]);

        $datos = $request->all();

        $inscripcion = Pago::create($datos);

        return response()->json($inscripcion, 201);
    }

    public function update(Request $request, $id)
    {

        $pago = Pago::find($id);

        if (!$pago) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        $pago->update($request->all());
        return response()->json($pago, 201);
    }

    public function destroy($id)
    {
        $pago = Pago::find($id);

        if (!$pago) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        $pago->delete();
        return response()->json(['message' => 'Pago eliminado con éxito']);
    }
}
