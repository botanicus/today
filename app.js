/*

TODO: Retry after going online.

 */

app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ng', 'ngSanitize']);

app.controller('HabitsCtrl', function ($scope) {
  $scope.groups = [
    {title: 'Trigger: Alarm Goes Off', focus: {from: 4, to: 9}, habits: [
      {title: 'Action as soon as the alarm goes off'},
      {title: 'First thing in the morning: drink water'},
      {title: 'Commit to be happy'},
      {title: 'Make an entry to the Five Minute Journal'},
      {title: 'Watch a motivational video', link: 'http://www.youtube.com/watch?v=wfcro5iM5vw'},
      {title: 'Implement your new identity'},
    ]},
    {title: 'Trigger: Getting Up From The Bed', focus: {from: 7, to: 9}, habits: [
      {title: 'Clean teeth'},
      {title: 'Do 10 push-ups or pull-ups'},
      {title: 'Make a power pose'},
    ]},
    {title: 'Trigger: Sitting Down To My Desk', focus: {from: 9, to: 11}, habits: [
      {title: 'Go through 3 Evernote notes'},
      {title: 'Write a blog post (or a part of it, if it’s too long)'},
      {title: 'Do the most important task before 12'}
    ]},
    {title: 'Trigger: Lunch', focus: {from: 13, to: 16}, habits: [
      {title: 'Take a nap or listen to one Headspace episode'}
    ]},
    {title: 'Trigger: I Finished Work For The Day', focus: {from: 19, to: 20}, habits: [
      {title: 'Close all tabs in Chrome'}
    ]},
    {title: 'Trigger: Dinner', focus: {from: 20, to: 22}, habits: [
      {title: 'Merge current tasks to the task log'},
      {title: 'Reflection'},
      {title: 'Prepare tasks for tomorrow'}
    ]},
    // GET /habits/2014-01-31
    //
    // {title: 'Daily Special', focus: {from: 10, to: 12}, habits: [
    //   {title: 'Go swimming', weekday: 3},
    // ]}
  ];

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

  $scope.tasks = {
    fixedTime: [
      {time: '5:30 PM', title: 'Test Skype call', tags: ['online']}
    ],
    important: [
      {title: 'Leadsorama <a href="https://github.com/leadsorama/web-client/issues/22">#22</a>', tags: []},
      {title: 'Captureproof', tags: []},
      {title: 'Today', tags: []}
    ],
    urgencies: [
      {title: 'One', tags: []},
      {title: 'Two', tags: []},
      {title: 'Three', tags: []},
      {title: 'Four', tags: []},
      {title: 'Five', tags: []}
    ]
  };

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
