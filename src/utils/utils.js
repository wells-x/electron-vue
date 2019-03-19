/**
 * Author: huangzhiyang
 * Date: 2016/9/2 17:28
 * Description: ""
 */
let ParseTemplate = function (text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    let _ = {};
    let idCounter = 0;
    let MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    let isArrayLike = function (collection) {
        let length = collection != null && collection.length;
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    let optimizeCb = function (func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (value) {
                    return func.call(context, value);
                };
            case 2:
                return function (value, other) {
                    return func.call(context, value, other);
                };
            case 3:
                return function (value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function (accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }
        return function () {
            return func.apply(context, arguments);
        };
    };
    _["each"] = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        let i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            for (let i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                iteratee(obj[i], i, obj);
            }
        }
        return obj;
    };
    _["uniqueId"] = function (prefix) {
        let id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    let templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    let noMatch = /(.)^/;

    let escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    let escaper = /[\\'\r\n\u2028\u2029]/g;

    let escapeChar = function (match) {
        return '\\' + escapes[match];
    };

    if (!settings) settings = {};
    for (let i in templateSettings) if (typeof settings[i] === "undefined") settings[i] = templateSettings[i];


    // Combine delimiters into one regular expression via alternation.
    let matcher = RegExp([
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    let index = 0;
    let source = "__p+='";
    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escaper, escapeChar);
        index = offset + match.length;

        if (escape) {
            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } else if (interpolate) {
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
            source += "';\n" + evaluate + "\n__p+='";
        }

        // Adobe VMs need the match returned to produce the correct offest.
        return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "let __t,__p='',__j=Array.prototype.join," +
        "print=function(){__p+=__j.call(arguments,'');};\n" +
        source + 'return __p;\n';

    let render;
    try {
        render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
        e.source = source;
        throw e;
    }

    let template = function (data, cxt) {
        return render.call(cxt || this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    let argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
};

export {
    ParseTemplate,
};
