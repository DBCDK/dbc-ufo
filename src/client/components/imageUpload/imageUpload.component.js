import React from 'react';
import Dropzone from 'react-dropzone';

export default function ImageUpload({minSize, maxSize, accept, onDrop}) {
  return (
    <div className="dropzone component">
      <Dropzone {...{minSize, maxSize, accept, onDrop}} >
        <div className="content">
          <p className="description">Træk filer hertil for at uploade</p>
          <p className="break-text">eller</p>
          <p className="link-button"><a href="#">Vælg filer</a></p>
          <p className="accepted-files-description">Filer skal være af typen JPG eller PNG. Minimum {minSize / 1000000}MB
            og maksimalt {maxSize / 1000000}MB</p>
        </div>
      </Dropzone>
    </div>
  );
}

ImageUpload.propTypes = {
  onDrop: React.PropTypes.func,
  accept: React.PropTypes.string,
  maxSize: React.PropTypes.number,
  minSize: React.PropTypes.number
};
