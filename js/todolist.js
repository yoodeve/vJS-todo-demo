const addTodoBtnOnclick = () => {
  generateTodoObj();
};

const addTodoOnchange = (event) => {
  if (event.keyCode === 13) {
    generateTodoObj();
    document.querySelector(".input-wrapper .text-input").value = "";
  }
};
const checkedOnchange = (target) => {
  todoListService.getInstance().setCompleteStatus(target.value, target.checked);
};

const deleteTodoOnclick = ({ value }) => {
  todoListService.getInstance().removeTodo(value);
};

const modifyModalOnclickOpen = (target) => {
  openModal();
  modifyModal(todoListService.getInstance().getTodoById(target.value));
};

const generateTodoObj = () => {
  const todoContent = document.querySelector(
    ".input-wrapper .text-input"
  ).value;
  const todoObj = {
    id: 0,
    todoContent,
    createDate: DateUtills.toStringByFormatting(new Date()),
    completeStatus: false,
  };
  todoListService.getInstance().addTodo(todoObj);
};

class todoListService {
  static #instance = null;
  static getInstance() {
    if (this.#instance === null) {
      this.#instance = new todoListService();
    }
    return this.#instance;
  }
  todoList = new Array();
  todoindex = 1;

  constructor() {
    this.loadTodoList();
  }

  loadTodoList() {
    this.todoList = !!localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : new Array();
    this.todoindex = !!this.todoList[this.todoList.length - 1]?.id
      ? this.todoList[this.todoList.length - 1].id + 1
      : 1;
  }

  saveLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }

  getTodoById(id) {
    console.log(id)
    return this.todoList.filter((todo) => {
      return todo.id === parseInt(id);
    })[0];
  }

  addTodo(todoObj) {
    this.todoindex++;
    const todo = {
      ...todoObj,
      id: this.todoindex,
    };
    this.todoList.push(todo);
    this.updateTodoList();
    document.querySelector(".text-input").value = "";
    this.saveLocalStorage();
  }

  updateTodoList() {
    const todolistMainContainer = document.querySelector(
      ".todolist-main-container"
    );
    todolistMainContainer.innerHTML = "";
    this.todoList?.map((todo) => {
      todolistMainContainer.innerHTML += `
              <li class="todolist-item">
                <div class="item-left">
                  <input
                    ${todo.completeStatus ? "checked" : ""}
                    onchange="checkedOnchange(this);"
                    value=${todo.id}
                    type="checkbox"
                    id="complete-chkbx${todo.id}"
                    class="complete-chkbxs"
                  />
                  <label for="complete-chkbx${todo.id}"></label>
                </div>
                <div class="item-center">
                  <pre class="todolist-content">${todo.todoContent}</pre>
                </div>
                <div class="item-right">
                  <p class="todolist-date">${todo.createDate}</p>
                  <div class="todolist-button-wrapper">
                    <button class="btn btn-edit" onclick="modifyModalOnclickOpen(this);" value=${
                      todo.id
                    }>수정</button>
                    <button class="btn btn-remove" onclick="deleteTodoOnclick(this);" value=${
                      todo.id
                    }>삭제</button>
                  </div>
                </div>
              </li>`;
    });
  }

  setCompleteStatus(id, status) {
    console.log(id, status);
    this.todoList.forEach((todo, idx) => {
      if (todo.id === parseInt(id)) {
        this.todoList[idx].completeStatus = status;
      }
      this.saveLocalStorage();
    });
  }

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => {
      return todo.id !== parseInt(id);
    });
    this.updateTodoList();
    this.saveLocalStorage();
  }
  setTodo(todoObj) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].id === todoObj.id) {
        this.todoList[i] = todoObj;
        break;
      }
    }
    this.saveLocalStorage();
    this.updateTodoList();
  }
}
