import React from 'react';
import PreviewStatus from './previewStatus.component';

export default function PreviewError({element, retry, remove}) {
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
        <div className="actions">
          <a className="retry" onClick={(e) => retry(e, element)}>Upload nyt billede</a>
          <a className="remove" onClick={(e) => remove(e, element)}>Fjern billede</a>
        </div>
      </div>
      <div className="status">
        <PreviewStatus status={element.status} />
      </div>
    </div>
  );
}

PreviewError.propTypes = {
  element: React.PropTypes.object,
  retry: React.PropTypes.func,
  remove: React.PropTypes.func
};
