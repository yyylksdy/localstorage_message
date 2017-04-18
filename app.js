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
    .factory('myService3', function() {
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
    .factory('myService4', function() {
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
    .factory('myService5', function() {
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
    // .factory('selectedItem', function () {
    //     return {
    //         price: '',
    //         color: ''
    //     }
    // })

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
.controller('View2Ctrll', ['$scope','cacheService','$location','myService','myService2','myService3','myService4','myService5',function($scope,cacheService,$location,myService,myService2,myService3,myService4,myService5) {

   // document.getElementById('op').selectedIndex = '0';
    $scope.size = ["S", "M", "L"];
     $scope.color = ["Blue", "Black", "Silver", "Brown","Camel"];
    //


    // $scope.productlist = {};
    // $scope.productlist.productId = "1";

    $scope.products = [{
        id: "1",
        size: "S",
        color:"Blue",
        orgprice:"799",
        price:"$500",
        itemPic:"https://img.stylebop.com/look/500x750/df/82464_f.jpg"
    }, {
        id: "2",
        size: "M",
        color:"Black",
        orgprice:"790",
        price:"$600",
        itemPic:"https://img.stylebop.com/look/500x750/ca/71808_f.jpg"
    },
        {
        id: "3",
            size: "L",
            color:"Silver",
            orgprice:"888",
            price:"$700",
            itemPic:"https://img.stylebop.com/look/500x750/f3/84489_f.jpg"
    }, {
        id: "4",
            size: "S",
            color:"Camel",
            orgprice:"1109",
            price:"$800",
            itemPic:"https://img.stylebop.com/look/500x750/18/72035_f.jpg"
    },
        {
            id: "5",
            size: "M",
            color:"Camel",
            orgprice:"1199",
            price:"$900",
            itemPic:"https://img.stylebop.com/look/500x750/df/82464_f.jpg"
        },
        {
            id: "6",
            size: "L",
            color:"Black",
            orgprice:"1599",
            price:"$1000",
            itemPic:"https://img.stylebop.com/look/500x750/ca/71808_f.jpg"
        }
    ];
    $scope.itemPic="https://img.stylebop.com/look/500x750/ca/71808_f.jpg";
    $scope.price="$1000";
    $scope.orgprice="$1599";
    //$scope.products.size="S";
 //   document.getElementById('op').selectedIndex = '2';
$scope.isNull=0;

    $scope.selectedSizeChanged=function(){
       $scope. isNull++;
        myService2.set($scope.selectedSize);
        $scope.products.forEach(function(item){
            if($scope.selectedSize===item.size){
                $scope.price=item.price;
                $scope.orgprice=item.orgprice;
                myService3.set($scope.price);
                myService4.set($scope.orgprice);
                $scope.itemPic=item.itemPic;

            }
        })

    };

    $scope.selectedColorChanged=function(){
       $scope. isNull++;
       console.log($scope.selectedColor);
        myService.set($scope.selectedColor);
        $scope.products.forEach(function(item){
            if($scope.selectedColor===item.color){
                $scope.price=item.price;
                $scope.orgprice=item.orgprice;
                myService3.set($scope.price);
                myService4.set($scope.orgprice);
                $scope.itemPic=item.itemPic;

            }
        });

        if($scope.isNull===2){
            console.log("color and size selected");

        }

    };

    $scope.sendMsg=function(){
        $scope.isNull++;
        //  $location.path('/view2/sendview');
        //  alert("successfully send!");
      // console.log();
        console.log(parseInt($scope.quantity))
        if($scope.isNull>=3 && parseInt($scope.quantity).toString()!= 'NaN' ){
            myService5.set($scope.quantity);
         //   console.log("complete");
            $location.path('/view2/sendview');
        }
        else{
            alert("Please select all the artributes and quantity should be a number !");
        }
    }










    //    $location.path('/view1');
}])
    .controller('SendCtrl',['$scope','cacheService','$location','$rootScope','myService','myService2','myService3','myService4','myService5',function ($scope,cacheService,$location,$rootScope,myService,myService2,myService3,myService4,myService5) {
        //



        $scope.SuccessSend=function () {

      //      $scope.str_login.push($scope.addr1);
            // console.log($scope.addr1);
            $scope.shippingaddress = ($scope.addr1 ? $scope.addr1+" " : "")+($scope.addr2 ? $scope.addr2+" " : "")+($scope.city ? $scope.city+" " : "")+($scope.state ? $scope.state+" " : "")+($scope.zip ? $scope.zip : "");
            console.log(myService.get());
            $scope.color=myService.get();
            $scope.size=myService2.get();
            $scope.price=myService3.get();
            $scope.orgprice=myService4.get();
            $scope.quantity=myService5.get();



        }
    }])
.controller('View3Ctrl', ['cacheService','$scope','$location','$rootScope','myService',function(cacheService,$scope,$location,$rootScope,myService) {
    var city = [
        { name:"John",username: 1, password: '111' ,email:'john@gmail.com',location:'2020 f street',contact:'2022142512',loginok:'false'},
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
        // var str_details= myService.get();
        // var index=myService2.get();
        // // console.log(str_details[index].title);
        // $scope.title=str_details[index].title;
        // $scope.name=str_details[index].name;
        // $scope.descryption=str_details[index].descryption;


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

