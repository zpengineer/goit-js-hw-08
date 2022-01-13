// Add imports above this line
import SimpleLightbox from "simplelightbox";
import galleryTpl from '../templates/gallery-tpl';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryTpl(galleryItems));

// Код до применения шаблонизатора

// function creatGalleryItemsMarkup(items) {
//     return items.map(({preview, original, description}) =>
//         `<a class="gallery__item" href="${original}">
//             <img class="gallery__image" src="${preview}" alt="${description}" />
//         </a>`
//     ).join("");
// }
// const galleryItemsMarkup = creatGalleryItemsMarkup(galleryItems);

// Код после применения шаблонизатора

const galleryContainerRef = document.querySelector('.gallery');

const galleryItemsMarkup = galleryTpl(galleryItems);

galleryContainerRef.insertAdjacentHTML("beforeend", galleryItemsMarkup);


new SimpleLightbox('.gallery a', { 
    captions: true,
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});
