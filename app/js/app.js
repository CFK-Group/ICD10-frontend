var app = angular.module('Dashboard',['ui.router','ui.materialize','ngResource','ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'LoginCtrl',
            params: {
                obj: null
            }
        })
        // setup an abstract state for the dashboard directive
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardCtrl',
            animation: 'slide-in-up'
        })
        // Each tab has its own nav history stack:
        .state('dashboard.home', {
            url: '/home',
            views: {
                'content': {
                    templateUrl: 'app/views/home.html',
                    controller: 'HomeCtrl'
                }
            },
            animation: 'slide-in-right'
        })


        .state('channels', {
            url: '/channels',
            abstract: true,
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardCtrl',
            animation: 'slide-in-up'
        })
        .state('channels.list', {
            url: '/list',
            views: {
                'content':{
                    templateUrl: 'app/views/channels.html',
                    controller: 'ChannelCtrl'
                }
            },
            animation: 'slide-in-left'
        })
        .state('channels.new', {
            url: '/new',
            views: {
                'content':{
                    templateUrl: 'app/views/newChannel.html',
                    controller: 'NewChannelCtrl'
                }
            },
            animation: 'slide-in-left'
        })
        .state('campaigns', {
            url: '/campaigns',
            abstract: true,
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardCtrl',
            animation: 'slide-in-up'
        })
        .state('campaigns.list', {
            url: '/list',
            views: {
                'content':{
                    templateUrl: 'app/views/campaigns.html',
                    controller: 'CampaignCtrl'
                }
            },
            animation: 'slide-in-left'
        })
        .state('campaigns.new', {
            url: '/new',
            views: {
                'content':{
                    templateUrl: 'app/views/newCampaign.html',
                    controller: 'NewCampaignCtrl'
                }
            },
            animation: 'slide-in-left'
        })
        /*.state('dashboard.upload', {
            url: '/upload',
            views: {
                'dashboard': {
                    templateUrl: 'app/views/upload.html',
                    controller: 'UploadCtrl'
                }
            },
            animation: 'slide-in-left'
        })
        .state('dashboard.icd10s', {
            url: '/icd10s',
            views: {
                'dashboard': {
                    templateUrl: 'app/views/icd10s.html',
                    controller: 'Icd10sCtrl'
                }
            },
            animation: 'slide-in-left'
        })*/
});

app.run(function($rootScope, $cookies, $state){
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});

app.directive('filesModel', function($parse){
    return {
        restrict: 'A',
        link: function(scope, iElement, iAttrs){
            iElement.on('change', function(e){
                $parse(iAttrs.filesModel).assign(scope, iElement[0].files[0]);
            })
        }
    }
});

app.directive('fileReader', function() {
    return {
        scope: {
            fileReader:"="
        },
        link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        var contents = e.target.result;
                        scope.$apply(function () {
                            scope.fileReader = contents;
                            scope.testing = contents;
                        });
                    };

                    r.readAsText(files[0]);
                }
            });
        }
    };
});