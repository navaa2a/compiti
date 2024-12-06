function aggiungi(value) {
    document.getElementById("schermo").value += value;
}


function cancella() {
    document.getElementById("schermo").value = "";
}



function risultato() {
    const schermo = document.getElementById("schermo");
    const espressione = schermo.value;
    const regex = /(\d+)([+\-*/])(\d+)/g;
    let risultato = espressione;

    while (regex.test(risultato)) {
        risultato = risultato.replace(regex, function(_, num1, operatore, num2) {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            switch (operatore) {
                case '+':
                    return num1 + num2;
                case '-':
                    return num1 - num2;
                case '*':
                    return num1 * num2;
                case '/':
                    return num1 / num2;
            }
        });
    }

    schermo.value = risultato;
}

