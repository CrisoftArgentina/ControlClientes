let Clientes = [
    {
        Cliente: "Cliente A",
        Cuit: "20-20200223-2",
        FechaPago: "Del 1 al 5",
        ProxAumento: "Marzo 2024",
        ValorOriginal: 30000,
        Valor: 50000,
        PrimerMes: "Marzo 2023",
        Plan: "Avanzado",
        Limite: "05/03/2024",
    },
    {
        Cliente: "Cliente B",
        Cuit: "30-20200111-5",
        FechaPago: "Del 1 al 5",
        ProxAumento: "Mayo 2024",
        ValorOriginal: 10000,
        Valor: 20000,
        PrimerMes: "Enero 2023",
        Plan: "Basico",
        Limite: "05/03/2024",
    },
    {
        Cliente: "Cliente C",
        Cuit: "20-51200855-8",
        FechaPago: "Del 6 al 10",
        ProxAumento: "Mayo 2024",
        ValorOriginal: 20000,
        Valor: 35000,
        PrimerMes: "Enero 2023",
        Plan: "Intermedio",
        Limite: "10/03/2024",
    },
    {
        Cliente: "Cliente D",
        Cuit: "20-35258669-8",
        FechaPago: "Del 6 al 10",
        ProxAumento: "Mayo 2024",
        ValorOriginal: 60000,
        Valor: 75000,
        PrimerMes: "Enero 2023",
        Plan: "Full",
        Limite: "10/03/2024",
    }
];
let ClientesCargados = [
    {
        Cliente: "Cliente A",
        Cuit: "20-20200223-2",
        Facturado: true,
        FechaPago: "Del 1 al 5",
        ProxAumento: "Marzo 2024",
        ValorOriginal: 30000,
        Valor: 50000,
        PrimerMes: "Marzo 2023",
        Plan: "Avanzado",
        Pago: "Pago",
        Limite: "05/03/2024",
    },
    {
        Cliente: "Cliente B",
        Cuit: "30-20200111-5",
        Facturado: true,
        FechaPago: "Del 1 al 5",
        ProxAumento: "Mayo 2024",
        ValorOriginal: 10000,
        Valor: 20000,
        PrimerMes: "Enero 2023",
        Plan: "Basico",
        Pago: "Impago",
        Limite: "05/03/2024",
    }
];
window.onload = function () {
    cargarClientes();
    document.getElementById('addcliente').value = "";
    let bienvenida = "";
    if (localStorage.getItem("usuario") === null) {
        bienvenida = "Hola Desconocido!";
    } else {
        bienvenida = "Hola " + localStorage.getItem("usuario") + "!";
    }
    document.getElementById('usuario').textContent = bienvenida;
}
function cargarClientes() {
    ClientesCargados.forEach((objeto, index) => {
        var tabla = document.getElementById("body-table");
        var nuevaFila = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.classList.add("text-center")

        td1.textContent = objeto.Cliente;

        var td2 = document.createElement("td");
        td2.classList.add("text-center")
        td2.textContent = objeto.Cuit;

        var td3 = document.createElement("td");
        td3.classList.add("text-center")
        td3.textContent = "";
        if (objeto.Facturado) {
            var iconoCheck = document.createElement("i");
            iconoCheck.addEventListener("click", changeFacturado);
            iconoCheck.classList.add("fa-regular", "fa-circle-check", "fa-2xl");
            iconoCheck.style.color = "#7fe4b6";
            td3.appendChild(iconoCheck);
        } else {
            var iconoXmark = document.createElement("i");
            iconoXmark.addEventListener("click", changeFacturado);
            iconoXmark.classList.add("fa-regular", "fa-circle-xmark", "fa-2xl");
            iconoXmark.style.color = "#ffb1ac";
            td3.appendChild(iconoXmark);
        }

        var td4 = document.createElement("td");
        td4.classList.add("text-center")
        td4.textContent = objeto.FechaPago;

        var td5 = document.createElement("td");
        td5.classList.add("text-center")
        td5.textContent = objeto.ProxAumento;

        var td6 = document.createElement("td");
        td6.classList.add("text-center")

        const ValorFormat = objeto.Valor.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        });

        td6.textContent = ValorFormat;

        var td7 = document.createElement("td");
        td7.classList.add("text-center")
        td7.textContent = objeto.PrimerMes;

        var td8 = document.createElement("td");
        td8.classList.add("text-center")
        td8.textContent = objeto.Plan;

        var td9 = document.createElement("td");
        td9.classList.add("text-center")

        var div9 = document.createElement("div");
        div9.textContent = objeto.Pago;
        div9.addEventListener("click", changePago);
        div9.classList.add("pago")
        if (objeto.Pago == "Pago") {
            div9.classList.add("pago-ok")
        } else if (objeto.Pago == "Impago") {
            div9.classList.add("pago-off")
        } else if (objeto.Pago == "Vencido") {
            div9.classList.add("pago-venc")
        }

        td9.appendChild(div9)

        var td10 = document.createElement("td");
        td10.classList.add("text-center")
        td10.textContent = objeto.Limite;

        var td11 = document.createElement("td");
        var iconoPapelera = document.createElement("i");
        iconoPapelera.classList.add("fa-solid", "fa-trash-can", "fa-lg");
        iconoPapelera.style.color = "#fb4646";
        td11.appendChild(iconoPapelera);

        iconoPapelera.addEventListener("click", function () {
            var fila = this.closest("tr");
            fila.parentNode.removeChild(fila);
            var nombreCliente = fila.cells[0].textContent;
            var indiceCliente = ClientesCargados.findIndex(cliente => cliente.Cliente === nombreCliente);
            if (indiceCliente !== -1) {
                ClientesCargados.splice(indiceCliente, 1);
                total()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Cliente Eliminado!",
                    showConfirmButton: false,
                    timer: 700
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Cliente No Encontrado",
                    showConfirmButton: false,
                    timer: 700
                });
            }
        });

        nuevaFila.appendChild(td1);
        nuevaFila.appendChild(td2);
        nuevaFila.appendChild(td3);
        nuevaFila.appendChild(td4);
        nuevaFila.appendChild(td5);
        nuevaFila.appendChild(td6);
        nuevaFila.appendChild(td7);
        nuevaFila.appendChild(td8);
        nuevaFila.appendChild(td9);
        nuevaFila.appendChild(td10);
        nuevaFila.appendChild(td11);
        tabla.appendChild(nuevaFila);
    })
    total()
}

function total() {
    let total = 0;
    ClientesCargados.forEach(objeto => {
        total += objeto.Valor
    })
    const formatoARS = total.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });
    document.getElementById('total').textContent = formatoARS
}

function addCliente(nombre) {
    let objeto = Clientes.find(cliente => cliente.Cliente === nombre);
    if (objeto) {
        ClientesCargados.push(objeto);

        var tabla = document.getElementById("body-table");
        var nuevaFila = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.classList.add("text-center")

        td1.textContent = objeto.Cliente;

        var td2 = document.createElement("td");
        td2.classList.add("text-center")
        td2.textContent = objeto.Cuit;

        var td3 = document.createElement("td");
        td3.classList.add("text-center")
        td3.textContent = "";
        if (objeto.Facturado) {
            var iconoCheck = document.createElement("i");
            iconoCheck.addEventListener("click", changeFacturado);
            iconoCheck.classList.add("fa-regular", "fa-circle-check", "fa-2xl");
            iconoCheck.style.color = "#7fe4b6";
            td3.appendChild(iconoCheck);
        } else {
            var iconoXmark = document.createElement("i");
            iconoXmark.addEventListener("click", changeFacturado);
            iconoXmark.classList.add("fa-regular", "fa-circle-xmark", "fa-2xl");
            iconoXmark.style.color = "#ffb1ac";
            td3.appendChild(iconoXmark);
        }

        var td4 = document.createElement("td");
        td4.classList.add("text-center")
        td4.textContent = objeto.FechaPago;

        var td5 = document.createElement("td");
        td5.classList.add("text-center")
        td5.textContent = objeto.ProxAumento;

        var td6 = document.createElement("td");
        td6.classList.add("text-center")

        const ValorFormat = objeto.Valor.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        });

        td6.textContent = ValorFormat;

        var td7 = document.createElement("td");
        td7.classList.add("text-center")
        td7.textContent = objeto.PrimerMes;

        var td8 = document.createElement("td");
        td8.classList.add("text-center")
        td8.textContent = objeto.Plan;

        var td9 = document.createElement("td");
        td9.classList.add("text-center")

        var div9 = document.createElement("div");
        div9.addEventListener("click", changePago);
        div9.textContent = "Impago";
        div9.classList.add("pago")
        div9.classList.add("pago-off")


        td9.appendChild(div9)

        var td10 = document.createElement("td");
        td10.classList.add("text-center")
        td10.textContent = objeto.Limite;

        var td11 = document.createElement("td");
        var iconoPapelera = document.createElement("i");
        iconoPapelera.classList.add("fa-solid", "fa-trash-can", "fa-lg");
        iconoPapelera.style.color = "#fb4646";
        td11.appendChild(iconoPapelera);

        iconoPapelera.addEventListener("click", function () {
            var fila = this.closest("tr");
            fila.parentNode.removeChild(fila);
            var nombreCliente = fila.cells[0].textContent;
            var indiceCliente = ClientesCargados.findIndex(cliente => cliente.Cliente === nombreCliente);
            if (indiceCliente !== -1) {
                ClientesCargados.splice(indiceCliente, 1);
                total()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Cliente Eliminado!",
                    showConfirmButton: false,
                    timer: 700
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Cliente No Encontrado",
                    showConfirmButton: false,
                    timer: 700
                });
            }
        });

        nuevaFila.appendChild(td1);
        nuevaFila.appendChild(td2);
        nuevaFila.appendChild(td3);
        nuevaFila.appendChild(td4);
        nuevaFila.appendChild(td5);
        nuevaFila.appendChild(td6);
        nuevaFila.appendChild(td7);
        nuevaFila.appendChild(td8);
        nuevaFila.appendChild(td9);
        nuevaFila.appendChild(td10);
        nuevaFila.appendChild(td11);
        tabla.appendChild(nuevaFila);
        total()
    }

}

$(function () {
    let clientesNombres = Clientes.map(cliente => cliente.Cliente);
    $("#addcliente").autocomplete({
        source: clientesNombres,
        select: function (event, ui) {
            addCliente(ui.item.value);
        },
        close: function (event, ui) {
            document.getElementById("addcliente").value = ""
        }
    });
});

function changeFacturado(event) {
    if (event.target.classList.contains("fa-circle-check")) {
        event.target.classList.remove("fa-circle-check");
        event.target.classList.add("fa-circle-xmark");
        event.target.style.color = "#ffb1ac";
    } else if (event.target.classList.contains("fa-circle-xmark")) {
        event.target.classList.remove("fa-circle-xmark");
        event.target.classList.add("fa-circle-check");
        event.target.style.color = "#7fe4b6";
    }
}
function changePago(event) {

    if (event.target.textContent == "Pago") {
        event.target.classList.replace('pago-ok', 'pago-off');
        event.target.textContent = "Impago"
    } else if (event.target.textContent == "Impago") {
        event.target.classList.replace('pago-off', 'pago-ok');
        event.target.textContent = "Pago"
    } else if (event.target.textContent == "Vencido") {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No se puede modificar el estado del pago",
            showConfirmButton: false,
            timer: 700
        });
    }
}