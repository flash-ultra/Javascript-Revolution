    
    // $Id:$
    // Anmerkung:
    // IE wirft einen Fehler, wenn die Funktion class heisst, deshalt _class
    // Daher wird die Funktion super ebenfalls mit einem Unterstrich definiert	
        
    function _class(name, prop) {                                                               
        var val, subVal, c;                                                                     
        if (name.indexOf("extends") != -1) {                                                    
            c = name.split(" extends ");                                                        
            if(typeof window[c[1]] === "undefined"){                                            
                throw('Class ' + c[1] + ' does not exist.');                                    
            }
            prop.private__super = window[c[1]];
            _class(c[0], prop);                                                                 
            window[c[0]].prototype.__proto__ = window[c[1]].prototype;                          
            window[c[0]].prototype._super = window[c[1]];
            for (val in window[c[1]].prototype) {                                               
                if(window[c[0]].prototype[val] === val) continue;                               
                window[c[0]].prototype[val] = window[c[1]].prototype[val];                      
            }
        } else if (name.indexOf("abstract") != -1) {
            c = name.split("abstract ");                                                        
            prop._constructor = function() {                                                    
                throw ('Unable to create an instance of an abstract class.');                   
            };
            prop.TYPE = "ABSTRACT_CLASS";                                                       
            _class(c[1], prop);                                                                 
        } else if (name.indexOf("implements") != -1) {
            var interfaceProperties = 0;                                                        
            var implementedClassProperties = 0;
            c = name.split(" implements ");                                                     
            for (val in window[c[1]].prototype) {
                for (subVal in prop) {
                    if (val === subVal) {
                        implementedClassProperties++;
                        break;
                    }
                }
                interfaceProperties++;
            }
            if (interfaceProperties != implementedClassProperties) {
                throw ("Fatal error:\n\n\t_class( " + c[0] + " implements " + c[1] +
                       " )\n\nMessage: Class properties do not match against the "+
                       "interface declaration!");
            } else {
                prop._constructor = (prop._constructor) ? prop._constructor : function(){};
                _class(c[0], prop);
            }
        } else {
            var nativeObjects = [ "Array", "String", "Object", "Date", "Number", "Boolean", "Math", "RegExp", "HTMLElement" ];
            var isNativeObject = false;
            for ( var i = 0; i < nativeObjects.length; i++) {
                if (name == nativeObjects[i]) {
                    isNativeObject = true;
                    break;
                }
            }
            if (!isNativeObject) {
                var privateProps = new Array();
                var publicProps = new Array();
                for (val in prop) {
                    if(val.substr(0, 9) == 'abstract_' 
                       || val.substr(0, 7) == 'static_' 
                       || val.substr(0, 12) == '_constructor'){
                        // skip for later processing
                    }else{
                        if(val.substr(0,8) == 'private_'){
                            privateProps.push({key:val, value:prop[val]});
                        } else {                        
                            publicProps.push({key:val, value:prop[val]});
                        }
                    }             
                }
    
                var curConstructor = (prop._constructor) ? prop._constructor : function(){};
                var curConstructorStr = curConstructor.toString().replace(/^\s+|\s+$/g, "");                
                
                var funcArguments = new Array("");
                var funcArgumentsFromConstructor = curConstructorStr.substring(
                        curConstructorStr.indexOf('('), 
                        curConstructorStr.indexOf(')')
                );
    
                var curArgument = funcArgumentsFromConstructor.replace("(", "");
                curArgument = curArgument.replace(")", "");
    
                curArgument = curArgument.split(",");
                for(var i=0;i<curArgument.length;i++){                        
                    funcArguments[i] = curArgument[i];
                }
                
                var curConstructorBodyStart = curConstructorStr.indexOf('{') + 1;
                var curConstructorBodyEnd = curConstructorStr.lastIndexOf('}');
                var curConstructorBody = curConstructorStr.substring(curConstructorBodyStart, curConstructorBodyEnd);
                                   
                var curKey, curValue, publicPropertiesOut = "// [PUBLICPROP]\n", publicMethodsOut = "// [PUBLICMETH]\n";
                var privatePropertiesOut = "// [PRIVATEPROP]\n", privateMethodsOut = "// [PRIVATEMETH]\n";

                for(var i=0;i<privateProps.length;i++){
                    curKey = privateProps[i].key.substr(8);
                    curValue = privateProps[i].value;
                    if(typeof privateProps[i].value == 'string'){
                        privatePropertiesOut += 'var ' + curKey + ' = "' + curValue + '";';                        
                    }else{
                        privateMethodsOut += 'var ' + curKey + ' = ' + curValue + ';';
                    }
                }
                
                // TODO: Reihenfolge von constructor definitionen und eigenschaften und methoden
                
                for(var i=0;i<publicProps.length;i++){
                    curKey = publicProps[i].key;
                    curValue = publicProps[i].value;
                    if(typeof publicProps[i].value == 'string'){
                        publicPropertiesOut += 'this.' + curKey + ' = "' + curValue + '";';
                        publicPropertiesOut += 'this.prototype.' + curKey + ' = this.' + curKey + ';';
                    
                    
                    }else if(typeof publicProps[i].value == 'function' || typeof publicProps[i].value == 'object'){
                        // console.log(curKey + ':' + (typeof publicProperties[i].value));
                        publicMethodsOut += 'this.' + curKey + ' = ' + curValue + ';';
                        publicMethodsOut += 'this.prototype.' + curKey + ' = this.' + curKey + ';';
                    }
                }
                curConstructorBody = 'var _this = this; this.prototype = this; ' + privatePropertiesOut + 
                                     publicPropertiesOut + curConstructorBody + privateMethodsOut + publicMethodsOut;
                // console.log(curConstructorBody);
                window[name] = new Function(funcArguments.toString(), curConstructorBody);
                
                window[name].constructor = window[name];
                window[name].className = name;
            }
            if (prop._constructor) delete (prop._constructor);
            if (window[name]) {
                var isAbstract = false;
                for (val in prop) {
                    if (prop.TYPE) {
                        window[name].TYPE = prop.TYPE;
                        delete (prop.TYPE);
                    }
                    if (val.substr(0, 7) == 'static_') {
                        var staticName = val.substr(7);
                        window[name][staticName] = prop[val];
                    } else if (val.substr(0, 9) == 'abstract_') {
                        isAbstract = true;
                        if (prop[val] instanceof Function){
                            /*if(prop[val].toString().replace(/\s/gi, '') == "function(){}"){
                                window[name].prototype[val] = prop[val];
                            }else{
                                throw ("Abstract Method cannot contain any implementation");
                            }*/
                            window[name].prototype[val] = prop[val];
                        }else if(prop[val] == null){
                            window[name].prototype[val] = prop[val];
                        }
                    }else if(isNativeObject){
                        window[name].prototype[val] = prop[val];
                    }
                }
                if(isAbstract && window[name].TYPE != 'ABSTRACT_CLASS'){
                    throw ("Class contains abstract methods and therefore should be defined as abstract");
                }
            }
        }
    }
    var _c = _class;
            
    function _abstract_class(name, prop) {
        if (name.indexOf("abstract") == -1) { 
            name = 'abstract ' + name;
        }
        _class(name, prop);
    }
    var _ac = _abstract_class;
           
    function _interface(name, prop) {
        var val;
        window[name] = function(){}; 
        window[name].constructor = window[name];
        window[name].className = name;
        window[name].TYPE = "INTERFACE";    
        for (val in prop) {
            if (prop[val] instanceof Function
                && prop[val].toString().replace(/\s/gi, '') != "function(){}") { 
                throw ("Fatal error: Interface Method already implemented!");
            } else {
                window[name].prototype[val] = prop[val];
            }
        }
    } 
    var _i = _interface;
    
    /*// only for IE shit
    var __IEcreateElement = document.createElement;
    
    function extendIE(classList){
    	document.createElement = function(tagName) {
    		var element = __IEcreateElement(tagName);
    		
    		for(var i=0;i<classList.length;i++){
    			var interface = new Element;
    			for (method in interface)
    				element[method] = interface[method];
    		}
    	
    		return element;
    	}
    }
    // end only for IE shit*/
        