import {UrlElement, ImageElement} from './stateElements';
import unique from '../utils/unique.util';
import validateImage from '../utils/validateImage.util';

/**
 * Simple State management for image and URL upload.
 */
class State {
  listeners = [];
  elements = [];
  errors = [];

  addUrls = (urls) => {
    this.elements = [];
    this.errors = [];
    this.elementsUpdated();
    unique(urls).forEach(url => validateImage({
      url,
      onError: () => {
        this.errors.push({name: url, error: `${url} er ikke en gyldig billed url`});
        this.elementsUpdated();
      },
      onSuccess: () => {
        this.elements.push(new UrlElement(url, this.elementsUpdated));
        this.elementsUpdated();
      }
    }));
  }

  addImages = (images, errors) => {
    this.elements = this.elements.concat(images.map(url => new ImageElement(url, this.elementsUpdated)));
    this.errors = this.errors.concat(errors);
    this.elementsUpdated();
  }

  addErrors(errors) {
    this.errors = errors;
    this.elementsUpdated();
  }

  elementsUpdated = () => {
    this.listeners.forEach(cb => cb(this.elements, this.errors));
  }

  addListener(cb) {
    this.listeners.push(cb);
  }

  remove(element) {
    this.elements = this.elements.filter(file => file !== element);
    this.errors = this.errors.filter(file => file !== element);
    this.elementsUpdated();
  }

  upload() {
    // TODO call upload on all elements, and handle callbacks
    this.elementsUpdated();
  }
}

export default new State();