const modal = document.querySelector('.modal');
const openModal = () => {
  modal.classList.remove("invisible");
};
const closeModal = () => {
  modal.classList.add("invisible");
  modal.innerHTML = "";
}

const modifySubmitButtonOnclick = (id) => {
  const newTodoContent = document.querySelector('.modal-main .text-input').value;
  const todo = todoListService.getInstance().getTodoById(id);
  const todoObj = {...todo, todoContent: newTodoContent};
  if(todo.todoContent === newTodoContent || !newTodoContent) {
    return;
  }
  todoListService.getInstance().setTodo(todoObj);
}

const modifyModal = (todo) => {
  const modal = document.querySelector('.modal');
  modal.innerHTML = `
          <div class="modal-container">
          
            <header class="modal-header">
              <h1 class="modal-title">To-do 수정</h1>
            </header>
            <main class="modal-main">
              <p class="modal-message">TODo를 수정해주세요</p>
              <input
                type="text"
                class="text-input"
                value=${todo.todoContent}
              />
            </main>
            <footer class="modal-footer">
              <button class="btn" onclick="modifySubmitButtonOnclick(${todo.id}); closeModal();">Confirm</button>
              <button class="btn" onclick="closeModal();">Close</button>
            </footer>
          </div>`;
}