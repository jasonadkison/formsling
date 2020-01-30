import $ from 'jquery';

$(document).ready(() => {
  $('.notification button.delete').on('click', (e) => $(e.target).closest('.notification').hide());
});
