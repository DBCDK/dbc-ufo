import React from 'react';
import constants from '../../state/constants';

export default class UploadTypePicker extends React.Component {
  render() {
    return (
      <div className="upload-select medium">
        <h1 className="mb1">Hvordan du vil tilføje billeder?</h1>
        <div className="buttons flex">
          <div id="select-image-upload" className="text-button" onClick={() => this.props.onClick(constants.UPLOAD_TYPE_IMAGE)}>
            <div className="text-center mb1"><span className="icon large square add-image"/></div>
            <h2>Upload billeder</h2>
            <div className="button-description">
              Her kan du uploade billeder til Forsideservice. Du kan uploade flere billeder ad gangen. Der skal kobles
              et materiale til hvert billede
            </div>
          </div>
          <div id="select-url-upload" className="text-button" onClick={() => this.props.onClick(constants.UPLOAD_TYPE_URL)}>
            <div className="text-center mb1"><span className="icon large square link"/></div>
            <h2>Indsæt URL'er</h2>
            <div className="button-description">
              Her kan du vedhæfte billede url'er til Forsideservice. Du har ansvar for at rettigheder og adgang til url'er er i orden
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UploadTypePicker.propTypes = {
  onClick: React.PropTypes.func.isRequired
};
