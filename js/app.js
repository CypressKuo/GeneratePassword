angular.module('genpwApp', [])

.controller('genpw', ['$scope', function($scope) {
    $scope.group_number = 1;
    $scope.password_length = 1;
    $scope.have_number = true;
    $scope.have_upper = true;
    $scope.have_lower = true;
    $scope.have_symbol = true;
    $scope.no_similarity = true;

    $scope.generate = function() {
        var password_group = '';
        var results = [];

        if ($scope.have_number) {
            password_group += '0123456789';
        }
        if ($scope.have_upper) {
            password_group += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if ($scope.have_lower) {
            password_group += 'abcdefghijklmnopqrstuvwxyz';
        }
        if ($scope.have_symbol) {
            password_group += '!@#$%^&*';
        }
        if ($scope.no_similarity) {
            password_group = str_replace('!', '', password_group);
            password_group = str_replace('1', '', password_group);
            password_group = str_replace('l', '', password_group);
            password_group = str_replace('I', '', password_group);
            password_group = str_replace('o', '', password_group);
            password_group = str_replace('O', '', password_group);
            password_group = str_replace('0', '', password_group);
        }

        var group_length = password_group.length;

        for (var i = 0; i < $scope.group_number; i++) {
            var result = '';
            for (var j = 0; j < $scope.password_length; j++) {
                var randstr = rand(0, group_length - 1);
                result += substr(password_group, randstr, 1);
            }
            results.push(result);
        }

        $scope.results = results;
    }
    $scope.generate();
}]);