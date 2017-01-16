import React from 'react';

export default function PreviewError({message, imageInfo, onRemove}) {
  return (
    <div className="preview error">
      <div className="images">
        <div className="image">
          <span className="icon cross"></span>
        </div>
      </div>
      <div className="main">
        <h4>Filnavn: {imageInfo.name}</h4>
        {message && <div className={`message ${message.type}`}>{message.text}</div>}
        <button className="button remove" onClick={onRemove}>Fortryd Upload</button>
      </div>
      <div className="status">
      </div>
    </div>
  );
}

PreviewError.propTypes = {
  error: React.PropTypes.string,
  imageInfo: React.PropTypes.object,
  message: React.PropTypes.object,
  onRemove: React.PropTypes.func
};

