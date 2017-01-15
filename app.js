var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ng', 'ngSanitize', 'directives', 'menu']);

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
});

app.controller('TomorrowCtrl', function ($scope) {
  //
});
