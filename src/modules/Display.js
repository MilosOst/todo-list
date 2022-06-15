import { isPast, isToday } from "date-fns";
import Storage from "./Storage.js";
import Task from "./Task.js";


export default class Display {

    static loadHomePage() {
        Display.loadProjects();
        Display.loadHomePageTasks();
        Display.initMenuButtons();
        Display.initFormButtons();
    }

    static loadProjects() {
        const projectsBar = document.querySelector('.projects-scrollbar');
        projectsBar.textContent = '';
        const projects = Storage.getTodoList().getProjects();
        projects.forEach(project => {
            projectsBar.appendChild(Display.createProject(project))
        });
    }

    static loadHomePageTasks() {
        const taskSection = document.querySelector('.tasks-section');
        taskSection.dataset.project = 'home';
        taskSection.textContent = '';
        taskSection.append(
            Display.createSection('today', 'Today', Storage.getTodoList().getTodayTasks()),
            Display.createSection('tomorrow', 'Tomorrow', Storage.getTodoList().getTomorrowTasks()),
            Display.createSection('weekly', 'Rest of Week', Storage.getTodoList().getWeeklyTasks()),
            Display.createSection('remaining', 'Remaining', Storage.getTodoList().getRemainingTasks()),
        );
    }

    static loadProject(projectName) {
        const project = Storage.getTodoList().getProject(projectName);
        const taskSection = document.querySelector('.tasks-section');
        taskSection.dataset.project = projectName;
        taskSection.textContent = '';
        taskSection.append(
            Display.createSection('today', 'Today', project.getTodayTasks()),
            Display.createSection('tomorrow', 'Tomorrow', project.getTomorrowTasks()),
            Display.createSection('weekly', 'Rest of Week', project.getThisWeekTasks()),
            Display.createSection('remaining', 'Remaining', project.getRemainingTasks()),
        );
    }

    static createProject(project) {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-entry');
        projectElement.dataset.name = project.name;
        projectElement.innerHTML = `<h5 class='project-name'>${project.name}</h5>`;
        projectElement.addEventListener('click', (e) => {
            const projectName = e.target.dataset.name;
            Display.loadProject(projectName);
        });
        return projectElement;
    }

    static createSection(name, header, taskList) {
        const section = document.createElement('div');
        section.classList.add(`${name}-section`);

        const tasksDone = taskList.reduce((a, b) => a + b.isCompleted, 0);
        section.innerHTML = `
        <div class="tasks-header">
        <h2 class="date-header">${header}</h2>
            <div class="tasks-progress">
                <p>${tasksDone}/${taskList.length}</p>
            </div>
        </div>`;
        section.appendChild(Display.createTasks(taskList));
        return section;
    }

    static createTasks(taskList) {
        const tasksSection = document.createElement('ul');
        tasksSection.classList.add('tasks');

        taskList.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="info">
                <h5 class='task-name'>${task.title}</h5>
                <div class='due-date-section'>
                    <img src='./imgs/calendar.svg'>
                    <span class='due-date'>${task.getFormattedDate()}</span>
                </div>
            </div>
            <div class='btns'>
                <img class='edit-btn' src='./imgs/more-horizontal.svg'>
            </div>
            `
            if (isPast(task.getDate()) && !isToday(task.getDate())) {
                li.querySelector('.due-date').classList.add('expired');
            }
            li.dataset.id = task.id;
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

        const addTaskForm = document.querySelector('#add-task');
        addTaskForm.onsubmit = Display.handleTaskFormSubmit;
    }

    static initMenuButtons() {
        const homeBtn = document.querySelector('#home-btn');
        homeBtn.addEventListener('click', Display.loadHomePageTasks);
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

    static handleTaskFormSubmit(e) {
        e.preventDefault();
        const task = Display.createTaskFromForm();
        const projectName = document.querySelector('#project-select').value;
        Storage.addTask(task, projectName);
        Display.cleanAddForm();
        document.querySelector('.add-modal').style.display = 'none';

        // Check which project is currently active
        const currProject = document.querySelector('.tasks-section').dataset.project;
        currProject === 'home' ? Display.loadHomePageTasks() : Display.loadProject(currProject);

    }

    static cleanAddForm() {
        const projectForm = document.querySelector('#add-project');
        const taskForm = document.querySelector('#add-task');
        projectForm.reset();
        taskForm.reset();

        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errMsg => errMsg.textContent = '');
    }

    static createTaskFromForm() {
        return new Task(
            document.querySelector('#task-name').value,
            document.querySelector('#task-description').value,
            new Date(document.querySelector('#task-due-date').value + 'T00:00:00'),
            document.querySelector('#task-priority').value,
        );
    }


}