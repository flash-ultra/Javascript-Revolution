    
    // $Id:$
    
    _class("String", {
        insertAt : function(loc, strChunk) {
            return (this.valueOf().substr(0, loc)) + strChunk
                    + (this.valueOf().substr(loc));
        },
        
        trim : function() {
            return this.replace(/^\s+|\s+$/g, "");
        },
        
        ltrim : function() {
            return this.replace(/^\s+/g, "");
        },
        
        rtrim : function() {
            return this.replace(/\s+$/g, "");
        },
        
        stripTags : function() {
            return this.replace(/<([^>]+)>/g, '');
        },
        
        toArray : function(separator) {
            return this.split(separator);
        },
        
        htmlEntities : function() {
            return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,
                    '&gt;');
        },
        
        wrap : function(tagName) {
            return '<' + tagName + '>' + this + '</' + tagName + '>';
        },
        
        endsWith : function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        },
        
        isNumeric : function() {
            // returns true if x is numeric and false if it is not.
            var RegExp = /^(-)?(\d*)(\.?)(\d*)$/;
            return this.match(RegExp);
        },
        
        reverse : function () {
            return this.split('').reverse().join('');
        },
        
        utf8Encode : function() {
            var str = this.replace(/[\u0080-\u07ff]/g, function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
            });
            str = str.replace(/[\u0800-\uffff]/g, function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F,
                        0x80 | cc & 0x3f);
            });
            return str;
    
        },
        
        matchLookBehind : function(regexLB, regexMatch){
            var str = this;
            var startPos = str.search(regexLB);
            var str = str.replace(regexLB, "");
            var clearedString = str.substring(startPos);
            return clearedString.match(regexMatch);
        },
        
        // TODO: Hier ist noch der Wurm drin...
        matchLookAhead : function(regexLA, regexMatch){
            var regexMatchRewrite = String(regexMatch).substring(0, regexMatch.length - 1);
            var str = this.match(new RegExp(regexMatchRewrite + '(' + regexLA + ')/'));
            return str.replace(regexLA, "");
        },
        
        utf8Decode : function() {
            var str = this.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(c) {
                var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
                return String.fromCharCode(cc);
            });
            str = str.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(c) {
                var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                return String.fromCharCode(cc);
            });
            return str;
        }
    });