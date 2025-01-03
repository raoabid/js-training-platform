document.addEventListener("DOMContentLoaded", function () {
    console.log("document loaded");

    const getFieldType = function (element) {
        console.log(element.classList);
        return element.classList.contains("celsius") ? "celsius" : "fahrenheit";
    };

    const roundNumbers = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

    const convertCelsiusToFahrenheit = function (temperature) {
        const fTemp = (temperature * 9) / 5 + 32;
        return roundNumbers(fTemp);
    };

    const convertFahrenheitToCelsius = function (temperature) {
        const cTemp = (temperature - 32) * (5 / 9);
        return roundNumbers(cTemp);
    };

    const inputChangeHandler = function (evt) {
        const field = evt.target;
        const fieldType = getFieldType(field);
        const tempratureContainer = field.parentNode.parentNode;
        let targetField;

        // using conditionals
        if (fieldType === "celsius") {
            targetField = tempratureContainer.querySelector(".fahrenheit");
            targetField.value = convertCelsiusToFahrenheit(field.value);
        } else {
            targetField = tempratureContainer.querySelector(".celsius");
            targetField.value = convertFahrenheitToCelsius(field.value);
        }

        // using tertiary operator
        //     targetField =
        //       fieldType === "celsius"
        //         ? temperatureContainers.querySelector(".fahrenheit")
        //         : temperatureContainers.querySelector(".celsius");

        //     targetField.value =
        //       fieldType === "celsius"
        //         ? convertCelsiusToFahrenheit(field.value)
        //         : convertFahrenheitToCelsius(field.value);
    };

    // Get all temperature containers
    let temperatureContainers = document.querySelectorAll(".temperature-converter");

    // wire up event listeners
    temperatureContainers.forEach((container) => {
        let inputFields = container.querySelectorAll("input");
        inputFields.forEach((inputField) => {
            inputField.addEventListener("change", inputChangeHandler);
        });
    });
});
