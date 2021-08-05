let btn=document.getElementById("btn1");
btn.addEventListener("click",function(){
    getLocation();
});
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    fn1(lat,lon);
}
function fn1(l1,l2){
    var ll1 = ""+l1;
    var ll2 = ""+l2;
    var lat =ll1.substr(0, 5);
    var long=ll2.substr(0, 5);
    console.log(lat,long);
    const req = new XMLHttpRequest();
    req.onload = function () {
        console.log("DONE LOADING!!");
        const txt = JSON.parse(this.responseText);
        let obj=txt.centers;
        var thead=document.getElementById('thead');
        var tbody = document.getElementById('tbody');
        try{if(obj.length==0){
            console.log("fetch-failed");
            alert("No slots! Try with another date");
            return;
        }
        thead.innerHTML="<tr><th>S.no</th><th>Center Name</th><th>Location</th><th>Pincode</th><th>Center-Id</th></tr>";
        tbody.innerHTML="";
        for (var i = 0; i < obj.length; i++) {
            var tr = "<tr>";
            tr += "<td>" + (i+1).toString()+". </td><td>" + obj[i].name + "</td><td>" + obj[i].location + "</td><td>" + obj[i].pincode.toString() +"</td><td>" + obj[i].center_id.toString() + "</td> </tr>";
            tbody.innerHTML += tr;
        }}
        catch(err){
            console.log(err);
            alert("Unable to fetch data!");
        }
    };
    req.onerror = function () {
        console.log("ERROR");
        console.log(this);
    };
    req.open(
       "GET",
       `https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${lat}&long=${long}`
    );
    req.send();

}