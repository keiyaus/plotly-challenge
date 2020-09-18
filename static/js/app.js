// Read in JSON file & assign variable to it
let data = d3.json("././data/samples.json").then(function (data) {
    console.log(data);

    // Build dropdown list content
    // Get a reference to the test subject id dropdown menu
    let dropdownMenu = d3.select("select");

    // Get the list of text subject ids
    let ids = data.names;
    console.log(ids);

    // Append each value of ids to dropdownMenu as an option
    ids.forEach(id => {
        let idOption = dropdownMenu.append("option");
        idOption.text(id);
    });

    // Initialize the page with default plots & table
    // function init() {
    //     data.samples.filter(sample => sample === 940);
    //     console.log(sample)
    //     // barData = 
    // }



});


