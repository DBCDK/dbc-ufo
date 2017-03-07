import React from 'react';
import State from '../../state/state';
import PreviewStatus from './previewStatus.component';
import constants from '../../state/constants';

export default function PreviewError({element, onClick}) {
  return (
    <div className="preview error">
      <div className="preview-images">
        <div className="image">
          {element.preview && <img src={element.preview} /> || <div className="icon-wrapper large"><span className="icon no-image"></span></div> }
        </div>
      </div>
      <div className="main">
        <h4 className="mb1 noverflow">Filnavn: {element.name}</h4>
        <div className="message notice noverflow"><span className="nb">Fejl </span>{element.error}</div>
        <a className="remove" onClick={(e) => onClick(e, element)}>Upload nyt billede</a>
      </div>
      <div className="status">
        <PreviewStatus status={element.status} />
      </div>
    </div>
  );
}

PreviewError.propTypes = {
  element: React.PropTypes.object,
  onClick: React.PropTypes.func
};
