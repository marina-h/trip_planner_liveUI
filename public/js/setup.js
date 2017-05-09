var initialItinerary=$('#itinerary').clone();
var dayArray=[initialItinerary];
var currentDay=0;
$.each(hotels, function(key, value) {
  $('#hotel-choices')
    .append($("<option></option>")
    .attr("value", value.id)
    .text(value.name));
  $('#hotel-choices').data('location', value.place.location);
});

$.each(restaurants, function(key, value) {
  $('#restaurant-choices')
    .append($("<option></option>")
    .attr("value", value.id)
    .text(value.name));
  $('#restaurant-choices').data('location', value.place.location);
});

$.each(activities, function(key, value) {
  $('#activity-choices')
    .append($("<option></option>")
    .attr("value", value.id)
    .text(value.name));
  $('#activity-choices').data('location', value.place.location);
});

$('#options-panel').on('click', 'button', function(event) {
  var selectedChoice = $(this).closest('div').find('select');
  var selectedCategory = selectedChoice.data('type');
  var selectedLocation = selectedChoice.data('location');
  var selectedText = selectedChoice.find('option:selected').text();


  var itineraryHTML = '<div class="itinerary-item"><span class="title">' + selectedText + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

  $('#itinerary-' + selectedCategory + ' ul').append(itineraryHTML);
  dayArray[currentDay]=$('#itinerary').clone();
  console.log(dayArray[currentDay]);
  drawMarker(selectedCategory, selectedLocation);
});


$('#itinerary').on('click', 'button', function(event) {
  $(this).prev().remove();
  $(this).remove();
});


$('#day-add').on('click', function (event) {
  var nextDayCount=Number($(this).prev().text())+1;
  $(this).before('<button class="btn btn-circle day-btn">'+nextDayCount + '</button>');
  dayArray.push(initialItinerary);

});

$('.day-buttons').on('click', 'button', function () {
  currentDay= Number($(this).text())-1;
  if(dayArray[currentDay]){
    console.log(currentDay);
    console.log(dayArray);
    $('#itinerary').replaceWith(dayArray[currentDay]);
    $('#day-title span').text('Day ' + (currentDay+1));
  }

});

$('#day-title button').on('click', function (event) {
  if(dayArray.length === 1){
    $('#itinerary').replaceWith(initialItinerary);
  }
  else if(currentDay === dayArray.length-1){
    $('#itinerary').replaceWith(dayArray[currentDay-1]);
    $('#day-title span').text('Day ' + (currentDay-1));
    dayArray.splice(currentDay,1);
  }

  // if(dayArray[currentDay]){
  //
  //
  //
  // }
});
