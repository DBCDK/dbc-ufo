import React from 'react';
import PreviewContainer from './previewContainer.component';
import PreviewError from './previewError.component';

export default class PreviewList extends React.Component {

  getImageInfo(element) {
    const data = {};
    if (this.props.type === 'image') {
      data.imageInfo = {
        src: element.preview,
        alt: element.name,
        name: element.name
      };
    }
    else {
      data.imageInfo = {
        src: element,
        alt: element,
        name: element
      };
    }
    data.id = element.id || null;
    return data;
  }

  onRemove = (e, element) => {
    e.preventDefault();
    this.props.onRemove(element);
  }

  renderAccepted() {
    return this.props.accepted.map(element => {
      return (<PreviewContainer {...this.getImageInfo(element)} onRemove={e => this.onRemove(e, element)}/>);
    });
  }

  renderRejected() {
    return this.props.rejected.map(element => {
      return (<PreviewError {...this.getImageInfo(element)} message={element.message} onRemove={e => this.onRemove(e, element)}/>);
    });
  }

  render() {
    return (
      <div className="previews component">
        {(this.props.accepted.length || this.props.rejected.length) && <h2>Preview af billeder og materialer</h2> || ''}
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
  onRemove: React.PropTypes.func,
  accepted: React.PropTypes.array,
  rejected: React.PropTypes.array
};


