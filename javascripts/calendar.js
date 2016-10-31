!function ($) {
	
	function Calendar(element, options) {
		this.options = options;
		this.element = element;
		this.init();
	}
	
	Calendar.prototype.init = function () {
		this.currentMoment = moment();
		
		this.calendarController(this.currentMoment);
		this.bindEvents();
		this.daysOfTheWeek = [];
	}
	
	Calendar.prototype.calendarController = function (currentMoment){
		/*
		this.setDay(currentMoment);
		this.setMonth(currentMoment);
		this.setYear(currentMoment);
		*/
		this.previousMoment = currentMoment.clone();
		
		this.setCalendar(currentMoment);
	}
	
	/*
	Calendar.prototype.setDay = function (currentMoment){
		$('#day').text(currentMoment.date());
	}
	
	Calendar.prototype.setMonth = function (currentMoment){
		$('#month').text($monthNames[currentMoment.month()]);
	}
	
	Calendar.prototype.setYear = function (currentMoment){
		$('#year').text(currentMoment.year());
	}
	*/
	
	Calendar.prototype.setCalendar = function(currentMoment){
		$('#day').text(currentMoment.date());
		$('#month').text($monthNames[currentMoment.month()]);
		$('#year').text(currentMoment.year());
		
		var numberOfDaysInMonth = currentMoment.daysInMonth();
		
		var monthStart = currentMoment.clone().startOf('month');
		var monthEnd = currentMoment.clone().endOf('month');
		
		var calendarStart = monthStart.clone().subtract(monthStart.day(), 'days');
		var calendarEnd = monthEnd.clone().add(6-monthEnd.day(), 'days');
		
		$('tbody',this.element).children().remove();
	
		var tbody = "<tr>"
		while (calendarStart.isSameOrBefore(calendarEnd,"day")){
			//console.log(calendarStart.format("YYYY-MM-DD"));
			var tableClass = "";
			
			if(calendarStart.isBefore(monthStart,"day") || calendarStart.isAfter(monthEnd,"day")){
				tableClass += "adjacent-day ";
			} 
			else if(calendarStart.isSame(currentMoment,"day")){
				tableClass += "selected-day ";
			} 
			
			sampleData.forEach(function(obj){
				if(moment(obj.date).isSame(calendarStart)){
					tableClass += "event ";
				}
			});
			
			if(calendarStart.day() == 6){
				//calendarStart.day();
				tbody += "<td class='" + tableClass + "' data-id='" + calendarStart.format("YYYY-MM-DD") + "'>" + calendarStart.date() + "</td></tr><tr>";
			}else{	
				tbody += "<td class='" + tableClass + "' data-id='" + calendarStart.format("YYYY-MM-DD") + "'>" + calendarStart.date() + "</td>";
			}
			calendarStart.add(1, 'days');
		}
		tbody += "</tr>"
		
		$('tbody',this.element).html(tbody);
		//$('.calendar-table tbody',this.element).children().remove();
	}
	
	Calendar.prototype.bindEvents = function() {
    var $container = this.element;

    // bind the buttons' events
    $container
      .on('click', '.'+this.options.targets.nextDay, { context: this }, this.nextDay)
      .on('click', '.'+this.options.targets.previousDay, { context: this }, this.previousDay)
      .on('click', '.'+this.options.targets.nextMonth, { context: this }, this.nextMonth)
      .on('click', '.'+this.options.targets.previousMonth, { context: this }, this.previousMonth)
      .on('click', '.'+this.options.targets.nextYear, { context: this }, this.nextYear)
	  .on('click', '.'+this.options.targets.previousYear, { context: this }, this.previousYear)
	  .on('click', 'tbody td', { context: this }, this.daySelected);
  }
  
  Calendar.prototype.nextDay = function(event) {
    var $self = event.data.context;
	$self.currentMoment.add(1, 'days');
	$self.setCalendar($self.currentMoment);
  };
  Calendar.prototype.previousDay = function(event) {
    var $self = event.data.context;
	$self.currentMoment.subtract(1, 'days');
	$self.setCalendar($self.currentMoment);
  };
  Calendar.prototype.nextMonth = function(event) {
    var $self = event.data.context;
	$self.currentMoment.add(1, 'months');
	$self.setCalendar($self.currentMoment);
  };
  Calendar.prototype.previousMonth = function(event) {
    var $self = event.data.context;
	$self.currentMoment.subtract(1, 'months');
	$self.setCalendar($self.currentMoment);
  };
  Calendar.prototype.nextYear = function(event) {
    var $self = event.data.context;
	$self.currentMoment.add(1, 'years');
	$self.setCalendar($self.currentMoment);
  };
  Calendar.prototype.previousYear = function(event) {
    var $self = event.data.context;
	$self.currentMoment.subtract(1, 'years');
	$self.setCalendar($self.currentMoment);
  };
  Calendar.prototype.daySelected = function(event) {
    var $self = event.data.context;
	$self.currentMoment = moment($(this).data('id'));
	$self.setCalendar($self.currentMoment);
  };
	
	$.fn.define = function(options) {
	//Define class
    if( !$.data( this, 'calendar_define') ) {
      var calender_instance = new Calendar(this, options);
      $.data(this, 'calendar_define', calender_instance);
      return calender_instance;
    }
  }
  
}(jQuery);