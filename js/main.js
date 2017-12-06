// ECMAScript 6

let numHoles;
let defaultCourse;
let defaultCourseID;
let currentCourse;
let closeCourses;
let local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};

function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function (data, status) {
        closeCourses = JSON.parse(data);
        for (let course in closeCourses.courses) {
            $("#course-select").append("<option value='" + (closeCourses.courses[course].id) + "'>" + (closeCourses.courses[course].name) + "</option>");
        }
        defaultCourseID = closeCourses.courses[0].id;
    });
    // $.get("https://golf-courses-api.herokuapp.com/courses/" + defaultCourseID, function(data, status) {
    //     currentCourse = JSON.parse(data);
    //     for(let t in currentCourse.course.tee_types) {
    //         let teeName = currentCourse.course.tee_types[t].tee_type;
    //         $("#tee-type-select").append("<option value='" + teeName + "'>" + teeName + "</option>");
    //     }
    // });
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

function buildCard(myTee) {
    numHoles = currentCourse.course.holes;
    switch(myTee) {
        case "pro":
            if(numHoles < 18) {
                for(let hole in numHoles) {
                    $(".holes").append("<div id='hole" + hole + "'><span>" + hole + "</span></div>");
                    $(".yardage").append("<div id='yardage" + hole + "'><span>" + numHoles.hole_num[hole].tee_boxes.yards + "</span></div>");
                    $(".par").append("<div id='par" + hole + "'><span>" + numHoles.hole_num[hole].tee_boxes.par + "</span></div>");
                    $(".handicap").append("<div id='handicap" + hole + "'><span>" + numHoles.hole_num[hole].tee_boxes.hcp + "</span></div>");
                }
            }
            else {

            }
            break;
    }
}