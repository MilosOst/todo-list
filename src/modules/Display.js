import Storage from "./Storage.js";


export default class Display {

    static loadHomePage() {
        Display.loadProjects();

        const tasksSection = document.querySelector('.tasks-section');
        tasksSection.append(Display.createTodaySection(), Display.createTomorrowSection(), Display.createWeeklySection());

        this.initFormButtons();
        return tasksSection;
    }

    static loadProjects() {
        const projectsBar = document.querySelector('.projects-scrollbar');
        projectsBar.textContent = '';
        const projects = Storage.getTodoList().getProjects();
        projects.forEach(project => {
            projectsBar.appendChild(Display.createProject(project))
        });
    }

    static createProject(project) {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-entry');
        projectElement.innerHTML = `<h5 class='project-name'>${project.name}</h5>`;
        return projectElement;
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

    static initFormButtons() {
        const selectProject = document.querySelector('#select-project');
        const selectTask = document.querySelector('#select-task');

        selectProject.addEventListener('click', Display.toggleForm);
        selectTask.addEventListener('click', Display.toggleForm);

        const openFormBtn = document.querySelector('#add-btn');
        openFormBtn.addEventListener('click', () => {
            Display.loadFormInfo();
            document.querySelector('.add-modal').style.display = 'flex';
        });

        const closeFormBtn = document.querySelector('.close-btn');
        closeFormBtn.addEventListener('click', () => {
            document.querySelector('.add-modal').style.display = 'none';
        });

        const addProjectForm = document.querySelector('#add-project');
        addProjectForm.onsubmit = Display.handleProjectFormSubmit;
    }

    static toggleForm() {
        if (this.classList.contains('selected')) return;
        
        // Check which button was clicked
        if (this.id === 'select-project') {
            this.classList.add('selected');
            document.querySelector('#add-project').style.display = 'flex';
            document.querySelector('#add-task').style.display = 'none';
            document.querySelector('#select-task').classList.remove('selected');
        }
        else if (this.id === 'select-task') {
            this.classList.add('selected');
            document.querySelector('#add-task').style.display = 'flex';
            document.querySelector('#add-project').style.display = 'none';
            document.querySelector('#select-project').classList.remove('selected');
        }
    }

    static loadFormInfo() {
        const projects = Storage.getTodoList().getProjects();
        const projectSelection = document.querySelector('#project-select');
        
        // Reset choices and get updated info
        projectSelection.textContent = '';
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            projectSelection.appendChild(option);
        });
    }

    static handleProjectFormSubmit(e) {
        e.preventDefault();
        const givenName = e.target.querySelector('#project-name').value;
        if (Storage.getTodoList().projectNameTaken(givenName)) {
            const error = document.querySelector('#project-name-error');
            error.textContent = 'Project name is already in use.';
        }
        else {
            Storage.addProject(givenName);
            Display.cleanAddForm();
            document.querySelector('.add-modal').style.display = 'none';
            Display.loadProjects();
        }
    }

    static cleanAddForm() {
        const projectForm = document.querySelector('#add-project');
        const taskForm = document.querySelector('#add-task');
        projectForm.reset();
        taskForm.reset();

        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errMsg => errMsg.textContent = '');
    }


}