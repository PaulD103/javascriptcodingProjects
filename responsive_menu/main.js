document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("menu-toggle");

  button.addEventListener("click", () => {
    button.classList.add("toggled-on");
    document.getElementById("button-toggle").classList.toggle("toggled-on");
    document.getElementById("mobile-navigation-list").classList.toggle("active");
  });
});
