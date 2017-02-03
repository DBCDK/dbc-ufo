import React from 'react';

function stateFromStatus(status) {
  const states = {
    ready: {icon: 'ready', description: 'Klar til upload'},
    'ready-double-image': {icon: 'ready', description: 'Klar til upload'},
    'wait-for-work': {icon: 'spinner', description: 'Henter titel'},
    'error-no-id': {icon: 'fail', description: 'Mangler ID'},
    'error-invalid-id': {icon: 'error', description: 'Ugyldigt ID'},
    'error-invalid-image': {icon: 'error', description: 'Ugyldigt billede'},
    'error-invalid-url': {icon: 'error', description: 'Ugyldig URL'},
    'error-no-work': {icon: 'error', description: 'Ugyldigt ID'},
    'upload-waiting': {icon: 'pause', description: 'Venter'},
    'upload-started': {icon: 'spinner', description: 'Uploader'},
    'done-ok': {icon: 'done', description: 'Uploadet'},
    'done-error': {icon: 'error', description: 'Fejl i upload'}
  };

  const defaultState = {icon: 'unkown', description: 'Ukendt Status'};

  return states[status] || defaultState;
}

export default function PreviewStatus({status}) {
  const {icon, description} = stateFromStatus(status);
  return (
    <div className="preview-status">
      <div className="icon-wrapper">
        <span className={`icon ${icon}`}/>
      </div>
      <div className="description">
        {description}
      </div>
    </div>
  );
}

PreviewStatus.propTypes = {
  status: React.PropTypes.string
};
