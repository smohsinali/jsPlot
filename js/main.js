/**
 * Created by moni on 20.02.17.
 */


var fileInput = document.getElementById("csv");
var data = [];
var features = [];
var size = [];
var runtimes = [];
var readFile = function () {
    features = [];
    size = [];
    runtimes = [];
    for (var i = 0; i < fileInput.files.length; i++) { // for multiple files
        features.push([]);
        size.push([]);
        runtimes.push([]);
        (function(file, index) {
            var name = file.name;
            var reader = new FileReader();
            reader.onload = function(e) {
                // get file content
                data = $.csv.toArrays(e.target.result);
                for (var j = 1; j < data.length; j++) {
                    features[index].push(parseInt(data[j][1]));
                    size[index].push(parseInt(data[j][0]));
                    runtimes[index].push(parseFloat(data[j][2]));
                }
            };
            reader.readAsText(file, "UTF-8");
        })(fileInput.files[i], i);

    }
};
// start readin the file. When it is done, calls the onload event defined above.
fileInput.addEventListener('change', readFile);

console.log("main.js loaded");
console.log(Plotly.BUILD);

TESTER = document.getElementById('tester');
var plot = function () {
    var traces = [];
    for (var i = 0; i < fileInput.files.length; i++) {
        traces.push({
            type: 'scatter3d',
            mode: 'lines',
            x: size[i],
            y: features[i],
            z: runtimes[i],
            text: fileInput.files[i].name
        });
        // traces.push(trace);
    }

    var layout = {
        autosize: false,
        width: 700,
        height: 700,
        margin: {
            l: 50,
            r: 50,
            b: 0,
            t: 0,
            pad: 4
        }
        // paper_bgcolor: '#7f7f7f',
        // plot_bgcolor: '#c7c7c7'
    };

    Plotly.newPlot('tester', traces, layout);
};
// Plotly.plot( TESTER, [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16] }], {
//     margin: { t: 0 } }
// var plot = function(){
//     Plotly.plot(TESTER, [{
//         type: 'scatter3d',
//         mode: 'lines',
//         x: size,
//         y: features,
//         z: runtimes,
//         text: '1019'
//     }], {
//         margin: {t: 0}
//     });
// };
