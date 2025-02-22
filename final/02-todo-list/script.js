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

/** READ **/
function getMarkupSingleTodoItem(todo) {
    return `<li id="${todo.id}" class="todo-item ${
        todo.isComplete ? "complete" : ""
    }">
        <div class="todo-text" title="Hit Double Click and Complete">${
        todo.text
    }</div>
        <div class="todo-control">
          <button class="todo-controls-edit" data-id="${todo.id}">✏️</button>
          <button class="todo-controls-delete" data-id="${todo.id}">❌</button>
        </div>
      </li>`;
}

function getMarkupTodoItems() {
    let todos = getTodoList();
    return todos.map((todo) => getMarkupSingleTodoItem(todo)).join("");
}

function updateUI() {
    let markUp = getMarkupTodoItems();
    listItems.innerHTML = markUp;
}

updateUI();

/** Update **/

function handlItemEditClick(event) {
    let todoId = parseInt(event.target.dataset.id);
    if (!todoId) {
        setAlertMessage("Todo item id Could not be retrieved");
    }

    let todoItem = getTodoItem(todoId);

    if (!todoItem) {
        setAlertMessage(
            `Todo item with id ${todoId} could not be retrieved from the database`
        );
    }

    todoInput.dataset.todoid = todoId;
    todoInput.value = todoItem.text;
    todoInput.focus();
}

// If all todo items are inside #list-items, use it instead of document
listItems.addEventListener("click", function (event) {
    if (event.target.matches(".todo-controls-edit")) {
        handlItemEditClick(event);
    }
});

/** Create **/

function addOrUpdateTodoList(nextTodo) {
    let result = {
        success: false,
        operation: "", // 'updated' or 'added'
        message: ""
    };

    let todoList = getTodoList(); // Get the current list

    if (nextTodo.id) {
        // Update Existing
        let todoIndex = todoList.findIndex((todo) => todo.id === nextTodo.id);
        if (todoIndex !== -1) {
            todoList[todoIndex].text = nextTodo.text;

            result.success = true;
            result.operation = "updated";
        } else {
            result.message = "Todo item not found.";
        }
    } else {
        // Add New Todo

        // if there is an existing todo with same test, then do not add duplicate.
        let todoIndex = todoList.findIndex((todo) => todo.text === nextTodo.text);
        if (todoIndex !== -1) {
            result.message = "This item is already present in the list!";
        } else {
            //Add new TODO
            nextTodo.id = Date.now(); // Assign a unique ID
            todoList.unshift(nextTodo);
            result.success = true;
            result.operation = "added";
        }
    }

    // Reset the Todo Input field data set
    todoInput.value = "";
    Object.keys(todoInput.dataset).forEach(
        (key) => delete todoInput.dataset[key]
    );

    return result;
}

function handleTodoFormSubmit(event) {
    event.preventDefault();

    if (!todoInput.value) {
        setAlertMessage("Please enter your todo text!", !result.success);
        return;
    }

    let result = addOrUpdateTodoList({
        text: todoInput.value,
        id: parseInt(todoInput.dataset.todoid)
    });

    let message =
        result.message != ""
            ? result.message
            : result.success
                ? `Todo item ${result.operation} successfully!`
                : `Todo item could not be ${result.operation}`;

    updateUI();
    setAlertMessage(message, !result.success);
}

todoForm.addEventListener("submit", handleTodoFormSubmit);

/** DELETE **/

function handlItemDeleteClick(event) {
    let todoId = parseInt(event.target.dataset.id);
    if (!todoId) {
        setAlertMessage("Todo item id Could not be retrieved");
        return;
    }

    console.log('Deleting Todo: ' + todoId)

    let todoItem = getTodoItem(todoId);

    if (!todoItem) {
        setAlertMessage(
            `Todo item with id ${todoId} could not be retrieved from the database`
        );
        return;
    }

    let todoList = getTodoList();

    let todoIndex = todoList.findIndex((todo) => todo.id === todoItem.id);

    if (todoIndex === -1) {
        setAlertMessage(`Todo item with id ${todoId} was not found in the list`);
        return;
    }

    // Remove the item from the array using splice()
    todoList.splice(todoIndex, 1);

    updateUI();

}

// If all todo items are inside #list-items, use it instead of document
listItems.addEventListener("click", function (event) {
    if (event.target.matches(".todo-controls-delete")) {
        handlItemDeleteClick(event);
    }
});


listItems.addEventListener("dblclick", function (event) {
    if (event.target.closest(".todo-item")) {
        event.target.closest(".todo-item").classList.toggle("complete");
    }
});
