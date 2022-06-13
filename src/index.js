const toggleMenu = document.querySelector('.menu-toggle');

toggleMenu.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('menu-open');
})