let scrollDurarion = 10000;

let language = "en";

let activeModal = false;

let isMobile = false;

jQuery(document).ready(function () {
  window.addEventListener("resize", resizePage);
  resizePage();

  console.log("Document load ready!!");

  $("[data-hide]").on("click", function () {
    $(this)
      .closest("." + $(this).attr("data-hide"))
      .hide();
  });

  language = getUrlVars()["lang"];
  console.log(language);

  changeLang(language);

  $(".navbar-nav li a").on("click", function () {
    console.log("click!!");
    //$(this).parent().parent().find(".active").removeClass("active");
    //$(this).parent().addClass("active");
    console.log(this);

    $("#navbar-hamburger").toggleClass("hidden");
    $("#navbar-close").toggleClass("hidden");
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

  AOS.init({
    duration: 1200,
  });

  setTimeout(function () {
    document.getElementById("welcomeDivLetsAmazon").style.display = "none";
  }, 5000);

  $("#contact").on("submit", function (e) {
    e.preventDefault();
    //ajax code here

    sendContact();
  });
});

function resizePage() {
  let gridMobileRowColumn = document.getElementsByClassName(
    "gridMobileRowColumn"
  );
  let showHideImagesMobile = document.getElementsByClassName(
    "showHideImagesMobile"
  );

  if (window.matchMedia("(max-width: 500px)").matches) {
    if (document.getElementById("videoDivId") != null) {
      document
        .getElementById("videoDivId")
        .classList.add("slider-revoluation-mobile");
    }
  } else {
    if (document.getElementById("videoDivId") != null) {
      document
        .getElementById("videoDivId")
        .classList.remove("slider-revoluation-mobile");
    }
  }

  if (window.matchMedia("(max-width: 1000px)").matches) {
    // The viewport is less than 768 pixels wide
    console.log("This is a mobile device.");
    isMobile = true;

    if (document.getElementById("navBarMobile") != null)
      document.getElementById("navBarMobile").style.visibility = "visible";
    if (document.getElementById("navBarWeb") != null)
      document.getElementById("navBarWeb").style.visibility = "hidden";

    for (let i = 0; i < gridMobileRowColumn.length; i++) {
      let elem = gridMobileRowColumn[i];
      elem.classList.remove("row");
      elem.classList.add("column");
    }

    for (let i = 0; i < showHideImagesMobile.length; i++) {
      let elem = showHideImagesMobile[i];
      elem.style.display = "none";
    }

    let elems = document.getElementsByClassName("card-container");
    for (let i = 0; i < elems.length; i++) {
      let elem = elems[i];
      elem.classList.add("card-container-mobile");
    }

    let elemsModal = document.getElementsByClassName("modal-dialog");
    for (let i = 0; i < elemsModal.length; i++) {
      let elem = elemsModal[i];
      elem.classList.add("modal-dialog-margin-mobile");
    }
  } else {
    // The viewport is at least 768 pixels wide
    console.log("This is a tablet or desktop.");
    isMobile = false;

    if (document.getElementById("navBarMobile") != null)
      document.getElementById("navBarMobile").style.visibility = "hidden";
    if (document.getElementById("navBarWeb") != null)
      document.getElementById("navBarWeb").style.visibility = "visible";

    for (let i = 0; i < gridMobileRowColumn.length; i++) {
      let elem = gridMobileRowColumn[i];
      elem.classList.remove("column");
      elem.classList.add("row");
    }

    for (let i = 0; i < showHideImagesMobile.length; i++) {
      let elem = showHideImagesMobile[i];
      elem.style.display = "block";
    }

    let elems = document.getElementsByClassName("card-container");
    for (let i = 0; i < elems.length; i++) {
      let elem = elems[i];
      elem.classList.remove("card-container-mobile");
    }

    let elemsModal = document.getElementsByClassName("modal-dialog");
    for (let i = 0; i < elemsModal.length; i++) {
      let elem = elemsModal[i];
      elem.classList.remove("modal-dialog-margin-mobile");
    }
  }
}

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
    amplitude: 20,
    // Color
    color: "#61C4F3",
    // Animation speed
    speed: 0.15,
  });

  var headerWaveBottom = $("#header-wave-bottom").wavify({
    height: 80,
    bones: 3,
    amplitude: 30,
    color: "#ffffff",
    speed: 0.15,
  });

  var footerWaveTop = $("#footer-wave-top").wavify({
    // Height of wave
    height: 80,
    // Total number of articulation in wave
    bones: 4,
    // Amplitude of wave
    amplitude: 30,
    // Color
    color: "#61C4F3",
    // Animation speed
    speed: 0.15,
  });

  var footerWaveBottom = $("#footer-wave-bottom").wavify({
    height: 80,
    bones: 3,
    amplitude: 30,
    color: "#E6E6E6",
    speed: 0.15,
  });
}

function loadAmozonServices() {
  console.log("===============");
  console.log(language);

  drawServices(listServices);

  /*
  $.ajax({
    url: SERVER_API + GET_AWTS_SERVICES,
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log("INNNNNNNNN");
      console.log(res);

      listServices = res;

      drawServices(listServices);
    },
    error: function (jqXhr, textStatus, errorMessage) {
      // error callback
      console.log("textStatus: " + textStatus);
      console.log("Error: " + errorMessage);
      console.log(jqXhr);

      drawServices(listServices);
    },
  });
  */
}

function drawServices(list) {
  document.getElementById("divMainServices").style.display = "block";
  document.getElementById("spinnerServices").style.display = "none";

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
    let description =
      language == "en" ? elem.DescriptionEn : elem.DescriptionAr;

    divMenu +=
      '<a class="dropdown-item py-2 ' +
      textAlignClass +
      '" href="#services" onclick="setActiveService(' +
      i +
      ')">' +
      title +
      "</a>";

    div +=
      "<div class='item owlCarouselCss'>" +
      title +
      "<div class='btnParent'>" +
      "<button class='buttonHover' onclick='showService(" +
      i +
      ")'>Learn more</button>" +
      "</div>" +
      "</div>";
  }

  console.log(div);
  if (document.getElementById("amazon-services-mobile-menu-list") != null)
    document.getElementById("amazon-services-mobile-menu-list").innerHTML =
      divMenu;
  if (document.getElementById("amazon-services-menu-list") != null)
    document.getElementById("amazon-services-menu-list").innerHTML = divMenu;
  if (document.getElementById("amazon-services-carousel") != null) {
    document.getElementById("amazon-services-carousel").innerHTML = div;

    $("#amazon-services-carousel").owlCarousel({
      center: true,
      nav: false,
      dots: true,
      loop: true,
      animateOut: "slideOutDown",
      animateIn: "flipInX",
      responsiveClass: true,
      responsiveRefreshRate: 200,
      responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 1,
        },
        769: {
          items: 1,
        },
        900: {
          items: 3,
        },
      },
    });

    $("#amazon-services-prev").click(function () {
      $("#amazon-services-carousel").owlCarousel("prev");
    });

    $("#amazon-services-next").click(function () {
      $("#amazon-services-carousel").owlCarousel("next");
    });

    $("#amazon-services-carousel").click(function () {
      console.log("click");
      activeModal = true;
    });

    $("#myModal").on("hidden.bs.modal", function () {
      console.log("myModal close");
      activeModal = false;
    });
  }
}

function setActiveService(index) {
  console.log(index);
  $("#amazon-services-carousel").trigger("to.owl.carousel", index);
}

function showService(index) {
  console.log("showService");
  let elem = listServices[index];
  let title = language == "en" ? elem.TitleEn : elem.TitleAr;
  let description = language == "en" ? elem.DescriptionEn : elem.DescriptionAr;

  setTimeout(function () {
    if (activeModal) {
      console.log(title + "  XXX " + description);

      document.getElementById("myModalTitle").innerHTML = title;
      document.getElementById("myModalDescription").innerHTML = description;

      $("#myModal").modal();
    }
  }, 500);
}

function loadAmazonAdvertising() {
  // Load AWTS Services

  drawAdvertising(listAdvertising);
  console.log(SERVER_API + GET_ADVERTISING);

  /*
  $.ajax({
    url: SERVER_API + GET_ADVERTISING,
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log("INNNNNNNNN");
      console.log(res);

      listAdvertising = res;

      drawAdvertising(listAdvertising);
    },
    error: function (jqXhr, textStatus, errorMessage) {
      // error callback
      console.log("textStatus: " + textStatus);
      console.log("Error: " + errorMessage);
      console.log(jqXhr);

      drawAdvertising(listAdvertising);
    },
  });
  */
}

function drawAdvertising(list) {
  document.getElementById("spinnerAdvertising").style.display = "none";

  let div = "";
  let divMenu = "";

  console.log(language);

  let textAlignClass = "";
  if (language == "ar") {
    textAlignClass = "textAlignRTL";
  }

  console.log(list);

  for (let i = 0; i < list.length; i++) {
    let elem = list[i];

    let title = language == "en" ? elem.TitleEn : elem.TitleAr;
    let description =
      language == "en" ? elem.DescriptionEn : elem.DescriptionAr;

    divMenu +=
      '<a class="dropdown-item py-2 ' +
      textAlignClass +
      '" href="#' +
      i +
      '">' +
      title +
      "</a>";

    let cardContainerCss = isMobile ? "card-container-mobile" : "";

    let type = getType(elem.Extension);
    console.log(type);
    elem.Logo = "data:image/" + type + ";base64," + elem.Logo;
    //console.log(elem.Logo);

    div +=
      '<div id="' +
      i +
      '"' +
      ' onclick="onClickAdvertising(' +
      i +
      ')"' +
      ' onblur="onLostFocusAdvertising(' +
      i +
      ')"' +
      ' class="card-container ' +
      cardContainerCss +
      ' col-sm-12 col-lg-3">';
    div += '<div class="card"><a>';
    div += '<div class="card--display">';
    div +=
      '<img class="" src="' +
      elem.Logo +
      '" style="width: 100%; height: 120px;" alt="">';
    div += "<h2>" + title + "</h2></div>";
    div += '<div class="card--hover">';
    div +=
      '<img id="imgAdv' +
      i +
      '" class="" src="' +
      elem.Logo +
      '" style="width: 100%; height: 120px;" alt="">';
    div += "<h2>" + title + "</h2>";

    if (description != "")
      div +=
        "<span class='descriptionContentCls' style='padding: 20px! important;'>" +
        description +
        "</span>";

    //if (description != "") div += description;

    div += "</div></a>";
    div += '<div class="card--border"></div>';
    div += "</div></div>";
  }

  if (document.getElementById("amazon-advertising-mobile-menu-list") != null)
    document.getElementById("amazon-advertising-mobile-menu-list").innerHTML =
      divMenu;
  if (document.getElementById("amazon-advertising-menu-list") != null)
    document.getElementById("amazon-advertising-menu-list").innerHTML = divMenu;
  if (document.getElementById("amazon-advertising-list") != null)
    document.getElementById("amazon-advertising-list").innerHTML = div;

  $(".card-container")
    .mouseenter(function () {
      let id = $(this).attr("id");
      console.log(id);
      setTimeout(function () {
        document.getElementById("" + id).classList.add("mainDivIndex");
        document.getElementById("imgAdv" + id).classList.add("amazonAdvImgCss");
      }, 100);
    })
    .mouseleave(function () {
      let id = $(this).attr("id");
      console.log(id);
      setTimeout(function () {
        document.getElementById("" + id).classList.remove("mainDivIndex");
        document
          .getElementById("imgAdv" + id)
          .classList.remove("amazonAdvImgCss");
      }, 100);
    });
}

function onClickAdvertising(id) {
  console.log(id);
  for (let i = 0; i < listAdvertising.length; i++) {
    document.getElementById("" + i).classList.remove("mainDivIndex");
    document.getElementById("imgAdv" + i).classList.remove("amazonAdvImgCss");
  }
  setTimeout(function () {
    document.getElementById("" + id).classList.add("mainDivIndex");
    document.getElementById("imgAdv" + id).classList.add("amazonAdvImgCss");
  }, 100);
}

function onLostFocusAdvertising(id) {
  console.log(id);
  setTimeout(function () {
    document.getElementById("" + id).classList.remove("mainDivIndex");
    document.getElementById("imgAdv" + id).classList.remove("amazonAdvImgCss");
  }, 100);
}

function getType(decoded) {
  if (decoded == null) return;

  var lowerCase = decoded.toLowerCase();

  if (lowerCase.indexOf("svg") !== -1) {
    console.log(lowerCase.indexOf("svg"));
    extension = "svg+xml";
  } else if (lowerCase.indexOf("png") !== -1) {
    console.log(lowerCase.indexOf("png"));
    extension = "png";
  } else if (
    lowerCase.indexOf("jpg") !== -1 ||
    lowerCase.indexOf("jpeg") !== -1
  ) {
    extension = "jpg";
  } else extension = "tiff";

  return extension;
}

function changeLang(lang) {
  if (lang != "en" && lang != "ar") lang = "en";

  $("[data-localize]").localize("assets/js/lang/lang", { language: lang });

  if (document.getElementById("amazon-services-mobile-menu-list") != null)
    document.getElementById("amazon-services-mobile-menu-list").innerHTML = "";
  if (document.getElementById("amazon-services-menu-list") != null)
    document.getElementById("amazon-services-menu-list").innerHTML = "";
  if (document.getElementById("amazon-services-menu-list") != null)
    document.getElementById("amazon-services-carousel").innerHTML = "";

  if (document.getElementById("amazon-advertising-mobile-menu-list") != null)
    document.getElementById("amazon-advertising-mobile-menu-list").innerHTML =
      "";
  if (document.getElementById("amazon-advertising-menu-list") != null)
    document.getElementById("amazon-advertising-menu-list").innerHTML = "";
  if (document.getElementById("amazon-advertising-list") != null)
    document.getElementById("amazon-advertising-list").innerHTML = "";

  console.log(lang);

  language = lang;

  let dir = "ltr";
  let classList = "directionLTR";
  let navBarClass = "floatLeft";

  if (lang == "ar") {
    $("#divFormEmail").addClass("formEmailRTL");
    $("#divFormEmail").removeClass("formEmailLTR");

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
    $("#divFormEmail").removeClass("formEmailRTL");
    $("#divFormEmail").addClass("formEmailLTR");

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

  if (lang != language) {
    window.location.href =
      location.origin + location.pathname + "?lang=" + lang;
  }
}

function sendContact() {
  var name = $("#name").val();
  var email = $("#email").val();
  var message = $("#message").val();

  console.log(name + " " + email + " " + message);

  let param = {
    Name: name,
    Email: email,
    Message: message,
  };

  $.ajax({
    url: SERVER_API + Post_EMAIL_ADD,
    type: "GET",
    dataType: "json",
    data: param,
    success: function (res) {
      console.log("INNNNNNNNN");
      console.log(res);

      $("#alertFormSubmitId").alert("open");
      $("#alertFormSubmitId").show();
    },
    error: function (jqXhr, textStatus, errorMessage) {
      // error callback
      console.log("textStatus: " + textStatus);
      console.log("Error: " + errorMessage);
      console.log(jqXhr);

      $("#alertFormSubmitErrorId").alert("open");
      $("#alertFormSubmitErrorId").show();
    },
  });
}

function loadAmazonSpn() {
  window.open(
    "https://sellercentral.amazon.com/gspn/searchpage/Cataloguing?ref_=sc_gspn_hp_clst&sellFrom=SA&sellIn=SA&localeSelection=en_US",
    "_blank"
  );
}

function collpaseMenuListener() {
  console.log("collpaseMenu");
  $("#navbarSupportedContent").on("shown.bs.collapse", function () {
    console.log("Opened");
    if (window.matchMedia("(max-width: 1000px)").matches) {
      $(".waveHeaderCls").removeClass("headerWaveWebCls");
      $(".waveHeaderCls").addClass("headerWaveMobileCls");
    }
  });

  $("#navbarSupportedContent").on("hidden.bs.collapse", function () {
    console.log("Closed");
    if (window.matchMedia("(max-width: 1000px)").matches) {
      $(".waveHeaderCls").removeClass("headerWaveMobileCls");
      $(".waveHeaderCls").addClass("headerWaveWebCls");
    }
  });
}
