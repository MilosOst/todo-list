export default class TodoList {
    constructor() {
        this.projects = [];
    }

    getProject(projectName) {
        return this.projects.find(project => project.name === project.name);
    }

    getProjects() {
        return this.projects;
    }

    setProjects(projects) {
        this.projects = projects;
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(projectName) {
        const indexOf = this.projects.findIndex(project => project.name === projectName);
        this.projects.splice(indexOf, 1);
    }

    getTodayTasks() {
        const todayTasks = [];
        this.getProjects().forEach(project => todayTasks.push(project.getTodayTasks()));
        return todayTasks;
    }

    getWeeklyTasks() {
        const weeklyTasks = [];
        this.getProjects().forEach(project => weeklyTasks.push(project.getThisWeekTasks()));
        return weeklyTasks;
    }
}