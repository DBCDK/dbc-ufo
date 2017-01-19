import React from 'react';
import CONSTANTS from '../../state/constants';

export default class UploadTypePicker extends React.Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <span>Vælg hvordan du vil tilføje billeder:</span>
        </div>
        <div className="text-center">
          <button className='submit pointer upload-select-btn' id='select-image-upload' onClick={() => this.props.onClick(CONSTANTS.UPLOAD_TYPE_IMAGE)}>Upload af billeder</button>
          <div className="small mb1 text-center inline-block"><i>eller</i></div>
          <button className='submit pointer upload-select-btn' id='select-url-upload' onClick={() => this.props.onClick(CONSTANTS.UPLOAD_TYPE_URL)}>Indæt URL'er</button>
        </div>
      </div>
    );
  }
}

UploadTypePicker.propTypes = {
  onClick: React.PropTypes.func.isRequired
};
