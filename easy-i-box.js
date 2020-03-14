//This is open source scripted by Martin Ma, who is personal project designer in Hong Kong.
//Martin Ma is an expert who have stidied javascript & blogger design for years.
//Respecting copyrights and design-effort, please don't delete this introduction when you use this script.
//Introduction Website: http://personalprojectdesigner.blogspot.com/
//Most Succeed Website: http://14161.blogspot.com/    <= Adult Site, according to some free sourcing using term changed, there a bit error showing google map & picasa photos.
//Who interesting blogger development or design, please feel free to contact: +852-64666880 or mmbusiness20c@gmail.com

// how to use: ecibox100fds(Target_Open_Element,{Setting})

var $myBoxDefaultSetting = {
    open_style: 'image',    //..image,iframe,html,customhtml.  
    //..image = normal image show
    //..iframe = normal from a website or linking location.
    //..html = get the HTML content from the element.
    //..customhtml = design your HTML content from <src_attribute> below.

    src_attribute: 'src',    //..load the show-up linkage/src from reading any possible attribute.
    //..if open_style is 'customhtml', here would be your HTML text.
    //..if open_style is 'html', put 'innerHTML' here can show-up the element's HTML content, or this can be put as an attribute name which the HTML content which is stored in the element's attribute.

    box_zindex: 9999,
    image_backgroundcolor: 'black',
    max_proportion: 0.8,    //..first show of max proportion of user screen.
    layer_background: 'black',
    layer_opacity: 0.8,
    click_layer_close: 'X',    //..'=image:::' at the beginning can use image as a close button, using normal text like 'X' will be located on the layer corner, is true can click layer to close without any button, don't put false that will be nothing to access close.

    close_style: null,    //..CSS style for your close button (close button default on your top-right corner. Cancel style by ''.
    open_image_style: null,    //..CSS style for your image when open. Cancel style by ''.
    open_iframe_style: null,    //..CSS style for your iframe when open. Cancel style by ''.
    open_html_style: null,    //..CSS style for your HTML content when open. Cancel style by ''.
    open_error_style: null,    //..CSS style for the error message when open. Cancel style by ''.
    open_error_text: 'Sorry! This linkage is temporarily unavailable.',

    loading_style: 'o_square',  //..four loading style you can choose when loading the content.. 'o_square','line','i_square', & 'marquee'.
    loading_background: 'transparent',
    loading_border: 'solid 10px transparent',
    loading_dot_background: 'LightSkyBlue',
    loading_size: 10
}

function ecibox100fds(tElm,opts){
    function setmyevent(obj,evt,ofn,evtcap){
        if(!setmyevent.guid){ setmyevent.guid=0; }
        var eCap = evtcap||false;
        if(obj.attachEvent){  obj.attachEvent('on'+evt,ofn,eCap);  } else if(obj.addEventListener){
            obj.addEventListener(evt,ofn,eCap);
        } else {
            if(!ofn.$$guid){ ofn.$$guid = setmyevent.guid++; }
            if(!obj.events){ obj.events = {}; }
            var fns = obj.events[evt];
            if(!fns){
                fns = obj.events[evt] = {};
                if(obj['on'+evt]){ fns[0] = obj['on'+evt]; }
                obj['on'+evt] = function(e){
                    var event = e||event||window.event;
                    var returnValue = true, fn = this.events[event.type];
                    for(var i in fn){
                        if(!Object.prototype[i]){
                            this.$$handler = fn[i];
                            if (this.$$handler(event) === false){ returnValue = false; }
                        }
                    }
                    if(this.$$handler){ this.$$handler = null; }
                    return returnValue;
                }
            }
            fns[ofn.$$guid] = ofn;
        }
        if(eCap===true){  if(obj.setCapture){ obj.setCapture(); } else { eval('obj.captureEvents(Event.'+evt.toUpperCase()+')'); }  }
    };

    opts=opts||{};
    var opnSTY = opts.open_style||'image';  //image,iframe,html,customhtml.

    var srcAb = opts.src_attribute||'src';
    var bzidx = parseInt(opts.box_zindex)||9999;
    var iBG = opts.image_backgroundcolor||'black';
    var iMP = opts.max_proportion||0.8;
    var lyr_BG = opts.layer_background||'black';
    var lyr_OP = opts.layer_opacity, lyr_OP=(parseFloat(lyr_OP)>=0)?parseFloat(lyr_OP):0.8;
    var lyr_CLO = opts.click_layer_close||'X';
    var oc_SY = opts.close_style, oc_SY = (oc_SY=='')?'':(oc_SY||'');
    var o_i_SY = 'color:orange;font-family:arial;font-weight:bold;z-index:'+(bzidx+1)+';border:10px solid white;background-color:'+iBG+';';
    var oIMG_SY = opts.open_image_style, oIMG_SY = (oIMG_SY=='')?'':(oIMG_SY||o_i_SY);
    var oIFR_SY = opts.open_iframe_style, oIFR_SY = (oIFR_SY=='')?'':(oIFR_SY||o_i_SY);
    var oHTL_SY = opts.open_html_style, oHTL_SY = (oHTL_SY=='')?'':(oHTL_SY||o_i_SY);
    var oERR_SY = opts.open_error_style, oERR_SY = (oERR_SY=='')?'':(oERR_SY||o_i_SY);
    var oERR_TX = opts.open_error_text||'Sorry! This linkage is temporarily unavailable.';

    var ldgBG = opts.loading_background||'transparent';
    var ldgBD = opts.loading_border||'solid 10px transparent';
    var lddBG = opts.loading_dot_background||'LightSkyBlue';
    var ldgSZ = opts.loading_size||10;
    var ldgSY = opts.loading_style||'o_square';

    var eLoading=null,eTimeLOAD=null,eLayer=null,iElm=null,xClose=null,iCtnr=null;


        function setOPC(e,n){
            e.style.opacity = n;
            e.style.filter='alpha(opacity='+(n*100)+')';
        }

        function addLoad(pElm,iStyle,iSIZE,Pos){
            var LL=0;
            eLoading = document.createElement('div');
            pElm.appendChild(eLoading);
            function LIZ(n){return (iSIZE*n);}
            function ldgStying(w,h){
                eLoading.style.cssText='position:'+(Pos||'relative')+';width:'+w+'px;height:'+h+'px;background:'+ldgBG+';border:'+ldgBD+';z-index:'+(bzidx+20)+';';
            }
            var loadingLw=0,loadingLh=0;
            function LG(PosT,PosL){
                var LDdot = document.createElement('div');
                LDdot.style.cssText='position:absolute;top:'+PosT+'px;left:'+PosL+'px;width:'+loadingLw+'px;height:'+loadingLh+'px;background:'+lddBG+';';
                eLoading.appendChild(LDdot);
            }
                if(iStyle=='o_square'){
                    LL=12;
                    ldgStying(LIZ(7),LIZ(7));
                    loadingLw=LIZ(1),loadingLh=LIZ(1);
                    LG(0,0); LG(0,LIZ(2)); LG(0,LIZ(4)); LG(0,LIZ(6));
                    LG(LIZ(2),LIZ(6));
                    LG(LIZ(4),LIZ(6));
                    LG(LIZ(6),LIZ(6));
                    LG(LIZ(6),LIZ(4));
                    LG(LIZ(6),LIZ(2));
                    LG(LIZ(6),0);
                    LG(LIZ(4),0);
                    LG(LIZ(2),0);
                } else if(iStyle=='line'){
                    LL=12;
                    ldgStying(LIZ(23),LIZ(2));
                    loadingLw=LIZ(1),loadingLh=LIZ(2);
                    LG(0,0); LG(0,LIZ(2)); LG(0,LIZ(4)); LG(0,LIZ(6)); LG(0,LIZ(8));
                    LG(0,LIZ(10)); LG(0,LIZ(12)); LG(0,LIZ(14)); LG(0,LIZ(16));
                    LG(0,LIZ(18)); LG(0,LIZ(20)); LG(0,LIZ(22));
                } else if(iStyle=='i_square'){
                    LL=12;
                    ldgStying(LIZ(4),LIZ(4));
                    loadingLw=LIZ(1),loadingLh=LIZ(1);
                    LG(0,0); LG(0,LIZ(1)); LG(0,LIZ(2)); LG(0,LIZ(3));
                    LG(LIZ(1),LIZ(3));
                    LG(LIZ(2),LIZ(3));
                    LG(LIZ(3),LIZ(3));
                    LG(LIZ(3),LIZ(2));
                    LG(LIZ(3),LIZ(1));
                    LG(LIZ(3),0);
                    LG(LIZ(2),0);
                    LG(LIZ(1),0);
                } else if(iStyle=='marquee'){
                    LL=14;
                    ldgStying(LIZ(11),LIZ(2));
                    loadingLw=LIZ(1),loadingLh=LIZ(2);
                    for(var i=0;i<LL;i++){ LG(0,LIZ(i)); }
                }
                function LOADING(){
                    if(LL>0){

                        for(var i=0;i<LL;i++){
                            setOPC(eLoading.children[i],Math.max(0,1-(0.1*(LL-i))));
                        }
                        eLoading.appendChild(eLoading.children[0]);
                        eTimeLOAD = setTimeout(LOADING,40);
                    }
                }
                LOADING();
        }

        function closeLoad(){
            clearTimeout(eTimeLOAD);eTimeLOAD=null;
            if(eLoading!==null){ eLoading.parentNode.removeChild(eLoading); eLoading=null}
        }
        function iClose(){
            closeLoad();
            if(xClose!==null){ xClose.parentNode.removeChild(xClose); xClose=null; }
            if(iElm!==null){ iElm.parentNode.removeChild(iElm); iElm=null; }
            if(iCtnr!==null){ iCtnr.parentNode.removeChild(iCtnr); iCtnr=null; }
            if(eLayer!==null){ eLayer.parentNode.removeChild(eLayer); eLayer=null; }
        }

        function iOpen(TYP,iSRC){
            iClose(); var $mBrowser=(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))?true:false;
            var $d=document,$db=$d.body,$ddE=$d.documentElement;
            var thisExist=true,oW=0,oH=0,iW=0,iH=0,nZM=1,sZM=0,r=0,fHTML;
            var winX=window.pageXOffset||Math.max((($db.getBoundingClientRect().left-$db.offsetLeft)||0)*-1,0)||$db.scrollLeft||$ddE.scrollLeft||0;
            var winY=window.pageYOffset||Math.max((($db.getBoundingClientRect().top-$db.offsetTop)||0)*-1,0)||$db.scrollTop||$ddE.scrollTop||0;
            eLayer = $d.createElement('div');
            eLayer.style.cssText='position:fixed;top:0px;left:0px;width:100%;height:100%;background:'+lyr_BG+';z-index:'+bzidx+';';
            setOPC(eLayer,lyr_OP);
            $db.appendChild(eLayer);
            if( $mBrowser ){
                winX=window.pageXOffset;
                winY=window.pageYOffset;
                var mMaxW = Math.max($db.clientWidth,$ddE.clientWidth,window.innerWidth);
                var mMaxH = Math.max($db.clientHeight,$ddE.clientHeight,window.innerHeight);
                eLayer.style.position='absolute';
                eLayer.style.width = mMaxW+'px';
                eLayer.style.height = mMaxH+'px';
            }
            function eCenter(e,e2){
                var eH=e.offsetHeight+(parseInt(e.style.marginTop)||0)+(parseInt(e.style.marginBottom)||0);
                var eW=e.offsetWidth+(parseInt(e.style.marginLeft)||0)+(parseInt(e.style.marginRight)||0);
                if( $mBrowser ){
                    (e2||e).style.top = (window.pageYOffset+((window.innerHeight-eH)/2))+'px';
                    (e2||e).style.left = (window.pageXOffset+((window.innerWidth-eW)/2))+'px';
                } else {
                    (e2||e).style.top = ((eLayer.offsetHeight-eH)/2)+'px';
                    (e2||e).style.left = ((eLayer.offsetWidth-eW)/2)+'px';
                }
            }
            function PosSZ(e,e2){
                e.style.width = (iW*nZM) + 'px';
                e.style.height = (iH*nZM) + 'px';
                eCenter(e,e2);
            }
            function iWH(ST){
                var mW=(($mBrowser)?window.innerWidth:eLayer.offsetWidth)||0;
                var mH=(($mBrowser)?window.innerHeight:eLayer.offsetHeight)||0;
                if(ST==0&&TYP=='image'){
                    oW=iElm.clientWidth;
                    oH=iElm.clientHeight;
                }
                if(ST==0&&TYP=='iframe'){
                    oW=mW;
                    oH=mH;
                }
                if(TYP=='html'){
                    oW=fHTML.offsetWidth;
                    oH=fHTML.offsetHeight;
                    iElm.style.width=Math.min(oW,mW*iMP)+'px';
                    iElm.style.height=Math.min(oH,mH*iMP)+'px';
                    iW=(parseInt(iElm.style.width)||0)+Math.min(oW,mW*iMP)-iElm.clientWidth;
                    iH=(parseInt(iElm.style.height)||0)+Math.min(oH,mH*iMP)-iElm.clientHeight;
                }
                if(TYP!='html'){
                    if( ((oW > mW * iMP)||(oH > mH * iMP))  &&  oW/mW <= oH/mH ){
                        r = mH / oH;
                        iW = oW * r * iMP;
                        iH = oH * r * iMP;
                    } else if( ((oW > mW * iMP)||(oH > mH * iMP))  &&  oW/mW >= oH/mH ){
                        r = mW / oW;
                        iW = oW * r * iMP;
                        iH = oH * r * iMP;
                    } else {
                        iW = oW||iW||0;
                        iH = oH||iH||0;
                    }
                }
            }

            addLoad($db,ldgSY,ldgSZ,($mBrowser)?'absolute':'fixed');
            eCenter(eLoading);

            iCtnr = $d.createElement('div');
            iCtnr.style.zIndex=bzidx+1;

            if(TYP=='image'){
                iElm = $d.createElement('img');
                iElm.style.cssText=oIMG_SY;
            }
            if(TYP=='iframe'){
                iElm = $d.createElement('iframe');
                iElm.style.cssText=oIFR_SY;
            }
            if(TYP=='image'||TYP=='iframe'){
                iCtnr.style.display='none';
                $db.appendChild(iCtnr);
                iCtnr.appendChild(iElm);
                setmyevent(iElm,'load',function(){
                    closeLoad();
                    iCtnr.style.display='block';

                    if(TYP=='image'){
                        iWH(0);
                        PosSZ(iElm,iCtnr);
                        function runDelta(e){
                            var mwVal=0,EVT=e||event||window.event,dv=200/(iW+iH);
                            mwVal = EVT.detail?EVT.detail/(-3):EVT.wheelDelta/120;
                            if(EVT.preventDefault){EVT.preventDefault();}else{EVT.returnValue=false;}
                            if(mwVal>0){ nZM-=dv, nZM=Math.max(0.2,nZM); }
                            if(mwVal<0){ nZM+=dv; }
                            if(nZM==1){sZM=0;}else{sZM=1;}
                            PosSZ(iElm,iCtnr);
                        }
                        setmyevent(iElm,'mousewheel',runDelta,false);
                        setmyevent(iElm,'DOMMouseScroll',runDelta,false);
                        iElm.onclick=function(){
                            if(sZM==0){
                                nZM=1; iW=oW; iH=oH;  PosSZ(iElm,iCtnr); sZM=1;
                            } else if(sZM==1){
                                nZM=1; iWH();  PosSZ(iElm,iCtnr); sZM=0;
                            }
                        }
                    }
                    if(TYP=='iframe'){
                        iWH(0);
                        PosSZ(iElm,iCtnr);
                        iElm.frameborder='0';
                        iElm.scrolling='auto';
                    }
                });
                setmyevent(iElm,'error',function(){
                    closeLoad();
                    iElm.parentNode.removeChild(iElm);
                    var tCSS;
                    if(opts.open_error_style){ tCSS=''; } else { tCSS='padding:20px;' }
                    iElm = $d.createElement('div');
                    iElm.innerHTML=oERR_TX;
                    iElm.style.cssText=oERR_SY+tCSS;
                    iCtnr.style.display='block';
                    iCtnr.appendChild(iElm);
                    iCtnr.style.position=( $mBrowser )?'absolute':'fixed';
                    iCtnr.style.top =  ((eLayer.offsetHeight-iElm.offsetHeight)/2)+'px';
                    iCtnr.style.left = ((eLayer.offsetWidth-iElm.offsetWidth)/2)+'px';
                });
                iElm.src=iSRC;
            }
            if(TYP=='html'){
                closeLoad();
                fHTML = $d.createElement('div');
                fHTML.innerHTML=iSRC;
                fHTML.style.position='relative';
                $db.appendChild(fHTML);
                iElm = $d.createElement('div');
                iElm.style.cssText=oHTL_SY+';margin:20px;';
                iElm.style.overflow='auto';
                iElm.appendChild(fHTML);
                $db.appendChild(iCtnr);
                iCtnr.appendChild(iElm);
                iWH(0);
                PosSZ(iElm,iCtnr);
            }
            iCtnr.style.position=( $mBrowser )?'absolute':'fixed';
            if(!( $mBrowser )){
                setmyevent(window,'scroll',function(){if(thisExist===true){ window.scrollTo(winX,winY);}});
            }
            setmyevent(window,'resize',function(){if(thisExist===true){
                nZM=1;iWH();PosSZ(iElm,iCtnr);
            }});
            setmyevent($d,'keydown',function(e){
                if(thisExist===true){
                    e=e||event||window.event;
                    if(e.keyCode==27){ iClose(); thisExist=false; }
                }
            });
            if(lyr_CLO===true){
                eLayer.style.cursor='pointer';
                eLayer.onclick=function(e){
                    var EVT=e||event||window.event;
                    if(EVT.preventDefault){EVT.preventDefault()}else{EVT.returnValue=false};
                    EVT.stopPropagation();
                    iClose();
                    thisExist=false;
                    this.style.cursor='auto';
                }
            }
            if(lyr_CLO!==true){
                eLayer.onclick=function(){return false};
                if(lyr_CLO.indexOf('=image:::')!=-1){
                    xClose = $d.createElement('img');
                    xClose.src=lyr_CLO.split('=image:::')[1];
                    xClose.style.cssText=oc_SY||('position:absolute;top:-19px;right:-19px;width:48px;height:48px;cursor:pointer;z-index:'+(bzidx+40)+';');
                    iCtnr.appendChild(xClose);
                } else {
                    xClose = $d.createElement('div');
                    var xClsPos = ( $mBrowser )?'left':'right';
                    var xClsSze = ( $mBrowser )?80:28;
                    xClose.style.cssText=oc_SY||('position:fixed;top:0px;'+xClsPos+':0px;padding:10px 24px;cursor:pointer;color:white;font-size:'+xClsSze+'px;font-family:arial black;z-index:'+(bzidx+40)+';');
                    xClose.innerHTML=lyr_CLO.toString();
                    xClose.onmouseover=function(){this.style.color='red'};
                    xClose.onmouseout=function(){this.style.color='white'};
                    $db.appendChild(xClose);
                }
                xClose.onclick=function(){
                    iClose();
                    thisExist=false;
                }

            }
        };
        iOpen(((opnSTY=='customhtml')?'html':opnSTY),(opnSTY=='customhtml')?srcAb:eval("tElm."+srcAb));
};
