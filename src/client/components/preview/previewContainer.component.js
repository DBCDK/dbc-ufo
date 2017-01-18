import React from 'react';
import PreviewImage from './previewImage.component';
import PreviewWork from './previewWork.component';
import PreviewId from './previewId.component';
import State from '../../state/state';

export default class PreviewContainer extends React.Component {
  render() {
    const element = this.props.element;
    return (
      <div className="preview accepted component">
        <div className="images">
          <PreviewImage work={element.work || {}} image={element.getImageInfo()} id={element.id}/>
        </div>
        <div className="main">
          <div className="preview-work grow">
            <PreviewId value={element.id} onSubmit={(id) => element.setId(id)} idIsValid={element.work && true}/>
            {element.work && element.work.image &&
            <div className="message notice">Posten med id {element.id} har allerede en forside</div> || ''}
            {element.error && <div className="message error">Der findes ikke nogen post med id {element.id}</div>}
            <PreviewWork {...element.work}/>
            <a className="remove small" onClick={() => State.remove(element)}>Fortryd</a>
          </div>
        </div>
        <div className="status">
        </div>
      </div>
    );
  }
}

PreviewContainer.propTypes = {
  element: React.PropTypes.object
};
