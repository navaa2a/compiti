function aggiungi(value) {
    document.getElementById("schermo").value += value;
}


function cancella() {
    document.getElementById("schermo").value = "";
}



function risultato() {
    const schermo = document.getElementById("schermo");
    let espressione = schermo.value;

    espressione = calcola(espressione, ['*', '/']);
    espressione = calcola(espressione, ['+', '-']);

    schermo.value = espressione;
}

function calcola(espressione, operatori) {
    let risultato = "";
    let numeroParziale = "";
    let operatorePrecedente = null;
    let numeroPrecedente = null;

    for (let i = 0; i < espressione.length; i++) {
        let carattere = espressione[i];

        if (carattere >= '0' && carattere <= '9') {
            numeroParziale += carattere;
        } else if (operatori.includes(carattere)) {
            if (numeroParziale !== "") {
                if (operatorePrecedente === null) {
                    numeroPrecedente = parseFloat(numeroParziale);
                } else {
                    numeroPrecedente = eseguiOperazione(numeroPrecedente, parseFloat(numeroParziale), operatorePrecedente);
                }
                numeroParziale = "";
            }
            operatorePrecedente = carattere;
        }
    }

    if (numeroParziale !== "") {
        if (operatorePrecedente === null) {
            risultato = parseFloat(numeroParziale);
        } else {
            risultato = eseguiOperazione(numeroPrecedente, parseFloat(numeroParziale), operatorePrecedente);
        }
    }

    return risultato.toString();
}

function eseguiOperazione(num1, num2, operatore) {
    switch (operatore) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return num1;
    }
}
