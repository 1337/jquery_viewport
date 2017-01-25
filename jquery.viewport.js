/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
}(this, function ($) {
    "use strict";

    var belowTheFold = function (element, settings) {
            var fold = $(window).height() + $(window).scrollTop();
            return fold <= Math.round($(element).offset().top) - settings.threshold;
        },
        belowTheFoldCompletely = function (element, settings) {
            var fold = $(window).height() + $(window).scrollTop();
            return fold <= $(element).offset().top + $(element).height() - settings.threshold;
        },
        aboveTheTop = function (element, settings) {
            var top = $(window).scrollTop();
            return top >= Math.round($(element).offset().top) + $(element).height() - settings.threshold;
        },
        aboveTheTopCompletely = function (element, settings) {
            var top = $(window).scrollTop();
            return top >= $(element).offset().top - settings.threshold;
        },
        rightOfScreen = function (element, settings) {
            var fold = $(window).width() + $(window).scrollLeft();
            return fold <= $(element).offset().left - settings.threshold;
        },
        rightOfScreenCompletely = function (element, settings) {
            var fold = $(window).width() + $(window).scrollLeft();
            return fold <= $(element).offset().left + $(element).width() - settings.threshold;
        },
        leftOfScreen = function (element, settings) {
            var left = $(window).scrollLeft();
            return left >= Math.round($(element).offset().left) + $(element).width() - settings.threshold;
        },
        leftOfScreenCompletely = function (element, settings) {
            var left = $(window).scrollLeft();
            return left >= $(element).offset().left - settings.threshold;
        },
        inViewport = function (element, settings) {
            var $element = $(element),
                offset = $element.offset();

            // Return false if element is hidden.
            if (!$element.is(':visible')) {
                return false;
            }

            var $window = $(window),
                windowTop = $window.scrollTop(),
                threshold = settings.threshold;

            if (offset.top - threshold < windowTop) {
                if (offset.top + $element.height() + threshold >= windowTop) {
                    // top edge below the window's top
                } else {
                    return false;
                }
            } else {
                if (offset.top - threshold <= windowTop + $window.height()) {
                    // bottom edge above the window's bottom
                } else {
                    return false;
                }
            }

            var windowLeft = $window.scrollLeft();

            if (offset.left - threshold < windowLeft) {
                if (offset.left + $element.width() + threshold >= windowLeft) {
                    // left edge be on the left side of the window's left edge
                } else {
                    return false;
                }
            } else {
                if (offset.left - threshold <= windowLeft + $window.width()) {
                    // right edge be on the right side of the window's right edge
                } else {
                    return false;
                }
            }

            return true;
        };

    $.belowTheFold = function(element, settings) {
        return belowTheFold(element, settings);
    };

    $.belowTheFoldCompletely = function(element, settings) {
        return belowTheFoldCompletely(element, settings);
    };

    $.aboveTheTop = function(element, settings) {
        return aboveTheTop(element, settings);
    };

    $.aboveTheTopCompletely = function(element, settings) {
        return aboveTheTopCompletely(element, settings);
    };

    $.rightOfScreen = function(element, settings) {
        return rightOfScreen(element, settings);
    };

    $.rightOfScreenCompletely = function(element, settings) {
        return rightOfScreenCompletely(element, settings);
    };

    $.leftOfScreen = function(element, settings) {
        return leftOfScreen(element, settings);
    };

    $.leftOfScreenCompletely = function(element, settings) {
        return leftOfScreenCompletely(element, settings);
    };

    $.inViewport = function (element, settings) {
        return inViewport(element, settings);
    };

    $.extend($.expr[':'], {
        "below-the-fold": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return belowTheFold(a, {threshold: parseInt(m[3]) || 0});
        },
        "below-the-fold-completely": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return belowTheFoldCompletely(a, {threshold: parseInt(m[3]) || 0});
        },
        "above-the-top": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return aboveTheTop(a, {threshold: parseInt(m[3]) || 0});
        },
        "above-the-top-completely": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return aboveTheTopCompletely(a, {threshold: parseInt(m[3]) || 0});
        },
        "left-of-screen": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return leftOfScreen(a, {threshold: parseInt(m[3]) || 0});
        },
        "left-of-screen-completely": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return leftOfScreenCompletely(a, {threshold: parseInt(m[3]) || 0});
        },
        "right-of-screen": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return rightOfScreen(a, {threshold: parseInt(m[3]) || 0});
        },
        "right-of-screen-completely": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return rightOfScreenCompletely(a, {threshold: parseInt(m[3]) || 0});
        },
        "in-viewport": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return inViewport(a, {threshold: parseInt(m[3]) || 0});
        },
        "in-viewport-completely": function (a, i, m) {
            // m[3] is supposedly the threshold (@theluk)
            return inViewportCompletely(a, {threshold: parseInt(m[3]) || 0});
        }
    });
}));
