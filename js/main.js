// ECMAScript 6

let currentCourse;
let closeCourses;
let local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};


// function loadMe() {
//     $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function(data, status) {
//         closeCourses = JSON.parse(data);
//         for (let course in closeCourses.courses) {
//             $("#course-select").append("<option value='" + (closeCourses.courses[course].id) + "'>" + (closeCourses.courses[course].name) + "</option>");
//         }
//     });
// }

function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function (data, status) {
        closeCourses = JSON.parse(data);
        for (let course in closeCourses.courses) {
            $("#course-select").append("<option value='" + (closeCourses.courses[course].id) + "'>" + (closeCourses.courses[course].name) + "</option>");
        }
    });
}

function selectCourse(courseID) {
    // $("#score-column").html("");
    $("#tee-type-select").html("");
    $.get("https://golf-courses-api.herokuapp.com/courses/" + courseID, function(data, status) {
        currentCourse = JSON.parse(data);
        for(let t in currentCourse.course.tee_types) {
            let teeName = currentCourse.course.tee_types[t].tee_type;
            $("#tee-type-select").append("<option value='" + teeName + "'>" + teeName + "</option>");
        }
    });
}