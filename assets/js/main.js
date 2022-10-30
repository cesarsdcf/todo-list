
const c = el => document.querySelector(el);

const inputTask = c('.new-task');
const btnTask = c('.btn-new-task');
const tasks = c('.tasks');
const clear = c('.clear');

function createLi() {
    const li = document.createElement('li');
    return li;
}

function criateTask(task) {
    const li = createLi();
    li.innerText = task;
    tasks.appendChild(li);
    clearInput();
    createBtn(li);
    saveTasks();
}

function clearInput(){
    inputTask.value = '';
}

function createBtn(li){
    li.innerText += ' ';
    const btn = document.createElement('button');
    btn.innerText += 'Apagar';
    btn.setAttribute('class', 'clear');
    li.appendChild(btn);
}

function saveTasks(){
    const tasks = document.querySelectorAll('li');
    const arrayTasks = [];

    for (let task of tasks){
       let text = task.innerText
       text = text.replace('Apagar', '').trim()
        arrayTasks.push(text)
    }

    let jsonTask = JSON.stringify(arrayTasks);
    localStorage.setItem('task', jsonTask);

}

btnTask.addEventListener('click', function (){
    if(!inputTask.value) return
    criateTask(inputTask.value);

})

inputTask.addEventListener('keypress', e => {
  if(e.charCode === 13){
    if(!inputTask.value) return
    criateTask(inputTask.value);
  }
});

document.addEventListener('click', (e) => {
    const el = e.target
    if(el.classList.contains('clear')){
        el.parentElement.remove();
        saveTasks()
    }
})

function taskSaves(){
    const tasks = localStorage.getItem('task');
    const list = JSON.parse(tasks);

    for (let i of list){
        criateTask(i);
    }
}

taskSaves()




