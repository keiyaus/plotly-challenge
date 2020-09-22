// Initialize the page with a default plot
function init() {
    d3.json("./data/samples.json").then((data) => {
        console.log(data);
        
        // Populate dropdown menu with sample ids
        let dropdownMenu = d3.select("select");
        data.names.forEach(name => {
            dropdownMenu.append("option").text(name);
            });
    
        // Make plots with default sample
        buildPlots(data.names[0]);
    });
}

// Create function to build new plots
function buildPlots(sampleId) {
    d3.json("./data/samples.json").then((data) => {

        // Assign variables for accessing data
        let metadata = data.metadata.filter(m => m.id.toString() === sampleId)[0];
        let samples = data.samples.filter(s => s.id.toString() === sampleId)[0];

        // Grab values to build the plots
        let sampleValues = samples.sample_values;
        let otuIDs = samples.otu_ids;
        let otuLabels = samples.otu_labels;

        // Console log grabbed values for checking
        console.log(`Sample ID: ${sampleId}`);
        console.log(metadata);
        console.log(samples);
        console.log(sampleValues);
        console.log(otuIDs);
        console.log(otuLabels);

        // Plot horizontal bar chart
        let barData = [{
            type: "bar",
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIDs.slice(0, 10).map((x) => `OTU ${x}`).reverse(),
            hovertemplate: "<b>Amount</b>: %{x}<br>" +
                            "<b>OTU</b>: %{text}",
            text: otuLabels.slice(0, 10),
            orientation: "h"
        }];

        let barLayout = {
            title: `Top 10 OTUs Found in Sample ${sampleId}`,
            xaxis: { title: "Amount of OTU"},
            yaxis: { title: "OTU IDs"}
        };

        Plotly.newPlot("bar", barData, barLayout);

        // // Plot bubble chart
        let bubbleData = [{
            x: otuIDs,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIDs
            },
            hovertemplate: "<b>Amount</b>: %{y}<br>" +
                            "<b>OTU</b>: %{text}",
            text: otuLabels
        }];

        let bubbleLayout = {
            title:`Top 10 OTUs Found in Sample ${sampleId}`,
            xaxis: { title: "OTU IDs" },
            yaxis: { 
                title: "Amount of OTU",
                automargin: true
            },
            // margin: { t: 10}
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        // Populate demographic info box
        let box = d3.select("#sample-metadata");
        
        // Clear box content
        box.html("");

        // Append metadata items to the box
        Object.entries(metadata).forEach(function(key) {
            box.append("p")
                .text(`${key[0]}: ${key[1]}`);
                console.log(`${key[0]}: ${key[1]}`);
        });
    })
}

// Create function to handle sample change
function optionChanged(sampleId) {
   buildPlots(sampleId);
}

// Load init()
init();
