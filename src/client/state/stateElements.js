import request from 'superagent';
import constants from './constants';
import {getIdFromUrl, validateId} from '../../utils/validateId.util';

/**
 * Parent Upload element. A wrapper around an uploaded file or URL
 */
class UploadElement {
  constructor(element, id, cb) {
    this.element = element;
    this.cb = cb;
    if (id) {
      this.setId(id);
    }
    else {
      this.setIdFromUrl(element.name);
    }
  }

  setIdFromUrl(url) {
    const validatedId = getIdFromUrl(url);
    if (validatedId.type !== 'error') {
      this.setId(validatedId.id);
    }
    else {
      this.setStatus(constants.ERROR_NO_ID);
    }
  }

  setId(id) {
    this.work = null;
    this.id = id;
    const validatedId = validateId(id);
    if (validatedId.type !== 'error') {
      this._fetchWork(validatedId.id, validatedId.type);
      this.setStatus(constants.WAIT_FOR_WORK);
    }
    else {
      this.setStatus(constants.ERROR_INVALID_ID);
    }
  }

  setStatus(status) {
    this.status = status;
    this._isUpdated();
  }

  _fetchWork = (id) => {
    if (id === '11111111') {
      const work = {
        pid: id,
        image: 'http://t0.gstatic.com/images?q=tbn:ANd9GcSKL5_5TfA5_e9SJSXKKyhQmLA7vD-kGqvsFheQaPo9PckwNVuV',
        title: 'Titel',
        creator: 'Ophav',
        matType: 'Materiale type',
        isbn: 'ISBN'
      };
      setTimeout(() => this._setWork(work, id), 100);
    }
    else {
      request
        .post('/posts')
        .send({id})
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (!err && res.status === 200) {
            const work = JSON.parse(res.text);
            this._setWork(work);
          }
          else {
            this._setWork(null);
          }
        });
    }
  }

  _setWork(work) {
    if (work) {
      this.work = work;
      this.setStatus(this.work.image && constants.READY_DOUBLE_IMAGE || constants.READY);
    }
    else {
      this.setStatus(constants.ERROR_NO_WORK);
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
  constructor(url, id, cb) {
    const element = {
      url: url,
      name: url
    };
    super(element, id, cb);
  }

  upload() {
    if (this.work.pid === '11111111') {
      setTimeout(() => this.setStatus(constants.DONE_ERROR), 100);
      return;
    }
    this.setStatus(constants.UPLOAD_STARTED);
    const url = this.element.url;
    const id = this.work.pid;
    request.post('/upload/url')
      .send({url, id})
      .end((err, res) => {
        if (res && res.status === 200) {
          this.setStatus(constants.DONE_OK);
        }
        else {
          this.setStatus(constants.DONE_ERROR);
        }
      });
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
    super(element, null, cb);
  }

  upload() {
    if (this.work.pid === '11111111') {
      setTimeout(() => this.setStatus(constants.DONE_ERROR), 100);
      return;
    }

    this.setStatus(constants.UPLOAD_STARTED);
    const file = this.element.file;
    request.post('/upload/image')
      .field('id', this.work.pid)
      .attach(file.name, file)
      .end((err, res) => {
        if (res && res.status === 200) {
          this.setStatus(constants.DONE_OK);
        }
        else {
          this.setStatus(constants.DONE_ERROR);
        }
      });
  }
}
