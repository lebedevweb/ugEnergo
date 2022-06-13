(() => {
	let sliders = document.querySelectorAll('.slider')

	if (sliders[0]) {
		sliders.forEach(slider => {
			let list = slider.querySelector('.slider_list'),
				items = list.querySelectorAll('.slider_item');
			// console.log(list)

			if (items.length >= 3) {
				let slideBack = slider.querySelector('.slider_left'),
					slideNext = slider.querySelector('.slider_right');

				determineWidth(document.documentElement.scrollWidth)

				setListener(slideNext, 'click', () => {
					items.forEach(e => {
						removeClass(e, 'active')
					})
					list.appendChild(items[0])
					items = list.querySelectorAll('.slider_item')
					determineWidth(document.documentElement.scrollWidth)
				})

				setListener(slideBack, 'click', () => {
					items.forEach(e => {
						removeClass(e, 'active')
					})
					list.insertBefore(items[items.length - 1], items[0])
					items = list.querySelectorAll('.slider_item')
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
					initItems(3)
				} else if (width <= 1199.99 && width >= 660) {
					initItems(2)
				}	else if (width <= 659.99) {
					initItems(1)
				}
			}
		})
	} else {return}
})()