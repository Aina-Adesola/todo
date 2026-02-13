function saveInput() {
    let titleInput = document.getElementById("eventTitle");
    let descInput = document.getElementById("eventDescription");
    let errorTitle = document.getElementById("error-title");
    let errorDesc = document.getElementById("error-desc");

    errorTitle.innerHTML = "";
    errorDesc.innerHTML = "";
    let isValid = true;

    // TITLE VALIDATION
    const titleValue = titleInput.value.trim();
    if (titleValue === "") {
        errorTitle.innerHTML = "Title is required";
        isValid = false;
    } else if (titleValue.length < 3) {
        errorTitle.innerHTML = "Title must be at least 3 characters";
        isValid = false;
    } else if (titleValue.length > 22) {
        errorTitle.innerHTML = "Title cannot exceed 22 characters";
        isValid = false;
    }

    // DESCRIPTION VALIDATION
    const descValue = descInput.value.trim();
    if (descValue === "") {
        errorDesc.innerHTML = "Description is required";
        isValid = false;
    } else if (descValue.length < 3) {
        errorDesc.innerHTML = "Description must be at least 3 characters";
        isValid = false;
    } else if (descValue.length > 902) {
        errorDesc.innerHTML = "Description cannot exceed 902 characters";
        isValid = false;
    }

    if (!isValid) return;

    // ... save logic continues below ...
    let newTask = { title: titleValue, description: descValue };
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('myTasks', JSON.stringify(tasks));

    titleInput.value = '';
    descInput.value = '';
    displayTasks();
}


function displayTasks() {
    const taskContainer = document.getElementById('tasks-container');
    
    // 1. Get the tasks from storage
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    // 2. Wipe the container clean to start fresh
    taskContainer.innerHTML = '';

    // 3. Loop through and build each card
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        
        // This line links the card to the 'task-card' style in your CSS
        taskDiv.className = 'task-card';

        // We use a helper div 'task-info' to keep text on the left 
        // and the delete button on the right
        taskDiv.innerHTML = `
            <div class="task-info">
                <strong>${task.title}</strong>
                <p>${task.description}</p>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">
               ✕
            </button>
        `;
        
        taskContainer.appendChild(taskDiv);
    });
}


function deleteTask(index) {
    // 1. Get the current list from storage
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    // 2. Remove 1 item at the specific index
    // .splice(index, howMany)
    tasks.splice(index, 1);

    // 3. Save the updated list back to localStorage
    localStorage.setItem('myTasks', JSON.stringify(tasks));

    // 4. Refresh the screen to show the item is gone
    displayTasks();
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('myTasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// 4. Run this when the page first loads so old tasks appear immediately
window.onload = displayTasks;

function clearAll() {
    localStorage.clear();
    displayTasks(); // Fixed function name from showTasks to displayTasks
}