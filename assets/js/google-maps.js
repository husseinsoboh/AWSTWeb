let contactList = [
  {
    value: 5,
    length: 30,
    title: "SAUDI ARABIA",
    latitude: 24.7136,
    longitude: 46.6753,
    TEL: "+966 11 431 1601",
    MOBILE: "+966 561141047",
    FAX: "+966 11 291 3929",
    EMAIL: "INFO@AWTS-LTD.COM",
    TOLL: "92000 2282",
    POBOX: "68525 RIYADH 44537",
  },
  {
    value: 5,
    length: 50,
    title: "CANADA",
    latitude: 53.2257,
    longitude: -91.4062,
    TEL: "+1 1 111111",
    MOBILE: "+961 2 222222",
    FAX: "+961 3 333333",
    EMAIL: "awts@email.ca",
    TOLL: "+961 4 444444",
    POBOX: "ABC123",
  },
  {
    value: 5,
    length: 150,
    title: "LEBANON",
    latitude: 33.8938,
    longitude: 35.5018,
    TEL: "+961 1 111111",
    MOBILE: "+961 2 222222",
    FAX: "+961 3 333333",
    EMAIL: "awts@email.lb",
    TOLL: "+961 4 444444",
    POBOX: "ABC123",
  },
  {
    value: 5,
    length: 50,
    title: "JORDAN",
    latitude: 31.9539,
    longitude: 35.9106,
    TEL: "+962 1 111111",
    MOBILE: "+961 2 222222",
    FAX: "+961 3 333333",
    EMAIL: "awts@email.jo",
    TOLL: "+961 4 444444",
    POBOX: "ABC123",
  },
];

function loadMap() {
  am4core.ready(function () {
    loadCountry(contactList[0]);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Miller();

    // Colors
    var color1 = chart.colors.getIndex(0);

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ["AQ"];

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{title}";
    polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Add shadow
    var shadow = polygonSeries.filters.push(new am4core.DropShadowFilter());
    shadow.color = am4core.color("#60666b");
    shadow.blur = 0;

    // Pins
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    var imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.propertyFields.latitude = "latitude";

    // Creating a pin bullet
    var pin = imageTemplate.createChild(am4plugins_bullets.PinBullet);

    // Configuring pin appearance
    pin.background.fill = color1;
    pin.background.pointerBaseWidth = 1;
    pin.background.pointerLength = 5;
    pin.background.propertyFields.pointerLength = "length";
    pin.circle.fill = pin.background.fill;
    pin.label = new am4core.Label();
    //pin.label.text = "{value}%";
    pin.label.fill = color1.alternate;
    pin.poleHeight = 10;

    var label = pin.createChild(am4core.Label);
    label.userClassName = "labelGrowUp"; //"hvr-pulse-grow";
    label.text = "{title}";
    label.fontSize = 12;
    label.fontWeight = "bold";
    label.propertyFields.dy = "length";
    label.verticalCenter = "middle";
    label.fill = am4core.color("black"); //color1;
    label.adapter.add("dy", function (dy) {
      return (26 + dy) * -1;
    });

    label.adapter.add("dx", function (dy) {
      return -6;
    });

    label.events.on("hit", function (ev) {
      console.log(ev.target);
      let country = ev.target.currentText;

      for (let i = 0; i < contactList.length; i++) {
        let contact = contactList[i];
        if (contact.title == country) {
          loadCountry(contact);
        }
      }
    });

    // Creating a "heat rule" to modify "radius" of the bullet based
    // on value in data
    imageSeries.heatRules.push({
      target: pin.background,
      property: "radius",
      min: 1,
      max: 5,
      dataField: "value",
    });

    // Pin data
    imageSeries.data = contactList;

    // Add zoom control
    chart.zoomControl = new am4maps.ZoomControl();

    // Disabling mouse wheel zoom in maps
    chart.chartContainer.wheelable = false;

    // Add home button
    let button = chart.chartContainer.createChild(am4core.Button);
    button.padding(5, 5, 5, 5);
    button.align = "right";
    button.marginRight = 15;
    button.events.on("hit", function () {
      chart.goHome();
    });
    button.icon = new am4core.Sprite();
    button.icon.path =
      "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

    /*
    let country_list = getCountryList(); //sessionStorage.getItem("country_list");
    console.log("country_list");
    console.log(country_list);
    //console.log(JSON.parse(country_list));

    AmCharts.makeChart("map", {
      type: "map",
      pathToImages: "http://www.amcharts.com/lib/3/images/",
      addClassNames: true,
      fontSize: 15,
      color: "#000000",
      projection: "miller",
      backgroundAlpha: 1,
      backgroundColor: "rgba(163,163,163,1)",
      dataProvider: {
        map: "worldHigh",
        getAreasFromMap: false,
        images: country_list,
      },
      balloon: {
        horizontalPadding: 15,
        borderAlpha: 0,
        borderThickness: 1,
        verticalPadding: 15,
      },
      areasSettings: {
        color: "rgba(87,87,87,1)",
        outlineColor: "rgba(163,163,163,1)",
        rollOverOutlineColor: "rgba(163,163,163,1)",
        rollOverBrightness: 20,
        selectedBrightness: 20,
        selectable: true,
        unlistedAreasAlpha: 0,
        unlistedAreasOutlineAlpha: 0,
        alpha: 0,
        outlineAlpha: 0,
      },
      imagesSettings: {
        alpha: 1,
        color: "rgba(87,87,87,1)",
        outlineAlpha: 0,
        rollOverOutlineAlpha: 0,
        outlineColor: "rgba(163,163,163,1)",
        rollOverBrightness: 20,
        selectedBrightness: 20,
        selectable: true,
      },
      linesSettings: {
        color: "rgba(87,87,87,1)",
        selectable: true,
        rollOverBrightness: 20,
        selectedBrightness: 20,
      },
      zoomControl: {
        zoomControlEnabled: true,
        homeButtonEnabled: false,
        panControlEnabled: false,
        right: 38,
        bottom: 30,
        minZoomLevel: 0.25,
        gridHeight: 100,
        gridAlpha: 0.1,
        gridBackgroundAlpha: 0,
        gridColor: "#FFFFFF",
        draggerAlpha: 1,
        buttonCornerRadius: 2,
      },
    });
    */
  });
}

function loadCountry(data) {
  document.getElementById("tel").innerText = data["TEL"];
  document.getElementById("mobile").innerText = data["MOBILE"];
  document.getElementById("fax").innerText = data["FAX"];
  document.getElementById("emailAddr").innerText = data["EMAIL"];
  document.getElementById("toll").innerText = data["TOLL"];
  document.getElementById("pobox").innerText = data["POBOX"];
}
