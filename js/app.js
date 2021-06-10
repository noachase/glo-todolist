'use strict'

const clear = document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list')
const doneList = document.getElementById('completed')
const input = document.getElementById('input')

const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'

const options = { weekday: 'long', month: 'long', day: 'numeric' }
const today = new Date()

let LIST, id

let data = localStorage.getItem('TODO')

const addToDo = (toDo, id, done, trash) => {

  if (trash) { return }

  const DONE = done ? CHECK : UNCHECK
  const LINE = done ? LINE_THROUGH : ''

  const item = `<li class='item'>
                    <i class='fa ${DONE} co' job='complete' id='${id}'></i>
                    <p class='text ${LINE}'>${toDo}</p>
                    <i class='fa fa-trash-o de' job='delete' id='${id}'></i>
                  </li>
                `

  const positionNotDone = 'beforeend'
  const positionDone = 'beforeend'
  //проверяем при загрузке страницы и сортируем айтемы в правильные списки
  if (done) {
    doneList.insertAdjacentHTML(positionDone, item)
  } else {
    list.insertAdjacentHTML(positionNotDone, item)
  }
}

const loadList = (array) => {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash)
  })
}

if (data) {
  LIST = JSON.parse(data)
  id = LIST.length // ставим айди последнему элементу в списке
  loadList(LIST) // загрузаем список на страницу
} else {
  LIST = []
  id = 0
}

function completeToDo(element) {
  const li = element.parentNode
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)
  if (element.classList.contains(CHECK)) {
    doneList.appendChild(li)
  } else if (element.classList.contains(UNCHECK)) {
    list.appendChild(li)
  }
  LIST[element.id].done = LIST[element.id].done ? false : true
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST[element.id].trash = true
}

clear.addEventListener('click', function () {
  localStorage.clear()
  location.reload()
})

document.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    const toDo = input.value

    if (toDo) {
      addToDo(toDo, id, false, false)

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      })

      localStorage.setItem('TODO', JSON.stringify(LIST))

      id++
    }
    input.value = ''
  }
})

list.addEventListener('click', function (event) {
  const element = event.target
  const elementJob = element.attributes.job.value

  if (elementJob === 'complete') {
    completeToDo(element)
  } else if (elementJob === 'delete') {
    removeToDo(element)
  }

  localStorage.setItem('TODO', JSON.stringify(LIST))
})

doneList.addEventListener('click', function (event) {
  const element = event.target
  const elementJob = element.attributes.job.value
  if (elementJob === 'complete') {
    completeToDo(element)
  } else if (elementJob === 'delete') {
    removeToDo(element)
  }

  localStorage.setItem('TODO', JSON.stringify(LIST))
})

dateElement.innerHTML = today.toLocaleDateString('ru-RU', options)
















