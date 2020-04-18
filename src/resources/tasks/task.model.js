const uuid = require('uuid');

class Task {
  constructor({
    boardId,
    task: {
      id = uuid(),
      title = 'taskTitle',
      order = 0,
      description = 'None',
      userId = null,
      columnId = null
    }
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

class Column {
  constructor({ id = uuid(), title = 'columnTitle', order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = { Column, Task };
