'use strict';
let pickedDate = new Date();
const baseURL = "https://history.muffinlabs.com/date";

console.log(pickedDate);

const wochentage = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
];

const monate = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];

const daycounter = [
    "erste",
    "zweite",
    "dritte",
    "vierte",
    "fünfte"
];

function reloadPage() {

const pickedDay =pickedDate.getDate();
const pickedMonth = pickedDate.getMonth();
const pickedYear = pickedDate.getFullYear();
const pickedWeekDay = pickedDate.getDay();

const tagesNummer = berechneTagesnummer(pickedDate);
const tageUebrig = berechneTageUebrig(pickedDate);
const wochentgz = berechneWocheImMonat(pickedDay);
const daysInMonth = berechneTageImMonat(pickedYear, pickedMonth);

const wochentag = wochentage[pickedWeekDay];
const monat = monate[pickedMonth];
const daycount = daycounter[wochentgz - 1];

const apiURL = `${baseURL}/${pickedMonth + 1}/${pickedDay}`;

getAPIData(apiURL);

const fullDate =
        `${String(pickedDay).padStart(2, '0')}.${String(pickedMonth + 1).padStart(2, '0')}.${pickedYear}`;

console.log(fullDate);


document.getElementById("ueberschrift").textContent =
    `Kalenderblatt vom ${fullDate}.`;

    document.getElementById("beschreibung").textContent =
    `Der ${pickedDay}.${monat} ${pickedYear} ist ein ${wochentag} ` +
    `und zwar der ${daycount} ${wochentag} im Monat ${monat} ` +
    `des Jahres ${pickedYear}. Es handelt sich um den ${tagesNummer}. ` +
    `Tag des Jahres, was bedeutet, dass es noch ${tageUebrig} ` +
    `Tage bis zum Jahresende sind. Der Monat ${monat} ` +
    `hat insgesamt ${daysInMonth} Tage. ` +
    `Heute ist kein gesetzlicher Feiertag in Deutschland.`;

document.getElementById("ereignisse-ueberschrift").textContent = 
`Historische Ereignisse am ${pickedDay}. ${monat} ${pickedYear}:`;


createHistoricEventsList(apiURL);


const tabelle = document.getElementById("tabelle");

tabelle.innerHTML = "";

erstelleKalender(
    tabelle,
    pickedYear,
    pickedMonth,
    daysInMonth
);

const presentDayCell = document.querySelectorAll("#tabelle td");

presentDayCell.forEach(zelle => {
    if (zelle.textContent === String(pickedDay)) {
        zelle.style.backgroundColor = "lightgreen";
    }
});

}

document.getElementById("lastButton").addEventListener("click", goOneMonthBack);

document.getElementById("forwardButton").addEventListener("click", goOneMonthForward);

tabelle.addEventListener("click", (event) => {
    if (event.target.tagName !== "TD") {
        return;
}

    const selectedDay = parseInt(event.target.textContent);
    if (isNaN(selectedDay))
        return;
     pickedDate.setDate(selectedDay);
     reloadPage();
});


function erstelleKalender(tabelle, year, month, daysInMonth) {

    const caption = tabelle.createCaption();
    caption.textContent = `${monate[month]} ${year}`;

    const kopfzeile = tabelle.insertRow();

    const wochentageKurz = [
        "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"
    ];

    for (let i = 0; i < wochentageKurz.length; i++) {
        const zelle = kopfzeile.insertCell();
        zelle.textContent = wochentageKurz[i];
    }

    const ersterTag = new Date(year, month, 1);

    let startTag = ersterTag.getDay();

    if (startTag === 0) {
        startTag = 7;
    }

    let reihe = tabelle.insertRow();

    for (let i = 1; i < startTag; i++) {
        const zelle = reihe.insertCell();
        zelle.textContent = "";
    }

    for (let tag = 1; tag <= daysInMonth; tag++) {

        if (reihe.cells.length === 7) {
            reihe = tabelle.insertRow();
        }

        const zelle = reihe.insertCell();
        zelle.textContent = tag;
    }

    while (reihe.cells.length < 7) {
        const zelle = reihe.insertCell();
        zelle.textContent = "";
    }
}

function goOneMonthBack () {
    pickedDate.setMonth(pickedDate.getMonth() - 1);
    console.log("Rückwärts");
    reloadPage();
}

function goOneMonthForward () {
    pickedDate.setMonth(pickedDate.getMonth() + 1);
    console.log("Vorwärts");
    reloadPage();
}

function updateCalendar() {
       const daysInMonth = berechneTageImMonat(
        pickedDate.getFullYear(),
        pickedDate.getMonth()
    );
    tabelle.innerHTML = "";
    erstelleKalender(
        tabelle,
        pickedDate.getFullYear(),
        pickedDate.getMonth(),
        daysInMonth
    );
}

function getAPIData(apiURL) {
    return fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            };

            return response.json();
        })
        .then(data => {

            return data;
            
        })
        .catch(error => {
            console.error("Error fetching API data:", error);
        });
}

function createHistoricEventsList(apiURL) {
    getAPIData(apiURL)
        .then(data => {
          const events = data.data.Events;
          const deaths = data.data.Deaths;
          const births = data.data.Births;
        
            document.querySelector(".ereignisseHistorisch").innerHTML = "";
            document.querySelector(".tode").innerHTML = "";
            document.querySelector(".geburten").innerHTML = "";

        for (let i = 0; i < 2; i++) { 
            const randomIndex = Math.floor(Math.random() * events.length);
            const event = events[randomIndex];
            const listItem = document.createElement("li");
            listItem.textContent = `${event.year}: ${event.text}`;
            document.querySelector(".ereignisseHistorisch").appendChild(listItem);
        }   
        for (let i = 0; i < 2; i++) { 
            const randomIndex = Math.floor(Math.random() * deaths.length);
            const death = deaths[randomIndex];
            const listItem = document.createElement("li");
            listItem.textContent = `${death.year}: ${death.text}`;
            document.querySelector(".tode").appendChild(listItem);
         
        }
        for (let i = 0; i < 2; i++) { 
            const randomIndex = Math.floor(Math.random() * births.length);
            const birth = births[randomIndex];
            const listItem = document.createElement("li");
            listItem.textContent = `${birth.year}: ${birth.text}`;
            document.querySelector(".geburten").appendChild(listItem);
        }       
      })}; 

      function berechneTagesnummer(pickedDate) {
    const jahresanfang = new Date(
        pickedDate.getFullYear(),0,1);

    const millisekundenProTag = 1000 * 60 * 60 * 24;

    return Math.floor(
        (pickedDate - jahresanfang) / millisekundenProTag) + 1;
}

function berechneTageUebrig(pickedDate) {
    const jahresende = new Date(
        pickedDate.getFullYear() + 1,
        0,
        1
    );

    const millisekundenProTag = 1000 * 60 * 60 * 24;

    return Math.floor(
        (jahresende - pickedDate) / millisekundenProTag
    );
}

function berechneWocheImMonat(day) {
    return Math.ceil(day / 7);
}

function berechneTageImMonat(year, month) {
    const ersterTagNaechsterMonat =
        new Date(year, month + 1, 1);

    const ersterTagAktuellerMonat =
        new Date(year, month, 1);

    const millisekundenProTag = 1000 * 60 * 60 * 24;

    return (
        (ersterTagNaechsterMonat - ersterTagAktuellerMonat)
        / millisekundenProTag
    );
}

reloadPage();