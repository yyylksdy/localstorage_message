/**
 * Created by YoYo on 2/28/17.
 */
'use strict';

angular.module('myApp.version', [
    'myApp.version.interpolate-filter',
    'myApp.version.version-directive'
])

    .value('version', '0.1');
