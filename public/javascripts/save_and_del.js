//this function runs when any of the details button is clicked
function store(data){

    $.post("/timetable/save",data,(res)=>{

        if(res.status == "clashed"){
            alert("Slot(s) clashed! "+res.info+" Slot was clashed");
        } else if(res.status == "limit"){
            alert("You cannot register more than 27 credits! You can only register "+res.info+" more credits");
        } else{
            alert("Updated! As of now you have "+res.info+" credits");
            $("#courses").append("<br><button style='color:red'> Faculty: " + res.course.FACULTY + "<br>SLOT: " + res.course.SLOT + "<br>VENUE: " + res.course.VENUE+"</button><button onclick = 'del("+JSON.stringify(res.course)+")'>Delete</button>");
            $('#credits').html("Total Credits: "+ ( res.info ).toString() );
        }
    });

}





//deletes elements after clicking on button, reaches /timetable/delete using $.ajax's delete method

function del(element){

    $.ajax({
        url:'/timetable/del',
        type:'DELETE',
        data:element,
        success:()=>{
            console.log("Successfully sent the delete request");
            location.reload();
        },
        error:()=>{
            console.log("Error sending delete AJAX request");
        }
    });
}
