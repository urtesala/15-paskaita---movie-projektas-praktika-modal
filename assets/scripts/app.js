"use strict";
console.log("app.js");

//^ TAIKOMES ============================================================================
const els = {
  addMovieBtn: document.getElementById("add-movie-btn"),
  addMovieModal: document.getElementById("add-modal"),
  backdrop: document.getElementById("backdrop"),
  cancelMovieBtn: document.querySelector(".btn--passive"),
  addMovieForm: document.getElementById("add-movie-form"),
  moviesContainer: document.getElementById("movie-list"),
  noMoviesContainer: document.getElementById("entry-text"),
};

// bendras globalus filmu kintamasis
let mainMoviesArr = [];

// testavimui prisidedam filma iskart
addNewMovieHandler({
  id: generateId(),
  imageUrl: "https://picsum.photos/id/1003/1181/1772",
  rating: "4",
  title: "Bambi1",
});
addNewMovieHandler({
  id: generateId(),
  imageUrl: "https://picsum.photos/id/1006/1181/1772",
  rating: "4",
  title: "Mountain",
});
addNewMovieHandler({
  id: generateId(),
  imageUrl: "https://picsum.photos/id/1015/1181/1772",
  rating: "4",
  title: "River",
});
console.log("mainMoviesArr ===", mainMoviesArr);

console.log("els ===", els);

//^ EVENT LISTENERS =====================================================================

// paspaudimas ant Add Movie Btn
els.addMovieBtn.addEventListener("click", () => {
  // parodyti modala
  els.addMovieModal.classList.add("visible");
  // parodyti backdrop
  els.backdrop.classList.add("visible");
});

// uzdeti paspaudimo pasiklausyma ant backdrop
els.backdrop.addEventListener("click", closeMovieModal);

// uzdeti cancel mygtukui pasiklausyma ir atlikti ta pati ka ir darem su backdrop paspaudus
els.cancelMovieBtn.addEventListener("click", closeMovieModal);

// klausomes formos issiuntimo ir stabdom perkrovima
els.addMovieForm.addEventListener("submit", (event) => {
  // stabdom perkrovima
  event.preventDefault();
  console.log("add movie");
  // gauti input reiksmes ====================================================
  const newMovieDetails = {
    id: generateId(),
    title: els.addMovieForm.elements.title.value.trim(),
    imageUrl: els.addMovieForm.elements["image-url"].value.trim(),
    rating: els.addMovieForm.elements.rating.value.trim(),
  };
  console.log("newMovieDetails ===", newMovieDetails);
  // mini validacija =========================================================
  // jei nors vienas laukas neivestas
  if (
    newMovieDetails.title === "" ||
    newMovieDetails.imageUrl === "" ||
    newMovieDetails.rating === ""
  ) {
    // stabdom tolimesni filmo pridejo vygdyma
    console.log("stop nes ne viskas ivesta");
    return;
  }

  // jei viskas nera tusciu lauku ================================================
  addNewMovieHandler(newMovieDetails);
  // kai pridedam sekmingai filma isvalyti forma ir paslepti modala ir backdrop
  closeMovieModal();
  els.addMovieForm.reset();
});

//^ MAIN FUNCTIONS =====================================================================

function addNewMovieHandler(newMovieObj) {
  // jei viskas gerai pridedam ta filma i mainMoviesArr
  mainMoviesArr.push(newMovieObj);

  renderMovies();
}

function renderMovies() {
  // issivalyti saraso konteineri kad nebutu dubliuojami elementai su apend
  els.moviesContainer.innerHTML = "";

  // noMoviesContainer rodyti arba ne, priklausomai ar turim nors viena movie
  if (mainMoviesArr.length > 0) {
    // paslepti elementa kuris rodomas jei neturim nei vieno filmo
    els.noMoviesContainer.style.display = "none";
  } else {
    // rodyti elementa kuris rodomas jei neturim nei vieno filmo
    els.noMoviesContainer.style.display = "block";
    return;
  }

  // sukti cikla per visa mainMoviesArr. sugeneruoti naujus movies html elementus is masyvo
  mainMoviesArr.forEach((mObj) => {
    // jei viskas gerai sukuriam html vieno movie
    const newMovieHtmlEl = makeOneMovieHtmlEl(mObj);
    // talpinam ta movie i dom
    els.moviesContainer.append(newMovieHtmlEl);
  });
}

function closeMovieModal() {
  console.log("closeMovieModal fn");
  // paslepti modala
  els.addMovieModal.classList.remove("visible");
  // paslepti backdrop
  els.backdrop.classList.remove("visible");
}

/**
 * Sukuria ir grazina li elmenta is argumetu gauto objekto reiksmiu
 * @param {*} newMovieObj
 *
 */

/*
<li class="movie-element">
  <div class="movie-element__image">
    <img src="https://picsum.photos/id/1003/600/500" alt="element__image">
  </div>
  <div class="movie-element__info">
    <h2>Title</h2>
    <p>rating/5 stars</p>
  </div>
</li>
*/

function makeOneMovieHtmlEl(newMovieObj) {
  // console.log('newMovieObj ===', newMovieObj);
  // isorini el sukuriam su createElement
  const liEl = document.createElement("li");
  liEl.className = "movie-element";
  // prisidenam data-movie-id atributa kad atskirti individualu li el
  liEl.dataset.movieId = newMovieObj.id;
  // vidinius elementus su string (veliau reiktu perdaryti i createElement)
  const liInsideHtml = `
  <div class="movie-element__image">
    <img src="${newMovieObj.imageUrl}" alt="element__image">
  </div>
  <div class="movie-element__info">
    <h2>${newMovieObj.title}</h2>
    <p>${newMovieObj.rating}/5 stars</p>
    <i class="delete fa fa-trash" aria-hidden="true"></i>
  </div>
  `;
  // dedam string elementu i li elementa
  liEl.insertAdjacentHTML("afterbegin", liInsideHtml);
  // console.log(liEl);
  // taikomes i sukurta delete iconele
  const deleteBtnEl = liEl.querySelector(".delete");
  deleteBtnEl.addEventListener("click", movieDeleteHandler);
  return liEl;
}

function movieDeleteHandler(event) {
  // console.log('delete movie', event.target);
  const deleteIconEl = event.target;
  const movieLiElToDelete = deleteIconEl.closest("li");
  const idOfElToBeDeleted = movieLiElToDelete.dataset.movieId;
  console.log("idOfElToBeDeleted ===", idOfElToBeDeleted);

  // mainMoviesArr paliekam viska isskyrus ta elementa ant kurio paspausta delete
  mainMoviesArr = mainMoviesArr.filter((mObj) => mObj.id !== idOfElToBeDeleted);
  console.log("mainMoviesArr ===", mainMoviesArr);

  // bet kada ivykus pokyciui mes kvieciam render
  renderMovies();
}

//^ HELPER FUNCTIONS =====================================================================

function generateId() {
  return Math.random().toFixed(8).slice(2);
}
