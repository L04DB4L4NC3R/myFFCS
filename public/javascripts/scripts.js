
$(document).ready(()=>{


    $("#btn").on("click",(e)=>{

        //e is the event data, and this prevents form submission (not committed)
        e.preventDefault();


        //input will be posted to the server
        var input = { CODE : $("input").val().toUpperCase() };


        //Post AJAX request to server and fetch JSON data
        $.post("/timetable",input,(res)=>{


            //Clear the html of data and predictions
            $("#data").html('');
            $("#predictions").html('');


            //parse the JSON that we have got back into object
            res = JSON.parse(res);

            //set the course title
            if(res.theory.morning[0]!==undefined)
                $("#title").html(res.theory.morning[0].TITLE);
            else if(res.lab.morning[0]!==undefined)
                $("#title").html(res.lab.morning[0].TITLE);
            else if(res.project[0]!==undefined)
                $("#title").html(res.project[0].TITLE);

            // hide the type of course which isnt the one displayed
            // if(res.theory.morning.length === 0 && res.theory.evening.length === 0 )
            //     $("#theory").hide();
            // if(res.lab.morning.length === 0 && res.lab.evening.length === 0 )
            //     $("#lab").hide();
            // if(res.project.length  === 0 )
            //     $("#project").hide()

            //set content of body
            var content = "<div class = 'content'> <h2 id= 'theory'>Theory</h2><br><h3>Morning slots</h3>";

            res.theory.morning.forEach((element)=>{

                content += "<br><br><br><button onclick='store("+JSON.stringify(element)+")'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });

                content += "<h3>Evening slots</h3>";


            res.theory.evening.forEach((element)=>{

                content += "<br><br><br><button onclick = 'store("+JSON.stringify(element)+")'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });

                content += "<h2 id='lab'>Lab</h2><br><h3>Morning slots</h3>";

            res.lab.morning.forEach((element)=>{

                content += "<br><br><br><button onclick = 'store("+JSON.stringify(element)+")' >Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });


            content += "<h3>Evening slots</h3>";


            res.lab.evening.forEach((element)=>{

                content += "<br><br><br><button onclick = 'store("+JSON.stringify(element)+")'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button>";

            });

            content += "<h2 id='project'>Project</h2>";

            res.project.forEach((element)=>{

                content += "<br><br><br><button onclick = 'store("+JSON.stringify(element)+")'>Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "</button>";

            });

            content+="</div>"

            //put content html
            $("#data").html(content);

        });


    });



});
