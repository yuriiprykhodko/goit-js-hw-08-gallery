import images from "./gallery-items.js";

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

galleryEl.addEventListener("click", onOpenClick);
const openModal = document.querySelector(".lightbox");
const imageOriginal = document.querySelector(".lightbox__image");
const closeModal = document.querySelector(".lightbox__button");
const overlayClose = document.querySelector(".lightbox__overlay");

function onOpenClick(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  openModal.classList.add("is-open");

  imageOriginal.src = event.target.dataset.source;
  imageOriginal.alt = event.target.alt;

  document.addEventListener("keydown", (e) => {
    const imagesSrc = [];
    images.forEach((el) => {
      imagesSrc.push(el.original);
    });
    let newIndex = imagesSrc.indexOf(imageOriginal.src);
    if (newIndex < 0) {
      return;
    }
    if (e.key === "ArrowLeft") {
      newIndex -= 1;
    }
    if (newIndex === -1) {
      newIndex = imagesSrc.length - 1;
    } else if (e.key === "ArrowRight") {
      newIndex += 1;
    }
    if (newIndex === imagesSrc.length) {
      newIndex = 0;
    }
    imageOriginal.src = imagesSrc[newIndex];
  });
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
