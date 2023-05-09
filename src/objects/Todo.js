class Todo {
    constructor(title, description, dueDate, priority, isdone, inList) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.isDone = isdone;
      this.inList = inList;
      this.id = Todo.incrementId()
    }

    static incrementId() {
      if (!this.latestId) this.latestId = 1
      else this.latestId++
      return this.latestId
    }

    toggleDone() {
      this.isDone = !this.isDone;
    }
  
  }
  
  export default Todo;