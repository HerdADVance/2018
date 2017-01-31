$('#about').click(function(){
	$('#mapcon').hide();
	$('#about-page').show();
});
$('#back').click(function(){
	$('#about-page').hide();
	$('#mapcon').show();
});

//console.log(congressData['results'][0]['members']);
var congress = congressData['results'][0]['members'];


for(i=0; i<congress.length; i++){
	var firstName = congress[i]['first_name'];
	var lastName = congress[i]['last_name'];
	var party = congress[i]['party'];
	var state = congress[i]['state'];

	$('.congress').append('<tr class="' + party + '"><td>' + firstName + ' ' + lastName + '</td><td>' + party + '</td><td>' + state + '</td><td>' + 'Status' + '</td></tr>');
}