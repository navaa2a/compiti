let stringa;
let righe = [];
let tabella = [];
let datiNumerici = [];
const canvas = document.getElementById("grafico");
const grafico = canvas.getContext("2d");

function leggi(input) {
    if (input.files.length === 0) {
        alert("Seleziona un file valido.");
        return;
    }

    let file = input.files[0];
    let reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function () {
        stringa = reader.result;
        inserisci();
    };
}

function inserisci() {
    document.getElementById("titolo").innerHTML = "Informazioni del file";
    let tab = document.getElementById("tabella");
    
    righe = stringa.split("\n");
    tab.innerHTML = ""; 

    for (let n = 0; n < righe.length; n++) {
        tabella[n] = righe[n].split(",");
        let nuovaRiga = tab.insertRow();

        for (let z = 0; z < tabella[n].length; z++) {
            let cella = nuovaRiga.insertCell(z);
            cella.innerHTML = tabella[n][z].replace(/"/g, '');
        }
    } 

   
    datiNumerici = [];
    
  
    for (let z = 1; z < righe.length; z++) {
        let valore = Number(tabella[z][1].replace(/"/g, ''));
        if (!isNaN(valore)) {
            datiNumerici.push(valore);
        } 
    }

    
    disegna();
}

function disegna() {

    //disegno i due assi
    grafico.clearRect(0, 0, canvas.width, canvas.height);
    grafico.beginPath();
    grafico.moveTo(865, 580);  
    grafico.lineTo(30, 580);   
    grafico.lineTo(30, 0);     
    grafico.stroke();


    grafico.font = "12px Arial";
    let xgrafico;
    let ygrafico;

    //metto le etichette all'asse x dividendo l'asse per il numero di anni
    for (let x = 1; x < righe.length; x++) {
        xgrafico = ((840 / (righe.length - 1)) * x); 
        grafico.fillText(tabella[x][0].replace(/"/g, ' '), xgrafico-10, 595);
    }

    //trovo i valori minimi e massimi arrotondati e i dati per fare le proporzioni
    let indiceMax = Math.ceil(Math.max(...datiNumerici) / 1000) * 1000;
    let indiceMin = Math.floor(Math.min(...datiNumerici) / 1000) * 1000;
    let differenza = indiceMax - indiceMin;
    let scalaY = 560 / differenza;//quanti pixel può occuppare ogni valore

    //metto le etichette all'asse y calcolando la proporzione yPos:diff=i:5 che ho poi messo in scala
    for (let i = 0; i <= 5; i++) { 
        let yPos = 580 - (scalaY * (i * differenza / 5));
        grafico.fillText(indiceMin + (i * differenza / 5), 0, yPos);
    }

    
    grafico.beginPath(); //accoppiando le ccordinate riempio il grafico
    for (let y = 0; y < righe.length - 1; y++) {
        xgrafico = ((840 / (righe.length - 1)) * (y+1));  
        ygrafico = 580 - (scalaY * (datiNumerici[y] - indiceMin)); //calcolo il valore di y mettendo 
        // in scala il valore attuale meno l'indice minimo

        
        if (y === 0) {
            grafico.moveTo(xgrafico, ygrafico);
            
        } else {
            grafico.lineTo(xgrafico, ygrafico);  
        }
       
    }

    grafico.stroke();  
}
