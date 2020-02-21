

function validaFormulario() {
    var exp_soloNumeros = /^[0-9]+$/;
    var exp_soloLetras = /^[A-Za-z\s]+$/;
    var exp_rut = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
    var exp_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
    var exp_fecha = /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/;

    var edad = document.getElementById("edad").value;
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var rutCompleto = document.getElementById("rut").value;
    var email = document.getElementById("email").value;
    var especialidad = document.getElementById("selectEspecialidad").value;
    var hora = document.getElementById("selectHora").value;
    var fecha = document.getElementById("fecha").value;

    var r = validaRut(rutCompleto, exp_rut);
    var n = validaNombres(exp_soloLetras, nombres);
    var a = validaApellidos(exp_soloLetras,apellidos);
    var ed = validaEdad(exp_soloNumeros, edad);
    var em = validaEmail(exp_email, email);
    var f = validaFecha(exp_fecha, fecha);
    if ((r != 'no') && (n != 'no') && (a != 'no') && (ed != 'no') && (em != 'no') && (f != 'no')) {
        despliegaMensajeReserva(nombres, apellidos, especialidad, fecha, hora, email);
    }
    
}

function validaRut(rutCompleto, exp_rut) {
    var retorno;
    var Fn = {        
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut: function (rutCompleto) {
            if (!exp_rut.test(rutCompleto))
                return false;
            var tmp = rutCompleto.split('-');
            var digv = tmp[1];
            var rut = tmp[0];
            if (digv == 'K') digv = 'k';
            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            var M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }
    if (rutCompleto == "") {
        alert("El rut no debe estar vacio");
        return 'no';
    } else {
       retorno = Fn.validaRut(rutCompleto) ? 'ok' : 'nok';
    } 
    if (retorno == 'nok') {
        alert("El rut es invalido");
        return 'no';
    }
}

function validaNombres(exp, nombres) {
    if (nombres == "") {
        alert("los nombres no deben estar vacios");
        return 'no';
    } else if (!exp.test(nombres)) {
        alert("los nombres deben contener solo letras");
        return 'no';
    } 
}

function validaApellidos(exp,apellidos) {
    if (apellidos == "") {
        alert("los apellidos no deben estar vacios");
        return 'no';
    } else if (!exp.test(apellidos)) {
        alert("los apellidos deben contener solo letras");
        return 'no';
    }
}

function validaEdad(exp,edad) {
    if (edad=="") {
        alert("la edad no debe estar vacia");
        return 'no';
    } else if (!exp.test(edad)) {    
        alert("la edad solo debe contener numeros");
        return 'no';
    } 
}

function validaEmail(exp,email) {
    if (email == "") {
        alert("el email no debe estar vacio");
        return 'no';
    } else if (!exp.test(email)) {
        alert("email inválido");
        return 'no';
    } 
}

function validaFecha(exp, fecha) {
    if (fecha == "") {
        alert("la fecha no debe estar vacia");
        return 'no';
    } else if (!exp.test(fecha)) {
        alert("fecha inválida");
        return 'no';
    }
}

function despliegaMensajeReserva(nombres, apellidos, especialidad, fecha, hora, email) {
    document.write('<div style="text-align:center;">Estimado(a) '+nombres+' '+apellidos+', su hora para '+especialidad+' ha sido reservada para el </br> día '+fecha+' a las '+hora+'.Además, se le envió un mensaje a su correo '+email+' con el detalle de su cita. </br>Gracias por preferirnos</div>');
}