const elInput = document.querySelector(".js-input");
const elList = document.querySelector(".js-list");
const elFilmsTemplate = document.querySelector(".films-template").content;
const elPaginationTemplate = document.querySelector(".pagination-template").content;
const elPrevBtn = document.querySelector(".prev");
const elNextBtn = document.querySelector(".next");
const elPagination = document.querySelector(".pagination");

const API_KEY = "f17aea12";
let elInputVal = "";
let activePage = 1;

elInput.addEventListener("change", function(evt) {
  elInputVal = evt.target.value;
  getMovie();
})
const filmsFragment = document.createDocumentFragment();


const renderMovie = (array, node) => {

  array.forEach(e => {
    node.innerHTML = ""
    const newTemplate = elFilmsTemplate.cloneNode(true)

    newTemplate.querySelector(".item__img").src = e.Poster;
    newTemplate.querySelector(".item__title").textContent = e.Title;
    newTemplate.querySelector(".item__year").textContent = e.Year;
    newTemplate.querySelector(".item__type").textContent = e.Type;
    newTemplate.querySelector(".item__id").textContent = e.imdbID;
    filmsFragment.appendChild(newTemplate);
  })
  node.appendChild(filmsFragment);

}

  async function getMovie() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${elInputVal}&page=${activePage}`);

    const data = await response.json();
    let totalPages = Math.ceil(data.totalRasults / 10);
    renderMovie(data.Search, elList)

    if(activePage == 1) {
      elPrevBtn.setAttribute("disabled", true)
    } else {
      elPrevBtn.removeAttribute("disabled")
    }

    if(activePage == totalPages) {
      elNextBtn.setAttribute("disabled", true)
    } else {
      elNextBtn.removeAttribute("disabled")
    }

    for(let i = 1; i < totalPages; i++) {
      const newPageTemp = elPaginationTemplate.cloneNode(true);
      newPageTemp.querySelector(".page-link").textContent = i;
      elPagination.appendChild(newPageTemp)
    }
  }

  elPrevBtn.addEventListener("click", () => {
    activePage--
    getMovie();
  })

  elNextBtn.addEventListener("click", () => {
    activePage++
    getMovie();
  })

  elPagination.addEventListener("click", (evt) => {
    if(evt.target.matches(".page-link")) {
      activePage = evt.target.dataset.pageId;
      getMovie()
    }
  })