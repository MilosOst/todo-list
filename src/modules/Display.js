import Storage from "./Storage.js";


export default class Display {

    static loadHomePage() {
        const tasksSection = document.createElement('div');
        tasksSection.classList.add('tasks-section');
        tasksSection.append(Display.createTodaySection(), Display.createTomorrowSection(), Display.createWeeklySection());

        document.body.appendChild(tasksSection);
        return tasksSection;
    }

    static createTodaySection() {
        const todaySection = document.createElement('div');
        todaySection.classList.add('today-section');
        todaySection.innerHTML = `
        <div class="tasks-header">
            <h2 class="date-header">Today</h2>
            <div class="tasks-progress">
                <p>0/3</p>
            </div>
        </div>
        `;

        todaySection.appendChild(this.createTodayTasks());
        return todaySection;
    }

    static createTodayTasks() {
        const todayTasks = Storage.getTodoList().getTodayTasks();
        const tasksSection = document.createElement('ul');
        tasksSection.classList.add('tasks');

        todayTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            tasksSection.appendChild(li);
        })
        return tasksSection;
    }

    static createTomorrowSection() {
        const tomorrowSection = document.createElement('div');
        tomorrowSection.classList.add('tomorrow-section');
        tomorrowSection.innerHTML = `
        <div class="tasks-header">
            <h2 class="date-header">Tomorrow</h2>
            <div class="tasks-progress">
                <p>0/3</p>
            </div>
        </div>
        `;
        
        tomorrowSection.appendChild(this.createTomorrowTasks());
        return tomorrowSection;
        
    }

    static createTomorrowTasks() {
        const tomorrowTasks = Storage.getTodoList().getTomorrowTasks();
        const tasksSection = document.createElement('ul');
        tasksSection.classList.add('tasks');

        tomorrowTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            tasksSection.appendChild(li);
        })
        return tasksSection;
    }

    static createWeeklySection() {
        const weeklySection = document.createElement('div');
        weeklySection.classList.add('weekly-section');
        weeklySection.innerHTML = `
        <div class="tasks-header">
        <h2 class="date-header">Rest of Week</h2>
            <div class="tasks-progress">
                <p>0/7</p>
            </div>
        </div>`;

        weeklySection.appendChild(this.createWeeklyTasks());
        return weeklySection;
    }

    static createWeeklyTasks() {
        const weeklyTasks = Storage.getTodoList().getWeeklyTasks();
        const tasksSection = document.createElement('ul');
        tasksSection.classList.add('tasks');

        weeklyTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            tasksSection.appendChild(li);
        })
        return tasksSection;
    }
}