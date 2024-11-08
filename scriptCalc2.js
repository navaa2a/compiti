
function aggiungi(value) {
    document.getElementById("schermo").value += value;
}


function cancella() {
    document.getElementById("schermo").value = "";
}

function risultato() {
    const schermo = document.getElementById("schermo");
        schermo.value = eval(schermo.value);
}



