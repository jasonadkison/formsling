import $ from 'jquery';

$(document).ready(function() {
  var iframe;
  $('.formsling-form-widget').each(function (i, link) {
    iframe = document.createElement('iframe');
    iframe.setAttribute('src', link.href);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'yes');
    link.parentNode.replaceChild(iframe, link);
  });
});
