"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _default={mouse:null,getElementCoords:function getElementCoords(a){return{top:a.getBoundingClientRect().top+window.scrollY,bottom:a.getBoundingClientRect().bottom+window.scrollY,left:a.getBoundingClientRect().left+window.scrollX,right:a.getBoundingClientRect().right+window.scrollX,height:a.getBoundingClientRect().height,width:a.getBoundingClientRect().width}},getScrollCoordsFromElement:function getScrollCoordsFromElement(a){var b=this.getElementCoords(a);return{windowTop:{fromTop:window.scrollY-b.top,fromBetweenTopMiddle:window.scrollY-(b.top+b.height/4),fromMiddle:window.scrollY-(b.top+b.height/2),fromBetweenMiddleBottom:window.scrollY-(b.bottom-b.height/4),fromBottom:window.scrollY-b.bottom},windowBottom:{fromTop:window.scrollY+window.innerHeight-b.top,fromBetweenTopMiddle:window.scrollY+window.innerHeight-(b.top+b.height/4),fromMiddle:window.scrollY+window.innerHeight-(b.top+b.height/2),fromBetweenMiddleBottom:window.scrollY+window.innerHeight-(b.bottom-b.height/4),fromBottom:window.scrollY+window.innerHeight-b.bottom}}},getSpeedFromScrollCoord:function getSpeedFromScrollCoord(a){return{"/100000":a/1e5,"/10000":a/1e4,"/1000":a/1e3,"/500":a/500,"/400":a/400,"/300":a/300,"/200":a/200,"/250":a/250,"/100":a/100,"/50":a/50,"/10":a/10,"/5":a/5,"/3":a/3,"/2":a/2,1:a}},getMouseWindowCoords:function getMouseWindowCoords(){return null===this.mouse?{x:null,y:null}:{x:this.mouse.clientX,y:this.mouse.clientY}},getMouseDocumentCoords:function getMouseDocumentCoords(){return null===this.mouse?{x:null,y:null}:{x:this.mouse.pageX,y:this.mouse.pageY}},isElementVisible:function isElementVisible(a){var b=this.getElementCoords(a);return b.bottom>=window.scrollY&&b.top<=window.scrollY+window.innerHeight},isElementFullyVisible:function isElementFullyVisible(a){var b=this.getElementCoords(a);return b.bottom<=window.scrollY+window.innerHeight&&b.top>=window.scrollY},isElementHovered:function isElementHovered(a){var b=this.getElementCoords(a),c=this.getMouseDocumentCoords();return b.top<c.y&&b.bottom>c.y&&b.left<c.x&&b.right>c.x},useMouseEvent:function useMouseEvent(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:document;a.addEventListener("mousemove",function(a){this.mouse=a}.bind(this)),a.addEventListener("mouseenter",function(a){this.mouse=a}.bind(this))},render:function render(a){requestAnimationFrame(function c(b){a.forEach(function(a){return a(b)}),requestAnimationFrame(c)})}};exports["default"]=_default;