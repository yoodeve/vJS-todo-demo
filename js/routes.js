class Routes {
  static #instance = null;
  static getInstance() {
    if (this.#instance === null) {
      this.#instance = new Routes();
    }
    return this.#instance;
  }

  routeState = "welcome";
  show() {
    clear();
    switch (this.routeState) {
      case "welcome":
        document
          .querySelector(".welcome-page-container")
          .classList.remove("invisible");
        break;
      case "todolist":
        document
          .querySelector(".todo-page-container")
          .classList.remove("invisible");
        break;
    }
  }
}
function clear() {
  const pages = document.querySelectorAll(".main-container > div");
  const sidebar = document.querySelectorAll("aside > ul > li");
  pages.forEach((page) => {
    page.classList.add("invisible");
  });

  sidebar.forEach(({ classList }) => {
    classList.contains("selected-menu")
      ? classList.remove("selected-menu")
      : classList.add("selected-menu");
  });
}
