/* ***************************************************************************** 
Filename:       cbdropdown.js
Author :        Satyam Shandilya
Version :       1.0
Description :   This file has scripts for check box dropdown
Copyright (C) 2014. All Rights Reserved.
***************************************************************************** */

$(document).ready(function(){
   
   /* Disable the button */
   $("#clickMe").prop("disabled", true);
   
   /* A variable to know if the dropdown has been initialized. This is more handy
    * when data is loaded from database using ajax. In case there is nothing to 
    * show in the dropdown, it is considered non-initialized.
    * */
   var isDropdownInitialized = setDropDownData();
   
   /* Bind event to the textbox. */  
    $("#selectedText").focus(function(){
        this.blur();
    });
  
    $("#selectedText").click(function(){
        if(isDropdownInitialized){
            $("#continentsList").css("display", "block");
            $("#continentsList").focus();
        }
    });
    
   /* Bind event to select all checkbox */ 
    $("#selectAllCB").change(function(){
        if(this.checked === true){
            checkOrUncheck(true);
        }
        else{
            checkOrUncheck(false);
        }
    });
    
    //Function to set the data to dropdown
    function setDropDownData(){
       var initializeDropDown = false; 
        /*
        * Get the dropdown options. This can be retrieved using Ajax in json format. 
        */
       var continents = '[{"option": "Africa", "value":"Africa"}, {"option": "Antarctica", "value":"Antarctica"}, {"option": "Asia", "value":"Asia"},{"option": "Australia", "value":"Australia"},{"option": "Europe", "value":"Europe"},{"option": "North America", "value":"North America"},{"option": "South America", "value":"South America"}]';
                        
        var allContinents = $.parseJSON(continents);
        
        if(allContinents.length > 0){
            initializeDropDown = true;
            for(var index = 0; index < allContinents.length; index++){
                createCheckBox("continentOption", allContinents[index].value);
                createSpan(allContinents[index].option);
            }
        }
        return initializeDropDown;
    }
    
    //Function to create the checkboxes with a name and value
    function createCheckBox(name, value){
        $('#continentsList').append(
           $(document.createElement('input')).attr({
               name:  name,
               value: value,
               type:  'checkbox'
           })
        );
    }
    
    //Function to create span tag to display text
    function createSpan(displayText){
        var spanText = "&nbsp;<span class='labelText'>" + displayText + "</span><br/>";
        $('#continentsList').append(spanText);  
    }
    
    //function to check or uncheck all checkboxes
    function checkOrUncheck(value){
        var allDesiredCheckboxes = $('[name=continentOption]');
        for(var index = 0; index < allDesiredCheckboxes.length; index++){
            allDesiredCheckboxes[index].checked = value;
        }
        
        var valueToDisplay = "";
        if(value){
            if(allDesiredCheckboxes.length === 1){
                valueToDisplay = allDesiredCheckboxes[index].value;
            }else{
                valueToDisplay = "Multiple Selections";
            }
        }
        doDisplayAndActivateButton(valueToDisplay);
    }
    
    //Function to display text and activate button
    function doDisplayAndActivateButton(valueToDisplay){
        $("#selectedText").attr("value", valueToDisplay);
        
        if(valueToDisplay === ""){
             $("#clickMe").prop("disabled", true);
        }else{
             $("#clickMe").prop("disabled", false);
        }
    }
    
    /*
     * Onclick event for newly added checkboxes
     */
    $('[name=continentOption]').change(function(){
        var allDesiredCheckboxes = $('[name=continentOption]');
        var numberOfChecks = 0;
        var selectionText = "";
        for(var index = 0; index < allDesiredCheckboxes.length; index++){
            if(allDesiredCheckboxes[index].checked){
                selectionText = selectionText + allDesiredCheckboxes[index].value + ", ";
                numberOfChecks = numberOfChecks + 1;
            }
        }
    
        var valueToDisplay = "";
        if(numberOfChecks == 0){
            if($("#selectAllCB").prop('checked')){
                $("#selectAllCB").prop("checked", false);
            }
        }else{
             if(numberOfChecks == allDesiredCheckboxes.length){
                $("#selectAllCB").prop("checked", true);
             }else{
                $("#selectAllCB").prop("checked", false);
             }
             if(numberOfChecks === 1){
                valueToDisplay = selectionText.substring(0, selectionText.length-2);
             }else{
                valueToDisplay = "Multiple Selections";
             }
         }
         doDisplayAndActivateButton(valueToDisplay);
    });
    
    /*
    * A listener on document to hide dropdown
    */
    $(document).click(function(e){
        var isHide = false;
        e = e || window.event;
        var selectedElement = e.target || e.srcElement || e.originalTarget;
        if(selectedElement !== null && selectedElement !== undefined){
            if(selectedElement.className === "labelText" || selectedElement.id === "selectedText" || selectedElement.id === "selectAllCB" || selectedElement.name === "continentOption" || selectedElement.id === "continentsList"){
               isHide = false;
            }else{
                isHide = true;
            }
        }else{
            isHide = true;
        }
        if(isHide){
            $("#continentsList").css("display", "none");
        }
    });
    
    //Click event of the button
    $("#clickMe").click(function(){
        var allDesiredCheckboxes = $('[name=continentOption]');
        var selectionText = "";
        for(var index = 0; index < allDesiredCheckboxes.length; index++){
            if(allDesiredCheckboxes[index].checked){
                selectionText = selectionText + allDesiredCheckboxes[index].value + ", ";
            }
        }
        selectionText = selectionText.substring(0, selectionText.length-2);
        var spanText = "<span class='labelText'>Continents selected are:<br>" + selectionText + "</span>";
        $('#selectedContinentsDisplay').append(spanText); 
    });   

});


