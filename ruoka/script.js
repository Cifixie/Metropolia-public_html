$(function() {
	var date = new Date();
	var dateFrom = date.getDate();
	var dateTo = dateFrom+2;
	var foodType = 'Metropolia Edullisesti';

	var isRegular = function(regular, weekday) {
		return regular.when.indexOf(weekday) > -1
	}
	var isOpen = function(regular) {
		var open = regular.open.split(':');
		var close = regular.close.split(':');
		var hours = date.getHours();
		return hours > parseInt(open[0]) && hours < parseInt(close[0]);
	}
	
	$.getJSON("http://messi.hyyravintolat.fi/publicapi/restaurant/27", function( json ) {
		var restaurant = json.information.restaurant;
		var regular = json.information.business.regular[0];

		var menu = json.data
			.filter(function(day) {
				var splitDate = day.date.split(/\s|\./);
				var day = splitDate[1];
				var weekday = splitDate[0];

				return day >= dateFrom && day <= dateTo && isRegular(regular, weekday);
			})
			.map(function(day) {
				var menu = day.data
					.filter(function(food) {
						return food.price.name === foodType;
					})
					.map(function(food) {
						return food.name;
					});
				return { date: day.date, menu: menu };
			});
		console.log(regular );
		$('#restaurant-name').text(restaurant);
		
		var labelId = isOpen(regular) ? 'label-open' : 'label-closed';
		$('#' + labelId).toggleClass('hidden');
		$.each(menu, function(index, data) {
			var head = $('<div/>').addClass('panel-heading').text(data.date);
			var content = $('<div/>').addClass('panel-body');
			var list = $('<ul/>');
			content.append(list);
			
			$.each(data.menu, function(index, data) {
				var listItem = $('<li/>');
				listItem.text(data);
				list.append(listItem);
			});
			
			var wrapper = $('<div/>').addClass('panel panel-default');
			wrapper.append(head);
			wrapper.append(content);
			
			$('#content').append(wrapper);
		});
	});
});