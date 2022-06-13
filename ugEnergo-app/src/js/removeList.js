(function remove() {
	let notifyList = document.querySelector('.notify_list'),
		remove = document.querySelector('.notify_delete');
	if (notifyList && remove) {
		setListener(remove, 'click', () => {
			let items = notifyList.querySelectorAll(".notify_item .checkbox[type='checkbox']:checked");
			items.forEach(item => item.closest('.notify_item').remove());
		})
	}
})()