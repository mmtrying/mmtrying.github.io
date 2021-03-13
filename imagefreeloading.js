var returnLoadingCover = function(varCoverString,opts){
  var thisCover = {
    loadzone: null,  //default value.
    timer: null,  //default value.
    layer: null,  //default value.
    options: opts,
    setopacity: function(e,n){e.style.opacity=n;e.style.filter='alpha(opacity='+(n*100)+')'},
    addingload: function(pElm,iStyle,iSIZE,Pos){
      var LL=0;thisCover.loadzone=document.createElement('div');pElm.appendChild(thisCover.loadzone);
      function LIZ(n){return(iSIZE*n)}
      function ldgStying(w,h){thisCover.loadzone.style.cssText='position:'+(Pos||'relative')+';width:'+w+'px;height:'+h+'px;background:'+thisCover.options.loading_background+';border:'+thisCover.options.loading_border+';z-index:'+(thisCover.options.zindex+40)+';cursor:wait;'}
      var loadingLw=0,loadingLh=0;
      function LG(PosT,PosL){
        var LDdot=document.createElement('div');
        LDdot.style.cssText='position:absolute;top:'+PosT+'px;left:'+PosL+'px;width:'+loadingLw+'px;height:'+loadingLh+'px;background:'+thisCover.options.dot_background+';cursor:wait;';
        thisCover.loadzone.appendChild(LDdot);
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
            thisCover.setopacity(thisCover.loadzone.children[i],Math.max(0,1-(0.1*(LL-i))))
          }
          thisCover.loadzone.appendChild(thisCover.loadzone.children[0]);
          thisCover.timer=setTimeout(LOADING,40)
        }
      };
      LOADING();
    },
    clearload: function(replaceMessage){
      clearTimeout(thisCover.timer);thisCover.timer=null;
      if(thisCover.loadzone!==null){
        thisCover.loadzone.parentNode.removeChild(thisCover.loadzone);
        thisCover.loadzone=null;
      }
      if(replaceMessage&&this.layer){
        var newText = document.createElement('div');
        newText.style.cssText = 'position:absolute;width:auto;height:auto;background:none;border:2px solid white;z-index:'+(thisCover.options.zindex+40)+';font-weight:bold;font-size:24px;color:white;padding:8px 14px;';
        newText.innerHTML = '<span>'+replaceMessage+'</span>';
        thisCover.layer.appendChild(newText);
        thisCover.layer.style.cursor = 'default';
        thisCover.getcenter(newText,thisCover.layer);
      }
    },
    allclose: function(){
      thisCover.clearload();
      if(thisCover.layer!==null){
        thisCover.layer.parentNode.removeChild(thisCover.layer);thisCover.layer=null;
      }
    },
    start: function(e){
      var d = document;
      thisCover.layer= d.createElement('div');
      thisCover.layer.style.cssText = 'position:absolute;top:0px;left:0px;width:100%;height:100%;background:' + thisCover.options.layer_background + ';z-index:' + thisCover.options.zindex + ';cursor:wait;';
      thisCover.setopacity(thisCover.layer,thisCover.options.opacity);
      e.appendChild(thisCover.layer);
      thisCover.addingload(e,thisCover.options.loading_style,thisCover.options.size,'absolute');
      thisCover.getcenter(thisCover.loadzone,thisCover.layer);
    },
    getcenter: function(eInner,eOuter){
      if(eInner&&eOuter){
        var eH=eInner.offsetHeight+(parseInt(eInner.style.marginTop)||0)+(parseInt(eInner.style.marginBottom)||0);
        var eW=eInner.offsetWidth+(parseInt(eInner.style.marginLeft)||0)+(parseInt(eInner.style.marginRight)||0);
        eInner.style.top=((eOuter.offsetHeight-eH)/2)+'px';
        eInner.style.left=((eOuter.offsetWidth-eW)/2)+'px';
      }
    }
  }
  eval(varCoverString + ' =  thisCover;');
}

var eLoadingCover;returnLoadingCover('eLoadingCover',{
  layer_background: 'black',
  size: 10,
  loading_style: 'squaredot',  //'squaredot', 'marquee', 'squareline', 'linedot'.
  loading_background: 'transparent',  //loading_background
  loading_border: 'solid 10px transparent',  //loading_border
  dot_background: 'LightSkyBlue',  //loading_dot_background
  zindex: 9999,
  opacity: 0.8
});
