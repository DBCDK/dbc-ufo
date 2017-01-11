
/**
 * Poor mans image validation.
 *
 * Check if a url will load an image. Provides callbacks for success and error
 * @param url
 * @param onLoad
 * @param onError
 */
export default function validateImageUrl({url, onSuccess, onError}) {
  var image = new Image();
  image.onload = () => onSuccess(url);
  image.onerror = () => onError(url);
  image.src = url;
}
