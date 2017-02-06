import React from 'react';
import ImageUpload from './imageUpload.component';
import UploadTypePicker from './uploadTypePicker.component';
import UrlUpload from './urlUpload.component';
import PreviewList from '../preview/previewList.component';
import State from '../../state/state';
import CONSTANTS from '../../state/constants';

export default class ImageUploadContainer extends React.Component {

  constructor() {
    super();
    this.minSize = 0;
    this.maxSize = 5000000;
    this.minDimensions = {width: 500, height: 500};
    this.accepts = 'image/jpeg, image/jpg, image/png';
    this.state = {
      accepted: [],
      rejected: [],
      selectedUploadMethod: null
    };

    State.addListener((elements, errors) => {
      this.setState({accepted: elements, rejected: errors});
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

  getUploadMethod() {
    let uploadElement = null;

    if (this.state.selectedUploadMethod === CONSTANTS.UPLOAD_TYPE_IMAGE) {
      uploadElement = (<ImageUpload accept={this.accepts} minSize={this.minSize} maxSize={this.maxSize} onDrop={this.onDrop}/>);
    }
    else if (this.state.selectedUploadMethod === CONSTANTS.UPLOAD_TYPE_URL) {
      uploadElement = (<UrlUpload onSubmit={State.addUrls}/>);
    }

    return uploadElement;
  }

  render() {
    const uploadMethod = this.getUploadMethod();
    return (
      <div className="upload-form">
        <div className="container">
          {!this.state.selectedUploadMethod && <UploadTypePicker onClick={this.onTypePicked}/>}
          {uploadMethod}
        </div>
        <PreviewList type="url" accepted={this.state.accepted} rejected={this.state.rejected}/>
      </div>
    );
  }
}

