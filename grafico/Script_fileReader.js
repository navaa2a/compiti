let stringa;
let righe = [];
let tabella = [];
let datiNumerici = [];
const canvas = document.getElementById("grafico");
const grafico = canvas.getContext("2d");

function leggi(input) {
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

    grafico.clearRect(0, 0, canvas.width, canvas.height);
    grafico.beginPath();
    grafico.moveTo(865, 580);  
    grafico.lineTo(30, 580);   
    grafico.lineTo(30, 0);     
    grafico.stroke();



    let xgrafico;
    let ygrafico;
    let indiceMin = 0
    let indiceMax = Math.ceil(Math.max(...datiNumerici) / 1000) * 1000;
    let differenza = indiceMax - indiceMin;
    let scalaY = 560 / differenza;

    
    grafico.beginPath(); 
    for (let y = 0; y < righe.length - 1; y++) {
        xgrafico = ((840 / (righe.length - 1)) * (y+1));  
        ygrafico = 580 - (scalaY * (datiNumerici[y] - indiceMin)); 
   
        if (y === 0) {
            grafico.moveTo(xgrafico, ygrafico);
            
        } else {
            grafico.lineTo(xgrafico, ygrafico);  
        }
       
    }

    grafico.stroke();  
}
