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

  var itineraryHTML = '<div class="itinerary-item"><span class="title">' + selectedText + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'

  $('#itinerary-' + selectedCategory + ' ul').append(itineraryHTML);

  drawMarker(selectedCategory, selectedLocation);
})

