/**
 * Created by YoYo on 2/28/17.
 */
'use strict';

angular.module('myApp.version.version-directive', [])

    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);
