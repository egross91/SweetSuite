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

    function getPriorityString(priority) {
      switch(priority) {
        case "3":
              return 'High Priority';
        case "2":
              return 'Medium Priority';
        case "1":
              return 'Low Priority';
        default:
              return 'Default';
      }
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
                isTodo: true,
                priority: getPriorityString(thing.priority),
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
              var modifiedDesc = document.getElementById('modalHtmlTextArea')
                , resultDesc = null
                , newPriority = document.getElementsByName('newTodoPriority')[1]
                , resultPriority
                , isDone;

              if (modifiedDesc) {
                resultDesc = modifiedDesc.value;
              }
              else if ((modifiedDesc = document.getElementById('modalTextP'))) {
                resultDesc = modifiedDesc.innerText;
              }
              else {
                resultDesc = '';
              }

              resultPriority = (!newPriority.options[newPriority.selectedIndex].value) ? 1 : newPriority.options[newPriority.selectedIndex].value;
              isDone = document.getElementById(isDone);
              /* TODO Update isDone (true/false value) */
              callback.apply(event, [resultDesc.trim(), resultPriority, isDone]);
            });
          }
        },

        create: function(cb, scope, size) {
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
                    scope.accordionIsDisabled = false;
                    viewModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    scope.accordionIsDisabled = false;
                    viewModal.dismiss(e);
                  }
                }]
              }
            }, null);

            viewModal.result.then(function(event) {
              var result = document.getElementById('modalTextP');

              result = (!result || result.innerText.trim() === '') ? 'Default' : result.innerText;
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
