document.getElementById("csvFileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            displayCSV(text);
        };

        reader.onerror = function() {
            console.error("Errore nella lettura del file");
        };

        reader.readAsText(file);
    }
});

function displayCSV(csvText) {
    const rows = csvText.split("\n").map(row => row.split(","));
    const table = document.getElementById("csvTable");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");


    thead.innerHTML = "";
    tbody.innerHTML = "";


    const headerRow = rows[0];
    const headerHtml = headerRow.map(cell => `<th>${cell.trim()}</th>`).join("");
    thead.innerHTML = `<tr>${headerHtml}</tr>`;


    for (let i = 1; i < rows.length; i++) {
        const rowHtml = rows[i].map(cell => `<td>${cell.trim()}</td>`).join("");
        tbody.innerHTML += `<tr>${rowHtml}</tr>`;
    }
}