let scrollDurarion = 10000;

jQuery(document).ready(function () {
  console.log("Document load ready!!");

  changeLang("en");

  $(".navbar-nav li a").on("click", function () {
    console.log("click!!");
    $(this).parent().parent().find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });

  $("a.thumb").click(function (event) {
    event.preventDefault();
    var content = $(".modal-body");
    content.empty();
    var title = $(this).attr("title");
    $(".modal-title").html(title);
    content.html($(this).html());
    $(".modal-profile").modal({ show: true });
  });

  waveLoader();

  loadAmozonServices();

  loadAmazonAdvertising();

  loadMap();

  loadPortfolio();
});

function waveLoader() {
  var headerWaveTop = $("#header-wave-top").wavify({
    // Height of wave
    height: 80,
    // Total number of articulation in wave
    bones: 4,
    // Amplitude of wave
    amplitude: 50,
    // Color
    color: "#61C4F3",
    // Animation speed
    speed: 0.15,
  });

  var headerWaveBottom = $("#header-wave-bottom").wavify({
    height: 60,
    bones: 4,
    amplitude: 50,
    color: "#E6E6E6",
    speed: 0.25,
  });

  var footerWaveTop = $("#footer-wave-top").wavify({
    // Height of wave
    height: 80,
    // Total number of articulation in wave
    bones: 4,
    // Amplitude of wave
    amplitude: 50,
    // Color
    color: "#61C4F3",
    // Animation speed
    speed: 0.15,
  });

  var footerWaveBottom = $("#footer-wave-bottom").wavify({
    height: 60,
    bones: 4,
    amplitude: 50,
    color: "#E6E6E6",
    speed: 0.25,
  });
}

function loadAmozonServices() {
  // Load AWTS Services
  let list = [
    { id: 0, name: "Keyword research", description: "Keyword research desc" },
    {
      id: 1,
      name: "Amazon storefont Design",
      description: "Amazon storefont Design desc",
    },
    { id: 2, name: "Cataloging", description: "Cataloging desc" },
    { id: 3, name: "Imaging", description: "Imaging desc" },
    { id: 4, name: "Training", description: "Training desc" },
    { id: 5, name: "Translation", description: "Translation desc" },
    { id: 6, name: "Accounting", description: "Accounting desc" },
  ];

  let div = "";
  let divMenu = "";

  for (let i = 0; i < list.length; i++) {
    let elem = list[i];

    divMenu +=
      '<li><a class="dropdown-item py-2" href="#services">' +
      elem.name +
      "</a></li>";

    div += '<div class="item owlCarouselCss">' + elem.name + "</div>";

    //console.log(elem.name);
  }
  console.log(div);
  document.getElementById("amazon-services-menu-list").innerHTML = divMenu;
  document.getElementById("amazon-services-carousel").innerHTML = div;

  $("#amazon-services-carousel").owlCarousel({
    items: 3,
    center: true,
    nav: false,
    dots: false,
    loop: true,
  });

  $("#amazon-services-prev").click(function () {
    $("#amazon-services-carousel").owlCarousel("prev");
  });

  $("#amazon-services-next").click(function () {
    $("#amazon-services-carousel").owlCarousel("next");
  });
}

function loadPortfolio() {
  /*
  $("#portfolio-carousel").carousel({
    interval: 1000 * scrollDurarion,
    keyboard: false,
    pause: "hover",
    ride: true,
    wrap: true
  });

  $("#portfolio-prev").click(function () {
    $("#portfolio-carousel").carousel("prev");
  });

  $("#portfolio-next").click(function () {
    $("#portfolio-carousel").carousel("next");
  });

  $("#portfolio-carousel").swipe({
    swipe: function (
      event,
      direction,
      distance,
      duration,
      fingerCount,
      fingerData
    ) {
      if (direction == "left") $("#portfolio-carousel").carousel("next");
      if (direction == "right") $("#portfolio-carousel").carousel("prev");
    },
    allowPageScroll: "vertical",
  });
  */

  $("#portfolio-carousel").owlCarousel({
    nav: true, // Show next and prev buttons
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    rewindNav: true,
    loop: true,
    autoplay: true,
    dots: true,

    slideSpeed: 300,
    paginationSpeed: 400,
    lazyLoad: true,
    items: 1,
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false,
  });
}

function loadAmazonAdvertising() {
  // Load AWTS Services
  let list = [
    {
      id: 0,
      name: "Sponsored products/Brands",
      description: "Description",
      image: "assets/img/payment.png",
    },
    {
      id: 1,
      name: "Promotions",
      description: "Description",
      image: "assets/img/customizable.png",
    },
    {
      id: 2,
      name: "Deals",
      description: "Description",
      image: "assets/img/concept.png",
    },
    {
      id: 3,
      name: "Coupons",
      description: "Description",
      image: "assets/img/payment.png",
    },
    {
      id: 4,
      name: "Emails Marketing Campaigns",
      description: "Description",
      image: "assets/img/customizable.png",
    },
    {
      id: 5,
      name: "E-Gifts",
      description: "Description",
      image: "assets/img/concept.png",
    },
  ];

  let div = "";
  let divMenu = "";

  for (let i = 0; i < list.length; i++) {
    let elem = list[i];

    divMenu +=
      '<li><a class="dropdown-item py-2" href="#services">' +
      elem.name +
      "</a></li>";
    div +=
      '<div class="col-md-6 col-lg-4 py-3 wow fadeInLeft"><div class="amazonAdvBlockCss card card-body border-0 text-center shadow pt-5 cardCss"><div class="amazonAdvDivCss svg-icon mx-auto mb-4"><img src="' +
      elem.image +
      '" alt=""></div><h5 class="headerPanel">' +
      elem.name +
      '</h5><p class="textPanel mt-4">' +
      elem.description +
      "</p></div></div>";
    //console.log(elem.name);
  }

  document.getElementById("amazon-advertising-menu-list").innerHTML = divMenu;
  document.getElementById("amazon-advertising-list").innerHTML = div;

  $(".amazonAdvDivCss")
    .mouseenter(function () {
      $(this).children("img").addClass("amazonAdvImgCss");
    })
    .mouseleave(function () {
      $(this).children("img").removeClass("amazonAdvImgCss");
    });
}

function changeLang(lang) {
  let dir = "ltr";
  if (lang == "en") {
    dir = "ltr";
  } else {
    dir = "rtl";
  }
  console.log(lang, dir);
  $("html").children().css("direction", dir);

  $("[data-localize]").localize("assets/js/lang/lang", { language: lang });
}
