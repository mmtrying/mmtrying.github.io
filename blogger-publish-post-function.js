//This is open source scripted by Martin Ma, who is personal project designer in Hong Kong.
//Martin Ma is an expert who have stidied blogger design for years.
//Respecting copyrights and design-effort, please don't delete this introduction when you use this script.
//Introduction Website: http://personalprojectdesigner.blogspot.com/
//Most Succeed Website: http://14161.blogspot.com/    <= Adult Site, according to some free sourcing using term changed, there a bit error showing google map & picasa photos.
//Who interesting blogger development or design, please feel free to contact: +852-64666880 or mmbusiness20c@gmail.com

//Before this scripting, please be remined to add "<div id="staticpostwrapper"><div class="staticpostwrapper"><ul id="staticpost"></ul></div></div><div id="staticfooter"></div>" to your html content.

//Updated Post Widget page setting
//var staticPageSetting = {
//  blog_domain_url: 'https://av-2u.blogspot.com',
//  list_item_class_name: 'text notpage',
//  list_item_container_class_name:  'post-wrapper',
//  start_index: 1,
//  post_limit: 2,
//  show_thumbnail: false,
//  show_title: false,
//  show_postcontent: true,
//  show_postdate: false,
//  show_comments: false,
//  show_more: false,
//  show_more_text: 'More &#187;',
//  show_separator: false,
//  show_category: false,
//  post_textlength: 99999,
//  post_order: 'published'
//}

//var $staticNumberOfMainPager = 2;

var $staticPageIndexRecord = 0;

function getStaticListingPageIndex(){
    var i = parseInt(getparameter('page')||1)||1;
    if(i>1 && (document.title).indexOf(' - (第'+i+'頁)')==-1) document.title = document.title + ' - (第'+i+'頁)';
    return i;
}

function createStaticPagePagination(json){
    var $pg = document.getElementById('staticfooter');
    if($pg){
          var totalpage = Math.ceil(((parseInt(json.feed.openSearch$totalResults.$t)||0)-staticPageSetting.start_index+1)/staticPageSetting.post_limit);
          var idx = getStaticListingPageIndex();
          var cpData = calculatePage(idx,totalpage,$staticNumberOfMainPager);
          $staticPageIndexRecord = idx;

          var h ='<div id="pagination">';
          h+='<div class="controlpager">';
          h+='<span>';
          if(totalpage>0){
            h+='<span class="infopage">&#31532;'+idx+'&#38913;</span> ';
            if(idx>1){h+='<a class="sidepage" title="&#19978;&#19968;&#38913;" href="#Page-'+(idx-1)+'" onclick="return rssFeedCallBack('+(idx-1)+')">' +pageNaviConf.prevText+'</a>'}
            if(cpData[0]>1){h+='<a class="gotopage" href="#Page-1" onclick="return rssFeedCallBack(1)">1</a>'}
            h+=(cpData[0]>2)?'<span class="pagegap">&hellip;</span>':'';
            for(var pi=cpData[0];pi<=cpData[1];pi++){
              if(pi>0){
                if(pi==idx){
                  h+='<span class="currentpage">'+pi+'</span>';
                }else{ h+='<a class="gotopage" href="#Page-'+pi+'" onclick="return rssFeedCallBack('+pi+')">'+pi+'</a>'; }
              }
            }
            h+=(cpData[1]<totalpage-1)?('<span class="pagegap">&hellip;</span>'):'';
            if(cpData[1]<totalpage){h+='<a class="gotopage" href="#Page-'+totalpage+'" onclick="return rssFeedCallBack('+totalpage+')">'+totalpage+'</a>'}
            if(idx<totalpage){h+='<a class="sidepage" title="&#19979;&#19968;&#38913;" href="#Page-'+(idx+1)+'" onclick="return rssFeedCallBack('+(idx+1)+')">' +pageNaviConf.nextText+'</a>'}
          }
          h+='</span>';
          h+='</div>';
          if(totalpage>1) h+='<div class="directpager"><span><span id="directentrydescription">跳頁:</span><input id="directentrypage" type="text" size="3" onkeypress="return onlyNumber(event||window.event)" onpaste="returnNumber(this)" onblur="$documentSelectionEnable=true;" onfocus="$documentSelectionEnable=false;returnNumber(this)" onkeyup="var $v=this.value;if($v!=&quot;&quot;&&($v<=0||$v>'+totalpage+')){this.style.backgroundColor=&quot;red&quot;}else{this.style.backgroundColor=&quot;white&quot;}" value="'+(idx||'?')+'"/><a id="directentrylink" href="javascript:void(0)" onclick="var $d=document; var $v=parseInt(document.getElementById(&quot;directentrypage&quot;).value)||0;if($v!=&quot;&quot;&&$v>0&&$v<='+totalpage+'){this.href=&quot;javascript:void(0);#Page-&quot;+$v;rssFeedCallBack($v);}"><input id="directentrybutton" type="reset" value="&#9658;"/></a><span id="directentryremark" title="** 如果按下頁「&#9658;」後沒有轉頁，表示所輸入的頁數無效或已超出了極限。煩請重新輸入，不便之處，敬請原諒！ **">(?)</span></span></div>';
          h+='</div>';
          $pg.innerHTML=h;
          $pg.style.height = 'auto';
    }
}

function rssFeedCallBack(i){
    var u = document.URL, n = 'page', x = getparameter(n), i = i||1;
    if(x){
        if(u.indexOf('?'+n+'='+x)!=-1) u = u.replace('?'+n+'='+x,(i==1)?'':('?'+n+'='+i));
        if(u.indexOf('&'+n+'='+x)!=-1) u = u.replace('&'+n+'='+x,(i==1)?'':('&'+n+'='+i));
    } else if(i>1){
        x = u.split('#');
        u = x[0] + ((u.indexOf('?')!=-1)?'&':'?') + n + '=' + i + (x[1]?('#'+x[1]):'');
    }
    (location||window.location).href = u;
    return false;
}

function staticpagepostwidget(json){
  var $jL = parseInt(json.feed.openSearch$totalResults.$t)||0, dc = document;
  var $pv = dc.getElementById('staticpost');
  var $pw = dc.getElementById('staticpostwrapper');
  if($pv&&$jL>=staticPageSetting.start_index){
    $pv.style.backgroundPosition = 'center -4000px';
    if($pw) $pw.style.backgroundPosition = 'center -4000px';
    runJsonInScript(json,staticPageSetting,'','',$pv);
    $pv.style.height= 'auto';
    $pv.style.overflow = 'visible';
    //window.scrollTo(0, 0);
    runNativeAds($pv,((dc.URL).indexOf('#listview')!=-1)?1:0);
    createStaticPagePagination(json);
  } else {
    var $pg = document.getElementById('staticfooter');
    if($pg) $pg.innerHTML = '<div id="pagination" class="nonepostwrapper"><div class="nonepostpager"><span>非常抱歉！沒有找到任何分享資料。如有不便，敬請原諒！</span></div><div class="nonepostpager"><a href="javascript:window.history.back();">&#9664;&#9664;&#32;&#36820;&#22238;&#19978;&#19968;&#38913;</a></div></div>';
    //window.scrollTo(0, 0);
  }
}

(function(){
document.write('<script type=\"text/javascript\" src=\"'+staticPageSetting.blog_domain_url+'/feeds/posts/default?orderby='+staticPageSetting.post_order+'&alt=json-in-script&max-results='+staticPageSetting.post_limit+'&start-index='+((staticPageSetting.post_limit*((parseInt(getStaticListingPageIndex())||1)-1))+staticPageSetting.start_index)+'&callback=staticpagepostwidget"><\/script>');
})();
