app.constant("apiURL","http://localhost:8100/")

    .factory('apiConnection', function($resource, apiURL) {
        var apiConnection = {
            loginUser: function(){
                return $resource();
            },
            getICD10s: function(){
                return $resource(apiURL + 'ICD10s');
            },
            saveICD10: function(){
                return $resource();
            }
        };
        return apiConnection
    });