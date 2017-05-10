const initialItinerary = $('#itinerary').clone();
const blankItinerary = $('#itinerary').clone();
var dayArray = [initialItinerary];
var currentDay = 0;
let choice;

$.each(hotels, function(key, value) {
  $('#hotel-choices')
    .append($("<option></option>")
    .attr("value", value.id)
    .attr("location", value.place.location)
    .text(value.name)).data('location', value.place.location);
});


$.each(restaurants, function(key, value) {
  $('#restaurant-choices')
    .append($("<option></option>")
    .attr("value", value.id)
    .attr("location", value.place.location)
    .text(value.name));
  // $('#restaurant-choices').data('location', value.place.location);
});

$.each(activities, function(key, value) {
  $('#activity-choices')
    .append($("<option></option>")
    .attr("value", value.id)
    .attr("location", value.place.location)
    .text(value.name));
  // $('#activity-choices').data('location', value.place.location);
});

$('#options-panel').on('click', 'button', function(event) {
  var selectedChoice = $(this).closest('div').find('select');
  var selectedCategory = selectedChoice.data('type');
  var selectedLocation = selectedChoice.find('option:selected').attr('location');
  var selectedText = selectedChoice.find('option:selected').text();

  var itineraryHTML = '<div class="itinerary-item"><span class="title">' + selectedText + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';

  $('#itinerary-' + selectedCategory + ' ul').append(itineraryHTML);
  dayArray[currentDay]=$('#itinerary').clone();
  console.log('current day', currentDay)
  console.log(dayArray[currentDay]);
  console.log(selectedCategory, selectedLocation);
  drawMarker(selectedCategory, selectedLocation);
});

// Delete item
$('#itinerary-container').on('click', 'button', function(event) {
  console.log($(this))
  $(this).prev().remove();
  $(this).remove();
});

// Add day
$('#day-add').on('click', function (event) {
  var nextDayCount=Number($(this).prev().text())+1;
  $(this).before('<button class="btn btn-circle day-btn">' + nextDayCount + '</button>');
  dayArray.push(blankItinerary.clone());
});

// Switch day
$('.day-buttons').on('click', 'button', function () {
  currentDay = Number($(this).text()) - 1;
  if (dayArray[currentDay]){
    console.log(currentDay);
    console.log(dayArray);
    $('#itinerary').replaceWith(dayArray[currentDay]);
    $('#day-title span').text('Day ' + (currentDay + 1));
  }
});

// Remove day
$('#day-title button').on('click', function (event) {
  // if removing 1st and only day
  if (dayArray.length === 1){
    $('#itinerary').replaceWith(blankItinerary.clone());
  }
  // if removing last day
  else if (currentDay === dayArray.length - 1){
    $('#itinerary').replaceWith(dayArray[currentDay - 1]);
    $('#day-title span').text('Day ' + (currentDay));
    $('.day-buttons button:nth-last-child(2)').remove();
    dayArray.splice(currentDay, 1);
  }
  // if removing a day between days
  else {
    $('#itinerary').replaceWith(dayArray[currentDay + 1]);
    $('#day-title span').text('Day ' + (currentDay + 1));
    $('.day-buttons button:nth-child(' + (currentDay + 2) + ')').remove();
    dayArray.splice(currentDay, 1);
  }
});
