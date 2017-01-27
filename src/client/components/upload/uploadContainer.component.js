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
    this.minSize = 100000;
    this.maxSize = 5000000;
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
      reason = `Filen har ikke en gyldig størrelse. Den skal være mellem ${this.minSize / 1000000}MB - ${this.maxSize / 1000000}MB`;
    }

    rejectedFile.error = reason;
    return rejectedFile;
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    State.addImages(acceptedFiles, rejectedFiles.map(this.rejectedReason));
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

