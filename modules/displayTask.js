import todoApp from './todoApp.js';
import todoCard from './todoCard.js';

const displayItems = () => {
  const listContainer = document.querySelector('.todo-list-holder');
  todoApp.todos.forEach((todo) => {
    listContainer.appendChild(todoCard(todo));
  });
};

export default displayItems;