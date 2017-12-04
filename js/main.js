// ECMAScript 6

let closeCourses;
let local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};


function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data, status) {
        closeCourses = JSON.parse(data);
        for (let course in closeCourses.courses) {
            $("#course-select").append("<option value='" + (closeCourses.courses[course].id) + "'>" + (closeCourses.courses[course].name) + "</option>");
        }
    });
}