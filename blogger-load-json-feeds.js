//This is open source scripted by Martin Ma, who is personal project designer in Hong Kong.
//Martin Ma is an expert who have stidied javascript & blogger design for years.
//Respecting copyrights and design-effort, please don't delete this introduction when you use this script.
//Introduction Website: http://personalprojectdesigner.blogspot.com/
//Most Succeed Website: http://14161.blogspot.com/    <= Adult Site, according to some free sourcing using term changed, there a bit error showing google map & picasa photos.
//Who interesting blogger development or design, please feel free to contact: +852-64666880 or mmbusiness20c@gmail.com

function runJsonInScript($json,opts,vars,specificIndex,wElmUL){
    var $post_HTML='', $wLi=[]; opts=opts||{};
    var $this_post_limit = opts.post_limit, $this_post_limit=(parseInt($this_post_limit)==0)?0:(parseInt($this_post_limit)||8);
    //'pageSettingConf.error_thumbnail_image' is a default setting from customizing variable before.
    var $this_without_thumbnail_image = opts.without_thumbnail_image||pageSettingConf.error_thumbnail_image;
    var $this_list_item_class_name = opts.list_item_class_name||'htmlpostwidget-item';
    var $this_list_item_container_class_name = opts.list_item_container_class_name||'htmlpostwidget-wrapper';
    var $this_show_thumbnail = opts.show_thumbnail||false;
    var $this_show_title = opts.show_title||false;
    var $this_show_postcontent = opts.show_postcontent||false;
    var $this_post_textlength = opts.post_textlength, $this_post_textlength=(parseInt($this_post_textlength)==0)?0:(parseInt($this_post_textlength)||99999);
    var $this_show_postdate = opts.show_postdate||false;
    var $this_show_comments = opts.show_comments||false;
    var $this_show_more = opts.show_more||false;
    var $this_show_more_text = opts.show_more_text||'More &#187;';
    var $this_show_category = opts.show_category||false;
    var $this_show_separator = opts.show_separator||false;

    var $addscript_status = true, $addscript_label = '';
    var $this_url_issued_addscript = opts.url_issued_addscript||'';
    var $this_success_addscript = opts.success_addscript||'';
    var $this_ending_addscript = opts.ending_addscript||'';

    var $this_start_index = specificIndex||parseInt(opts.start_index)||0;
    var $this_post_order = opts.post_order||'published';
    var $extendquery='';vars=vars||'';

    var postnumber = Math.min((typeof $json.feed == 'undefined')?0:(($json.feed.entry)?($json.feed.entry.length||0):0),$this_post_limit);

    for(var i = 0; i < postnumber; i++){
        var entry = $json.feed.entry[i];
        if(!entry) break;
        if(i==postnumber) break;
        var posttitle = entry.title.$t;
        var posturl;
        for(var k = 0; k < entry.link.length; k++){
            if(entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html'){
                var commenttext = entry.link[k].title;
                var commenturl = entry.link[k].href;
            }
            if(entry.link[k].rel == 'alternate'){
                posturl = entry.link[k].href;
                break;
            }
        }

        eval($this_url_issued_addscript);
        if($addscript_status===false){break;}

        var this_post_id = entry.id.$t||'';
        if(this_post_id!=''){
              if(this_post_id.indexOf('post-')!=-1){
                  this_post_id = this_post_id.split('post-')[1];
                if(this_post_id.indexOf('&')!=-1) this_post_id = this_post_id.split('&')[0];
                if(this_post_id.indexOf('#')!=-1) this_post_id = this_post_id.split('#')[0];
                this_post_id = this_post_id.replace(/\s/g,'');
              } else {
                this_post_id = '';
              }
        }

        $extendquery='?thispostorder='+$this_post_order+(($this_start_index>0)?'&thispost='+this_post_id+'&thisindex='+($this_start_index+i):'')+((vars=='')?'':'&thislabel='+vars);

        var thumburl;
        try {
            thumburl = entry.media$thumbnail.url;
        } catch (error){
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if((a != -1) && (b != -1) && (c != -1) && (d != "")){
                thumburl = d;
            } else thumburl = $this_without_thumbnail_image;
        }

        var postdate = entry.published.$t;
        var cdyear = postdate.substring(0, 4);
        var cdmonth = postdate.substring(5, 7);
        var cdday = postdate.substring(8, 10);
        var monthnames = new Array();
        monthnames[1] = "Jan";
        monthnames[2] = "Feb";
        monthnames[3] = "Mar";
        monthnames[4] = "Apr";
        monthnames[5] = "May";
        monthnames[6] = "June";
        monthnames[7] = "July";
        monthnames[8] = "Aug";
        monthnames[9] = "Sept";
        monthnames[10] = "Oct";
        monthnames[11] = "Nov";
        monthnames[12] = "Dec";


        $post_HTML += (wElmUL)?'':('<li style="position:relative" class="'+$this_list_item_class_name+'">');
        $post_HTML += '<div class="'+$this_list_item_container_class_name+'" style="position:relative"><div><div><div><div id="'+$extendquery+'" class="rss::'+$this_post_order+'">';
        if($this_show_thumbnail == true){
          $post_HTML += '<a rel="alternate home" href="' + posturl + '" target ="_top"><img class="label_thumb" src="' + thumburl + '" onerror="LoadErrorThumbnail(this)"/></a>';
        }
        if($this_show_title == true){
          $post_HTML += '<strong><a rel="alternate home" href="' + posturl + '" target ="_top">' + posttitle + '</a></strong><br/>';
        }
        if("content" in entry){
            var postcontent = entry.content.$t;
        } else if("summary" in entry){
            var postcontent = entry.summary.$t;
        } else var postcontent = "";
        var re = /<\S[^>]*>/g;
        //postcontent = postcontent.replace(re,"");
        if($this_show_postcontent == true){
            if(postcontent.length < $this_post_textlength){
                $post_HTML += ''+postcontent+'';
            } else {
                postcontent = postcontent.substring(0, $this_post_textlength);
                var quoteEnd = postcontent.lastIndexOf(" ");
                postcontent = postcontent.substring(0, quoteEnd);
                $post_HTML += ''+postcontent+'...';
            }
        }
        var $components = '', $flag = 0;
        $post_HTML += '<br/>';
        if($this_show_postdate == true){
            $components += monthnames[parseInt(cdmonth,10)] + '-' + cdday + ' - ' + cdyear;
            $flag = 1;
        }
        if($this_show_comments == true){
            if($flag == 1){
                $components += ' | ';
            }
            commenttext = '<a rel="alternate" class="comment-link" href="' + commenturl + '" target ="_top" title="Post your comment">' + commenttext + '</a>';
            $components += commenttext;
            $flag = 1;
        }
        if($this_show_more == true){
            if($flag == 1) $components += ' | ';
            $components += '<a rel="alternate" href="' + posturl + '" class="url" target ="_top">'+$this_show_more_text+'</a>';
            $flag = 1;
        }
        $post_HTML += $components;


        if($this_show_category == true){
          var oCategory=entry.category,ctyL=oCategory.length;
          $post_HTML += '<div class="post-footer-line post-footer-line-2"><span class="post-labels">'+((ctyL>0)?'標籤&#65306;':'');
		  for(var icty=0;icty<ctyL;icty++){
            if(icty>0) $post_HTML += ', ';
            $post_HTML += '<a rel="tag" href="http://' + document.domain + '/search/label/'+encodeURIComponent(oCategory[icty].term)+'">'+oCategory[icty].term+'</a>'
          }
          $post_HTML += '</span></div>';
        }


        $post_HTML += '</div></div></div></div>';
        if($addscript_label!='') $post_HTML += ('<div class="json-relatinglabel"><div>'+returnLabelText($addscript_label,1)+'</div></div>');
        $post_HTML += '</div>';

        if($this_show_separator == true){
            if(i != (postnumber-1)) $post_HTML+='<hr/>';
        }
        $post_HTML += (wElmUL)?'':'</li>';
        if(wElmUL){
          $wLi[i]=document.createElement('li');
          $wLi[i].className = $this_list_item_class_name;
          $wLi[i].style.position = 'relative';
          $wLi[i].innerHTML=$post_HTML;
          wElmUL.appendChild($wLi[i]);
          showTitleDots($wLi[i]);
        }else{document.write($post_HTML)}
        $post_HTML='';
        eval($this_success_addscript);
    }
    eval($this_ending_addscript);
    if($addscript_status===false){return;}
}
