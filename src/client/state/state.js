import {UrlElement, ImageElement} from './stateElements';
import unique from '../../utils/unique.util';
import validateImage from '../../utils/validateImage.util';
import constants from '../state/constants';

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
        this.errors.push({name: url, error: 'Ugyldig billedurl', status: constants.ERROR_INVALID_URL});
        this.elementsUpdated();
      },
      onSuccess: () => {
        this.elements.push(new UrlElement(url, this.elementsUpdated));
        this.elementsUpdated();
      }
    }));
  }

  addImages = (images, errors) => {
    if (images) {
      this.elements = this.elements.concat(images.map(url => new ImageElement(url, this.elementsUpdated)));
    }
    if (errors) {
      this.errors = this.errors.concat(errors.map(error => Object.assign(error, {status: constants.ERROR_INVALID_IMAGE})));
    }
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

  upload = () => {
    this.elements.forEach(element => element.status.includes('ready') && element.upload());
  }

  readyForUpload() {
    const waiting = this.elements.filter(element => element.status.includes('wait'));
    const ready = this.elements.filter(element => element.status.includes('ready'));
    if (ready.length > 0 && waiting.length === 0) {
      return true;
    }

    return false;
  }
}

export default new State();
