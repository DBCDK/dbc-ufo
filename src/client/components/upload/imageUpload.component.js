import React from 'react';
import Dropzone from 'react-dropzone';

export default function ImageUpload({minSize, maxSize, accept, onDrop}) {
  return (
    <div className="image-upload component">
      <h1>Billede upload</h1>
      <Dropzone className="dropzone" activeClassName="active" {...{minSize, maxSize, accept, onDrop}} >
        <div className="content">
          <h1>Træk filer hertil for at uploade</h1>
          <p className="break-text">eller</p>
          <p className="link-button"><a href="#"><span className="icon icon-inline image" />  Vælg billeder</a></p>
          <p className="description">Filer skal være af typen <b>JPG</b> eller <b>PNG.</b><br/> Maksimal filstørrelse: <b>{maxSize / 1000000}MB</b>
          </p>
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
