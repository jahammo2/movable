app.reorderItemsPage = function () {
  console.log('hey');
  $('.reorderable-list-item').mousedown(function (e) {
    console.log('works');
    
    var item = $(this);

    item.addClass('reordering-list-item');
    $(document).on('selectstart dragstart', cancelTextSelection);

    $('body').on('mouseup', doneReordering);

    $('body').on('mousemove', reorder);

    function cancelTextSelection(e) {
      e.preventDefault();
      return false;
    }

    function shouldMoveUp(y) {
      var offset = item.prev().offset();

      return offset && offset.top > y;
    }

    function shouldMoveDown(y) {
      var next = item.next();
      var offset = next.offset();

      return offset && offset.top + next.height() < y;
    }

    function reorder(e) {
      if (shouldMoveUp(e.pageY)) {
        item.insertBefore(item.prev());
      } else if (shouldMoveDown(e.pageY)) {
        item.insertAfter(item.next());
      }
    }

    function doneReordering() {
      item.removeClass('reordering-list-item');
      $('body').off('mouseup', doneReordering);
      $('body').off('mousemove', reorder);
      $(document).off('selectstart dragstart', cancelTextSelection);
    }
  });
};

app.moveItemPage = function () {
  $('.draggable-item').mousedown(function (e) {
    var item = $(this);

    var elPosition = item.offset();

    var shiftX = e.pageX - elPosition.left;
    var shiftY = e.pageY - elPosition.top;

    $('body').on('mousemove', moveItem);

    $('body').on('mouseup', stopTracking);

    function moveItem(e) {

      // width
      var windowWidth = window.innerWidth
      var marginWidth = window.innerWidth * .05
      var movWrapWidth = $('.movable-wrapper').outerWidth() + marginWidth
      console.log(movWrapWidth);
      var spaceLeft = windowWidth - movWrapWidth
      console.log(spaceLeft);
      console.log(elPosition.left);
      console.log(e.pageX);
      var trueWidth = e.pageX - spaceLeft;
      console.log(trueWidth)

      // height
      var spaceTop = 50;
      console.log(spaceTop);
      console.log(elPosition.top);
      console.log(e.pageY);
      var trueHeight = e.pageY - spaceTop;
      console.log(trueHeight);
      console.log(Math.abs(trueHeight) === trueHeight);

      var trueNumber = (
        (Math.abs(trueWidth) === trueWidth) 
        && 
        (Math.abs(trueHeight) === trueHeight)
        );
      console.log(trueNumber);

      if (trueNumber) {
        item.css({
          top: e.pageY - shiftY,
          left: e.pageX - shiftX
        });
      } else {
        $('.movable-wrapper').css({
          'background': 'red'
        })
        item.css({
          top: elPosition.top,
          left: elPosition.left
        });
      }
    }

    function stopTracking() {
      $('body').off('mousemove', moveItem);
      $('body').off('mouseup', stopTracking);
    }
  });
};

app.reorderItemsPage();
app.moveItemPage();