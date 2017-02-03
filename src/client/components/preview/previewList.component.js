import React from 'react';
import PreviewContainer from './previewContainer.component';
import PreviewError from './previewError.component';
import State from '../../state/state';

export default class PreviewList extends React.Component {

  renderAccepted() {
    return this.props.accepted.map(item => {
      return (<PreviewContainer key={item.element.name} element={item}/>);
    });
  }

  renderRejected() {
    return this.props.rejected.map(element => {
      return (<PreviewError key={element.name} element={element}/>);
    });
  }

  renderHeader() {
    return (
      <div className="previewlist-header flex mb1">
        <div className="header-description">
          <h2>Preview af billeder og materialer</h2>
          <p>Gennemse uploadede billeder. Alle billeder skal have tilknyttet et gyldigt materiale ID, som billedet skal
            tilknyttes</p>
        </div>
        <div className="upload-button text-center grow">
          <button className="submit large" disabled={!State.readyForUpload()} onClick={State.upload}><span className="icon icon-inline upload" /> Start upload
          </button>
        </div>
      </div>
    );
  }

  renderErrorHeader() {
    return (
      <div className="previewlist-header">
        <h2>Fejl i billeder</h2>
        <p className="message notice"><span className="nb">Bemærk </span>Følgende billeder kan ikke benyttes</p>
      </div>
    );
  }


  render() {
    return (
      <div className="previews component">
        <div className="accepted list">
          {this.props.accepted.length && this.renderHeader() || ''}
          {this.renderAccepted()}
        </div>
        <div className="rejected list">
          {this.props.rejected.length && this.renderErrorHeader() || ''}
          {this.renderRejected()}
        </div>
      </div>
    );
  }
}

PreviewList.propTypes = {
  type: React.PropTypes.string,
  accepted: React.PropTypes.array,
  rejected: React.PropTypes.array
};


