import Storage from "./Storage.js";


export default class DisplayController {

    static loadHomePage() {

    }

    static loadTodayTasks() {
        const todoList = Storage.getTodoList();
        const todayTasks = [];
        for (let project of todoList.getProjects()) {
            todayTasks.concat(project.getTodayTasks());
        }

        const todaySection = document.createElement('div');
        todaySection.classList.add('today-section');
        todaySection.innerHTML = `
        <div class="tasks-header">
            <h2 class="date-header">Today</h2>
            <div class="tasks-progress">
                <p>0/3</p>
            </div>
        </div>
        <ul class="tasks">
            <li>Print Boarding Passes</li>
            <li>Water Plants</li>
            <li>Pay Rent</li>
        </ul>
        `;      
    }

    static createTodayTasks() {
        const todoList = Storage.getTodoList();
        const todayTasks = todoList.getTodayTasks();
        const tasksSection = document.createElement('ul');
        tasksSection.classList.add('tasks');

        todayTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            tasksSection.appendChild(li);
        })

        return tasksSection();
    }
}