import React from 'react';

export default function PreviewImage({image, work}) {
  return (
    <div className="preview-image component container">
      <div className='image'>
        <img style={{maxWidth: '300px'}} {...image}/>
        {work.image && <span className='image-description new'>Ny</span> || ''}
      </div>
      {work.image && <div className='image'>
        <img style={{maxWidth: '300px'}} src={work.image} alt={`Forside til ${work.title}`}/>
        <span className='image-description old'>Eksisterende forside</span>
      </div> || ''}
    </div>
  );
}

PreviewImage.propTypes = {
  image: React.PropTypes.object,
  work: React.PropTypes.object
};

