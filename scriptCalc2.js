
function aggiungi(value) {
    document.getElementById("schermo").value += value;
}


function cancella() {
    document.getElementById("schermo").value = "";
}


function risultato() {
    const schermo = document.getElementById("schermo");
    const espressione = schermo.value;

    // Calcoliamo il risultato dell'espressione usando eval
    const risultato = eval(espressione);
    
    // Assegniamo il risultato all'input (se valido)
    schermo.value = isNaN(risultato) ? "" : risultato;
}


document.addEventListener("keydown", function(event) {
    const schermo = document.getElementById("schermo");
    const simboliAmmessi = "0123456789+-*";

    if (event.key === "Enter") {
        risultato();
    }
    
    else if (event.key === "Backspace") {
        cancella();
    }
    
    else if (simboliAmmessi.includes(event.key)) {
        schermo.value += event.key;
    }
});
