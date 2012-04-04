    
    // $Id:$

    _class("Date", {
        customFormat : function(formatString) {
            var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhh, hh, h, mm, m, ss, s, ampm, dMod, th;
            YY = ((YYYY = this.getFullYear()) + "").substr(2, 2);
            MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
            MMM = (MMMM = [ "January", "February", "March", "April", "May",
                    "June", "July", "August", "September", "October",
                    "November", "December" ][M - 1]).substr(0, 3);
            DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
            DDD = (DDDD = [ "Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday" ][this.getDay()])
                    .substr(0, 3);
            th = (D >= 10 && D <= 20) ? 'th'
                    : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd'
                            : (dMod == 3) ? 'rd' : 'th';
            formatString = formatString.replace("#YYYY#", YYYY).replace(
                    "#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#",
                    MMM).replace("#MM#", MM).replace("#M#", M).replace(
                    "#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#",
                    DD).replace("#D#", D).replace("#th#", th);
            h = (hhh = this.getHours());
            if (h == 0) h = 24;
            if (h > 12) h -= 12;
            hh = h < 10 ? ('0' + h) : h;
            ampm = hhh < 12 ? 'am' : 'pm';
            mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
            ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;
            return formatString.replace("#hhh#", hhh).replace("#hh#", hh)
                    .replace("#h#", h).replace("#mm#", mm)
                    .replace("#m#", m).replace("#ss#", ss)
                    .replace("#s#", s).replace("#ampm#", ampm);
        },
        getMonthName : function() {
            return [ 'January', 'February', 'March', 'April', 'May',
                    'June', 'July', 'August', 'September', 'October',
                    'November', 'December' ][this.getMonth()];
        },
        daysInMonth : function() {
            return new Date(this.getFullYear(), this.getMonth() + 1, 0)
                    .getDate();
        },
        calendar : function() {
            // The number of days in the month.
            var numDays = this.daysInMonth();
            // Get the starting day of this calendar, mon, tue, wed, etc.
            var startDay = new Date(this.getFullYear(), this.getMonth(), 1)
                    .getDay();
            // We'll build our table in the buildStr variable then pass what
            // we build back.
            // This will be a HTML table -- Build the header rows...
            var buildStr = '<table summary="Calendar" class="calendar" style="text-align: center">';
            buildStr += '<tr><td colspan=7>' + this.getMonthName() + ' '
                    + this.getFullYear() + '</td></tr>';
            buildStr += '<tr><td>Sun</td><td>Mon</td><td>Tue</td>';
            buildStr += '<td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td></tr>';
            buildStr += '<tr>';
            // Create blank boxes until we get to the day which actually
            // starts the month
            for ( var i = 0; i < startDay; i++) {
                buildStr += '<td>&nbsp;</td>';
            }
            // Border is a counter, initialize it with the number of "blank"
            // days at the
            // start of the calendar. Now each time we add a new date we'll
            // do a modulus
            // 7 and check for 0 (remainder of border/7 = 0), if it's zero
            // it's time to
            // make a new row.
            var border = startDay;
            // For each day in the month, insert it into the calendar.
            for (i = 1; i <= numDays; i++) {
                buildStr += '<td>' + i + '</td>';
                border++;
                if (((border % 7) == 0) && (i < numDays)) {
                    // Time to start a new row, if there are any days left.
                    buildStr += '</tr><tr>';
                }
            }
            // All the days have been used up, so just pad empty days until
            // the
            // end of the calendar.
            while ((border++ % 7) != 0) {
                buildStr += '<td>&nbsp;</td>';
            }
            // Finish the table.
            buildStr += '</tr>';
            buildStr += '</table>';
            // return it.
            return buildStr;
        }
    });