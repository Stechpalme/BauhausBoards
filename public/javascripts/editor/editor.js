//set up the global paper scope
paper.install(window);
$('.sidebar').on('click', '.btnEditorEraser', doClick);
$('.sidebar').on('click', '.btnEditorUndo', doClick);
$('.sidebar').on('click', '.btnEditorRedo', doClick);
var clickedOn;
var editorPopupTimer;
var editorPopupTime = 1000*60;
//var editorPopupTime = 1000*5;

$(document).ready(function() {
  //get the editor canvas
  paper.setup('EditorCanvas');
  clickedOn = null;
});

function doClick(event) {}

//function to remove all active listeners
function removeListeners() {
  penTool.remove();
  textTool.remove();
  selectorTool.remove();
  eraserTool.remove();
  deactivateSelector();
}
function addImageDropLayer() {
  var wrapper = $("#wrapper");
  var imageDropLayer = wrapper.append("<div id='imageDropLayer'>");
  imageDropLayer.on("dragenter",drag);
  imageDropLayer.on("dragexit",drag);
  imageDropLayer.on("dragover",drag);
  imageDropLayer.on("drop",drop);
}
function removeImageDropLayer() {
  var imageDropLayer = $("#imageDropLayer");
  imageDropLayer.remove();
}

function openEditorPopup(obj,width,height,callback) {
  if(clickedOn == obj){

    closeEditorPopupClick();
  }
  else {
    editorPopupOpen = true;
    clickedOn = obj;
    updateTimer();
    var clickPoint = [event.pageX+10,event.pageY+10];
    $("#editorPopup").remove();
    $("body").append("<div id='editorPopup'>");
    $("#editorPopup").css({
      "left":clickPoint[0],
      "top":clickPoint[1]
    });
    $("#editorPopup").animate({
      "width":width+"px",
      "height":height+"px"
    },150,function() {
      activateBodyListener();
      startEditorPopupTimer();
      if(typeof(callback) == "function") callback();
    });
  }
}

function closeEditorPopupClick() {
  stopEditorPopupTimer();
  //$("body").unbind("mousedown");
  $("body").unbind("mousedown");
  $("#editorPopup").empty();
  $("#editorPopup").animate({
    "width":"0px",
    "height":"0px"
  },150,function() {
    $("#editorPopup").remove();
    clickedOn = null;
  });
}

function closeEditorPopup() {
  stopEditorPopupTimer();
  //$("body").unbind("mousedown");
  $("body").unbind("mousedown");
  $("#editorPopup").remove();
  clickedOn = null;
}

function startEditorPopupTimer() {
  stopEditorPopupTimer();
  editorPopupTimer = setTimeout(closeEditorPopupClick,editorPopupTime);
}

function stopEditorPopupTimer() {
  clearTimeout(editorPopupTimer);
}

function activateBodyListener() {
  //TODO: the mousedown event doesn't work on the tablets use touchstart
  //$("body").mousedown(listener);
  $("body").bind("mousedown",listener);
}

function listener() {
  if($("#editorPopup").length > 0) {
      var clickedItem = $(event.toElement);
      if((clickedItem.get(0) == $(".btnEditorStroke").get(0) || clickedItem.parents(".btnEditorStroke").get(0) == $(".btnEditorStroke").get(0)) ||
          (clickedItem.get(0) == $(".btnEditorColor").get(0) || clickedItem.parent().get(0) == $(".btnEditorColor").get(0))) {}
      else if(clickedItem.parent().get(0) != $("#editorPopup").get(0) && 
          clickedItem.parents("#editorPopup").get(0) != $("#editorPopup").get(0)) {
        closeEditorPopupClick();
      }
    }
}