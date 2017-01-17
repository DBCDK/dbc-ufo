/**
 * Parent Upload element. A wrapper around an uploaded file or URL
 */
class UploadElement {
  constructor(element, cb) {
    this.element = element;
    this.cb = cb;
    this.error = false;
    this.work = null;
  }

  setId(id) {
    this.id = id;
    this.work = null;
    this.error = false;
    this._isUpdated();
    this._fetchWork(id);
  }

  validateId() {

  }

  _fetchWork = (id) => {
    // This is a dummy implementation
    // TODO We need to call openPlatform to get real work info #25
    let work;
    if (id === '1234') {
      work = {
        pid: id,
        image: 'http://t0.gstatic.com/images?q=tbn:ANd9GcSKL5_5TfA5_e9SJSXKKyhQmLA7vD-kGqvsFheQaPo9PckwNVuV',
        title: 'Titel',
        creator: 'Ophav',
        type: 'Materiale type',
        isbn: 'ISBN'
      };
    }
    setTimeout(() => this._setWork(work), 100);
  }

  _setWork(work) {
    if (work) {
      this.work = work;
    }
    else {
      this.error = true;
    }
    this._isUpdated();
  }

  getImageInfo() {
    return {
      src: this.element.url,
      alt: this.element.name
    };
  }

  _isUpdated() {
    this.cb(this);
  }
}

/**
 * An uploaded URL
 */
export class UrlElement extends UploadElement {
  constructor(url, cb) {
    const element = {
      url: url,
      name: url
    };
    super(element, cb);
  }
}

/**
 * An uploaded file
 */
export class ImageElement extends UploadElement {
  constructor(file, cb) {
    const element = {
      url: file.preview,
      name: file.name,
      file: file
    };
    super(element, cb);
  }
}
