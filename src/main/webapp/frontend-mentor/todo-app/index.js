let button = document.getElementById("toggle");

button.addEventListener("click", () => {
  let backgroundImage = document.getElementById("background-image");
  let body = document.getElementById("body");
  let container = document.getElementById("container");

  if (backgroundImage.getAttribute("src") == "res/bg-desktop-dark.jpg") {
    backgroundImage.setAttribute("src", "res/bg-desktop-light.jpg");
    body.style.backgroundColor = "hsl(236, 33%, 92%)";
    body.style.color = "black";
    container.style.backgroundColor = "white";
  } else {
    backgroundImage.setAttribute("src", "res/bg-desktop-dark.jpg");
    body.style.backgroundColor = "hsl(235, 21%, 11%)";
    body.style.color = "white";
    container.style.backgroundColor = "hsl(235, 24%, 19%)";
  }
});

let d = document.getElementById("drag");
d.addEventListener("mouseenter", () => {
  // d.style.color = "hsl(235, 19%, 35%)";
  d.style.color = "hsl(139, 1%, 78%)";
});

populateTasks();

async function populateTasks() {
  const request = new Request("index.json");
  const response = await fetch(request);
  const obj = await response.json();

  for (let item of obj) {
    let generated = document.createElement("p");
  }
  console.log(obj.length);
}
