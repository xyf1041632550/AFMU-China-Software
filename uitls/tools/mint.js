class Mint {
	constructor() {}

}

Mint.toast = function(title, mask = false, duration = 1500, icon = 'none') {
	uni.showToast({
		title,
		mask,
		duration,
		icon
	})
}

Mint.alert = function(content, title = '提示') {
	uni.showModal({
		content,
		title,
		showCancel: false
	})
}

Mint.confirm = async function(content, title = '提示',confirmText='确定') {
	return await new Promise((resolve, reject) => {
		uni.showModal({
			title: title,
			content: content,
			confirmText:confirmText,
			success: res => {
				if (res.confirm) {
					resolve(res)
				} else {
					reject(res)
				}
			},
		});
	})

}


Mint.loading = function(txt, mask = true) {
	uni.showLoading({
		title: txt,
		mask: mask
	})
}
Mint.hideloading = function() {
	uni.hideLoading();
}
export {
	Mint
};
