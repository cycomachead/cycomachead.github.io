$('.js-search')
  .on('focus', function(){
    $(this).data('placeholder', $(this).attr('placeholder')); // Store for blur
    $(this).attr('placeholder', $(this).attr('title'));
  })
  .on('blur', function(){
    $(this).attr('placeholder', $(this).data('placeholder'));
  });