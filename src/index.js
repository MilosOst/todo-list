import Todo from "./modules/Todo.js";
import Storage from "./modules/Storage.js";
import Project from "./modules/Project.js";
import Display from "./modules/Display.js";


const toggleMenu = document.querySelector('.menu-toggle');

toggleMenu.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu-open');
})

console.log(Display.loadHomePage());