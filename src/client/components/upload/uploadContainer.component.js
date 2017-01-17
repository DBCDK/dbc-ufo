import React from 'react';
import ImageUpload from './imageUpload.component';
import UrlUpload from './urlUpload.component';
import PreviewList from '../preview/previewList.component';
import State from '../../state/state';

export default class ImageUploadContainer extends React.Component {

  constructor() {
    super();
    this.minSize = 100000;
    this.maxSize = 5000000;
    this.accepts = 'image/jpeg, image/jpg, image/png';
    this.state = {
      accepted: [],
      rejected: []
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
      reason = `Filen har ikke en gyldig størrelse. Den skal være minimum ${this.minSize / 1000000}MB og maksimalt ${this.maxSize / 1000000}MB`;
    }

    rejectedFile.error = reason;
    return rejectedFile;
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    State.addImages(acceptedFiles, rejectedFiles.map(this.rejectedReason));
  };

  render() {
    return (
      <div className="upload-form-container">
        <ImageUpload accept={this.accepts} minSize={this.minSize} maxSize={this.maxSize} onDrop={this.onDrop}/>
        <UrlUpload onSubmit={State.addUrls}/>
        <PreviewList type="url" accepted={this.state.accepted} rejected={this.state.rejected} />
      </div>
    );
  }
}

