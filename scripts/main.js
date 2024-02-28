let nombre = prompt("Nombre del Cliente");
let seleccionPlan;
let stringPlan;
let precioPlan = 0;
let tiempoPlan = 0;


do {
    seleccionPlan = parseInt(prompt("Seleccione Plan \n1) Plan Básico $5.000 \n2) Plan Medio $7.000 \n3) Plan Avanzado $9.500"));
} while (isNaN(seleccionPlan));

switch (seleccionPlan) {
    case 1:
        stringPlan = "Plan Básico"
        precioPlan = 5000;
        break;
    case 2:
        stringPlan = "Plan Medio"
        precioPlan = 7000;
        break;
    case 3:
        stringPlan = "Plan Avanzado"
        precioPlan = 9500;
        break;
    default:
        precioPlan = 0;
        break;
}

do {
    tiempoPlan = parseInt(prompt("Seleccione el tiempo del Plan \n1) 30 Días \n2) 60 Días \n3) 90 Días"));
} while (isNaN(tiempoPlan));

if (tiempoPlan === 1) {
    tiempoPlan = 30;
} else if (tiempoPlan === 2) {
    tiempoPlan = 60;
} else if (tiempoPlan === 3) {
    tiempoPlan = 90;
} else {
    tiempoPlan = 0;
}


const multiplicar = (precio, tiempo) => {
    return precio * tiempo;
};

console.log(`Detalle:\n
             Nombre: ${nombre}\n
             Tipo de Plan: ${stringPlan}\n
             Tiempo: ${tiempoPlan} Días\n
             Total: $${multiplicar(precioPlan, tiempoPlan)}`)

