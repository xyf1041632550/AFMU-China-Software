
export default {
	components: {},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	methods: {

		//onClick
		onClick() {
			if (!this.$Global.tool.checkClick()) {
				return
			};
			if (!this.info.realName) {
				this.mint.alert('请输入名称');
				return
			}
			if (this.info.moblie.length!=11) {
				this.mint.alert('请输入联系方式');
				return
			}
			if (!this.info.logo) {
				this.mint.alert('请选择头像');
				return
			}
			if (!this.info.images) {
				this.mint.alert('请选择车辆照片');
				return
			}
			if (!this.info.name) {
				this.mint.alert('请输入车牌号');
				return
			}
			if (!this.info.shopType) {
				this.mint.alert('请选择车辆类型');
				return
			}
			let data = this.info
			
			this.base.post('api/application/add', data).then(res => {
				this.mint.toast(res.msg);
				setTimeout(()=>{
					uni.reLaunch({
						url:'/pages/login/login'
					})
				},800)
			})

			
		},
		
		getList(){
			
			this.base.post('api/dcStoreType/info', {type:1}).then(res => {
				this.list=res.data;
				
			})
		},



		onPreviewImage(e) {
			uni.previewImage({
				urls: [e]
			})
		},

		/**
		 * @param {Object} key
		 */
		onDelectImg(key) {
			this.info[key]='';
			// this.list.splice(index, 1);
		},
		//选择环境图片
		onSelectImgList(key) {
			let this_ = this;
			wx.chooseImage({
				count: 1,
				success: function(res) {
					this_.info[key]=res.tempFilePaths[0];
					this_.upFile(res.tempFilePaths[0],key)
				},
			})
		},
		
		
		
		//修改
		upFile(path,key) {
			let this_ = this;
			let data = {};
			this.base.upload('app/user/uploadPhoto', path, data, 'imgFile').then(res => {
				this.info[key]=res.data.all;
			})
		},
		

		
		change(e){
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
			id: '',
			info: {
				realName:'',
				moblie:'',//'13322223333',
				logo:'',//车牌
				name:'',//车分类
				shopType:'',//车分类id,
				images:'',//车分类id,
				shoujihao:'',
				mima:''
			},
			
			
			list: [],
			
		}
	},

}
