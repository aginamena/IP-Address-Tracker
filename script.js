// leaflet api

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWVuYWFnaW5hIiwiYSI6ImNrbmpvcGJsbTAwbm8yc24wOWZraGdjOGEifQ.75zDg1sZQPOLDQAd6Mjmww'
}).addTo(mymap);
var marker = L.marker([51.5, -0.09]).addTo(mymap);


const ip = document.querySelector("#ip-address");
const locationOfUser = document.querySelector("#location");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
const enter = document.querySelector("#enter");
const input_text = document.querySelector("#input-text");



//we want to get information from a server
function showUserInfo(url){
  const request = new XMLHttpRequest();

  request.open("GET", url);
  //we wait for it to return and console it

  request.onload = function(){
    // we have to convert the returned data into JSON format
     let userInfo = JSON.parse(request.responseText);
     ip.textContent = userInfo.ip;
     locationOfUser.textContent = userInfo.location.region + ", "+userInfo.location.country;
     timezone.textContent = userInfo.location.timezone;
     isp.textContent = userInfo.isp;

     let latitude = userInfo.location.lat;
     let longitude = userInfo.location.lng;

     mymap.setView(new L.LatLng(latitude, longitude), 13); // set the new view
     marker.setLatLng([latitude, longitude]).update();  // Updates your defined marker position

  };
  request.send();

}

function isValidateIPaddress(ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return true;
  }
  return false;
}
function isValidDomainName(domainName){
  lastName = domainName.substring(domainName.length-3);
  if(lastName === "org" || lastName === "com" || lastName === "biz"
  || lastName === "info" || lastName === "edu" || lastName === "eu"
  || lastName === "net") return true;

  // the last name of the domain isn't valid, so we return false
  return false;
}


enter.addEventListener("click", function(){

  if(isValidateIPaddress(input_text.value)){

    ip.textContent = "Loading...";
    locationOfUser.textContent = "Loading...";
    timezone.textContent = "Loading...";
    isp.textContent = "Loading...";
    let url = "https://geo.ipify.org/api/v1?apiKey=at_Wx40nlsPeBg8EKnQgySvDh28TyD8e&ipAddress="+input_text.value;
    showUserInfo(url);

  }else if(isValidDomainName(input_text.value)){

      ip.textContent = "Loading...";
      locationOfUser.textContent = "Loading...";
      timezone.textContent = "Loading...";
      isp.textContent = "Loading...";

    let url = "https://geo.ipify.org/api/v1?apiKey=at_Wx40nlsPeBg8EKnQgySvDh28TyD8e&domain="+input_text.value;
    showUserInfo(url);
  }
  else{
    alert("Invalid user input");
  }

});
