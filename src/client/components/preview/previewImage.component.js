import React from 'react';

export default function PreviewImage({image}) {
  return (
    <div className="preview-image component container">
      <div className='image'>
        <img style={{maxWidth: '300px'}} {...image}/>
      </div>
    </div>
  );
}

PreviewImage.propTypes = {
  image: React.PropTypes.object
};

