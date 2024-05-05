/* The script executs only when DOM is loaded
   JQuery is mandatory
   Listen for changes on each input checkbox tag:
  	 if the checkbox is checked, you must store the Amenity ID in a
  	 variable (dictionary or list)
  	 if the checkbox is unchecked, you must remove the Amenity ID
  	 from the variable
  	 update the h4 tag inside the div Amenities with the list of
  	 Amenities checked
 */

$(document).ready(function () {
  const amenity = {};
  $(".amenities .popover input").change(function () {
    if ($(this).is(":checked")) {
      amenity[$(this).attr("data-name")] = $(this).attr("data-id");
    } else if ($(this).is(":not(:checked)")) {
      delete amenity[$(this).attr("data-name")];
    }
    const names = Object.keys(amenity);
    $(".amenities h4").text(names.sort().join(", "));
  });

  apiStatus();
});

function apiStatus() {
  const API_URL = `http://${HOST}:5001/api/v1/status/`;
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === "success" && data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
}
