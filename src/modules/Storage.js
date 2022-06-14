import Project from "./Project.js";
import Todo from "./Todo.js";
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
            .map(task => Object.assign(new Todo(), task))
        ));

        return todoList;
    }

    static addProject(project) {
        const todoList = Storage.getTodoList();
        todoList.addProject(project);
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

    static removeTask(taskId, projectName) {
        const todoList = Storage.getTodoList();
        const project = todoList.getProject(projectName);
        project.removeTask(taskId);
        Storage.updateTodoList(todoList);
    }
}