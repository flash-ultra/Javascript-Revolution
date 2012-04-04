
    _class("URL", {
       
        parseUrl : function(uri){
           if (typeof uri == 'undefined') {
               uri = location.href;
           }else if (uri[0] == '/'){
               uri = location.host + uri;
           }
           var url = uri.match(/^([^:]*:\/\/)?([^:]*:[^@]*@)?([^\/:\?]*\.[^\/:\?]*)?(:[^\/]*)?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i);
           delete url.input;
           
           url.protocol = ((url[1])?url[1]:'http://').split('://')[0];
           url.user = (url[2])?url[2].split(':')[0]:undefined;
           url.password = (url[2])?url[2].split(':')[1].split('@')[0]:undefined;
           url.host = (url[3])?url[3]:location.host;
           url.hostname = url.host;
           url.port = (url[4])?((isNaN(parseInt(url[4].split(':')[1])))?80:parseInt(url[4].split(':')[1])):80;
           url.path = (url[5])?url[5]:'/';
           url.pathname = url.path;
           url.search = (url[6])?url[6].split('?')[1]:undefined;
           url.query = url.search;
           url.fragment = (url[7])?url[7].split('#')[1]:undefined;
           url.hash = url.fragment;
           url.href = ''
               + url.protocol + '://'
               + ((url.user)?url.user+':'+url.password+'@':'')
               + url.host
               + ((url.port != 80)?':'+url.port:'')
               + url.path
               + ((url.search)?'?'+url.search:'')
               + ((url.fragment)?'#'+url.fragment:'');
           return url;
       } 
    });