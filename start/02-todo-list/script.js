// start/02-todo-list/script.js
// Add your start project scripts here
console.log("start/02-todo-list/script.js Loaded");

const todoInput = document.getElementById("todoText");
const todoAlert = document.getElementById("alert-message");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("add-todo-item");
const todoForm = document.getElementById("todo-form");

// Example for working:
const todoListExample = [
    {
        id: 1,
        text: "Example TODO, edit or delete it",
        isComplete: false
    },
    {
        id: 2,
        text: "Example TODO completed, edit or delete it",
        isComplete: true
    }
];

function setAlertMessage(message, isError = false) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    if (isError) {
        todoAlert.classList.add("error");
    }
    setTimeout(() => {
        todoAlert.classList.add("toggleMe");
    }, 1000);
}

setAlertMessage("Ready to Take input!");

function getTodoList() {
    /** We Can use LocalStorage here or anything like that */
    return todoListExample;
}

function getTodoItem(id) {
    return getTodoList().find((todo) => todo.id === parseInt(id));
}

function setTodoItems(updatedToDoList) {
    let existingList = getTodoList();
    existingList.length = 0; // Clear the existing array
    existingList.push(...updatedToDoList); // Push new items

}

/** Your Javascript Goes Here */
