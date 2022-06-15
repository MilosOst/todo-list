(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var s=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===s?new Date(t.getTime()):"number"==typeof t||"[object Number]"===s?new Date(t):("string"!=typeof t&&"[object String]"!==s||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function s(s){e(1,arguments);var o=t(s);return o.setHours(0,0,0,0),o}function o(t,o){e(2,arguments);var r=s(t),a=s(o);return r.getTime()===a.getTime()}function r(t){return e(1,arguments),o(t,Date.now())}function a(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function n(s,o){e(2,arguments);var r=t(s),n=a(o);return isNaN(n)?new Date(NaN):n?(r.setDate(r.getDate()+n),r):r}function c(t){return e(1,arguments),o(t,n(Date.now(),1))}function i(s,o){e(1,arguments);var r=o||{},n=r.locale,c=n&&n.options&&n.options.weekStartsOn,i=null==c?0:a(c),d=null==r.weekStartsOn?i:a(r.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var l=t(s),u=l.getDay(),m=(u<d?7:0)+u-d;return l.setDate(l.getDate()-m),l.setHours(0,0,0,0),l}function d(t,s,o){e(2,arguments);var r=i(t,o),a=i(s,o);return r.getTime()===a.getTime()}class l{constructor(e){this.name=e,this.tasks=[]}addTask(e){this.tasks.push(e)}removeTask(e){const t=this.tasks.findIndex((t=>t.id===e));this.tasks.splice(t,1)}getTasks(){return this.tasks}setTasks(e){this.tasks=e}getTodayTasks(){return this.tasks.filter((e=>r(e.getDate())))}getTomorrowTasks(){return this.tasks.filter((e=>c(e.getDate())))}getThisWeekTasks(){return this.tasks.filter((t=>{const s=t.getDate();return function(t,s){return e(1,arguments),d(t,Date.now(),s)}(s)&&!r(s)&&!c(s)}))}sortTasksByPriority(){this.tasks.sort(((e,t)=>e.priority<t.priority?1:-1))}}var u,m=new Uint8Array(16);function p(){if(!u&&!(u="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return u(m)}const g=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,y=function(e){return"string"==typeof e&&g.test(e)};for(var h=[],k=0;k<256;++k)h.push((k+256).toString(16).substr(1));const T=function(e,t,s){var o=(e=e||{}).random||(e.rng||p)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){s=s||0;for(var r=0;r<16;++r)t[s+r]=o[r];return t}return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=(h[e[t+0]]+h[e[t+1]]+h[e[t+2]]+h[e[t+3]]+"-"+h[e[t+4]]+h[e[t+5]]+"-"+h[e[t+6]]+h[e[t+7]]+"-"+h[e[t+8]]+h[e[t+9]]+"-"+h[e[t+10]]+h[e[t+11]]+h[e[t+12]]+h[e[t+13]]+h[e[t+14]]+h[e[t+15]]).toLowerCase();if(!y(s))throw TypeError("Stringified UUID is invalid");return s}(o)};class f{constructor(e,t,s,o){this.title=e,this.description=t,this.dueDate=s,this.priority=o||0,this.id=T()}updateInfo(e,t,s,o){this.title=e,this.description=t,this.dueDate=s,this.priority=o}getDate(){return new Date(this.dueDate)}}class j{constructor(){this.projects=[]}getProject(e){return this.projects.find((e=>e.name==e.name))}getProjects(){return this.projects}setProjects(e){this.projects=e}addProject(e){this.projects.push(e)}removeProject(e){const t=this.projects.findIndex((t=>t.name===e));this.projects.splice(t,1)}projectNameTaken(e){return this.projects.some((t=>t.name.toLowerCase()===e.toLowerCase()))}getTodayTasks(){const e=[];return this.getProjects().forEach((t=>e.push(...t.getTodayTasks()))),e}getTomorrowTasks(){const e=[];return this.getProjects().forEach((t=>e.push(...t.getTomorrowTasks()))),e}getWeeklyTasks(){const e=[];return this.getProjects().forEach((t=>e.push(...t.getThisWeekTasks()))),e}}class v{static updateTodoList(e){localStorage.setItem("todoList",JSON.stringify(e))}static getTodoList(){const e=Object.assign(new j,JSON.parse(localStorage.getItem("todoList")));return e.setProjects(e.getProjects().map((e=>Object.assign(new l,e)))),e.getProjects().forEach((e=>e.setTasks(e.getTasks().map((e=>Object.assign(new f,e)))))),e}static addProject(e){const t=v.getTodoList();t.addProject(new l(e)),v.updateTodoList(t)}static removeProject(e){const t=v.getTodoList();t.removeProject(e),v.updateTodoList(t)}static addTask(e,t){const s=v.getTodoList();s.getProject(t).addTask(e),v.updateTodoList(s)}static removeTask(e,t){const s=v.getTodoList();s.getProject(t).removeTask(e),v.updateTodoList(s)}}class S{static loadHomePage(){S.loadProjects(),S.loadHomePageTasks(),S.initFormButtons()}static loadProjects(){const e=document.querySelector(".projects-scrollbar");e.textContent="",v.getTodoList().getProjects().forEach((t=>{e.appendChild(S.createProject(t))}))}static loadHomePageTasks(){const e=document.querySelector(".tasks-section");e.textContent="",e.append(S.createSection("today","Today",v.getTodoList().getTodayTasks()),S.createSection("tomorrow","Tomorrow",v.getTodoList().getTomorrowTasks()),S.createSection("weekly","Rest of Week",v.getTodoList().getWeeklyTasks()))}static createProject(e){const t=document.createElement("div");return t.classList.add("project-entry"),t.innerHTML=`<h5 class='project-name'>${e.name}</h5>`,t}static createTodaySection(){const e=document.createElement("div");e.classList.add("today-section"),e.innerHTML='\n        <div class="tasks-header">\n            <h2 class="date-header">Today</h2>\n            <div class="tasks-progress">\n                <p>0/3</p>\n            </div>\n        </div>\n        ';const t=v.getTodoList().getTodayTasks();return e.appendChild(S.createTasks(t)),e}static createTomorrowSection(){const e=document.createElement("div");e.classList.add("tomorrow-section"),e.innerHTML='\n        <div class="tasks-header">\n            <h2 class="date-header">Tomorrow</h2>\n            <div class="tasks-progress">\n                <p>0/3</p>\n            </div>\n        </div>\n        ';const t=v.getTodoList().getTomorrowTasks();return e.appendChild(S.createTasks(t)),e}static createWeeklySection(){const e=document.createElement("div");e.classList.add("weekly-section"),e.innerHTML='\n        <div class="tasks-header">\n        <h2 class="date-header">Rest of Week</h2>\n            <div class="tasks-progress">\n                <p>0/7</p>\n            </div>\n        </div>';const t=v.getTodoList().getWeeklyTasks();return e.appendChild(S.createTasks(t)),e}static createSection(e,t,s){const o=document.createElement("div");return o.classList.add(`${e}-section`),o.innerHTML=`\n        <div class="tasks-header">\n        <h2 class="date-header">${t}</h2>\n            <div class="tasks-progress">\n                <p>0/7</p>\n            </div>\n        </div>`,o.appendChild(S.createTasks(s)),o}static createTasks(e){const t=document.createElement("ul");return t.classList.add("tasks"),e.forEach((e=>{const s=document.createElement("li");s.textContent=e.title,s.dataset.id=e.id,t.appendChild(s)})),t}static initFormButtons(){const e=document.querySelector("#select-project"),t=document.querySelector("#select-task");e.addEventListener("click",S.toggleForm),t.addEventListener("click",S.toggleForm),document.querySelector("#add-btn").addEventListener("click",(()=>{S.loadFormInfo(),document.querySelector(".add-modal").style.display="flex"})),document.querySelector(".close-btn").addEventListener("click",(()=>{document.querySelector(".add-modal").style.display="none"})),document.querySelector("#add-project").onsubmit=S.handleProjectFormSubmit,document.querySelector("#add-task").onsubmit=S.handleTaskFormSubmit}static toggleForm(){this.classList.contains("selected")||("select-project"===this.id?(this.classList.add("selected"),document.querySelector("#add-project").style.display="flex",document.querySelector("#add-task").style.display="none",document.querySelector("#select-task").classList.remove("selected")):"select-task"===this.id&&(this.classList.add("selected"),document.querySelector("#add-task").style.display="flex",document.querySelector("#add-project").style.display="none",document.querySelector("#select-project").classList.remove("selected")))}static loadFormInfo(){const e=v.getTodoList().getProjects(),t=document.querySelector("#project-select");t.textContent="",e.forEach((e=>{const s=document.createElement("option");s.value=e.name,s.textContent=e.name,t.appendChild(s)}))}static handleProjectFormSubmit(e){e.preventDefault();const t=e.target.querySelector("#project-name").value;v.getTodoList().projectNameTaken(t)?document.querySelector("#project-name-error").textContent="Project name is already in use.":(v.addProject(t),S.cleanAddForm(),document.querySelector(".add-modal").style.display="none",S.loadProjects())}static handleTaskFormSubmit(e){e.preventDefault();const t=S.createTaskFromForm(),s=document.querySelector("#project-select").value;v.addTask(t,s),S.cleanAddForm(),document.querySelector(".add-modal").style.display="none",S.loadHomePage()}static cleanAddForm(){const e=document.querySelector("#add-project"),t=document.querySelector("#add-task");e.reset(),t.reset(),document.querySelectorAll(".error-message").forEach((e=>e.textContent=""))}static createTaskFromForm(){return new f(document.querySelector("#task-name").value,document.querySelector("#task-description").value,new Date(document.querySelector("#task-due-date").value+"T00:00:00"),document.querySelector("#task-priority").value)}}document.querySelector(".menu-toggle").addEventListener("click",(()=>{document.querySelector(".menu").classList.toggle("menu-open")})),S.loadHomePage()})();