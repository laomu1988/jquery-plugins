/**
* 输入框宽度根据输入框内容多少自动改变
* 当文字时过长时，误差会变大；
* (obj).adaptive({minWidth:40,maxWidth:200});
* minWidth:最小宽度
* maxWidth:最大宽度
* 作者:laomu1988
* 版本:0.1
* 日期:2014.7.29
*/
(function($){
  function getLength(str){
    var len = 0;
    for(var i = str.length -1;i>=0;i--){
      len+= str.charCodeAt(i)>256?1.5:1;
    }
    return len;
  }

  function changeInputWidth(input,minWidth,maxWidth){
    if(!minWidth){
      minWidth = 40;
    }
    if(!maxWidth){
      maxWidth = 200;
    }
    that = $(input);
    //英文字符宽度为其字体大小的一半加2px
    //中文字符宽度为英文字符的1.5倍
    var width = getLength(that.val())*(parseInt(that.css("font-size"))/2+2)+20;
    width = width>minWidth?(width<maxWidth?width:maxWidth):minWidth;
    that.css({"width":width});
  }
  $.fn.selfadative = function(options){
    var defaults = {
      minWidth:40,//最小宽度
      maxWidth:200//最大宽度
    };
    var myoptions = $.extend(defaults,options);
    changeInputWidth(this,myoptions.minWidth,myoptions.maxWidth);
    this.bind("textchange",function(){
      changeInputWidth(this,myoptions.minWidth,myoptions.maxWidth);
    });
  }
})(jQuery);
