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

  isDone() {
    return this.props.element.status === constants.DONE_OK;
  }

  isElementLocked() {
    const lockingStatusList = [constants.UPLOAD_STARTED, constants.UPLOAD_WAITING, constants.WAIT_FOR_WORK];
    return lockingStatusList.includes(this.props.element.status);
  }

  renderRemoveButton(element) {
    if (element.status === constants.DONE_ERROR) {
      return (
        <a className="remove" onClick={() => element.setStatus(constants.READY)}>Prøv igen</a>
      );
    }

    return (
      <a className="remove" disabled={this.isElementLocked()} onClick={() => State.remove(element)}>Fjern</a>
    );
  }

  renderMessage(element) {
    let message = '';
    switch (element.status) {
      case constants.DONE_ERROR:
        message = `Det var ikke muligt at uploade billedet til post ${element.id}`;
        break;
      case constants.ERROR_NO_WORK:
        message = 'Posten findes ikke. indtast et gyldigt ID';
        break;
      case constants.READY_DOUBLE_IMAGE:
        message = 'Posten har allerede en forside';
        break;
      case constants.ERROR_INVALID_ID:
        message = 'Posten findes ikke. indtast et gyldigt ID';
        break;
      case constants.ERROR_NO_ID:
        message = 'Indtast ID';
        break;
      default:
        message = '';
    }

    if (message) {
      return (
        <div className="message notice"><span className="nb">Bemærk </span>{message}</div>
      );
    }

    return '';
  }

  render() {
    const element = this.props.element;
    return (
      <div className={`preview accepted component ${this.isDone() && 'done' || ''}`}>
        <div className="images">
          <PreviewImage work={element.work || {}} image={element.getImageInfo()} id={element.id}/>
        </div>
        <div className="preview-form">
          <div className="preview-work">
            {this.isDone() &&
              <div className="id-form flex"><span className="id-label">ID</span><span className="id-content">{element.id}</span></div>
            ||
              <PreviewId value={element.id} onSubmit={(id) => element.setId(id)} disabled={this.isIdLocked()}/>
            }
            {!this.isDone() && this.renderMessage(element) || ''}
            <PreviewWork {...element.work}/>
            {this.renderRemoveButton(element)}
          </div>
        </div>
        <div className='status'>
          <PreviewStatus status={element.status}/>
        </div>
      </div>
    );
  }
}

PreviewContainer.propTypes = {
  element: React.PropTypes.object
};
