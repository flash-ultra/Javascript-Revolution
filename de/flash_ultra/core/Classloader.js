
    var $ = function(id) {
        return document.getElementById(id);
    }
    
    var classesLoaded = new Array();
    
    /* Usage:
     *  
         _import({
            Date : "de.flash_ultra.utils.Date",
            Boolean : "de.flash_ultra.utils.Boolean"
            Base64Reader : "de.flash_ultra.zip.Base64Reader"
         });
    */
    function _import(packageObj){
        
        function splitPackage(className){
            return className.split('.').join('/');
        }
        
        for(val in packageObj){
            for(i=classesLoaded.length;i>0;i++){
                if(classesLoaded[i] === packageObj[val]) continue;
                $('head:first').add('<script type="text/javascript">' + $.ajax({ url: splitPackage(packageObj[val]), async: false }).responseText + '</script>');
                classesLoaded.push(packageObj[val]);
            }
        }
    }

    function showMySuperclasses(object) {
        if (object.__proto__) {
            document.writeln(object.__proto__ + "<br />");
            showMySuperclasses(object.__proto__);
        }
    }