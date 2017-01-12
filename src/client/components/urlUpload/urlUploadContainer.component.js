import React from 'react';
import UrlUpload from './urlUpload.component';
import PreviewContainer from '../preview/previewContainer.component';
import validateImage from '../../utils/validateImage.util';

export default class UploadUrlFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      needsValidation: [],
      rejectedUrls: {},
      acceptedUrls: {}
    };
  }

  onUrlsAdded = (urls) => {
    const {acceptedUrls, rejectedUrls} = this.state;
    urls.forEach(url => validateImage({
      url,
      onError: () => this.setState({rejectedUrls: Object.assign(rejectedUrls, {[url]: true})}),
      onSuccess: () => this.setState({acceptedUrls: Object.assign(acceptedUrls, {[url]: true})})
    }));
  };

  render() {
    return (
      <div className="upload-urls-container">
        <UrlUpload onSubmit={this.onUrlsAdded}/>
        <PreviewContainer acceptedUrls={Object.keys(this.state.acceptedUrls)} rejectedUrls={Object.keys(this.state.rejectedUrls)} />
      </div>
    );
  }
}
