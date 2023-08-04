const onSideOpen = (target) => {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggleBtn = document.querySelector(".sidebar-toggle-button");
  if (sidebar.classList.contains("sidebar-open")) {
    sidebar.classList.remove("sidebar-open");
    sidebarToggleBtn.innerHTML = "▶";
  } else {
    sidebar.classList.add("sidebar-open");
    sidebarToggleBtn.innerHTML = "◀";
  }
};

const sidebarMenuOnclick = (target) => {
  console.log(target.innerText);
  switch (target.innerText) {
    case "시작하기":
      Routes.getInstance().routeState = "welcome";
      break;
    case "TODO-LIST":
      Routes.getInstance().routeState = "todolist";
      break;
  }

  Routes.getInstance().show();
  onSideOpen(target.innerHTML);
};
