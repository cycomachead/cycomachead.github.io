const $ = require('jquery');

$('.js-search')
  .on('focus', function onFocus() {
    $(this).data('placeholder', $(this).attr('placeholder')); // Store for blur
    $(this).attr('placeholder', $(this).attr('title'));
  })
  .on('blur', function onBlue() {
    $(this).attr('placeholder', $(this).data('placeholder'));
  });
