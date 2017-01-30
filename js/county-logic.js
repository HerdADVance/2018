function results2008(county){
	var results = [];
	results.push({
		"name": "Barack Obama",
		"votes": county["Obama#"]
	});
	results.push({
		"name": "John McCain",
		"votes": county["McCain#"]
	});
	if(county["Nader#"]){
		results.push({
			"name": "Ralph Nader",
			"votes": county["Nader#"]
		});
	}
	if(county["Barr#"]){
		results.push({
			"name": "Bob Barr",
			"votes": county["Barr#"]
		});
	}
	if(county["McKinney#"]){
		results.push({
			"name": "Cynthia McKinney",
			"votes": county["McKinney#"]
		});
	}
	if(county["Baldwin#"]){
		results.push({
			"name": "Chuck Baldwin",
			"votes": county["Baldwin#"]
		});
	}
	if(county["Keyes#"]){
		results.push({
			"name": "Alan Keyes",
			"votes": county["Keyes#"]
		});
	}
	if(county["Paul#"]){
		results.push({
			"name": "Ron Paul",
			"votes": county["Paul#"]
		});
	}
	if(county["Other#"]){
		results.push({
			"name": "Other",
			"votes": county["Other#"]
		});
	}

	for(var x=0; x<results.length; x++){
		if(county["Total"]){
			results[x]["pct"] = results[x]["votes"]/county["Total"];
		}
	}
	return results;
}
function results2012(county){
	var results = [];
	results.push({
		"name": county["FirstOne"] + " " + county["LastOne"],
		"votes": county["VotesOne"],
		"pct": county["VotesOne"]/county["TOTAL VOTES CAST"]
	});
	results.push({
		"name": county["FirstTwo"] + " " + county["LastTwo"],
		"votes": county["VotesTwo"],
		"pct": county["VotesTwo"]/county["TOTAL VOTES CAST"]
	});
	if(county["FirstThree"] != null){
		results.push({
			"name": county["FirstThree"] + " " + county["LastThree"],
			"votes": county["VotesThree"],
			"pct": county["VotesThree"]/county["TOTAL VOTES CAST"]
		});
	}
	if(county["FirstFour"] != null){
		results.push({
			"name": county["FirstFour"] + " " + county["LastFour"],
			"votes": county["VotesFour"],
			"pct": county["VotesFour"]/county["TOTAL VOTES CAST"]
		});
	}
	if(county["FirstFive"] != null){
		results.push({
			"name": county["FirstFive"] + " " + county["LastFive"],
			"votes": county["VotesFive"],
			"pct": county["VotesFive"]/county["TOTAL VOTES CAST"]
		});
	}
	if(county["FirstSix"] != null){
		results.push({
			"name": county["FirstSix"] + " " + county["LastSix"],
			"votes": county["VotesSix"],
			"pct": county["VotesSix"]/county["TOTAL VOTES CAST"]
		});
	}
	if(county["FirstSeven"] != null){
		results.push({
			"name": county["FirstSeven"] + " " + county["LastSeven"],
			"votes": county["VotesSeven"],
			"pct": county["VotesSeven"]/county["TOTAL VOTES CAST"]
		});
	}
	if(county["FirstEight"] != null){
		results.push({
			"name": county["FirstEight"] + " " + county["LastEight"],
			"votes": county["VotesEight"],
			"pct": county["VotesEight"]/county["TOTAL VOTES CAST"]
		});
	}
	if(county["FirstNine"] != null){
		results.push({
			"name": county["FirstNine"] + " " + county["LastNine"],
			"votes": county["VotesNine"],
			"pct": county["VotesNine"]/county["TOTAL VOTES CAST"]
		});
	}
	return results;
}