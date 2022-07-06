import todoApp from './modules/todoApp.js';
import Task from './modules/task.js';
import Store from './modules/localStorage.js';
import addCheckboxEvent from './modules/statusUpdate.js';
import displayItems from './modules/displayTask.js';
import './style.css';

// event
// Display TodoList
displayItems();

// Edit and Delete task event
const editEl = (e) => {
  const moreIcon = e.target;
  const todoWrap = moreIcon.parentElement.parentElement;
  const moreIconWrapper = moreIcon.parentElement;
  const descWrapper = todoWrap.firstElementChild.lastElementChild;
  const desc = descWrapper.querySelector('.description');

  const deleteIcon = document.createElement('div');
  deleteIcon.innerHTML = '<ion-icon class=\'ionic delete-icon\' name="trash-outline"></ion-icon>';
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.classList.add('edit-input');
  inputEl.value = desc.textContent;

  // hide description and moreIcon
  desc.classList.toggle('none');
  moreIcon.classList.toggle('none');
  // Append delete and input element for edit
  moreIconWrapper.appendChild(deleteIcon);
  descWrapper.appendChild(inputEl);
  todoWrap.style.backgroundColor = '#f6f6c8';
  inputEl.focus(); // Initiate focus

  const idLength = todoWrap.id.length;
  const taskId = Number(todoWrap.id[idLength - 1]);

  inputEl.addEventListener('keyup', (e) => {
    e.stopPropagation();
    const code = e.keyCode || e.code || e.key;
    if (code === 13) {
      const input = e.target;
      desc.textContent = input.value;
      desc.classList.toggle('none');
      moreIcon.classList.toggle('none');
      todoWrap.style.backgroundColor = '';
      Store.editTaskLocalStore(taskId, input.value);
      deleteIcon.remove();
      input.remove();
    }
  });

  deleteIcon.addEventListener('click', () => {
    const listContainer = document.querySelector('.todo-list-holder');
    todoApp.removeTask(taskId);
    while (listContainer.firstChild) { // Remove all task in the list
      listContainer.removeChild(listContainer.firstChild);
    }
    /* eslint-disable no-use-before-define */
    displayItems(); // insert all task including the new task
    moreIconEvent();
    addCheckboxEvent();
    Store.removeTask(taskId);
  });
};

const moreIconEvent = () => {
  const moreIcon = document.querySelectorAll('.more-icon');
  const moreIconArr = Array.from(moreIcon);
  moreIconArr.forEach((icon) => {
    icon.addEventListener('click', editEl);
  });
};

moreIconEvent();

// checkbox events
addCheckboxEvent();

// Add task event
const AddTaskInput = document.querySelector('#add-task-input');
AddTaskInput.addEventListener('change', (e) => {
  const inputEl = e.target;
  const newTask = new Task(inputEl.value, todoApp.todos);

  if (inputEl.value !== '') {
    const listContainer = document.querySelector('.todo-list-holder');
    todoApp.addTaskToArr(newTask);

    while (listContainer.firstChild) { // Remove all task in the list
      listContainer.removeChild(listContainer.firstChild);
    }
    displayItems(); // insert all task including the new task
    moreIconEvent();
    addCheckboxEvent();
    Store.setTask(newTask);
    AddTaskInput.value = '';
  }
});

document.querySelector('.clear-all-btn').addEventListener('click', () => {
  todoApp.deleteCompletedTask();
  Store.deleteCompletedTask();
  const listContainer = document.querySelector('.todo-list-holder');
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  displayItems();
  moreIconEvent();
  addCheckboxEvent();
});