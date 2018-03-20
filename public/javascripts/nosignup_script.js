function store(element){

    //localStorage.clear()
    if(localStorage.index === undefined)
        localStorage.index = 0;


    localStorage.setItem("course"+(localStorage.index++).toString(),element)
    console.log(localStorage.course1);

    // array.forEach((element)=>{
    //
    //     $("#courses").append("<br><button style='color:red'> Faculty: " + element.FACULTY + "<br>SLOT: " + element.SLOT + "<br>VENUE: " + element.VENUE+"</button><button onclick = 'del("+JSON.stringify(element)+")'>Delete</button>");
    //
    // });


}
