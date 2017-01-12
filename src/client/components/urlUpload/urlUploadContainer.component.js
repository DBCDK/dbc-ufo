import React from 'react';
import UrlUpload from './urlUpload.component';
import PreviewList from '../preview/previewList.component';
import validateImage from '../../utils/validateImage.util';

export default class UrlUploadContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      needsValidation: [],
      rejected: [],
      accepted: []
    };
  }

  /**
   * Callback when urls are added.
   *
   * @param urls
   */
  onUrlsAdded = (urls) => {
    this.setState({accepted: [], rejected: []});

    this.unique(urls).forEach(url => validateImage({
      url,
      onError: () => this.setState({rejected: this.state.rejected.concat([url])}),
      onSuccess: () => this.setState({accepted: this.state.accepted.concat([url])})
    }));
  };

  /**
   * Return array with unique values
   *
   * @param {Array} list
   * @returns {Array}
   */
  unique(list) {
    return list.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  }

  /**
   * Remove url from list.
   *
   * @param element
   */
  onRemove = (element) => {
    const accepted = this.state.accepted.filter(file => file !== element);
    const rejected = this.state.rejected.filter(file => file !== element);
    this.setState({accepted, rejected});
  };

  render() {
    return (
      <div className="upload-urls-container">
        <UrlUpload onSubmit={this.onUrlsAdded}/>
        <PreviewList type="url" accepted={this.state.accepted} rejected={this.state.rejected} onRemove={this.onRemove} />
      </div>
    );
  }
}
