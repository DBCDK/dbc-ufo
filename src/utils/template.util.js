/**
 * Page template.
 *
 * @param content
 * @param year
 * @returns {string}
 */
export default function page(content = '<div id="content"></div>', script = '/js/index.js', className='', year = (new Date()).getFullYear()) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Image upload</title>
        <link rel="stylesheet" type="text/css" href="/css/index.css"/>
      </head>
      <body>
        <div class="main ${className}">
          <div id="topbar"></div>
          ${content}
          <div id="footer">
            <span><a href="/about">Om Upload af forsider</a></span>
            <span class="right">&copy; DBC a/s ${year}</span>
          </div>
          <script src="${script}"></script>
        </div>
      </body>
    </html>
  `;
}
