'use strict';

angular.module('sweetSuiteApp')
  .factory('ListValidation', function() {

    return {

      /**
       * PUBLIC API
       */

      containsDuplicates: function(list, name, prop) {
        var names = _.pluck(list, prop)
          , ii;
        for (ii = 0; ii < names.length; ++ii) {
          if (name === names[ii]) {
            return true;
          }
        }
        return false;
      },

      isFalsy: function(text) {
        return (!text || text.trim() === '');
      }
    };
  });
