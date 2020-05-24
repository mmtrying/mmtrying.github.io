//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/basic?alt=json-in-script&callback=abc
//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/full?alt=json-in-script&callback=abc
//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/full?alt=json-in-script&callback=abc&start-index=1&max-results=2&orderby=column:year&reverse=true
//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/full?alt=json-in-script&callback=abc&q=jan
//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/full?alt=json-in-script&callback=abc&sq=index%3E2%20and%20index%3C9
//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/basic?alt=json-in-script&callback=abc&tq=select%20month&sq=index%3E2%20and%20index%3C9
//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/full?alt=json-in-script&callback=abc&sq=month=jan%20or%20month=Mar
//https://spreadsheets.google.com/feeds/list/18xcLhlutxAhjyvFTDf6DkkNjo2Oda1mVg6pAEN6Wqow/1/public/full?alt=json-in-script&callback=abc&sq=index%3C3

//Martin Ma is an expert who have stidied javascript & blogger design for years.
//Respecting copyrights and design-effort, please don't delete this introduction when you use this script.
//Introduction Website: http://personalprojectdesigner.blogspot.com/
//Most Succeed Website: http://14161.blogspot.com/    <= Adult Site, according to some free sourcing using term changed, there a bit error showing google map & picasa photos.
//Who interesting blogger development or design, please feel free to contact: +852-64666880 or mmbusiness20c@gmail.com

//make sure the Google Spreadsheet is published before using this Json-Feeding function.
var $thisTime = (new Date()).getTime();
var publishedspreadsheetgoogle = {
    excel_id: '1NqQz613Sj0ZbWdku7ttfBARcIf7C_gr44z8kWLsilKc',    //necessary id number from the Google Spreadsheet.
    start_index: 1,
    post_limit: 3,    //showing number of row-data on each page.
    order_by: '',    //can rank the listing in order by the specific column title, eg:  'Month'.  Default rank order by first column.
    reverse: false,    //whether determine the rank order is either ascending & descending ('false' = ascending / 'true' = descending).
    query: '',    //searching Query which is contained in the cells by each row. Eg: 'Jan', then results are shown as 'Jan' or 'Jan *' or '* Jan' or '* Jan *'.  (*=AnyText)
    sortquery: 'ReadyToPost=ok',    //matching the condition in specific column (specified by column heading) by each row.  The condition can be set as '>', '<', & '='. Eg: 'Month=Jan or Month=Mar', 'Sequence>=2 and Sequence<10', etc.  As per column heading are specified without spacing & case-sensitive, therefore for example, 'Book Time', 'BookTime', & 'Bo OK Time' will be resulted as the same specification as 'booktime'. Moreover, If there are duplicate specified headings, please put '_#' at the end of your targeted sorting column.  Eg: if three heading names are 'BookTime', 'Book time', & 'Bo OK Time', the corrective queries are sorted by 'booktime', 'booktime_2', & 'booktime_3.
    subject: ['Sequence','CharacterNameEnglish','CharacterNameChinese','ImageSource','PostCount','ReadyToPost']    //determine which columns (specified by column heading from left to right) are taken for the feed data. If headings are same, you need to put duplicate name in the array also.
}
var $staticNumberOfMainPager = 3;


 function createStaticPagePagination(json){
    var $pg = document.getElementById('staticfooter');
    if($pg){
          var totalpage = Math.ceil(((parseInt(json.feed.openSearch$totalResults.$t)||0)-publishedspreadsheetgoogle.start_index+1)/publishedspreadsheetgoogle.post_limit);
          var idx = getStaticListingPageIndex();
          var cpData = calculatePage(idx,totalpage,$staticNumberOfMainPager);

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
          if(totalpage>1) h+='<div class="directpager"><span><span id="directentrydescription">跳頁:</span><input id="directentrypage" type="text" size="3" onkeypress="return onlyNumber(event||window.event)" onpaste="returnNumber(this)" onblur="$documentSelectionEnable=true;" onfocus="$documentSelectionEnable=false;returnNumber(this)" onkeyup="var $v=this.value;if($v!=&quot;&quot;&&($v<=0||$v>'+totalpage+')){this.style.backgroundColor=&quot;red&quot;}else{this.style.backgroundColor=&quot;white&quot;}" value="'+(idx||'?')+'"/><a id="directentrylink" href="javascript:void(0)" onclick="var $d=document; var $v=parseInt(document.getElementById(&quot;directentrypage&quot;).value)||0;if($v!=&quot;&quot;&&$v>0&&$v<='+totalpage+'){this.href=&quot;javascript:void(0);#Page-&quot;+$v;rssFeedCallBack($v);}"><input id="directentrybutton" type="reset" value="&#9658;"/></a><span id="directentryremark" title="** 如果按下頁&#12300;&#9658;&#12301;後沒有轉頁&#65292;表示所輸入的頁數無效或已超出了極限&#12290;煩請重新輸入&#65292;不便之處&#65292;敬請原諒&#65281; **">(?)</span></span></div>';
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
function getStaticListingPageIndex(){
    var i = parseInt(getparameter('page')||1)||1;
    if(i>1 && (document.title).indexOf(' - (第'+i+'頁)')==-1) document.title = document.title + ' - (第'+i+'頁)';
    return i;
}
function initializingexcelgdata($json,$setting,wElmUL){
    var a = $setting.subject;
    if(a instanceof Array){
        var n = a.length; a = a.slice();
        for(var i=0;i<n;i++){
            a[i] = a[i].toLowerCase().replace(/ /g,'');
        }
        var aa = a.slice(), c = [];
        for(var i=n-1;i>=0;i--){
            c[i] = 0;
            for(var ii=0;ii<n;ii++){
                if(ii<i&&a[i]==a[ii]) c[i]+=1; 
            }
            if(c[i]>0) a[i] = a[i] + '_' + c[i];
        }
    }
    var h ='', $wLi = [];
    var r = Math.min((typeof $json.feed == 'undefined')?0:(($json.feed.entry)?($json.feed.entry.length||0):0),$setting.post_limit);
    for(var i=0;i<r;i++){
        var entry = $json.feed.entry[i], v = [];
        h += (wElmUL)?'':('<li style="position:relative">');
        h += '<div>';
        for(var ii=0;ii<n;ii++){
            v[i] = eval('entry.gsx$'+a[ii]+'.$t')||'';
            if(v[i]){
                h += '<div class="'+a[ii]+'"><span>'+v[i]+'</span></div>';
            }
        }
        h += '</div>';
        h += (wElmUL)?'':'</li>';
        if(wElmUL){
          $wLi[i]=document.createElement('li');
          $wLi[i].style.position = 'relative';
          $wLi[i].innerHTML=h;
          wElmUL.appendChild($wLi[i]);
        }else{document.write(h)}
        h = '';
    }
}
function staticpagepostwidget(json){
  var $jL = parseInt(json.feed.openSearch$totalResults.$t)||0, dc = document;
  var $pv = dc.getElementById('staticpost');
  var $pw = dc.getElementById('staticpostwrapper');
  if($pv&&$jL>=publishedspreadsheetgoogle.start_index){
    $pv.style.backgroundPosition = 'center -4000px';
    if($pw) $pw.style.backgroundPosition = 'center -4000px';
    var postnumber = (typeof json.feed == 'undefined')?0:((json.feed.entry)?(json.feed.entry.length||0):0);
    if(postnumber>0){
        initializingexcelgdata(json,publishedspreadsheetgoogle,$pv);
        $pv.style.height= 'auto';
        $pv.style.overflow = 'visible';
        //window.scrollTo(0, 0);
        createStaticPagePagination(json);
    }
  } else {
    $pv.style.backgroundPosition = 'center -4000px';
    if($pw) $pw.style.backgroundPosition = 'center -4000px';
    var $pg = document.getElementById('staticfooter');
    if($pg) $pg.innerHTML = '<div id="pagination" class="nonepostwrapper"><div class="nonepostpager"><span>非常抱歉&#65281;沒有找到任何分享資料&#12290;如有不便&#65292;敬請原諒&#65281;</span></div><div class="nonepostpager"><a href="javascript:window.history.back();">&#9664;&#9664;&#32;&#36820;&#22238;&#19978;&#19968;&#38913;</a></div></div>';
    //window.scrollTo(0, 0);
  }
}

(function(){
    var q = encodeURIComponent(publishedspreadsheetgoogle.query||'');
    var sq = encodeURIComponent((publishedspreadsheetgoogle.sortquery||'').toLowerCase());
    document.write('<script type=\"text/javascript\" src=\"https://spreadsheets.google.com/feeds/list/'+ publishedspreadsheetgoogle.excel_id +'/1/public/full?tt='+$thisTime+'&alt=json-in-script&start-index='+((publishedspreadsheetgoogle.post_limit*((parseInt(getStaticListingPageIndex())||1)-1))+publishedspreadsheetgoogle.start_index)+'&max-results='+(publishedspreadsheetgoogle.post_limit||0)+'&orderby='+(publishedspreadsheetgoogle.order_by||'')+'&reverse='+(publishedspreadsheetgoogle.reverse||'false')+(q?('&q='+q):'')+(sq?('&sq='+sq):'')+'&callback=staticpagepostwidget"><\/script>');
})();