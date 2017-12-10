// ECMAScript 6

let player = 2;
let teeTypeIndex;
let score = [];
let numHoles;
let defaultCourseID;
let currentCourse;
let closeCourses;
let local_obj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};

function total(array) {
    let total = 0;
    for (let value in array) {
        total += array[value];
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
        teeTypeIndex = $("#tee-type-select").val();
    });
}

function selectTeeType(teeType) {
    teeTypeIndex = teeType;
}

function buildCard() {
    $(".holes").children("#holes-label").siblings().remove();
    $(".yardage").children("#yardage-label").siblings().remove();
    $(".par").children("#par-label").siblings().remove();
    $(".handicap").children("#handicap-label").siblings().remove();
    $(".input-container").children().remove();
    $("#tee-type-select").val();
    // console.log($("#tee-type-select").val());
    numHoles = currentCourse.course.hole_count;
    // console.log(numHoles);
    let holeInfo = currentCourse.course.holes;
    // console.log(info);
    // console.log(info[0].hole_num);
    if(numHoles < 18) {
        for(let hole in holeInfo) {
            $(".holes").append("<div class='hole-box' id='hole" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].hole_num + "</span></div>");
            $(".yardage").append("<div class='yards-box' id='yardage" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].yards + "</span></div>");
            $(".par").append("<div class='par-box' id='par" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].par + "</span></div>");
            $(".handicap").append("<div class='hdcp-box' id='handicap" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].hcp + "</span></div>");
            $(".input-container").append("<input class='input' id='input" + holeInfo[hole].hole_num + "' type='number'/>");

        }

    }
    else {
        for(let hole = 0; hole <= 8; hole++) {
            $(".holes").append("<div class='hole-box' id='hole" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].hole_num + "</span></div>");
            $(".yardage").append("<div class='yards-box' id='yardage" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].yards + "</span></div>");
            $(".par").append("<div class = par-box id='par" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].par + "</span></div>");
            $(".handicap").append("<div class='hdcp-box' id='handicap" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].hcp + "</span></div>");
            $(".input-container").append("<input class='input' id='input" + holeInfo[hole].hole_num + "' type='number'/>");
        }

        $(".holes").append("<div class='out-box'><span>OUT</span></div>");
        $(".yardage").append("<div class='out-box'><span>" + currentCourse.course.tee_types[teeTypeIndex].front_nine_yards + "</span></div>");
        $(".par").append("<div class='out-box'><span>" + currentCourse.course.tee_types[teeTypeIndex].front_nine_par + "</span></div>");
        $(".handicap").append("<div class='out-box'></div>");
        $(".input-container").append("<div class='out-box'></div>");

        for(let hole = 9; hole <= 17; hole++) {
            $(".holes").append("<div class='hole-box' id='hole" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].hole_num + "</span></div>");
            $(".yardage").append("<div class='yards-box' id='yardage" + holeInfo[hole].hole_num + "'><span>" + Number(holeInfo[hole].tee_boxes[teeTypeIndex].yards) + "</span></div>");
            $(".par").append("<div class='par-box' id='par" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].par + "</span></div>");
            $(".handicap").append("<div class='hdcp-box' id='handicap" + holeInfo[hole].hole_num + "'><span>" + holeInfo[hole].tee_boxes[teeTypeIndex].hcp + "</span></div>");
            $(".input-container").append("<input class='input' id='input" + holeInfo[hole].hole_num + "' type='number'/>");
        }

        $(".holes").append("<div class='in-box'><span>IN</span></div>");
        $(".yardage").append("<div class='in-box'><span>" + currentCourse.course.tee_types[teeTypeIndex].back_nine_yards + "</span></div>");
        $(".par").append("<div class='in-box'><span>" + currentCourse.course.tee_types[teeTypeIndex].back_nine_par + "</span></div>");
        $(".handicap").append("<div class='in-box'></div>");
        $(".input-container").append("<div class='in-box'></div>");
    }

    $(".holes").append("<div class='total'><span>TOTAL</span></div>");
    $(".yardage").append("<div class='total'><span>" + currentCourse.course.tee_types[teeTypeIndex].yards + "</span></div>");
    $(".par").append("<div class='total'><span>" + currentCourse.course.tee_types[teeTypeIndex].par + "</span></div>");
    $(".handicap").append("<div class='total'></div>");
    $(".input-container").append("<div class='total'></div>");

    $("#input1").focus();
}

function addPlayer() {
    $(".score-card").append("<div class='player" + player + " player'><div class='keep'><div class='remove-player-button' onclick='removePlayer(this)'><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></div><div class='category' id='p" + player + "'><span>Player " + player +"</span></div></div><div class='input-container'></div></div>");

    if(numHoles < 18) {

        for(let hole = 1; hole <= 9; hole++) {
            $(".player" + player).children(".input-container").append("<input class='input' id='input" + hole + "' type='number'/>");
        }

        $(".player" + player).children(".input-container").append("<div class='total'></div>")
    }

    else {

        for(let hole = 1; hole <= 9; hole++) {
            $(".player" + player).children(".input-container").append("<input class='input' id='input" + hole + "' type='number'/>");
        }

        $(".player" + player).children(".input-container").append("<div class='out-box'></div>");

        for(let hole = 10; hole <= 18; hole++) {
            $(".player" + player).children(".input-container").append("<input class='input' id='input" + hole + "' type='number'/>");
        }

        $(".player" + player).children(".input-container").append("<div class='in-box'></div>");
        $(".player" + player).children(".input-container").append("<div class='total'></div>");
    }
    player++;
}

function removePlayer(target) {
    $(target).parent().parent().remove();
    player--;
}

function tally() {
    // $(".input").focus();
}