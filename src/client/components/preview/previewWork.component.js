import React from 'react';

export default function PreviewWork({title, creator, type, isbn}) {
  return (
    <div className="work-preview component container">
      <div className="title">{title}</div>
      <div className="creator">{creator}</div>
      <div className="type">{type}</div>
      <div className="isbn">{isbn}</div>
    </div>
  );
}

PreviewWork.propTypes = {
  image: React.PropTypes.string,
  title: React.PropTypes.string,
  creator: React.PropTypes.string,
  type: React.PropTypes.string,
  isbn: React.PropTypes.string
};
