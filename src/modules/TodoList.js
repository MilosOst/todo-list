export default class TodoList {
    constructor() {
        this.projects = [];
    }

    getProject(projectName) {
        return this.projects.find(project => project.name === projectName);
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

    projectNameTaken(name) {
        return this.projects.some(project => project.name.toLowerCase() === name.toLowerCase());
    }

    getTask(taskId) {
        for (let project of this.getProjects()) {
            for (let task of project.getTasks()) {
                if (task.id === taskId) return task;
            }
        }
    }

    getTodayTasks() {
        const todayTasks = [];
        this.getProjects().forEach(project => todayTasks.push(...project.getTodayTasks()));
        return todayTasks;
    }

    getTomorrowTasks() {
        const tomorrowTasks = [];
        this.getProjects().forEach(project => tomorrowTasks.push(...project.getTomorrowTasks()));
        return tomorrowTasks;
    }

    getWeeklyTasks() {
        const weeklyTasks = [];
        this.getProjects().forEach(project => weeklyTasks.push(...project.getThisWeekTasks()));
        return weeklyTasks;
    }

    getRemainingTasks() {
        const remainingTasks = [];
        this.getProjects().forEach(project => remainingTasks.push(...project.getRemainingTasks()));
        return remainingTasks;
    }
}