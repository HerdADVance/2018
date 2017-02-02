var headliners = [];

var data = houseData;
var sortedData = {
	"Supports": [],
	"Reservations": [],
	"Opposed" : [],
	"Unknown": [],
	"Unclear": []
};

for(i=0; i<data.length; i++){
	switch(data[i]['status']){
		case 'Supports':
			sortedData['Supports'].push(data[i]);
			break;
		case 'Reservations':
			sortedData['Reservations'].push(data[i]);
			break;
		case 'Opposed':
			sortedData['Opposed'].push(data[i]);
			break;
		case 'Unclear':
			sortedData['Unclear'].push(data[i]);
			break;
		case 'Unknown':
			sortedData['Unknown'].push(data[i]);
			break;
	}
}

for (var key in sortedData) {
	for(i=0; i<sortedData[key].length; i++){
		
		if(sortedData[key][i]['party'] == 'R'){

			var firstName = sortedData[key][i]['first_name'];
			var lastName = sortedData[key][i]['last_name'];
			var state = sortedData[key][i]['state'];
			var party = sortedData[key][i]['party'];
			var twitter = sortedData[key][i]['twitter_account'];
			var facebook = sortedData[key][i]['facebook_id'];
			var website = sortedData[key][i]['url'];
			var status = sortedData[key][i]['status'];

			if(status == 'Supports') headliners.push(firstName + ' ' + lastName);

			var row = '<tr class="' + status + '">';
			row += '<td>' + firstName + ' ' + lastName + '</td>';
			row += '<td><a href="' + website + '" target="_BLANK">WEB</a></td>';
			row += '<td><a href="http://twitter.com/' + twitter + '" target="_BLANK"><img class="tw" src="tw-icon.png"></a></td>';
			row += '<td><a href="http://facebook.com/' + facebook + '" target="_BLANK"><img class="fb" src="fb-icon.png"></a></td>';
			row += '<td>' + state + '</td>';
			row += '<td>' + party + '</td>';
			row += '<td>' + status + '</td>';
			row += '</tr>';

			$('.house').append(row);
		}
	}
}

//$('.names').hide().html(headliners[0]).fadeIn(3000);

for(i=0; i<headliners.length; i++){
	var className = classifyName(headliners[i]);
	fillName(headliners[i], className);
}

var headlinersIndex = 0;
var headlinersDelay = 1000;
slideOver(headliners[headlinersIndex]);


function fillName(name, className){
	$('.overlay').append('<p class="names ' + className + '">' + name + '</p>');
}

function classifyName(name){
	name = name.replace(/\,/g, '-').toLowerCase();
	return name = name.replace(/\s+/g, '-').toLowerCase();
	/\./g,' '
}

function slideOver(name){
	var className = classifyName(name);
	
	$('.' + className).show();

	$('.' + className).fadeOut(headlinersDelay, function(){
        if(headlinersIndex < headliners.length){
			headlinersIndex ++;
			if(headlinersDelay >= 150) headlinersDelay -= 50;
			slideOver(headliners[headlinersIndex]);
		}
    });
}