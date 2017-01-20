import React from 'react';
import PreviewContainer from './previewContainer.component';
import PreviewError from './previewError.component';
import State from '../../state/state';

export default class PreviewList extends React.Component {

  renderAccepted() {
    return this.props.accepted.map(element => {
      return (<PreviewContainer key={element.name} element={element} />);
    });
  }

  renderRejected() {
    return this.props.rejected.map(element => {
      return (<PreviewError key={element.name} element={element} />);
    });
  }

  renderHeader() {
    return (
      <div className="previewlist-header">
        <h2>Preview af billeder og materialer</h2>
        <div className="upload-button text-right mb1">
          <button className="submit large" disabled={!State.readyForUpload()} onClick={State.upload}>Upload billeder</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="previews component">
        {(this.props.accepted.length || this.props.rejected.length) && this.renderHeader() || ''}
        <div className="accepted">
          {this.renderAccepted()}
        </div>
        <div className="rejected">
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


