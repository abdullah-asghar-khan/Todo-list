export default class Task {
  constructor(description = '', todos) {
    this.description = description;
    this.completed = false;
    this.index = todos.length + 1;
  }
}