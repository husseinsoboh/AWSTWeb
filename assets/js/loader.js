let scrollDurarion = 100;

jQuery(document).ready(function() {
    console.log("Document load ready!!");
    $('.navbar-nav li a').on('click', function() {
      console.log("click!!");
        $(this).parent().parent().find('.active').removeClass('active');
        $(this).parent().addClass('active');
    });

    $('a.thumb').click(function(event){
      event.preventDefault();
      var content = $('.modal-body');
      content.empty();
        var title = $(this).attr("title");
        $('.modal-title').html(title);        
        content.html($(this).html());
        $(".modal-profile").modal({show:true});
    });

    loadAmozonServices();

    loadAmazonAdvertising();

    loadMap();

    loadMap();
});

function loadAmozonServices(){
  // Load AWTS Services
  let list = [
    {id:0, name: 'Keyword research', description: 'Keyword research desc'},
    {id:1, name: 'Amazon storefont Design', description: 'Amazon storefont Design desc'},
    {id:2, name: 'Cataloging', description: 'Cataloging desc'},
    {id:3, name: 'Imaging', description: 'Imaging desc'},
    {id:4, name: 'Training', description: 'Training desc'},
    {id:5, name: 'Translation', description: 'Translation desc'},
    {id:6, name: 'Accounting', description: 'Accounting desc'},
  ];
  
  let div = "";
  let divMenu = "";

  for(let i=0; i<list.length; i++){
    let elem = list[i];
    let classActive = i == 0 ? 'active' : '';
    //let classActive = (i == Math.round(list.length/2)) ? 'active' : '';
    //div += "<div class='carousel-item col-12 col-sm-6 col-md-4 col-lg-3 align-middle servicesCss "+classActive+"'>"+elem.name+"</div>";

    divMenu += '<li><a class="dropdown-item py-2" href="#services">'+elem.name+'</a></li>';
    div += '<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-4 '+classActive+'"><div class="panel panel-default"><div class="panel-thumbnail cl-effect-15"><a href="#" class="thumb" data-hover="'+elem.name+'">'+elem.name+'</a></div></div></div>';
    //console.log(elem.name);
  }

  document.getElementById("amazon-services-menu-list").innerHTML = divMenu;
  document.getElementById("amazon-services-list").innerHTML = div;

  amazonServicesEvents();
}

function amazonServicesEvents(){
  $('#amazon-services-prev').click(function() {
    $('#amazon-services-carousel').carousel('prev');
  });
    
  $('#amazon-services-next').click(function() {
    $('#amazon-services-carousel').carousel('next');
  });

  // interval is in milliseconds. 1000 = 1 second -> so 1000 * 10 = 10 seconds
  $('#amazon-services-carousel').carousel({
    interval: 1000 * scrollDurarion
  });

  /*
      Carousel make slider circle
  */
  $('#amazon-services-carousel').on('slide.bs.carousel', function (e) {
      /*
          CC 2.0 License Iatek LLC 2018
          Attribution required
      */
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 5;
      var totalItems = $('.carousel-item').length;
      
      if (idx >= totalItems-(itemsPerSlide-1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i=0; i<it; i++) {
              // append slides to end
              if (e.direction=="left") {
                  $('.carousel-item').eq(i).appendTo('.carousel-inner');
              }
              else {
                  $('.carousel-item').eq(0).appendTo('.carousel-inner');
              }
          }
      }
  });

  /*
    Wow
  */
  //new WOW().init();
}

function loadAmazonAdvertising(){
  // Load AWTS Services
  let list = [
    {id:0, name: 'Sponsored products/Brands', description: 'Description', image:"assets/img/payment.png"},
    {id:1, name: 'Promotions', description: 'Description', image:"assets/img/customizable.png"},
    {id:2, name: 'Deals', description: 'Description', image:"assets/img/concept.png"},
    {id:3, name: 'Coupons', description: 'Description', image:"assets/img/payment.png"},
    {id:4, name: 'Emails Marketing Campaigns', description: 'Description', image:"assets/img/customizable.png"},
    {id:5, name: 'E-Gifts', description: 'Description', image:"assets/img/concept.png"},
  ];

  let div = "";
  let divMenu = "";

  for(let i=0; i<list.length; i++){
    let elem = list[i];

    divMenu += '<li><a class="dropdown-item py-2" href="#services">'+elem.name+'</a></li>';
    div += '<div class="col-md-6 col-lg-4 py-3 wow fadeInLeft"><div class="card card-body border-0 text-center shadow pt-5 cardCss"><div class="svg-icon mx-auto mb-4"><img src="'+elem.image+'" alt=""></div><h5 class="headerPanel">'+elem.name+'</h5><p class="textPanel mt-4">'+elem.description+'</p></div></div>';
    //console.log(elem.name);
  }

  document.getElementById("amazon-advertising-menu-list").innerHTML = divMenu;
  document.getElementById("amazon-advertising-list").innerHTML = div;

}

$('#carouselExample').on('slide.bs.carousel', function (e) {
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 4;
  var totalItems = $('.carousel-item').length;
  
  if (idx >= totalItems-(itemsPerSlide-1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i=0; i<it; i++) {
          // append slides to end
          if (e.direction=="left") {
              $('.carousel-item').eq(i).appendTo('.carousel-inner');
          }
          else {
              $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
      }
  }
});


$('#carouselExample').carousel({ 
  interval: 2000
});


