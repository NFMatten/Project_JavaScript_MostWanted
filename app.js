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
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
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

function findPersonFamily(person, people) {
    // Does not return relation to person
    let familyArray = []

    // Find Spouse
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

    // Find Parent(s)
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

    // Find Sibling(s)
    let parentIds = []
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


    let displayNames = displayPeople(familyArray);
}
// End of findPersonFamily()

function findPersonDescendants(person, people) {

    // person (if parent) --> find child --> if child is parent --> find child --> etc
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

function searchByTraits(people){
    let howManyTraits = prompt("Would you like to search for a single or multiple traits?");
    switch(howManyTraits) {
        case "single":
            let single = singleTraitSearch(people);
            break;
        case "multiple":
            let multiple = multipleTraitsSearch(people);
            break;
    }
}

function singleTraitSearch(people){
    let singleTrait = prompt("Please enter a trait to search for.");
    let userInput;
    let results;
    switch(singleTrait) {
        case "first name":
            results = searchFirstName(people);
            let displayFirstName = displayPeople(results);
            break;
        case "last name":
            results = searchLastName(people);
            let displayLastName = displayPeople(results);
            break;
        case "gender":
            results = searchGender(people);
            let displayGenderResults = displayPeople(results);
            break;
        case "date of birth":
            results = searchDOB(people);
            let displayDOB = displayPeople(results);
            break;
        case "height":
            results = searchHeight(people);
            let displayHeightResults = displayPeople(results);
            break;
        case "weight":
            results = searchWeight(people);
            let displayWeightResults = displayPeople(results);
            break;
        case "eye color":
            results = searchEyeColor(people);
            let displayEyeColorResults = displayPeople(results);
            break;
        case "occupation":
            results = searchOccupation(people);
            let displayOccupationResults = displayPeople(results);
            break;
        case "string" :
            results = searchForString(people, "gender");
            let displayResults = displayPeople(results)
            break;
        
    }
}

function multipleTraitsSearch(people){
    let traits = prompt("Please enter traits to search for.").split(", ");
    let results;
    let arrayOfArrays = [];
    for(let i = 0; i<traits.length;i++){
        let userInput;
        switch(traits[i]) {
            case "gender":
                userInput = prompt("Please enter a gender to search for.");
                results = people.filter(function(el){
                    if (el.gender === userInput.toLowerCase()){
                        return true;
                    } else {
                        return false;
                    }
                })
                arrayOfArrays.push(results);
                break;
            case "height":
                userInput = prompt("Please enter a height to search for.");
                results = people.filter(function(el){
                    if (el.height === parseInt(userInput)){
                        return true;
                    } else {
                        return false;
                    }
                })
                arrayOfArrays.push(results);
                break;
            case "weight":
                userInput = prompt("Please enter a weight to search for.");
                results = people.filter(function(el){
                    if (el.weight === parseInt(userInput)){
                        return true;
                    } else {
                        return false;
                    }
                })
                arrayOfArrays.push(results);
                break;
            case "eye color":
                userInput = prompt("Please enter an eye color to search for.");
                results = people.filter(function(el){
                    if (el.eyeColor === userInput.toLowerCase()){
                        return true;
                    } else {
                        return false;
                    }
                })
                arrayOfArrays.push(results);
                break;
            case "occupation":
                userInput = prompt("Please enter an occupation to search for.");
                results = people.filter(function(el){
                    if (el.occupation === userInput.toLowerCase()){
                        return true;
                    } else {
                        return false;
                    }
                })
                arrayOfArrays.push(results);
                break;
    }}

    let flattenedArray = arrayOfArrays.flat();
    flattenedArray.sort((a, b) => {
        return a.id - b.id;
    });
    
    let finishedArray = []
    let count = 0;
    for(let i = 0; i<flattenedArray.length;i++){
        if(flattenedArray[i] === flattenedArray[i + 1]){
            count++;
            if(count + 1 == traits.length){
                finishedArray.push(flattenedArray[i])
            }
        }
        else{
            count = 0
        }
    }

    displayPeople(finishedArray)

}

// Single responsibility - Single Trait //
function searchPrompt(trait){
    let userInput = prompt(`Please enter ${trait} to search for.`);
    return userInput;
}

function searchFirstName(people) {
    let inputFirstName = searchPrompt("first name");
    let results = people.filter(function(el){
        if (el.firstName === inputFirstName){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchLastName(people){
    let inputLastName = searchPrompt("last name");
    let results = people.filter(function(el){
        if (el.lastName === inputLastName){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchGender(people){
    let inputGender = searchPrompt("gender");
    let results = people.filter(function(el){
        if (el.gender === inputGender){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchDOB(people){
    let inputDOB = searchPrompt("date of birth");
    let results = people.filter(function(el){
        if (el.dob === inputDOB){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchHeight(people){
    let inputHeight = searchPrompt("height");
    let results = people.filter(function(el){
        if (el.height === parseInt(inputHeight)){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchWeight(people){
    let inputWeight = searchPrompt("weight");
    let results = people.filter(function(el){
        if (el.weight === parseInt(inputWeight)){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchEyeColor(people){
    let inputEyeColor = searchPrompt("eye color");
    let results = people.filter(function(el){
        if (el.eyeColor === inputEyeColor){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchOccupation(people){
    let inputOccupation = searchPrompt("occupation");
    let results = people.filter(function(el){
        if (el.occupation === inputOccupation){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchForString(people, trait){
    let inputTrait = searchPrompt(trait);
    let results = people.filter(function(el){
        if (el.trait === inputTrait) {
            return true;
        } else {
            return false;
        }
    })
    return results;
}

function searchForInt(people, trait){
    let inputTrait = searchPrompt(trait);
    let results = people.filter(function(el){
        if (el.trait === parseInt(inputTrait)){
            return true;
        } else {
            return false;
        }
    })
    return results;
}

// case "gender" :
//             results = searchForString(people, "gender");
//             let displayResults = displayPeople(results)
//             break;
