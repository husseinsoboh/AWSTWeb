let scrollDurarion = 10000;

let language = "en";

jQuery(document).ready(function () {
  console.log("Document load ready!!");

  language = getUrlVars()["lang"];
  console.log(language);

  changeLang(language);

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

  //loadPortfolio();

  loadMap();
});

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value;
    }
  );
  console.log(vars);
  return vars;
}

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
    color: "#ffffff",
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

var fnsuccesscallback = function (data) {
  alert(data);
};

function loadAmozonServices() {
  console.log("===============");
  console.log(language);
  /*
  $.ajax({
    url: SERVER_API + GET_AWTS_SERVICES,
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log(res);
    },
    error: function (jqXhr, textStatus, errorMessage) {
      // error callback
      console.log("textStatus: " + textStatus);
      console.log("Error: " + errorMessage);
      console.log(jqXhr);
    },
  });
   */

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

  let textAlignClass = "";
  if (language == "ar") {
    textAlignClass = "textAlignRTL";
  }

  for (let i = 0; i < list.length; i++) {
    let elem = list[i];

    divMenu +=
      '<a class="dropdown-item py-2 ' +
      textAlignClass +
      '" href="#services">' +
      elem.name +
      "</a>";

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
      image: "assets/images/advertising/sponsoredproduct.svg",
    },
    {
      id: 1,
      name: "Promotions",
      description: "Description",
      image: "assets/images/advertising/promotions.svg",
    },
    {
      id: 2,
      name: "Deals",
      description: "Description",
      image: "assets/images/advertising/deals.svg",
    },
    {
      id: 3,
      name: "Coupons",
      description: "Description",
      image: "assets/images/advertising/coupons.svg",
    },
    {
      id: 4,
      name: "Emails Marketing Campaigns",
      description: "Description",
      image: "assets/images/advertising/emailmarketingcampaigns.svg",
    },
    {
      id: 5,
      name: "E-Gifts",
      description: "Description",
      image: "assets/images/advertising/e-gifts.svg",
    },
  ];

  let div = "";
  let divMenu = "";

  let textAlignClass = "";
  if (language == "ar") {
    textAlignClass = "textAlignRTL";
  }

  for (let i = 0; i < list.length; i++) {
    let elem = list[i];

    divMenu +=
      '<a class="dropdown-item py-2 ' +
      textAlignClass +
      '" href="#services">' +
      elem.name +
      "</a>";

    div += '<div class="col-md-6 col-lg-4 py-3 wow fadeInLeft">';
    div +=
      '<div class="amazonAdvBlockCss card card-body border-0 text-center shadow pt-1 cardCss">';
    div += '<div class="amazonAdvDivCss svg-icon mx-auto mb-4">';
    div +=
      '<img class=""advertisingimage src="' +
      elem.image +
      '" style="height: 120px;" alt="">';
    div += "</div>";
    div +=
      '<h5 class="advertisingTitleCss">' +
      elem.name +
      '</h5></div>';
    div += "</div>";
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

  /*
    $('img[src$=".svg"]').each(function() {
      var $img = jQuery(this);
      var imgURL = $img.attr('src');
      var attributes = $img.prop("attributes");

      $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Remove any invalid XML tags
          $svg = $svg.removeAttr('xmlns:a');

          // Loop through IMG attributes and apply on SVG
          $.each(attributes, function() {
              $svg.attr(this.name, this.value);
          });

          // Replace IMG with SVG
          $img.replaceWith($svg);
      }, 'xml');
  });
  */
}

function changeLang(lang) {
  $("[data-localize]").localize("assets/js/lang/lang", { language: lang });

  document.getElementById("amazon-services-menu-list").innerHTML = "";
  document.getElementById("amazon-services-carousel").innerHTML = "";

  document.getElementById("amazon-advertising-menu-list").innerHTML = "";
  document.getElementById("amazon-advertising-list").innerHTML = "";

  document.getElementById("amazon-advertising-menu-list").innerHTML = "";
  document.getElementById("amazon-advertising-list").innerHTML = "";

  language = lang;

  let dir = "ltr";
  let classList = "directionLTR";
  let navBarClass = "floatLeft";

  if (lang == "ar") {
    dir = "rtl";
    classList = "directionRTL";
    $("#whatsappImgId").removeClass("whatsapp");
    $("#whatsappImgId").addClass("whatsapp-rtl");
    navBarClass = "floatLeft";
    $(".menuTopClass").addClass("menuTopRTL");

    $("#phoneMockupId").attr("src", "assets/images/phone-mockup-ar.png");
    $("#phoneMockupId").attr("style", "height:450px; float: left");

    if ($("#portfolioImgId") != null) {
      $("#portfolioImgId").attr(
        "src",
        "assets/images/portfolio/portfolio-ar.png"
      );
    }
  } else {
    dir = "ltr";
    classList = "directionLTR";
    $("#whatsappImgId").removeClass("whatsapp-rtl");
    $("#whatsappImgId").addClass("whatsapp");
    navBarClass = "floatRight";
    $(".menuTopClass").removeClass("menuTopRTL");

    $("#phoneMockupId").attr("src", "assets/images/phone-mockup-en.png");
    $("#phoneMockupId").attr("style", "height:450px; float: right");

    if ($("#portfolioImgId") != null) {
      $("#portfolioImgId").attr(
        "src",
        "assets/images/portfolio/portfolio-en.png"
      );
    }
  }
  console.log(lang, dir, classList);

  $(".rtlClass").removeClass("directionLTR");
  $(".rtlClass").removeClass("directionRTL");
  $(".rtlClass").addClass(classList);

  $("#navBar").removeClass("floatLeft");
  $("#navBar").removeClass("floatRight");
  $("#navBar").addClass(navBarClass);

  //$("html").children().css("direction", dir);
  //$("html").children().css("text-align", "right");

  $("#whatWeDoDivId").css("direction", dir);

  /*
  loadAmozonServices();

  loadAmazonAdvertising();

  loadPortfolio();
  */
}

function reloadPage(lang) {
  //$("#amazon-services-carousel").trigger("refresh.owl.carousel");
  console.log(location.origin + location.pathname + "?lang=" + lang);

  if (lang != language)
    window.location.href =
      location.origin + location.pathname + "?lang=" + lang;
}
