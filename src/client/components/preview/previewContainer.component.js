import React from 'react';
import PreviewImage from './previewImage.component';
import PreviewWork from './previewWork.component';
import PreviewId from './previewId.component';

export default class PreviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: null,
      id: props.id
    };
  }

  onUpdateId = (id) => {
    // TODO Validate ID and get type before fetching work info. #14
    this.setState({id});
    this.getWorkFromId(id);
  };

  getWorkFromId(id) {
    // This is a dummy implementation
    // TODO We need to call openPlatform to get real work info #25
    const work = {
      id: id,
      image: 'https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg',
      title: 'Titel',
      creator: 'Ophav',
      type: 'Materiale type',
      isbn: 'ISBN'
    };

    setTimeout(() => this.setState({work}), 100);
  }

  componentDidMount() {
    if (this.props.id) {
      this.getWorkFromId(this.props.id);
    }
  }

  render() {
    return (
      <div className="preview-container component">
        {this.props.message && <div className="message">{this.props.message}</div>}
        <PreviewImage work={this.state.work} image={this.props.imageInfo} id={this.state.id} />
        <PreviewId value={this.state.id} onSubmit={this.onUpdateId}/>
        {this.state.work && <PreviewWork {...this.state.work}/>}
        <button onClick={this.props.onRemove}>Fortryd Upload</button>
      </div>
    );
  }
}

PreviewContainer.propTypes = {
  id: React.PropTypes.string,
  imageInfo: React.PropTypes.object,
  message: React.PropTypes.string,
  onRemove: React.PropTypes.func
};
