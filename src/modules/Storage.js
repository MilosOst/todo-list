import Project from "./Project.js";
import Task from "./Task.js";
import TodoList from "./TodoList.js";

export default class Storage {

    static updateTodoList(todoList) {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    static getTodoList() {
        const todoList = Object.assign(new TodoList(), JSON.parse(localStorage.getItem('todoList')));

        // Update TodoList to contain actual Project Objects
        todoList.setProjects(
            todoList.getProjects()
            .map(project => Object.assign(new Project(), project))
        );

        // Update TodoList projects to contain actual Todo Objects
        todoList.getProjects().forEach(project => project.setTasks(
            project.getTasks()
            .map(task => Object.assign(new Task(), task))
        ));

        return todoList;
    }

    static addProject(projectName) {
        const todoList = Storage.getTodoList();
        todoList.addProject(new Project(projectName));
        Storage.updateTodoList(todoList);
    }

    static removeProject(projectName) {
        const todoList = Storage.getTodoList();
        todoList.removeProject(projectName);
        Storage.updateTodoList(todoList);
    }

    static addTask(task, projectName) {
        const todoList = Storage.getTodoList();
        const project = todoList.getProject(projectName);
        project.addTask(task);
        Storage.updateTodoList(todoList);
    }

    static editTask(taskId, newInfo) {
        const todoList = Storage.getTodoList();
        const task = todoList.getTask(taskId);
        task.updateInfo(...newInfo);
        Storage.updateTodoList(todoList);
    }

    static deleteTask(taskId) {
        const todoList = Storage.getTodoList();
        todoList.deleteTask(taskId);
        Storage.updateTodoList(todoList);
    }

    static getTask(taskId) {
        const todoList = Storage.getTodoList();
        return todoList.getTask(taskId);
    }

    static removeTask(taskId, projectName) {
        const todoList = Storage.getTodoList();
        const project = todoList.getProject(projectName);
        project.removeTask(taskId);
        Storage.updateTodoList(todoList);
    }

    static clearStorage() {
        localStorage.clear();
    }
}