'use strict';

angular.module('sweetSuiteApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      changeRole: {
        method: 'PUT',
        params: {
          id:'admin',
          controller:'role'
        }
      },
      updateUserLists: {
        method: 'PUT',
        params: {
          controller: 'lists'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
