
export default {
	components: {
		
	},

	onLoad(op) {
		
		if(!uni.getStorageSync('user')){
			uni.redirectTo({
				url:'/pages/login/login'
			})
			return
		}
	},
	onReady(){
		
	},
	methods: {
		
		myUpload(rsp) {
		              // this.info.photo = rsp.path; //更新头像方式一
		              // rsp.avatar.imgSrc = rsp.path; //更新头像方式二
					  console.log(rsp)
					  this.showHead=false;
		            },
		selctImg(){
			
			this.onNav('/pages/index/card/card')
			return
			
			this.$refs.cropper.fSelect();
			// this.$refs.cropper.getImage();
			
			this.showHead=true;
		},
		
		

	},



	/**
	 * 生命周期函数--下拉刷新
	 */
	onPullDownRefresh() {

		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 1500)

	},


	/**
	 * 生命周期函数--触底
	 */
	onReachBottom() {
		// this.getList();
	},

	onShareAppMessage: function(res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			//console.log(res.target)
		}
		let pid = uni.getStorageSync('shareid') || '';
		return {
			title: '分享一个好东西给你',
			path: '/pages/index/index?userid=' + pid,
			content: "一起旅游吧",
			imageUrl: ''
		}

	},

	data() {
		return {
			paddingTop: uni.getStorageSync('paddingTop') + 0 || 40
		}
	}

}