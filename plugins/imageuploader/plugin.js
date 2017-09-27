tinymce.PluginManager.add('imageuploader', function(editor, url) {
    // Add a button that opens a window
    editor.addButton('imageuploader', {
     text: 'Add Media',
     icon: 'image',
     onclick: function() {
      // Open window
      editor.windowManager.open({
          title: 'Select Media',
          url: 'media-upload.php?post_id=0&type=image&TB_iframe=1',
           buttons: [{
            text: 'Submit',
            onclick: 'submit'
         }, {
            text: 'Cancel',
            onclick: 'close'
         }],
      width: 800,
      height: 600,
      onsubmit: function(e) {
       var newMedia = $('iframe').contents().find('#media-url');
       var url = newMedia.val();
       if (url.length > 0){
        if (type == 'image'){
         editor.insertContent('<img src="' + url + '" />');
         return true;
        }else if (type == 'video'){
         editor.insertContent('<video autobuffer controls><source src="' + url + '" /></video>');
         return true;
        }
       }else{
        alert('something went wrong');
        return false;
       }
      }
     });
     }
    });


});