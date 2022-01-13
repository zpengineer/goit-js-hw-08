import galleryTpl from '../templates/gallery-tpl';
import SimpleLightbox from "simplelightbox";
import { galleryItems } from './gallery-items';
import 'simplelightbox/dist/simple-lightbox.min.css';

class Gallery{

    constructor(selector) {
        this.$el = document.querySelector(selector);
        this.render();
        this.setGallery();
    }

    createGalleryItems() {
      return galleryTpl(galleryItems);
    }

   setGallery() {

        return new SimpleLightbox('.gallery a', { 
            captions: true,
            captionSelector: 'img',
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
        });
    }

    render(){
        this.$el.insertAdjacentHTML("beforeend", this.createGalleryItems());
    }

}

const simpleGallery = new Gallery('.gallery');
// simpleGallery.showGallery();
