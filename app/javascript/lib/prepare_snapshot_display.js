import $ from 'jquery';

// Used to make the result snapshot form fields read-only
const prepareSnapshotDisplay = () => $(document).ready(() => {
  const snapshot = $('.is-snapshot');

  $(':input, option', snapshot)
    .prop('readonly', true)
    .on('click change focus', (e) => {
      e.preventDefault();
    });

  $('select', snapshot).on('change', (e) => {
    e.preventDefault();
    const originalValue = $(e.target).data('value');
    $(e.target).val(originalValue);
  });
});

export default prepareSnapshotDisplay;
