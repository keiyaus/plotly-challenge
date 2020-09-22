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

        // Plot horizontal bar chart with top 10 samples' values
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
            title: `<b>Top 10 OTUs Found in Sample ${sampleId}</b>`,
            xaxis: { title: "Amount of OTU"},
            yaxis: { title: "OTU IDs"},
            width: 600,
            height: 600
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
            title:`<b>All OTUs Found in Sample ${sampleId}</b>`,
            xaxis: { title: "OTU IDs" },
            yaxis: { 
                title: "Amount of OTU",
                automargin: true
            },
            width: 1200,
            height: 800
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

        // Plot gauge chart
        let gaugeData = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: metadata.wfreq,
              title: { text: "<b>Belly Button Wash Frequency</b><br>" +
                                "Wash per Week" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9] },
                bar: { color: "yellow"},
                steps: [
                  { range: [0, 1], color: "rgba(81, 134, 28, .2)" },
                  { range: [1, 2], color: "rgba(81, 134, 28, .3)" },
                  { range: [2, 3], color: "rgba(81, 134, 28, .4)" },
                  { range: [3, 4], color: "rgba(81, 134, 28, .5)" },
                  { range: [4, 5], color: "rgba(81, 134, 28, .6)" },
                  { range: [5, 6], color: "rgba(81, 134, 28, .7)" },
                  { range: [6, 7], color: "rgba(81, 134, 28, .8)" },
                  { range: [7, 8], color: "rgba(81, 134, 28, .9)" },
                  { range: [8, 9], color: "rgba(81, 134, 28, 1)" }
                ],
              }
            }
          ];
          
          let gaugeLayout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    })
}

// Create function to handle sample change
function optionChanged(sampleId) {
   buildPlots(sampleId);
}

// Load init()
init();
