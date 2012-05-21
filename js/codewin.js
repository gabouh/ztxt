z.CodeWin = function() {
  
  z.autoTestCheck.click(function(){
    var checked = $(this).attr("checked");
    if (!checked){
      z.previewFrame.attr("src", "splash.html"); 
    }else{
      z.saveFileFolder();
    }
      
    
  });

  $("#fontSize").change(function() {
    ////alert($(this).val());
    var doc = $(z.editor.textareaHack).next()[0].contentWindow.document;
    var codeBody = doc.body
    var size = $(this).val();
    codeBody.style.fontSize = size;

    z.editor.setCode(z.editor.getCode());
    $(".CodeMirror-line-numbers").css("font-size", size);
  });

  $("#autoFormat").click(function() {
    if (z.currentPath.indexOf(".js") != -1) {
      var pretty = js_beautify(z.editor.getCode(), {
        indent_size: 2,
        preserve_newlines: true
      });
      z.editor.setCode(pretty);
    } else {
      z.editor.reindent();
    }
    z.saveFileFolder();
  });

  $("#test").click(function() {
    z.saveFileFolder();
  });

  $("#testInTab").mousedown(function() {
    z.saveFileFolder();
  }).mouseup(function() {
    window.open(z.visualPreview);
    z.previewFrame.attr("src", "splash.html");
  });

  $("#newBtn").click(function() {
    z.modals.show("newDialogue");
  });

  $("#findReplaceBtn").click(function() {
    z.modals.show("find");
  });


  // color picker
  var picker;
  
  z.hideColorPicker = function(){
    if (picker){
      picker.fadeOut(500);
    }
  }

  $('#color').ColorPicker({
    color: '#7e9fc2',
    onShow: function(colpkr) {
      picker = $(colpkr);
      picker.fadeIn(500);

      return false;
    },
    onHide: function(colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function(hsb, hex, rgb) {
      $('#color div').css('backgroundColor', '#' + hex);
    }
  })
  $("#color div").css("background-color", "#7e9fc2");
  $(".colorpicker_hex input").click(function() {
    //alert("works");
    $(this).focus().select();
  }).attr("spellcheck", false);



};