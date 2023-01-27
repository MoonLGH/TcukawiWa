const t = document.getElementById("title");

setInterval(()=>{
  animate(t);
  if (t.innerText === "TcukawiWa") {
    t.innerText = "つかりWA";
  } else {
    t.innerText = "TcukawiWa";
  }
}, 5000);

function animate(t) {
  setTimeout(()=>{
    t.classList.remove("animate");
  }, 1000);
  t.classList.add("animate");
}
