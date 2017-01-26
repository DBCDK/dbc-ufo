import React from 'react';
import State from '../../state/state';
import PreviewStatus from './previewStatus.component';

export default function PreviewError({element}) {
  return (
    <div className="preview error">
      <div className="preview-images">
        <div className="image icon-wrapper large">
          <span className="icon no-image"></span>
        </div>
      </div>
      <div className="main">
        <h4 className="mb1">Filnavn: {element.name}</h4>
        <div className="message notice"><span className="nb">Bemærk: </span>{element.error}</div>
        <a className="remove small" onClick={() => State.remove(element)}>Fjern</a>
      </div>
      <div className="status">
        <PreviewStatus status={element.status} />
      </div>
    </div>
  );
}

PreviewError.propTypes = {
  element: React.PropTypes.object
};
