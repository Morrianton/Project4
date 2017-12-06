// ECMAScript 6

let totalYardage;
let yards = [];
let totalPar;
let par = [];
let score = [];
let numHoles;
let defaultCourse;
let defaultCourseID;
let currentCourse;
let closeCourses;
let local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};

function total(array) {
    let total = 0;
    for (let item in array) {
        total += array[item];
    }
    return total;
}

function getcloseCourses() {
    $.post("https://golf-courses-api.herokuapp.com/courses", local_obj, function (data, status) {
        closeCourses = JSON.parse(data);
        for (let course in closeCourses.courses) {
            $("#course-select").append("<option value='" + (closeCourses.courses[course].id) + "'>" + (closeCourses.courses[course].name) + "</option>");
        }
        defaultCourseID = closeCourses.courses[0].id;
        selectCourse(defaultCourseID);
    });
}

function selectCourse(courseID) {
    $("#tee-type-select").html("");
    $.get("https://golf-courses-api.herokuapp.com/courses/" + courseID, function(data, status) {
        currentCourse = JSON.parse(data);
        for(let t in currentCourse.course.tee_types) {
            let teeName = currentCourse.course.tee_types[t].tee_type;
            $("#tee-type-select").append("<option value='" + t + "'>" + teeName + "</option>");
        }
    });
}

function buildCard() {
    // get this info by index instead of by switch statement. Based on the index, new information will be populated.
    $("#tee-type-select").val();
    // console.log($("#tee-type-select").val());
    numHoles = currentCourse.course.hole_count;
    // console.log(numHoles);
    let holeInfo = currentCourse.course.holes;
    // console.log(info);
    // console.log(info[0].hole_num);
    if(numHoles < 18) {
        for(let hole in holeInfo) {
            $(".holes").append("<div id='hole" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].hole_num + "</span></div>");
            console.log(info[hole]);
            $(".yardage").append("<div id='yardage" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[//index that needs to identify tee type].yards + "</span></div>");
            yards.push($(".yardage").val());
            $(".par").append("<div id='par" + info[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].par + "</span></div>");
            par.push($(".par").val());
            $(".handicap").append("<div id='handicap" + info[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].hcp + "</span></div>");
            $(".player1").append("<div ><input class='input' type='number'/></div>");
        }

    }
    else {
        for(let hole = 0; hole <= 8; hole++) {
            $(".holes").append("<div id='hole" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].hole_num + "</span></div>");
            $(".yardage").append("<div id='yardage" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].yards + "</span></div>");
            $(".par").append("<div id='par" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].par + "</span></div>");
            $(".handicap").append("<div id='handicap" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].hcp + "</span></div>");
            $(".player1").append("<div id='p" + holeInfo[hole].hole_num + "'><input class='input' type='number'/></div>")
        }

        $(".holes").append("<div class='in'><span>IN</span></div>");
        $(".yardage").append("<div class='in'></div>");
        $(".par").append("<div class='in'></div>");
        $(".handicap").append("<div class='in'></div>");
        $(".player1").append("<div class='in'></div>");

        for(let hole = 9; hole <= 18; hole++) {
            $(".holes").append("<div id='hole" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].hole_num + "</span></div>");
            $(".yardage").append("<div id='yardage" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].yards + "</span></div>");
            $(".par").append("<div id='par" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].par + "</span></div>");
            $(".handicap").append("<div id='handicap" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[hole].hcp + "</span></div>");
            $(".player1").append("<div id='p" + holeInfo[hole].hole_num + "'><input class='input' type='number'/></div>")
        }

        $(".holes").append("<div class='out'><span>OUT</span></div>");
        $(".yardage").append("<div class='out'></div>");
        $(".par").append("<div class='out'></div>");
        $(".handicap").append("<div class='out'></div>");
        $(".player1").append("<div class='out'></div>");
    }

    $(".holes").append("<div class='total'><span>TOTAL</span></div>");
    $(".yardage").append("<div class='total'><span>" + total(yards) + "</span></div>");
    $(".par").append("<div class='total'><span>" + total(par) + "</span></div>");
    $(".handicap").append("<div class='total'></div>");
    $(".player1").append("<div class='total'></div>");
}
