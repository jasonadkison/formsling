import $ from 'jquery';

$(document).ready(function() {
  var iframe;
  $('.formsling-form-widget').each(function (i, link) {
    iframe = document.createElement('iframe');
    iframe.classList.add('formsling-iframe');
    iframe.setAttribute('src', link.href);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'yes');
    link.parentNode.replaceChild(iframe, link);
  });
});
