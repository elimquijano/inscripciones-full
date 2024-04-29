<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inscripcions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('dni');
            $table->string('telefono');
            $table->string('colegio');
            $table->string('grado');
            $table->string('nivel');
            $table->string('departamento');
            $table->string('provincia');
            $table->string('distrito');
            $table->string('num_voucher');
            $table->string('cod_pago');
            $table->string('fecha_pago');
            $table->text('imagen');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripcions');
    }
};
