

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB9My4vYi0aqBlKYHYUyge7v8pJPBMtFjA",
  authDomain: "lcw2-229c3.firebaseapp.com",
  databaseURL: "https://lcw2-229c3-default-rtdb.firebaseio.com",
  projectId: "lcw2-229c3",
  storageBucket: "lcw2-229c3.appspot.com",
  messagingSenderId: "542371527776",
  appId: "1:542371527776:web:0f96ecb0d2357231cdd705"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var user_name=localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML="Welcome "+user_name+"!!";

  function addRoom()
  {
       room_name=document.getElementById("room_name").value; 

       firebase.database().ref("/").child(room_name).update({
             purpose:"adding room"
       });

       localStorage.setItem("room_name",room_name);
       window.location="lch_page.html";
  }


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
    console.log("room name: "+Room_names);
    row="<div class='room_name' id= "+Room_names+" onclick='redirectToRoomname(this.id)'> #"+Room_names+"</div><hr>";
    document.getElementById("output").innerHTML += row;
    

    //End code
    });});}
getData();

function redirectToRoomname(name)
{
    console.log(name);
    localStorage.setItem("room_name",name);
    window.location="lch_page.html"
}

function logout()
{
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location="index.html";
}