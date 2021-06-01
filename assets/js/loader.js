let scrollDurarion = 10000;

let language = "en";

let activeModal = false;

let isMobile = false;

let listServices = [];

let listAdvertising = [];

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

  /*
  listServices = [
    {
      id: 0,
      TitleEn: "Amazon Storefront/Brand page Creation",
      DescriptionEn:
        "If you want to succeed on the highly competitive Amazon marketplace, you will need a branded Amazon store " +
        " Create Amazon Store Dedicated to highlight your catalog, collection and your brand with AWTS Amazon storefront design service. " +
        " We offer Amazon Storefront design services that craft an exceptionally good-looking Amazon webstore that your customers will fall in love with, at first glance. " +
        "Our team of highly-talented Amazon store designers is well-aware of the various in-store design elements that will help engage store visitors and make them want to try your products." +
        " Your store will have the kind of design that is extremely sales-oriented and will result in increased revenue generation and better profitability. " +
        "With us, you don’t just get a store, you get an online presence that will deliver sustainable returns over a long period of time.",
      TitleAr: "واجهة متجر أمازون / إنشاء صفحة العلامة التجارية",
      DescriptionAr:
        "إذا كنت تريد أن تنجح في سوق أمازون شديد المنافسة، فستحتاج إلى متجر أمازون يحمل علامة تجارية. " +
        " أنشئ متجر أمازون مخصصًا لتسليط الضوء على الكتالوج الخاص بك ومجموعتك وعلامتك التجارية من خلال خدمتنا     لتصميم واجهة متجرك." +
        " نحن نقدم خدمات تصميم واجهة امازون التي تصنع صفحتك على امازون ذو مظهر جيد بشكل استثنائي وسيقع في حبه عملاؤك للوهلة الأولى. " +
        " يدرك فريقنا من مصممي صفحات أمازون الموهوبين جيدًا, بالعناصر المختلفة للتصميم داخل الصفحة والتي ستساعد في زيادة زوار الصفحة وتجعلهم يرغبون في تجربة منتجاتك. " +
        " سيكون لصفحتك نوع التصميم الموجه للغاية نحو المبيعات وسيؤدي إلى زيادة توليد الإيرادات وتحسين الربح. " +
        " معنا ، لا تحصل على صفح ة فحسب ، بل تحصل على تواجد عبر الإنترنت يحقق عوائد مستدامة على مدى فترة طويلة من الزمن.",
    },
    {
      id: 1,
      TitleEn: "Account Management",
      DescriptionEn:
        "AWTS-Store provide an all-inclusive Amazon account management service where we will run your Seller central account as well as Vendor central account. " +
        "This includes, setting up your account Amazon seller central account. " +
        "If you need help with managing your account and in general with selling more and operating more efficiently, Account management service provides the support you want",
      TitleAr: "ادارة الحسابات",
      DescriptionAr:
        "تقدم شركة علم الخدمات المتطورة المحدودة خدمة إدارة حساب أمازون شاملة حيث سنقوم بتشغيل حساب البائع المركزي وكذلك حساب البائع المركزي. " +
        "      وهذا يشمل ، إعداد حسابك حساب البائع المركزي في أمازون. " +
        "      إذا كنت بحاجة إلى مساعدة في إدارة حسابك وبشكل عام مع زيادة البيع والعمل بكفاءة أكبر ، فإن خدمة إدارة الحساب توفر الدعم الذي تريده ",
    },
    {
      id: 2,
      TitleEn: "Accounting",
      DescriptionEn:
        "Accounting services assist sellers with sales channel and payment processor reconciliations. " +
        "We specialize in helping our clients regarding establishing budgets and managing cashflow by providing them a report so they would know exactly how much they are earning. ",
      TitleAr: "محاسبة",
      DescriptionAr:
        "تساعد خدمات المحاسبة, البائعين في تسويات قناة المبيعات. " +
        " نحن متخصصون في مساعدة عملائنا فيما يتعلق بوضع الميزانيات وإدارة التدفق النقدي من خلال تزويدهم بتقرير حتى يعرفوا بالضبط مقدار ما يكسبونه",
    },
    {
      id: 3,
      TitleEn: "Cataloging",
      DescriptionEn:
        "The moment that you have developed a new product, you would like to launch it and sell it in different places immediately, AWTS-Store can be the help fulfill your need in order to have the pages that will make customers read and become motivated to purchase your items." +
        " Whether you would like to add new products or you want to improve the ones that you already have, cataloguing services will help you.",
      TitleAr: "إدراج المنتجات",
      DescriptionAr:
        "في اللحظة التي تطور فيها منتجًا جديدًا ، ترغب في إطلاقه وبيعه في أماكن مختلفة على الفور ، يمكن أن تكون شركة عالم الخدمات المتطورة المحدودة هي المساعدة في تلبية احتياجاتك من أجل الحصول على الصفحات التي ستجعل العملاء يقرؤون وتحفزهم على شراء العناصر الخاصة بك ." +
        " سواء كنت ترغب في إضافة منتجات جديدة أو ترغب في تحسين المنتجات التي لديك بالفعل ، فإن خدمات إدراج المنتجات ستساعدك.",
    },
    {
      id: 4,
      TitleEn: "Enhanced Brand Content",
      DescriptionEn:
        "A few shoppers read each passage and others like to read filter bolded headers and visual cues for a general diagram. " +
        "Pictures and recordings offer to visual aid and can undoubtedly represent item properties." +
        "We analyze the products in your account to select the perfect modular templates for your EBC content Amazon needs, we convert boring product images into visually stunning pieces of art to make your products even more attractive and appealing, We create an interesting and gripping brand story that is woven through striking product imagery to drive conversions." +
        "Adding Amazon Enhanced Brand Content to your product detail pages includes Keyword, Product research, Creative banners, and A+ content creation which promote your business. ",
      TitleAr: "تعزيز إنشاء محتوى العلامة التجارية",
      DescriptionAr:
        "يقرأ عدد قليل من المتسوقين كل فقرة ويحب الآخرون قراءة رؤوس أقلام والإشارات المرئية عامةً. " +
        " تقدم الصور والتسجيلات مساعدة مرئية ويمكن أن تمثل بلا شك خصائص العنصر. " +
        " نقوم بتحليل المنتجات في حسابك لتحديد القوالب المعيارية المثالية لمحتوى EBC الذي يحتاجه أمازون ، ونحول صور المنتجات المملة إلى قطع فنية مذهلة بصريًا لجعل منتجاتك أكثر جاذبية, وننشئ قصة علامة تجارية مثيرة للاهتمام وجذابة تم نسجها من خلال صور المنتج الرائعة لجذب العملاء. " +
        " تتضمن إضافة محتوى العلامة التجارية المحسّن من أمازون إلى صفحات تفاصيل المنتج, الكلمات الرئيسية ، وأبحاث المنتج ، واللافتات الإبداعية ، وإنشاء محتوى A + الذي يروج لعملك. ",
    },
    {
      id: 5,
      TitleEn: "Excess Inventory",
      DescriptionEn:
        "AWTS-Store is the best spot to sell your new, overload, out of date, client returned stock straightforwardly to a large number of expert purchasers. " +
        "We have some expertise in aiding FBA merchants liquidate their overabundance stock in bulk and immediately.",
      TitleAr: "إدارة المخزون الزائد",
      DescriptionAr:
        "شركة عالم الخدمات المتطورة المحدودة هي أفضل مكان لبيع مخزونك الجديد، الزائد، القديم الذي قام العميل بإعادته, مباشرة إلى عدد كبير من المشترين الخبراء." +
        " لدينا بعض الخبرة في مساعدة تجار FBA على تصفية المخزون الفائض بكميات كبيرة وعلى الفور.",
    },
    {
      id: 6,
      TitleEn: "FBA preparation",
      DescriptionEn:
        "AWTS-Store has a dedicated team that can process your shipments instantly, accurately, without exceeding your budget. " +
        "Our FBA preparations service include, controlling, packing and labeling your shipments to protect your products and create a better customer experience. " +
        "Moreover, AWTS-Store will take upon itself to store carefully your products in its warehouse in the Kingdom of Saudi Arabia.",
      TitleAr: "التكلف بشحن و تخزين البضاعة",
      DescriptionAr:
        "لدى شركة عالم الخدمات المتطورة المحدودة فريق متخصص يمكنه معالجة شحناتك على الفور وبدقة دون تجاوز ميزانيتك. " +
        " تشمل خدمة استعدادات FBA لدينا ، التحكم في الشحنات الخاصة بك وتعبئتها ووضع العلامات عليها لحماية منتجاتك وخلق تجربة عملاء أفضل. " +
        "علاوة على ذلك ، ستأخذ شركة عالم الخدمات المتطورة المحدودة على عاتقها تخزين منتجاتك بعناية في مستودعاتها في المملكة العربية السعودية.",
    },
    {
      id: 7,
      TitleEn: "Imaging",
      DescriptionEn:
        "Pictures speak louder than Words and when you manage to improve the quality of the pictures it is likely to entice your audience. " +
        "There is no denying to the fact that Amazon Product Images are the secret sauce to increasing conversion rates and sales. " +
        "Get Amazon-ready photos with AWTS-Store E-Commerce Product photoshoot and Image Editing Services. Using our Amazon Imaging Service can give you a competitive advantage over your competitors.",
      TitleAr: "العناية بالصور",
      DescriptionAr:
        "تتحدث الصور بصوت أعلى من الكلمات وعندما تتمكن من تحسين جودة الصور ، فمن المحتمل أن تغري جمهورك." +
        "  ليس هناك من ينكر حقيقة أن صور منتجات أمازون هي الصلصة السرية لزيادة معدلات الجذب والمبيعات." +
        "  احصل على صور جاهزة لامازون باستخدام جلسة تصوير منتجات وخدمات تحرير الصور. " +
        "  يمكن أن يمنحك استخدام العناية بالصور  ميزة تنافسية.",
    },
    {
      id: 8,
      TitleEn: "Training",
      DescriptionEn:
        "A highly experienced team in E-Commerce, Consulting, and IT will coach you to manage your seller account. Our purpose is to offer online training covering these sections: Account settings, shipping, adding products, managing inventory, managing returns, account health management.",
      TitleAr: "تمرين",
      DescriptionAr:
        "سيقوم فريق ذو خبرة عالية في التجارة الإلكترونية والاستشارات وتكنولوجيا المعلومات بتدريبك على إدارة حساب البائع الخاص بك. هدفنا هو تقديم تدريب عبر الإنترنت يغطي هذه الأقسام: إعدادات الحساب ، والشحن ، وإضافة المنتجات ، وإدارة المخزون ، وإدارة المرتجعات ، وإدارة صحة الحساب.",
    },
    {
      id: 9,
      TitleEn: "Translation",
      DescriptionEn:
        "We provide an expert translation service to help you conveniently translate your Listings, Keywords, titles, product description (A+/EBC)..So you can expand your sales performance and succeed internationally.",
      TitleAr: "ترجمة",
      DescriptionAr:
        "نحن نقدم خدمة ترجمة متخصصة لمساعدتك في ترجمة القوائم والكلمات الرئيسية والعناوين ووصف المنتج (A + / EBC) بسهولة، حتى تتمكن من توسيع أداء مبيعاتك والنجاح على المستوى الدولي.",
    },
    {
      id: 10,
      TitleEn: "Keyword Research",
      DescriptionEn:
        "Keywords can ensure that your content will be valued by various search engine sites. " +
        " We manually collect all the relevant product-related key phrases, search them into various keyword research tool for Amazon and sort the keywords based on volume, convertibility and relevance to get the final set of most important keywords. " +
        " We make sure that your Amazon site will consistently rank great even alongside your competitors. We already have strategies that are formulated by our team of experts that will make your site easy to search.",
      TitleAr: "البحث عن الكلمات الرئيسية",
      DescriptionAr:
        "يمكن أن تضمن الكلمات الرئيسية أن المحتوى الخاص بك سيتم تقييمه من خلال مواقع محركات البحث المختلفة. " +
        " نقوم يدويًا بتجميع جميع العبارات الرئيسية ذات الصلة بالمنتج ، والبحث عنها في أداة بحث الكلمات الرئيسية المختلفة  لأمازون " +
        " وفرز الكلمات الرئيسية بناءً على الحجم وقابلية التحويل والأهمية للحصول على المجموعة النهائية من الكلمات الرئيسية الأكثر أهمية. " +
        "نحن نتأكد من أن موقع أمازون الخاص بك سيحتل مرتبة عالية باستمرار. " +
        " لدينا بالفعل استراتيجيات صاغها فريق الخبراء لدينا والتي ستجعل من السهل البحث في موقعك. ",
    },
  ];
  drawServices(list);
  */

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

    let nbItems = isMobile ? 1 : 3;

    $("#amazon-services-carousel").owlCarousel({
      items: nbItems,
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

  /*
  listAdvertising = [
    {
      id: 0,
      TitleEn: "Sponsored products/Brands",
      DescriptionEn:
        "Get instant visibility with Customer Quick Ads, Sponsored Products display with an Amazon search results add on products pages, right the customers will see them. " +
        "Sponsored brands available to brands owner, take you to a step further featuring your logo, headline and up to 3 products helping shoppers to see your brand the way you want it to be seen. " +
        "Once We’re done with our Sponsored Display Campaign creation, Amazon will automatically generate the Ad we created, featuring information from the product detail page, like a product image, title, star rating, prime badging and price.",
      TitleAr: "المنتجات / العلامات التجارية الممولة",
      DescriptionAr:
        "احصل على رؤية فورية من خلال الإعلانات السريعة للعملاء ، يتم عرض المنتجات الدعائية مع إضافة نتائج بحث أمازون على صفحات المنتجات ، وسوف يراها العملاء بشكل صحيح. " +
        "العلامات التجارية لأصحاب العلامات التجارية ، تأخذك إلى خطوة أبعد من خلال عرض شعارك وعنوانك وما يصل إلى 3 منتجات لمساعدة المتسوقين على رؤية علامتك التجارية بالطريقة التي تريدها. " +
        " بمجرد الانتهاء من إنشاء حملة إعلانية على الشبكة الإعلانية ، سينشئ أمازون تلقائيًا الإعلان الذي أنشأناه ، والذي يعرض معلومات من صفحة تفاصيل المنتج ، مثل صورة المنتج ، والعنوان ، والتقييم، والشارة الأولية والسعر.",
      Logo: "assets/images/advertising/sponsoredproduct.svg",
    },
    {
      id: 1,
      TitleEn: "Promotions",
      DescriptionEn:
        "Can also help make the sale, offer free shipping, % discounts, or buy one get one free promos, and get a custom Amazon URL to share on your marketing campaigns." +
        " Promoting products can be vital to our Amazon Strategy helping drive sales, launching products, generate reviews and more.",
      TitleAr: "الترقيات",
      DescriptionAr:
        "يمكن أن تساعد أيضًا في إجراء عملية البيع ، أو تقديم شحن مجاني ، أو تخفيضات بنسبة مئوية ، أو شراء واحدة والحصول على واحدة ترويجية مجانية ، والحصول على عنوان URL مخصص من امازون لمشاركته في حملاتك التسويقية. " +
        "يمكن أن يكون الترويج للمنتجات أمرًا حيويًا لاستراتيجية امازون الخاصة بنا للمساعدة في زيادة المبيعات وإطلاق المنتجات وإنشاء المراجعات والمزيد.",
      Logo: "assets/images/advertising/promotions.svg",
    },
    {
      id: 2,
      TitleEn: "Deals",
      DescriptionEn:
        "Customers also love Lightning a Deal, help them out by running lightning deal flash sales on one of the most visited pages on amazon.",
      TitleAr: "صفقات",
      DescriptionAr:
        "يحب العملاء أيضًا الصفقات. " +
        "ساعدهم من خلال تشغيل الصفقات على واحدة من أكثر الصفحات زيارة على أمازون. ",
      Logo: "assets/images/advertising/deals.svg",
    },
    {
      id: 3,
      TitleEn: "Coupons",
      DescriptionEn:
        "Offering Coupons allow users to click for savings and search results on product savings or in their shopping cards.",
      TitleAr: "حملات التسويق عبر البريد الإلكتروني",
      DescriptionAr:
        "عند استخدام طريقة الإعلان هذه ، فإننا نمتلك قوائمنا ، فهي إحدى أفضل الطرق لتنمية نشاط تجاري.",
      Logo: "assets/images/advertising/coupons.svg",
    },
    {
      id: 4,
      TitleEn: "Emails Marketing Campaigns",
      DescriptionEn:
        "When using this way of Advertising we own our lists, it’s one of the best ways to grow a business.",
      TitleAr: "حملات التسويق عبر البريد الإلكتروني",
      DescriptionAr:
        "عند استخدام طريقة الإعلان هذه ، فإننا نمتلك قوائمنا ، فهي إحدى أفضل الطرق لتنمية نشاط تجاري.",
      Logo: "assets/images/advertising/emailmarketingcampaigns.svg",
    },
    {
      id: 5,
      TitleEn: "E-Gifts",
      DescriptionEn:
        "Whatever our business’s Goals are, an Amazon Gift Card can help to achieve the. " +
        "If we’re looking to attract new customers, or we simply wish to say “Thanks” and reward our loyal customers, Amazon Gift Cards is the Key.",
      TitleAr: "الهدايا الإلكترونية",
      DescriptionAr:
        "مهما كانت أهداف أعمالنا ، يمكن أن تساعد بطاقة هدايا أمازون في تحقيقها. " +
        "إذا كنا نتطلع إلى جذب عملاء جدد ، أو نود ببساطة أن نقول شكرًا ونكافئ عملائنا المخلصين ، فإن بطاقات هدايا أمازون هي المفتاح. ",
      Logo: "assets/images/advertising/e-gifts.svg",
    },
  ];
  drawAdvertising(list);
  console.log(SERVER_API + GET_ADVERTISING);
  */

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
      ' col-md-12 col-lg-3">';
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
      div += "<p style='padding: 20px;'>" + description + "</p>";
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
