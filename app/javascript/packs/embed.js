import $ from 'jquery';
import nanoid from 'nanoid';
import 'iframe-resizer';

$(document).ready(function() {
  $('.formsling-form-widget').each(function (i, link) {
    const id = `formsling-${nanoid()}`;
    const iframe = document.createElement('iframe');
    iframe.classList.add('formsling-iframe');
    iframe.setAttribute('src', link.href);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('id', id);
    link.parentNode.replaceChild(iframe, link);

    iFrameResize({ checkOrigin: false }, `#${id}`);
  });
});
