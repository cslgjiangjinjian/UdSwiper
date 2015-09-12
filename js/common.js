window.switching=function(container){var changed=new switching.Signal();var layers=Array.prototype.slice.call(container.querySelectorAll('.layer'));var capable='WebkitPerspective'in document.body.style||'MozPerspective'in document.body.style||'msPerspective'in document.body.style||'OPerspective'in document.body.style||'perspective'in document.body.style;if(capable){container.classList.add('capable');}
function show(target,direction){layers=Array.prototype.slice.call(container.querySelectorAll('.layer'));container.classList.add('animate');direction=direction||(target>getIndex()?'nextPage':'prevPage');if(typeof target==='string')target=parseInt(target);if(typeof target!=='number')target=getIndex(target);target=Math.max(Math.min(target,layers.length),0);if(layers[target]&&!layers[target].classList.contains('show')){layers.forEach(function(el,i){el.classList.remove('prevPage','nextPage');el.classList.add(direction);if(el.classList.contains('show')){el.classList.remove('show');el.classList.add('hide');}
else{el.classList.remove('hide');}});layers[target].classList.add('show');changed.dispatch(layers[target],target);}}
function prev(){var index=getIndex()-1;show(index>=0?index:layers.length+index,'prevPage');}
function next(){show((getIndex()+1)%layers.length,'nextPage');}
function getIndex(of){var index=0;layers.forEach(function(layer,i){if((of&&of==layer)||(!of&&layer.classList.contains('show'))){index=i;return;}});return index;}
function getTotal(){return layers.length;}
return{show:show,prev:prev,next:next,getIndex:getIndex,getTotal:getTotal,changed:changed};};switching.Signal=function(){this.listeners=[];}
switching.Signal.prototype.add=function(callback){this.listeners.push(callback);}
switching.Signal.prototype.remove=function(callback){var i=this.listeners.indexOf(callback);if(i>=0)this.listeners.splice(i,1);}
switching.Signal.prototype.dispatch=function(){var args=Array.prototype.slice.call(arguments);this.listeners.forEach(function(f,i){f.apply(null,args);});}
var k=switching(document.querySelector('.switching'));document.addEventListener('keyup',function(event){if(event.keyCode===38)k.prev();if(event.keyCode===40)k.next();},false);var touchY=0;var touchConsumed=false;document.addEventListener('touchstart',function(event){touchConsumed=false;lastY=event.touches[0].clientY;},false);document.addEventListener('touchmove',function(event){event.preventDefault();if(!touchConsumed){if(event.touches[0].clientY>lastY+60){k.prev();touchConsumed=true;}
else if(event.touches[0].clientY<lastY-60){k.next();touchConsumed=true;}}},false);window.onload=function(){backAudio();}
var audio=$('.musicRes').get(0);function backAudio(){$(".music").click(function(){if(audio.paused){audio.play();$('.audioBtn').addClass('on');return;}
audio.pause();$('.audioBtn').removeClass('on');})}
$('body').one("touchstart",function(){if(audio.paused){audio.play();$('.audioBtn').addClass('on');return;}})