import React from 'react';

export default function PreviewWork({title, creator, matType, isbn}) {
  return (
    <div className="work component">
      {title && <h4 className="title">{title.join()}</h4> || ''}
      {creator && <div className="creator">{creator.join()}</div> || ''}
      {matType && <div className="type">{matType.join()}</div> || ''}
      {isbn && <div className="isbn">{isbn.join()}</div> || ''}
    </div>
  );
}

PreviewWork.propTypes = {
  image: React.PropTypes.string,
  title: React.PropTypes.array,
  creator: React.PropTypes.array,
  matType: React.PropTypes.array,
  isbn: React.PropTypes.array
};
