import {v4 as uuidv4} from 'uuid';

export default class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority ? priority : 0; // Set to 0 if empty string is passed in
        this.isCompleted = false;
        this.id = uuidv4();
    }

    updateInfo(title, description, dueDate, priority, isCompleted) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = isCompleted;
    }

    getDate() {
        return new Date(this.dueDate);
    }

    getFormattedDate() {
        return new Date(this.dueDate).toDateString();
    }

    getFormFormatDate() {
        return this.getDate().toISOString().split('T')[0];
    }
}
