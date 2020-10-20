/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <Salma Samih>
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
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return `<div style = "color:${hero.color}; background-color:${hero.backgroundColor}">
        <div>${hero.first}</div>
        <div>${hero.last}</div>
        <div>${hero.name}</div>
        <img src = '${hero.img}' alt = "${hero.name}"></img>
        <span>${hero.firstSeen}</span>
        <p>${hero.description}</p>
        <button>Edit</button></div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `<form> 
        <div class = "field">
            <label class = "label">Hero Name</label>
            <div class = 'control'>
                <input class="input" type="text" name="heroname" value = ${hero.name}>
            </div>
        </div>
        <div class = "field">
            <label class = "label">First Name</label>
            <div class = 'control'>
                <input class="input" type="text" name="firstname" value = ${hero.first}>
            </div>
        </div>
        <div class = "field">
            <label class = "label">Last Name</label>
            <div class = 'control'>
                <input class="input" type="text" name="herolast" value = ${hero.last}>
            </div>
        </div>
        <div class = "field">
            <label class = "label">Hero First Seen</label>
            <div class = 'control'>
                <input class="input" type="text" name="herofirstseen" value = ${hero.firstSeen.toISOString()}>
            </div>
        </div>
        <div class = "field">
            <label>Hero Description</label>
            <div class = 'control'>
                <input class="input" type="text" name="herodescription" value = ${hero.description}>
            </div>
        </div>
        <textarea></textarea>
        <button type = "submit">Save</button>
        <button>Cancel</button>
    </form>`;
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    

    // TODO: Append the hero cards to the $root element
    for(let i = 0; i<heroes.length; i++) {
        $('#root').append(renderHeroCard(heroes[i]));
    }
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()

    // TODO: Append the hero edit form to the $root element
    $('#root').append(renderHeroEditForm(randomHero));
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
