
    _class("I18n", {
        
        static_locale : 'de_DE',
        static_localePath : '/locale',
        static_textDomain : null,
        static_dictionary : [],

        static_setLocale : function(locale) {
            I18n.locale = locale;
        },

        static_setTextDomain : function(textDomain) {
            var dummyContent = '#: models/WPSICCBooking.class.php:428\n'
                    + '#: models/WPSICCBooking.class.php:672\n'
                    + 'msgid "Frau"\n'
                    + 'msgstr "Frau"\n'
                    +

                    '#: models/WPSICCBooking.class.php:473\n'
                    + '#: models/WPSICCBooking.class.php:716\n'
                    + 'msgid "Achtung"\n'
                    + 'msgstr "Achtung"\n'
                    +

                    '#: models/WPSICCBooking.class.php:474\n'
                    + '#: models/WPSICCBooking.class.php:716\n'
                    + 'msgid "Bitte &uuml;berpr&uuml;fen Sie rechtzeitig die aktuellen Einreisebedingungen der angefahrenen L&auml;nder Ihrer Kreuzfahrt! Die aktuellen Einreisebestimmungen erfahren Sie beim Ausw&auml;rtigen Amt bzw. Ihrem zust&auml;ndigen Konsulat. F&uuml;r deutsche / &ouml;sterreichische und Schweizer Staatsb&uuml;rger ist ein maschinenlesbarer Reisepass Voraussetzung (Kinder eingeschlossen)."\n'
                    + 'msgstr "Bitte &uuml;berpr&uuml;fen Sie rechtzeitig die aktuellen Einreisebedingungen der angefahrenen L&auml;nder Ihrer Kreuzfahrt! Die aktuellen Einreisebestimmungen erfahren Sie beim Ausw&auml;rtigen Amt bzw. Ihrem zust&auml;ndigen Konsulat. F&uuml;r deutsche / &ouml;sterreichische und Schweizer Staatsb&uuml;rger ist ein maschinenlesbarer Reisepass Voraussetzung (Kinder eingeschlossen)."\n'

                    '#: models/WPSICCBooking.class.php:548\n'
                    + 'msgid "Reiseb&uuml;ro"' + 'msgstr "Reiseb&uuml;ro"\n';

            I18n.textDomain = textDomain;                    

            var test = new String('asd msgid "Hier ist was drin..." asd asd as d ');
            /*startPos = test.search(/msgid\s\"/);
            test = test.replace(/msgid\s\"/, "");
            testLookBehind = test.substring(startPos);
            console.log(testLookBehind.match(/^.[^\"]+/));*/

            console.log(test.matchLookBehind(/msgid\s\"/, /^.[^\"]+/));
            
            console.log(test.matchLookAhead(/msgid\s\"/, "Hier"));
                    
                    
            // TODO: Load .po file for locale and textdomain, for example:
            // /locale/de_DE/LC_MESSAGES/myPHPApp.mo
            // var translations = dummyContent.match(/msgid\s\".+[^\"]\"(?:\r\n|\n\r|\n|\r)msgstr\s\".+[^\"]/);
            var translationIds = dummyContent.match(/msgid\s\".+[^\"]\"/);
            var translationStrings = dummyContent.match(/msgstr\s\".+[^\"]\"/);
            
            // console.log(translationIds);
            // console.log(translationStrings);
            /*if (translationIds.length == translationStrings.length) {
                for ( var i = 0; i < translationIds.length; i++) {
                    var msgid = translationIds[i].match(/(msgid\s\")?\"/g,
                            function($0, $1) {
                                return $1 ? $1 : $0;
                            });
                    var msgstr = translationStrings[i].match(/(msgstr\s\")?\"/g,
                            function($0, $1) {
                                return $1 ? $1 : $0;
                            });
                   //  var msgidMd5 = Encrypt.md5(msgid);

                    I18n.dictionary.push({
                        msgidMd5 : [ msgid, msgstr ]
                    });
                }
            }*/
        },

        static_gettext : function(string) {
            alert('gettext("' + string + '")');
        },
        static__ : function(string) {
            return I18n.gettext(string);
        }

    });

    /*I18n.setLocale('de_DE');
    I18n.setTextDomain('appName');
    I18n.gettext('teststring');
    I18n._('teststring');*/