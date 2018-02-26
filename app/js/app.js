var app = angular.module('Dashboard',['ui.router','ui.materialize']);

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
});

app.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    })
});