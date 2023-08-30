alert('text');
var $defaultMediaBoxSetting = {
  default_id: 'mymediabox',
  //element of scroll
  restore_element_scroll: document.body,
  close_button: true,
  close_style: '',
  //only for image box style
  zoom_button: true,
  zoom_back_icon: 'https://lh5.googleusercontent.com/bQPX7t_XGK9ZKZFTFA9dT7710FlU5LC_GwnEn5wm-Z-3rC8wcbEAJtYe7OgO7oWg-LU',
  zoom_in_icon: 'https://lh5.googleusercontent.com/dafQlHc3bgq5n8CiXz7U86iHhVry4cnMOzp_YWYYbDY3b8II1Ksr4s73giXyvQdO-bY',
  zoom_out_icon: 'https://lh5.googleusercontent.com/WlCERmyTcWv19gQth4wm0p6VOYwz2MN5_62GZ4zt_zwxDrKb9l36wsvUZ8Q--h2ObPI',
  //support: % or px, image as max-size, '400px 600px', '80% 90%', as height width, '80%' as both height & width.
  box_size: '80%',
  refer_attribute: 'src',
  //must have class in tagname
  album_class: 'imageinpost',
  album_nav_prev: 'https://lh6.googleusercontent.com/jMT6fQTD3or2QoycMWsfvnSe605XYh2lP1z5yT6x6i_BMzrFxsT6Qxe1_mjzH55ViKY',
  album_nav_next: 'https://lh6.googleusercontent.com/_b3BLS9a2rwHQ4yiO6iWEKxG92mZ3CHojOi6z0P4Vc78kSZBUzrPkcUPEMyCklg1nR4',
  album_nav_distance: 60,
  album_nav_cycle: true,
  layer_background: '#000',
  size: 10,
  loading_style: 'marqueeline',  //'squaredot', 'marqueedot', 'squareline', 'marqueeline'.
  loading_background: 'transparent',  //loading_background
  loading_border: 'solid 10px transparent',  //loading_border
  dot_background: 'LightSkyBlue',  //loading_dot_background
  replacebox_style: 'font-family:arial;font-weight:normal;top:0;bottom:0;left:0;right:0;border:12px solid #fff;border-radius:9px;box-shadow:0px 0px 12px 8px #222;background-color:#000;font-size:14px;color:#000;text-align:left;',  //default position absolute
  zindex: 9900,
  opacity: 0.8,
  openCallBack: null,  //function
  closeCallBack: null  //function
};

function createMediaBox(targetElm,mediaType,options){
  if(!targetElm||!mediaType) return;
  var d = document, rScrollElm = options.restore_element_scroll||null, isWindowElm, elmX, elmY, thisM;
  if(rScrollElm){
    isWindowElm = rScrollElm==d.body||rScrollElm==window||rScrollElm==d;
    if(isWindowElm){
      var dde = document.documentElement;
      elmX = (window.pageXOffset || dde.scrollLeft) - (dde.clientLeft || 0);
      elmY = (window.pageYOffset || dde.scrollTop)  - (dde.clientTop || 0);
    } else {
      elmX = rScrollElm.scrollLeft;
      elmY = rScrollElm.scrollTop;
    }
  }
  var m = {
    cover: null,  //default value.
    loadzone: null,  //default value.
    timer: null,  //default value.
    layer: null,  //default value.
    opts: options,
    setopacity: function(e,n){e.style.opacity=n;e.style.filter='alpha(opacity='+(n*100)+')'},
    addingload: function(pElm,iStyle,iSIZE,Pos){
      var LL=0;m.loadzone=d.createElement('div');pElm.appendChild(m.loadzone);
      function LIZ(n){return(iSIZE*n)}
      function ldgStying(w,h){m.loadzone.style.cssText='position:'+(Pos||'relative')+';width:'+w+'px;height:'+h+'px;background:'+m.opts.loading_background+';border:'+m.opts.loading_border+';z-index:'+(m.opts.zindex+20)+';cursor:wait;'}
      var loadingLw=0,loadingLh=0;
      function LG(PosT,PosL){
        var LDdot=d.createElement('div');
        LDdot.style.cssText='position:absolute;top:'+PosT+'px;left:'+PosL+'px;width:'+loadingLw+'px;height:'+loadingLh+'px;background:'+m.opts.dot_background+';cursor:wait;';
        m.loadzone.appendChild(LDdot);
      }
      if(iStyle=='squaredot'){
        LL=12;ldgStying(LIZ(7),LIZ(7));loadingLw=LIZ(1),loadingLh=LIZ(1);
        LG(0,0);LG(0,LIZ(2));LG(0,LIZ(4));LG(0,LIZ(6));LG(LIZ(2),LIZ(6));LG(LIZ(4),LIZ(6));LG(LIZ(6),LIZ(6));LG(LIZ(6),LIZ(4));LG(LIZ(6),LIZ(2));LG(LIZ(6),0);LG(LIZ(4),0);LG(LIZ(2),0);
      }else if(iStyle=='marqueedot'){
        LL=12;ldgStying(LIZ(23),LIZ(2));loadingLw=LIZ(1),loadingLh=LIZ(2);
        LG(0,0);LG(0,LIZ(2));LG(0,LIZ(4));LG(0,LIZ(6));LG(0,LIZ(8));LG(0,LIZ(10));LG(0,LIZ(12));LG(0,LIZ(14));LG(0,LIZ(16));LG(0,LIZ(18));LG(0,LIZ(20));LG(0,LIZ(22));
      }else if(iStyle=='squareline'){
        LL=12;ldgStying(LIZ(4),LIZ(4));loadingLw=LIZ(1),loadingLh=LIZ(1);
        LG(0,0);LG(0,LIZ(1));LG(0,LIZ(2));LG(0,LIZ(3));LG(LIZ(1),LIZ(3));LG(LIZ(2),LIZ(3));LG(LIZ(3),LIZ(3));LG(LIZ(3),LIZ(2));LG(LIZ(3),LIZ(1));LG(LIZ(3),0);LG(LIZ(2),0);LG(LIZ(1),0);
      }else if(iStyle=='marqueeline'){
        LL=14;ldgStying(LIZ(11),LIZ(2));loadingLw=LIZ(1),loadingLh=LIZ(2);
        for(var i=0;i<LL;i++){
          LG(0,LIZ(i));
        }
      }
      function LOADING(){
        if(LL>0){
          for(var i=0;i<LL;i++){
            m.setopacity(m.loadzone.children[i],Math.max(0,1-(0.1*(LL-i))))
          }
          m.loadzone.appendChild(m.loadzone.children[0]);
          m.timer=setTimeout(LOADING,40)
        }
      };
      LOADING();
    },
    clearload: function(addElm,clickToCloseMode,closeCallBackFunction){
      clearTimeout(m.timer);m.timer=null;
      if(m.loadzone!==null){
        m.loadzone.parentNode.removeChild(m.loadzone);
        m.loadzone=null;
      }
      if(addElm&&m.layer){
        m.loadzone = d.createElement('div');
        m.loadzone.style.cssText = 'width:auto;height:auto;'+(m.opts.replacebox_style||'');
        m.loadzone.style.position = 'absolute';
        m.loadzone.style.overflow = 'visible';
        m.loadzone.style.zIndex = (m.opts.zindex+40);
        m.loadzone.appendChild(addElm);
        m.layer.onclick = null;
        m.layer.parentNode.appendChild(m.loadzone);
        m.layer.style.cursor = 'default';
        m.getcenter(m.loadzone,m.layer);
        var thisCloseClick = function(){
          m.allclose(closeCallBackFunction);
        }
        if(clickToCloseMode==1||clickToCloseMode==2){
          m.layer.onclick = thisCloseClick;
        }
        if(clickToCloseMode==1){
          m.loadzone.onclick = thisCloseClick;
        }
      }
    },
    allclose: function(closeCallBackFunction){
      thisM = null;
      if(m.layer) m.clearload();
      if(m.cover){
        m.cover.parentNode.removeChild(m.cover); m.cover=null;
      }
      if(rScrollElm) (isWindowElm?window:rScrollElm).scrollTo(elmX,elmY);
      if(typeof closeCallBackFunction === 'function'){
        setTimeout(closeCallBackFunction,0);
      }
    },
    getcenter: function(eInner,eOuter){
      if(eInner&&eOuter){
        eInner.style.visibility = 'hidden';
        setTimeout(function(){
          var eH=eInner.offsetHeight+(parseInt(eInner.style.marginTop)||0)+(parseInt(eInner.style.marginBottom)||0);
          var eW=eInner.offsetWidth+(parseInt(eInner.style.marginLeft)||0)+(parseInt(eInner.style.marginRight)||0);
          eInner.style.top=((eOuter.offsetHeight-eH)/2)+'px';
          eInner.style.left=((eOuter.offsetWidth-eW)/2)+'px';
          eInner.style.visibility = 'visible';
        },60);
      }
    },
    imgreize: function(){
      setTimeout(function(){
        m.getcenter(m.loadzone,m.layer);
        //m.getcenter(m.replaceHTML,m.layer);
        if(mType=='image'&&thisM) return resizeImage(thisM);
      },60);
    }
  };
  function setevent(obj,evt,ofn,evtcap){
    if(!setevent.guid){setevent.guid=0}var eCap=evtcap||false;if(obj.attachEvent){obj.attachEvent('on'+evt,ofn,eCap)}else if(obj.addEventListener){obj.addEventListener(evt,ofn,eCap)}else{if(!ofn.$$guid){ofn.$$guid=setevent.guid++}if(!obj.events){obj.events={}}var fns=obj.events[evt];if(!fns){fns=obj.events[evt]={};if(obj['on'+evt]){fns[0]=obj['on'+evt]}obj['on'+evt]=function(e){var event=e||event||window.event;var returnValue=true,fn=this.events[event.type];for(var i in fn){if(!Object.prototype[i]){this.$$handler=fn[i];if(this.$$handler(event)===false){returnValue=false}}}if(this.$$handler){this.$$handler=null}return returnValue}}fns[ofn.$$guid]=ofn}if(eCap===true){if(obj.setCapture){obj.setCapture()}else{eval('obj.captureEvents(Event.'+evt.toUpperCase()+')')}}
  }
  function hasClass(e,c){
    var a = false;
    if(e&&c){
      e = e.className||'';
      if(e){
        if(e==c||e.indexOf(' '+c+' ')!=-1||e.indexOf(c+' ')==0||(e.lastIndexOf(' '+c)!=-1&&e.lastIndexOf(' '+c)==e.length-c.length-1)) a=true;
      }
    }; return a;
  }

  var boxId = m.opts.default_id||'mymediabox';
  m.cover = d.getElementById(boxId);
  if(m.cover) m.cover.parentNode.removeChild(m.cover);
  m.cover = d.createElement('DIV');
  m.cover.id = boxId;
  m.cover.style.cssText = 'position:fixed;top:0px;left:0px;height:100%;width:100%;overflow:hidden;z-index:' + m.opts.zindex + ';';
  d.body.appendChild(m.cover);

  m.layer= d.createElement('div');
  m.layer.style.cssText = 'position:absolute;top:0px;left:0px;width:100%;height:100%;background:' + m.opts.layer_background + ';cursor:wait;';
  m.setopacity(m.layer,m.opts.opacity);
  m.cover.appendChild(m.layer);

  var zRate = 1, oH = 0, oW = 0, iH = 0, iW = 0;
  var mType = mediaType||'', refAttr = m.opts.refer_attribute||'';
  var sSize = '80%';
  var mStyle = 'position:absolute;top:0;left:0;height:100%;width:100%;border:0;padding:0;margin:0;';
  var sizePptn = (m.opts.box_size||sSize).toString().replace(/(^\s+|\s+$)/g,'').replace(/\s/g,' ').split(' ');

  function resizeImage(e){
    var r = zRate;
    var fH = m.cover.offsetHeight||m.cover.clientHeight||0;
    var fW = m.cover.offsetWidth||m.cover.clientWidth||0;
    if(!fH||!fW) return false;
    if(!oH) oH = e.height;
    if(!oW) oW = e.width;
    var h = oH||e.height, w = oW||e.width;
    var cH = sizePptn[0]||sSize;
    var cW = sizePptn[1]||sizePptn[0]||sSize;
    cH = cH.indexOf('%')==-1?parseInt(cH):(fH*parseInt(cH)/100);
    cW = cW.indexOf('%')==-1?parseInt(cW):(fW*parseInt(cW)/100);
    var thisLZ = m.loadzone;
    //thisLZ.style.maxHeight = cH+'px';
    //thisLZ.style.maxWidth = cW+'px';
    if(h<=cH&&w<=cW){
      iH = h*r; iW = w*r;
    } else {
      if(h>cH&&w<=cW){
        iH = cH*r; iW = w*cH/h*r;
      } else if(w>cW&&h<=cH){
        iH = h*cW/w*r; iW = cW*r;
      } else {
        var mW = cH/h*w, mH = cW/w*h;
        if(mH<=cH){
          iH = mH*r; iW = w*mH/h*r;
        } else if(mW<=cW){
          iH = h*mW/w*r; iW = mW*r;
        } else {
          console.warn('Mediabox dimension error!');
          alert('Sorry! Media Error!');
          m.allclose();
        }
      }
    }
    if(iH) thisLZ.style.height = iH+'px';
    if(iW) thisLZ.style.width = iW+'px';
    return true;
  }
  function rBtn(s,vCss,hCss,dfClosePNG,clickCallBack,cStyle){
    if(s&&vCss&&hCss&&dfClosePNG){
      cBtn = d.createElement('DIV');
      var dfStyle = 'position:absolute;'+vCss+';'+hCss+';width:'+s+'px;height:'+s+'px;background:transparent url('+dfClosePNG+') no-repeat center/contain;overflow:hidden;cursor:pointer;z-index:'+(m.opts.zindex+80)+';margin:auto;';
      cBtn.style = cStyle?cStyle:dfStyle;
      var cOpty = '0.8'; cBtn.style.opacity=cOpty;
      cBtn.onmouseover = function(){this.style.opacity='1'};
      cBtn.onmouseout = function(){this.style.opacity=cOpty};
      m.cover.appendChild(cBtn);
      if(typeof clickCallBack === 'function') cBtn.onclick = clickCallBack;
      return cBtn;
    }
  }
  var closeBtn =  m.opts.close_button||false;
  if(closeBtn === true || closeBtn == 'true'){
    closeBtn = rBtn(64,'top:0px','right:0px','https://lh3.googleusercontent.com/7hsme9KcxeDCuf1E9hAXlPLyIhSW4v7WUPaM4cEPcRWlwRQFSLJjJcOMTAdg_QEVJJ0',function(){
      m.allclose();
    },(m.opts.close_style||'')); closeBtn.title = 'Exit (退出)';
  } else {
    m.layer.onclick = m.allclose;
  }
  var tTags = d.getElementsByTagName(targetElm.tagName||'');
  var rTags = [], thisIdx=-1;
  var abClass = m.opts.album_class||'';
  if(tTags.length>1){
    for(var i=0;i<tTags.length;i++){
      if(hasClass(tTags[i],abClass)){
        rTags.push(tTags[i]);
        if(tTags[i] == targetElm) thisIdx = rTags.length-1;
      }
    }
  }
  var isCycle = m.opts.album_nav_cycle||false;
  function goAlbumIndex(i){
    thisIdx += i;
    if(isCycle){
      if(thisIdx<0) thisIdx = rTags.length-1;
      if(thisIdx>rTags.length-1) thisIdx = 0;
    }
    mInitialize(rTags[thisIdx]);
  }
  function addIndexBtn(){
    if(thisIdx===0||thisIdx>0){
      var btnPrev = m.opts.album_nav_prev||'';
      var btnNext = m.opts.album_nav_next||'';
      var btnDtnce = parseFloat(m.opts.album_nav_distance||84)||0;
      var hasSwipeEvent = 0, hasAnminateEvent = 0;
      if($){
        if($.fn){
          hasSwipeEvent = $.fn.swipe?1:0;
          hasAnminateEvent = $.fn.animate?1:0;
        }
      }
      function runAlbumIndex(leftMarginValue,toIndex){
        if(hasAnminateEvent){
          if(btnPrev) btnPrev.style.display = 'none';
          if(btnNext) btnNext.style.display = 'none';
          $(m.loadzone).animate({
            marginLeft:leftMarginValue+'px',
            opacity:0
          },'fast','linear',function(){
            goAlbumIndex(toIndex);
          });
        } else {
          goAlbumIndex(toIndex);
        }
      }
      if(btnPrev){
        btnPrev = rBtn(54,'top:0;bottom:0','left:-'+btnDtnce+'px;',btnPrev,function(){
          runAlbumIndex('-240',-1);
        });
        m.loadzone.appendChild(btnPrev);
        btnPrev.title = 'Prev (往前)';
        if(isCycle!=true&&(thisIdx===0||thisIdx<0)) btnPrev.style.display = 'none';
      }
      if(btnNext){
        btnNext = rBtn(54,'top:0;bottom:0','right:-'+btnDtnce+'px',btnNext,function(){
          runAlbumIndex('240',1);
        });
        m.loadzone.appendChild(btnNext);
        btnNext.title = 'Next (往後)';
        if(isCycle!=true&&thisIdx>=rTags.length-1) btnNext.style.display = 'none';
      }
      if(thisM&&m.loadzone&&hasSwipeEvent){
        if(btnPrev) $(thisM).on("swipeleft",function(){
          if(isCycle==true||thisIdx>0) runAlbumIndex('-240',-1);
        });
        if(btnNext) $(thisM).on("swiperight",function(){
          if(isCycle==true||thisIdx<rTags.length-1) runAlbumIndex('240',1);
        });
      }
    }
  }
  var zInBtn,zOtBtn,zBkBtn;
  var isZoomBtn = m.opts.zoom_button||false;
  function zoomCurrentCenter(){
    var nH = thisM.offsetHeight, nW = thisM.offsetWidth;
    resizeImage(thisM); var dL = 128;
    var nnH = thisM.offsetHeight, nnW = thisM.offsetWidth;
    var nnT = m.loadzone.offsetTop+((nH-nnH)/2);
    var nnL = m.loadzone.offsetLeft+((nW-nnW)/2);
    var lyrH = m.layer.offsetHeight, lyrW = m.layer.offsetWidth;
    m.loadzone.style.top = Math.max(Math.min(nnT,lyrH-dL),dL-nnH)+'px';
    m.loadzone.style.left = Math.max(Math.min(nnL,lyrW-dL),dL-nnW)+'px';
  }
  function runDelta(e){
    var mwVal=0,EVT=e||event||window.event;
    var dv=200/(iH+iW); dv = 0.2;
    mwVal=EVT.detail?EVT.detail/(-3):EVT.wheelDelta/120;
    if(EVT.preventDefault){
      EVT.preventDefault();
    }else{
      EVT.returnValue=false;
    }
    if(mwVal>0) if(zRate-dv>0.1) zRate-=dv;
    if(mwVal<0) zRate+=dv;
    //m.imgreize()
    zoomCurrentCenter();
  }
  function mInitialize(e){
    if(m.loadzone) m.loadzone.parentNode.removeChild(m.loadzone);
    m.addingload(m.cover,m.opts.loading_style,m.opts.size,'absolute');
    m.getcenter(m.loadzone,m.layer);
    thisM = null; 
    if(mType=='html'){
      thisM = d.createElement('DIV');
      thisM.innerHTML = e[refAttr]||'';
    }
    if(mType=='iframe'){
      thisM = d.createElement('IFRAME');
      thisM.frameBorder = 0;
    }
    if(mType=='image'){
      zRate=1;oH=0;oW=0;iH=0,iW=0;
      thisM = new Image();
      thisM.alt = 'Image Error';
      if(isZoomBtn === true || isZoomBtn == 'true'){
        if(zInBtn) if(zInBtn.parentNode) zInBtn.parentNode.removeChild(zInBtn);
        if(zOtBtn) if(zOtBtn.parentNode) zOtBtn.parentNode.removeChild(zOtBtn);
        if(zBkBtn) if(zBkBtn.parentNode) zBkBtn.parentNode.removeChild(zBkBtn);
        zInBtn=null;zOtBtn=null;zBkBtn=null;
      }
    }
    var closeCB = m.opts.closeCallBack;
    if(mType=='html'||mType=='iframe'){
      m.clearload(thisM,((closeBtn&&(thisIdx===0||thisIdx>0))?3:2),closeCB);
      var thisLZ = m.loadzone;
      thisLZ.style.height = sizePptn[0]||sSize;
      thisLZ.style.width = sizePptn[1]||sizePptn[0]||sSize;
      thisLZ.style.overflow = 'auto';
      thisM.style.cssText = mStyle;
      addIndexBtn();
    }
    if(mType=='image'){
      thisM.onerror = function(){
        var errM = d.createElement('DIV');
        errM.style.cssText = 'color:orange;font-weight:bold;font-size:16px;line-height:2;text-align:center;padding:10px 20px;';
        errM.innerHTML = 'Oops! Sorry, the image is not available at the moment.<br/>Please try again later or contact administrator for the further support.';
        m.clearload(errM,((closeBtn&&(thisIdx===0||thisIdx>0))?3:2),closeCB);
        m.loadzone.style.cssText += 'bottom:auto;right:auto;';
        addIndexBtn(); thisM = null;
      }
      thisM.onload = function(){
        if(!d.getElementById(boxId)) return;
        setTimeout(function(){
          if(!m.cover||!d.getElementById(boxId)) return;
          m.clearload(thisM,((closeBtn&&(thisIdx===0||thisIdx>0))?3:2),closeCB);
          var isImgLoad = resizeImage(thisM);
          if(isImgLoad){
            thisM.style.cssText = mStyle;
            addIndexBtn();
            if(isZoomBtn === true || isZoomBtn == 'true'){
              var zInIcon = m.opts.zoom_in_icon||'';
              var zOtIcon = m.opts.zoom_out_icon||'';
              var zBkIcon = m.opts.zoom_back_icon||'';
              if(zInIcon){
                zInBtn = rBtn(64,'bottom:-12px','right:-12px',zInIcon,function(){
                  zRate += 0.2; zoomCurrentCenter();
                }); zInBtn.title = 'Zoom In (放大)';
              }
              if(zOtIcon){
                zOtBtn = rBtn(64,'bottom:-13px','left:-13px',zOtIcon,function(){
                  if(zRate-0.2>0.1){
                    zRate -= 0.2; zoomCurrentCenter();
                  }
                }); zOtBtn.title = 'Zoom Out (縮小)';
              }
              if(zBkIcon){
                zBkBtn = rBtn(64,'top:-12px','left:-12px',zBkIcon,function(){
                  zRate = 1; m.imgreize();
                }); zBkBtn.title = 'Zoom Back (回復大小)';
              }
            }
            if(m.loadzone){
              if($){
                if($.fn){
                  if($.fn.draggable){
                    var dragImgTimer = null;
                    $(m.loadzone).draggable({
                      cursor:'move',
                      start: function(event,ui){
                        this.className = 'mdragging';
                        if(dragImgTimer) clearTimeout(dragImgTimer);
                        dragImgTimer = null;
                      },
                      stop: function(event,ui){
                        var t = this;
                        setTimeout(function(){t.className=''},60);
                      },
                      delay: 750
                    }).on('vmousedown',function(){
                      var $this = $(this);
                      if(dragImgTimer) clearTimeout(dragImgTimer);
                      dragImgTimer = setTimeout(function(){
                        var tt = 20;
                        $this.animate({marginTop:'-6px',marginLeft:'0px'},tt)
                          .animate({marginTop:'0px',marginLeft:'6px'},tt)
                          .animate({marginTop:'6px',marginLeft:'0px'},tt)
                          .animate({marginTop:'0px',marginLeft:'-6px'},tt)
                          .animate({marginTop:'-6px',marginLeft:'0px'},tt)
                          .animate({marginTop:'0px',marginLeft:'0px'},tt);
                      },630);
                    }).on('vmouseup vmousemove vmouseout',function(){
                      if(dragImgTimer) clearTimeout(dragImgTimer);
                      dragImgTimer = null;
                    });
                  }
                }
              }
            }
            setevent(thisM,'mousewheel',runDelta,false);
            setevent(thisM,'DOMMouseScroll',runDelta,false);
            thisM.onclick = function(){
              if(m.loadzone.className!='mdragging'){
                zRate = 1; zoomCurrentCenter();
              }
            }
          } else {
            console.warn('Mediabox dimension not found!');
            alert('Sorry! Media Opening Error!');
          }
        },60);
      }
    }
    if(mType=='image'||mType=='iframe'){
      thisM.src = e[refAttr]||'';
    }
  }
  if(abClass && !(thisIdx===0||thisIdx>0)) console.warn('Album is not found!');
  if(mType=='html'||mType=='image'||mType=='iframe'){
    mInitialize(targetElm);
  } else {
    console.warn('No Media Found!');
    return;
  }

  setevent(window,'resize',function(){zRate = 1;m.imgreize()});
  var callBackFunction = m.opts.openCallBack||null;
  if(callBackFunction && typeof callBackFunction === 'function'){
    setTimeout(callBackFunction,0);
  }
  return false;
}
