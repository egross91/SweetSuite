'use strict';

angular.module('sweetSuiteApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return  {

      edit: {
        todo: function(cb, thing, size) {
          return function () {
            var viewModal
              , callback = cb || angular.noop;

            viewModal = openModal({
              modal: {
                dimissable: true,
                title: thing.name,
                html: thing.info,
                size: size,
                editable: true,
                description: 'Todo Description',
                textarea: true,
                buttons: [{
                  classes: 'btn-info',
                  text: 'OK',
                  click: function (e) {
                    viewModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    viewModal.dismiss(e);
                  }
                }]
              }
            }, null);

            viewModal.result.then(function(event) {
              var modified = document.getElementById('modalHtmlTextArea')
                , result = null;

              if (modified) {
                result = modified.value;
              }
              else if ((modified = document.getElementById('modalTextP'))) {
                result = modified.innerText;
              }
              else {
                result = '';
              }

              callback.apply(event, [result.trim(), thing.name]);
            });
          }
        },

        create: function(cb, size) {
          return function() {
            var viewModal
              , callback = cb || angular.noop;

            viewModal = openModal({
              modal: {
                dismissable: true,
                title: 'Create New List',
                html: '',
                size: size,
                editable: true,
                description: 'List Name',
                paragraph: true,
                buttons: [{
                  classes: 'btn-info',
                  text: 'Done',
                  click: function(e) {
                    viewModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    viewModal.dismiss(e);
                  }
                }]
              }
            }, null);

            viewModal.result.then(function(event) {
              var result = document.getElementById('modalTextP');

              result = (!result || result.innerText === '') ? 'Default' : result.innerText;

              callback.apply(event, [result.trim()]);
            });
          }
        }
      },

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });
