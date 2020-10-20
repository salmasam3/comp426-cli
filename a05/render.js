/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    return `<div class = 'card' data-id ='${hero.id}' style = "color:${hero.color}; background-color:${hero.backgroundColor}">
        <h1>${hero.first}</h1>
        <h1>${hero.last}</h1>
        <h1>${hero.name}</h1>
        <img src = '${hero.img}' alt = "${hero.name}"></img>
        <span>${hero.firstSeen}</span>
        <p>${hero.description}</p>
        <button class = 'edit' id = '${hero.id}'>Edit</button>
        </div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    return `<form class = "form" data-id = '${hero.id}'> 
        <div class = "field">
            <label class = "label">Hero Name</label>
            <div class = 'control'>
                <input class="input" type="text" id="heroname" value = ${hero.name}>
            </div>
        </div>
        <div class = "field">
            <label class = "label">First Name</label>
            <div class = 'control'>
                <input class="input" type="text" id="firstname" value = ${hero.first}>
            </div>
        </div>
        <div class = "field">
            <label class = "label">Last Name</label>
            <div class = 'control'>
                <input class="input" type="text" id="herolast" value = ${hero.last}>
            </div>
        </div>
        <div class = "field">
            <label class = "label">Hero First Seen</label>
            <div class = 'control'>
                <input class="input" type="text" id="herofirstseen" value = ${hero.firstSeen.toISOString()}>
            </div>
        </div>
        <div class = "field">
            <label>Hero Description</label>
            <div class = 'control'>
                <textarea class="input" type="text" id="herodescription" rows="5" cols="50">${hero.description}</textarea>
            </div>
        </div>
        <button type = "submit" class='save'>Save</button>
        <button class = "cancel">Cancel</button>
    </form>`;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    $((event.target).closest(".card")).replaceWith(renderHeroEditForm(heroicData.find(hero => hero.id === ($(event.target).closest(".card")).data("id"))));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    $((event.target).closest(".form")).replaceWith(renderHeroCard(heroicData.find(hero => hero.id === ($(event.target).closest(".form")).data("id"))));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    for (let i = 0; i < heroicData.length; i++) {
        if(heroicData[i].id == ($(event.target)).closest(".form").data("id")) {
            heroicData[i].name = document.getElementById("heroname").value;
            heroicData[i].first = document.getElementById("firstname").value;
            heroicData[i].last = document.getElementById("herolast").value;
            //heroicData[i].firstSeen = document.getElementById("herofirstseen").value;
            heroicData[i].description = document.getElementById("herodescription").value;
        }
    }
    $((event.target).closest(".form")).replaceWith(renderHeroCard(heroicData.find(hero => hero.id === ($(event.target).closest(".form")).data("id"))));
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for(let i = 0; i<heroes.length; i++) {
        $('#root').append(renderHeroCard(heroes[i]));
    }
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $root.on("click",".edit", handleEditButtonPress);
    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on("click",".save", handleEditFormSubmit);
    
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on("click",".cancel", handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
