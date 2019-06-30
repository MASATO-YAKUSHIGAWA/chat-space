$(document).on("turbolinks:load", (function(){
  function buildHTML (message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    console.log(img)
    var html =  `<div class='message'>
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
                ${content}
                </p>
                ${img}
                </div>
                </div>`
    return html;            
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    // console.log(this)
    var formData = new FormData(this);
    var url = (window.location.href);
    console.log(url);

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })

    .done(function(data){
      console.log(data);
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val('');
  
      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
      }
    })

    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })

    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })

  })
})

)