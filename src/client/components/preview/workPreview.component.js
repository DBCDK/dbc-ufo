import React from 'react';

export default function WorkPreview({image, title, creator, type, isbn}) {
  return (
    <div className="work-preview component container">
      {image && <div className='image'>
        <img style={{maxWidth: '300px'}} src={image} alt={`Forside til ${title}`}/>
        <span className='image-description'>Eksisterende forside</span>
      </div>}
      <div className="work-content">
        <div className="title">{title}</div>
        <div className="creator">{creator}</div>
        <div className="type">{type}</div>
        <div className="isbn">{isbn}</div>
      </div>
    </div>
  );
}

WorkPreview.propTypes = {
  image: React.PropTypes.string,
  title: React.PropTypes.string,
  creator: React.PropTypes.string,
  type: React.PropTypes.string,
  isbn: React.PropTypes.string
};
