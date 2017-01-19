import React from 'react';

export default function PreviewStatus({status, text}) {
  return (
    <div className="preview-status">
      <div className="icon-wrapper">
        <span className={`icon ${status}`}>
          {status}
        </span>
      </div>
      <div className="description">
        {text || ''}
      </div>
    </div>
  );
}

PreviewStatus.propTypes = {
  status: React.PropTypes.string,
  text: React.PropTypes.string
};
