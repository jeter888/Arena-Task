function saveSONAId() {
    // Get the SONA ID text input from the form
    const name = document.getElementById('txtID');

    // This variable stores all the data.
    let data =
        '\r SONA ID: ' + name.value + ' \r\n ';


    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], {type: 'text/plain'});

    //set the filename equal to the SONA ID (can change later)
    const sFileName = name.value;	   // The file to save the data.

    let newLink = document.createElement("a");

    //#FIXME: commented this last section out to download file for later (once hooked up to server). For now, values are stored in variable 'data'
    // newLink.download = sFileName;
    //
    // if (window.webkitURL != null) {
    //     newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    // } else {
    //     newLink.href = window.URL.createObjectURL(textToBLOB);
    //     newLink.style.display = "none";
    //     document.body.appendChild(newLink);
    // }
    //
    // newLink.click();
    // window.location.assign("index.html");
    document.getElementById("sona_form").remove();
    document.getElementById("gallery").style.display = "inline-block";
    document.getElementById("task-area").style.display = "inline-block";
    drawArena(name.value);
}




/*
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "pqrollan",
  password: "tempPassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
 */

//#FIXME: possible alternative function with Node.js or setup server

//     const fs = require('fs');
//
// // specify the path to the file, and create a buffer with characters we want to write
//     let path = 'SONA_data/';
//     let buffer = new Buffer('Those who wish to follow me\nI welcome with my hands\nAnd the red sun sinks at last');
//     fs.open(path, 'w', function(err, fd) {
//         if (err) {
//             throw 'could not open file: ' + err;
//         }
//         fs.write(fd, buffer, 0, buffer.length, null, function(err) {
//             if (err) throw 'error writing file: ' + err;
//             fs.close(fd, function() {
//                 console.log('wrote the file successfully');
//             });
//         });
//     });
//
//
//     //after sona data saves, redirect to experiment page
//     window.location.assign("index.html");
//     // drawArena();
//
// }

var xhttp = new XMLHttpRequest();


function toggleButton() {
    // Check to see if the button is pressed
    var pressed = document.getElementById("toggle");

    // Change "checked"" to the opposite state
    pressed.checked = !pressed.checked;
}

function isToggleOn() {
    return document.getElementById("toggle").checked;
}

function drawArena(subjectId) {
    console.log($(window).width());
    console.log($(window).height())
    //javascript does not allow simply looping through directories... once hooked up to server we don't have to hardcode filenames
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

    var img;
    var uniqueImg;
    var dict = {};
    var gallery_count = 0;

    var trial_count = 1; //keeps track of trials

    function drawImages() {
        var cloned_items = $(".newItem");
        var items = $(".item");
        if (gallery_count == 0) {
            cloned_items.remove();
            items.remove();
            var i = 1;
            uniqueImg = new Set();
            do {
                do {
                    img = getRandomImage(random_images_array, 'static/arena_scene_examples/');
                    var initialSize = uniqueImg.size; //should start at zero and be of size i after loop
                    uniqueImg.add(img);

                } while (uniqueImg.size == initialSize);
                appendDraggableImage(img);
                i++;
            } while (i <= 5); //sets size of gallery & number of pictures. Integer cannot exceed random_images_array size
        } else {
            alert("You still have one or more scenes left to arrange.");
        }
    }

    drawImages(); //first draw-- initial trial


    var imgStr2;

    function getRandomImage(imgAr, path) {
        var num = Math.floor(Math.random() * imgAr.length);
        var img = imgAr[num];
        imgStr2 = path + img;
        return imgStr2;
    }

    var item;

    function appendDraggableImage(url) {

        item = document.createElement("img");
        item.src = url;
        item.setAttribute("class", "item");
        item.setAttribute('style', "width: 64px; height: 48px;");

        //append the image to the gallery
        document.getElementById('gallery').appendChild(item);
        gallery_count++;

            /* CONFIG */

            xOffset = 10;
            yOffset = 10;

            // these 2 variable determine popup's distance from the cursor
            // you might want to adjust to get the right result

            /* END CONFIG */
            $(".item").hover(function(e){
                if (isToggleOn()) {
                    $("body").append("<p id='preview'><img src='" + this.src + "' style=\"height=139.2px\" width=\"177.6px\" alt='Image preview'" +
                        " />" + "</p>");
                    $("#preview")
                        .css("top", (e.pageY - xOffset) + "px")
                        .css("left", (e.pageX + yOffset) + "px")
                        .fadeIn("fast");
                }},
                function(){

                    $("#preview").remove();
                });
            $(".item").mousemove(function(e){
                $("#preview")
                    .css("top",(e.pageY - xOffset) + "px")
                    .css("left",(e.pageX + yOffset) + "px");
            });



        var moved;
        $(function () {
            $('.item').draggable({
                helper: 'clone',
                revert: "invalid",
                start: function () {
                    moved = false;
                    $(this).hide();
                    $('.item').css('cursor', 'grabbing');
                },
                stop: function () {
                    if (moved === false) {
                        $(this).show();
                    }

                    $('.item').css('cursor', 'grab');
                }
            });

            $("#arena").droppable({
                accept: '*',
                drop: function (event, ui) {
                    $('.item').css('cursor', 'grab');
                    var parentOffset = $('#arena').offset();
                    if (!ui.draggable.hasClass("newItem")) {
                        moved = true;
                        var new_item = $(ui.helper).clone().removeClass('item').addClass("newItem");
                        new_item.draggable({
                            revert: 'invalid',
                            start: function () {
                                $(ui.helper).hide();
                                d3.select(this).raise();
                                $('.newItem').css('cursor', 'grabbing');
                            },
                            stop: function () {
                                $('.newItem').css('cursor', 'grab');
                            }
                        })
                            .css({
                                'position': 'absolute',
                                'left': (ui.position.left - parentOffset.left + 2) + 'px',
                                'top': (ui.position.top - parentOffset.top - 2) + 'px',
                            });
                        $(this).append(new_item);
                        gallery_count--;
                    }

                    $('.newItem').hover(function(e){
                        if (isToggleOn()){
                            xOffset = 10;
                            yOffset = 10;
                            $("body").append("<p id='preview'><img src='"+ this.src +"' style=\"height=139.2px\" width=\"177.6px\" alt='Image preview'" +
                                " />" +"</p>");
                            $("#preview")
                                .css("top",(e.pageY - xOffset) + "px")
                                .css("left",(e.pageX + yOffset) + "px")
                                .fadeIn("fast");
                        }},
                        function(){

                            $("#preview").remove();
                        });
                    $('.newItem').mousemove(function(e){
                        $("#preview")
                            .css("top",(e.pageY - xOffset) + "px")
                            .css("left",(e.pageX + yOffset) + "px");
                    });
                }
            });
        });

        d3.select('.button_done')
            .on('mousedown', doneButton);

        //#FIXME: currently saves trial data to local text file-- need to hook up to server
        //The way the data is written will need to change if we want all positions printed to one txt file after all trials are completed, rather
        // than one per trial. In that case, we need to know how many trials there would be.
        function doneButton() {
            var cloned_items = $('.newItem');
            getFinalPositions();
            if (gallery_count == 0) {
                writeReport("SONA_data", dict, trial_count); //*this MUST go before the following for-loop in order to save positions of previous trial*
                trial_count++;
                //remove scenes in dict from previous trial to reset to empty dict for scenes in new trial
                for (var i = 0; i < cloned_items.length; i++) {
                    delete dict[cloned_items[i].src];
                }
            }
            //#FIXME: THIS IS WHERE "LIFT THE WEAKEST" ALGORITHM WILL BE IMPLEMENTED RATHER THAN CALLING drawImages() AGAIN (since the subsequent...
            // #FIXME: ...trials will not be randomly generated scenes)
            drawImages(); //generate next subset of random images for next trial
        }

        function getFinalPositions() {
            var newItems = $('.newItem');

            for (var i = 0; i < newItems.length; i++) {
                //this if-statement updates position of images that are moved again
                if (newItems[i].src in dict) {
                    // dict[newItems[i].src] = "x: " + newItems[i].offsetLeft + ", y: " + newItems[i].offsetTop
                    dict[newItems[i].src] = [newItems[i].offsetLeft, newItems[i].offsetTop]
                }
                //else, add a new image to the arena
                else {
                    // dict[newItems[i].src] = "x: " + newItems[i].offsetLeft + ", y: " + newItems[i].offsetTop
                    dict[newItems[i].src] = [newItems[i].offsetLeft, newItems[i].offsetTop]
                }
            }
        }

        function writeReport(path, dict, trial_count) {
            const a = document.createElement("a");

            console.log("version 2.0 original commands")
            a.href = URL.createObjectURL(new Blob([JSON.stringify(dict, null, 2)], {
                type: "text/plain"
            }));
            a.setAttribute("download", subjectId);
            document.body.appendChild(a);
            a.click();

            console.log("Begin Python filesend:");
            console.log("//192.168.99.100:82/upload")
            //console.log("//127.0.0.1:5000/upload")
            url = ("//192.168.99.100:82/upload");

            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
            //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            
            //xhttp.send(JSON.stringify(dict, null, 2));
            console.log(' {\"user\":\"USERID\", \"data\":'+JSON.stringify(dict, null, 2)+ '}' );
            xhttp.send(' {\"user\":\"USERID\", \"data\":'+JSON.stringify(dict, null, 2)+ '}' );


            xhttp.onloadend = function () {
                if (xhttp.readyState === xhttp.DONE) {
                    if (xhttp.status === 200) {
                        console.log("responseText:");
                        //console.log(xhttp.response);
                        console.log(xhttp.responseText);
                    }
                }
            };

            console.log("Done sending info");

            /*
            console.log("responseText:");
            console.log(xhttp.responseText);
            console.log("Done sending info");
            */
            document.body.removeChild(a);

        }

        //resets images to original positions in gallery when user wants to restart;
        //#FIXME: currently uses absolute path instead of relative-- might need to change once on server
        d3.select('.button_reset')
            .on('mousedown', function () {
                var cloned_scenes = $('.newItem');
                for (var i = 0; i < cloned_scenes.length; i++) {
                    //removes scenes from arena
                    cloned_scenes.remove();
                    delete dict[cloned_scenes[i].src];
                    $('.item').show();
                }
                gallery_count = $('.item').length;
            });
    }
}
