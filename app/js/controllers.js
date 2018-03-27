app
.controller('LoginCtrl', function($scope, $stateParams, apiConnection, $state, $cookies){
    $scope.loading = false;
    if ($stateParams.obj){
        if ($stateParams.obj.Error){
            $scope.error = $stateParams.obj.Error;
            $scope.success = '';
        }else if($stateParams.obj.Success) {
            $scope.success = $stateParams.obj.Success;
            $scope.error = '';
        }else{
            $scope.error = '';
            $scope.success = '';
        }
    }else{
        $scope.error = '';
        $scope.success = '';
    }

    $scope.login = function(){
        $scope.loading = true;
        apiConnection.login().save($scope.loginForm).$promise.then(
            function (response) {
                $scope.loading = false;
                $cookies.put('token', response.token);
                $cookies.put('auth', response.auth);
                $state.go('dashboard.home');
            },
            function (err){
                $scope.loading = false;
                $scope.statusText = err.statusText;
                $scope.status = err.status;

                if ($scope.status === -1 || $scope.status === 500){
                    $scope.error = 'Error en la plataforma, contacte al soporte de la plataforma, ' + $scope.status + ', ' + $scope.statusText;
                }else if($scope.status === 401 || $scope.status === 404) {
                    $scope.error = 'Error de usuario o contraseña';
                }

            }
        );

    }
})
.controller('DashboardCtrl', function($scope, $state$, $global){
    $scope.logout = function () {
        $global.logout();
    };
})
.controller('HomeCtrl', function ($scope, $cookies, $state, $rootScope, $global) {
    //Verifica si el usuario esta logeado, sino lo devuelve al login
    $global.checkAuth();
    var chartData = {
        type: 'line',  // Specify your chart type here.
        "scale-x": {
            "labels": [" ","LBAR","LCON","LFLO","MACU","MAIP","NUNO","PALT","PENA","VITA"]
        },
        title: {
            text: 'My First Chart' // Adds a title to your chart
        },
        legend: {}, // Creates an interactive legend
        series: [  // Insert your series data here.
            { values: [0, 42, 67, 89, 42, 67, 89, 42, 67, 89]},
            { values: [0, 40, 39, 36, 42, 67, 89, 42, 67, 89]},
            { values: [0, 53, 20, 55, 42, 67, 89, 42, 67, 89]},
            { values: [0, 24, 53, 80, 42, 67, 89, 42, 67, 89]}
        ]
    };
    zingchart.render({ // Render Method[3]
        id: 'chartDiv',
        data: chartData
    });
    zingchart.render({ // Render Method[3]
        id: 'chartDiv2',
        data: chartData
    });
    zingchart.render({ // Render Method[3]
        id: 'chartDiv3',
        data: chartData
    });
})
.controller('ChannelCtrl', function($scope, $global, apiConnection, $cookies){
    $global.checkAuth();
    $token = $cookies.get('token');
    $scope.channels = apiConnection.getChannels($token).query();
})
.controller('NewChannelCtrl', function($scope, $global, apiConnection, $cookies) {
    $global.checkAuth();
    $scope.loading = false;
    $global.checkAuth();
    $token = $cookies.get('token');
    $scope.channelForm = {
        nombreCanal: '',
        nGrilla: '',
        nTB: '',
        nNetwork: ''
    };

    $scope.submit = function(){
        $scope.loading = true;
        console.log($scope.channelForm);
        apiConnection.saveChannel($token).save($scope.channelForm).$promise.then(
            function(response){
                $scope.loading = false;
                Materialize.toast('Canal '+$scope.channelForm.nombreCanal+' Guardado Correctamente', 3000, 'green');
                $scope.channelForm = {
                    nombreCanal: '',
                    nGrilla: '',
                    nTB: '',
                    nNetwork: ''
                };
                console.log('OK: ', response);
            },
            function (err) {
                $scope.loading = false;
                Materialize.toast('No se ha podido guardar el Canal '+$scope.channelForm.nombreCanal, 3000, 'red');
                console.log('Error!!!!: ', err);
            }
        );
    }

})
.controller('CampaignCtrl', function($scope, $global, apiConnection, $cookies){
    $global.checkAuth();
    $token = $cookies.get('token');
    $scope.campaigns = apiConnection.getCampaigns($token).query();
    console.log($scope.campaigns);
})
.controller('NewCampaignCtrl', function($scope, apiConnection, $global, $cookies){
    $global.checkAuth();
    $scope.loading = false;
    $scope.ordersAdded = 0;
    $global.checkAuth();
    $token = $cookies.get('token');
    $scope.campaignForm = {
        nombre: '',
        orderid: '',
        Inicio: '',
        fin: '',
        orderlines: [{
            numero: '',
            nombre: '',
            prioridad: '',
            spot_id: ''
        }],
        hhTags:[{tag:'none'}, {tag: 'ninguno'}]
    };

    $scope.chips = ['Apple','Microsoft', 'Google'];

    $scope.spots = [
        {seachangeCode: 33098, id:1}
    ];

    $scope.addOrderline = function(){
        $scope.campaignForm.orderlines.push({
            numero: '',
            nombre: '',
            prioridad: '',
            spot_id: ''
        });
    };


    $scope.submit = function(){
        console.log("Enviando data para ser procesada");
        console.table($scope.campaignForm);
        $scope.loading = true;

        apiConnection.saveCampaign($token).save($scope.campaignForm).$promise.then(
            function(response){
                $scope.loading = false;
                Materialize.toast('Canal '+$scope.campaignForm.nombre+' Guardado Correctamente', 3000, 'green');
                $scope.campaignForm = {
                    nombre: '',
                    orderid: '',
                    Inicio: '',
                    fin: '',
                    orderlines: [{
                        numero: '',
                        nombre: '',
                        prioridad: '',
                        spot_id: ''
                    }]
                };
                console.log('OK: ', response);
            },
            function (err) {
                $scope.loading = false;
                Materialize.toast('No se ha podido guardar el Canal '+$scope.campaignForm.nombre, 3000, 'red');
                console.log('Error!!!!: ', err);
            }
        );

    }

})
.controller('SpotCtrl', function($scope, $global, apiConnection, $cookies){
    $global.checkAuth();
    $token = $cookies.get('token');
    var agiSpots = apiConnection.getSpots($token, 'agi').query();
    var assetSpots = apiConnection.getSpots($token, 'asset').query();
    $scope.spots = [
        {tipo: 'Agis', codes: agiSpots},
        {tipo: 'Assets', codes: assetSpots}
    ];
    console.log($scope.spots);
})
.controller('NewSpotCtrl', function($scope, $global){
    $global.checkAuth();
})


/*
.controller('UploadCtrl', function($scope, apiConnection){
    $scope.csvToJson = function(csv){

        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(";");
        for(var i = 1; i < lines.length; i++){
            var obj = {};
            var currentline = lines[i].split(";");
            for(var j = 0; j < headers.length; j++){
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result //JSON
    };
    $scope.uploadFile = function(){
        $scope.icd10s = $scope.csvToJson($scope.csv.file);

        apiConnection.uploadCSV().save($scope.icd10s).$promise.then(
            function(data){
                console.log(data);
                alert('archivo enviado');
            },
            function(err){
                console.log("Error: ", err);
                alert('error');
            }
        )
    }
})

.controller('Icd10sCtrl', function($scope, apiConnection, $rootScope){
    $scope.quantity = 100;
    apiConnection.getICD10s(1, $scope.quantity).query().$promise.then(
        function(response){
            $rootScope.icd10s = JSON.parse(JSON.stringify(response));
        },
        function(err){
            console.log('Error: ', err);
            throw err
        }
    );
    apiConnection.countICD10s().query().$promise.then(
        function(response){
            $rootScope.icd10Quantity = JSON.parse(JSON.stringify(response))[0].number;
        },
        function(err){
            throw err
        }
    );
    $scope.changePage = function(lastId){
        apiConnection.getICD10s(lastId, $scope.quantity).query().$promise.then(
            function(response){
                $rootScope.icd10s = JSON.parse(JSON.stringify(response));
            },
            function(err){
                console.log('Error: ', err);
                throw err
            }
        );
    }
})
*/


;
