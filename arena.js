var bg= document.getElementsByClassName("slider");
var box = document.getElementById("box");
function handleBtnClick(event){
    toggleButton(event.target);
}
function handleBtnKeyDown(event){
    // Check to see if space or enter were pressed
    if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") { // "Spacebar" for IE11 support
        // Prevent the default action to stop scrolling when space is pressed
        event.preventDefault();
        toggleButton(event.target);
    }
}
function toggleButton(element) {
    // Check to see if the button is pressed
    var pressed = (element.getAttribute("aria-pressed") === "true");

    // Change aria-pressed to the opposite state
    element.setAttribute("aria-pressed", !pressed);
    // toggle the play state of the audio file

    if(pressed) {
        box.classList.add("checked");
        bg[0].classList.add("uncheckedBG");

    } else {
        box.classList.remove("checked");
        bg[0].classList.remove("uncheckedBG");
    }
}
function isToggleOn(){
    return document.getElementsByClassName("slider")[0].getAttribute("aria-pressed") === "true";
}

// console.log(screen.width)
// console.log(screen.height)
// console.log($(document).width())
// console.log($(document).height())


function drawArena() {
    var instructions = d3.select("body");
    instructions.append("text")
        .attr("class", "instructions")
        .text("Please arrange the scenes inside the rectangle according to their similarity");

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
                    img = getRandomImage(random_images_array, 'data/arena_scene_examples/');
                    var initialSize = uniqueImg.size; //should start at zero and be of size i after loop
                    uniqueImg.add(img);

                } while (uniqueImg.size == initialSize);
                appendDraggableImage(img);
                i++;
            } while (i <= 45); //sets size of gallery & number of pictures. Integer cannot exceed random_images_array size
        }
        else {
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

        d3.selectAll('.item')
            .on("mouseover", function () {
                if (isToggleOn()) {
                    var tooltip = d3.select('#myTooltip');
                    tooltip.style('display', 'block');
                    tooltip.style('left', d3.event.pageX + "px");
                    tooltip.style('top', d3.event.pageY + "px");
                    tooltip.html('<img src=' + this.src + ' + style="height=139.2px" width="177.6px"/>');
                }
            })
            .on("mouseleave", function () {
                var tooltip = d3.select('#myTooltip');
                tooltip.style('display', 'none');
            });

        var moved;
        $(function() {
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
                    var parentOffset = jQuery('#arena').offset();
                    if(!ui.draggable.hasClass("newItem")) {
                        moved = true;
                        var new_item = $(ui.helper).clone().removeClass('item').addClass("newItem");
                        new_item.draggable({
                            revert: 'invalid',
                            start: function () {
                                $(ui.helper).hide();
                                $('.newItem').css('cursor', 'grabbing');
                            },
                            stop: function () {
                                $('.newItem').css('cursor', 'grab');
                            }
                        }).css({
                            'position': 'absolute',
                            'left': (ui.position.left - parentOffset.left) + 'px',
                            'top': (ui.position.top - parentOffset.top) + 'px',
                        });
                        $(this).append(new_item);
                        gallery_count--;
                    }

                    d3.selectAll('.newItem')
                        .on("mouseover", function (d) {
                            if (isToggleOn()) {
                                var tooltip = d3.select('#myTooltip');
                                tooltip.style('display', 'block');
                                tooltip.style('left', d3.event.pageX + "px");
                                tooltip.style('top', d3.event.pageY + "px");
                                tooltip.html('<img src=' + this.src + ' + style="height: 139.2px" width="177.6px"/>');
                                tooltip.raise();
                            }
                        })
                        .on("mouseleave", function (d) {
                            var tooltip = d3.select('#myTooltip');
                            tooltip.style('display', 'none');
                        })
                }
            });
        });

        d3.select('.button_done')
            .on('mousedown', doneButton);

        //#FIXME: currently saves trial data to local text file-- need to hook up to server
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
            a.href = URL.createObjectURL(new Blob([JSON.stringify(dict, null, 2)], {
                type: "text/plain"
            }));
            a.setAttribute("download", "trial" + trial_count);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

        }

        //resets images to original positions in gallery when user wants to restart;
        //#FIXME: currently uses absolute path instead of relative-- might need to change once on server
        d3.select('.button_reset')
            .on('mousedown', function() {
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
