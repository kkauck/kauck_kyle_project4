/*
Kyle Kauck
Project Three
VFW 1304
April 22, 2013
*/

window.addEventListener("DOMContentLoaded", function (){
    
    //Function to get my ID Tags from the HTML
    function idGrabber(y) {
        var idTag = document.getElementById(y);
        return idTag;
    };
       
    //Select option for my HTML Form
    function createConsoles(){
    	var consoleCreation = ["Please Select A Platform", "Xbox 360", "Playstation 3", "Wii U", "PC", "Playstation Vita", "Nintendo 3DS", "iPhone/iPad", "Android"]; 
            consoleTag      = idGrabber("selectConsole"),
            createSelect    = document.createElement("select");
            createSelect.setAttribute("id", "consoles");
        for (var a = 0, b = consoleCreation.length; a < b; a++) {
            var consoleOptions       = document.createElement("option")
            var optionValues         = consoleCreation[a];
            consoleOptions.setAttribute("value", optionValues);
            consoleOptions.innerHTML = optionValues;
            createSelect.appendChild(consoleOptions);
        };
        consoleTag.appendChild(createSelect);
    }
   
   //Function to find out what radio button was selected by the user
   function valueOfMultiplayer() {
        var selected 	  = document.getElementById("addGameForm").multiplayer;
        for (var c = 0, d = selected.length; c < d; c++) {
            if (selected[c].checked){
                multiplayerSelection = selected[c].value;
                return multiplayerSelection;
            } else {
	            multiplayerSelection = false;
            }
        }
       return multiplayerSelection
    }
  
    //Function for Data Storage
    function dataStorage(gameKey){
    	if (!gameKey) {
        	var idGenerator = Math.floor(Math.random()*1000000000);
        } else {
	    	idGenerator = gameKey;    
        }
        valueOfMultiplayer();
        var gameLibrary = {
            gameTitle  :["", idGrabber("gameTitle").value],
            console    :["<strong>Console:</strong> ", idGrabber("consoles").value],
            genre      :["<strong>Genre:</strong> ", idGrabber("genre").value],
            dateAdded  :["<strong>Date Added:</strong> ", idGrabber("dateAdded").value],
            rating     :["<strong>Rating:</strong> ", idGrabber("rating").value],
            multiplayer:["<strong>Multiplayer Functionality:</strong> ", multiplayerSelection],
            download   :["<strong>Download Size:</strong> ", idGrabber("download").value],
            additional :["<strong>Additional Information:</strong> ", idGrabber("addInformation").value]
        };
        localStorage.setItem(idGenerator, JSON.stringify(gameLibrary));
        alert("Game Information Has Been Saved!");
    }
   
    //Function to display data - Created a paragraph to append to my empty div tag on the html page, which then has a span appended to it 		every time the function loops and adds another element to the html.
    function dataFetch(){
    	formDisplay("on")
		var createInfo = document.getElementById("gameInfoDisplay");
		for (var e = 0, f = localStorage.length; e < f; e++) {
		    var gameKey = localStorage.key(e);
		    var gameValue = localStorage.getItem(gameKey);
		    var gameInfoObject = JSON.parse(gameValue);
            var gameList = document.createElement("p");
			gameList.setAttribute("id", "gameListInfo");
			createInfo.appendChild(gameList);
			var listButtons = document.createElement("span");
			listButtons.setAttribute("id", "listButtons");
            for (var g in gameInfoObject) {
				var createGameList = document.createElement("span");
                createGameList.setAttribute("id", "gameInfoList");
				gameList.appendChild(createGameList);
				var gameTextOutput = gameInfoObject[g][0] + gameInfoObject[g][1];
				createGameList.innerHTML = gameTextOutput;
				gameList.appendChild(listButtons)
            }
            createButtons(localStorage.key(e), listButtons);
		}
    }
    
    //Function that created my buttons to edit and delete specific items in the application.
    function createButtons(gameKey, listButtons){
	    var createEditButton = document.createElement("a");
	    createEditButton.setAttribute("id", "createdButton");
	    createEditButton.href = "#";
	    createEditButton.key = gameKey;
	    createEditButton.innerHTML = "Edit Game";
	    createEditButton.addEventListener("click", editMyGame)
	    listButtons.appendChild(createEditButton);
	    
	    var createDeleteButton = document.createElement("a");
	    createDeleteButton.setAttribute("id", "createdButton");
	    createDeleteButton.href = "#";
	    createDeleteButton.key = gameKey;
	    createDeleteButton.innerHTML = "Delete Game";
	    createDeleteButton.addEventListener("click", deleteMyGame);
	    listButtons.appendChild(createDeleteButton);
    }
    
    //Function that lets a user edit the games that they have input into storage
    function editMyGame(){
	    var gameInformation = localStorage.getItem(this.key);
	    var gameLibrary = JSON.parse(gameInformation);
	    
	    formDisplay("off");
	    
	    idGrabber("gameTitle").value = gameLibrary.gameTitle[1];
	    idGrabber("consoles").value = gameLibrary.console[1];
	    idGrabber("genre").value = gameLibrary.genre[1];
	    idGrabber("dateAdded").value = gameLibrary.dateAdded[1];
	    idGrabber("rating").value = gameLibrary.rating[1];
	    var multiplayer = document.getElementById("addGameForm").multiplayer;
        for (var c = 0, d = multiplayer.length; c < d; c++) {
	        if (multiplayer[c].value == "Yes" && gameLibrary.multiplayer[1] == "Yes") {
	        	multiplayer[c].setAttribute("checked", "checked");
	        } else if (multiplayer[c].value == "No" && gameLibrary.multiplayer[1] == "No") {
	        	multiplayer[c].setAttribute("checked", "checked");    
	        }
        }
	    idGrabber("download").value = gameLibrary.download[1];
	    idGrabber("addInformation").value = gameLibrary.additional[1];
	    
	    saveInfo.removeEventListener("click", dataStorage);
	    idGrabber("submitButton").value = "Edit Game";
	    var gameEditor = idGrabber("submitButton");
	    gameEditor.addEventListener("click", fieldCheck);
	    gameEditor.key = this.key;
    }
    
    //Function that validates the required fields within the application.
    function fieldCheck(prevent){
    	var errorMessages = [];
    	
    	warningDisplay.innerHTML = "Please double check your form and complete the following items that have a red warning background.";
	    
	    //Error Message for Game Title
	    if(idGrabber("gameTitle").value === ""){
		    var getErrorID = document.getElementById("titleError");
		    getErrorID.setAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "block";
		    var gameError = "Please enter a game title.<br />";
		    errorMessages.push(gameError);
	    } else {
	    	var getErrorID = document.getElementById("titleError");
		    getErrorID.removeAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "none";
	    }
	    
	    //Error Message for Consoles
	    if(idGrabber("consoles").selectedIndex === 0){
		    var getErrorID = document.getElementById("consoleError");
		    getErrorID.setAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "block";
		    var consoleError = "Please select a console.<br />";
		    errorMessages.push(consoleError);
	    } else {
	    	var getErrorID = document.getElementById("consoleError");
		    getErrorID.removeAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "none";
	    }
	    
	    //Error Message for Genre
	    if(idGrabber("genre").value === ""){
		    var getErrorID = document.getElementById("genreError");
		    getErrorID.setAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "block";
		    var genreError = "Please enter a genre.<br />";
		    errorMessages.push(genreError);
	    } else {
	    	var getErrorID = document.getElementById("genreError");
		    getErrorID.removeAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "none";
		}

		//Error Message for Date Added
		if(idGrabber("dateAdded").value === ""){
		    var getErrorID = document.getElementById("dateError");
		    getErrorID.setAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "block";
		    var dateError = "Please enter a day.";
		    errorMessages.push(dateError);
	    } else {
	    	var getErrorID = document.getElementById("dateError");
		    getErrorID.removeAttribute("class", "warning");
		    idGrabber("warningSystem").style.display = "none";
	    }
	    
	    //Error Message for Multiplayer
		if(idGrabber("yes").checked == false && idGrabber("no").checked == false) {
			var getErrorID = document.getElementById("multiplayerError");
			getErrorID.setAttribute("class", "warning");
			idGrabber("warningSystem").style.display = "block";
			var multiplayerError = "Please select a multiplayer option.<br />";
			errorMessages.push(multiplayerError);
		} else {
			var getErrorID = document.getElementById("multiplayerError");
           	getErrorID.removeAttribute("class", "warning");
           	idGrabber("warningSystem").style.display = "none";
		}
	    
	    //If errors are made display them
	    if (errorMessages.length >= 1){
		    for (var x = 0, y = errorMessages.length; x < y; x++){
			    var errorDisplay = document.createElement("span");
			    errorDisplay.setAttribute("id", "errorMessages")
			    errorDisplay.innerHTML = errorMessages[x];
			    warningDisplay.appendChild(errorDisplay);
			    idGrabber("warningSystem").style.display = "block";
		    }
		    saveInfo.removeEventListener("click", resetForm);
		    return false;
		} else {
			dataStorage(this.key);
			window.location.reload();		
		}
    }
    
    //Toggle controlf function - Added in coding for my footer thank you that is displayed on the page when the form is shown.
    function formDisplay(h){
	    switch(h){
	    case "on":
	    	idGrabber("addGameForm").style.display = "none";
	    	idGrabber("gameInfoDisplay").style.display = "block";
	    	idGrabber("clearData").style.display   = "inline-block";
	    	idGrabber("displayData").style.display = "none";
	    	idGrabber("addNewGame").style.display  = "inline-block";
	    	idGrabber("thankYou").style.display    = "none";
	    	break;
	    case "off":
	    	idGrabber("addGameForm").style.display = "block";
	    	idGrabber("clearData").style.display   = "inline-block";
	    	idGrabber("displayData").style.display = "inline-block";
	    	idGrabber("addNewGame").style.display  = "none";
	    	idGrabber("gameInfoDisplay").style.display = "none";
	    	idGrabber("thankYou").style.display    = "block";
	    	 break;
	    default:
	    	return false;
	    }
    }
    
    //Function that will allow the user to delete one item at a time from storage.
    function deleteMyGame(){
	    var confirmDelete = confirm("Please confirm that you would like to delete this game.");
	    if (confirmDelete) {
		    localStorage.removeItem(this.key)
		    alert("This game was successfully deleted from storage.")
		    window.location.reload();
	    } else {
		    alert("Your game was not deleted.");
		    window.location.reload();
	    }
    }
    
    // This function will delete the data a user has saved, or if no data in in storage will let the user know there is nothing to delete.
    function dataDelete(){
	    if(localStorage.length === 0){
			alert("You have no saved data to delete.");    
	    } else {
			localStorage.clear();
			alert("You have successfully cleared your data");
			window.location.reload();
		return false;
	    }
    }
    
    /*
    I created this function because for my code the form would not reset once I had submitted the data so I added in this little bit of code 	to allow the form to reset once the user submitted their game.
    */
    
    //Function to reset the form fields
    function resetForm(){
		document.getElementById("addGameForm").reset();
    }
    
    //Click events from buttons in HTML
    var displayData = idGrabber("displayData");
    	displayData.addEventListener("click", dataFetch);
    var clearData 	= idGrabber("clearData");
    	clearData.addEventListener("click", dataDelete);
    var saveInfo 	= idGrabber("submitButton");
    	saveInfo.addEventListener("click", fieldCheck);
        saveInfo.addEventListener("click", resetForm) //Added in to reset my form
    
    //Call for the create console select/option for form
    createConsoles();
    
    //Variables
    var warningDisplay = idGrabber("warningSystem");

});