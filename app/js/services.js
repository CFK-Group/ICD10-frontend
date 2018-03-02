app.constant("apiURL","http://localhost:8100/")

    .factory('apiConnection', function($resource, apiURL) {
        var apiConnection = {
            loginUser: function(){
                return $resource();
            },
            getICD10s: function(){
                return $resource(apiURL + 'ICD10s');
            },
            getICD10s: function(lastId, quantity){
                return $resource('ICD10/' + lastId + '/' + quantity);
            },
            countICD10s: function(){
                return $resource(apiURL + 'count/ICD10s')
            },
            saveICD10: function(){
                return $resource();
            },
            uploadCSV: function(){
                return $resource(apiURL + 'uploadCSV');
            }
        };
        return apiConnection
    });