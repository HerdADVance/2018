var globalSxOne, globalSyOne, globalSsOne, globalSxTwo, globalSyTwo, globalSsTwo;

var area= d3.select("#map2").node().getBoundingClientRect();
var w = area.width;
var sw = 690;
var h = 950;

var svgtwo = d3.select("#map2").append("svg").attr({width: w, height: h });

var tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.attr("id", "tooltip")
		.style("opacity", 0)



function getPathSizes(stateProj){
	var area= d3.select("#map2").node().getBoundingClientRect();
	var w = area.width;
	var sw = 690; //standard width
	var h = 950; //height

	var sx = stateProj["sx"]; // translate-x for standard width
	var sy = stateProj["sy"]; // translate-y
	var ss = stateProj["ss"]; // scale

	var nw = sx - ((sw-w)/2); // translate-x for new width

	var proj = d3.geo.albers()
		.translate([nw, sy])
		.scale([ss])

	var path = d3.geo.path().projection(proj);
	return path;
}

function setGlobalProjections(stateProj, mapId){

	if(mapId == "#map2"){
		globalSxTwo = stateProj["sx"];
		globalSyTwo = stateProj["sy"];
		globalSsTwo = stateProj["ss"];
	}
}

function classifyName(name){
	name = name.replace(/\./g, '-').toLowerCase();
	name = name.replace(/\,/g, '-').toLowerCase();
	return name = name.replace(/\s+/g, '-').toLowerCase();
	/\./g,' '
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function fillColor(votes, countyId, year){
	var countyId = countyId.slice(7);
	var county = $.grep(votes, function(e){ return e["FIPS Code"] == countyId; });
	var results = countyResults(county[0], year);
	if(results.length > 0){
		return classifyName(results[0].name)
	}
	else return "none";
}
function countySuffix(state){
	switch(state){
		case "LA":
			var suffix = " Parish";
			break;
		case "US":
			var suffix = "";
			break;
		default:
			var suffix = " County";
	}
	return suffix;
}
function countyResults(county, year){
	var results = [];
	if(county){

		switch(year){
			case "2008":
				results = results2008(county);
				break;
			case "2012":
				results = results2012(county);
				break;
		}

		results.sort(function(a, b){return b.votes-a.votes});
		results = results.slice(0,5);
	}
	return results;
}

function tooltipData(votes, countyId, state, year){
	var countyId = countyId.slice(7);
	var county = $.grep(votes, function(e){ return e["FIPS Code"] == countyId; });
	var results = countyResults(county[0], year);

	if(results.length > 0){
		var output = "<p class='county-name'>" + county[0]["County Name"] + countySuffix(state) + "</p>";
		output += "<table class='county-results'><tr><th></th><th>Votes</th><th>Pct</th></tr>"
		for(var i=0; i<results.length; i++){
			var pct = ((results[i].pct)*100).toFixed(2) + "%";
			var votes = numberWithCommas(results[i].votes);
			output += "<tr><td class='cand-name'>" + results[i].name + "</td><td>" + votes + "</td><td>" + pct + "</td></tr>";
		}
		output += "</table>";
		return output;
	}
	else return "<p class='county-name'>County results unavailable</p>";
}

// function addStateData(state, mapId, year){
// 	var output = "";
// 	var results = countyResults(state, year);
// 	for(var i=0; i<results.length; i++){
// 		var pct = ((results[i].pct)*100).toFixed(2) + "%";
// 		output += "<div class='state-cand " + classifyName(results[i].name) + "'>";
// 		output += results[i].name + ": <span class='state-votes'>" + numberWithCommas(results[i].votes) + "</span><span class='state-pct'>" + pct + "</span>";
// 		output += "</div>";
// 	}
// 	d3.select(mapId + " .state-data").remove();
// 	d3.select(mapId).append("div").attr("class", "state-data").html(output);
// }

function buildSvg(mapId, stateProj, counties, votes, state, year){

	if(mapId == "#map2"){ var svg = svgtwo;}

	var path = getPathSizes(stateProj);
	
	svg.selectAll("path").remove();
	svg.selectAll("path").data(counties).enter().append("path")
		.attr({
			"d":  path,
			"stroke": "#BF0A30",
			"stroke-width": 3,
			"id": function(d){return d.properties.geoid; },
			"class": function(d){return fillColor(votes, d.properties.geoid, year); },
			"data-state": function(d){return d.properties.LSAD; }
		})
		.on("mouseover", function(d){
			// position tooltip on left or right side of mouse and find width of tooltip
			var tooltipWidth = d3.select("#tooltip").node().getBoundingClientRect().width;
			if(tooltipWidth == 0){tooltipWidth = 300;}
			var width = d3.select("body").node().getBoundingClientRect().width;
			var pageX = d3.event.pageX;
			if(pageX <= width/2){var xPos = pageX + 20;}
			else{var xPos = pageX - tooltipWidth - 20;}
				
			d3.select(this).attr({
				"stroke-width": 5
			})
			tooltip.transition()
				.duration(300)
				.style("opacity", .95)
			tooltip.html(tooltipData(votes, d.properties.geoid, state, year))
				.style("left", (xPos) + "px")
				.style("top", (d3.event.pageY - 80) + "px")
		})
		.on("mouseout", function(d){
			d3.select(this).attr({
				"stroke-width": 3
			})
			tooltip.transition()
				.duration(300)
				.style("opacity", 0)
		})
		.on("click", function(d){
			if(state == "US"){
				var clickedState = $(this).attr("data-state");
				var election = $(mapId + ' .map-el-select ').find(":selected").val();
				changeMap(clickedState, election, mapId);
				$(mapId + ' .map-st-select ').val(clickedState);
				tooltip.transition()
				.duration(300)
				.style("opacity", 0)
			}
		});

	addStateData(votes[0], mapId, year);

	// svg.selectAll("circle")
	// 	.data([0,0]).enter()
	// 	.append("circle")
	// 	.attr("cx", 100)
	// 	.attr("cy", 100)
	// 	.attr("r", "5px")
	// 	.attr("fill", "#000")
}


function changeMap(state, election, mapId){

	election = (election).split('-');
	var year = election[0];
	var party = election[1];

	var mapData = "/maps/" + state + ".json";
	var voteData = "/data/" + state + year + "gen.json";	

	d3.json(mapData, function(mapJson){
		var counties = mapJson.features.sort(function(a, b){return a["geoid"]-b["geoid"]});
		var stateProj = {
			"sx": mapJson["sx"],
			"sy": mapJson["sy"],
			"ss": mapJson["ss"],
		}
		d3.json(voteData, function(voteJson){
			votes = voteJson.sort(function(a, b){return a["FIPS Code"]-b["FIPS Code"]});
			setGlobalProjections(stateProj, mapId);
			buildSvg(mapId, stateProj, counties, votes, state, year)
		});
	});
}

changeMap('US', '2012-gen', '#map2');
