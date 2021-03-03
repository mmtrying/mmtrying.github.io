  var eLoading_background = 'transparent';  //loading_background
  var eLoading_border = 'solid 10px transparent';  //loading_border
  var eLoading_dot_background = 'LightSkyBlue';  //loading_dot_background
  var eLoading_zindex = 9999;
  var eLoading=null,eTimeLOAD=null,eLayer=null;
  var layer_opacity = 0.8;
  var layer_background = 'black';
  var loading_size = 10;
  var loading_style = 'squaredot';  //'squaredot', 'marquee', 'squareline', 'linedot'.
  
  function setOPC(e,n){e.style.opacity=n;e.style.filter='alpha(opacity='+(n*100)+')'};
  function addLoad(pElm,iStyle,iSIZE,Pos){
    var LL=0;eLoading=document.createElement('div');pElm.appendChild(eLoading);
    function LIZ(n){return(iSIZE*n)}
    function ldgStying(w,h){eLoading.style.cssText='position:'+(Pos||'relative')+';width:'+w+'px;height:'+h+'px;background:'+eLoading_background+';border:'+eLoading_border+';z-index:'+(eLoading_zindex+40)+';cursor:wait;'}
    var loadingLw=0,loadingLh=0;
    function LG(PosT,PosL){
      var LDdot=document.createElement('div');
      LDdot.style.cssText='position:absolute;top:'+PosT+'px;left:'+PosL+'px;width:'+loadingLw+'px;height:'+loadingLh+'px;background:'+eLoading_dot_background+';cursor:wait;';
      eLoading.appendChild(LDdot);
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
    function LOADING(){if(LL>0){for(var i=0;i<LL;i++){setOPC(eLoading.children[i],Math.max(0,1-(0.1*(LL-i))))}eLoading.appendChild(eLoading.children[0]);eTimeLOAD=setTimeout(LOADING,40)}};
    LOADING();
  }
  function closeLoad(){
    clearTimeout(eTimeLOAD);eTimeLOAD=null;
    if(eLoading!==null){eLoading.parentNode.removeChild(eLoading);eLoading=null}
    if(eLayer!==null){eLayer.parentNode.removeChild(eLayer);eLayer=null}
  }

  function eCenter(e){
    if(e){
      var eH=e.offsetHeight+(parseInt(e.style.marginTop)||0)+(parseInt(e.style.marginBottom)||0);
      var eW=e.offsetWidth+(parseInt(e.style.marginLeft)||0)+(parseInt(e.style.marginRight)||0);
      e.style.top=((eLayer.offsetHeight-eH)/2)+'px';
      e.style.left=((eLayer.offsetWidth-eW)/2)+'px';
    }
  }
  function loadingLayer(e){
    var d = document;
    eLayer= d.createElement('div');
    eLayer.style.cssText='position:absolute;top:0px;left:0px;width:100%;height:100%;background:'+layer_background+';z-index:'+eLoading_zindex+';cursor:wait;';
    setOPC(eLayer,layer_opacity);
    e.appendChild(eLayer);
    addLoad(e,loading_style,loading_size,'absolute');
    eCenter(eLoading);
  }
