/**
* textarea大小被修改事件
* $(obj).resizeable().bind("resize",function(){});
*/
$.fn.resizeable = function(){
  this.bind("mousemove mouseup",function(){
    if(this.oldwidth  === null){this.oldwidth  = this.style.width;}
    if(this.oldheight === null){this.oldheight = this.style.height;}
    if(this.style.width != this.oldwidth || this.style.height != this.oldheight){
      $(this).trigger("resize");
      this.oldwidth  = this.style.width;
      this.oldheight = this.style.height;
    }
  });
  return this;
}
