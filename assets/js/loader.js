$(document).ready(function () {
  console.log("Document load ready!!");
  $('.navbar-nav li a').on('click', function() {
    console.log("click!!");
      $(this).parent().parent().find('.active').removeClass('active');
      $(this).parent().addClass('active');
  });

  // Load AWTS Services
  let tab = [{id:0, name: 'Keyword research', descroption: 'Keyword research desc'},
    {id:1, name: 'Amazon storefont Design', descroption: 'Amazon storefont Design desc'},
    {id:2, name: 'Cataloging', descroption: 'Cataloging desc'},
    {id:3, name: 'Imaging', descroption: 'Imaging desc'},
    {id:4, name: 'Training', descroption: 'Training desc'},
    {id:5, name: 'Translation', descroption: 'Translation desc'},
    {id:6, name: 'Accounting', descroption: 'Accounting desc'},
  ];




  
});