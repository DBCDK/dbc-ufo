import React from 'react';

export default function PreviewContainer({acceptedFiles, rejectedFiles, acceptedUrls, rejectedUrls}) {
  return (
    <div className="preview component">
      {acceptedUrls && <div className="urls-accepted">{acceptedUrls.map(AcceptedUrl)}</div> || ''}
      {rejectedUrls && <div className="urls-rejected">{rejectedUrls.map(RejectedUrl)}</div> || ''}
      {acceptedFiles && <div className="files-accepted">{acceptedFiles.map(AcceptedFile)}</div> || ''}
      {rejectedFiles && <div className="files-rejected">{rejectedFiles.map(RejectedFile)}</div> || ''}
    </div>
  );
}

PreviewContainer.propTypes = {
  acceptedFiles: React.PropTypes.array,
  acceptedUrls: React.PropTypes.array,
  rejectedFiles: React.PropTypes.array,
  rejectedUrls: React.PropTypes.array
};

function AcceptedFile(file) {
  return (
    <img style={{maxWidth: '300px'}} src={file.preview} alt={file.name}/>
  );
}

AcceptedFile.propTypes = {
  file: React.PropTypes.object
};


function RejectedFile(file) {
  return (<div className="rejected-file">Filen {file.name} kan ikke uploades</div>);
}

RejectedFile.propTypes = {
  file: React.PropTypes.object
};

function AcceptedUrl(url) {
  return (
    <img style={{maxWidth: '300px'}} src={url} alt={url}/>
  );
}

AcceptedUrl.propTypes = {
  url: React.PropTypes.string
};


function RejectedUrl(url) {
  return (<div className="rejected-url">Url'en {url} er ikke et billede</div>);
}

RejectedUrl.propTypes = {
  url: React.PropTypes.string
};
