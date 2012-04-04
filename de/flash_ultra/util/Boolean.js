    
    // $Id:$
    
    _class("Boolean", {
        XOR : function(bool2) {
            var bool1 = this.valueOf();
            return (bool1 == true && bool2 == false)
                    || (bool2 == true && bool1 == false);
        }
    });