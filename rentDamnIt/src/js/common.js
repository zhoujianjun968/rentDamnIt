
if(chuckle){
	alert('0.0 尴尬，命名空间有人用了')
}else{
	var chuckle = {
		dom:{
			getElementById(){

			},
			getElementsByTagName(){

			},
			getElementsByClassName(){

			},
			getElementsByName(){

			},
			parentNode(){

			},
			childNodes(){

			},
			previousSibling(dom){
				// 避免空白文本节点
				let previous = dom.previousSibling.nodeType ==3 ? dom.previousSibling.previousSibling : dom.previousSibling
				return previous
			},
			nextSbiling(dom){
				// 避免空白文本节点
				let next = dom.nextSibling.nodeType ==3 ? dom.nextSibling.nextSibling : dom.nextSibling
				return next
			}
		},
		// 设计模式
		design:{
			// 观察者模式
			Observer(){
				let _msg ={}
				return {
					regist(type,fn){
						if(_msg[type])
							_msg[type].push(fn)
						else{
							_msg[type] = [fn]
						}
					},
					fire(type,args){
						if(!_msg[type])
							return
						var events = {
							type:type,
							args:args || {}
						},
						i = 0,
						len = _msg[type].length;
						for(;i<len;i++){
							_msg[type][i].call(this,events)
						}
					},
					remove(type,fn){
						if(_msg[type] instanceof Array){
							let i = _msg[type].length - 1
							for(;i>= 0; i--){
								_msg[type][i] ===fn && _msg[type].splice(i,1)
							}
						}
					},
					clear(type){
						_msg[type] = null
					}
				}
			},
			// 中介者模式
			Mediator(){
				var _msg= {};
				return {
					/** 
					*	订阅消息方法
					*	param type   消息名称
					*	param action 消息回调函数
					**/
					register(type,action){
						if(_msg[type])
							_msg[type].push(action)
						else{
							_msg[type] = [];
							_msg[type].push(action)
						}
					},
					/** 
					*	发布消息方法
					*	param type   消息名称
					**/
					send(type){
						if(_msg[type]){
							for(var i= 0, len= _msg[type].length; i< len; i++){
								_msg[type][i] && _msg[type][i]();
							}
						}
					}
				}
			},
			// 命令模式

		},
		isHide(dom){
			dom.style.display = 'none';
		},
		isShow(dom){
			dom.style.display = 'block'
		},
		isDelete(dom){
			dom.remove()
		},
		isAdd(target,item,object){

		},
		/** 
		*	父节点代理子节点事件，只有触发事件的子节点拥有类名
		*	param proxyDom 父节点
		*	param doms 子节点
		*	param status 类名
		*	param event 事件名称
		**/
		pickOne(proxyDom,doms,status,event){
			proxyDom.addEventListener(event,function(e){

				let target = e.target
				// 如果是子孙元素获取的事件，将其传递给proxyDom的子节点，这就要求doms必须是proxyDom的子节点
				while(target && target.parentNode !== proxyDom){
					target = target.parentNode
				}
				// 如果子节点不含有类名，并且是子节点触发的事件
				if(target && target.className.indexOf(status) == -1 && target.nodeName.toLowerCase() == doms[0].tagName.toLowerCase()){
					let children = Array.from(doms)
					for(let d of children){
						// 如果不是触发事件的节点，删除类名
						if(d.innerText != target.innerText){
							d.className = d.className.replace(status,'');
						}
						// 如果是触发事件的节点，添加类名
						else{
							target.className = target.className + ' ' + status;
						}
					}
				}
			});
		},
		/** 
		*	深度复制
		*	param obj 复制后的对象
		*	param tar 被复制的对象
		*	return obj 
		**/
		deepClone(obj,tar){
			obj = obj || {}
			for(let p in obj){
				if(Array.isArray(tar[p])){
					obj[p] = clone([],tar[p])
				}else if(typeof tar[p] === 'object'){
					obj[p] = clone({},tar[p])
				}else{
					obj[p] = tar[p]
				}
			}
			return obj

		},
		/** 
		*	交换2个dom位置
		*	param dom1 子节点1
		*	param dom2 子节点2
		*	param parent 父亲节点
		*	return obj 
		**/
		exchangeDom(dom1,dom2,parent){
			parent.insertBefore(dom1,dom2)
		},
		/** 
		*	格式化字符串
		*	param str 模板
		*	param obj 数据
		*	return 
		**/		
		formateString(str,obj){
			// 替换'{#'与'#}'之间的字符串
			return str.replace(/\{#(\w+)#\}/g,function(match,key){
				return obj[key]
			})
		},
		/** 
		*	生成连续数字数组
		*	param start 开始数字
		*	param end 结束数字
		*	return result 数组
		**/	
		generateNumber(start,end){
			let result = []
			for(let i = start; i < end ; i ++){
				result.push(i)
			}
			return result
		},
		/** 
		*	寄生组合式继承
		*	param subClass 子类
		*	param superClass 父类
		*	return result 数组
		**/	
		inheritPrototype(subClass,superClass){
			function F(){};
			F.prototype = superClass.prototype
			var p = new F()
			p.constructor = subClass
			subClass.prototype = p
		},
		check:{
			isEmpty(value){
				if(value + 0 == 0 ||  typeof(value) == "undefined"){
					return false
				}else{
					return true
				}
			},
			isEmail(value){
				let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
				if(emailReg.test(value)){
					return true
				}else{
					return false
				}
			},
			isURL(value){
				let URLReg=/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
				if(URLReg.test(value)){
					return true
				}else{
					return false
				}
			},
			isPhoneNumber(value){
				let phoneNumberReg=/^[0-9]{11}/
				if(phoneNumberReg.test(value)){
					return true
				}else{
					return false
				}
			}
		},
		/**
		 * A与B等比接近
		 * @param {number}   A        现在数字
		 * @param {number}   B        目标数字
		 * @param {number}   rate     比率
		 * @param {Function} callback 回调函数
		 */
		MoveTo(A, B, rate, callback){
			if (A == B || typeof A != 'number') {
    		    return
    		}
    		B = B || 0
    		rate = rate || 2
    		
			let step = function () {
				// console.log('A = ' + A + ', B = ' + B)
				if(A - B > 0){
					A = A + (B - A) / rate
	
					if (A - B < 1) {
					    callback(B)
					    return
					}
				}else{
					A = A + (B - A) / rate
	
					if (B - A < 1) {
					    callback(B)
					    return
					}
				}

			    callback(A)
			    setTimeout(step, 20)
    		}
    		step()
		}
	}
}

