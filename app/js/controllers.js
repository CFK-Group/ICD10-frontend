app.controller('HomeCtrl', function ($scope) {
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

.controller('UploadCtrl', function($scope){
    $scope.uploadFile = function(){
        var name = $scope.csv.file.name;
        var file = $scope.csv.file;
    }
})

.controller('Icd10sCtrl', function($scope, apiConnection, $rootScope){
    apiConnection.getICD10s().query().$promise.then(
        function(response){
            $rootScope.icd10s = JSON.parse(JSON.stringify(response));
        },
        function(err){
            console.log('Error: ', err);
            throw err
        }
    )
})

;
