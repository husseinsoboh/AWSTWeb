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

  let list = [
    { id: 0, TitleEn: "Keyword research", DescriptionEn: "Keyword research desc", TitleAr: "Keyword research", DescriptionAr: "Keyword research desc" },
    {
      id: 1,
      TitleEn: "Amazon storefont Design for AWTS project",
      DescriptionEn: "Amazon storefont Design desc",
      TitleAr: "Amazon storefont Design for AWTS project",
      DescriptionAr: "Amazon storefont Design desc",
    },
    { id: 2, TitleEn: "Cataloging", DescriptionEn: "Cataloging desc", TitleAr: "Cataloging", DescriptionAr: "Cataloging desc"  },
    { id: 3, TitleEn: "Imaging", DescriptionEn: "Imaging desc", TitleAr: "Imaging", DescriptionAr: "Imaging desc" },
    { id: 4, TitleEn: "Training", DescriptionEn: "Training desc", TitleAr: "Training", DescriptionAr: "Training desc" },
    { id: 5, TitleEn: "Translation", DescriptionEn: "Translation desc", TitleAr: "Translation", DescriptionAr: "Translation desc" },
    { id: 6, TitleEn: "Accounting", DescriptionEn: "Accounting desc", TitleAr: "Accounting", DescriptionAr: "Accounting desc" },
  ];

  $.ajax({
    url: SERVER_API + GET_AWTS_SERVICES,
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log("INNNNNNNNN");
      console.log(res);

      list = res;

      drawServices(list);
    },
    error: function (jqXhr, textStatus, errorMessage) {
      // error callback
      console.log("textStatus: " + textStatus);
      console.log("Error: " + errorMessage);
      console.log(jqXhr);

      drawServices(list);
    },
  });
}

function drawServices(list) {
  let div = "";
  let divMenu = "";

  let textAlignClass = "";
  if (language == "ar") {
    textAlignClass = "textAlignRTL";
  }

  for (let i = 0; i < list.length; i++) {
    let elem = list[i];
    console.log(elem);

    let title = language == "en" ? elem.TitleEn : elem.TitleAr;

    divMenu +=
      '<a class="dropdown-item py-2 ' +
      textAlignClass +
      '" href="#services">' +
      title +
      "</a>";

    div += '<div class="item owlCarouselCss">' + title + "</div>";

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

/*
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
*/

function loadAmazonAdvertising() {
  // Load AWTS Services
  let list = [
    {
      id: 0,
      TitleEn: "Sponsored products/Brands",
      DescriptionEn: "Description",
      TitleAr: "Sponsored products/Brands",
      DescriptionAr: "Description",
      image: "assets/images/advertising/sponsoredproduct.svg",
    },
    {
      id: 1,
      TitleEn: "Promotions",
      DescriptionEn: "Description",
      TitleAr: "Promotions",
      DescriptionAr: "Description",
      image: "assets/images/advertising/promotions.svg",
    },
    {
      id: 2,
      TitleEn: "Deals",
      DescriptionEn: "Description",
      TitleAr: "Deals",
      DescriptionAr: "Description",
      image: "assets/images/advertising/deals.svg",
    },
    {
      id: 3,
      TitleEn: "Coupons",
      DescriptionEn: "Description",
      TitleAr: "Coupons",
      DescriptionAr: "Description",
      image: "assets/images/advertising/coupons.svg",
    },
    {
      id: 4,
      TitleEn: "Emails Marketing Campaigns",
      DescriptionEn: "Description",
      TitleAr: "Emails Marketing Campaigns",
      DescriptionAr: "Description",
      image: "assets/images/advertising/emailmarketingcampaigns.svg",
    },
    {
      id: 5,
      TitleEn: "E-Gifts",
      DescriptionEn: "Description",
      TitleAr: "E-Gifts",
      DescriptionAr: "Description",
      image: "assets/images/advertising/e-gifts.svg",
    },
  ];

  console.log(SERVER_API + GET_ADVERTISING);

  $.ajax({
    url: SERVER_API + GET_ADVERTISING,
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log("INNNNNNNNN");
      console.log(res);

      list = res;

      drawAdvertising(list);
    },
    error: function (jqXhr, textStatus, errorMessage) {
      // error callback
      console.log("textStatus: " + textStatus);
      console.log("Error: " + errorMessage);
      console.log(jqXhr);

      drawAdvertising(list);
    },
  });
}

function drawAdvertising(list) {
  let div = "";
  let divMenu = "";

  let textAlignClass = "";
  if (language == "ar") {
    textAlignClass = "textAlignRTL";
  }

  for (let i = 0; i < list.length; i++) {
    let elem = list[i];

    let title = language == "en" ? elem.TitleEn : elem.TitleAr;

    divMenu +=
      '<a class="dropdown-item py-2 ' +
      textAlignClass +
      '" href="#services">' +
      title +
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
    div += '<h5 class="advertisingTitleCss">' + title + "</h5></div>";
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
    $("#videoSrc").attr("src", "assets/video/awts-home-ar.mp4");

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
    $("#videoSrc").attr("src", "assets/video/awts-home-en.mp4");

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

  $("#whatWeDoDivId").css("direction", dir);
}

function reloadPage(lang) {
  console.log(location.origin + location.pathname + "?lang=" + lang);

  if (lang != language)
    window.location.href =
      location.origin + location.pathname + "?lang=" + lang;
}
