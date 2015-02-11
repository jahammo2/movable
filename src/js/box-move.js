app.reorderItemsPage = function () {
  console.log('hey');
  // Bind to any reorderable list items
  $('.reorderable-list-item').mousedown(function (e) {
    console.log('works');
    // Get the item we are moving
    var item = $(this);

    // Give it a class to make it look distinct
    item.addClass('reordering-list-item');

    // Disable text selection when dragging
    $(document).on('selectstart dragstart', cancelTextSelection);

    // When the mouse is up, we are all done!
    $('body').on('mouseup', doneReordering);

    // When the mouse moves, look into reordering
    $('body').on('mousemove', reorder);

    // Jus cancels the event
    function cancelTextSelection(e) {
      e.preventDefault();
      return false;
    }

    // Determine if the specified mouse-y coordinate
    // should make us perform a move up. THe offset.top
    // is the pixel number you need to move past with the
    // cursor in order for shouldMoveUp() to work. y is
    // e.pageY and .pageY is pixel number of the cursor
    // from the top
    function shouldMoveUp(y) {
      var offset = item.prev().offset();

      return offset && offset.top > y;
    }

    // Determine if the specified mouse-y coordinate
    // should make us perform a move down
    function shouldMoveDown(y) {
      var next = item.next();
      var offset = next.offset();

      return offset && offset.top + next.height() < y;
    }

    // The mouse is moving... check to see if we need
    // to reorder things, and if so, reorder!
    function reorder(e) {
      if (shouldMoveUp(e.pageY)) {
        item.insertBefore(item.prev());
      } else if (shouldMoveDown(e.pageY)) {
        item.insertAfter(item.next());
      }
    }

    // Clean up all of our event binding when the drag
    // /reorder is completed
    function doneReordering() {
      item.removeClass('reordering-list-item');
      $('body').off('mouseup', doneReordering);
      $('body').off('mousemove', reorder);
      $(document).off('selectstart dragstart', cancelTextSelection);
    }
  });
};

app.moveItemPage = function () {
  // When our draggable item is clicked:
  $('.draggable-item').mousedown(function (e) {
    // Get the item that is being dragged
    var item = $(this);

    // Get the item's position relative to the parent
    var elPosition = item.offset();

    // Compute the offset of the mouse cursor in the
    // element, so if we click the middle of the element
    // we move the middle of the element, rather than
    // the top-left corner.
    var shiftX = e.pageX - elPosition.left;
    var shiftY = e.pageY - elPosition.top;

    // When the mouse moves, move the item
    $('body').on('mousemove', moveItem);

    // When the mouse button is released, drop the item
    $('body').on('mouseup', stopTracking);

    // Moves the item
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

      // Set the item's top and left coordinate
      // based on the mouse position
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

    // Unbind our body-level mouse events so we
    // don't run out of memory!
    function stopTracking() {
      $('body').off('mousemove', moveItem);
      $('body').off('mouseup', stopTracking);
    }
  });
};

app.reorderItemsPage();
app.moveItemPage();