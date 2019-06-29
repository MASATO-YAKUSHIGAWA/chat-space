$(function(){
  function buildHTML (message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = <div class='message'>
                <div class='upper-message'>
                <div class='upper-message__user-name'>
                ${message.user_name}
                </div>
                <div class='upper-message__date'>
                ${message.date}
                </div>
                </div>
                <div class='lower-message'>
                <p class='lower-message__content'>
                <div>
                  ${content}
                </div>
                ${img}
                </p>
                </div>
                </div>
    return html;            
  }


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

    .done(function(data){
      var html = buldHTML(data);
      $('.message').append(html);
      $('#message_content').val('')
  
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
  })
})
})
