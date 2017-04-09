/**
 * Created by YoYo on 2/28/17.
 */
'use strict';

angular.module('myApp.version.interpolate-filter', [])

    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);
