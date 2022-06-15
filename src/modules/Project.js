import { isPast, isThisWeek, isToday, isTomorrow } from "date-fns";
import Task from "./Task.js";

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = []
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskID) {
        const indexOf = this.tasks.findIndex(task => task.id === taskID);
        this.tasks.splice(indexOf, 1);
    }

    getTasks() {
        return this.tasks;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTodayTasks() {
        return this.tasks.filter(task => isToday(task.getDate()));
    }

    getTomorrowTasks() {
        return this.tasks.filter(task => isTomorrow(task.getDate()));
    }

    getThisWeekTasks() {
        return this.tasks.filter(task => {
            const taskDate = task.getDate();
            return isThisWeek(taskDate) && !(isToday(taskDate) || isTomorrow(taskDate) || isPast(taskDate));
        });
    }

    getRemainingTasks() {
        return this.tasks.filter(task => {
            const taskDate = task.getDate();
            return (isPast(taskDate) && !isToday(taskDate)) || !(isTomorrow(taskDate) || isThisWeek(taskDate));
        })
    }

    sortTasksByPriority() {
        this.tasks.sort((a, b) => a.priority < b.priority ? 1 : -1);
    }
        
}