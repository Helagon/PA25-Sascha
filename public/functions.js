 // Funktion zur Berechnung von CO2-Emissionen und Wasserverbrauch

function calculateCO2AndWater(ingredientName = '', ingredientCO2 = 0, ingredientWater = 0, currentTotalCO2 = 0, currentTotalWater = 0) {
    // Berechnet neue Werte
    const newTotalCO2 = currentTotalCO2 + ingredientCO2;
    const newTotalWater = currentTotalWater + ingredientWater;

    // Aktualisiere die Anzeige
    document.getElementById('co2-emissions').textContent = newTotalCO2 + ' kg';
    document.getElementById('water-usage').textContent = newTotalWater + ' l';

    return {
        totalCO2: newTotalCO2,
        totalWater: newTotalWater
    };
}  

// Funktion zum Laden der Zutaten aus JSON
function loadIngredients() {
    fetch('ingredients.json')
    .then(response => response.text())
    .then(data => {
        return JSON.parse(data);
    })
    .catch(error => console.error('Fehler beim Laden der Zutaten:', error));
    
}

// Funktion für Items in den Kategorien
function createIngredientItems(data) {
    const ingredientPanel = document.createElement('div');
    ingredientPanel.className = 'ingredient-panel dragElement ' + data.category;
    ingredientPanel.setAttribute('draggable', 'true');
    ingredientPanel.setAttribute('data-co2', data.co2);
    ingredientPanel.setAttribute('data-water', data.water);
    ingredientPanel.setAttribute('category', data.category);
    ingredientPanel.textContent = data.icon + " " + data.name;

    return ingredientPanel;
}