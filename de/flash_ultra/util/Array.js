    
    // $Id:$

    _class("Array", {
        splice : function(ind, cnt) {
            var len = this.length;
            var arglen = arguments.length;
            if (arglen == 0) return ind;
            if (typeof (ind) != "number")
                ind = 0;
            else if (ind < 0) ind = Math.max(0, len + ind);
            if (ind > len) {
                if (arglen > 2)
                    ind = len;
                else
                    return [];
            }
            if (arglen < 2) cnt = len - ind;
            cnt = (typeof (cnt) == "number") ? Math.max(0, cnt) : 0;
            var removeArray = this.slice(ind, ind + cnt);
            var endArray = this.slice(ind + cnt);
            len = this.length = ind;
            for ( var i = 2; i < arglen; i++)
                this[len++] = arguments[i];
            for ( var i = 0, endlen = endArray.length; i < endlen; i++)
                this[len++] = endArray[i];
            return removeArray;
        },
        union : function(a2, compareFunction) {
            return this.concat(a2 ? a2 : null).removeDuplicates(
                    compareFunction);
        },
        subtract : function(a2, compareFunction) {
            if (!compareFunction) compareFunction = null;
            var a1 = this.removeDuplicates(compareFunction);
            if (!a2) return a1;
            var a2 = a2.removeDuplicates(compareFunction);
            var len2 = a2.length;
            if (compareFunction) {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i], found = false, src;
                    for ( var j = 0; j < len2
                            && compareFunction(src2 = a2[j], src) != 1; j++) {
                        if (compareFunction(src, src2) == 0) {
                            found = true;
                            break;
                        }
                    }
                    if (found) a1.splice(i--, 1);
                }
            } else {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i], found = false, src;
                    for ( var j = 0; (j < len2) && (src >= (src2 = a2[j])); j++) {
                        if (src2 == src) {
                            found = true;
                            break;
                        }
                    }
                    if (found) a1.splice(i--, 1);
                }
            }
            return a1;
        },
        intersect : function(a2, compareFunction) {
            if (!compareFunction) compareFunction = null;
            var a1 = this.removeDuplicates(compareFunction);
            if (!a2) return a1;
            var a2 = a2.removeDuplicates(compareFunction);
            var len2 = a2.length;
            if (len2 < a1.length) {
                var c = a2;
                a2 = a1;
                a1 = c;
                c = null;
                len2 = a2.length;
            }
            if (compareFunction) {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i], found = false, src;
                    for ( var j = 0; j < len2
                            && compareFunction(src2 = a2[j], src) != 1; j++) {
                        if (compareFunction(src, src2) == 0) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) a1.splice(i--, 1);
                }
            } else {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i], found = false, src;
                    for ( var j = 0; (j < len2) && (src >= (src2 = a2[j])); j++) {
                        if (src2 == src) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) a1.splice(i--, 1);
                }
            }
            return a1;
        },
        removeDuplicates : function(compareFunction) {
            if (!compareFunction) compareFunction = null;
            var a1 = this.concat().sort(compareFunction);
            if (compareFunction) {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = i + 1; j < a1.length
                            && compareFunction(a1[j], src) == 0; j++) {
                    }
                    if (j - 1 > i) a1.splice(i + 1, j - i - 1);
                }
            } else {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = i + 1; j < a1.length && a1[j] == src; j++) {
                    }
                    if (j - 1 > i) a1.splice(i + 1, j - i - 1);
                }
            }
            return a1;
        },
        exclusion : function(a2, compareFunction) {
            if (!compareFunction) compareFunction = null;
            var a1 = this.removeDuplicates(compareFunction);
            if (!a2) return a1;
            return a1.subtract(a2, compareFunction).concat(
                    a2.subtract(a1, compareFunction)).sort(compareFunction);
        },
        unsortedUnion : function(a2, compareFunction) {
            if (!compareFunction) compareFunction = null;
            return this.concat(a2 ? a2 : null).unsortedRemoveDuplicates(
                    compareFunction);
        },
        unsortedSubtract : function(a2, compareFunction) {
            if (!compareFunction) compareFunction = null;
            var a1 = this.unsortedRemoveDuplicates(compareFunction);
            if (!a2) return a1;
            var subtrahend = a2.unsortedRemoveDuplicates(compareFunction);
            if (compareFunction) {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = 0, len = subtrahend.length; j < len; j++)
                        if (compareFunction(subtrahend[j], src) == 0) {
                            a1.splice(i--, 1);
                            break;
                        }
                }
            } else {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = 0, len = subtrahend.length; j < len; j++)
                        if (subtrahend[j] == src) {
                            a1.splice(i--, 1);
                            break;
                        }
                }
            }
            return a1;
        },
        unsortedIntersect : function(a2, compareFunction) {
            if (!compareFunction) compareFunction = null;
            if (!a2) return this.unsortedRemoveDuplicates(compareFunction);
            var a1 = this;
            var len2 = a2.length;
            a1 = a1.unsortedRemoveDuplicates(compareFunction);
            if (compareFunction) {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = 0; j < len2; j++)
                        if (compareFunction(a2[j], src) == 0) break;
                    if (j == len2) a1.splice(i--, 1);
                }
            } else {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = 0; j < len2; j++)
                        if (a2[j] == src) break;
                    if (j == len2) a1.splice(i--, 1);
                }
            }
            return a1;
        },
        unsortedRemoveDuplicates : function(compareFunction) {
            var a1 = this.concat();
            if (compareFunction) {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = i + 1; j < a1.length; j++)
                        if (compareFunction(a1[j], src) == 0)
                            a1.splice(j, 1);
                }
            } else {
                for ( var i = 0; i < a1.length; i++) {
                    var src = a1[i];
                    for ( var j = i + 1; j < a1.length; j++)
                        if (a1[j] == src) a1.splice(j--, 1);
                }
            }
            return a1;
        },
        unsortedExclusion : function(a2, compareFunction) {
            if (!compareFunction) compareFunction = null;
            var a1 = this.unsortedRemoveDuplicates(compareFunction);
            if (!a2) return a1;
            return a1.unsortedSubtract(a2, compareFunction).concat(
                    a2.unsortedSubtract(a1, compareFunction)).sort(
                    compareFunction);
        },
        contains : function(element) {
            for ( var i = 0; i < this.length; i++) {
                if (this[i] == element) {
                    return true;
                }
            }
            return false;
        },
        clear : function() {
            this.length = 0;
        },
        sortNum : function() {
            return this.sort(function(a, b) {
                return a - b;
            });
        },
        shuffle : function() {
            for ( var rnd, tmp, i = this.length; i; rnd = parseInt(Math
                    .random()
                    * i), tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp)
                ;
        },
        compare : function(testArr) {
            if (this.length != testArr.length) return false;
            for ( var i = 0; i < testArr.length; i++) {
                if (this[i].compare) {
                    if (!this[i].compare(testArr[i])) return false;
                }
                if (this[i] !== testArr[i]) return false;
            }
            return true;
        },
        // This prototype is provided by the Mozilla foundation and
        // is distributed under the MIT license.
        // http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
        // var myArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        // document.writeln(myArray.every(String.isNumeric)); // outputs:
        // true
        // var myArray = [1,2,3,4,5,6,7,8,9,'ten',11,12,13,14,15];
        // document.writeln(myArray.every(String.isNumeric)); // outputs:
        // false
        every : function(fun /* , thisp */) {
            var len = this.length;
            if (typeof fun != "function") throw new TypeError();
            var thisp = arguments[1];
            for ( var i = 0; i < len; i++) {
                if (i in this && !fun.call(thisp, this[i], i, this))
                    return false;
            }
            return true;
        },
        // This prototype is provided by the Mozilla foundation and
        // is distributed under the MIT license.
        // http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
        // var myArray = [1,'two',3,'four',5,'six',7,'eight',9,'ten'];
        // var oddArray=myArray.filter(isNumeric);
        // document.writeln(oddArray); // outputs: 1,3,5,7,9
        filter : function(fun /* , thisp */) {
            var len = this.length;
            if (typeof fun != "function") throw new TypeError();
            var res = new Array();
            var thisp = arguments[1];
            for ( var i = 0; i < len; i++) {
                if (i in this) {
                    var val = this[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, this)) res.push(val);
                }
            }

            return res;
        },
        // This prototype is provided by the Mozilla foundation and
        // is distributed under the MIT license.
        // http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
        // var isNumeric = function(x) {
        // var RegExp = /^(-)?(\d*)(\.?)(\d*)$/;
        // return String(x).match(RegExp);
        // }
        // var testElement = function(x) {
        // if(isNumeric(x)) {
        // return x;
        // } else {
        // return 0;
        // }
        // }
        // var myArray = [1,'two',3,'four',5,'six',7,'eight',9,'ten'];
        // var newArray= myArray.map(testElement);
        // document.writeln(newArray); // outputs: 1,0,3,0,5,0,7,0,9,0
        map : function(fun /* , thisp */) {
            var len = this.length;
            if (typeof fun != "function") throw new TypeError();
            var res = new Array(len);
            var thisp = arguments[1];
            for ( var i = 0; i < len; i++) {
                if (i in this) res[i] = fun.call(thisp, this[i], i, this);
            }
            return res;
        }
    });