var data = senateData;

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


		var row = '<tr class="' + status + '">';
		row += '<td>' + firstName + ' ' + lastName + '</td>';
		row += '<td><a href="' + website + '" target="_BLANK">WEB</a></td>';
		row += '<td><a href="http://twitter.com/' + twitter + '" target="_BLANK"><img class="tw" src="tw-icon.png"></a></td>';
		row += '<td><a href="http://facebook.com/' + facebook + '" target="_BLANK"><img class="fb" src="fb-icon.png"></a></td>';
		row += '<td>' + state + '</td>';
		row += '<td>' + party + '</td>';
		row += '<td>' + status + '</td>';
		row += '</tr>';

		$('.senate').append(row);

	}
}