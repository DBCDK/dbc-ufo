import React from 'react';
import PreviewImage from './previewImage.component';
import PreviewWork from './previewWork.component';
import PreviewId from './previewId.component';
import PreviewStatus from './previewStatus.component';
import State from '../../state/state';
import constants from '../../state/constants';

export default class PreviewContainer extends React.Component {

  isIdLocked() {
    const lockingStatusList = [constants.DONE_ERROR, constants.DONE_OK, constants.WAIT_FOR_WORK];
    return this.isElementLocked() || lockingStatusList.includes(this.props.element.status);
  }

  isElementLocked() {
    const lockingStatusList = [constants.UPLOAD_STARTED, constants.UPLOAD_WAITING, constants.WAIT_FOR_WORK];
    return lockingStatusList.includes(this.props.element.status);
  }

  renderRemoveButton(element) {
    if (element.status === constants.DONE_ERROR) {
      return (
        <a className="remove small" onClick={() => element.setStatus(constants.READY)}>Prøv igen</a>
      );
    }

    return (
      <a className="remove small" disabled={this.isElementLocked()} onClick={() => State.remove(element)}>fjern</a>
    );
  }

  renderMessage(element) {
    let message = '';
    switch (element.status) {
      case constants.DONE_ERROR:
        message = `Det var ikke muligt at uploade billedet til post ${element.id}`;
        break;
      case constants.ERROR_NO_WORK:
        message = `Der findes ikke nogen post med id ${element.id}`;
        break;
      case constants.READY_DOUBLE_IMAGE:
        message = `Posten med id ${element.id} har allerede en forside`;
        break;
      case constants.ERROR_INVALID_ID:
        message = `Der findes ikke nogen post id ${element.id}`;
        break;
      case constants.ERROR_NO_ID:
        message = 'id mangler';
        break;
      default:
        message = '';
    }

    if (message) {
      return (
        <div className="message notice"><span className="nb">Bemærk: </span>{message}</div>
      );
    }

    return '';
  }

  render() {
    const element = this.props.element;
    return (
      <div className="preview accepted component">
        <div className="images">
          <PreviewImage work={element.work || {}} image={element.getImageInfo()} id={element.id}/>
        </div>
        <div className="main">
          <div className="preview-work grow">
            <PreviewId value={element.id} onSubmit={(id) => element.setId(id)} disabled={this.isIdLocked()}/>
            {this.renderMessage(element)}
            <PreviewWork {...element.work}/>
            {this.renderRemoveButton(element)}
          </div>
        </div>
        <div className='status'>
          <PreviewStatus status={element.status}/>
        </div>
        <div></div>
      </div>
    );
  }
}

PreviewContainer.propTypes = {
  element: React.PropTypes.object
};
