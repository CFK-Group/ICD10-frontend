"use strict";
angular.module("ngLocale", [], ["$provide", function (e) {
    var o = "one", r = "other";
    e.value("$locale", {
        DATETIME_FORMATS: {
            AMPMS: ["a. m.", "p. m."],
            DAY: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            ERANAMES: ["antes de Cristo", "después de Cristo"],
            ERAS: ["a. C.", "d. C."],
            FIRSTDAYOFWEEK: 0,
            MONTH: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            SHORTDAY: ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."],
            SHORTMONTH: ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sept.", "Oct.", "Nov.", "Dic."],
            STANDALONEMONTH: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            WEEKENDRANGE: [5, 6],
            fullDate: "EEEE, d 'de' MMMM 'de' y",
            longDate: "d 'de' MMMM 'de' y",
            medium: "d MMM y H:mm:ss",
            mediumDate: "d MMM y",
            mediumTime: "H:mm:ss",
            short: "d/M/yy H:mm",
            shortDate: "d/M/yy",
            shortTime: "H:mm"
        },
        NUMBER_FORMATS: {
            CURRENCY_SYM: "€",
            DECIMAL_SEP: ",",
            GROUP_SEP: ".",
            PATTERNS: [{
                gSize: 3,
                lgSize: 3,
                maxFrac: 3,
                minFrac: 0,
                minInt: 1,
                negPre: "-",
                negSuf: "",
                posPre: "",
                posSuf: ""
            }, {
                gSize: 3,
                lgSize: 3,
                maxFrac: 2,
                minFrac: 2,
                minInt: 1,
                negPre: "-",
                negSuf: " ¤",
                posPre: "",
                posSuf: " ¤"
            }]
        },
        id: "es-es",
        localeID: "es_ES",
        pluralCat: function (e, m) {
            return 1 == e ? o : r
        }
    })
}]);