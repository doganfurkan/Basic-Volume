document.getElementById("themeSwitcher").addEventListener("click", changeTheme);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark")
}

function changeTheme() {
  let thm;
  document.body.classList.toggle("dark");
  if (localStorage.getItem("theme") === "dark") {
    thm = "light"
  } else if (localStorage.getItem("theme") === "light") {
    thm = "dark"
  } else {
    thm = "light"
  }
  localStorage.setItem("theme", thm)
}
