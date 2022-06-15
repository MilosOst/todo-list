import {v4 as uuidv4} from 'uuid';

export default class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority ? priority : 0; // Set to 0 if empty string is passed in
        this.id = uuidv4();
    }

    updateInfo(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getDate() {
        return new Date(this.dueDate);
    }
}
