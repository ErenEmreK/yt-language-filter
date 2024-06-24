document.addEventListener('DOMContentLoaded', main);

const languageCodes = {
    ar: "Arabic",
    am: "Amharic",
    bn: "Bengali",
    bg: "Bulgarian",
    ca: "Catalan",
    zh_CN: "Chinese (China)",
    zh_TW: "Chinese (Taiwan)",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    en: "English",
    en_AU: "English (Australia)",
    en_GB: "English (Great Britain)",
    en_US: "English (USA)",
    et: "Estonian",
    fil: "Filipino",
    fi: "Finnish",
    fr: "French",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    he: "Hebrew",
    hi: "Hindi",
    hu: "Hungarian",
    id: "Indonesian",
    it: "Italian",
    ja: "Japanese",
    kn: "Kannada",
    ko: "Korean",
    lv: "Latvian",
    lt: "Lithuanian",
    ms: "Malay",
    ml: "Malayalam",
    mr: "Marathi",
    no: "Norwegian",
    fa: "Persian",
    pl: "Polish",
    pt_BR: "Portuguese (Brazil)",
    pt_PT: "Portuguese (Portugal)",
    ro: "Romanian",
    ru: "Russian",
    sr: "Serbian",
    sk: "Slovak",
    sl: "Slovenian",
    es: "Spanish",
    es_419: "Spanish (Latin America and Caribbean)",
    sw: "Swahili",
    sv: "Swedish",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    vi: "Vietnamese"
};

function main() {
    const changeButton = document.getElementById('change-button');
    changeButton.addEventListener('click', changeAll);

    createCheckboxes(languageCodes);


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
        }
    } else {
        for (const box of checkboxes) {
            box.checked = true;
        }
    }
}












async function initKeys() {
    //We check if the first code is assigned in chrome storage
    //If not we assign every code to true for them to be active at first
    const firstKey = Object.keys(languageCodes)[0];
    chrome.storage.local.get([firstKey], function(result) {
        if (result[firstKey] === undefined) {
            for (const [key, value] of Object.keys(languageCodes)) {
                chrome.storage.local.set({ key: 'true' });
                chrome.storage.local.get([key], function(result) {
                    console.log('Data retrieved: ', result);
                    console.log('key:', result[key]); // true
                  });
            }
            console.log("All codes are set true.");
        }
    })
    
    
}
