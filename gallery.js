import images from "./gallery-items.js";
//1.Пункт.
const createMarkupEl = createMarkup(images);
const galleryEl = document.querySelector(".gallery");

galleryEl.insertAdjacentHTML("beforeend", createMarkupEl);

function createMarkup(images) {
  return images
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
</li>`;
    })
    .join("");
}
//2.Пункт.
galleryEl.addEventListener("click", onImageClick);
const openModal = document.querySelector(".lightbox");
const imageOriginal = document.querySelector(".lightbox__image");
const closeModal = document.querySelector(".lightbox__button");
const overlayClose = document.querySelector(".lightbox__overlay");

function onImageClick(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  console.log(event.target.dataset.source);
  openModal.classList.add("is-open");
  imageOriginal.src = event.target.dataset.source;
  imageOriginal.alt = event.target.alt;
}

closeModal.addEventListener("click", oncloseModalClick);
function oncloseModalClick() {
  openModal.classList.remove("is-open");
  imageOriginal.src = "";
  imageOriginal.alt = "";
}

overlayClose.addEventListener("click", oncloseModalClick);
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    return oncloseModalClick();
  }
});
