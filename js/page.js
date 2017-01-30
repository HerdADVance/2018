$('#about').click(function(){
	$('#mapcon').hide();
	$('#about-page').show();
});
$('#back').click(function(){
	$('#about-page').hide();
	$('#mapcon').show();
});

for(i=0; i<congress['objects'].length; i++){
	var firstName = congress['objects'][i]['person']['firstname'];
	var lastName = congress['objects'][i]['person']['lastname'];
	var party = congress['objects'][i]['party'];
	var state = congress['objects'][i]['state'];

	$('.congress').append('<tr class="' + party + '"><td>' + firstName + ' ' + lastName + '</td><td>' + party + '</td><td>' + state + '</td><td>' + 'Status' + '</td></tr>');
}