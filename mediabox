  (function($){

    $.fn.sildeshow100fds = function(opts){

      //Plugin initial setting.
      var args = arguments;
      var func = args.callee;
      var userOpts = args[0];
      var opts = $.extend({},func.defaults,userOpts);

      var frW = opts.frame_width;
      var frH = opts.frame_height;
      var frB = opts.frame_background;
      var frD = opts.frame_border;
      var frP = opts.frame_padding;
      var frC = opts.frame_cursor;

      var cvP = opts.cover_image,cvP_L;
      if(!(cvP instanceof Array)&&cvP!==false&&cvP!=''){ cvP = cvP.split(','); cvP_L = cvP.length; }

      var cPP = opts.cover_image_position;
      if(!(cPP instanceof Array)){ cPP = cPP.split(','); }

      var cPZ = opts.cover_image_size;
      if(!(cPZ instanceof Array)){ cPZ = cPZ.split(','); }



      var eR = parseInt(opts.effect_row)||1;
      var eC = parseInt(opts.effect_column)||1;
      var eRC = eC*eR;

      var dt = parseInt(Math.abs(opts.delay))||1;
      var tt = parseInt(Math.abs(opts.runtime))||1;

      var eSY = opts.effect_style;
      if(!(eSY instanceof Array)){ eSY = eSY.split(','); }
      var eSY_L = eSY.length;
      for(var e_L=1;e_L<=eSY_L;e_L++){ eSY[e_L-1]=eSY[e_L-1].replace(/ /g,''); }

      var cpSY = opts.clickpager_effect_style.replace(/ /g,'')||'fadein';

      var iTX = opts.imagetext;
      if(!(iTX instanceof Array)){ iTX = iTX.split(','); }


      var i_asHTML = opts.imagelink_as_html;
      var iLK = opts.imagelink;
      if(!(iLK instanceof Array)){ iLK = iLK.split(','); }
      var iLK_L = iLK.length;

      var iTE = opts.imagetitle;
      if(!(iTE instanceof Array)){ iTE = iTE.split(','); }

      var pThL = opts.pager_thumbnail_link;
      if(!(pThL instanceof Array)){ pThL = pThL.split(','); }

      var exSY = opts.external_effect.replace(/ /g,'')||'fadein';
      var ecgt = opts.external_event_class_goto;
      if(!(ecgt instanceof Array)&&ecgt!==false){ ecgt = ecgt.split(','); var ecgt_L = ecgt.length; }


      var sTM = 'sliding-image';
      var iSQ = opts.image_sequence.replace(/ /g,'');

      var pg_CZ = opts.pages_centralizing;
      var pg_SY = opts.pager_style,pg_SY=(pg_SY===false||(i_asHTML===true&&pg_SY=='thumbnail'))?'none':pg_SY.replace(/ /g,'');
      var pg_CT = opts.pages_character;
      var pg_OL = opts.pages_jqcss;
      var pg_MO = opts.pages_mouseover_jqcss;
      var pg_AT = opts.pages_active_jqcss;
      var pg_dr = opts.pager_pattern;
      var pg_PO = opts.pager_position.replace(/ /g,'');
      var pg_Xp = pg_PO.split('-')[1]||'left';
      var pg_Yp = pg_PO.split('-')[0]||'bottom';
      var pg_BI = opts.pager_background_cover_image;
      var pg_BG = opts.pager_background;
      var pg_OP = opts.pager_background_opacity;

      var ib = opts.imagetext_box;
      var ib_PO = opts.imagetext_position.replace(/ /g,'');
      var ib_Xp = ib_PO.split('-')[1]||'right';
      var ib_Yp = ib_PO.split('-')[0]||'top';
      var ib_SZ = opts.imagetext_size;
      if(!(ib_SZ instanceof Array)){ ib_SZ = ib_SZ.split(','); }
      var ib_BI = opts.imagetext_background_cover_image;
      var ib_BG = opts.imagetext_background;
      var ib_OP = opts.imagetext_background_opacity;


      var ps_SY = opts.pager_scrolling_style;
      var pgsb_SP = Math.min(100,100-(Math.abs(parseInt(opts.pager_scrolling_speed))||1));
      var pgsb_SY = opts.pager_scroll_button_style.replace(/ /g,'');
      var pgsb_OL = opts.pager_scroll_button_jqcss;
      var pgsb_MO = opts.pager_scroll_button_mouseover_jqcss;

      var pgsb_CT = opts.pager_scroll_button_character;
      if(!(pgsb_CT instanceof Array)){ pgsb_CT = pgsb_CT.split(','); }
      var PREV = (pgsb_CT[0]===false||pgsb_CT[0]=='')?false:pgsb_CT[0]||'&#8598;';
      var NEXT = (pgsb_CT[1]===false||pgsb_CT[1]=='')?false:pgsb_CT[1]||'&#8600;';
      var ST_1 = (pgsb_CT[2]===false||pgsb_CT[2]=='')?false:pgsb_CT[2]||'&#8598;&#8598;';
      var END0 = (pgsb_CT[3]===false||pgsb_CT[3]=='')?false:pgsb_CT[3]||'&#8600;&#8600;';

      var pgsb_PO, pgsb_PO1, pgsb_PO2, pgsb_PO3, pgsb_PO4;
      var pgsb_MG, pgsb_MG1, pgsb_MG2, pgsb_MG3, pgsb_MG4;
      var pgsb_PD, pgsb_PD1, pgsb_PD2, pgsb_PD3, pgsb_PD4;
      var pgsb_BD, pgsb_BD1, pgsb_BD2, pgsb_BD3, pgsb_BD4;
      var pgsb_BG, pgsb_BG1, pgsb_BG2, pgsb_BG3, pgsb_BG4;
      function PGSB(s,sc,df){
        eval("pgsb_"+sc+" = opts.pager_scroll_button_"+s+";");
        eval("if(!(pgsb_"+sc+" instanceof Array)){ pgsb_"+sc+" = pgsb_"+sc+".split(','); }");
        eval("pgsb_"+sc+"1 =  pgsb_"+sc+"[0]||'"+df+"';");
        eval("pgsb_"+sc+"2 =  pgsb_"+sc+"[1]||pgsb_"+sc+"1||'"+df+"';");
        eval("pgsb_"+sc+"3 =  pgsb_"+sc+"[2]||pgsb_"+sc+"1||'"+df+"';");
        eval("pgsb_"+sc+"4 =  pgsb_"+sc+"[3]||pgsb_"+sc+"2||pgsb_"+sc+"1||'"+df+"';");
      }
      PGSB('position','PO','top-left');
      PGSB('margin','MG','0px');
      PGSB('padding','PD','0px');
      PGSB('border','BD','none');
      PGSB('background','BG','none');
      pgsb_PO1=pgsb_PO1.replace(/ /g,'');
      pgsb_PO2=pgsb_PO2.replace(/ /g,'');
      pgsb_PO3=pgsb_PO3.replace(/ /g,'');
      pgsb_PO4=pgsb_PO4.replace(/ /g,'');
      var pgsb_1Xp = pgsb_PO1.split('-')[0]||'top';
      var pgsb_1Yp = pgsb_PO1.split('-')[1]||'left';
      var pgsb_2Xp = pgsb_PO2.split('-')[0]||'top';
      var pgsb_2Yp = pgsb_PO2.split('-')[1]||'left';
      var pgsb_3Xp = pgsb_PO3.split('-')[0]||'top';
      var pgsb_3Yp = pgsb_PO3.split('-')[1]||'left';
      var pgsb_4Xp = pgsb_PO4.split('-')[0]||'top';
      var pgsb_4Yp = pgsb_PO4.split('-')[1]||'left';


      var cnpb = opts.control_nextprev;
      var cnpc = opts.control_nextprev_cycling;
      var cnpb_PO = opts.control_nextprev_position;
      if(!(cnpb_PO instanceof Array)){ cnpb_PO = cnpb_PO.split(','); }
      var cnpb_PO1 = cnpb_PO[0].replace(/ /g,'');
      var cnpb_PO2 = (cnpb_PO[1]||cnpb_PO[0]).replace(/ /g,'');
      var cnpb_1Xp = cnpb_PO1.split('-')[0]||'top';
      var cnpb_1Yp = cnpb_PO1.split('-')[1]||'left';
      var cnpb_2Xp = cnpb_PO2.split('-')[0]||'top';
      var cnpb_2Yp = cnpb_PO2.split('-')[1]||'right';

      var cnpb_MG = opts.control_nextprev_margin;
      if(!(cnpb_MG instanceof Array)){ cnpb_MG = cnpb_MG.split(','); }
      var cnpb_MG1 = cnpb_MG[0];
      var cnpb_MG2 = cnpb_MG[1]||cnpb_MG1;

      var cnpb_IM = opts.control_nextprev_image;
      if(!(cnpb_IM instanceof Array)){ cnpb_IM = cnpb_IM.split(','); }
      var cnpb_IM1 = cnpb_IM[0];
      var cnpb_IM2 = cnpb_IM[1]||cnpb_IM1;

      var cnpb_oSY = opts.control_nextprev_button_jqcss;
      var cnpb_mSY = opts.control_nextprev_button_mouseover_jqcss;

      var ce_PRV = opts.control_next_effect.replace(/ /g,'')||'scroll-right';
      var ce_NXT = opts.control_prev_effect.replace(/ /g,'')||'scroll-left';

      function dv(n){ return 'div:eq('+n+')'; }
      function nSI(VARS,oB){
        eval("if(i_asHTML===true&&"+VARS+".replace(/ /g,'')=='sliding-image'){ "+VARS+"=oB||''; }");
      }
      nSI('pg_BI');nSI('pg_BG',frB);
      nSI('ib_BI');nSI('ib_BG',frB);

      $(this).each(function(i){
        var $this = $(this);
        if($this.children(dv(0)).attr('id')!='activatedID::sildeshow100fds'){

          var rdm0=parseInt(1+(Math.random()*(iLK_L-0.0001)))||1,idx=parseInt(opts.first_image)||rdm0,oIDX=idx,iSY=0,eSY2,Timer,icheckAry=[];
          var rStatus=(iSQ=='return')?1:0;

          var dn = 'sildeshow100fds'+i+'_'+(new Date()).getTime()+'_';
          var SPC = dn+'_selectedpager';
          var HPC = dn+'_hoverpager';

          var $this_sildeshow100fds_ThumbnailCounter=0;
          var $d = document;
          var $n = 0, $s = 1;

          if($this.css('position') != 'absolute' && $this.css('position') != 'fixed' && $this.css('position') != 'relative'){ $this.css('position','relative'); }
          $this.html('<div id="activatedID::sildeshow100fds" style="background:'+frB+';border:'+frD+';padding:'+frP+';width:'+frW+';height:'+frH+';cursor:'+frC+';position:relative;"><p style="position:relative;overflow:hidden;margin:0px;width:'+frW+';height:'+frH+';white-space:nowrap;"></p></div>');
          var $frame = $this.children(dv(0));
          var $content = $frame.children('p:eq(0)');
          var thisW = $content.width();
          var thisH = $content.height();
          var oFrW = $frame.innerWidth();
          var oFrH = $frame.innerHeight();
          var sW = parseInt(thisW/eC);
          var sH = parseInt(thisH/eR);
          var TRL, TR0, TR1, CH0, CH2, PGWH, PGTL, PGMTL;
          var CoverFr = 'position:absolute;top:0px;left:0px;whiteSpace:nowrap;height:'+oFrH+'px;width:'+oFrW+'px;overflow:'+opts.frame_overflow+';';
          if(pg_dr == 'horizontal'){ TRL="<tr></tr>"; TR0=""; TR1=""; CH0="td"; CH1=""; CH2=".children('tr')"; PGWH='Width'; PGTL="Left"; PGBR="Right"; }
          if(pg_dr == 'vertical'){ TRL=""; TR0="</tr>"; TR1="<tr>"; CH0="tr"; CH1=".children('td')"; CH2=""; PGWH='Height'; PGTL="Top"; PGBR="Bottom"; }
          function PGL(aCSS){return ","+PGWH.toLowerCase()+":(oFr"+PGWH.substr(0,1)+"-(parseInt($PG.css('margin"+PGTL+"'))||0)-(parseInt($PG.css('margin"+PGBR+"'))||0)"+(aCSS||"")+")+'px'";}
          var PG_table = '<table border="0" cellpadding="0" cellspacing="0" style="position:relative"><tbody>'+TRL+'</tbody></table>';




          function plusPGS(t,e,v,l){
            if(t=='text'){ e.append(TR1+'<td><div>'+v+'</div></td>'+TR0); }
            if(t=='button'){ e.append(TR1+'<td><input type="reset" value=" '+v+' "></td>'+TR0); }
            if(t=='image'){ e.append(TR1+'<td><img src="'+v+'"></td>'+TR0); }
          }
          function checkTBnail(r){
            $this_sildeshow100fds_ThumbnailCounter+=1;
            if(r==1||$this_sildeshow100fds_ThumbnailCounter>=iLK_L){
              $PG_fr.show();
              if(pg_SY!='none'){ eval("$Pagers"+CH1+".children().css("+pg_OL+");"); }
              iTimer('1st',1); IMGS(1,0,1,1); setpager();
            }
          }
          function Pos(s,n,x,y){
            var v;
            function PW(XY){ return "-(parseInt("+n+".css('border'+"+XY+".substr(0,1).toUpperCase()+"+XY+".substr(1)+'Width'))||0)"; }
            if(s=='PG'&&pg_dr=='horizontal'){ v = ",left:("+PW(x)+"+(parseInt($PG.css('marginLeft'))||0)),"+pg_Yp+":(parseInt($PG.css('margin'+pg_Yp.substr(0,1).toUpperCase()+pg_Yp.substr(1)))||0)"+PW(y)+",height:$PG.outerHeight()+'px'"+PGL(); }
            if(s=='PG'&&pg_dr=='vertical'){ v = ","+pg_Xp+":(parseInt($PG.css('margin'+pg_Xp.substr(0,1).toUpperCase()+pg_Xp.substr(1)))||0)"+PW(x)+",top:("+PW(y)+"+(parseInt($PG.css('marginTop'))||0)),width:$PG.outerWidth()+'px'"+PGL(); }
            if(s=='IB'){ v = ","+ib_Xp+":(parseInt($IB0.css('margin'+ib_Xp.substr(0,1).toUpperCase()+ib_Xp.substr(1)))||0)"+PW(x)+","+ib_Yp+":(parseInt($IB0.css('margin'+ib_Yp.substr(0,1).toUpperCase()+ib_Yp.substr(1)))||0)"+PW(y)+",width:$IB0.outerWidth()+'px',height:$IB0.outerHeight()+'px'"; }
            return v||"";
          }
          function qNext(cIDX){
            var tIDX = cIDX||idx, tCT = $content.children();
            var thisCT = (i_asHTML===true)?'<div style="position:absolute;width:'+thisW+'px;height:'+thisH+'px;background:'+frB+';overflow:hidden;"><div style="width:'+thisW+'px;height:'+thisH+'px;overflow:hidden;">'+iLK[tIDX-1]+'</div></div>':'<img id="'+'1'+dn+(tIDX-1)+'" height="'+thisH+'" width="'+thisW+'" src="'+iLK[tIDX-1]+'" style="position:absolute;top:0px,left:0px;"/>';
            tCT.stop(true);
            $content.attr('id','4'+dn+tIDX).append(thisCT);
            tCT.remove()
          }


          function hoverCSS(buttons,origin_jqcss,over_jqcss,click_jqcss,TYP){
            eval("buttons"+((TYP=='NPB')?'':CH1)+".children().css('cursor','pointer');");
            buttons.unbind('hover').hover(function(){
              $(this).addClass(HPC);
              if(TYP=='pgs'){
                $(this).unbind('click').click(function(){
                  if(TYP=='pgs'){ clearTimeout(Timer); Timer=null; $s=2; }
                  if(idx!=$(this).index()+1 || TYP!='pgs'){
                    eval("buttons"+CH1+".children().css("+origin_jqcss+"); $(this).addClass(SPC)"+CH1+".children().css("+click_jqcss+");");
                    if(TYP=='pgs'){ qNext(); idx=$(this).index()+1; iTimer(TYP,0,0); }
                  } else if(TYP=='pgs'){ iTimer(TYP); }
                });
              }
              if(idx != $(this).index()+1 || TYP!='pgs'){  eval("$(this)"+((TYP=='NPB')?'':CH1)+".children().css("+over_jqcss+");");  }

            },function(){
              $(this).removeClass(HPC);
              if(idx != $(this).index()+1 || TYP!='pgs'){
                if( $(this).hasClass(SPC) && TYP!='pgs'){
                  buttons.removeClass(SPC);
                  eval("$(this).addClass(SPC)"+((TYP=='NPB')?'':CH1)+".children().css("+click_jqcss+");");
                } else {
                  eval("$(this)"+CH1+".children().css("+origin_jqcss+");");
                }
              }
            });
          }


          qNext();
          if(i_asHTML===true){ icheckAry[idx-1]=0; }else{ $d.getElementById('1'+dn+(idx-1)).onload = function(){ icheckAry[idx-1]=0; }; }
          $frame.prepend('<div style="'+CoverFr+'z-index:9960;"><div style="'+CoverFr+'display:none;z-index:9970;"><div></div><div></div><div></div><div></div><div></div><div><div>'+PG_table+'</div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>');
          if(cvP!==false&&cvP!=''){
            for(var nP=1;nP<=cvP_L;nP++){
              eval("var cPP_"+nP+" = cPP[nP-1]||'';");
              eval("var cPZ_"+nP+" = cPZ[nP-1]||'';");
              eval("var cPP_"+nP+"_0 = cPP_"+nP+".split('-')[0]||'';");
              eval("var cPP_"+nP+"_1 = cPP_"+nP+".split('-')[1]||'';");
              eval("var cPZ_"+nP+"_0 = cPZ_"+nP+".split('-')[0]||'';");
              eval("var cPZ_"+nP+"_1 = cPZ_"+nP+".split('-')[1]||'';");
              if(cvP[nP-1].replace(/ /g,'')!=''){
                $frame.prepend('<img width="'+(parseInt(eval("cPZ_"+nP+"_0"))||thisW)+'" height="'+(parseInt(eval("cPZ_"+nP+"_1"))||thisH)+'" src="'+cvP[nP-1]+'" style="position:absolute;'+((eval("cPP_"+nP+"_0").indexOf('bottom')>=0)?'bottom':'top')+':0px;'+((eval("cPP_"+nP+"_1").indexOf('right')>=0)?'right':'left')+':0px;z-index:9940"/>');
              }
            }
          }



          var $PG_fr = $frame.children(dv(0)).children(dv(0));
          var $PG = $PG_fr.children(dv(5));
          var $PGc1 = $PG_fr.children(dv(6));
          var $PGc2 = $PG_fr.children(dv(7));
          var $PGc3 = $PG_fr.children(dv(8));
          var $PGc4 = $PG_fr.children(dv(9));
          var $PGd = $PG.children(dv(0));
          var $PGT = $PGd.children('table:eq(0)');
          var $PGo1 = $PG_fr.children(dv(3));
          var $PGo2 = $PG_fr.children(dv(4));
          eval("var $PGi = $PGT.children('tbody')"+CH2+";");
          var $IB1 = $PG_fr.children(dv(0));
          var $IB2 = $PG_fr.children(dv(1));
          var $IB0 = $PG_fr.children(dv(2));
          var $conPrv = $PG_fr.children(dv(10));
          var $conNxt = $PG_fr.children(dv(11));


          function dpBTN(){
            if(cnpb===true&&((cnpc!==true&&cnpc===false)||(cnpc=='auto'&&iSQ=='return'))){
              if(idx==1){ $conPrv.hide(); } else if(idx==iLK_L){ $conNxt.hide(); } else { $conPrv.show(); $conNxt.show(); }
            }
          }

          if(ib === true){
            eval("$IB0.css({position:'absolute',"+ib_Xp+":'0px',"+ib_Yp+":'0px',width:ib_SZ[0],height:ib_SZ[1],margin:opts.imagetext_margin,padding:opts.imagetext_padding,overflow:'hidden'});");
            $IB1.css('border',opts.imagetext_background_border);
            $IB2.css('border',opts.imagetext_topborder);
          }
          if(pg_SY != 'none'){
            if(pg_SY=='thumbnail'){var tnW=thisW/10,tnH=thisH/10;}
            eval("$PG.css({position:'absolute',borderStyle:'solid',borderColor:(opts.pager_frame_paddingcolor||'transparent'),borderWidth:(opts.pager_frame_padding||'0px'),"+pg_Xp+":'0px',"+pg_Yp+":'0px',margin:opts.pager_margin,padding:opts.pager_inner_padding,zIndex:9980}).css({overflow:'hidden'"+PGL("-(parseInt($PG.css('border"+PGTL+"Width'))||0)-(parseInt($PG.css('border"+PGBR+"Width'))||0)")+"});");
            if(pg_CT!='number'){ var pg_CT2 = pg_CT; }
            for(var iPG = 1; iPG<= iLK_L; iPG++){
              if(pg_SY=='text'||pg_SY=='button'){ plusPGS(pg_SY,$PGi,(pg_CT2||iPG)); }
              if(pg_SY=='thumbnail'){

                $PGi.append(TR1+'<td><img id="'+'2'+dn+(iPG-1)+'" height="'+tnH+'" width="'+tnW+'" src="'+(pThL[iPG-1]||iLK[iPG-1])+'"/></td>'+TR0);
                if(icheckAry[iPG-1]!=0){

                  $d.getElementById('2'+dn+(iPG-1)).onload = (function(iPG2){
                    return function(){ checkTBnail(); }
                  })(iPG);

                  $d.getElementById('2'+dn+(iPG-1)).onerror = (function(iPG2){
                    return function(){
                      var thisP = $(this).parent(); $(this).remove();
                      thisP.append('<div style="height:'+tnH+'px;width:'+tnW+'px;"><div style="height:100%;width:100%;color:red;background-color:black;font-family:arial black;overflow:hidden;"><span style="padding:5px">X</span></div></div>');
                      eval("thisP.children('div').css('cursor','pointer').css("+pg_OL+");");
                      checkTBnail();
                    }
                  })(iPG);
                }
              }
            }
            var $Pagers = $PGi.children(CH0);
            $Pagers.each(function(i){ $(this).attr('title',(iTE[i]||'')); });
            hoverCSS($Pagers,pg_OL,pg_MO,pg_AT,'pgs');
            $PGo1.css('border',opts.pager_background_border);
            $PGo2.css('border',opts.pager_topborder);
          }



          var s_cs = 'slidein-columnsturn';
          var s_rt = 'slidein-rowsturn';
          var s_cud = 'slidein-cells-updown';
          var s_clr = 'slidein-cells-leftright';
          var f_lr = 'fadein-leftright';
          var f_ud = 'fadein-updown';
          var f_tdl = 'fadein-cells-todownleft';
          var f_ttr = 'fadein-cells-totopright';
          var f_ttl = 'fadein-cells-totopleft';
          var f_tdr = 'fadein-cells-todownright';
          var s_cv = 'slidein-cells-vertical';
          var s_ch = 'slidein-cells-horizontal';
          var s_cal = 'slidein-cells-accumulative-left';
          var s_car = 'slidein-cells-accumulative-right';
          var s_cvl = 'slidein-cells-vertical-left';
          var s_cvr = 'slidein-cells-vertical-right';
          var s_cau = 'slidein-cells-accumulative-up';
          var s_cad = 'slidein-cells-accumulative-down';
          var s_chu = 'slidein-cells-horizontal-up';
          var s_chd = 'slidein-cells-horizontal-down';
          var $random_cellstyles = [s_cs,s_rt,s_cud,s_clr,f_lr,f_ud,f_tdl,f_ttr,f_ttl,f_tdr,s_cv,s_ch,s_cal,s_car,s_cvl,s_cvr,s_cau,s_cad,s_chu,s_chd];


          var f_sd = 'fadein-sildedown';
          var f_su = 'fadein-sildeup';
          var s_cbr = 'slidein-combiningrows';
          var s_rwp = 'slidein-rowsup';
          var s_rwd = 'slidein-rowsdown';
          var f_rwn = 'fadein-rowsdown';
          var f_rwu = 'fadein-rowsup';
          var s_hb = 'slidein-horizontal-both';
          var s_db = 'slidein-downboth';
          var s_ub = 'slidein-upboth';
          var s_dl = 'slidein-downleft';
          var s_dr = 'slidein-downright';
          var s_ul = 'slidein-upleft';
          var s_ur = 'slidein-upright';
          var f_ri = 'fadein-rows-inward';
          var f_ro = 'fadein-rows-outward';
          var $random_rowstyles = [f_sd,f_su,s_cbr,s_rwp,s_rwd,f_rwn,f_rwu,s_hb,s_db,s_ub,s_dl,s_dr,s_ul,s_ur,f_ri,f_ro];


          var f_sl = 'fadein-sildeleft';
          var f_sr = 'fadein-silderight';
          var s_cbc = 'slidein-combiningcolumns';
          var s_cnl = 'slidein-columnsleft';
          var s_cnr = 'slidein-columnsright';
          var f_cnr = 'fadein-columnsright';
          var f_cnl = 'fadein-columnsleft';
          var s_vb = 'slidein-vertical-both';
          var s_rb = 'slidein-rightboth';
          var s_lb = 'slidein-leftboth';
          var s_rd = 'slidein-rightdown';
          var s_ru = 'slidein-rightup';
          var s_ld = 'slidein-leftdown';
          var s_lu = 'slidein-leftup';
          var f_ci = 'fadein-columns-inward';
          var f_co = 'fadein-columns-outward';
          var $random_columnstyles = [f_sl,f_sr,s_cbc,s_cnl,s_cnr,f_cnr,f_cnl,s_vb,s_rb,s_lb,s_rd,s_ru,s_ld,s_lu,f_ci,f_co];



          var b_zmo = 'blinkin-cells-zoomout';
          var b_rdm = 'blinkin-cells-random';
          var b_lrd = 'blinkin-lines-rightdown';
          var b_llu = 'blinkin-lines-leftup';
          var b_iw = 'blinkin-inward';
          var b_ow = 'blinkin-outward';
          var $random_blinkstyles = [b_zmo,b_rdm,b_lrd,b_llu,b_iw,b_ow];

          var s_rdm = 'slidein-cells-random';
          var f_rdm = 'fadein-cells-random';
          var f_lrd = 'fadein-lines-rightdown';
          var f_llu = 'fadein-lines-leftup';
          var f_iw = 'fadein-inward';
          var f_ow = 'fadein-outward';
          var $random_linestyles = [s_rdm,f_rdm,f_lrd,f_llu,f_iw,f_ow];


          var f_i = 'fadein';
          var sr_u = 'scroll-up';
          var sr_l = 'scroll-left';
          var sr_d = 'scroll-down';
          var sr_r = 'scroll-right';
          var s_u = 'slide-up';
          var s_l = 'slide-left';
          var s_d = 'slide-down';
          var s_r = 'slide-right';
          var sf_u = 'slidefade-up';
          var sf_l = 'slidefade-left';
          var sf_d = 'slidefade-down';
          var sf_r = 'slidefade-right';
          var h_f = 'flipout-horizontal';
          var v_f = 'flipout-vertical';
          var fp_u = 'flip-up';
          var fp_l = 'flip-left';
          var fp_d = 'flip-down';
          var fp_r = 'flip-right';
          var fs_u = 'flipscroll-up';
          var fs_l = 'flipscroll-left';
          var fs_d = 'flipscroll-down';
          var fs_r = 'flipscroll-right';
          var z_o = 'zoomout';
          var z_i = 'zoomin';
          var h_2f = 'flipin-horizontal';
          var v_2f = 'flipin-vertical';
          var $random_oneimagestyles = [f_i,sr_u,sr_l,sr_d,sr_r,s_u,s_l,s_d,s_r,sf_u,sf_l,sf_d,sf_r,h_f,v_f,fp_u,fp_l,fp_d,fp_r,fs_u,fs_l,fs_d,fs_r,z_o,z_i,h_2f,v_2f];

          var f_zo = 'fade-zoom-out';
          var f_oi = 'fade-out-in';
          var twf = 'timer-without-effect';
          var noe = 'effect-off';

          var $random_allstyles = $random_cellstyles.concat($random_rowstyles).concat($random_columnstyles).concat($random_linestyles).concat($random_oneimagestyles).concat($random_blinkstyles);
          var $random_columnrowstyles = $random_rowstyles.concat($random_columnstyles);
          var $random_linecellstyles = $random_cellstyles.concat($random_linestyles);


          var rsrv = 'return-scroll-vertical';
          var rsrh = 'return-scroll-horizontal';
          var rslv = 'return-slide-vertical';
          var rslh = 'return-slide-horizontal';
          var rsfv = 'return-slidefade-vertical';
          var rsfh = 'return-slidefade-horizontal';
          var rfsv = 'return-flipscroll-vertical';
          var rfsh = 'return-flipscroll-horizontal';



          function iType(Type,Url,Drtn){

            if(Type.indexOf('d_')==-1){  var this_i = $('<img/>',{'src':Url,'width':thisW,'height':thisH});  } else {
              Drtn=Drtn||'';
              this_i =  $('<div/>',{'style':'position:absolute;overflow:hidden;'});
              this_i.append('<div style="position:absolute;width:'+((Drtn.indexOf('left')>=0||Drtn.indexOf('right')>=0)?'0px':((Drtn.indexOf('up')>=0||Drtn.indexOf('down')>=0)?'100%':'0px'))+';height:'+((Drtn.indexOf('up')>=0||Drtn.indexOf('down')>=0)?'0px':((Drtn.indexOf('left')>=0||Drtn.indexOf('right')>=0)?'100%':'0px'))+';overflow:hidden;"><img width="'+thisW+'" height="'+thisH+'" src="'+Url+'" style="position:relative"/></div>');

            }
            if(Type!='oneimage'){
              var iArray=[];


              var t_sh, t_sw;
              for(var iC = 1; iC <= eC; iC++){
                if(Type=='cells'){  iArray[iC-1] = [];  }
                t_sw=(iC==eC)?thisW:iC*sW;
                for(var iR = 1; iR <= eR; iR++){
                  t_sh=(iR==eR)?thisH:iR*sH; 

                  if(Type=='cells'){  iArray[iC-1][iR-1] = this_i.clone().css({position:'absolute',clip:'rect('+((iR-1)*sH)+'px '+(t_sw)+'px '+(t_sh)+'px '+((iC-1)*sW)+'px)'});  }
                  if(Type=='d_cells'){  iArray[iC-1][iR-1] = this_i.clone().children('div').children('img').css({top:((iR-1)*sH*-1)+'px',left:((iC-1)*sW*-1)+'px'}).parent().parent().css({top:((iR-1)*sH)+'px',left:((iC-1)*sW)+'px',width:(t_sw-((iC-1)*sW))+'px',height:(t_sh-((iR-1)*sH))+'px'});  }


                  if(Type=='lines'){  iArray[((iC-1)*eR)+iR-1] = this_i.clone().css({position:'absolute',clip:'rect('+((iR-1)*sH)+'px '+(t_sw)+'px '+(t_sh)+'px '+((iC-1)*sW)+'px)'});  }
                  if(Type=='d_lines'){
                      iArray[((iC-1)*eR)+iR-1] = this_i.clone().children('div').children('img').css({top:((iR-1)*sH*-1)+'px',left:((iC-1)*sW*-1)+'px',width:thisW+'px',height:thisH+'px',maxWidth:'none',maxHeight:'none'}).parent().parent().css({top:((iR-1)*sH)+'px',left:((iC-1)*sW)+'px',width:(t_sw-((iC-1)*sW))+'px',height:(t_sh-((iR-1)*sH))+'px'});
                  }

                  
                  if(iC==1 && Type=='rows'){  iArray[iR-1] = this_i.clone().css({position:'absolute',clip:'rect('+((iR-1)*sH)+'px '+(thisW)+'px '+(t_sh)+'px 0px)'});  }
                  if(Type=='d_rows'){  iArray[iR-1] = this_i.clone().children('div').children('img').css({top:((iR-1)*sH*-1)+'px',left:'0px'}).parent().parent().css({top:((iR-1)*sH)+'px',left:'0px',width:thisW+'px',height:(t_sh-((iR-1)*sH))+'px'});  }


                }
                if(Type=='columns'){  iArray[iC-1] = this_i.clone().css({position:'absolute',clip:'rect(0px '+(t_sw)+'px '+(thisH)+'px '+((iC-1)*sW)+'px)'});  }
                if(Type=='d_columns'){  iArray[iC-1] = this_i.clone().children('div').children('img').css({top:'0px',left:((iC-1)*sW*-1)+'px'}).parent().parent().css({top:'0px',left:((iC-1)*sW)+'px',width:(t_sw-((iC-1)*sW))+'px',height:thisH+'px'});  }

              }


              return iArray;

            } else { var iFull=[]; iFull[0]= this_i.clone().css({position:'absolute'}); return iFull; }

          }


          function aI(e,iK,e2){e.append('<img src="'+iK+'" width="'+e2.innerWidth()+'" height="'+e2.innerHeight()+'" style="position:absolute;top:0px;left:0px;"/>');}
          function CIMG(TYP,TYP_L,BI,o1a,o2a,o2b,Xp,Yp,CVR,FT,ST){
            var Pi = BI.replace(/ /g,'');
            if(ST==1){
              var oBG = (i_asHTML===true)?(frB||''):"opts."+TYP_L+"_topbackground";
              eval(CVR+".css('background',"+oBG+");");
              eval(o2b+".css({position:'absolute'"+Pos(TYP,o2b,Xp,Yp)+"});");
            }
            if((ST==1&&Pi!='')||Pi==sTM){
              var iK = (Pi==sTM)?iLK[idx-1]:BI;
              if(Pi!=sTM&&ST==1){aI(o2a,iK,o1a);}
              if(Pi==sTM){
                o2a.children('img').stop(true,true).animate({opacity:0},FT,function(){ $(this).remove(); });
                aI(o2a,iK,o1a);
                eval(o2b+".children('img:last').css('opacity',0).animate({opacity:opts."+TYP_L+"_background_cover_opacity},FT);");
              }
            }
          }

          function BIMG(TYP,BG,o1a,o1b,Xp,Yp,ST){
            var Pi = BG.replace(/ /g,'');
            if(ST==1){ eval(o1b+".css({position:'absolute',overflow:'hidden',opacity:"+TYP.toLowerCase()+"_OP"+Pos(TYP,o1b,Xp,Yp)+"});"); }
            if((ST==1&&Pi!='')||Pi==sTM){
              var b = (Pi==sTM)?'url('+iLK[idx-1]+') no-repeat scroll top left':BG;
              if(ST==1){ o1a.css({background:b}); }
              if(Pi==sTM&&ST==1){o1a.css('backgroundImage','none');}
              if(Pi==sTM){
                o1a.children('img').remove();
                aI(o1a,iLK[idx-1],o1a);
              }
            }
          }

          var $this_SCRcounter=0,nPD=0,PGS_oWH=0,PGi_WH=0,$CLKs=0,PG_SL=0;
          function SCR(dr,lengths){
            if($this_SCRcounter==0){
              eval("$PG.stop(true,true).animate({scroll"+dr+":($PG.scroll"+dr+"()+lengths)},pgsb_SP,'linear',function(){SCR(dr,lengths);});");
            }
          }
          function PD(TL,BR){
            eval("$PGd.css('padding"+PGTL+"',TL+'px');");
            if(BR){eval("$PGd.css('padding"+PGBR+"',BR+'px');");}
          }
          function iPG_WH(){ eval("var WH = $PG.inner"+PGWH+"();"); return WH; }
          function tPG_WH(){ eval("var WH = $PGT.children('tbody:eq(0)').children('tr:eq(0)').children('td:eq(0)').children().eq(0).outer"+PGWH+"(true);"); return WH; }
          function PGscroll(l,t){ eval("$PG.stop(true,true).animate({scroll"+PGTL+":"+l+"},"+(t||400)+");"); }



          var scrTimer;
          function tPN(nTYP,Elm,n,n2){

            function scrClk(){
              if($CLKs==0){
                $CLKs=1;
                eval("var scrPos=$PG.scroll"+PGTL+"();");
                clearTimeout(scrTimer);
                var scrWH = parseInt(PGi_WH/PGS_oWH)*PGS_oWH;
                var scrCHK = parseInt(scrPos)%scrWH;
                if(nTYP==1){PGscroll((parseInt(scrPos)-scrCHK+((scrCHK==0||n==4)?scrWH*n/4:0))||0);}
                if(nTYP==0){PGscroll(n2,400);}

                scrTimer = setTimeout(function(){ $CLKs=0; },400);
              }
            }
            function scrStop(){ if($CLKs==2){$this_SCRcounter=1;$PG.stop(true);Elm.click(scrClk);} }
            function scrTiming(){  $CLKs=2;  $this_SCRcounter=0; SCR(PGTL,n); Elm.unbind('click');  }
            if(nTYP==1){
              if(ps_SY.indexOf('slowgoing')>=0 && ps_SY.indexOf('page-jumping')>=0){
                Elm.click(scrClk).mousedown(function(){
                  $CLKs=0; clearTimeout(scrTimer);
                  scrTimer = setTimeout(scrTiming,280);
                }).mouseup(scrStop).mouseout(scrStop);
              }
              if((ps_SY.indexOf('slowgoing')>=0 && ps_SY.indexOf('page-jumping')==-1) || (ps_SY.indexOf('slowgoing')==-1 && ps_SY.indexOf('page-jumping')==-1)){
                Elm.mousedown(scrTiming).mouseup(scrStop).mouseout(scrStop);
              }
              if(ps_SY.indexOf('slowgoing')==-1 && ps_SY.indexOf('page-jumping')>=0){ Elm.click(scrClk); }
            }
            if(nTYP==0){
              if(ps_SY.indexOf('fastgoing')>=0 && ps_SY.indexOf('side-approaching')>=0){
                Elm.click(scrClk).mousedown(function(){
                  $CLKs=0; clearTimeout(scrTimer);
                  scrTimer = setTimeout(scrTiming,280);
                }).mouseup(scrStop).mouseout(scrStop);
              }
              if((ps_SY.indexOf('fastgoing')>=0 && ps_SY.indexOf('side-approaching')==-1) || (ps_SY.indexOf('fastgoing')==-1 && ps_SY.indexOf('side-approaching')==-1)){
                Elm.mousedown(scrTiming).mouseup(scrStop).mouseout(scrStop);
              }
              if(ps_SY.indexOf('fastgoing')==-1 && ps_SY.indexOf('side-approaching')>=0){ Elm.click(scrClk); }
            }
          }


          function conBTNS(Elm,eid,iLink,eTXT,x,y,m,i){
            iLink=iLink||'http://';
            eval("Elm.css({position:'absolute',"+y+":'0px',"+x+":'0px',margin:m,zIndex:i,cursor:'pointer'});");
            Elm.append('<img id="'+dn+eid+'" src="'+iLink+'"/>');
            function setSY(){
              eval("Elm.children().css("+cnpb_oSY+");");
              hoverCSS(Elm,cnpb_oSY,cnpb_mSY,'NPB');
            }
            $d.getElementById(dn+eid).onload = function(){ setSY() }
            $d.getElementById(dn+eid).onerror = function(){
              Elm.children().remove();
              Elm.append('<span>'+eTXT+'</span>');
              setSY();
            }
          }

          function IMGS(B1,C1,C2,T1){
            if(ib === true){
              BIMG('IB',ib_BG,$IB1,"$IB1",'ib_Xp','ib_Yp',B1);
              CIMG('IB','imagetext',ib_BI,$IB1,$IB2,"$IB2",'ib_Xp','ib_Yp','$IB0',C1,C2);
              $IB0.children('div').stop(true,true).remove();
              $IB0.append('<div>'+(iTX[idx-1]||'')+'</div>');
              var ib_fr = $IB0.children(dv(0));
              eval("ib_fr.css("+(opts.imagetext_jqcss||'{}')+").hide().fadeIn("+(T1||(tt/5))+");");
              if(opts.imagetext_title===true){ ib_fr.attr('title',ib_fr.text()); }
            }
            if(pg_SY != 'none'){
              if(C2==1){ $PGT.css({backgroundColor:opts.pager_innerframe_backgroundcolor,border:opts.pager_innerframe_border}); }
              BIMG('PG',pg_BG,$PGo1,"$PGo1",'pg_Xp','pg_Yp',B1);
              CIMG('PG','pager',pg_BI,$PGo1,$PGo2,"$PGo2",'pg_Xp','pg_Yp','$PG',C1,C2);
              if(C2==1){
                PGS_oWH = tPG_WH();
                eval("var PDTL = parseInt($PG.css('padding"+PGTL+"')||0);");
                eval("var PDBR = parseInt($PG.css('padding"+PGBR+"')||0);");
                eval("$PG.css({padding"+PGTL+":'0px',padding"+PGBR+":'0px'});");
                PGi_WH = iPG_WH();
                eval("var PGT_oWH = $PGT.outer"+PGWH+"();");
                eval("$PGd.css({"+PGWH.toLowerCase()+":PGT_oWH+'px',background:opts.pager_innerframe_bannerbackground});");
                nPD=Math.max(0,(PGi_WH/2)-(PGS_oWH/2));
                if(pg_CZ===true){PD(nPD,nPD);}else{PD(PDTL,PDBR);}
                if(pg_CZ!==true&&((pg_Xp=='right' && pg_dr=='horizontal')||(pg_Yp=='bottom' && pg_dr=='vertical'))){PD(PDTL+Math.max(0,PGi_WH-PGT_oWH-PDTL-PDBR));}
                if(pgsb_SY!='none'){
                  var SYup = pgsb_SY.toUpperCase();
                  eval("PG_SL = Math.max(0,$PGd.outer"+PGWH+"()-PGi_WH);");
                  function PGcSY(e,t,x,y,bd,bg,m,pd,i){
                    eval(e+".css({position:'absolute',"+y+":'0px',"+x+":'0px',overflow:'hidden',border:bd,background:bg,margin:m,padding:pd,zIndex:i}).append(PG_table);");
                    eval("var $PGcT = "+e+".children('table:eq(0)');");
                    eval("var $PGci = $PGcT.children('tbody')"+CH2+";");
                    plusPGS(pgsb_SY,$PGci,t);
                    var $Controls = $PGci.children(CH0).first(), $tC='$Controls'+CH1+'.children()';
                    hoverCSS($Controls,pgsb_OL,pgsb_MO,''); eval($tC+".css("+pgsb_OL+");");
                    if(t==PREV){ tPN(1,eval($tC),-4); }
                    if(t==NEXT){ tPN(1,eval($tC),4); }
                    if(t==ST_1){ tPN(0,eval($tC),-24,0); }
                    if(t==END0){ tPN(0,eval($tC),24,PG_SL); }
                  }
                  if((PREV!==false||NEXT!==false)&&(PREV!='none'||NEXT!='none')){
                    if(PREV!=''&&PG_SL>0){ PGcSY('$PGc1',PREV,pgsb_1Xp,pgsb_1Yp,pgsb_BD1,pgsb_BG1,pgsb_MG1,pgsb_PD1,9991); }
                    if(NEXT!=''&&PG_SL>0){ PGcSY('$PGc2',NEXT,pgsb_2Xp,pgsb_2Yp,pgsb_BD2,pgsb_BG2,pgsb_MG2,pgsb_PD2,9992); }
                  }
                  if((ST_1!==false||END0!==false)&&(ST_1!='none'||END0!='none')){
                    if(ST_1!=''&&PG_SL>0){ PGcSY('$PGc3',ST_1,pgsb_3Xp,pgsb_3Yp,pgsb_BD3,pgsb_BG3,pgsb_MG3,pgsb_PD3,9993); }
                    if(END0!=''&&PG_SL>0){ PGcSY('$PGc4',END0,pgsb_4Xp,pgsb_4Yp,pgsb_BD4,pgsb_BG4,pgsb_MG4,pgsb_PD4,9994); }
                  }
                }
                $PG.stop(true,true).scrollTop(0).scrollLeft(0);
              }
            }
            if(cnpb===true&&C2==1){
              conBTNS($conPrv,'controlbefore',cnpb_IM1,'&#9668;',cnpb_1Xp,cnpb_1Yp,cnpb_MG1,9995);
              conBTNS($conNxt,'controlafter',cnpb_IM2,'&#9658;',cnpb_2Xp,cnpb_2Yp,cnpb_MG2,9996);
              $conPrv.click(goEvent('PRV'));
              $conNxt.click(goEvent('NXT'));
            }
          }



          function LetsGo(SY,LK){
            dpBTN();
            var oa_f = {opacity:1,width:thisW,height:thisH,top:0,left:0}, oa_s = {opacity:1,top:0,left:0};
            var oContent = $content.children(), d_Val, d_Val2, t_CSS, FI_C , ary, aryT, aryL2, ZT, statusSY=0,Drtn=SY.split('=')[1];
            if(i_asHTML!==true){

              if(SY==s_cs||SY==s_rt||SY==s_cud||SY==s_clr||SY==f_lr||SY==f_ud||SY==f_tdl||SY==f_ttr||SY==f_ttl||SY==f_tdr||SY==s_cv||SY==s_ch||SY==s_cal||SY==s_car||SY==s_cvl||SY==s_cvr||SY==s_cau||SY==s_cad||SY==s_chu||SY==s_chd){ ary = iType('cells',LK); statusSY=1; }
              if(SY==f_ri||SY==f_ro||SY==f_sd||SY==f_su||SY==s_cbr||SY==s_rwp||SY==s_rwd||SY==f_rwn||SY==f_rwu||SY==s_hb||SY==s_db||SY==s_ub||SY==s_dl||SY==s_dr||SY==s_ul||SY==s_ur){ ary = iType('rows',LK); statusSY=1; }
              if(SY==f_ci||SY==f_co||SY==f_sl||SY==f_sr||SY==s_cbc||SY==s_cnl||SY==s_cnr||SY==f_cnr||SY==f_cnl||SY==s_vb||SY==s_rb||SY==s_lb||SY==s_rd||SY==s_ru||SY==s_ld||SY==s_lu){ ary = iType('columns',LK); statusSY=1; }
              if(SY==s_rdm||SY==f_iw||SY==f_ow||SY==f_rdm||SY==f_lrd||SY==f_llu){ ary = iType('lines',LK); statusSY=1; }
              if(SY==f_i||SY==twf||SY==noe||SY==f_zo||SY==f_oi||SY==sr_u||SY==sr_l||SY==sr_d||SY==sr_r||SY==s_u||SY==s_l||SY==s_d||SY==s_r||SY==sf_u||SY==sf_l||SY==sf_d||SY==sf_r||SY==h_f||SY==v_f||SY==fp_u||SY==fp_l||SY==fp_d||SY==fp_r||SY==fs_u||SY==fs_l||SY==fs_d||SY==fs_r||SY==z_o||SY==z_i||SY==rsrv||SY==rsrh||SY==rslv||SY==rslh||SY==rsfv||SY==rsfh||SY==rfsv||SY==rfsh||SY==h_2f||SY==v_2f){ ary = iType('oneimage',LK); statusSY=1; }



              if(SY==b_lrd||SY==b_llu||SY==b_rdm||SY==b_zmo||SY==b_iw||SY==b_ow){ ary = iType('d_lines',LK,Drtn); statusSY=1; }
              //'+((Drtn.indexOf('bottom')>=0)?'top':'bottom')+':0px;'+((Drtn.indexOf('left')>=0)?'right':'left')+':0px;



              if(statusSY==0){ ary = iType('oneimage',LK); SY='fadein'; }

            }else{
              ary = [$('<div style="position:absolute;width:'+thisW+'px;height:'+thisH+'px;background:'+frB+';overflow:hidden;"><div style="width:'+thisW+'px;height:'+thisH+'px;overflow:hidden;">'+LK+'</div></div>')];
              if(SY!=f_i&&SY!=twf&&SY!=noe&&SY!=f_zo&&SY!=f_oi&&SY!=sr_u&&SY!=sr_l&&SY!=sr_d&&SY!=sr_r&&SY!=s_u&&SY!=s_l&&SY!=s_d&&SY!=s_r&&SY!=sf_u&&SY!=sf_l&&SY!=sf_d&&SY!=sf_r&&SY!=h_f&&SY!=v_f&&SY!=fp_u&&SY!=fp_l&&SY!=fp_d&&SY!=fp_r&&SY!=fs_u&&SY!=fs_l&&SY!=fs_d&&SY!=fs_r&&SY!=z_o&&SY!=rsrv&&SY!=rsrh&&SY!=rslv&&SY!=rslh&&SY!=rsfv&&SY!=rsfh&&SY!=rfsv&&SY!=rfsh&&SY!=h_2f&&SY!=v_2f){
                SY='fadein';
              }
            }





            var aryL = ary.length;
            $content.attr('id','4'+dn+idx);


            if(SY==s_cs||SY==s_rt||SY==s_cud||SY==s_clr||SY==f_lr||SY==f_ud){
              for(var iLG = 1; iLG <= aryL; iLG++){
                var aryL2 = ary[iLG-1].length;
                for(var iLG2 = 1; iLG2 <= aryL2; iLG2++){
                  if(SY==s_cs){  if((iLG-1)%2 == 0){ aryT = tt/aryL*iLG; d_Val=1;  } else { aryT = tt/aryL*(aryL-iLG+1); d_Val=-1;  }  }
                  if(SY==s_rt){  if((iLG2-1)%2 == 0){ aryT = tt/aryL2*iLG2; d_Val=1; } else { aryT = tt/aryL2*(aryL2-iLG2+1); d_Val=-1; }  }
                  if(SY==s_cud||SY==f_ud){  if((iLG-1)%2 == 0){ aryT = tt/aryL2*iLG2; d_Val=1;  } else { aryT = tt/aryL2*(aryL2-iLG2+1); d_Val=-1;  }  }
                  if(SY==s_clr||SY==f_lr){  if((iLG2-1)%2 == 0){ aryT = tt/aryL*iLG; d_Val=1; } else { aryT = tt/aryL*(aryL-iLG+1); d_Val=-1; }  }
                  if(SY==s_clr||SY==s_rt){ t_CSS = ",left:(d_Val*thisW)+'px'"; } else if(SY==s_cud||SY==s_cs){ t_CSS = ",top:(d_Val*thisH)+'px'"; } else { t_CSS = ""; }
                  eval("ary[iLG-1][iLG2-1].clone().appendTo($content).css({opacity:0"+t_CSS+"}).animate(oa_s,aryT);");
                }
              }
            }


            if(SY==f_tdl||SY==f_ttr||SY==f_ttl||SY==f_tdr||SY==s_cv||SY==s_ch||SY==s_cal||SY==s_car||SY==s_cvl||SY==s_cvr||SY==s_cau||SY==s_cad||SY==s_chu||SY==s_chd){
              for(var iLG = 1; iLG <= aryL; iLG++){
                var aryL2 = ary[iLG-1].length;
                for(var iLG2 = 1; iLG2 <= aryL2; iLG2++){
                  if(SY==s_cal||SY==s_cvl){ aryT = tt/aryL*(aryL-iLG+1); } else if(SY==s_car||SY==s_cvr){ aryT = tt/aryL*iLG; } else if(SY==s_chu||SY==s_cau){ aryT = tt/aryL*(aryL-iLG2+1);  } else if(SY==s_chd||SY==s_cad){ aryT = tt/aryL*iLG2; } else if(SY==f_ttl){ aryT = tt/aryL*(aryL-iLG+1)/aryL2*(aryL2-iLG2+1); } else if(SY==f_tdr){ aryT = tt/aryL*iLG/aryL2*iLG2; } else if(SY==f_tdl){ aryT = tt/aryL*(aryL-iLG+1)/aryL2*iLG2; } else if(SY==f_ttr){ aryT = tt/aryL*iLG/aryL2*(aryL2-iLG2+1); } else { aryT = tt; }
                  d_Val=((iLG-1)%2 == 0)?(d_Val=((iLG2-1)%2 == 0)?-1:1):(d_Val=((iLG2-1)%2 == 0)?1:-1);
                  if(SY==s_cv||SY==s_cvl||SY==s_cvr||SY==s_cau||SY==s_cad){ t_CSS = ",top:(d_Val*thisH)+'px'"; }
                  if(SY==s_ch||SY==s_cal||SY==s_car||SY==s_chu||SY==s_chd){ t_CSS = ",left:(d_Val*thisW)+'px'"; }
                  if(SY==f_tdl||SY==f_ttr||SY==f_ttl||SY==f_tdr){ t_CSS = ""; }
                  eval("ary[iLG-1][iLG2-1].clone().appendTo($content).css({opacity:0"+t_CSS+"}).animate(oa_s,aryT);");
                }
              }
            }


            if(SY==f_sd||SY==f_su||SY==s_cbr||SY==s_rwp||SY==s_rwd||SY==f_rwn||SY==f_rwu||SY==s_hb||SY==s_db||SY==s_ub||SY==s_dl||SY==s_dr||SY==s_ul||SY==s_ur){
              if(SY==f_sd){ FI_C = '.delay(tt/aryL*(iLG-1)*0.8)'; } else if(SY==f_su){ FI_C = '.delay(tt/aryL*(aryL-iLG)*0.8)'; } else { FI_C = ''; }
              d_Val=(SY==s_rwd||SY==s_dl||SY==s_ul)?-1:1;
              for(var iLG = 1; iLG <= aryL; iLG++){
                if(SY==s_cbr||SY==s_hb){ aryT = tt; } else if(SY==f_rwn||SY==s_db||SY==s_dl||SY==s_dr||SY==s_rwp){ aryT = tt/aryL*iLG; } else if(SY==f_sd||SY==f_su){ aryT = (tt*(aryL-1)/aryL*0.2)+(tt/aryL); } else { aryT = tt/aryL*(aryL-iLG+1); }
                if(SY==s_cbr||SY==s_hb||SY==s_db||SY==s_ub){ d_Val=((iLG-1)%2 == 0)?-1:1; }
                if(SY==s_rwp||SY==s_rwd){ t_CSS = ",top:(d_Val*thisH)+'px'"; } else if(SY==f_rwn||SY==f_rwu||SY==f_sd||SY==f_su){ t_CSS = ""; } else if(SY==s_cbr){  t_CSS = ",top:(d_Val*thisH)+'px'"; } else { t_CSS = ",left:(d_Val*thisW)+'px'"; }
                eval("ary[iLG-1].clone().appendTo($content).css({opacity:0"+t_CSS+"})"+FI_C+".animate(oa_s,aryT);");
              }
            }


            if(SY==f_sl||SY==f_sr||SY==s_cbc||SY==s_cnl||SY==s_cnr||SY==f_cnr||SY==f_cnl||SY==s_vb||SY==s_rb||SY==s_lb||SY==s_rd||SY==s_ru||SY==s_ld||SY==s_lu){
              if(SY==f_sr){ FI_C = '.delay(tt/aryL*(iLG-1)*0.8)'; } else if(SY==f_sl){ FI_C = '.delay(tt/aryL*(aryL-iLG)*0.8)'; } else { FI_C = ''; }
              d_Val=(SY==s_cnr||SY==s_rd||SY==s_ld)?-1:1;
              for(var iLG = 1; iLG <= aryL; iLG++){
                if(SY==s_cbc||SY==s_vb){ aryT = tt; } else if(SY==f_cnr||SY==s_rb||SY==s_rd||SY==s_ru||SY==s_cnl){ aryT = tt/aryL*iLG; } else if(SY==f_sl||SY==f_sr){ aryT = (tt*(aryL-1)/aryL*0.2)+(tt/aryL); } else { aryT = tt/aryL*(aryL-iLG+1); }
                if(SY==s_cbc||SY==s_vb||SY==s_rb||SY==s_lb){ d_Val=((iLG-1)%2 == 0)?-1:1; }
                if(SY==s_cnl||SY==s_cnr){ t_CSS = ",left:(d_Val*thisW)+'px'"; } else if(SY==f_cnr||SY==f_cnl||SY==f_sl||SY==f_sr){ t_CSS = ""; } else if(SY==s_cbc){  t_CSS = ",left:(d_Val*thisW)+'px'"; } else { t_CSS = ",top:(d_Val*thisH)+'px'"; }
                eval("ary[iLG-1].clone().appendTo($content).css({opacity:0"+t_CSS+"})"+FI_C+".animate(oa_s,aryT);");
              }
            }


            if(SY==b_lrd||SY==b_llu||SY==b_rdm||SY==b_zmo||SY==s_rdm||SY==f_rdm||SY==f_lrd||SY==f_llu){
              if(SY==s_rdm){ d_Val2 = 10; t_CSS = ",top:(parseInt(Math.random()*thisH*2)*[1,-1][parseInt(Math.random()*1.9999)])+'px',left:(parseInt(Math.random()*thisW*2)*[1,-1][parseInt(Math.random()*1.9999)])+'px'"; } else { t_CSS = ""; }
              if(SY==f_rdm||SY.indexOf(b_rdm)==0){ d_Val2 = eRC; }
              for(var iLG = 1; iLG <= aryL; iLG++){
                if(	SY.indexOf(b_lrd)==0||SY==f_lrd){ aryT = tt/aryL*(iLG-1)*0.8; }
                if(	SY.indexOf(b_llu)==0||SY==f_llu){ aryT = tt/aryL*(aryL-iLG)*0.8; }
                if(SY==f_rdm||SY==s_rdm||SY.indexOf(b_rdm)==0){
                  d_Val = parseInt((Math.random()*(d_Val2-0.0001))+1);
                  aryT = (tt*0.8)-(tt*0.8/d_Val2*d_Val);
                  aryL2 = tt*0.2;
                } else if(SY.indexOf(b_zmo)==0){ aryT=0; aryL2=tt; } else { aryL2 = (tt*(aryL-1)/aryL*0.2)+(tt/aryL); }

                if(SY.indexOf(b_lrd)==0||SY.indexOf(b_llu)==0||SY.indexOf(b_rdm)==0||SY.indexOf(b_zmo)==0){
                  ary[iLG-1].clone().appendTo($content).children('div').css({opacity:0}).delay(aryT).show(0,function(){
                    $(this).animate({width:$(this).parent().width(),height:$(this).parent().height(),opacity:1},aryL2);
                  });
                } else {    eval("ary[iLG-1].clone().appendTo($content).css({opacity:0"+t_CSS+"}).delay(aryT).animate(oa_s,aryL2);");   }

              }
            }

            if(SY==b_iw||SY==b_ow){
              aryT = parseInt(eR/2);
              for(var iLG = 1; iLG <= aryL; iLG++){
                for(var r = 1; r <= aryT; r++){
                  d_Val=(SY==b_iw)?tt/aryT*(r-1)*0.4:((tt/aryT*(aryT-r)*0.4)||(tt/aryT/5));
                  if(iLG <= r*eR || iLG >= aryL-(r*eR)+1 || iLG == (parseInt(iLG/eR)*eR)+r || (iLG == (parseInt(iLG/eR)*eR) && r==1) || (iLG == (parseInt(iLG/eR)*eR)+eR-r+1 && r>1)){
                    
                    ary[iLG-1].clone().appendTo($content).children('div').css({opacity:0}).show(0,function(){
                      $(this).delay(d_Val).animate({width:$(this).parent().width(),height:$(this).parent().height(),opacity:1},(tt/aryT)+(tt/aryT*0.6));
                    });
                    
                  }
                }
                d_Val2=(SY==b_iw)?tt/aryT*(aryT-0.5)*0.4:0;
                if((iLG)%1 == 0){
                  
                  ary[iLG-1].clone().appendTo($content).children('div').css({opacity:0}).show(0,function(){
                    $(this).delay(d_Val2).animate({width:$(this).parent().width(),height:$(this).parent().height(),opacity:1},(tt/aryT*(aryT-0.5)*0.6)+(tt/aryT/2));
                  });
                  
                }
              }
            }
            

            if(SY==f_ci||SY==f_ri||SY==f_co||SY==f_ro){
              if(SY==f_ci||SY==f_co){ aryT=parseInt(eC/2); }
              if(SY==f_ri||SY==f_ro){ aryT=parseInt(eR/2); }
              for(var iLG = 1; iLG <= aryL; iLG++){
                var iPic = ary[iLG-1].clone();
                iPic.appendTo($content).css({opacity:0});
                for(var r = 1; r <= aryT; r++){
                  d_Val=(SY==f_ci||SY==f_ri)?tt/aryT*(r-1)/2:((tt/aryT*(aryT-r)/2)||(tt/aryT/5));
                  if(iLG <= r  ||  iLG >= aryL-r+1){ iPic.delay(d_Val).animate({opacity:1},(tt*(aryT-1)/aryT/2)+(tt/aryT)); }
                }
                d_Val2=(SY==f_ci||SY==f_ri)?tt/aryT*(aryT-0.5)/2:0;
                if((iLG)%1 == 0){ iPic.delay(d_Val2).animate({opacity:1},(tt*(aryT-0.5)/aryT/2)+(tt/aryT/2)); }
              }
            }


            if(SY==f_iw||SY==f_ow){
              aryT = parseInt(eR/2);
              for(var iLG = 1; iLG <= aryL; iLG++){
                var iPic = ary[iLG-1].clone();
                iPic.appendTo($content).css({opacity:0});
                for(var r = 1; r <= aryT; r++){
                  d_Val=(SY==f_iw)?tt/aryT*(r-1)*0.4:((tt/aryT*(aryT-r)*0.4)||(tt/aryT/5));
                  if(iLG <= r*eR || iLG >= aryL-(r*eR)+1 || iLG == (parseInt(iLG/eR)*eR)+r || (iLG == (parseInt(iLG/eR)*eR) && r==1) || (iLG == (parseInt(iLG/eR)*eR)+eR-r+1 && r>1)){
                    iPic.delay(d_Val).animate({opacity:1},(tt/aryT)+(tt/aryT*0.6));
                  }
                }
                d_Val2=(SY==f_iw)?tt/aryT*(aryT-0.5)*0.4:0;
                if((iLG)%1 == 0){ iPic.delay(d_Val2).animate({opacity:1},(tt/aryT*(aryT-0.5)*0.6)+(tt/aryT/2)); }
              }
            }

            if(SY==twf||SY==noe||SY==f_oi||SY==f_i||SY==z_o||SY==z_i||SY==h_f||SY==v_f||SY==sr_u||SY==sr_l||SY==sr_d||SY==sr_r||SY==s_u||SY==s_l||SY==s_d||SY==s_r||SY==sf_u||SY==sf_l||SY==sf_d||SY==sf_r||SY==rsrv||SY==rsrh||SY==rslv||SY==rslh||SY==rsfv||SY==rsfh||SY==rfsv||SY==rfsh||SY==fp_u||SY==fp_l||SY==fp_d||SY==fp_r||SY==fs_u||SY==fs_l||SY==fs_d||SY==fs_r){ t_CSS = ary[0].clone().appendTo($content); }
            if(SY==f_oi||SY==f_i){
              if(SY==f_oi){
                aryT=tt*0.4;
                aryL2='.delay('+aryT+')';
                oContent.animate({opacity:0},tt*0.5);
              }else{aryT=0;aryL2='';}
              eval("t_CSS.css({opacity:0})"+aryL2+".animate({opacity:1},tt-aryT);");
            }
            if(SY==z_o){ t_CSS.css({opacity:0,width:'1px',height:'1px',top:thisH/2+'px',left:thisW/2+'px'}).animate(oa_f,tt); }
            if(SY==z_i){ t_CSS.css({opacity:0,width:(thisW*2)+'px',height:(thisH*2)+'px',top:(thisH/-2)+'px',left:(thisW/-2)+'px'}).animate(oa_f,tt); }
            if(SY==h_f){ t_CSS.css({width:'1px',left:thisW/2+'px'}).animate(oa_f,tt); }
            if(SY==v_f){ t_CSS.css({height:'1px',top:thisH/2+'px'}).animate(oa_f,tt); }
            if(SY==noe||SY==twf){
              t_CSS.css(oa_s);
              if(SY==noe){ZT=1}
            }


            if(SY==sr_u||SY==sr_l||SY==sr_d||SY==sr_r||SY==s_u||SY==s_l||SY==s_d||SY==s_r||SY==sf_u||SY==sf_l||SY==sf_d||SY==sf_r||SY==fp_u||SY==fp_l||SY==fp_d||SY==fp_r||SY==fs_u||SY==fs_l||SY==fs_d||SY==fs_r){
              d_Val=(SY==sr_u||SY==sr_l||SY==s_u||SY==s_l||SY==sf_u||SY==sf_l||SY==fp_u||SY==fp_l||SY==fs_u||SY==fs_l)?1:((SY==fp_d||SY==fp_r||SY==fs_d||SY==fs_r)?0:-1);
              d_Val2=(SY==sr_u||SY==sr_d||SY==s_u||SY==s_d||SY==sf_u||SY==sf_d||SY==fp_u||SY==fp_d||SY==fs_u||SY==fs_d)?'top:(thisH*d_Val)':'left:(thisW*d_Val)';
              aryT=1;
              if(SY==fp_u||SY==fp_l||SY==fp_d||SY==fp_r||SY==fs_u||SY==fs_l||SY==fs_d||SY==fs_r){
                d_Val2=((SY==fp_u||SY==fp_d||SY==fs_u||SY==fs_d)?'height':'width')+':"0px",'+d_Val2;
                if(SY==fs_u||SY==fs_l||SY==fs_d||SY==fs_r){
                  aryL2=d_Val2.split(':')[0];
                  eval("oContent.animate({"+aryL2+":'0px',"+((SY==fs_u||SY==fs_d)?'top:':'left:')+((SY==fs_d)?thisH:((SY==fs_r)?thisW:0))+"},tt);");
                }
              } else if(SY==sr_u||SY==sr_l||SY==sr_d||SY==sr_r){
                aryL2=d_Val2.split(':')[0];
                eval("oContent.animate({"+aryL2+":(this"+((aryL2=='top')?'H':'W')+"*d_Val*-1)},tt);");
              } else { aryT=(SY==sf_u||SY==sf_l||SY==sf_d||SY==sf_r)?0:1; }
              eval("t_CSS.css({opacity:aryT,"+d_Val2+"+'px'}).animate(oa_f,tt);");
            }

            if(SY==rsrv||SY==rsrh||SY==rslv||SY==rslh||SY==rsfv||SY==rsfh||SY==rfsv||SY==rfsh){
              if(eSY_L==1){
                if(rStatus==1){ d_Val=1; }
                if(rStatus==2){ d_Val=(SY==rfsv||SY==rfsh)?0:-1; }
                aryT=(SY==rsfv||SY==rsfh)?0:1;
                if(SY==rsrv||SY==rslv||SY==rsfv||SY==rfsv){ d_Val2=((SY==rfsv)?'height:"0px",':'')+'top:((thisH*d_Val)'; aryL2='+thisH'; }
                if(SY==rsrh||SY==rslh||SY==rsfh||SY==rfsh){ d_Val2=((SY==rfsh)?'width:"0px",':'')+'left:((thisW*d_Val)'; aryL2='+thisW';}
                if(SY==rsrv||SY==rsrh||SY==rfsv||SY==rfsh){ eval("oContent.animate({"+d_Val2+(((SY==rfsv||SY==rfsh)&&rStatus==2)?aryL2:((SY==rfsv||SY==rfsh)?'*0':'*-1'))+")+'px'},tt);"); }
                if(rStatus==1||rStatus==2){  eval("t_CSS.css({opacity:aryT,"+d_Val2+")+'px'}).animate(oa_f,tt);");  }
              }
              if(eSY_L>1||rStatus==0){ t_CSS.css({opacity:0}).animate({opacity:1},tt); }
            }

            if(SY==f_zo){
              t_CSS = ary[0].clone().prependTo($content);
              t_CSS.css(oa_s);
              oContent.animate({opacity:0,width:(thisW*2),height:(thisH*2),top:(thisH/-2),left:(thisW/-2)},tt).hide(0);
            }
            if(SY==h_2f||SY==v_2f){
              t_CSS = [ary[0].clone().prependTo($content),ary[0].clone().appendTo($content)];
              aryT=(SY==v_2f)?['0px '+thisW+'px '+(thisH/2)+'px 0px',(thisH/2)+'px '+thisW+'px '+thisH+'px 0px']:['0px '+(thisW/2)+'px '+thisH+'px 0px','0px '+thisW+'px '+thisH+'px '+(thisW/2)+'px'];
              d_Val=(SY==v_2f)?'top':'left';
              d_Val2=(SY==v_2f)?'height':'width';
              aryL2=d_Val2.substr(0,1).toUpperCase();
              eval("t_CSS[0].css({opacity:1,"+d_Val2+":'0px',"+d_Val+":'0px',clip:'rect('+aryT[0]+')'}).animate(oa_f,tt);");
              eval("t_CSS[1].css({opacity:1,"+d_Val2+":(this"+aryL2+"/2)+'px',"+d_Val+":(this"+aryL2+"/2)+'px',clip:'rect('+aryT[1]+')'}).animate(oa_f,tt);");
              eval("oContent.animate({"+d_Val2+":0,"+d_Val+":this"+aryL2+"/2},tt).hide(0);");
            }


            setTimeout(function(){ oContent.stop().remove(); $s=1; },ZT||tt);
            IMGS('',ZT||tt,null,ZT);
            oIDX=idx;
          }
          function nSCR(n){
            return Math.max(0,(eval("parseInt($PGd.css('padding"+PGTL+"')||0);")+(PGS_oWH*n)-nPD));
          }
          function setpager(){
            if(pg_SY!='none'){
              eval("$Pagers.removeClass(SPC)"+CH1+".children().css("+pg_OL+"); $Pagers.eq(idx-1).addClass(SPC)"+CH1+".children().css("+pg_AT+");");
              $Pagers.each(function(i){  if($(this).hasClass(HPC) && !$(this).hasClass(SPC)){ eval("$(this)"+CH1+".children().css("+pg_MO+");"); }  });
              if(opts.pager_auto_scrolling===true){  PGscroll(nSCR(idx-1),dt/5);  }
            }
          }
          
          function iTimer(ACT,T_set,I_set){
            var T; if(T_set==0){T=0;}else if(T_set==1){T=dt;}else{ T=tt+dt; }
            if((opts.pager_browser===true && T_set==0) || (opts.pager_browser===false && $n==0) || (opts.pager_browser===false && T_set==0 && $n==1)){
              Timer = setTimeout(function(){ iRun(ACT,I_set); $s=2; },T);
            }
          }

          function eRun(){
            if(eSY[0]=='random_columnrowstyles'||eSY[0]=='random_linecellstyles'||eSY[0]=='random_allstyles'||eSY[0]=='random_blinkstyles'||eSY[0]=='random_linestyles'||eSY[0]=='random_rowstyles'||eSY[0]=='random_columnstyles'||eSY[0]=='random_cellstyles'||eSY[0]=='random_oneimagestyles'){
              eval("eSY2 = $"+eSY[0]+"; eSY_L=$"+eSY[0]+".length; ");
            } else if(eSY[0].indexOf('random::') == 0){
              eSY2 = eSY[0].split(':')[1].split('/');
              eSY_L = eSY2.length;
            } else {
              eSY2 = eSY;
              iSY=(iSY>=eSY_L)?1:iSY+1;
            }
            if(eSY[0].indexOf('random')==0){
              rdm0 = parseInt(1+(Math.random()*(eSY_L-0.0001)))||1;
              iSY=(iSY==rdm0)?(iSY=(iSY>=eSY_L)?1:iSY+1):rdm0;
            }
          }

          function iGo(ACT,status,iT){
            var sEvent;
            if(ACT=='pgs'){ sEvent = cpSY; }
            if(ACT=='EX-E'){ sEvent = exSY; }
            if(ACT=='NXT'){ sEvent = ce_NXT; }
            if(ACT=='PRV'){ sEvent = ce_PRV; }

            if(ACT!='pgs'&&ACT!='EX-E'&&ACT!='NXT'&&ACT!='PRV'){ qNext(oIDX); }

            if(status==1){ LetsGo((sEvent||eSY2[iSY-1]),iLK[idx-1]); }
            iTimer('run',iT);
            setpager();

          }
          function iRun(ACT,idx_set){

            if(((iSQ=='return'&&rStatus==1)||(iSQ=='forward'))&&idx_set!=0){
              idx=(idx>=iLK_L)?1:idx+1;
              if(iSQ=='return'&&rStatus==1&&idx==1){ rStatus=2; idx=iLK_L; }
            }
            if(((iSQ=='return'&&rStatus==2)||(iSQ=='reverse'))&&idx_set!=0){
              idx=(idx<=1)?iLK_L:idx-1;
              if(iSQ=='return'&&rStatus==2&&idx==iLK_L){ rStatus=1; idx=2; }
            }
            if(iSQ=='random'&&idx_set!=0){
              rdm0 = parseInt(1+(Math.random()*(iLK_L-0.0001)))||1;
              idx=(idx==rdm0)?(idx=(idx>=iLK_L)?1:idx+1):rdm0;
            }

            if($content.attr('id')=='4'+dn+idx){ eRun(); iGo(ACT,0,1); } else if(icheckAry[idx-1]==0){ eRun(); iGo(ACT,1); } else if(icheckAry[idx-1]==1){ iGo(ACT,0,0); } else {
              $content.append('<img id="'+'3'+dn+(idx-1)+'" height="'+thisH+'" width="'+thisW+'" src="'+iLK[idx-1]+'" style="position:absolute;top:0px,left:0px;display:none;z-index:-1"/>');
              $d.getElementById('3'+dn+(idx-1)).onerror = function(){ iGo(ACT,0,0); icheckAry[idx-1]=1; };
              $d.getElementById('3'+dn+(idx-1)).onload = function(){ eRun(); iGo(ACT,1); icheckAry[idx-1]=0; }
            }



          }
          function Hstop(ELMS){
            eval(ELMS+".mouseover(function(){ $n=1; clearTimeout(Timer); }).mouseout(function(){ $n=0; iTimer('restart',$s); });");
          }

          function goEvent(n){
            return function(){
              var i,ef='EX-E';
              if((cnpc!==true&&cnpc===false)||(cnpc=='auto'&&iSQ=='return')){
                if(n=='NXT'){ i=(idx>=iLK_L)?iLK_L:idx+1; ef=n; }
                if(n=='PRV'){ i=(idx<=1)?1:idx-1; ef=n; }
              }
              if((cnpc!==false&&cnpc===true)|(cnpc=='auto'&&iSQ!='return')){
                if(n=='NXT'){ i=(idx>=iLK_L)?1:idx+1; ef=n; }
                if(n=='PRV'){ i=(idx<=1)?iLK_L:idx-1; ef=n; }
              }
              clearTimeout(Timer); Timer=null; $s=2;
              var gt_i = i||parseInt(ecgt[n].split('-')[2])||1;
              if(idx!=gt_i){
                qNext(); idx=gt_i; iTimer(ef,0,0);
              } else { iTimer(ef); }
            }
          }
          if(ecgt){
            for(var n = 0; n < ecgt_L; n++){
              $('.'+(ecgt[n].split('-')[1]||'event_class')).bind(ecgt[n].split('-')[0]||'mouseover',goEvent(n));
            }
          }


          if(pg_SY!='thumbnail'){ checkTBnail(1); }
          if(opts.hover_stop === true){ Hstop("$frame"); }
          if(opts.pager_hover_stop === true){ Hstop("$PG"); }
          if(opts.pager_scroll_button_hover_stop === true){ Hstop("$PGc1"); Hstop("$PGc2"); Hstop("$PGc3"); Hstop("$PGc4"); }
          if(opts.context_menu === false){ $this.bind('contextmenu',function(){return false;}); }
          if(opts.prevent_selection === true){
            $this.mouseup(function(){
              var sg;
              if(document.selection && document.selection.empty){
                document.selection.empty();
              } else if(window.getSelection){
                sg=window.getSelection();
                if(sg && sg.removeAllRanges){ sg.removeAllRanges(); }
              }
            });
          }

          dpBTN();
        }
      });
    };


    $.fn.sildeshow100fds.defaults = {
      frame_width: '100%',
      frame_height: '100%',
      frame_background: 'black',
      frame_border: '6px solid white',
      frame_padding: '0px 0px 0px 0px',
      frame_cursor: 'auto',
      effect_row: 7,
      effect_column: 11,

      effect_style: 'blinkin-cells-random',    //random_allstyles  //'a,b,c,...'or['a','b','c',...]  //'random::a/b/c/...' can be applied for custom-random.
      clickpager_effect_style: 'random_allstyles',  //'' or false to set as none as original effect style.

      delay: 2000,
      runtime: 4000,
      first_image: 1,  //0=random
      image_sequence: 'return',  //'forward','reverse','random','return'.
      hover_stop: false,
      cover_image: false,  //false or '' as disabling. One or more image in string (separated by ',') or array are both available.
      cover_image_position: '',  //'x-y', default as 'top-left'.
      cover_image_size: '',  //'width-height', default as frame size.

      context_menu: false,
      prevent_selection: true,
      frame_overflow: 'hidden',  //'hidden'or'visible'.

      pager_browser: false,
      pager_style: 'thumbnail',  //false/none,text,button,thumbnail.
      pager_thumbnail_link: [],  //optional to link with mini size of image, no link here will cause loading an original image for thumbnail.

      pager_pattern: 'horizontal',  //'horizontal'or'vertical'.
      pager_position: 'bottom-left',  //'x-y'
      pager_inner_padding: '0px 3px',
      pager_frame_padding: '10px 70px 10px 70px',
      pager_frame_paddingcolor: '',
      pager_margin: '0px 0px 0px 0px',
      pager_background: 'black', //'sliding-image' or background-style, with no effect.
      pager_background_opacity: 0.5,
      pager_background_border: 'none',
      pager_background_cover_image: '', //'' as none, 'sliding-image', or linkage, with fade in effect.
      pager_background_cover_opacity: 0.5,
      pager_topborder: 'none',
      pager_topbackground:'transparent',
      pager_innerframe_backgroundcolor:'none',
      pager_innerframe_border:'none',
      pager_innerframe_bannerbackground:'none',
      pager_hover_stop: true,

      pages_character: '&#9679;',  //for style of button & text, and 'number' can set for auto-numbering, and html element can be applied for text style.
      pages_jqcss: "{border:'2px solid transparent',margin:'1px 3px'}",  //set the normal style of pagers css.
      pages_mouseover_jqcss: "{border:'2px dashed white'}",
      pages_active_jqcss: "{border:'2px solid yellow'}",

      pager_auto_scrolling: true,
      pages_centralizing: false,
      pager_scroll_button_hover_stop: true,
      pager_scroll_button_style: 'text',  //none,text,button,image.
      pager_scroll_button_character: [],  //'top,bottom,toppest,most-bottom'or'left,right,most-left,most-right',['top','bottom','toppest','moust-bottom']or['left','right','most-left','most-right'].  //for style of button & text, and 'number' can set for auto-numbering, and html element can be applied for text style. If image style, img-link is applied as this field. To disable button, the field can be applied '', 'none', or false.
      pager_scroll_button_position: 'bottom-left,bottom-right,bottom-left,bottom-right',  //'x1-y1,x2-y2,x3-y3,x4-y4', default no setting as 'top-left'.
      pager_scroll_button_margin: '0px 0px 37px 4px,0px 4px 37px 0px,4px,4px',  //'margin1,margin2,margin3,margin4', default no setting as '0px'.
      pager_scroll_button_padding: ['0px'],  //'padding1,padding2,padding3,padding4', default no setting as '0px'.
      pager_scroll_button_border: ['none'],  //'border1,border2,border3,border4', default no setting as 'none'.
      pager_scroll_button_background: ['none'],  //'background1,background2,background3,background4', default no setting as 'none'.
      pager_scroll_button_jqcss: "{width:'50px',padding:'6px 5px',background:'dimgray',textAlign:'center',opacity:0.5}",
      pager_scroll_button_mouseover_jqcss: "{background:'gray'}",
      pager_scrolling_speed: 80,  //0-100
      pager_scrolling_style:'slowgoing,fastgoing,page-jumping,side-approaching',  //'slowgoing,fastgoing,page-jumping,side-approaching'//default as at least one option of ('slowgoing' or 'page-jumping') and ('fastgoing' or 'side-approaching').

      control_nextprev: true,
      control_nextprev_cycling: 'auto',  //default as 'auto' (if slide sequence is 'return', no cycling, otherwise, can be cycling.), true as always cycling, and false as not allowed cycling.
      control_nextprev_position: '',
      control_nextprev_margin: '200px 0px',
      control_nextprev_image: '',  //'left.png,right.png', default as arrow text.
      control_nextprev_button_jqcss: "{color:'white',opacity:1}",
      control_nextprev_button_mouseover_jqcss: "{color:'yellow',opacity:0.8}",
      control_next_effect: 'scroll-right',  //'' or false to set as none as original effect style.
      control_prev_effect: 'scroll-left',  //'' or false to set as none as original effect style.

      external_event_class_goto: false,  //false as disable,'mouseover-class-1,mouseover-class-2,mouseover-class-3,...'or['mouseover-class-1','mouseover-class-2','mouseover-class-3',...]
      external_effect: 'zoomin',  //'' or false to set as none as original effect style.

      imagetext_box: true,
      imagetext_title: true,
      imagetext_position: 'top-right',  //'x-y'
      imagetext_padding: '10px',
      imagetext_margin: '20px 20px',
      imagetext_background: 'white', //'sliding-image' or background-style, with no effect.
      imagetext_background_opacity: 0.5,
      imagetext_background_border: '6px solid gray',
      imagetext_background_cover_image: 'sliding-image', //'' as none, 'sliding-image', or linkage, with fade in effect.
      imagetext_background_cover_opacity: 0.8,
      imagetext_topborder: 'none',
      imagetext_topbackground:'none',
      imagetext_size: ['120px','60px'], //'x,y'or['x','y']
      imagetext_jqcss: '{}',
      imagetext: [],  //'a,b,c,...'or['a','b','c',...]
      imagelink: [],      //default'a,b,c,...'or['a','b','c',...]
      imagetitle:[],
      imagelink_as_html: false  //imagelink will consider as HTML content, and slide effect will be only acceptable for One-Image Styles (except 'zoom-int').

    };

  })(jQuery);
  
  
/*Example............................

<div id="mediaboxtesting"></div>

<!-- Scripting -->
$('#mediaboxtesting').sildeshow100fds({
    frame_height:'500px',
    context_menu: true,
    cover_image_position: 'top-left,top-right',  //'x-y', default as 'top-left'.
    cover_image_size: '100-200,200-100',  //'width-height', default as frame size.
    pager_thumbnail_link: [,'https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'],
    imagelink:['https://i.pinimg.com/originals/52/c8/ef/52c8ef13fc8d7dfc8d66f52acae07638.jpg',
    'https://i.pinimg.com/originals/fb/d0/25/fbd025dabe5156bd5af920bfd75cbd9c.jpg',
    'https://i.pinimg.com/originals/77/f3/67/77f36728627cb99bcf2666feb8358994.jpg',
    'https://i.pinimg.com/originals/61/0e/ae/610eae4a8a16d77f4af819ad4da88485.jpg']
});
<!-- /Scripting -->
....................................*/
  
  
  
