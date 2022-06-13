(function activateCheckbox() {
	let checkboxes = document.querySelectorAll('.notify_list');
	Array.prototype.forEach.call(checkboxes, function(item) {
		let count = item.getElementsByClassName('checkbox').length;
		let currentCount = 0;

		item.addEventListener('change', function(evt) {
			if (evt.target.classList.contains('checkbox-main')) {
				if (evt.target.checked) {
					setAllCheckboxes(item, true);
					currentCount = count;
				} else {
					setAllCheckboxes(item, false);
					currentCount = 0;
				}
			} else {
				evt.target.checked ? ++currentCount : --currentCount;

				// console.log(currentCount)
				if (currentCount == count) {
					setAllCheckboxes(item, true);
				} else if (currentCount == count - 1){
					if (!evt.target.checked) {
						item.getElementsByClassName('checkbox-main')[0].checked = false;
					}
				}
			}
		}, false);
	});

	function setAllCheckboxes(where, value) {
		let checkboxes = where.querySelectorAll('input[type="checkbox"]');
		Array.prototype.forEach.call(checkboxes, function(item) {
			item.checked = value ? true : false;
		});
	}
})()