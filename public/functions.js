// Funktion zur Berechnung von CO2-Emissionen und Wasserverbrauch

function calculateCO2AndWater(ingredientName = '', ingredientCO2 = 0, ingredientWater = 0, currentTotalCO2 = 0, currentTotalWater = 0) {
    // Berechnet neue Werte
    const newTotalCO2 = currentTotalCO2 + ingredientCO2;
    const newTotalWater = currentTotalWater + ingredientWater;

    // Aktualisiere die Anzeige
    const co2El = document.getElementById('co2-emissions');
    const waterEl = document.getElementById('water-usage');
    if (co2El) co2El.textContent = newTotalCO2.toFixed(2) + ' kg';
    if (waterEl) waterEl.textContent = newTotalWater.toFixed(0) + ' l';

    return {
        totalCO2: newTotalCO2,
        totalWater: newTotalWater
    };
}

// Erzeugt ein DOM-Element für eine Zutat und bindet grundlegende Event-Handler
function createIngredientItems(item) {
    const ingredientPanel = document.createElement('div');
    ingredientPanel.className = 'ingredient-panel dragElement ' + (item.category || '');
    ingredientPanel.setAttribute('draggable', 'true');
    ingredientPanel.setAttribute('data-co2', item.co2);
    ingredientPanel.setAttribute('data-water', item.water);
    ingredientPanel.setAttribute('category', item.category);
    ingredientPanel.setAttribute('data-name', item.name);
    ingredientPanel.textContent = (item.icon || '') + ' ' + item.name;

    // Drag handlers
    ingredientPanel.addEventListener('dragstart', function () {
        this.classList.add('dragging');
    });
    ingredientPanel.addEventListener('dragend', function () {
        this.classList.remove('dragging');
        this.classList.add('inList');
    });

    // Click to remove from burger when inside burger
    ingredientPanel.addEventListener('click', function () {
        if (this.classList.contains('in-burger')) {
            this.classList.remove('in-burger');
            const cat = this.getAttribute('category');
            const container = document.getElementById(cat + '_category');
            if (container) container.appendChild(this);
            if (typeof window.recalcTotalsFromDropzone === 'function') window.recalcTotalsFromDropzone();
        }
    });

    return ingredientPanel;
}

// Funktion zum Laden der Zutaten aus JSON (async/await + try/catch)
async function loadIngredients() {
    try {
        const response = await fetch('ingredients.json');
        const data = await response.json();

        const ingredientsList = document.getElementById('ingredients-list');
        if (!ingredientsList) return data;

        for (const category in data) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'ingredient-category col-6';
            categoryDiv.setAttribute('id', category + '_category');
            const categoryTitle = document.createElement('h5');
            categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryDiv.appendChild(categoryTitle);

            data[category].forEach(ingredient => {
                const ingredientPanel = createIngredientItems(ingredient);
                categoryDiv.appendChild(ingredientPanel);
            });

            ingredientsList.appendChild(categoryDiv);
        }

        return data;
    } catch (error) {
        console.error('Error loading ingredients:', error);
        const ingredientsList = document.getElementById('ingredients-list');
        if (ingredientsList) {
            const errDiv = document.createElement('div');
            errDiv.className = 'error';
            errDiv.textContent = 'Zutaten konnten nicht geladen werden.';
            ingredientsList.appendChild(errDiv);
        }
        throw error;
    }
}
