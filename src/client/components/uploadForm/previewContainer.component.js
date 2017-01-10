import React from 'react';

export default function PreviewContainer({acceptedFiles, rejectedFiles}) {
  return (
    <div className="preview component">
      <div className="files-accepted">{acceptedFiles.map(AcceptedFile)}</div>
      <div className="files-rejected">{rejectedFiles.map(RejectedFile)}</div>
    </div>
  );
}

PreviewContainer.propTypes = {
  acceptedFiles: React.PropTypes.array,
  rejectedFiles: React.PropTypes.array
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
