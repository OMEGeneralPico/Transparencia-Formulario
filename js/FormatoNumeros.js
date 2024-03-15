function formatoNumero(input) {
    // Remover cualquier caracter que no sea número o coma
    input.value = input.value.replace(/[^0-9,]/g, '');
    
    // Remover puntos previos (si existen)
    input.value = input.value.replace(/\./g, '');

    // Separar parte entera y parte decimal (si existe)
    var partes = input.value.split(',');
    var parteEntera = partes[0];
    var parteDecimal = partes[1] || '';

    // Agregar puntos cada tres números en la parte entera
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Actualizar el valor del input
    input.value = parteEntera + (parteDecimal ? ',' + parteDecimal : '');
}document.addEventListener('DOMContentLoaded', function() {
    var inputsNumero = document.querySelectorAll('.form-control');
    inputsNumero.forEach(function(input) {
        input.addEventListener('input', function() {
            formatoNumero(input);
        });
    });
});