$(document).on("turbolinks:load", (function(){
  function buildHTML (message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html =  `<div class='message' data-message-id = "${message.id}">
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
    var formData = new FormData(this);
    var url = (window.location.href);

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_content').val('');
  
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});

    })

    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })

    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function(){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('message-id');
    var group_id = $('.message').data('group-id');

    $.ajax({
      url: `/groups/${group_id}/api/messages`,//ルーティングで設定した通りのURLを指定
      type: 'GET',//ルーティングで設定した通りhttpメソッドをgetに指定
      dataType: 'json',
      data: {id: last_message_id}//dataオプションでリクエストに値を含める
    })
    .done(function(messages){
      //追加するHTMLの入れ物を作る
      var insertHTML = ""
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
        //メッセージが入ったHTMLを取得
        insertHTML = buildHTML(message)
        console.log(message)
        //メッセージを追加
        $('.messages').append(insertHTML);
      })
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},100);

    })
    
    .fail(function(){
      alert('失敗しました');
    })
  }
  setInterval(reloadMessages, 5000);
})
)