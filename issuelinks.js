/*\
title: $:/plugins/alexruetz/tiddly-issuelinks/issuelinks.js
type: application/javascript
module-type: wikirule

\*/
(function () {

    /*jslint node: true, browser: true */
    /*global $tw: false */
    "use strict";

    // var URL_TID = "$:/config/tiddly-issuelinks/url";
    exports.name = "issuelinks";
    exports.types = { inline: true };

    exports.init = function (parser) {
        this.parser = parser;
        // Regexp to match
        this.matchRegExp = /[A-Z]+\-[0-9]+/mg;
    };

    /*
    Parse the most recent match
    */
    exports.parse = function () {
		
		var configWidgetTitle = "$:/plugins/alexruetz/tiddly-issuelinks/config";
		var configWidgetFields = $tw.wiki.getTiddler(configWidgetTitle).fields;
		var url = configWidgetFields.issuetrackerurl;
        // Get the details of the match
        var linkText = this.match[0];
        // Move past the macro call
        this.parser.pos = this.matchRegExp.lastIndex;

        if (url.length === 0) {
            return [{ type: "text", text: linkText }];
        }

        return [{
            type: "element",
            tag: "a",
            attributes: {
                href: { type: "string", value: url + linkText},
                "class": { type: "string", value: "tc-tiddlylink-external" },
                target: { type: "string", value: "_blank" },
                rel: { type: "string", value: "noopener noreferrer" }
            },
            children: [{
                type: "text", text: linkText
            }]
        }];
    };

})();
