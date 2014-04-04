/*

TODO: Retry after going online.

 */

app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ng', 'ngSanitize']);

app.controller('HabitsCtrl', function ($scope) {
  $scope.groups = GROUPS;

  $scope.groupFinished = function (group) {
    return this.group.habits.every(function (habit) {
      return habit.finished;
    });
  };

  // TODO: This should get updated every minute.
  $scope.groupActive = function (group) {
    if (this.groupFinished(group)) return false;

    var hour = new Date().getHours();
    var focus = this.group.focus;
    return focus.from <= hour && focus.to >= hour;
  };
});

app.controller('TasksCtrl', function ($scope) {
  $scope.today = new Date().getTime();

  $scope.tasks = TASKS;

  $scope.showEditButton = function (event) {
    var getContentEditableElement = function (element) {
      if (element.contentEditable == 'inherit') {
        return getContentEditableElement(element.parentNode);
      } else {
        return element;
      }
    }

    var contentEditableElement = getContentEditableElement(event.toElement);
  };

  window.$scope = $scope;
});

app.controller('TomorrowCtrl', function ($scope) {
  //
});

// Documentation: http://docs.angularjs.org/guide/directive
// ng-mouseover="showEditButton($event)" ng-blur="makeNotEditable()"
app.directive('toggleEditable', function ($document) {
  return function ($scope, $element, $attrs) {
    var element = $element[0];
    var menu = element.getElementsByClassName('menu')[0];
    var editLink = element.getElementsByClassName('make-editable')[0];
    var addNewLink = element.getElementsByClassName('add-new-task')[0];
    var editableArea = element.getElementsByClassName('editable-area')[0];
    var displayArea  = element.getElementsByClassName('display-area')[0];
    var editable = element.getElementsByClassName('editable')[0];

    // Defaults.
    menu.style.display = 'none';
    editableArea.style.display = 'none';

    // Make it editable.
    angular.element(editLink).on('click', function (event) {
      displayArea.style.display = 'none';
      editableArea.style.display = 'inline'

      editable.focus();
      document.execCommand('selectAll', false, null);
    });

    // Finish editing.
    var finishEditing = function () {
      editableArea.style.display = 'none';
      displayArea.style.display = 'inline';
    };

    angular.element(editableArea).on('focusout', finishEditing);

    // Show the edit editLink.
    $element.on('mouseenter', function (event) {
      menu.style.display = 'inline';
    });

    // Hide the edit editLink.
    $element.on('mouseleave', function (event) {
      menu.style.display = 'none';
    });

    // Ignore Enter key.
    $element.on('keydown', function (event) {
      if (event.keyCode == 13) {
        finishEditing();
        event.preventDefault();
      };
    });
  };
});
