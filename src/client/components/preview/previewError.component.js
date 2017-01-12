import React from 'react';

export default function PreviewError({message, imageInfo, onRemove}) {
  return (
    <div className="preview-error component container">
      {message && <div className="message">{message}</div>}
      <div className='error'>
        Filnavn: {imageInfo.name}
      </div>
      <button onClick={onRemove}>Fortryd Upload</button>
    </div>
  );
}

PreviewError.propTypes = {
  error: React.PropTypes.string,
  imageInfo: React.PropTypes.object,
  message: React.PropTypes.string,
  onRemove: React.PropTypes.func
};

