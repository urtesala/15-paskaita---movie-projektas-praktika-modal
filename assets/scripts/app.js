"use strict";
console.log("app.js");

//^ TAIKOMES ==========================================
const els = {
  addMovieBtn: document.getElementById("add-movie-btn"),
  addMovieModal: document.getElementById("add-modal"),
  backdrop: document.getElementById("backdrop"),
};
console.log("els ===", els);

//^ EVENT LISTENERS =====================================

els.addMovieBtn.addEventListener("click", () => {
  //parodyti modala
  els.addMovieModal.classList.add("visible");
  //parodyti backdrop
  els.backdrop.classList.add("visible");
});
