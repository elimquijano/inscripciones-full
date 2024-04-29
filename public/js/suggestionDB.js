const colegios = [
    "Inicial - Cuna-Jardín 001",
    "Inicial - Jardín 001 DR. CARLOS SHOWING FERRARI",
    "Inicial - Jardín 002",
    "Inicial - Jardín 003 LAURITA VICUÑA",
    "Inicial - Jardín 004",
    "Inicial - Jardín 005",
    "Inicial - Jardín 006 - INMACULADA NIÑA MARIA",
    "Inicial - Jardín 007 NUEVO AMANECER",
    "Inicial - Jardín 008 GABRIEL AGUILAR NALVARTE",
    "Inicial - Jardín 009",
    "Inicial - Jardín 011",
    "Inicial - Jardín 012",
    "Inicial - Jardín 013",
    "Inicial - Jardín 014",
    "Inicial - Jardín 015",
    "Inicial - Jardín 016",
    "Inicial - Jardín 017",
    "Inicial - Jardín 018",
    "Inicial - Jardín 019",
    "Inicial - Jardín 020 CASTILLO GRANDE",
];

let departamentos = [];
let provincias = [];
let distritos = [];

async function obtenerDatos() {
    try {
        let data = await $.ajax({
            url: window.location.origin + "/api/ubicacion",
            type: "GET",
        });

        departamentos = data[0];
        provincias = data[1];
        distritos = data[2];
        console.log(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

obtenerDatos();
