// 获取元素
var getElem = function( selector ){
  return document.querySelector(selector);
}
var getAllElem = function( selector ){
  return document.querySelectorAll(selector);
}
// 获取元素的样式
var getCls = function ( element ) {
  return element.getAttribute('class');
}
// 设置元素的样式
var setCls = function( element ,cls){
  return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function( element , cls ){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) === -1){
      setCls(element,baseCls+' '+cls); // 注意空格
  }
  return ;
}
// 为元素删减样式
var delCls = function( element , cls){
  var baseCls  = getCls(element);
  if( baseCls.indexOf(cls) > -1){ // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
      setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
  }
  return ;
}

var screenAnimateElements = {
  '.screen-1' : [
    '.header',
    '.screen_1__h2',
    '.screen_1__p',
  ],
  '.screen-2' : [
    '.screen_2__h2',
    '.screen_2__p',
    '.screen_2__image1',
    '.screen_2__image2',
    '.screen_2__unline',
  ],
  '.screen-3' : [
    '.screen_3__h2',
    '.screen_3__p',
    '.screen_3__image',
    '.screen_3__style',
    '.screen_3__unline',
  ],
  '.screen-4' : [
    '.screen_4__h2',
    '.screen_4__p',
    '.screen_4__wrap-item1',
    '.screen_4__wrap-item2',
    '.screen_4__wrap-item3',
    '.screen_4__wrap-item4',
    '.screen_4__unline',
  ],
    '.screen-5' : [
    '.screen_5__h2',
    '.screen_5__p',
    '.screen_5__img',
    '.screen_5__unline',
  ],
};
//设置元素为结束状态
function setScreenAnimateInit(screenCls) {
    var animateElements =  screenAnimateElements[screenCls]; // 需要设置动画的元素
    for(var i=0; i<animateElements.length ; i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls +' '+animateElements[i].substr(1)+'_animate_init');
    }
}
window.onload = function () {
  //  为所有元素设置一个待改变的元素
  for(k in screenAnimateElements){
    if(k === '.screen-1'){
      continue;
    }
    setScreenAnimateInit(k);
  }
}
//设置元素为结束状态
function playScreenAnimateDone(screenCls){
    var animateElements = screenAnimateElements[screenCls];
    for(var i=0;i<animateElements.length;i++){
      var element = document.querySelector(animateElements[i]);
      var baseCls = element.getAttribute('class');
      element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}
setTimeout(function(){playScreenAnimateDone('.screen-1');},300);

 var navItems = getAllElem('.header__nav-item'),
     dagangItems =getAllElem('.dagang_item'),
     navtip=getElem('.header__nav-tip'),
     ty= getElem('.screen_ty');
 function switchNavitemactive(idx){
     for(var i=0;i<navItems.length-1;i++){
      delCls(navItems[i],'header__nav-item_status');
     }
     addCls(navItems[idx],'header__nav-item_status');
     for(var i=0;i<dagangItems.length;i++){
      delCls(dagangItems[i],'dagang_item_status');
     }
     addCls(dagangItems[idx],'dagang_item_status');
 }
window.onscroll = function () {

  var top  = document.documentElement.scrollTop;
  //   2.1 导航条样式变动
  if( top > 100 ){
      addCls( getElem('.header'),'header_status' );
      addCls( getElem('.dagang'),'dagang_item_done' );
  }else{
      delCls( getElem('.header'),'header_status' );
      delCls( getElem('.dagang'),'dagang_item_done' );
      switchNavitemactive(0);
  }
  if( top >= 0  ){
    navtip.style.marginLeft=22+'px';
  }
  if( top > ( 640*1 - 150) ){
    playScreenAnimateDone('.screen-2');
    switchNavitemactive(1);
    navtip.style.marginLeft=(104*1+22)+'px';
  }
  if( top > ( 640*2 - 150) ){
    playScreenAnimateDone('.screen-3');
    switchNavitemactive(2);
    navtip.style.marginLeft=(104*2+22)+'px';
  }
  if( top > ( 640*3 - 150) ){
    playScreenAnimateDone('.screen-4');
    switchNavitemactive(3);
    navtip.style.marginLeft=(104*3+22)+'px';
  }
  if( top > ( 640*4 - 150) ){
    playScreenAnimateDone('.screen-5');
    switchNavitemactive(4);
    navtip.style.marginLeft=(104*4+22)+'px';
  }
}
//导航条双向定位
function setNavJump(i,lib){
   var elem =lib[i];
   elem.onclick=function(){
         document.documentElement.scrollTop = i*640+1;
   }
}
 for (var i=0; i<navItems.length-1;i++){
      setNavJump(i,navItems);
 }
 for (var i=0; i<dagangItems.length;i++){
      setNavJump(i,dagangItems);
 }
   ty.onclick = function () {
    document.body.scrollTop = 1;
   }

//滑动特效
function settip(idx,lib){
    var currentIdx = 0;
    lib[idx].onmouseover=function(){
      navtip.style.marginLeft=(104*idx+22)+'px';
    }
    lib[idx].onmouseout=function(){
      //课程项目中使用查找CLASS名字的方法来锁定鼠标离开下划线回到的位置，不知道为什么不能用，我把课程项目下载下来也是这样，只能用比较笨的用高度来锁定的方法了。
      var top  = document.body.scrollTop;
        if( top >= 0  ){
        navtip.style.marginLeft=22+'px';
        }
        if( top > ( 640*1 - 150) ){
        navtip.style.marginLeft=(104*1+22)+'px';
        }
        if( top > ( 640*2 - 150) ){
          navtip.style.marginLeft=(104*2+22)+'px';
        }
        if( top > ( 640*3 - 150) ){
          navtip.style.marginLeft=(104*3+22)+'px';
        }
        if( top > ( 640*4 - 150) ){
          navtip.style.marginLeft=(104*4+22)+'px';
        }  
    }
} 
for(var i=0;i<navItems.length-1;i++){
  settip(i,navItems)
}