document.addEventListener('DOMContentLoaded', main);

function main() {
    
    fetch('languageCodes.json')
    .then(response => response.json())
    .then(languageCodes => {
        const changeButton = document.getElementById('change-button');
        changeButton.addEventListener('click', changeAll);
        const disableButton = document.getElementById('disable-button');
        disableButton.addEventListener('click', onOff);
        buttonInit();
        createCheckboxes(languageCodes);
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}

function createCheckboxes(languageCodes) {
    const container = document.getElementById("container");

    const table = document.createElement("table");

    for (const [key, value] of Object.entries(languageCodes)) {
        const row = document.createElement("tr");
        let label = document.createElement('label');
        label.innerHTML = value;
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = key;  
        (async () => {
            try {
                chrome.storage.local.get([key], function (result) {
                    checkbox.checked = result[key];
                });
                checkbox.addEventListener('change', function () {
                    chrome.storage.local.set({ [key]: this.checked });
                });
            } catch (error) {
                console.error(error);
            }
        })();
        
        const cell1 = document.createElement("td");
        cell1.appendChild(label);
        const cell2 = document.createElement("td");
        cell2.appendChild(checkbox);
        
        row.appendChild(cell1);
        row.appendChild(cell2);

        table.appendChild(row);
    }
    container.appendChild(table);
}

function changeAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes[0].checked) {
        for (const box of checkboxes) {
            box.checked = false;
            chrome.storage.local.set({ [box.id]: false });
        }
    } else {
        for (const box of checkboxes) {
            box.checked = true;
            chrome.storage.local.set({ [box.id]: true });
        }
    }
}

function onOff() {
    var labels = document.querySelectorAll('label');
    const button = document.getElementById('disable-button');
    chrome.storage.local.get(['run'], function(result) {
        if (result.run) {
            labels.forEach(function(label) {
                label.style.textDecoration = "line-through";
            });
            document.body.style.filter = "grayscale(100%)";
            
            chrome.storage.local.set({ run: false });
            button.innerHTML = "Enable LF";
            
        } else {
            labels.forEach(function(label) {
                label.style.textDecoration = "none";
            });
            document.body.style.filter = "none";
            chrome.storage.local.set({ run: true });
            button.innerHTML = "Disable LF";
        }
    })
    
}

function buttonInit() {
    const button = document.getElementById('disable-button');
    chrome.storage.local.get(['run'], function(result) {
        if (result.run) {
            button.innerHTML = "Disable LF";
        } else {
            var labels = document.querySelectorAll('label');
            labels.forEach(function(label) {
                label.style.textDecoration = "line-through";
            });
            document.body.style.filter = "grayscale(100%)";
            button.innerHTML = "Enable LF";
        }
    })
}







