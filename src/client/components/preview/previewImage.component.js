import React from 'react';

export default function PreviewImage({file, id, message, onRemove}) {
  return (
    <div className="preview-image component container">
      {message && <div className="message">${message}</div>}
      <div className='image'>
        <img style={{maxWidth: '300px'}} src={file.preview} alt={file.name}/>
      </div>
      <IdForm value={id}/>
      <WorkPreview {...{
        image: 'https://www.colourbox.dk/preview/2582621-white-horses-grazing-on-ranch.jpg',
        title: 'Titel',
        creator: 'Ophav',
        type: 'Materiale type',
        isbn: 'ISBN'
      }}/>
      <RemovePreview onClick={onRemove}/>
    </div>
  );
}

PreviewImage.propTypes = {
  file: React.PropTypes.object,
  id: React.PropTypes.string,
  message: React.PropTypes.string,
  onRemove: React.PropTypes.func
};

function IdForm({value, onSubmit}) {
  return (
    <div className="id-form">
      <label htmlFor="id">ID</label>
      <input id="id" type="text" name="id" value={value}/>
      <button onClick={onSubmit}>Opdater</button>
    </div>
  );
}
IdForm.propTypes = {
  value: React.PropTypes.string,
  onSubmit: React.PropTypes.func
};

function WorkPreview({image, title, creator, type, isbn}) {
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


function RemovePreview({onClick}) {
  return (<button onClick={onClick}>Fortryd Upload</button>);
}
RemovePreview.propTypes = {
  onClick: React.PropTypes.func
};


