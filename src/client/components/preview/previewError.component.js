import React from 'react';

export default function PreviewError({message, imageInfo, onRemove}) {
  return (
    <div className="preview error component container">
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
      <div className="icon"></div>
      <div className='error'>
        Filnavn: {imageInfo.name}
      </div>
      <button className="button remove" onClick={onRemove}>Fortryd Upload</button>
    </div>
  );
}

PreviewError.propTypes = {
  error: React.PropTypes.string,
  imageInfo: React.PropTypes.object,
  message: React.PropTypes.object,
  onRemove: React.PropTypes.func
};

