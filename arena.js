 var arena = d3.select(".rectangle");

    var preview = arena.append("rect")
        .attr("x", 400)
        .attr("y", 250)
        .attr("width", 1024 / 3)
        .attr("height", 768 / 3)
        .attr("fill", 'gray')
        .attr("opacity", 0.8)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    arena.append("text")
        .text("Please arrange the scenes inside the large rectangle according to their similarity")
        .attr("x", 350)
        .attr("y", 50)
        .attr("font-size", 20);

    var random_images_array = ['target_airport', 'target_alley', 'target_amusementpark', 'target_aquarium', 'target_arcade',
        'target_artstudio', 'target_attic', 'target_backyard', 'target_bakery', 'target_bar', 'target_barn', 'target_bridge',
        'target_bathroom', 'target_beach', 'target_bedroom', 'target_boating_IDS01', 'target_buffet', 'target_building_IDS01', 'target_busstop',
        'target_campsite', 'target_canal', 'target_canyon', 'target_casino', 'target_castle', 'target_cemetery', 'target_church', 'target_city',
        'target_classroom', 'target_closet', 'target_clothingstore', 'target_coffeeshop', 'target_conferencroom', 'target_constructionsite', 'target_courtroom',
        'target_deli', 'target_dentistoffice', 'target_desert', 'target_desktop', 'target_diner', 'target_diningroom_IDS01', 'target_dock', 'target_driveway',
        'target_factory', 'target_field', 'target_fireworks', 'target_fishingvillage', 'target_forrest', 'target_gameroom_IDS01', 'target_garage', 'target_garden',
        'target_grassland', 'target_greenhouse', 'target_hairsalon', 'target_hardwarestore', 'target_heliport', 'target_highway', 'target_hospital',
        'target_kitchen_IDS01', 'target_laboratory_IDS01', 'target_laundryroom', 'target_library', 'target_livingroom_IDS01', 'target_marsh', 'target_mediaroom',
        'target_mountain', 'target_nursery', 'target_office_IDS01', 'target_park', 'target_parkinglot', 'target_patio', 'target_playground', 'target_pool_IDS01',
        'target_porch', 'target_postoffice', 'target_prairie', 'target_racetrack', 'target_ranch', 'target_recordingstudio', 'target_refrigerator', 'target_restaurant_IDS01',
        'target_ruins', 'target_sewingroom', 'target_skatepark', 'target_soccerfield', 'target_stable', 'target_storage', 'target_stream', 'target_street_IDS01',
        'target_subway', 'target_swamp', 'target_temple', 'target_toystore', 'target_train', 'target_treehouse', 'target_tunnel', 'target_warehouse', 'target_waterfall',
        'target_waterpark', 'target_winecellar', 'target_workshop_IDS01'];


    for (var n = 0; n < random_images_array.length; n++) {
        random_images_array[n] = random_images_array[n] + '.png';
    }

    var image = {
        size: 70
    };

    var img;
    var x = 0, y = -5;
    var uniqueImg;
    var orig_ele = [];
    var _doc = window.document;
    var dict = {};

 // console.log(document.getElementById("gallery").style.height);
 //
 //    var xBounds = document.getElementById("gallery").style.width,
 //        yBounds = document.getElementById("gallery").style.height;
    var count = 0;
    function drawImages() {
        var i = 1;
        uniqueImg = new Set();
        do {
            do {
                img = getRandomImage(random_images_array, 'data/arena_scene_examples/');
                var initialSize = uniqueImg.size; //should start at zero and be of size i after loop
                uniqueImg.add(img);

            } while (uniqueImg.size == initialSize);
            // appendDraggableImage(img, [x, y]);
            appendDraggableImage(img);
            i++;
            //orig_ele.push([x, y]);
        } while (i <= 41);
    }
    drawImages();

    function redrawImages([x, y], uniqueImg, img) {

    }


    var imgStr2;

    function getRandomImage(imgAr, path) {
        var num = Math.floor(Math.random() * imgAr.length);
        var img = imgAr[num];
        imgStr2 = path + img;
        return imgStr2;
    }

    var item;
    var cloned_item;
    var dropzone;


    function appendDraggableImage(url) {    //#FIXME: retrieve position relative to rectangle rather than screen

            item = document.createElement("img");
            item.src = url;
            item.setAttribute("class", "item");
            item.setAttribute('style', "width: 64px; height: 48px; margin: 0 5px; padding-bottom: 5%;");



            document.getElementById('gallery').appendChild(item);
            cloned_item = document.getElementsByClassName("newItem");
            item.addEventListener("mouseover", function() {
                showPreview(url);
            });

            // console.log(item.getBoundingClientRect())


        function showPreview(url) {
            // console.log(url)
            //this.src = "data/arena_scene_examples/target_racetrack.png";
            // arena.append('image')
            //     .attr("xlink:href", url)
            //     .attr("class", "preview")
            //     .attr("height", 1024 / 2.3)
            //     .attr("width", 768 / 2.3)
            //     .attr("x", 453)
            //     .attr("y", 155);
        }

        function removePreview() {
            d3.select('image.preview').remove();
        }
        d3.select('.button_done')
            .on('mousedown', doneButton);

        function doneButton() {
            getFinalPositions();
        }

        function getFinalPositions() {
            var newItems = $('.newItem');
            for (var i=0; i <newItems.length; i++) {
                //this if-statement updates position of images that are moved again
                if (newItems[i].src in dict) {
                    console.log("true");
                    dict[newItems[i].src] = "x: " + newItems[i].offsetLeft + ", y: " + newItems[i].offsetTop
                }
                //else, add a new image to the arena
                else {
                    dict[newItems[i].src] = "x: " + newItems[i].offsetLeft + ", y: " + newItems[i].offsetTop
                }
            }console.log(dict);
            writeToDoc(dict);
        }

        function writeToDoc(dict) {}

    }


    var alreadyMoved = false;

    function dragStart(d) {
        console.log("dragging");
        d3.select(this.parentNode)
            .raise();
            // .attr("width", image.size * 2 / 3)
            // .attr("height", image.size * 2 / 3)
        alreadyMoved = true;
        d.moveCount++;

    }

    var final_positions = [];





    d3.select('.button_restart')
        .on('mousedown', restartButton);

    function restartButton() {
        console.log(orig_ele);
        //var img = getImageFromSet();
        redrawImages([x, y], uniqueImg, img);
        final_positions.length = 0;

        //#FIXME: reset positions of all pics
        //#FIXME: clear positions Set
    }


