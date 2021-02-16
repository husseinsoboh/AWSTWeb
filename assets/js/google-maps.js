let contactList = [
    {
        "value": 5, "length": 50, "title": 'CANADA', "latitude": 53.2257, "longitude": -91.4062, "TEL": '+961 1 111111', "MOBILE": '+961 2 222222', "FAX": '+961 3 333333', "EMAIL": 'awts@email.ca', "TOLL": '+961 4 444444', "POBOX": 'ABC123'
    },
    {
        "value": 5, "length": 150, "title": 'LEBANON', "latitude": 33.8938, "longitude": 35.5018, "TEL": '+961 1 111111', "MOBILE": '+961 2 222222', "FAX": '+961 3 333333', "EMAIL": 'awts@email.lb', "TOLL": '+961 4 444444', "POBOX": 'ABC123'
    },
    {
        "value": 5, "length": 50, "title": 'JORDAN', "latitude": 31.9539, "longitude": 35.9106, "TEL": '+961 1 111111', "MOBILE": '+961 2 222222', "FAX": '+961 3 333333', "EMAIL": 'awts@email.jo', "TOLL": '+961 4 444444', "POBOX": 'ABC123'
    },
    {
        "value": 5, "length": 30, "title": 'SAUDI ARABIA', "latitude": 24.7136, "longitude": 46.6753, "TEL": '+961 1 111111', "MOBILE": '+961 2 222222', "FAX": '+961 3 333333', "EMAIL": 'awts@email.sr', "TOLL": '+961 4 444444', "POBOX": 'ABC123'
    },
];

function initMap() {
    /*
    var map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 2,
        center: new google.maps.LatLng(33.8938, 35.5018),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    //Create and open InfoWindow.
    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < contactList.length; i++) {  
        var data = contactList[i];

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseInt(data["lat"]), parseInt(data["lng"])),
            map: map,
            title: data["title"]
        });

        //Attach click event to the marker.
        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                infoWindow.setContent("<div style = 'width:200px;min-height:20px'>" + data["title"] + "</div>");
                infoWindow.open(map, marker);

                loadCountry(data);
            });
        })(marker, data);
    }

    loadCountry(contactList[0]);
    */
}

function loadMap(){
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Miller();

        // Colors
        var color1 = chart.colors.getIndex(0);

        /*
        chart.homeGeoPoint = {
        latitude: 50,
        longitude: 0
        }
        chart.homeZoomLevel = 0.75;
        chart.minZoomLevel = 0.75;
        */

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
        imageTemplate.nonScaling = true;

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
        pin.poleHeight = 1;

        var label = pin.createChild(am4core.Label);
        label.text = "{title}";
        label.fontSize = 12;
        label.fontWeight = "bold";
        label.propertyFields.dy = "length";
        label.verticalCenter = "middle";
        label.fill = am4core.color("black");//color1;
        label.adapter.add("dy", function(dy) {
            return (26 + dy) * -1;
        });
        
        label.adapter.add("dx", function(dy) {
            return -6;
        });
        

        chart.events.on("hit", function(event){
            console.log(event.target);
            console.log(event.target.baseSprite);
            console.log(event.target.dataItem.dataContext);
        });

        imageSeries.events.on("hit", function(ev){
            console.log(ev.target.dataItem)
        });


        // Creating a "heat rule" to modify "radius" of the bullet based
        // on value in data
        imageSeries.heatRules.push({
            "target": pin.background,
            "property": "radius",
            "min": 1,
            "max": 5,
            "dataField": "value"
        });



        // Pin data
        imageSeries.data = contactList;

        // Add zoom control
        chart.zoomControl = new am4maps.ZoomControl();

        // Add home button
        let button = chart.chartContainer.createChild(am4core.Button);
        button.padding(5, 5, 5, 5);
        button.align = "right";
        button.marginRight = 15;
        button.events.on("hit", function() {
        chart.goHome();
        });
        button.icon = new am4core.Sprite();
        button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";

        /*
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

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

       
        // Pins
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        var imageSeriesTemplate = imageSeries.mapImages.template;
        imageSeriesTemplate.propertyFields.longitude = "longitude";
        imageSeriesTemplate.propertyFields.latitude = "latitude";
        imageSeriesTemplate.nonScaling = true;

        // Creating a pin bullet
        var pin = imageSeriesTemplate.createChild(am4plugins_bullets.PinBullet);

        // Configuring pin appearance
        pin.background.fill = color1;
        pin.background.pointerBaseWidth = 1;
        pin.background.pointerLength = 250;
        pin.background.propertyFields.pointerLength = "length";
        pin.circle.fill = pin.background.fill;
        pin.label = new am4core.Label();
        pin.label.text = "{value}%";
        pin.label.fill = color1.alternate;

        var label = pin.createChild(am4core.Label);
        label.text = "{title}";
        label.fontWeight = "bold";
        label.propertyFields.dy = "length";
        label.verticalCenter = "middle";
        label.fill = color1;
        label.adapter.add("dy", function(dy) {
            return (20 + dy) * -1;
        });

        // Creating a "heat rule" to modify "radius" of the bullet based
        // on value in data
        imageSeries.heatRules.push({
            "target": pin.background,
            "property": "radius",
            "min": 20,
            "max": 30,
            "dataField": "value"
        });
        
        imageSeries.heatRules.push({
            "target": label,
            "property": "dx",
            "min": 30,
            "max": 40,
            "dataField": "value"
        });
        
        imageSeries.heatRules.push({
            "target": label,
            "property": "paddingBottom",
            "min": 0,
            "max": 10,
            "dataField": "value"
        });
        
        // Create image
        var imageSeriesTemplate = imageSeries.mapImages.template;
        var marker = imageSeriesTemplate.createChild(am4core.Image);
        marker.href = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/marker.svg";
        marker.width = 20;
        marker.height = 20;
        marker.nonScaling = true;
        marker.tooltipText = "{title}";
        marker.horizontalCenter = "middle";
        marker.verticalCenter = "bottom";

        // Set property fields
        imageSeriesTemplate.propertyFields.latitude = "latitude";
        imageSeriesTemplate.propertyFields.longitude = "longitude";
        

        // Add data for the three cities
        imageSeries.data = contactList;

        // Add zoom control
        chart.zoomControl = new am4maps.ZoomControl();

        // Add home button
        let button = chart.chartContainer.createChild(am4core.Button);
        button.padding(5, 5, 5, 5);
        button.align = "right";
        button.marginRight = 15;
        button.events.on("hit", function() {
        chart.goHome();
        });
        button.icon = new am4core.Sprite();
        button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
  
        */








        /*
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);
        
        // Set map definition
        chart.geodata = am4geodata_worldLow;
        
        // Set projection
        chart.projection = new am4maps.projections.Miller();
        
        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        
        // Exclude Antartica
        polygonSeries.exclude = ["AQ"];
        
        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        
        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{title}";
        polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);
        
        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(0);
        
        // Add image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.data = contactList;
        
        // add events to recalculate map position when the map is moved or zoomed
        chart.events.on( "ready", updateCustomMarkers );
        chart.events.on( "mappositionchanged", updateCustomMarkers );
        
        // this function will take current images on the map and create HTML elements for them
        function updateCustomMarkers( event ) {
            
            // go through all of the images
            imageSeries.mapImages.each(function(image) {
                // check if it has corresponding HTML element
                if (!image.dummyData || !image.dummyData.externalElement) {
                    // create onex
                    image.dummyData = {
                    externalElement: createCustomMarker(image)
                    };
                }
            
                // reposition the element accoridng to coordinates
                var xy = chart.geoPointToSVG( { longitude: image.longitude, latitude: image.latitude } );
                image.dummyData.externalElement.style.top = xy.y + 'px';
                image.dummyData.externalElement.style.left = xy.x + 'px';
            });
        }

        // Add zoom control
        chart.zoomControl = new am4maps.ZoomControl();

        // Add home button
        let button = chart.chartContainer.createChild(am4core.Button);
        button.padding(5, 5, 5, 5);
        button.align = "right";
        button.marginRight = 15;
        button.events.on("hit", function() {
        chart.goHome();
        });
        button.icon = new am4core.Sprite();
        button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        
        // this function creates and returns a new marker element
        function createCustomMarker( image ) {
            var chart = image.dataItem.component.chart;
        
            // create holder
            var holder = document.createElement( 'div' );
            holder.className = 'map-marker';
            holder.title = image.dataItem.dataContext.title;
            holder.style.position = 'absolute';
        
            // maybe add a link to it?
            if ( undefined != image.url ) {
            holder.onclick = function() {
                window.location.href = image.url;
            };
            holder.className += ' map-clickable';
            }
        
            // create dot
            var dot = document.createElement( 'div' );
            dot.className = 'dot';
            holder.appendChild( dot );
        
            // create pulse
            var pulse = document.createElement( 'div' );
            pulse.className = 'pulse';
            holder.appendChild( pulse );
        
            // append the marker to the map container
            chart.svgContainer.htmlElement.appendChild( holder );
        
            return holder;
        }
        */
    });
  }

function loadCountry(data){
    document.getElementById("tel").innerText = data["TEL"];
    document.getElementById("mobile").innerText = data["MOBILE"];
    document.getElementById("fax").innerText = data["FAX"];
    document.getElementById("emailAddr").innerText = data["EMAIL"];
    document.getElementById("toll").innerText = data["TOLL"];
    document.getElementById("pobox").innerText = data["POBOX"];
}