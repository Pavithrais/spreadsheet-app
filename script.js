document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#spreadsheet tbody");

    // Create 5 rows with 4 columns each
    for (let i = 1; i <= 5; i++) {
        let row = document.createElement("tr");

        let rowNumber = document.createElement("td");
        rowNumber.textContent = i;
        row.appendChild(rowNumber);

        for (let j = 0; j < 4; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "text";
            input.dataset.row = i;
            input.dataset.col = String.fromCharCode(65 + j);
            input.addEventListener("input", handleInputChange);
            cell.appendChild(input);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
});

function handleInputChange(event) {
    let input = event.target;
    let value = input.value.trim().toUpperCase();

    if (value.startsWith("=")) {
        let formula = value.substring(1);
        let result = calculateFormula(formula);
        if (result !== null) {
            input.value = result;
        }
    }
}

function calculateFormula(formula) {
    try {
        let cells = document.querySelectorAll("input");
        let values = {};

        cells.forEach(cell => {
            let key = cell.dataset.col + cell.dataset.row;
            values[key] = isNaN(cell.value) ? 0 : Number(cell.value);
        });

        formula = formula.replace(/[A-D][1-5]/g, match => values[match] || 0);

        return eval(formula);
    } catch (error) {
        return "ERROR";
    }
}
