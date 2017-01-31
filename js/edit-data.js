var newCongress = [];

var congress = congressData['results'][0]['members'];

congress.sort(function(a,b) {return (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0);} ); 

for(i=0; i<congress.length; i++){

	var newPerson = {};

	newPerson.first_name = congress[i]['first_name'];
	newPerson.last_name = congress[i]['last_name'];
	newPerson.party = congress[i]['party'];
	newPerson.state = congress[i]['state'];
	newPerson.district = congress[i]['district'];
	newPerson.twitter_account = congress[i]['twitter_account'];
	newPerson.facebook_id = congress[i]['facebook_id'];
	newPerson.url = congress[i]['url'];
	newPerson.status = "Unknown";

	newCongress.push(newPerson);

	//$('.congress').append('<tr class="' + party + '"><td>' + firstName + ' ' + lastName + '</td><td>' + party + '</td><td>' + state + '</td><td>' + 'Status' + '</td></tr>');
}

console.log(JSON.stringify(newCongress));



