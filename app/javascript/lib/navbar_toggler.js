import $ from 'jquery';

$(document).ready(function() {
  // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
  const toggleNavbar = () => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  };

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(toggleNavbar);

  $('nav.navbar .navbar-item').on('click', toggleNavbar);
});
