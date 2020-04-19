const mongoose = require('mongoose');
const uuid = require('uuid');

// class Task {
//   constructor({
//     boardId,
//     task: {
//       id = uuid(),
//       title = 'taskTitle',
//       order = 0,
//       description = 'None',
//       userId = null,
//       columnId = null
//     }
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }
//
// class Column {
//   constructor({ id = uuid(), title = 'columnTitle', order } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//   }
// }

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      default: uuid
    },
    boardId: {
      type: String,
      default: uuid
    },
    columnId: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
