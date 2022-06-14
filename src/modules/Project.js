import { isThisWeek, isToday } from "date-fns";
import Todo from "./Todo.js";

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = []
    }

    addTask(todoObject) {
        this.tasks.push(todoObject);
    }

    removeTask(todoID) {
        const indexOf = this.tasks.findIndex(task => task.id === todoID);
        this.tasks.splice(indexOf, 1);
    }

    getTasks() {
        return this.tasks;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTodayTasks() {
        return this.tasks.filter(task => {
            const taskDate = task.getDate();
            return isToday(taskDate);
        });
    }

    getThisWeekTasks() {
        return this.tasks.filter(task => {
            const taskDate = task.getDate();
            return isThisWeek(taskDate);
        });
    }

    sortTasksByPriority() {
        this.tasks.sort((a, b) => a.priority < b.priority ? 1 : -1);
    }
        
}