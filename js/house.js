var data = houseData;

data.sort(function(a,b) {return (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0);} ); 

for(i=0; i<data.length; i++){

	if(data[i]['party'] == 'R'){

		var firstName = data[i]['first_name'];
		var lastName = data[i]['last_name'];
		var state = data[i]['state'];
		var party = data[i]['party'];
		var twitter = data[i]['twitter_account'];
		var facebook = data[i]['facebook_id'];
		var website = data[i]['url'];
		var status = data[i]['status'];

		if(status == 'Supports') headliners.push(firstName + ' ' + lastName);

		var row = '<tr class="' + status + '">';
		row += '<td>' + firstName + ' ' + lastName + '</td>';
		row += '<td><a href="' + website + '" target="_BLANK">WEB</a></td>';
		row += '<td><a href="http://twitter.com/' + twitter + '" target="_BLANK">TW</a></td>';
		row += '<td><a href="http://facebook.com/' + facebook + '" target="_BLANK">FB</a></td>';
		row += '<td>' + state + '</td>';
		row += '<td>' + party + '</td>';
		row += '<td>' + status + '</td>';
		row += '</tr>';

		$('.house').append(row);

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