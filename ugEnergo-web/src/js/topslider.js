(() => {
	let topslider = document.querySelector('.topslider')

	if (topslider) {
		let list = topslider.querySelector('.topslider_list'),
			items = list.querySelectorAll('.topslider_item');
		// console.log(list)

		if (items.length >= 5) {
			let slideBack = topslider.querySelector('.topslider_left'),
				slideNext = topslider.querySelector('.topslider_right');

			determineWidth(document.documentElement.scrollWidth)

			setListener(slideNext, 'click', () => {
				items.forEach(e => {
					removeClass(e, 'active')
				})
				list.appendChild(items[0])
				items = list.querySelectorAll('.topslider_item')
				determineWidth(document.documentElement.scrollWidth)
			})

			setListener(slideBack, 'click', () => {
				items.forEach(e => {
					removeClass(e, 'active')
				})
				list.insertBefore(items[items.length - 1], items[0])
				items = list.querySelectorAll('.topslider_item')
				determineWidth(document.documentElement.scrollWidth)
			})

			window.addEventListener('resize', () => {
				items.forEach(e => {
					removeClass(e, 'active')
				})
				determineWidth(document.documentElement.scrollWidth)
			})
		}

		function initItems(number) {
			for (let i = 0; i < number; i++) {
				addClass(items[i], 'active')
			}
		}

		function determineWidth(width) {
			if (width >= 1200) {
				initItems(6)
			} else if (width <= 1199.99 && width >= 960) {
				initItems(5)
			} else if (width <= 959.99 && width >= 768) {
				initItems(4)
			} else if (width <= 767.99 && width >= 560) {
				initItems(3)
			} else if (width <= 559.99 && width >= 380) {
				initItems(2)
			} else if (width <= 379.99 && width >= 0) {
				initItems(1)
			}
		}

	} else {return}
})()

