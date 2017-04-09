/**
 * Created by YoYo on 2/28/17.
 */
angular.module('myApp', ['ngRoute'])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){// routeProvider is service
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when("/home",{
            controller:'homeCtrl'
        })
        .when("/view1", {
            templateUrl: "view1.html",
            controller: 'profileCtrl'
        })
        .when("/view2",{
            templateUrl:"view2.html",
            controller: 'View2Ctrll'
        })
        .when("/view3",{
            templateUrl:'view3.html',
            controller: 'View3Ctrl'
        })
        .when('/view2/newview', {
            templateUrl: 'newview.html',
            controller: 'DetailsCtrl'
        })
        .when('/view2/sendview', {
            templateUrl: 'sendview.html',
            controller: 'SendCtrl'
        })
        .otherwise({redirectTo: '/view1'});
}])
    .factory('storageService',function ($rootScope) {
        return {

            get: function (key) {
                return localStorage.getItem(key);
            },

            save: function (key, data) {
                localStorage.setItem(key, JSON.stringify(data));
            },

            remove: function (key) {
                localStorage.removeItem(key);
            },

            clearAll : function () {
                localStorage.clear();
            }
        };
    })
    .factory('cacheService',function ($http,storageService) {
        return {

            getData: function (key) {
                return storageService.get(key);
            },

            setData: function (key,data) {
                storageService.save(key, data);
            },

            removeData: function (key) {
                storageService.remove(key);
            }
        };

    })
    .factory('myService', function() {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }

    })
    .factory('myService', function() {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }

    })
    .factory('myService2', function() {
        var savedData = {}
        function set(data) {
            savedData = data;
        }
        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }

    })

            .controller('homeCtrl', ['$scope','$location','cacheService','$route',function($scope,$location,cacheService,$route) {
        $scope.Unlogged=function () {
            var token=localStorage.getItem('token');
            //   console.log(token);
            if(token){
                return false;
            }
            return true;
        }
        $scope.logged=function () {
            var token=localStorage.getItem('token');
            //   console.log(token);
            if(token){
                //alert("天天")

                return true;
            }
            return false;
        }
        $scope.out=function(){
            localStorage.removeItem('token');
            var str_all =JSON.parse(localStorage.getItem("city"));
            for(var k=0;k<str_all.length;k++){
                str_all[k].loginok="false";
            }
            cacheService.setData('city',str_all);

            $route.reload();
        }
    //    $location.path('/view1');
    }])
.controller('View2Ctrll', ['$scope','cacheService','$location','myService','myService2',function($scope,cacheService,$location,myService,myService2) {

    var msg = [
        { name:"John",sender: 1, title: 'Sayhi',username:2,star:'false',descryption:"Dear Anna Hope this letter finds you in the best of your health. I just wanted to write this letter to tell you that how much I think about you. You are always in my mind & thoughts.Although, there is so much distance between you and me, you are still my best friend. I still miss the moments we spent together and the secrets we shared with each other."},
        { name:"Anna",sender: 2, title: 'Thankyou letter',username:1,star:'false',descryption:"Dear FirstName,It was a pleasure to meet with you yesterday during my interview for Manager of the Marketing Department. I appreciated your well thought out questions, and hope that I was able to address them all thoroughly. I enjoyed the candor and humor that you showed during the interview, and I believe that my management style would work well in your group.I also appreciated you taking the time to share information on the Marketing team and the projects and events you are working on.You were very informative, and I am grateful for the insight you provided.Thank you very much for taking the time and consideration to meet with me. If you have any additional questions, please don't hesitate to contact me directly.Sincerely,FirstName LastNameEmailPhone"},
        { name:"Anna",sender: 2, title: 'Received letter',username:1,star:'true',descryption:"Dear (name),I am writing to let you know how very pleased I am with the education my son/daughter, (child's name) is receiving at (name of school).(Child's name) has had great success with (briefly say what is going right). In particular, (name the professionals working with your child and how they have made a difference).I look forward to (child's name) continuing progress. Thank you for all your efforts, and those of your staff.Sincerely,Your name"}
    ];
    //  var str_all,str_login=[];
    var str_login=[];
    if(localStorage.getItem("Messages")==null) {
        cacheService.setData('Messages', msg);
    }
    var str_msg =JSON.parse(localStorage.getItem("Messages"));
    var str_all=JSON.parse(localStorage.getItem("city"));
    // console.log(str_all.username);
    var token=localStorage.getItem("token");
    if(token){
        for(var j=0;j<str_msg.length;j++){
            if(str_msg[j].username===str_all.username){
                //   console.log(str_msg);
                str_login.push(str_msg[j]);

            }
        }
        cacheService.setData('Messages',str_login);
        myService.set(str_login);
        $scope.str_login=JSON.parse(localStorage.getItem("Messages"));
        //  console.log($scope.str_login);

    }
    // console.log(str_all);

    $scope.view=function (index) {

        $location.path('/view2/newview');
        myService2.set(index);
    }
    $scope.delete=function(index) {

        $scope.str_login.splice(index,1);
        console.log($scope.str_login);
        cacheService.setData('Messages',$scope.str_login);

    }
    $scope.sendMsg=function(){
        $location.path('/view2/sendview');
        //  alert("successfully send!");
    }

    $scope.rating = 5;
    $scope.rateFunction = function(rating) {
        alert('Rating selected - ' + rating);

    };
    //    $location.path('/view1');
}])
.controller('View3Ctrl', ['cacheService','$scope','$location','$rootScope','myService',function(cacheService,$scope,$location,$rootScope,myService) {
    var city = [
        { name:"John",username: 1, password: '111' ,email:'john@gmail.com',location:'2020 f street',contact:'2022888592',loginok:'false'},
        { name:"Anna",username: 2, password: '111' ,email:'anna@gmail.com',location:'2020 i street',contact:'2022882141',loginok:'false'}
    ];

    cacheService.setData('city', city);

    var str_all =JSON.parse(localStorage.getItem("city"));
    //       console.log(str_all[0].username);
    //    console.log(str_all[0].username[0]);


    $scope.isNull = function(value) {

        if (value == "")
            return true;
        else
            return false;

    };

    $scope.login = function() {


        for (var i = 0; i < str_all.length; i++) {
            if ($scope.username == str_all[i].username && $scope.password == str_all[i].password) {
              //   alert("ok");
                cacheService.setData('token', "true");
                str_all[i].loginok="true";
                cacheService.setData('city', str_all[i]);
                $location.path('/view1');

            }


        }
        $scope.isUnauth=function(username,password) {

            for (var i = 0; i < str_all.length; i++) {
                if ($scope.username == str_all[i].username && $scope.password == str_all[i].password) {
                    //  alert("ok");

                    return false;
                }

                else {
                    // cacheService.setData('token', "false");
                    return true;
                }
            }
        };


    };
    //    myService.set($scope.isUnauth);


    var promises = [];
    function makePromise(i, video) {
        promises[i] = new $.Deferred();
        // This event tells us video can be played all the way through, without stopping or buffering
        video.oncanplaythrough = function() {
            // Resolve the promise
            promises[i].resolve();
        }
    }
// Pause all videos and create the promise array
    $('video').each(function(index){
        this.pause();
        makePromise(index, this);
    })

// Wait for all promises to resolve then start playing
    $.when.apply(null, promises).done(function () {
        $('video').each(function(){
            this.play();
        });
    });

}


])
    .controller("profileCtrl",['$scope','cacheService',function($scope,cacheService){
        var str_all,str_login;
        var token=localStorage.getItem('token');
        if(token){
            $scope.str_login=JSON.parse(localStorage.getItem("city"));
        }
        if(localStorage.getItem("city")!==null) {


            str_all=JSON.parse(localStorage.getItem("city"));
            for(var k=0;k<str_all.length;k++){

                //  //     console.log($scope.str_all[k].loginok);

                if(str_all[k].loginok==='true'){

                    str_login=str_all[k];

                    cacheService.setData('city',str_login);
                    $scope.str_login=JSON.parse(localStorage.getItem("city"));
                    //    console.log($scope.str_login);
                }
            }

        }

        $scope.login=function(){
            if(token){
                return true;
            }
            return false;

        }

    }])
    .controller('DetailsCtrl',['$scope','cacheService','$location','myService','myService2',function($scope,cacheService,$location,myService,myService2) {
        // console.log("aaa");
        //  $scope.mmm="aaa";
        var str_details= myService.get();
        var index=myService2.get();
        // console.log(str_details[index].title);
        $scope.title=str_details[index].title;
        $scope.name=str_details[index].name;
        $scope.descryption=str_details[index].descryption;

    }])
    .controller('SendCtrl',['$scope','cacheService','$location','$rootScope',function ($scope,cacheService,$location,$rootScope) {
        //

        var str_msg =JSON.parse(localStorage.getItem("Messages"));
        var str_all=JSON.parse(localStorage.getItem("city"));
        // console.log(str_all.username);
        var token=localStorage.getItem("token");

        $scope.SuccessSend=function () {
            // alert($scope.mail);
            var str_login=[];var flag=0;
            if(token){
                // alert("fff");
                var sendmsg={name:str_all.name,sender: str_all.username, title:$scope.ttl,username:$scope.rec,star:'false',descryption:$scope.mail};
                // console.log(sendmsg);
                str_msg.push(sendmsg);
                console.log(str_msg);
                var receivemsg={name:str_all.name,sender: str_all.username, title:$scope.ttl,username:str_all.username,star:'false',descryption:$scope.mail};
                str_msg.push(receivemsg);
                for(var j=0;j<str_msg.length;j++){
                    if(str_msg[j].username===str_all.username){
                        //   console.log(str_msg);
                        str_login.push(str_msg[j]);
                        flag=1;

                    }
                }
                cacheService.setData('Messages',str_login);
                var history = [];


                if(flag==1){
                    //  $route.reload();
                    $location.path('/view2');
                    alert("Successfully send Message");
                }
                else{
                    alert("error, no this username");
                }
            }

        }
    }])
    .directive('makeStar',
        function() {

            return {
                restrict : 'A',
                template : '<ul id={{index}} class="rating">'
                + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
                + '\u2605'
                + '</li>'
                + '</ul>',
                scope : {
                    ratingValue : '=',
                    max : '=',
                    index: '=',
                    star: '=makeStar',
                    onRatingSelected : '&'
                },
                link : function(scope, elem, attrs,$index) {

                    //     var updateStars = function() {
                    //     scope.stars = [];
                    //     scope.ratingValue=0;
                    //     for ( var i = 0; i < scope.max; i++) {
                    //         scope.stars.push({
                    //             filled : i < scope.ratingValue
                    //         });
                    //     }
                    // };
                    var flag;

                    scope.stars = [];
                    scope.stars.push({
                        filled : false
                    });

//                     var updateStars2 = function() {
//                         flag=1;
//                         scope.stars = [];
// //console.log(scope.ratingValue);
//                         for ( var i = 0; i < scope.max; i++) {
//                             scope.stars.push({
//                                 filled : i < scope.ratingValue
//                             });
//                         }
//                     };

                    /*    var star_group=document.getElementsByClassName('rating');
                     // console.log(star_group[0].style.color);
                     //  star_group[0].style.color="#21568b";
                     var   str_star=JSON.parse(localStorage.getItem("Messages"));
                     var token=localStorage.getItem("token");
                     for(var j=0;j<str_star.length;j++){
                     if(str_star[j].star=='true'){
                     star_group[j].style.color="#21568b";
                     //      scope.style={"color":"red"};
                     //    alert(star_group[j].style.color);
                     }
                     }*/
                    ////////
                    var star_group=document.getElementsByClassName('rating');
                    jQuery(document).ready(function(){


                        console.log(star_group);
                        //  star_group[0].style.color="#21568b";
                        var   str_star=JSON.parse(localStorage.getItem("Messages"));
                        var token=localStorage.getItem("token");
                        for(var j=0;j<str_star.length;j++){
                            if(str_star[j].star=='true'){
                                //    star_group[j].style.color="#21568b";
                                jQuery(star_group[j]).css("color","#21568b");

                                //  $scope.color="color: #21568b";

                                //      scope.style={"color":"red"};
                                //    alert(star_group[j].style.color);
                            }
                        }
                    })

                    ///////////

                    /*   scope.toggle = function(index) {
                     scope.ratingValue = index + 1;
                     //    document.querySelector('.rating').addEventListener('click',function(){

                     /*     var str_star;
                     var token=localStorage.getItem("token");
                     if(token){
                     str_star=JSON.parse(localStorage.getItem("Messages"));
                     //   console.log(str_star);
                     for(var j=0;j<str_star.length;j++){
                     if(str_star[j].star=='true'){
                     //   alert(str_star[j]);
                     flag=1;
                     scope.stars = [];
                     scope.stars.push({
                     filled : false
                     });
                     //  console.log(scope.stars);
                     //    alert("star");
                     }
                     }
                     if(flag==0){
                     updateStars2();
                     }

                     }*/

                    /*     var star_group=document.querySelector('.rating');
                     //     console.log(star_group[0]);
                     updateStars2();

                     //  })
                     scope.onRatingSelected({

                     rating : index + 1

                     });*/
                    // scope.$watch('ratingValue',
                    //     function(oldVal, newVal) {
                    //         if (newVal) {
                    //             console.log(elem);
                    //
                    //         }
                    //     }
                    // );
                    //    };

                    elem.html(scope.star);
                    //  attrs.color="#21568b";
                    //    console.log( attrs);

                    elem.bind('click', function($index) {
                        // alert (attrs.style);
                        //  attrs.style="color: #21568b";

                        var id=scope.index;
                        //    var star_group=document.getElementsByClassName('rating');
                        jQuery(document).ready(function(){
                            // if(=="#21568b"){
                            var   str_star=JSON.parse(localStorage.getItem("Messages"));
                            console.log($(star_group[id]).css("color"));
                            if($(star_group[id]).css("color")=="rgb(33, 86, 139)"){
                                //  alert("get");
                                $(star_group[id]).css("color","lightgrey");
                                str_star[scope.index].star='false';
                                localStorage.setItem("Messages",JSON.stringify(str_star));
                                console.log( $(star_group[id]).css("color"));
                            }
                            else{
                                $(star_group[id]).css("color","#21568b");
                                str_star[scope.index].star='true';
                                localStorage.setItem("Messages",JSON.stringify(str_star));
                            }
                            //  }
                        })
                        //    console.log();

//                            star_group[id].style.color="#21568b";



                        /*    if(flag===1)  //  alert(scope.index);
                         {
                         if(token) {

                         //   console.log(str_star);
                         str_star[scope.index].star='true';
                         //    cacheService.setData('Messages',str_star);
                         localStorage.setItem("Messages",JSON.stringify(str_star));
                         //  console.log(localStorage.getItem("Messages"));
                         flag=0;
                         }

                         }
                         else{
                         str_star[scope.index].star='false';
                         localStorage.setItem("Messages",JSON.stringify(str_star));
                         flag=1;
                         }*/
                    });
                    //  scope.$watch('ratingValue',
                    //      function(oldVal, newVal) {
                    //          if (newVal) {
                    //              updateStars();
                    //          }
                    //     }
                    // );
                    //updateStars();
                    // document.querySelector('.rating').addEventListener('click',function(){
                    //     //alert("fff");
                    //
                    // //   alert("fff");
                    //    updateStars2();
                    // })
                }
            };
        }
    );

