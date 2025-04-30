document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage
    loadTasks();

    addTaskBtn.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return alert("Please enter a task!");

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);

        saveTasks();
        taskInput.value = "";
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskSpan.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("actions");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        editBtn.addEventListener("click", () => editTask(taskSpan));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(actionsDiv);

        return li;
    }

    function editTask(taskSpan) {
        const newTaskText = prompt("Edit your task:", taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskSpan.textContent = newTaskText.trim();
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach((li) => {
            tasks.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(({ text, completed }) => {
            const taskItem = createTaskElement(text);
            if (completed) taskItem.classList.add("completed");
            taskList.appendChild(taskItem);
        });
    }
});
