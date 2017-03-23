import React from 'react';
import PreviewStatus from './previewStatus.component';

export default function PreviewError({element, retry, remove}) {
  const filename = element.name.length > 80 && element.name.substring(0, 80) + '...' || element.name;
  return (
    <div className="preview error">
      <div className="preview-images">
        <div className="image">
          {element.preview && <img src={element.preview} /> || <div className="icon-wrapper large"><span className="icon no-image"></span></div> }
        </div>
      </div>
      <div className="preview-error--content">
        <h4 className="mb1">Filnavn: {filename}</h4>
        <div className="message notice"><span className="nb">Fejl </span>{element.error}</div>
        <div className="actions">
          {retry && <a className="retry" onClick={(e) => retry(e, element)}>Upload nyt billede</a> || ''}
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
