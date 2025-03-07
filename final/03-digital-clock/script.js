const MONTHS_INDEX = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const WEEKDAYS_INDEX = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

function padStart(num, lengt = 2, suffix = "0") {
    let numStr = num.toString();
    while (numStr.length < lengt) {
        numStr = suffix + numStr;
    }
    return numStr;
}

function getFormattedTime() {
    let time = new Date();

    // Uncomment to get a specific date
    // let time = new Date(1985, 04, 22, 10, 33, 30, 0);
    // let time = new Date(1985, 11, 02, 15, 59, 30, 0);

    if (!time) {
        return;
    }

    let hours = time.getHours();
    hours = hours % 12;
    if(hours === 0) {
        hours = 12;
    }

    const ampm = time.getHours() < 12 ? "am" : "pm";

    const formattedTime = {
        year: time.getFullYear(),
        monthName: MONTHS_INDEX[time.getMonth()],
        dayNumber: padStart(time.getDate(), 2, "0"),
        dayName: WEEKDAYS_INDEX[time.getDay()],
        hours: padStart(hours, 2, "0"),
        minutes: padStart(time.getMinutes(), 2, "0"),
        seconds: padStart(time.getSeconds(), 2, "0"),
        ampm: ampm.toUpperCase()
    };

    return formattedTime;
}

function digitalClock() {
    let formattedTime = getFormattedTime();
    console.log(formattedTime);
    for (const property in formattedTime) {
        let elem = document.querySelector(`.${property}`);
        if (elem) {
            elem.innerText = formattedTime[property];
        } else {
            console.log(`Could not find the element with class ${property}`);
        }
    }
}

const updateClock = setInterval(digitalClock, 1000);
