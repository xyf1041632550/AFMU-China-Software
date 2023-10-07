
export default {
	components: {
		
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// this.accout='18670913320';
		// this.password='123456'
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		
	},

	methods: {
		
		wxlogin(){
			let this_=this;
			uni.login({
				success(r) {
					let code = r.code;
					console.log(code)
					let data = {
						code: code
					}
					this_.base.post('vip/getAppletUser', data, false).then(res => {
						// uni.setStorageSync('shareid', res.data.id)
						uni.setStorageSync('userToken', res.data.token)
					})
			
				},
				fail(fa) {
					// uni.showModal({
					// 	content:'shibai'+JSON.stringify(fa)
					// })
				}
			})
		},
		
		//
		onClick() {
			if(!this.accout){
				this.mint.toast('请输入账号');
				return
			}
			if(!this.password){
				this.mint.toast('请输入密码');
				return
			}
			if(!this.isGre){
				this.mint.toast('请阅读并同意用户协议/隐私协议');
				return
			}
			let data = {
				mobile: this.accout,
				password:this.password,
				// type:3
			};
			//console.log(111)
			this.base.post('app/user/login', data).then(res => {
				uni.setStorageSync('uid',res.data.token);
				uni.reLaunch({
					url:'/pages/index/index'
				})
			})
		},
		
		/**
		 * getUserInfo
		 */
		getUserInfo(){
			this.$Global.actions.getUserInfo(true).then(res=>{
				if(res.type!=4){
					this.mint.alert('该账号不是仓库账号');
					uni.setStorageSync('token','');
					return
				}
				setTimeout(()=>{
					uni.reLaunch({
						url:'/pages/stock/stock?type='
					})
				},500)
			});
			
		},
		
		
		

	},



	/**
	 * 生命周期函数--下拉刷新
	 */
	onPullDownRefresh() {


	},


	/**
	 * 生命周期函数--触底
	 */
	onReachBottom() {

	},

	data() {
		return {
			accout:'',
			password:'',
			isGre:false
		}
	},


}
