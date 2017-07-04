var Dialog = function(){
	this.init()
}
Dialog.prototype = {

	init:function(){
		this.wrap = document.createElement('div')
		this.wrap.style.cssText = `
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			color:#fff;
			background-color: rgba(0,0,0,0.3);
			transition:all 0.2s;
			visibility: hidden;
			opacity: 0;
			zIndex: -1;
		`
		this.divWrap = document.createElement('div')
		this.divWrap.style.cssText = `
			position: absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
			background-color: #fff;
			color:#333;
			width:500px;
			height:250px;
			border:2px solid rgba(0, 0, 0, 0.2);
			box-shadow: 0 0  10px rgba(0, 0, 0, 0.2);
			border-radius:8px;
		`
		this.header = document.createElement('div')
		this.header.style.cssText = `
			height:36px;
			color:#333;
			line-height:36px;
			font-size:18px;
			padding-left:10px;
		`
		this.close = document.createElement('i')
		this.close.style.cssText = `
			background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAB70lEQVRIiaXWL4hUURQG8B8ycYQJChZhwyAG0W0aJgyy0WAY0DDgNsvEFQyCYUGDwbCgiKDBsGGDVRDZMOAGw2IyTJhgUNhg2GDYMIZz3+7z8d7M3Z0Pbnj3nnO/8/8+8tDCLazjMUYYoJupPxer2MYhZg1rgifonPbyDnbSJQd4izWsCK86woshPia5P8LLLNzGp6T4DjczdO5hN+ls4fI84Uv4maxaz7UqoZ0IZiLEtWhhjCOR5LNiMxHVhm6UDp8vQUAYu4+/KtXXFgneT0LLYlVEZKe8ORRe9GsUBtgT+ao7mzYQvUhE7WJjWyS8Dl38wo8K0SBdMm7QW02GD4uNKT40CMPVClGZoD1H70B4RFJ4Oke4TDTNJJCMOi7nWQYJbCTZI3lzazctxGxaVLpFiL4l+WqO6jDB++LjP7fmEBQh6mUQtcTk2Cw2Xosk1fVIT30OykR1WBOhXatuDBpIttQnuacUjgqKJ+LY8Iv4IpruRoPSafBAjJVn1YOHwptXSxJcx1d8x7XqYcvJAzSsHmaiJZq6KfSIuO85eXwWNVsZ3ZLuwp67gjdJ+PM8ixLOiyad4Dce4VyuZSNR5zNRvhu4IyZ1H/fxUgzWmWjSXu7lZXTECzdW/6dyKEr17lkur8MFUS39tFZkPnD/AA+RiW10t2WMAAAAAElFTkSuQmCC") no-repeat center center;
			background-size: 25px 25px;
			display:inline-block;
			width:25px;
			height:25px;
			line-height:36px;
			vertical-align: middle;
			float:right;
			margin:5px 5px 0 0 ;
			cursor: pointer;
		`

		this.flag = document.createElement('i')
		this.flag.style.cssText = `
			display:block;
			width: 90px;
			height: 90px;
			background-color: #ee3b4a;
			background: url("data:image/png;base64,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") no-repeat center center;
			background-size: 80px 80px;
			margin:0px auto;
		`
		this.title = document.createElement('h1')
		this.title.style.cssText = `
			font-size:20px;
			font-weight: bold;
			line-height:40px;
			color:#333;
		`
		this.message = document.createElement('h2')
		this.message.style.cssText = `
			font-size:16px;
			line-height:20px;
			color:#555;
		`
		this.confirm = document.createElement('a')
		this.confirm.innerText = '确定'
		this.confirm.style.cssText = `
			position: absolute;
			display:block;
			width:130px;
			height:35px;
			line-height:35px;
			left:50%;
			margin-left:-65px;
			bottom:15px;
			color:#fff;
			text-align:center;
			background-color: #17abe3;
			cursor:pointer;
			font-size:16px;
		`
		this.content = document.createElement('div')
		this.content.style.cssText = `
			text-align:center;
		`

		this.header.appendChild(this.close)

		this.content.appendChild(this.flag)
		this.content.appendChild(this.title)
		this.content.appendChild(this.message)
		this.content.appendChild(this.confirm)

		this.divWrap.appendChild(this.header)
		this.divWrap.appendChild(this.content)

		this.wrap.appendChild(this.divWrap)

		let body = document.querySelector('body')
		body.appendChild(this.wrap)

		this.close.addEventListener('click',function(e){
			this.hide()
		}.bind(this))
		this.confirm.addEventListener('click',function(e){
			this.hide()
		}.bind(this))
		
	},
	show:function(params){

		this.title.innerText = params['title'] || '标题'
		this.message.innerText = params['message'] || '内容'
		this.wrap.style.visibility = 'visible'
		this.wrap.style.opacity = 1
		this.wrap.style.zIndex =  999
	},
	hide:function(){
		this.wrap.style.visibility = 'hidden'
		this.wrap.style.opacity = 0
		this.wrap.style.zIndex =  -1
	},
	getClose:function(){
		return this.close
	},
	getConfirm:function(){
		return this.confirm
	},

}