"use strict";
console.log("app.js");

//^ TAIKOMES ==========================================
const els = {
  addMovieBtn: document.getElementById("add-movie-btn"),
  addMovieModal: document.getElementById("add-modal"),
  backdrop: document.getElementById("backdrop"),
  cancelBtn: document.querySelector(".btn--passive"),
  addMovieForm: document.getElementById("add-movie-form"),
};
console.log("els ===", els);

//^ EVENT LISTENERS =====================================

els.addMovieBtn.addEventListener("click", () => {
  //parodyti modala
  els.addMovieModal.classList.add("visible");
  //parodyti backdrop
  els.backdrop.classList.add("visible");
});

els.backdrop.addEventListener("click", closeMovieModal);
els.cancelBtn.addEventListener("click", closeMovieModal);

els.addMovieForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
//^ MAIN FUNCTIONS ======================================

function closeMovieModal() {
  els.addMovieModal.classList.remove("visible");
  els.backdrop.classList.remove("visible");
}
