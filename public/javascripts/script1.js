$(document).ready(()=>{

    $("#sb").on("click",(e)=>{
        e.preventDefault();

        $.post("http://redefinedffcs.herokuapp.com/timetable",{CODE:$("#i1").val().toUpperCase()},(data)=>{
            alert(data);
        });

    });
});

var venue="SJT 305";//Hardcoded data to be replaced by JSON
var courseCode="CSE2001";//Hardcoded data to be replaced by JSON
var courseTitle="Introduction To Python";//Hardcoded data to be replaced by JSON
var type="LAB";//Hardcoded data to be replaced by JSON
var slot="L33+L36+L50+L51+L10+L11"; //Hardcoded data to be replaced by JSON
var c=4; //Hardcoded data to be replaced by JSON
var slotInit=slot; //Copying values
var faculty="Dr. Rajkumar S";//Hardcoded data to be replaced by JSON
var slotName=".";

addDataToList(slotInit, courseCode, courseTitle, venue, faculty, c);
console.log(length);


extractSlot();

function extractSlot() {
    var flag=0;
    var length=slot.length;
    var i=0;
    for(;i<length;i++) //Check if + sign is present which means there are more than 1 slots
        if(slot[i]=="+"){
            flag=1; //Flag to 1 if more than 1 slot present
            break;
        }
    if (flag == 1) {
        slotName=".";
        slotName =slotName + slot.substr(0, i); //Store the first part of the slot in slotName
        slot =slot.substr(i+1, length); //Store the later part of the slot in slot
        console.log("slot", slotName);
        changeSlotColor(slotName, courseCode); //Call function to change color
        console.log("undefined", slotName, courseCode);
        if(slot.localeCompare("")!=0) // If slot has another part
            extractSlot();
    }

    else {
        slotName=".";
        slotName = slotName + slot; // Copy slot to slotName and call fxn to change color
        changeSlotColor(slotName, courseCode);

    }
}


//Demo data feed
//type="TH";
changeSlotColor(".A1", "CSE1003");
changeSlotColor(".B1", "PHY1999");
changeSlotColor(".E2", "CHY1701");
changeSlotColor(".C2", "MAT2002");
//Demo data feed end

// console.log(slotName,"slotName");
function changeSlotColor(s, code) {
    var slotI= s.substr(1, s.length);
    $(s).addClass(type);
    $(s).html(code+"-"+ '<br/>'+slotI);

}

function addDataToList(s,c,t,v,f,cd)
{
    var table = document.getElementById("sec_Course");
    var row=table.insertRow(1);
    var slot=row.insertCell(0);
    var code=row.insertCell(1);
    var title=row.insertCell(2);
    var ven=row.insertCell(3);
    var facl=row.insertCell(4);
    var cred=row.insertCell(5);
    slot.innerHTML=s;
    code.innerHTML=c;
    title.innerHTML=t;
    ven.innerHTML=v;
    facl.innerHTML=f;
    cred.innerHTML=cd;

}



changeSlotColor();
