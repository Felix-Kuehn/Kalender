'use strict'

const date = new Date(); /* constructor, with 'new' we can create many objects out of Date() with the const date */

const day = date.getDate();
const month = date.getMonth(); /* +1 because it counts from 0 onward. So january is 0 */
const year = date.getFullYear();
const weekDay = date.getDay();
const fullDate = date.getDate() + "." + (date.getMonth() +1) + "." + date.getFullYear();
const jahresanfang = new Date(year, 0, 1);
const tagesNummer =
    Math.floor((date - jahresanfang) / (1000 * 60 * 60 * 24)) + 1; /* Math.floor rounds down from a decimal. +1 because it counts the difference between january 1st and august 31th, but january 1st counts itself. The math converts the difference, which is given in milliseconds, into days. */
const jahresende = new Date(year +1, 0, 1); /*We create January 1 of the next year so that the difference represents the days remaining from today until the beginning of the next year.  */
const tageUebrig =
    Math.floor((jahresende - date) / (1000 * 60 * 60 * 24));
const wochentgz = Math.ceil(day/7);
const daysInMonth =
    (new Date(year,month+1,1) - new Date(year,month,1)) / (1000 * 60 * 60 * 24);

console.log(tagesNummer);
console.log(tageUebrig);
console.log(date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0")); /* +1 here because, getMonth counts from 0 onwards, so 0 is January and Dezember is 11. padStart(2, "0") fills the string with 0 from the left until 2 characters are filled, so the time isn´t shown as 13.5 but 13.05. or 13.00*/
console.log(day);
console.log(month); /* Month output "incorrectly" because +1 is not needed with array. So technically right */
console.log(year);
console.log(weekDay);
console.log(wochentgz);
console.log(daysInMonth);


 /*switch (weekDay) {              /* Alternatively, could use an array at defining. wochentag = ['Sonntag','Montag','Dienstag' etc.]*/
    /*case 0:
        wochentag = "Sonntag";
        break;
    case 1:
        wochentag = "Montag";
        break;
    case 2:
        wochentag = "Dienstag";
        break;
    case 3:
        wochentag = "Mittwoch";
        break;
    case 4:
        wochentag = "Donnerstag";
        break;
    case 5:
        wochentag = "Freitag";
        break;
    case 6:
        wochentag = "Samstag";
        break;
}*/

const wochentage = [                /* Did use an array now, more compact an easier once understood. */
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag"
    ,"Freitag",
    "Samstag" 
];

const wochentag = wochentage[weekDay];

console.log(wochentag);

const daycounter = [
    "erste",
    "zweite",
    "dritte",
    "vierte",
    "fünfte"
];

const daycount = daycounter[wochentgz - 1];

console.log(daycount)

/*switch (month) {
    case 1:
        monat = "Januar";
        break;
    case 2:
        monat = "Februar";
        break;
    case 3:
        monat = "März";
        break;
    case 4:
        monat = "April";
        break;
    case 5:
        monat = "Mai";
        break;
    case 6:
        monat = "Juni";
        break;
    case 7:
        monat = "Juli";
        break;
    case 8:
        monat = "August";
        break;
    case 9:
        monat = "September";
        break;
    case 10:
        monat = "Oktober";
        break;
    case 11:
        monat = "November";
        break;
    case 12:
        monat = "Dezember";
        break;
} */

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

const monat = monate[month];

document.getElementById("ueberschrift").textContent =
`Kalenderblatt vom ${fullDate}.`;

document.getElementById("beschreibung").textContent = /* document means it accesses my html elements -> p or h1. .getElementbyId(), is self explanatory, its a method of document. .textContent hints towards the content of the html element.  */
`Der ${day}.${monat} ${year} ist ein ${wochentag} und zwar der ${daycount} ${wochentag} im Monat ${monat} des Jahres ${year}. Es handelt sich um den ${tagesNummer}. Tag des Jahres, was bedeutet,dass es noch ${tageUebrig} Tage bis zum Jahresende sind. Der Monat ${monat} hat insgesamt ${daysInMonth} Tage. Heute ist kein gesetzlicher Feiertag in Deutschland.`;

const tabelle = document.getElementById("tabelle");

const caption = tabelle.createCaption();
caption.textContent = `${monat} ${year}`;

const kopfzeile = tabelle.insertRow();

const wtage = [
    "Mo","Di","Mi","Do","Fr","Sa","So"
];

for (let i=0; i< 7; i++) {
    const zelle = kopfzeile.insertCell();
    zelle.textContent = wtage[i];
};

const ersterTag = new Date(year, month, 1);
let startTag = ersterTag.getDay();

console.log(startTag);
console.log(ersterTag);

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