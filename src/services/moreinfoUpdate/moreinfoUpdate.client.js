/**
 * @file
 * Client for moreinfo update webservice
 */
import fs from 'fs';
import FormData from 'form-data';
import {promiseRequest} from '../../utils/request.util';
import {CONFIG} from '../../utils/config.util';
import escapeHtml from '../../utils/escapeHtml.util';
import {log} from 'dbc-node-logger';

/**
 * add image to post
 *
 * @param credentials
 * @param libraryCode
 * @param localId
 * @param imagePath
 * @returns {Promise<boolean>}
 */
export async function uploadImage(credentials, libraryCode, localId, imagePath) {
  const binaryData = await getBufferFromFile(imagePath);
  return makeRequest(credentials, libraryCode, localId, 'binary', binaryData);
}

/**
 * Add url to post.
 *
 * @param credentials
 * @param libraryCode
 * @param localId
 * @param url
 * @returns {boolean}
 */
export async function uploadUrl(credentials, libraryCode, localId, url) {
  return makeRequest(credentials, libraryCode, localId, 'url', escapeHtml(url));
}

/**
 * Creates a multipart POST request to moreinfoUpdate and send the request
 *
 * @param credentials
 * @param libraryCode
 * @param localId
 * @param dataType
 * @param data
 * @returns {Promise<boolean>}
 */
async function makeRequest(credentials, libraryCode, localId, dataType, data) {
  if (CONFIG.mock_externals.moreinfo_update) {
    return mockRequest(libraryCode, localId);
  }

  const form = new FormData();
  const attachmentInfo = {
    "authentication":{
      "groupId": credentials.agencyId,
      "password": credentials.passwordAut,
      "userId": credentials.userIdAut
    },
    "dataType": dataType,
    "category" : "coverImage",
    "recordId": localId,
    "agencyId": credentials.agencyId,
    "sourceId": libraryCode,
    "recordSize": data.length
  };
  form.append('attachmentInfo', JSON.stringify(attachmentInfo), {contentType: 'application/json'});
  form.append('data', data);
  const params = {
    url: CONFIG.moreinfo_update.uri,
    headers: form.getHeaders(),
    body: form
  }
  try {
    const {body, statusCode} = await promiseRequest('post', params);
    if (statusCode !== 200) {
      throw new Error('MoreinfoUpdate not responding, statusCode: ' + statusCode.toString());
    }
    const response = JSON.parse(body);
    if (response.error || response.result !== 'ok') {
      throw new Error(JSON.stringify(response));
    }
    return true;
  }
  catch (e) {
    log.error('Request to moreinfo update failed', {error: e.message, stack: e.stack, url: params.url});
    throw new Error(e);
  }
}

/**
 * Converts a file to base64 buffer.
 *
 * @param path
 * @returns {Promise}
 */
function getBufferFromFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        const encodedImage = new Buffer(data, 'binary').toString('base64');
        resolve(encodedImage);
        fs.unlink(path, (error) => {
          if (error) {
            log.warn('Could not delete file ' + path, error);
          }
        });
      }
    });
  });
}

/**
 * Mock calls to Moreinfo Update webservice
 * @param libraryCode
 * @param localId
 * @returns {boolean}
 */
function mockRequest(libraryCode, localId) {
  if (localId === '11111111') {
    throw new Error('Mock request throws error');
  }
  return true;
}
