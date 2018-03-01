var app = angular.module('Dashboard',['ui.router','ui.materialize', 'ngCsvImport', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard/home");

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'LoginCtrl'
        })
        // setup an abstract state for the dashboard directive
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            templateUrl: 'app/views/dashboard.html',
            animation: 'slide-in-up'
        })
        // Each tab has its own nav history stack:
        .state('dashboard.home', {
            url: '/home',
            views: {
                'dashboard': {
                    templateUrl: 'app/views/home.html',
                    controller: 'HomeCtrl'
                }
            },
            animation: 'slide-in-right'
        })
        .state('dashboard.upload', {
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
        })
});

app.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    })
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