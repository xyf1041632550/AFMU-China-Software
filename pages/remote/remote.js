let width=100;
export default {
	components: {

	},

	onLoad(op) {
		
	},
	onReady(){
		this.ctx = uni.createCanvasContext('myCanvas')
		this.ctx1 = uni.createCanvasContext('myCanvas1')
		console.log(this.ctx)
	},
	methods: {
		saveImg(){
			if(!this.ctx){
				this.ctx = uni.createCanvasContext('myCanvas', this)
			}
			let this_ = this;
			
			
			wx.chooseImage({
				count: 1,
				success: function(res) {
					let img=res.tempFilePaths[0];
					
					this_.ctx.drawImage(img, 0, 0,width, width);
					this_.ctx.draw()
				},
			})
			
		},
		saveImg1(){
			if(!this.ctx1){
				this.ctx1 = uni.createCanvasContext('myCanvas1', this)
			}
			let this_ = this;
			
			wx.chooseImage({
				count: 1,
				success: function(res) {
					let img=res.tempFilePaths[0];
					this_.ctx1.drawImage(img, 0, 0,width, width);
					this_.ctx1.draw()
				},
			})
		},
		
		onClick(){
			if(!this.ctx){
				this.ctx = uni.createCanvasContext('myCanvas', this)
			}
			
			if(!this.ctx1){
				this.ctx1 = uni.createCanvasContext('myCanvas1', this)
			}
			
			var imageData =[];
			var imageData1 =[];
			uni.canvasGetImageData({
			  canvasId: 'myCanvas',
			  x: 0,
			  y: 0,
			  width: width,
			  height: width,
			  success(res) {
			    console.log(res.width) // 100
			    console.log(res.height) // 100
			    console.log(res.data instanceof Uint8ClampedArray) // true
			    console.log(res.data.length) // 100 * 100 * 4
				imageData=res;
			  }
			})
			uni.canvasGetImageData({
			  canvasId: 'myCanvas1',
			  x: 0,
			  y: 0,
			  width: width,
			  height: width,
			  success(res) {
			    console.log(res.width) // 100
			    console.log(res.height) // 100
			    console.log(res.data instanceof Uint8ClampedArray) // true
			    console.log(res.data.length) // 100 * 100 * 4
				imageData1=res.data;
			  }
			})
			
			var data = imageData.data;
			var colors = [];
			var colors1 = [];
			let value1=0;
			let value2=0;
			for (var i = 0, len = data.length; i < len; i += 4) {
			  var r = data[i];
			  var g = data[i + 1];
			  var b = data[i + 2];
			  var a = data[i + 3];
			  colors.push([r, g, b, a]);
			  
			  var r1 = imageData1[i];
			  var g1 = imageData1[i + 1];
			  var b1 = imageData1[i + 2];
			  var a1 = imageData1[i + 3];
			  colors1.push([r, g, b, a]);
			  value1+=(r+g+b+a)-(r1+g1+b1+a1)
			}
			console.log('aaa',value1)
			console.log(value1)
			this.chazhi=Math.abs(parseInt(value1/1000))
			console.log(colors)
			this.mint.alert('差值为'+this.chazhi);
		}

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
			width:width,
			ctx:null,
			ctx1:null,
			chazhi:0,
			paddingTop: uni.getStorageSync('paddingTop') + 0 || 40
		}
	}

}