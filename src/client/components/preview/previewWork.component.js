import React from 'react';

export default function PreviewWork({title, creator, type, isbn}) {
  return (
    <div className="work component">
      {title && <h4 className="title">{title}</h4> || ''}
      {creator && <div className="creator">{creator}</div> || ''}
      {type && <div className="type">{type}</div> || ''}
      {isbn && <div className="isbn">{isbn}</div> || ''}
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
