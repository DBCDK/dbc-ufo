import React from 'react';

export default function PreviewWork({title, creator, matType, isbn}) {
  return (
    <div className="work component">
      {title && <h4 className="title bold">{title}</h4> || ''}
      {creator && <div className="creator">{creator}</div> || ''}
      {matType && <div className="type">{matType}</div> || ''}
      {isbn && <div className="isbn">Isbn {isbn}</div> || ''}
    </div>
  );
}

PreviewWork.propTypes = {
  image: React.PropTypes.string,
  title: React.PropTypes.string,
  creator: React.PropTypes.string,
  matType: React.PropTypes.string,
  isbn: React.PropTypes.string
};
