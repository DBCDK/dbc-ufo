import React from 'react';

export default function PreviewImage({image, work}) {
  return (
    <div className="preview-images component">
      <div className='image'>
        <img style={{maxWidth: '300px'}} {...image}/>
        {work.image && <div className='description green center'>Ny</div> || ''}
      </div>
      {work.image && <div className='image'>
        <img style={{maxWidth: '300px'}} src={work.image} alt={`Forside til ${work.title}`}/>
        <div className='description small center'>Eksisterende</div>
      </div> || ''}
    </div>
  );
}

PreviewImage.propTypes = {
  image: React.PropTypes.object,
  work: React.PropTypes.object
};

