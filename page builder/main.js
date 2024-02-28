// Function to add an element to the screen
function addElementToScreen() {
    // Get form values
    const width = document.getElementById('widthInput').value;
    const widthUnit = document.getElementById('selectW').value;
    const height = document.getElementById('heightInput').value;
    const heightUnit = document.getElementById('selectH').value;
    const text = document.getElementById('textInput').value;
    const textSize = document.getElementById('textSize').value;
    const textSizeUnit = document.getElementById('selectTsize').value;
    const textColor = document.getElementById('textColor').value;

    // Create a new div element
    const newElement = document.createElement('div');

    // Set element properties
    newElement.textContent = text;
    newElement.style.width = `${width}${widthUnit}`;
    newElement.style.height = `${height}${heightUnit}`;
    newElement.style.fontSize = `${textSize}${textSizeUnit}`;
    newElement.style.color = textColor;
    newElement.style.border = '1px solid black';
    newElement.style.margin = '10px';
    newElement.style.padding = '10px';
    newElement.style.textAlign = 'center';
    newElement.style.backgroundColor = document.getElementById('BGCinput').value;

    // Add delete button to the new element
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', function() {
        newElement.remove();
        updateLocalStorage();
    });
    newElement.appendChild(deleteButton);

    // Add the new element to the screen
    document.querySelector('.userPage').appendChild(newElement);

    // Update local storage
    updateLocalStorage();
}

// Event listener for deleting an element
document.querySelector('.userPage').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('deleteButton')) {
        const element = event.target.parentElement;
        element.remove();
        updateLocalStorage();
    }
});

// Function to remove all elements from the screen
function deleteAllElements() {
    const userPage = document.querySelector('.userPage');
    userPage.innerHTML = ''; // Clear the userPage element
    updateLocalStorage(); // Update local storage
}

// Function to update local storage with elements on the screen
function updateLocalStorage() {
    const elements = [];
    const userPage = document.querySelector('.userPage');
    userPage.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const elementData = {
                text: node.textContent,
                width: node.style.width,
                height: node.style.height,
                fontSize: node.style.fontSize,
                color: node.style.color,
                backgroundColor: node.style.backgroundColor
            };
            elements.push(elementData);
        }
    });
    localStorage.setItem('pageElements', JSON.stringify(elements));
}

// Function to load elements from local storage
function loadElementsFromLocalStorage() {
    const elements = JSON.parse(localStorage.getItem('pageElements'));
    if (elements) {
        elements.forEach(elementData => {
            const newElement = document.createElement('div');
            newElement.textContent = elementData.text;
            newElement.style.width = elementData.width;
            newElement.style.height = elementData.height;
            newElement.style.fontSize = elementData.fontSize;
            newElement.style.color = elementData.color;
            newElement.style.backgroundColor = elementData.backgroundColor;
            newElement.style.border = '1px solid black';
            newElement.style.margin = '10px';
            newElement.style.padding = '10px';
            newElement.style.textAlign = 'center';

            // Add delete button to the new element
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('deleteButton');
            deleteButton.addEventListener('click', function() {
                newElement.remove();
                updateLocalStorage();
            });
            newElement.appendChild(deleteButton);

            // Add the new element to the screen
            document.querySelector('.userPage').appendChild(newElement);
        });
    }
}

// Load elements from local storage when the page loads
window.addEventListener('load', function() {
    loadElementsFromLocalStorage();
});

// Event listener for the "Add" button click
document.getElementById('submitButton').addEventListener('click', function() {
    addElementToScreen();
});

// Event listener for the "Delete All" button click
document.getElementById('deleteButton').addEventListener('click', deleteAllElements);

// Function to save the page state
function savePageState() {
    const pageContent = document.querySelector('.userPage').innerHTML;
    const blob = new Blob([pageContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page_state.html';
    
    // Simulate click to trigger download
    a.click();
    
    // Cleanup
    URL.revokeObjectURL(url);
}

// Event listener for the "Save" button click
document.getElementById('saveButton').addEventListener('click', savePageState);

// Event listener for changing text color
document.getElementById('textColor').addEventListener('input', function() {
    const color = this.value;
    document.querySelectorAll('.userPage div').forEach(element => {
        element.style.color = color;
    });
});

// Event listener for changing background color
document.getElementById('BGCinput').addEventListener('input', function() {
    const color = this.value;
    document.querySelectorAll('.userPage div').forEach(element => {
        element.style.backgroundColor = color;
    });
});