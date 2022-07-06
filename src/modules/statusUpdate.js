import todoApp from './todoApp.js';
import Store from './localStorage.js';

const toggleCompleted = (e) => {
  const checkbox = e.target;
  const leftAlign = checkbox.parentElement.parentElement;
  const idLength = checkbox.id.length;
  const id = Number(checkbox.id[idLength - 1]);
  if (checkbox.checked) {
    todoApp.markAsComplete(id);
    Store.toggleMarkAsComplete(id);
    leftAlign.querySelector('.description').style.textDecoration = 'line-through';
  } else {
    todoApp.markAsComplete(id);
    Store.toggleMarkAsComplete(id);
    leftAlign.querySelector('.description').style.textDecoration = '';
  }
};

const updateStrikeThroughOnLoad = (checkboxes) => {
  const desc = document.querySelectorAll('.description');
  const tasks = todoApp.todos;
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].completed) {
      checkboxes[i].checked = true;
      desc[i].style.textDecoration = 'line-through';
    }
  }
};

const addCheckboxEvent = () => {
  const checkboxes = document.querySelectorAll('.checkbox');
  updateStrikeThroughOnLoad(checkboxes);

  for (let i = 0; i < checkboxes.length; i += 1) {
    checkboxes[i].addEventListener('change', toggleCompleted);
  }
};

export default addCheckboxEvent;