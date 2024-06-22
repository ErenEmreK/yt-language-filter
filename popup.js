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
    
    createCheckboxes();
}

function createCheckboxes() {
    const container = document.getElementById("container");

    const table = document.createElement("table");

    for (const [key, value] of Object.entries(languageCodes)) {
        const row = document.createElement("tr");
        let label = document.createElement('label');
        label.innerHTML = value;
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";

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

    /*
    languageCodes.forEach(code => {
        const row = document.createElement("tr");
        let label = document.createElement('label');
        label.innerHTML = "code";
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        const cell1 = document.createElement("td");
        cell1.appendChild(label);
        const cell2 = document.createElement("td");
        cell2.appendChild(checkbox);
        
        row.appendChild(cell1);
        row.appendChild(cell2);

        table.appendChild(row);
    });
    table.style.display = "show";

    container.appendChild(table);
}    
 /*
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = "id";
    checkbox.style.display = "show";
    
    let label = document.createElement('label');
    label.htmlFor = "id";
    label.appendChild(document.createTextNode('IN'));
    
    container.appendChild(checkbox);
    container.appendChild(label);

*/


