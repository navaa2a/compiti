var elenco = [];
caricaDati();

function caricaDati() {
  var richiesta = new XMLHttpRequest();
  richiesta.open("GET", "data.json", true);
  richiesta.send();
  richiesta.onload = function() {
    elenco = JSON.parse(richiesta.responseText);
    riempiTabella(elenco);
  };
}

function riempiTabella(lista) {
  var tab = document.getElementById('tabella');
  while (tab.rows.length > 1) {
    tab.deleteRow(1);
  }
  for (var k = 0; k < lista.length; k++) {
    var persona = lista[k];
    var riga = tab.insertRow(-1);
    riga.insertCell(0).textContent = persona.nome;
    riga.insertCell(1).textContent = persona.cognome;
    riga.insertCell(2).textContent = persona.dataNascita;
  }
}

function filtraPerLettera() {
  var l = document.getElementById('lettera').value;
  var nuovaLista = [];
  for (var a = 0; a < elenco.length; a++) {
    var cog = elenco[a].cognome;
    if (cog[0].toUpperCase() == l.toUpperCase()) {
      nuovaLista.push(elenco[a]);
    }
  }
  riempiTabella(nuovaLista);
}

function mostraMaggiorenni() {
  var t = document.getElementById('tabella');
  while (t.rows.length > 1) {
    t.deleteRow(1);
  }
  var maggiori = [];
  for (var b = 0; b < elenco.length; b++) {
    var persona2 = elenco[b];
    var anno = parseInt(persona2.dataNascita.substring(0, 4));
    if (2025 - anno >= 18) {
      maggiori.push(persona2);
    }
  }
  for (var c = 0; c < maggiori.length; c++) {
    var nuovaRiga = t.insertRow(-1);
    nuovaRiga.insertCell(0).textContent = maggiori[c].nome;
    nuovaRiga.insertCell(1).textContent = maggiori[c].cognome;
    nuovaRiga.insertCell(2).textContent = maggiori[c].dataNascita;
  }
}

function reset() {
  document.getElementById('lettera').value = '';
  riempiTabella(elenco);
}