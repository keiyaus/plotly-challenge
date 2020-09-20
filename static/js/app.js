// Read in JSON file
d3.json("./data/samples.json").then((data) => {
    console.log(data);
    
    // Populate dropdown menu with sample ids
    let dropdownMenu = d3.select("select");
    data.names.forEach(name => {
        dropdownMenu.append("option").text(name);
        });

    // Grab values from response json object to built the plots
    
});




// // Initialize the page with default plots & table
// function init() {
//     barData = data.samples.filter(sample => sample === 940);
//     console.log(sample)
    
// }

// // Run initial plot function
// init();

