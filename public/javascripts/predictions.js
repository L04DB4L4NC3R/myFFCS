
function predictHandler(data){
    $("#code").val(data.code)
    $("#predictions").html('');
}



//TODO predictive text
$(document).ready( ()=>{

    $("#code").on("keyup",()=>{

        $.post('/timetable/predict', { code:$("#code").val().toUpperCase() }, (res)=>{

            var content = '',i=0;

            //shows only top 5 hits, and appends the details in contents
            for(element of res){
                content += "<button onclick = 'predictHandler("+JSON.stringify(element)+")'><h3>"+element.code+"   "+element.title+"</h3></button><br>";
            }

            //changes html of page to show prediction results
            $("#predictions").html(content);

        });


    });


});
