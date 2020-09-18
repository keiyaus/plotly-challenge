// Read in JSON file
d3.json("././data/samples.json").then(function(data) {
    console.log(data);
    
    // Build dropdown list content
    // Get a reference to the test subject id dropdown menu
    var dropdownMenu = d3.select("select");

    // Get the list of text subject ids using the "map" method
    var ids = data.names;
    console.log(ids);
    
    // Append each value of ids to dropdownMenu as an option
    ids.forEach(id => {
        var idOption = dropdownMenu.append("option");
        idOption.text(id);
    });

    

});

