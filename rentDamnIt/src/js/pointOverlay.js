// 自定义标注

var PointOverlay =  function(point){
	this._center = point
	this._width = 100
	this._height = 20
	this._color  = '#ee3b3a'
	this._isInfoShow = 0
	this.title = null
	this.room = null
	this.size = null
	this.price = null
	this.values = null
}
PointOverlay.prototype = new BMap.Overlay();
// 实现初始化方法  
PointOverlay.prototype.initialize = function(map){    
	// 保存map对象实例   
	this._map = map;        
	// 创建div元素，作为自定义覆盖物的容器   
	var div = document.createElement("div");
	div.className='marker'
	div.style.cssText = `
		position:absolute;
	    margin:0;
	    padding:8px;
	    height:40px;
	    width:130px;
	    background-color:#ee3b4a;
	    border-radius:5px;
	    text-align:center;
		box-shadow: 0 0 15px rgba(100,100,100,0.5);
		cursor:pointer;
	`
	this.title = document.createElement('h1')
	this.title.style.cssText = `
	    margin: 0 0 2px 0;
	    padding: 0;
	    font-size: 14px;
	    line-height: 16px;
	    color: rgb(255, 255, 255);
	    width: 120px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	`
	// this.title.innerText = '大华锦绣华城香榭美香榭美颂'
	
	this.room = document.createElement('span')
	// this.room.innerText = '3室2厅'
	this.room.style.cssText = `
	    font-size: 12px;
	    line-height: 16px;
	    color: rgb(255, 255, 255);
	`
	this.size = document.createElement('span')
	// this.size.innerText = '82平米'
	this.size.style.cssText = `
	    font-size: 12px;
	    line-height: 16px;
	    color: rgb(255, 255, 255);
	`
	this.price = document.createElement('span')
	// this.price.innerText = '3100元'
	this.price.style.cssText = `
	    font-size: 12px;
	    line-height: 16px;
	    color: rgb(255, 255, 255);
	`
	div.appendChild(this.title)
	div.appendChild(this.room)
	div.appendChild(this.size)
	div.appendChild(this.price)

	div.addEventListener('click',function(e){
		// 设置info信息
		// 将info
		e.stopPropagation()

		// 注册观察者事件
		observer.clear('hide')
		observer.regist('hide',function(){
			this._isInfoShow = 0 
			info.getElement().style.display = 'none'
		}.bind(this))


		div.appendChild(info.getElement())
		// info.getIsPicShow()
		if(e.target.className = 'marker'){
			// 比较之前点击的是否是当前点击的对象
			if(previousClick !== this){
				// 之前点击的 _isInfoShow 设置为0
				previousClick && (function(){previousClick._isInfoShow = 0;previousClick._div.style.zIndex = 'auto'})();
				// 将当前点击的传入
				previousClick = this
			}
			if(this._isInfoShow){
				this._isInfoShow = 0 
				info.getElement().style.display = 'none'
			}else{
				this._isInfoShow = 1
				// 设置详情信息
				info.setValue(this.values)
				info.isPicShow = 0
				info.getPic().style.display = 'none'
				div.style.zIndex = '1'
				info.getElement().style.display = 'block'
			}
		}
	}.bind(this))

	div.addEventListener('mouseenter',function(e){
		// 提高z-index
		div.style.zIndex = '2'
	}.bind(this))

	div.addEventListener('mouseleave',function(e){
		// 降低z-index
		if(this._isInfoShow){
			div.style.zIndex ='1'
		}else{
			div.style.zIndex ='auto'
		}
	}.bind(this))

	// 将div添加到覆盖物容器中   
	map.getPanes().markerPane.appendChild(div);      
	// 保存div实例   
	this._div = div;      
	// 需要将div元素作为方法的返回值，当调用该覆盖物的show、   
	// hide方法，或者对覆盖物进行移除时，API都将操作此元素。   
	return div;
}

// 实现绘制方法
PointOverlay.prototype.draw = function(){    
	// 根据地理坐标转换为像素坐标，并设置给容器    
	var position = this._map.pointToOverlayPixel(this._center);    
	this._div.style.left = position.x - this._width / 2 + "px";    
	this._div.style.top = position.y - this._height / 2 + "px";     
}
PointOverlay.prototype.setTitle = function(value){
	this.title.innerText = value
}
PointOverlay.prototype.setRoom = function(value){
	this.room.innerText = value
}
PointOverlay.prototype.setSize = function(value){
	this.size.innerText = value
}
PointOverlay.prototype.setPrice = function(value){
	this.price.innerText = value
}
PointOverlay.prototype.setInfo = function(values){
	let l = values.length
	this.values = values
	if(l == 1){
		this.title.innerText = values[0][0]
		this.room.innerText = values[0][1]
		this.size.innerText = values[0][2]
		this.price.innerText = values[0][3]
	}else{
		this.title.innerText = values[0][0]
		this.room.innerText = `共有${l}套房屋出租`
	}
}





// myGeo.getPoint("云龙山路88号", function(point){      
//     if (point) {
//         let myPointOverlay = new PointOverlay(point)   
//         map.addOverlay(myPointOverlay);   
//         myPointOverlay.setValue(['烽火','3室2厅','198平','5600元'])
// 		myPointOverlay.setInfo(['烽火','3室2厅','198平','5600元','建业','高层(高层)','2016年','塔楼','距中胜地铁站80米','38人次','精装房',[{
// 				'src':'./src/img/1.jpg',
// 				'detail':'厨房'
// 			},{
// 				'src':'./src/img/2.png',
// 				'detail':'书房'
// 			}]])
//     }      
// }, "南京市");
// 
// 
// 
// setPoint('新街口',[['烽火','3室2厅','198平','5600元','建业','高层(高层)','2016年','塔楼','距中胜地铁站80米','38人次','精装房',[{
			// 	'src':'./src/img/1.jpg',
			// 	'detail':'厨房'
			// },{
			// 	'src':'./src/img/2.png',
			// 	'detail':'书房'
			// }]],['天泽','1室2厅','128平','5300元','鼓楼','地层(高层)','2015年','塔楼','距中胜地铁站20米','30人次','精装房',[{
			// 	'src':'./src/img/1.jpg',
			// 	'detail':'厨房'
			// }]]])
			// setPoint('鼓楼',[['烽火','3室2厅','198平','5600元','建业','高层(高层)','2016年','塔楼','距中胜地铁站80米','38人次','精装房',[{
			// 	'src':'./src/img/1.jpg',
			// 	'detail':'厨房'
			// },{
			// 	'src':'./src/img/2.png',
			// 	'detail':'书房'
			// }]]])
			// 
			// 






var PointClusterer = function(point,params){
	PointOverlay.call(this,point,params['county'])
	let myBoundary = new BMap.Boundary()
	let myPointOverlay = new PointOverlay()
	// this._center = point
	this._width = 0
	this._height = 0
	// this._color  = '#ee3b3a'
	this._sidebarShow = 0
	this._notPolygonShow = 1


	this.content = null
	this.contentText = params['data'].length
	// 区县名
	this.county = params['county']
	// 标题
	this.title = null
	// 覆盖物
	this.polygon = null
	// 行政边界
	this.boundary = null
	this.values = null
	this.getBoundary()

}
PointClusterer.prototype = new PointOverlay()
PointClusterer.prototype.initialize =function(map){
	// 保存map对象实例   
	this._map = map
	// 创建div元素，作为自定义覆盖物的容器   
	let div = document.createElement("div")
	div.className='marker'
	div.style.cssText = `
		position:absolute;
	    text-align:center;
		cursor:pointer;
	`
	let bgCircle = document.createElement('div')
	bgCircle.style.cssText = `
		margin:0;
	    padding:8px;
	    width: 16px;
		height: 0px;
		background-color:#ee3b4a;
		border-radius: 88px 88px 0 0px;
	`
	let bgArrow = document.createElement('div')
	bgArrow.style.cssText = `
  		width: 0px;
  		height:0px;
  		border-width: 20px 16px 0;
  		border-style: solid;
  		border-color: #ee3b4a transparent transparent transparent;
	`
	this.content = document.createElement('div')
	this.content.innerText = this.contentText
	this.content.style.cssText = `
		position: absolute;
		margin-top: -31px;
		font-size: 16px;
		color: #fff;
		margin-left: 10px;
		font-weight: 600;
	`

	div.appendChild(bgCircle)
	div.appendChild(bgArrow)
	div.appendChild(this.content)


	div.addEventListener('click',function(e){
		observer.fire('clear')
		observer.clear('clear')

		sidebarInfo.show()

		bgCircle.style.backgroundColor = '#CC0000'
		bgArrow.style.borderColor = '#CC0000 transparent transparent transparent'

		if(this._notPolygonShow){
			this._notPolygonShow = 0
			map.addOverlay(this.polygon)
		}else{
			this.polygon.show()
		}

		observer.regist('clear',function(){
			bgCircle.style.backgroundColor = '#ee3b4a'
			bgArrow.style.borderColor = '#ee3b4a transparent transparent transparent'

			if(!this.polygon){
				this.getBoundary()
			}else{
				this.polygon.hide()
			}

		}.bind(this))

	}.bind(this))

	div.addEventListener('mouseenter',function(e){

	}.bind(this))

	div.addEventListener('mouseleave',function(e){

	}.bind(this))


	// 将div添加到覆盖物容器中   
	map.getPanes().markerPane.appendChild(div)    
	// 保存div实例   
	this._div = div
	// 需要将div元素作为方法的返回值，当调用该覆盖物的show、   
	// hide方法，或者对覆盖物进行移除时，API都将操作此元素。   
	return div;
}
PointClusterer.prototype.setInfo = function(values){

}
PointClusterer.prototype.getBoundary = function(){
	
	//获取行政区域
	myBoundary.get(this.county, function(rs){   
		//清除地图覆盖物     
		// map.clearOverlays();       
		//行政区域的点有多少个      
		let count = rs.boundaries.length; 
		//设置覆盖物
		this.polygon = new BMap.Polygon(rs.boundaries[0], {strokeWeight: 1, 	strokeColor: "#ff0000"}); //								建立多边形覆盖物
		//添加覆盖物
		
		//调整视野
		// map.setViewport(ply.getPath());             
	}.bind(this));
}