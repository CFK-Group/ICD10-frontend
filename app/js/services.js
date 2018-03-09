app.constant("apiURL","http://localhost:8100/")

    .factory('apiConnection', function($resource, apiURL) {
        var apiConnection = {
            login: function(){
                return $resource(apiURL + 'login');
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
        return apiConnection;
    })

    .factory('$global', function($cookies, $state){
        var $global = {
            checkAuth: function () {
                var token = $cookies.get('token');
                var auth = $cookies.get('auth');
                if (!token) {

                    $state.go('login', {obj: {Error: 'Problemas en sus datos de inicio de sesion'}})
                } else {
                    //console.log('Existe token, valor: ' + token);
                    if (auth) {
                        return true
                    } else {
                        $state.go('login', {obj: {Error: 'Usuario no autorizado'}})
                    }
                }
            },
            logout: function () {
                console.log('logout');
                $cookies.remove('token');
                $cookies.remove('auth', false);
                $state.go('login', {obj: {Success: 'Sesión cerrada correctamente'}})
            }
        };
        return $global;
})