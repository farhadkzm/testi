/**
 * Developed by Navid Ghahremani (ghahramani.navid@gmail.com)
 */

(function (angular) {
    'use strict';

    angular
        .module('admin.health')
        .controller('HealthController', HealthController);

    HealthController.$inject = [
        '$mdDialog',
        'Health'
    ];
    /* @ngInject */
    function HealthController($mdDialog, Health) {
        var vm = this;

        vm.addHealthObject = addHealthObject;
        vm.baseName = baseName;
        vm.flattenHealthData = flattenHealthData;
        vm.getLabelClass = getLabelClass;
        vm.getModuleName = getModuleName;
        vm.hasSubSystem = hasSubSystem;
        vm.isHealthObject = isHealthObject;
        vm.refresh = refresh;
        vm.updatingHealth = true;
        vm.separator = '.';
        vm.showHealth = showHealth;
        vm.subSystemName = subSystemName;
        vm.transformHealthData = transformHealthData;

        activate();

        ////////////////

        function activate() {
            vm.refresh();
        }

        function addHealthObject(result, isLeaf, healthObject, name) {

            var healthData = {
                'name': name
            };
            var details = {};
            var hasDetails = false;

            angular.forEach(
                healthObject, function (value, key) {
                    if (key === 'status' || key === 'error') {
                        healthData[key] = value;
                    } else {
                        if (!vm.isHealthObject(value)) {
                            details[key] = value;
                            hasDetails = true;
                        }
                    }
                }
            );

            // Add the of the details
            if (hasDetails) {
                angular.extend(healthData, {'details': details});
            }

            // Only add nodes if they provide additional information
            if (isLeaf || hasDetails || healthData.error) {
                result.push(healthData);
            }
            return healthData;
        }

        function baseName(name) {
            if (name) {
                var split = name.split('.');
                return split[0];
            }
        }

        function flattenHealthData(result, path, data) {
            angular.forEach(
                data, function (value, key) {
                    if (vm.isHealthObject(value)) {
                        if (vm.hasSubSystem(value)) {
                            vm.addHealthObject(result, false, value, vm.getModuleName(path, key));
                            vm.flattenHealthData(result, vm.getModuleName(path, key), value);
                        } else {
                            vm.addHealthObject(result, true, value, vm.getModuleName(path, key));
                        }
                    }
                }
            );
            return result;
        }

        function getLabelClass(statusState) {
            if (statusState === 'UP') {
                return 'label-success';
            } else {
                return 'label-danger';
            }
        }

        function getModuleName(path, name) {
            var result;
            if (path && name) {
                result = path + vm.separator + name;
            } else if (path) {
                result = path;
            } else if (name) {
                result = name;
            } else {
                result = '';
            }
            return result;
        }

        function hasSubSystem(healthObject) {
            var result = false;
            angular.forEach(
                healthObject, function (value) {
                    if (value && value.status) {
                        result = true;
                    }
                }
            );
            return result;
        }

        function isHealthObject(healthObject) {
            var result = false;
            angular.forEach(
                healthObject, function (value, key) {
                    if (key === 'status') {
                        result = true;
                    }
                }
            );
            return result;
        }

        function refresh() {
            vm.updatingHealth = true;
            Health.checkHealth().then(
                function (response) {
                    vm.healthData = vm.transformHealthData(response);
                    vm.updatingHealth = false;
                }, function (response) {
                    vm.healthData = vm.transformHealthData(response.data);
                    vm.updatingHealth = false;
                }
            );
        }

        function showHealth(health) {
            $mdDialog.show(
                {
                    templateUrl: 'app/admin/health/HealthModalView.html',
                    controller: 'HealthModalController',
                    controllerAs: 'vm',
                    resolve: {
                        currentHealth: function () {
                            return health;
                        },
                        baseName: function () {
                            return vm.baseName;
                        },
                        subSystemName: function () {
                            return vm.subSystemName;
                        }
                    }
                }
            );
        }

        function subSystemName(name) {
            if (name) {
                var split = name.split('.');
                split.splice(0, 1);
                var remainder = split.join('.');
                return remainder ? ' - ' + remainder : '';
            }
        }

        function transformHealthData(data) {
            var response = [];
            vm.flattenHealthData(response, null, data);
            return response;
        }
    }

})(angular);
