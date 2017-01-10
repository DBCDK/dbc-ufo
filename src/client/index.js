/**
 * @file
 * Client side index file.
 */

import ReactDOM from 'react-dom';
import React from 'react';

// Components
import UploadFormContainer from './components/uploadForm/uploadFormContainer.component';

const rootContainer = document.getElementById('content');

ReactDOM.render(<UploadFormContainer />, rootContainer);
