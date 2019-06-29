$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    // console.log(this)
    var formData = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
  })
})