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
	sampleData.forEach(function(sampleDataObj){
		sampleDataObj.sort(function(a, b){return Date.parse(a.date)-Date.parse(b.date)});
	});
	
	$(".top-header").on('click', '.fa-th', function(){
		$(window).scrollTop($(".project-body").position().top);
	});
	
	$(".top-header").on('click', '.fa-calendar', function(){
		$(window).scrollTop($(".calendar").position().top);
	});
	
	console.log(sampleData)
});