(function () {

	function slideColor (slide, color) {

		$('.' + slide).on('click', function() {
			$('.remove-p').remove();
			$('.draggable-item').css({
				'background' : color
			});
			$('.movable-wrapper').append($('#' + slide + '-script').html())
			$('.script-p').toggleClass('remove-p');
		});
	};

	slideColor('first-slide', 'lightyellow');
	slideColor('second-slide', 'lightgreen');
	slideColor('third-slide', 'lightgray');

})();