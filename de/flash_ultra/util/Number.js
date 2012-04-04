    
    // $Id:$
    
    _class("Number", {
        
        toCurrency : function(noFractions, currencySymbol, decimalSeparator,
                thousandsSeparator) {
            var n, startAt, intLen;
            if (currencySymbol == null) currencySymbol = "$";
            if (decimalSeparator == null) decimalSeparator = ".";
            if (thousandsSeparator == null) thousandsSeparator = ",";
            n = this.round(noFractions ? 0 : 2, true, decimalSeparator);
            intLen = n.length - (noFractions ? 0 : 3);
            if ((startAt = intLen % 3) == 0) startAt = 3;
            for ( var i = 0, len = Math.ceil(intLen / 3) - 1; i < len; i++)
                n = n.insertAt(i * 4 + startAt, thousandsSeparator);
            return currencySymbol + n;
        },
        
        toInteger : function(thousandsSeparator) {
            var n, startAt, intLen;
            if (thousandsSeparator == null) thousandsSeparator = ",";
            n = this.round(0, true);
            intLen = n.length;
            if ((startAt = intLen % 3) == 0) startAt = 3;
            for ( var i = 0, len = Math.ceil(intLen / 3) - 1; i < len; i++) {
                n = n.insertAt(i * 4 + startAt, thousandsSeparator);
            }
            return n;
        },
        
        isPrime : function() {
            if (2 > this) return false;
            if (0 == this % 2) return (2 == this);
            for ( var index = 3; this / index > index; index += 2)
                if (0 == this % index) return false;
            return true;
        },
        
        round : function(decimals, returnAsString, decimalSeparator) {
            // Supports 'negative' decimals, e.g. myNumber.round(-3) rounds to the
            // nearest thousand
            var n, factor, breakPoint, whole, frac;
            if (!decimals) decimals = 0;
            factor = Math.pow(10, decimals);
            n = (this.valueOf() + "");
            // To get the internal value of an Object, use the valueOf() method
            if (!returnAsString) return Math.round(n * factor) / factor;
            if (!decimalSeparator) decimalSeparator = ".";
            if (n == 0) return "0." + ((factor + "").substr(1));
            breakPoint = (n = Math.round(n * factor) + "").length - decimals;
            whole = n.substr(0, breakPoint);
            if (decimals > 0) {
                frac = n.substr(breakPoint);
                if (frac.length < decimals)
                    frac = (Math.pow(10, decimals - frac.length) + "").substr(1)
                            + frac;
                return whole + decimalSeparator + frac;
            } else
                return whole + ((Math.pow(10, -decimals) + "").substr(1));
        },
        
        format : function(decimalPoints, thousandsSep, decimalSep) {
            var val = this + '', re = /^(-?)(\d+)/, x, y;
            if (decimalPoints != null) val = this.toFixed(decimalPoints);
            if (thousandsSep && (x = re.exec(val))) {
                for ( var a = x[2].split(''), i = a.length - 3; i > 0; i -= 3)
                    a.splice(i, 0, thousandsSep);
                val = val.replace(re, x[1] + a.join(''));
            }
            if (decimalSep) val = val.replace(/\./, decimalSep);
            return val;
        },
        
        toFixed : function(f) {
            if (isNaN(f *= 1) || f < 0 || f > 20) f = 0;
            var s = '', x = this.valueOf(), m = '';
            if (this < 0) {
                s = '-';
                x *= -1;
            }
            if (x >= Math.pow(10, 21))
                m = x.toString();
            else {
                m = Math.round(Math.pow(10, f) * x).toString();
                if (f != 0) {
                    var k = m.length;
                    if (k <= f) {
                        var z = '00000000000000000000'.substring(0, f + 1 - k);
                        m = z + m;
                        k = f + 1;
                    }
                    var a = m.substring(0, k - f);
                    var b = m.substring(k - f);
                    m = a + '.' + b;
                }
            }
            if (m == '0') s = '';
            return s + m;
        }
    });