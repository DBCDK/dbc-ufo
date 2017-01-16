import React from 'react';
import PreviewImage from './previewImage.component';
import PreviewWork from './previewWork.component';
import PreviewId from './previewId.component';

export default class PreviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: null,
      id: props.id,
      idIsValid: false,
      error: null
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
    let state = {};
    if (id === '1234') {
      const work = {
        id: id,
        image: 'http://t0.gstatic.com/images?q=tbn:ANd9GcSKL5_5TfA5_e9SJSXKKyhQmLA7vD-kGqvsFheQaPo9PckwNVuV',
        title: 'Titel',
        creator: 'Ophav',
        type: 'Materiale type',
        isbn: 'ISBN'
      };
      state = {work, idIsValid: true};
    }
    else {
      state = {
        idIsValid: false,
        error: `Der findes ikke nogen post med id ${id}`,
        work: null
      };
    }
    setTimeout(() => this.setState(state), 100);
  }

  componentDidMount() {
    if (this.props.id) {
      this.getWorkFromId(this.props.id);
    }
  }

  render() {
    return (
      <div className="preview accepted component">
        {this.state.error && <div className="message error">{this.state.error}</div>}
        <div className="flex">
          <div className="wrapper grow">
            <PreviewImage work={this.state.work || {}} image={this.props.imageInfo} id={this.state.id}/>
            <div className="preview-work grow">
              <PreviewId value={this.state.id} onSubmit={this.onUpdateId} idIsValid={this.state.idIsValid}/>
              <PreviewWork {...this.state.work}/>
              <button className="remove small" onClick={this.props.onRemove}>Fortryd Upload</button>
            </div>
          </div>
          <div className="upload-status"></div>
        </div>
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
