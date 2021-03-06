import React from 'react';
import Dropzone from 'react-dropzone';

export default function ImageUpload({
  minSize,
  maxSize,
  accept,
  onDrop,
  setDropzoneRef
}) {
  return (
    <div className="image-upload component medium mb4">
      <div className="image-upload-header flex baseline">
        <h1 className="grow">Upload af billedfiler</h1>
      </div>
      <Dropzone
        ref={setDropzoneRef}
        className="dropzone mb2"
        activeClassName="active"
        {...{minSize, maxSize, accept, onDrop}}
      >
        <div className="content">
          <div className="text-center mb1">
            <span className="icon large square add-image" />
          </div>
          <h1>Træk filer hertil for at uploade</h1>
          <p className="break-text italic mb1">eller</p>
          <p className="link-button mb2">
            <a href="#" className="button submit">
              <span className="icon add-image-white square" /> Vælg billeder
            </a>
          </p>
          <p className="description text-right color-light mb0">
            Filtype: JPG eller PNG. Max: {maxSize / 1000000}MB.
          </p>
        </div>
      </Dropzone>
      <p>
        Her kan du uploade billeder til Forsideservice. Du kan uploade flere
        billeder ad gangen. Der skal kobles et materiale til hvert billede på
        næste trin.
      </p>
    </div>
  );
}

ImageUpload.propTypes = {
  onDrop: React.PropTypes.func,
  accept: React.PropTypes.string,
  maxSize: React.PropTypes.number,
  minSize: React.PropTypes.number,
  setDropzoneRef: React.PropTypes.func
};
