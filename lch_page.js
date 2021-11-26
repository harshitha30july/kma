//YOUR FIREBASE LINKS
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

  user_name=localStorage.getItem("user_name");
  room_name=localStorage.getItem("room_name");

  function send()
  {
        msg=document.getElementById("msg").value;

        console.log(msg);
        console.log(user_name);
        console.log(room_name);
        firebase.database().ref(room_name).push({
              name:user_name,
              message:msg,
              like:0
        });

        document.getElementById("msg").value="";
  }

  function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        likes = message_data['like'];
                        name_tag = "<h4>" + name + "</h4>";
                        message_tag = "<h4 class='message_h4' >" + message + "</h4>";
                        like_button_tag = "<button class='btn btn-warning' id='" + firebase_message_id + "' value=" + likes + " onclick='updateLikes(this.id)'>";
                        span_tag = "<span class='glyphicon glyphicon-thumps-up'>Like : " + likes + "</span>";

                        row = name_tag + message_tag + like_button_tag + span_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updateLikes(msg_id) {
      console.log(msg_id);
      like = document.getElementById(msg_id).value;
      updatedLikes = Number(like) + 1;
      firebase.database().ref(room_name).child(msg_id).update({
            like: updatedLikes
      });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}