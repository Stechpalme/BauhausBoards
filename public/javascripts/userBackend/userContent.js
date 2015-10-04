$(".btnSubmitChangeContent").on("click",function(){checkSession(changeContentPopup);});
$(".btnChangeBackground").on("click",function(){checkSession(changeBackgroundPopup);});
var background;

function loadChangeContent(event) {
  var userIndex = 0;
  for(var i=0; i<usercollection.length; i++) {
    if(usercollection[i].userID == authenticatedUser) userIndex = i;
  }
  $("#header").empty();
  $("#header").append("<div id='userInfo'>");
  var imgURL = usercollection[userIndex].userProfilePic;
  if(!imgURL) imgURL = "/images/default-user.png";
  $("#header").append("<div id='userImage'><img src='"+imgURL+"'>");
  if($("#userImage img").width() > $("#userImage img").height()) {
    $("<div id='verticalAlignDiv'>").insertBefore("#userImage img");
    $("#userImage img").css("width","100%");
    $("#verticalAlignDiv").css("height",($("#userImage").height()-$("#userImage img").height())/2);
  }
  else {
    $("#userImage img").css("height","100%");
  }
  $("#userInfo").append("<div id='userName'>Change Content");
  showSidebar('sidebarChangeContent');
  closeSidebar();
  view.update();
  $('#EditorCanvas').css('visibility','visible');
  $('#tabletSizePreview').css('visibility','visible');
  show_gifs();
  addGifTicker();
  undo_undoStack = FixedQueue(undo_stackLength);
  undo_redoStack = FixedQueue(undo_stackLength);
  paper.setup('EditorCanvas');
  activatePenTool();
  activeColor = colors["black"];
  addImageDropLayer();
  $.ajax({
    url: "/functions/getUserContent",
    type: "GET",
    data: {"userID":authenticatedUser},
    success:function(response) {
      if(response) {
        background = response.background;
        project.clear();
        project.importJSON(response.content);
      }
    },
    error:function(error) {
      console.log("couldn't get user content");
    }
  });
}

function changeContentPopup(event) {
  showPopup()
  $("#popup").append("<h2>Change Content");
  $("#popup").append("<hr>");
  $("#popup").append("<h4>Do you really want to change your content?");
  $("#popup").append("<hr>");
  $("#popup").append("<div class='popupConfirm'>");
  $(".popupConfirm").append("<button onclick='{checkSession(changeContent)}'>Change");
  $(".popupConfirm").append("<button onclick='removePopup()'>Cancel");
  $(".popupConfirm button:last").focus();
}

function changeContent() {
  project.deselectAll();
  removeBoundingBox();
  removeSelectionPopup();
  var contentJSON = project.exportJSON();
  var background = "";
  $.ajax({
    url:"functions/changeUserContent",
    type:"POST",
    data:{"content":contentJSON,"background":background},
    success:function(res) {
      removePopup();
      showFloaty("Content changed.");
    },
    error:function(err) {
      console.log("couldn't set user content");
    }
  });
}

function changeBackgroundPopup(event) {
  showPopup()
  $("#popup").append("<h2>Change Background");
  $("#popup").append("<hr>");
  $("#popup").append("<h4>Do you really want to change your background?");
  $("#popup").append("<hr>");
  $("#popup").append("<div id='statusDiv'>");
  $("#popup #statusDiv").append("<label>Background URL");
  $("#popup #statusDiv").append("<input type='text' id='userBackgroundInput' value='"+background+"'>");
  $("#popup").append("<br>");
  $("#popup").append("<div class='popupConfirm'>");
  $(".popupConfirm").append("<button onclick='{checkSession(changeBackground)}'>Change");
  $(".popupConfirm").append("<button onclick='removePopup()'>Cancel");
  $(".popupConfirm button:last").focus();
}

function changeBackground() {
  background = $("#userBackgroundInput").val();
  $.ajax({
    url:"functions/setContentBackground",
    type:"POST",
    data:{"background":background},
    success:function(res) {
      removePopup();
      checkSession(loadChangeContent);
    },
    error:function(err) {
      console.log("couldn't set content background");
    }
  });
}