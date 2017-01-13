import React from 'react';
import ImageUpload from './imageUpload.component';
import PreviewList from '../preview/previewList.component';

export default class ImageUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.minSize = 100000;
    this.maxSize = 5000000;
    this.accepts = 'image/jpeg, image/jpg, image/png';
    this.state = {
      accepted: [],
      rejected: []
    };
  }

  rejectedReason = (rejectedFile) => {
    let reason = 'Filen er ugyldig';
    if (!rejectedFile.type || !this.accepts.includes(rejectedFile.type)) {
      reason = 'Filen er ikke en gyldig type. Det skal være en png eller en jpg';
    }
    else if (rejectedFile.size < this.minSize || rejectedFile.size > this.maxSize) {
      reason = `Filen har ikke en gyldig størrelse. Den skal være minimum ${this.minSize / 1000000}MB og maksimalt ${this.maxSize / 1000000}MB`;
    }

    rejectedFile.message = {
      type: 'error',
      text: reason
    };

    return rejectedFile;
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      accepted: this.state.accepted.concat(acceptedFiles),
      rejected: this.state.rejected.concat(rejectedFiles.map(this.rejectedReason))
    });
  };

  onRemove = (element) => {
    const accepted = this.state.accepted.filter(file => file !== element);
    const rejected = this.state.rejected.filter(file => file !== element);
    this.setState({accepted, rejected});
  };

  render() {
    return (
      <div className="upload-form-container">
        <ImageUpload accept={this.accepts} minSize={this.minSize} maxSize={this.maxSize} onDrop={this.onDrop} />
        <PreviewList type="image" accepted={this.state.accepted} rejected={this.state.rejected} onRemove={this.onRemove} />
      </div>
    );
  }
}

