import React from 'react';
import UrlUpload from './urlUpload.component';
import PreviewList from '../preview/previewList.component';
import State from '../../state/state';

export default class UrlUploadContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      rejected: [],
      accepted: []
    };
    State.addListener((elements, errors) => {
      this.setState({accepted: elements, rejected: errors});
    });
  }

  render() {
    return (
      <div className="upload-urls-container">
        <UrlUpload onSubmit={State.addUrls}/>
        <PreviewList type="url" accepted={this.state.accepted} rejected={this.state.rejected} />
      </div>
    );
  }
}
