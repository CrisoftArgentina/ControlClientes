document.getElementById('ingresar').addEventListener('click', function (event) {
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('contrasenia').value;
    const resultado = DetectarUsuario(email, contrasenia);
    
    if (resultado.encontrado) {
        alert("bienvenido " + resultado.nombre)
        localStorage.setItem("usuario", resultado.nombre);
        window.location.href = './index.html';
    } else {
        const miModal = new bootstrap.Modal(document.getElementById('modalLogin'));
        miModal.show();
        setTimeout(function() {
            miModal.hide();
        }, 1500);
    }
});

function DetectarUsuario(email, contrasenia) {
    const usuarioEncontrado = usuarios.find(u => u.usuario === email && u.contrasenia === contrasenia);
    return {
        nombre: usuarioEncontrado ? usuarioEncontrado.nombre : null,
        encontrado: usuarioEncontrado ? true : false
    };
}

const usuarios = [
    {
        nombre: "Romina",
        usuario: "Romina@gmail.com",
        contrasenia: "ro123"
    },
    {
        nombre: "Cristian",
        usuario: "Cristian@gmail.com",
        contrasenia: "cris123"
    }
];
