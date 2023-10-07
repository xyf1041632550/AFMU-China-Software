let Wwidth=50;
export default {
	data() {
		return {
			info: null,
			imageSrc: "",
			ctx1:null,
			ctx:null,
			width:Wwidth
		}
	},
	onLoad(options) {

		this.chooseImage();
	},
	onReady(){
		if(!this.ctx1){
			this.ctx1 = uni.createCanvasContext('myCanvas1', this)
		}
		if(!this.ctx){
			this.ctx = uni.createCanvasContext('myCanvas', this)
		}
		let this_ = this;
		
		let img='/static/images/base.png';
		this_.ctx1.drawImage(img, 0, 0,Wwidth, Wwidth);
		this_.ctx1.draw()
	},
	methods: {
		onBack() {
			uni.navigateBack()
		},
	

		onChange(ev) {
			console.log(ev)
		},
		chooseRatio(index) {
			this.activeIndex = index
			let item = this.ratioList[index]
			this.ratio = item.width / item.height
		},
		chooseImage() {
			uni.chooseImage({
				count: 1,
				sourceType:['camera'],
				sizeType: ['original'],
				success: (res) => {
					let tempFilePaths = res.tempFilePaths[0]
					this.imageSrc = tempFilePaths
				}
			})
		},
		onCrop(cb) {
			this.$refs.croper.crop().then(path => {
				// uni.previewImage({
				// 	urls:[path]
				// })
				console.log(path)
				// uni.previewImage({
				// 	urls: [path]
				// })
				this.ctx.drawImage(path, 0, 0,Wwidth, Wwidth);
				this.ctx.draw()
				uni.showLoading({
					title:this.$t('In calculation')
				})
				setTimeout(()=>{
					this.checkCz()
				},800)
			})
		},
		
		checkCz(){
			var imageData =[];
			var imageData1 =[];
			let this_=this;
			uni.canvasGetImageData({
			  canvasId: 'myCanvas',
			  x: 0,
			  y: 0,
			  width: Wwidth,
			  height: Wwidth,
			  success(res) {
				console.log(res)
			    console.log(res.width) // 100
			    console.log(res.height) // 100
			    console.log(res.data instanceof Uint8ClampedArray) // true
			    console.log(res.data.length) // 100 * 100 * 4
				imageData=res;
				this_.comCz(imageData,imageData1)
			  }
			})
			uni.canvasGetImageData({
			  canvasId: 'myCanvas1',
			  x: 0,
			  y: 0,
			  width: Wwidth,
			  height: Wwidth,
			  success(res) {
				  console.log(res)
			    console.log(res.width) // 100
			    console.log(res.height) // 100
			    console.log(res.data instanceof Uint8ClampedArray) // true
			    console.log(res.data.length) // 100 * 100 * 4
				imageData1=res.data;
				this_.comCz(imageData,imageData1)
			  }
			})
			
			
		},
		
		comCz(imageData,imageData1){
			if(imageData.length==0||imageData1.length==0){return}
			console.log(imageData1)
			console.log(imageData)
			var data = imageData.data;
			var colors = [];
			var colors1 = [];
			let value1=0;
			let value2=0;
			
			let rgbaolist=[0,0,0,0];
			let rgbanlist=[0,0,0,0];
			for (var i = 0, len = data.length; i < len; i += 4) {
			  var r = data[i];
			  var g = data[i + 1];
			  var b = data[i + 2];
			  var a = data[i + 3];
			  colors.push([r, g, b, a]);
			  rgbaolist[0]+= data[i];
			  rgbaolist[1]+= data[i+1];
			  rgbaolist[2]+= data[i+2];
			  rgbaolist[3]+= data[i+3];
			  
			  var r1 = imageData1[i];
			  var g1 = imageData1[i + 1];
			  var b1 = imageData1[i + 2];
			  var a1 = imageData1[i + 3];
			  colors1.push([r, g, b, a]);
			  value1+=(r+g+b+a)-(r1+g1+b1+a1)
			  
			  rgbanlist[0]+= imageData1[i];
			  rgbanlist[1]+= imageData1[i+1];
			  rgbanlist[2]+= imageData1[i+2];
			  rgbanlist[3]+= imageData1[i+3];
			}
			console.log('r',rgbaolist)
			console.log('aaa',rgbanlist)
			console.log(value1)
			console.log(value1/250)
			// this.chazhi=Math.abs(parseInt(value1/1000))
			console.log(colors)
			let info=uni.getStorageSync('user');
			if(!info){
				info={
					name:'张三',
					sex:'1',
					weight:65,
					height:177,
					age:22,
					num:parseInt(new Date().getTime()/100000),
					bmi:(parseFloat(65)/Math.pow(parseFloat(177/100),2)).toFixed(2),
					chromatism:''
					}
			}
			
			info.chromatism=Math.abs(parseInt(value1/250));
			uni.setStorageSync('user',info)
			uni.hideLoading()
			uni.showModal({
				title: '色差值',
				content: 
				`
总色块(50*50)     2500
通道(拍照采集)     值
红色(R)      ${rgbaolist[0]}
绿色(G)      ${rgbaolist[1]}
懒色(B)      ${rgbaolist[2]}
透明(A)      ${rgbaolist[3]}
				 
通道(默认图片)     值
红色(R)      ${rgbanlist[0]}
绿色(G)      ${rgbanlist[1]}
懒色(B)      ${rgbanlist[2]}
透明(A)      ${rgbanlist[3]}

总差值           总${value1}|单${Math.round(value1/2500)} 
红色(R)      总${rgbaolist[0]-rgbanlist[0]}|单${Math.round((rgbaolist[0]-rgbanlist[0])/2500)}
绿色(G)      总${rgbaolist[1]-rgbanlist[1]}|单${Math.round((rgbaolist[1]-rgbanlist[1])/2500)}
懒色(B)      总${rgbaolist[2]-rgbanlist[2]}|单${Math.round((rgbaolist[2]-rgbanlist[2])/2500)}
透明(A)      总${rgbaolist[3]-rgbanlist[3]}|单${Math.round((rgbaolist[3]-rgbanlist[3])/2500)}
				 `,
				showCancel: false,
				success: res => {
					uni.switchTab({
						url:'/pages/result/result'
					})
				},
				
			});
			// uni.switchTab({
			// 	url:'/pages/result/result'
			// })
		}
	},
}