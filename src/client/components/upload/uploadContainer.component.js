import React from 'react';
import ImageUpload from './imageUpload.component';
import UploadTypePicker from './uploadTypePicker.component';
import UrlUpload from './urlUpload.component';
import PreviewList from '../preview/previewList.component';
import Overlay from '../overlay/overlay.component';
import State from '../../state/state';
import constants from '../../state/constants';
import textFormat from '../../../utils/textFormat.util';

export default class ImageUploadContainer extends React.Component {

  constructor() {
    super();
    this.minSize = 0;
    this.maxSize = 5000000;
    this.minDimensions = {width: 500, height: 500};
    this.accepts = 'image/jpeg, image/jpg, image/png';
    this.initState = {
      overlayIsOpen: false,
      accepted: [],
      rejected: [],
      selectedUploadMethod: null
    };
    this.state = Object.assign({}, this.initState);

    State.addListener((elements, errors, uploadIsDone) => {
      this.setState({accepted: elements, rejected: errors, overlayIsOpen: uploadIsDone});
    });
  }

  rejectedReason = (rejectedFile) => {
    let reason = 'Filen er ugyldig';
    if (!rejectedFile.type || !this.accepts.includes(rejectedFile.type)) {
      reason = 'Filen er ikke en gyldig type. Det skal være en png eller en jpg';
    }
    else if (rejectedFile.size < this.minSize || rejectedFile.size > this.maxSize) {
      reason = `Filen har ikke en gyldig størrelse. Den må være max. ${this.maxSize / 1000000}MB`;
    }

    rejectedFile.error = reason;
    return rejectedFile;
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles) {
      State.addImages([], rejectedFiles.map(this.rejectedReason));
    }
    acceptedFiles.map(image => {
      const img = new Image();
      img.onload = () => {
        if (img.naturalHeight > this.minDimensions.height && img.naturalWidth > this.minDimensions.width) {
          State.addImages([image]);
        }
        else {
          image.error = `Billedet er for lille. Skal være min. ${this.minDimensions.width}px x ${this.minDimensions.height}px`;
          State.addImages([], [image]);
        }
      };
      img.src = image.preview;
    });
  };

  onTypePicked = (type) => {
    this.setState({selectedUploadMethod: type});
  };

  closeOverlay = () => {
    this.setState({overlayIsOpen: false});
  }

  openOverlay = () => {
    this.setState({overlayIsOpen: true});
  }

  reset = () => {
    State.reset();
    this.setState(this.initState);
  }

  getUploadMethod() {
    let uploadElement = null;

    if (this.state.selectedUploadMethod === constants.UPLOAD_TYPE_IMAGE) {
      uploadElement = (
        <ImageUpload accept={this.accepts} minSize={this.minSize} maxSize={this.maxSize} onDrop={this.onDrop} back={this.reset} />);
    }
    else if (this.state.selectedUploadMethod === constants.UPLOAD_TYPE_URL) {
      uploadElement = (<UrlUpload onSubmit={State.addUrls} back={this.reset} />);
    }

    return uploadElement;
  }

  render() {
    const uploadMethod = this.getUploadMethod();
    const uploadSucces = this.state.accepted.filter(element => element.status === constants.DONE_OK).length;
    const uploadErrors = this.state.accepted.filter(element => element.status === constants.DONE_ERROR).length;
    const uploadMissing = this.state.accepted.length - uploadSucces - uploadErrors;

    return (
      <div className="upload-form">
        {!this.state.selectedUploadMethod && <UploadTypePicker onClick={this.onTypePicked}/>}
        {uploadMethod}
        <PreviewList type="url" accepted={this.state.accepted} rejected={this.state.rejected}/>
        <Overlay show={this.state.overlayIsOpen} close={this.closeOverlay}>
          <div className="icon-wrapper block-center mb1"><span className="icon done"/></div>
          <h2 className="text-center mb1">Upload er gennemført</h2>
          <p>{textFormat(uploadSucces, '$ fil', '$ filer')} blev oploadet og
            tilknyttet {textFormat(uploadSucces, 'den angivne post', 'de angivne poster')}</p>
          {uploadErrors &&
          <div className="upload-errors mb1">
            <p className="message">
              <span className="nb">Bemærk</span> Der var fejl i {textFormat(uploadErrors, '$ fil', '$ filer')}. <br />
              Du kan vælge at prøve igen med {textFormat(uploadErrors, 'den post', 'de poster')} der fejlede.
            </p>
            <p className="overlay-actions">
              <a href="#" className="overlay-retry" onClick={this.closeOverlay}>prøv igen
                med {textFormat(uploadErrors, 'den fejlende post', 'de fejlende poster')}</a>
              <a href="#" className="overlay-reset" onClick={this.reset}>Nulstil og start forfra</a>
            </p>
          </div>
          || (uploadMissing &&
          <div className="upload-missing mb1">
            <p className="message">
              <span className="nb">Bemærk</span> Der er {textFormat(uploadMissing, '$ fil', '$ filer')} som endnu ikke
              er oploadet.<br />
              Du kan vælge at fortsætte med {textFormat(uploadMissing, 'den manglende poster', 'de manglende poster')}.
            </p>
            <p className="overlay-actions">
              <a href="#" className="overlay-retry" onClick={this.closeOverlay}>Forsæt
                med {textFormat(uploadMissing, 'den manglende post', 'de manglende poster')}</a>
              <a href="#" className="overlay-reset" onClick={this.reset}>Nulstil og start forfra</a>
            </p>
          </div>
          || '')}
        </Overlay>
      </div>
    );
  }
}

