var rdtCmts = {
  receiveComments : function(data){
    id = data[0].data.children[0].data.name.substr(3);
    html = $('<div class="rdtCmts"/>');
    html.append(rdtCmts.renderComments(data[1].data));
    html.append('<a class="rdtCmtsJoin" href="http://www.reddit.com/comments/'+id+'">Join the discussion at reddit.com!</a>');
    $("[data-rdtid='"+id+"']").html(html);
  },
  renderComments : function(data){
    var ul = $("<ul/>");
    for(var i in data.children){
      ul.append(rdtCmts.renderComment(data.children[i].data));
    }
    return ul;
  },
  renderComment : function(data){
    var li = $("<li/>");
    li.append($('<small class="rdtCmtsMeta"><a class="rtdCmtsAuthor" href="http://reddit.com/u/'+data.author+'">'+data.author+'</a> '+ (data.ups - data.downs) +' points</small>'));
    li.append($('<p class="rdtCmtsBody"/>').html(data.body_html).text());
    if(data.replies && data.replies !== "") li.append(rdtCmts.renderComments(data.replies.data));
    return li;
  }
};

$.fn.rdtcmts = function(id) {
  this.attr("data-rdtid", id);
  $.ajax({
    url: "http://www.reddit.com/comments/"+id+"/.json",
    dataType: "jsonp",
    jsonp : "jsonp",
    jsonpCallback: "rdtCmts.receiveComments"
  });
};

/*

Sample Usage
------------

$(function(){
$("#comments").rdtcmts("1jblag");
});

*/