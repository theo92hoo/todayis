$(document).ready( function() {
	
	$monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
	$calendar = {};
	$calendar = $('.calendar').define({
		targets: {
			nextDay: 'calendar-next-day',
			previousDay: 'calendar-previous-day',
			nextMonth: 'calendar-next-month',
			previousMonth: 'calendar-previous-month',
			nextYear: 'calendar-next-year',
			previousYear: 'calendar-previous-year'
		},
    });
	
	//sort Array
	sampleData.sort(function(a, b){return Date.parse(a.date)-Date.parse(b.date)});
	sampleData.forEach(function(obj){
	console.log(obj.date);
	});
});