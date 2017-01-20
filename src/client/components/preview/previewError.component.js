import React from 'react';
import State from '../../state/state';
import PreviewStatus from './previewStatus.component';

export default function PreviewError({element}) {
  return (
    <div className="preview error">
      <div className="images">
        <div className="image">
          <span className="icon cross"></span>
        </div>
      </div>
      <div className="main">
        <h4>Filnavn: {element.name}</h4>
        <div className="message error">{element.error}</div>
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
