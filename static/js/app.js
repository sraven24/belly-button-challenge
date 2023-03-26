// get the endpoint data
const bio_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Get the JSON data
function buildChart (sampleId) { 
d3.json(bio_data).then(function(data) {
     const subjectId = data.names;
     var samples = data.samples;
     var testSubject = samples.filter((testonject) => testonject.id == sampleId)[0];
// testing to see if it is grabing the right subject
     console.log(testSubject);

    // set up intial value for page setup
     var otu_ids = testSubject.otu_ids;
     var otu_labels = testSubject.otu_labels;
     var sample_values = testSubject.sample_values;

     //create BarChart
     var trace1 = {
        x:sample_values.slice(0,10).reverse(),
        y:otu_ids
            .slice(0,10)
            .map((otuID) => `OTU ${otuID}`)
            .reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
     };
     var data = [trace1];
      // layout for barchart
     var layout = {
        title: "Most Prevalent Cultures",
        margin: {t: 60, l: 90},
        height: 300,
     };
      // create barchart display
     Plotly.newPlot("bar",data,layout);

     // Create Bubble Chart
     var trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            color: otu_ids,
            size: sample_values,
            colorscale: "Portland",
        },
     }
     var data = [trace2]
     // setup design for Bubble Chart
     var layout = {
        margin: {t: 0},
        xaxis: {title:"OTU ID"},
        hovermode: "closest",
        width:window.width,
     };
     // Display Bubble Chart
     Plotly.newPlot("bubble",data,layout);
 });
 }

 // Demographic Info
 function demography(sampleId) {
    d3.json(bio_data).then(function(data) {
        var metaData = data.metadata;
        var person = metaData.filter((testperson) => testperson.id == sampleId)[0];
        var demoBox=d3.select("#sample-metadata");
        demoBox.html("");
        Object.entries(person).forEach(function([key, value]){
            demoBox.append("h5").text(`${key}: ${value}`);
        });
    });
 }

 //intialize the drop down menu
function init() {

   d3.json(bio_data).then (function (data) {
        // Set up the DropDown:
        const subjectId = data.names;
        let DropDown = d3.select(`#selDataset`);
    
        subjectId.forEach((name) => {
          DropDown.append(`option`).text(name).property(`value`, name);
        });
        // Reset demographic info and visuals to first subject when page is refreshed.
        const firstSample = subjectId[0];
        buildChart(firstSample);
        demography(firstSample);
      });
    }
    // Pull data for new subject into demo and visuals. 
    function optionChanged(newSample) {
      buildChart(newSample);
      demography(newSample);
    }
    
    init();

