const tasks = [
    { id: 1, completed: false, text: 'Посмотреть новый урок по JavaScript' },
    { id: 2, completed: false, text: 'Выполнить тест после урока' },
    { id: 3, completed: false, text: 'Выполнить ДЗ после урока' }
]

function createTask (parent, task) {
    let HTMLForTask = `
    <div class="task-item" data-task-id="${task.id}">
    <div class="task-item__main-container">
    <div class="task-item__main-content">
        <form class="checkbox-form">
            <input class="checkbox-form__checkbox" type="checkbox" id="${task.id}">
            <label for="${task.id}"></label>
        </form>
        <span class="task-item__text">${task.text}</span>
    </div>
    <button class="task-item__delete-button default-button 
     delete-button" data-delete-task-id="5">Удалить</button>
    </div>
    </div>`;
    
    parent.insertAdjacentHTML("beforeend",HTMLForTask)
}

for (let task of tasks) {
    createTask(document.querySelector(".tasks-list"), task)
} // добавление задач в DOM

const createTaskBlock = document.querySelector('.create-task-block') // это форма с кнопкой и полем
let newId = 3 // это счетчик Id
let span = document.createElement("span");
span.className = "error-message-block" // блок с ошибкой

createTaskBlock.addEventListener('submit', (event) => {
    event.preventDefault()
    const { target } = event
    const { taskName } = target // это поле для ввода
    const { value } = taskName // то что вводится
    
    
    let check = tasks.some(e => e.text === value)

    if(!check && value) {
        let task = {
        id: newId,
        completed: false,
        text: value,
    } 

    tasks.push(task)
    
    createTask(document.querySelector(".tasks-list"), task)
    newId ++
    console.log(tasks)
    span.remove()

    } else if(check){
        span.textContent = 'Задача с таким названием уже существует.'
        target.append(span)
    } else {
        span.textContent = 'Название задачи не должно быть пустым'
        target.append(span)
    }
    

})

console.log(tasks)

// _________________________________Удаление

const taskList = document.querySelector('.tasks-list') // родитель
const body = document.querySelector('body')
console.log(body)

function giveDeleteString(parent) {
    let deleteStr = `  
    <div class="modal-overlay modal-overlay_hidden">
    <div class="delete-modal">
        <h3 class="delete-modal__question">
            Вы действительно хотите удалить эту задачу?
        </h3>
        <div class="delete-modal__buttons">
            <button class="delete-modal__button delete-modal__cancel-button">
                Отмена
            </button>
            <button class="delete-modal__button delete-modal__confirm-button">
                Удалить
            </button>
        </div>
    </div>
    </div>`  

    parent.insertAdjacentHTML("beforeend", deleteStr)
}

giveDeleteString(document.body) // модальное окно по мооим подсчетам в body

document.addEventListener('click', (event) => {  
    const { target } = event
    console.log(target)
    
    if (target.classList.contains('task-item__delete-button')) {
        body.classList.remove('modal-overlay_hidden') //почему-то не удаляется, и если заменить на тогл то просто всё белое
        console.log('obo')
    }
})







