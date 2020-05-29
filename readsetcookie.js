  //<![CDATA[
  function writeCookie(cookieValue,cookieId,cookieExpireDay){
        if(navigator.cookieEnabled){
            var ck = cookieId||'cookie', xt = '';
            var xd = parseInt(cookieExpireDay)||0;
            if(xd>0){
                var dt = new Date();
                dt.setTime(dt.getTime()+(86400000*xd));
                xt = '; expires='+dt.toUTCString()+';';
            }
            document.cookie=ck+'='+encodeURIComponent(cookieValue)+xt;
        }
  }
  function readCookie(cName,separator){
        cName = cName||'cookie';
        if(navigator.cookieEnabled){
            var c = decodeURIComponent(document.cookie), sptr = separator||';';
            c = c.split(sptr); var v = '';
            for(var i = 0; i <c.length; i++) {
                c[i] = c[i].split('=');
                if(c[i][0]){
                    c[i][0] = c[i][0].replace(/(^\s+|\s+$)/g,'');
                    if(c[i][0]==cName){
                        if(c[i][1]){
                            c[i][1] = c[i][1].replace(/(^\s+|\s+$)/g,'');
                            v = c[i][1];
                            break;
                        }
                    }
                }
            }           
        }
        return v;
  }
  //]]>
