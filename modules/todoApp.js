import Store from './localStorage.js';

class TodoApp {
  constructor(todos) {
    this.todos = todos;
  }

    addTaskToArr = (task) => {
      const todoList = this.todos;
      this.todos = [...todoList, task];
    }

    removeTask = (id) => {
      const todoList = this.todos;
      this.todos = todoList.filter(((task) => task.index !== id));
    }

    resetIndex = () => {
      this.todos.forEach((task, index) => {
        task.index = index + 1;
      });
    }

    markAsComplete = (id) => {
      for (let i = 0; i < this.todos.length; i += 1) {
        if (this.todos[i].index === id) {
          if (this.todos[i].completed) {
            this.todos[i].completed = false;
          } else {
            this.todos[i].completed = true;
          }
        }
      }
    }

    deleteCompletedTask = () => {
      this.todos = this.todos.filter((task) => task.completed !== true);
      this.resetIndex(this.todos);
    }
}

const todoApp = new TodoApp(Store.getTask());
export default todoApp;