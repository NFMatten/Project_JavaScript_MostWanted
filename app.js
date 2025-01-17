/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            let data = people
            searchResults = singleTraitSearch(data);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            // alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            // alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()


/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

/**
 * Purpose: To find entire immediate family members of person being searched.
 * @param {*} person -- object
 * @param {*} people -- dictionary
 */
function findPersonFamily(person, people){
    let familyArray = [];
    familyArray.push(findParents(person, people), findSpouse(person, people), findSiblings(person, people),);
    let flattenedFamilyArray = familyArray.flat();
    let displayNames = displayPeople(flattenedFamilyArray);
}
// end findPersonFamily()

/**
 * Purpose: To find the spouse of person being searched.
 * @param {*} person -- object
 * @param {*} people -- dictionary
 * @returns 
 */
function findSpouse(person, people){
    let familyArray = [];
    let spouseId = person.currentSpouse;
    let spouse = people.filter(function(el){
        if(spouseId === el.id){
            return true;
        }
        else{
            return false;
        }
    })
    if (spouseId != null){
        familyArray.push(spouse[0]);
    } 
    return familyArray;
}
//end findSpouse()

/**
 * Purpose: To find parents of person being searched.
 * @param {*} person -- object
 * @param {*} people -- dictionary
 * @returns 
 */
function findParents(person, people){
    let familyArray = [];
    let parents = person.parents;
    let parentObjects = people.filter(function(el){
        if(parents.includes(el.id)){
            return true;
        }
        else{
            return false;
        }
    })
    for(let i=0; i < parentObjects.length; i++){
        familyArray.push(parentObjects[i]);
    }
    return familyArray;
}
// end findParents()

/**
 * Purpose: To find siblings of person being searched.
 * @param {*} person -- object
 * @param {*} people -- dictionary
 * @returns 
 */
function findSiblings(person, people){
    let familyArray = [];
    let parentIds = [];
    let parentObjects = findParents(person, people);

    for(let i=0; i < parentObjects.length; i++){
        parentIds.push(parentObjects[i].id);
    }

    let siblings = people.filter(function(el){
        if (!el.parents){
            return false;
        }
        else if (el.parents.includes(parentIds[0])|| el.parents.includes(parentIds[1])) {
            return true;
        }
        else {
            return false;
        }
    })
    for (let j=0; j<siblings.length; j++){
        if (siblings[j] != person) {
            familyArray.push(siblings[j]);
        }
    }
    return familyArray;
}
// end findSiblings()
    // end finding family members functions

/**
 * Purpose: To find grandchildren of person, if any.
 * @param {*} person -- object
 * @param {*} people -- dictionary
 */
function findPersonDescendants(person, people) {
    let listOfDesc = [];
    // Children of parent
    let child = people.filter(function(el){
        if (el.parents.includes(person.id)) {
            return true;
        } else {
            return false;
        }
    })
    for (let i = 0; i<child.length;i++){
        listOfDesc.push(child[i]);
    }

    // children of child
    let grandchild;
    for (let i = 0; i <listOfDesc.length; i++){
        grandchild = people.filter(function(el){
            if (el.parents.includes(listOfDesc[i].id)) {
                return true;
            } else {
                return false;
            }
        })
    }

for (let i = 0; i < grandchild.length; i++){
    listOfDesc.push(grandchild[i]);
}
    let displayDescendants = displayPeople(listOfDesc);

}
// End of findPersonDescendants()

/**
 * Purpose: Search the data list by way of user input. First, collects 'trait type' to search for. Second, collects 'trait' to search for.
 *          If all user input valid, begins search.
 * @param {*} data -- list of objects
 * @returns 
 */
function singleTraitSearch(data){
    let traitType = null;
    let keyValidCheck = false;
    while (keyValidCheck === false){
        while ((traitType === null) || (traitType === "")){
        traitType = searchPrompt("trait type");
        }
        if (traitType != 'done'){
            let keyTerm = toKeyTerm(traitType);
            keyValidCheck = isValidKey(keyTerm, data);
            if (keyValidCheck === true){
                let inputTrait = searchPrompt(traitType);
                data = searchForValue(data, toKeyTerm(traitType), inputTrait)
                displayPeople(data);
                if(data.length > 1){
                    return singleTraitSearch(data);
                }
                return data;
            } else {
                alert(`${traitType} is an invalid trait type, please try again.`);
                traitType = null;
            }
        
        } else {
            return;
        }
    }
}
// end singleTraitDescendants()

/**
 * Purpose: To gain user input by prompting user what to search for.
 * @param {*} trait -- string
 * @returns 
 */
function searchPrompt(trait){
    if (trait === null){
        return; // terminate program
    }
    let userInput = prompt(`Please enter ${trait} to search for.`);
    return userInput;
}
// end searchPrompt()

/**
 * Purpose: To take in user input, convert to style of object's key name
 *          i.e. 'eye color' --> 'eyeColor'
 * @param {*} inputtedTraitType -- user input
 * @returns 
 */
function toKeyTerm(inputtedTraitType){
    let secondWord;
    let wordCapitalized;
    let key = "";
    let wordToLower = inputtedTraitType.toLowerCase();
    let inputToArray = wordToLower.split(" ");

    if (inputToArray.length > 1){
        secondWord = inputToArray.pop();
        wordCapitalized = secondWord.charAt(0).toUpperCase() + secondWord.slice(1)
        inputToArray.push(wordCapitalized);
        }

    for (let i=0;i<inputToArray.length;i++){
        key += inputToArray[i]
    }
    return key;
}
// end toKeyTerm()

/**
 * Purpose: Takes in user input, determines if it's all numbers (i.e. height or weight) or characters.
 *          Then parses input to INT if needed, or keeps as string.
 *          Finally, filters data list to find and match the key's value.
 * @param {*} people - data list
 * @param {*} trait - object key name
 * @param {*} traitName - object value
 * @returns filtered results based on user input
 */
function searchForValue(people, trait, traitName){
    let numberTest = /^\d+$/.test(traitName);
    let valueToSearch;

    if (numberTest == true) {
        valueToSearch = parseInt(traitName);
    } else {
        valueToSearch = traitName;
    }

    let results = people.filter(function(el){
        if (el[trait] === valueToSearch){
            return true;
        } else {
            return false;
        }
    })
    return results;
}
// end searchForValue()

/**
 * Purpose: To validate user input to ensure it matches the object's key name
 * @param {*} keyTerm -- user input
 * @param {*} people -- data list
 * @returns 
 */
function isValidKey(keyTerm, people){
    let keys = Object.keys(people[0]);
    if (keys.includes(keyTerm)){
        return true;
    } else {
        return false;
    }
}
// end isValidKey()