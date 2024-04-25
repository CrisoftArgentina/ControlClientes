let Clientes = [];

let ClientesCargados = [];
let ProxAumento = [];
let version = "1.4.0";
window.onload = function () {

    document.getElementById("limite").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("nrofiscal").value = "";
    document.getElementById("fechapago").value = "Del 1 al 5";
    document.getElementById("aumento").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("primermes").value = "";
    document.getElementById("plan").value = "Basico";


    ClientesCargados = JSON.parse(localStorage.getItem("ClientesCargados")) || [];

    let verificar = JSON.parse(localStorage.getItem("Clientes")) || false;
    if (verificar === false) {
        obtenerDatos()
            .then(datos => {
                Clientes = [...datos]
            })
            .catch(error => {
                let Error = "Error: " + error
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: Error,
                    showConfirmButton: false,
                    timer: 1000
                });
            });
    } else {
        Clientes = JSON.parse(localStorage.getItem("Clientes"))
    }

    ClientesCargados == null ? "No hay clientes cargados" : cargarClientes();

    document.getElementById('addcliente').value = "";
    let bienvenida = "";
    if (localStorage.getItem("usuario") === null) {
        bienvenida = "Hola Desconocido!";
    } else {
        bienvenida = "Hola " + localStorage.getItem("usuario") + "!";
    }
    document.getElementById('usuario').textContent = bienvenida;

    const selectAumento = document.getElementById("aumento");
    ProxAumento.forEach(function (opcion) {
        const option = document.createElement("option");
        option.value = opcion;
        option.text = opcion;
        selectAumento.appendChild(option);
    });

    const selectPrimerMes = document.getElementById("primermes");
    ProxAumento.forEach(function (opcion) {
        const option = document.createElement("option");
        option.value = opcion;
        option.text = opcion;
        selectPrimerMes.appendChild(option);
    });
}

function obtenerDatos() {
    return new Promise((resolve, reject) => {
        fetch('./bd/clientes.json')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo obtener los datos de los clientes');
                }
                return respuesta.json();
            })
            .then(datos => {
                resolve(datos);
            })
            .catch(error => {
                let mensajeError = "Error: " + error.message;
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: mensajeError,
                    showConfirmButton: false,
                    timer: 1000
                });
                reject(error);
            });
    });
}

function cargarClientes() {
    ClientesCargados.forEach((objeto, index) => {
        let tabla = document.getElementById("body-table");
        let nuevaFila = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.classList.add("text-center")

        td1.textContent = objeto.Cliente;

        let td2 = document.createElement("td");
        td2.classList.add("text-center")
        td2.textContent = objeto.Cuit;

        let td3 = document.createElement("td");
        td3.classList.add("text-center")
        td3.textContent = "";
        if (objeto.Facturado) {
            let iconoCheck = document.createElement("i");
            iconoCheck.addEventListener("click", changeFacturado);
            iconoCheck.classList.add("fa-regular", "fa-circle-check", "fa-2xl");
            iconoCheck.style.color = "#7fe4b6";
            td3.appendChild(iconoCheck);
        } else {
            let iconoXmark = document.createElement("i");
            iconoXmark.addEventListener("click", changeFacturado);
            iconoXmark.classList.add("fa-regular", "fa-circle-xmark", "fa-2xl");
            iconoXmark.style.color = "#ffb1ac";
            td3.appendChild(iconoXmark);
        }

        let td4 = document.createElement("td");
        td4.classList.add("text-center")
        td4.textContent = objeto.FechaPago;

        let td5 = document.createElement("td");
        td5.classList.add("text-center")
        td5.textContent = objeto.ProxAumento;

        let td6 = document.createElement("td");
        td6.classList.add("text-center")

        const ValorFormat = objeto.Valor.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        });

        td6.textContent = ValorFormat;

        let td7 = document.createElement("td");
        td7.classList.add("text-center")
        td7.textContent = objeto.PrimerMes;

        let td8 = document.createElement("td");
        td8.classList.add("text-center")
        td8.textContent = objeto.Plan;

        let td9 = document.createElement("td");
        td9.classList.add("text-center")

        let div9 = document.createElement("div");
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

        let td10 = document.createElement("td");
        td10.classList.add("text-center")
        td10.textContent = objeto.Limite;

        let td11 = document.createElement("td");
        let iconoPapelera = document.createElement("i");
        iconoPapelera.classList.add("fa-solid", "fa-trash-can", "fa-lg");
        iconoPapelera.style.color = "#fb4646";
        td11.appendChild(iconoPapelera);

        iconoPapelera.addEventListener("click", function () {
            let fila = this.closest("tr");
            fila.parentNode.removeChild(fila);
            let nombreCliente = fila.cells[0].textContent;
            let indiceCliente = ClientesCargados.findIndex(cliente => cliente.Cliente === nombreCliente);
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
                localStorage.setItem("ClientesCargados", JSON.stringify(ClientesCargados))
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
    $('#load').fadeOut(500)
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

async function addCliente(nombre) {
    try {

        let objeto = Clientes.find(cliente => cliente.Cliente === nombre);
        if (objeto) {

            ClientesCargados.push(objeto);

            let tabla = document.getElementById("body-table");
            let nuevaFila = document.createElement("tr");

            let td1 = document.createElement("td");
            td1.classList.add("text-center")

            td1.textContent = objeto.Cliente;

            let td2 = document.createElement("td");
            td2.classList.add("text-center")
            td2.textContent = objeto.Cuit;

            let td3 = document.createElement("td");
            td3.classList.add("text-center")
            td3.textContent = "";
            if (objeto.Facturado) {
                let iconoCheck = document.createElement("i");
                iconoCheck.addEventListener("click", changeFacturado);
                iconoCheck.classList.add("fa-regular", "fa-circle-check", "fa-2xl");
                iconoCheck.style.color = "#7fe4b6";
                td3.appendChild(iconoCheck);
            } else {
                let iconoXmark = document.createElement("i");
                iconoXmark.addEventListener("click", changeFacturado);
                iconoXmark.classList.add("fa-regular", "fa-circle-xmark", "fa-2xl");
                iconoXmark.style.color = "#ffb1ac";
                td3.appendChild(iconoXmark);
            }

            let td4 = document.createElement("td");
            td4.classList.add("text-center")
            td4.textContent = objeto.FechaPago;

            let td5 = document.createElement("td");
            td5.classList.add("text-center")
            td5.textContent = objeto.ProxAumento;

            let td6 = document.createElement("td");
            td6.classList.add("text-center")

            const ValorFormat = objeto.Valor.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS'
            });

            td6.textContent = ValorFormat;

            let td7 = document.createElement("td");
            td7.classList.add("text-center")
            td7.textContent = objeto.PrimerMes;

            let td8 = document.createElement("td");
            td8.classList.add("text-center")
            td8.textContent = objeto.Plan;

            let td9 = document.createElement("td");
            td9.classList.add("text-center")

            let div9 = document.createElement("div");
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

            let td10 = document.createElement("td");
            td10.classList.add("text-center")
            td10.textContent = objeto.Limite;

            let td11 = document.createElement("td");
            let iconoPapelera = document.createElement("i");
            iconoPapelera.classList.add("fa-solid", "fa-trash-can", "fa-lg");
            iconoPapelera.style.color = "#fb4646";
            td11.appendChild(iconoPapelera);

            iconoPapelera.addEventListener("click", function () {
                let fila = this.closest("tr");
                fila.parentNode.removeChild(fila);
                let nombreCliente = fila.cells[0].textContent;
                let indiceCliente = ClientesCargados.findIndex(cliente => cliente.Cliente === nombreCliente);
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
                    localStorage.setItem("ClientesCargados", JSON.stringify(ClientesCargados))
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
        localStorage.setItem("ClientesCargados", JSON.stringify(ClientesCargados))
    } catch (error) {
        console.log("error")
    }

}

$(function () {
    $("#addcliente").autocomplete({
        source: function (request, response) {
            let term = request.term.toLowerCase();
            let filteredClientes = Clientes.filter(cliente =>
                !ClientesCargados.some(cargado => cargado.Cliente.toLowerCase() === cliente.Cliente.toLowerCase()) &&
                cliente.Cliente.toLowerCase().includes(term)
            ).map(cliente => cliente.Cliente);
            response(filteredClientes);
        },
        select: function (event, ui) {
            addCliente(ui.item.value);
        },
        close: function (event, ui) {
            document.getElementById("addcliente").value = "";
        }
    });
});


function changeFacturado(event) {
    let estadoFact;
    if (event.target.classList.contains("fa-circle-check")) {
        event.target.classList.remove("fa-circle-check");
        event.target.classList.add("fa-circle-xmark");
        event.target.style.color = "#ffb1ac";
        estadoFact = false;
    } else if (event.target.classList.contains("fa-circle-xmark")) {
        event.target.classList.remove("fa-circle-xmark");
        event.target.classList.add("fa-circle-check");
        event.target.style.color = "#7fe4b6";
        estadoFact = true;
    }
    update("Facturado", estadoFact, event)
}
function changePago(event) {
    let estadoPago;
    if (event.target.textContent == "Pago") {
        event.target.classList.replace('pago-ok', 'pago-off');
        event.target.textContent = "Impago"
        estadoPago = "Impago"
    } else if (event.target.textContent == "Impago") {
        event.target.classList.replace('pago-off', 'pago-ok');
        event.target.textContent = "Pago"
        estadoPago = "Pago"
    } else if (event.target.textContent == "Vencido") {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No se puede modificar el estado del pago",
            showConfirmButton: false,
            timer: 700
        });
    }
    update("Pago", estadoPago, event)
}

function update(proviene, valor, event) {
    let fila = event.target.closest("tr");
    let nombreCliente = fila.cells[0].textContent;
    let indiceCliente = ClientesCargados.findIndex(cliente => cliente.Cliente === nombreCliente);
    if (indiceCliente !== -1) {
        if (proviene == "Facturado") {
            ClientesCargados[indiceCliente].Facturado = valor;
        } else if (proviene == "Pago") {
            ClientesCargados[indiceCliente].Pago = valor;
        }
    }
    localStorage.setItem("ClientesCargados", JSON.stringify(ClientesCargados))
}

let btnAddCliente = document.getElementById("btnAdd")
btnAddCliente.addEventListener("click", function () {
    const miModal = new bootstrap.Modal(document.getElementById('modalAddCliente'));
    miModal.show();
});
let btnSaveCliente = document.getElementById("saveCliente")
btnSaveCliente.addEventListener("click", function () {

    if (document.getElementById("limite").value !== "" &&
        document.getElementById("cliente").value !== "" &&
        document.getElementById("nrofiscal").value !== "" &&
        document.getElementById("fechapago").value !== "" &&
        document.getElementById("aumento").value !== "" &&
        document.getElementById("valor").value !== "" &&
        document.getElementById("primermes").value !== "" &&
        document.getElementById("plan").value !== "") {

        const nombre = document.getElementById("cliente").value;

        const clienteEncontrado = Clientes.find(cliente => cliente.Cliente.toLowerCase() === nombre);

        if (clienteEncontrado) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Este usuario ya existe!",
                showConfirmButton: false,
                timer: 700
            });
        } else {
            let valorOriginal = document.getElementById("valor").value
            let valorSinSigno = valorOriginal.replace("$", "");
            let replaceMiles = valorSinSigno.replace(",", ".");

            let items = {
                Cliente: document.getElementById("cliente").value,
                Cuit: document.getElementById("nrofiscal").value,
                FechaPago: document.getElementById("fechapago").value,
                ProxAumento: document.getElementById("aumento").value,
                Valor: parseFloat(replaceMiles),
                PrimerMes: document.getElementById("primermes").value,
                Plan: document.getElementById("plan").value,
                Pago: "Impago",
                Limite: document.getElementById("limite").value,
            };
            Clientes.push(items)

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cliente Guardado!",
                showConfirmButton: false,
                timer: 700
            });
            localStorage.setItem("Clientes", JSON.stringify(Clientes))
            document.getElementById("limite").value = "";
            document.getElementById("cliente").value = "";
            document.getElementById("nrofiscal").value = "";
            document.getElementById("fechapago").value = "Del 1 al 5";
            document.getElementById("aumento").value = "";
            document.getElementById("valor").value = "";
            document.getElementById("primermes").value = "";
            document.getElementById("plan").value = "";
            document.getElementById("closeModal").click();
        }


    } else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Llenar todos los campos",
            showConfirmButton: false,
            timer: 700
        });
    }
});
$(function () {
    $("#valor").on({
        "focus": function (event) {
            $(event.target).select();
        },
        "keyup": function (event) {
            $(event.target).val(function (index, value) {
                let soloNumeros = value.replace(/\D/g, "");
                let parteEntera = soloNumeros.slice(0, -2);
                let parteDecimal = soloNumeros.slice(-2);
                let resultadoFormateado = "$" + parteEntera + "," + parteDecimal;
                $("#original").val(parseFloat(parteEntera + "." + parteDecimal).toFixed(2));
                return resultadoFormateado;
            });
        }
    });
});
$(function () {
    $("#limite").datepicker({
        dateFormat: 'dd/mm/yy',
        onSelect: function (selectedDate) {
            let option = this.id == "limite" ? "minDate" : "maxDate",
                instance = $(this).data("datepicker"),
                date = $.datepicker.parseDate(instance.settings.dateFormat, selectedDate);
            $("#limite").datepicker("option", option, date);
        }
    });
});

$(document).ready(function () {
    $('#nrofiscal').on('keyup', function () {
        let numDoc = $(this).val().trim().replace(/\D/g, '');
        if (numDoc.length >= 2) {
            numDoc = numDoc.slice(0, 2) + '-' + numDoc.slice(2);
        }
        if (numDoc.length >= 11) {
            numDoc = numDoc.slice(0, 11) + '-' + numDoc.slice(11);
        }
        $(this).val(numDoc);
    });
});
function obtenerNombreMes(mes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes];
}
const fechaActual = new Date();
const mesActual = fechaActual.getMonth();
const añoActual = fechaActual.getFullYear();
let mes = mesActual;
let año = añoActual;
for (let i = 0; i < 12; i++) {
    ProxAumento.push(obtenerNombreMes(mes) + ' ' + año);
    mes++;
    if (mes === 12) {
        mes = 0;
        año++;
    }
}









