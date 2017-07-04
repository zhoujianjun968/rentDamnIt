var SidebarInfo = function(dom){
    this.father = dom
    this.div = null
    this.values =null
    this.itemData = null

    this.itemIndex = 0
    this.itemEnd = 0
}
SidebarInfo.prototype = {
    init(values){
        this.values = values
        this.div = document.createElement('div')
        this.div.style.cssText= `
            display: block;
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100%;
            width: 240px;
            background: #fff;
            border-right: 3px solid #333;
            z-index: 1;
            margin-left:-240px;
        `

        this.header = document.createElement('div')
        this.header.style.cssText= `
            display: block;
            background-color:#555;
            height:40px;
        `
        this.address =  document.createElement('span')
        this.address.style.cssText= `
            width: 100px;
            line-height: 40px;
            font-size: 14px;
            font-weight: 600;
            color:#fff;
            padding-left:5px;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            position: absolute;
            z-index: 1;
        `
        this.number = document.createElement('span')
        this.number.style.cssText= `
            width: 100%;
            line-height: 40px;
            font-size: 16px;
            font-weight: 600;
            color:#fff;
            position: absolute;
            text-align: center;

        `
        this.close = document.createElement('i')
        this.close.className = 'fa fa-close'
        this.close.style.cssText= `
            font-size: 20px;
            width: 40px;
            line-height: 40px;
            color: #fff;
            text-align: center;
            cursor: pointer;
            position: absolute;
            right: 0;
            z-index:1;
        `
        this.close.addEventListener('click',function(e){
            this.hide()
            observer.fire('clear')
            observer.clear('clear')
        }.bind(this))
        this.header.appendChild(this.close)
        this.header.appendChild(this.address)
        this.header.appendChild(this.number)
        

        this.wrap = document.createElement('div')
        this.wrap.style.cssText= `
            width: 240px;
            overflow-y:auto;
            overflow-x:hidden;
        `
        

        this.div.appendChild(this.header)
        this.div.appendChild(this.wrap)

        this.father.appendChild(this.div)
        
        this.setHeader()
        this.setItem()

    },
    setItem(){
        // 设置item包裹层的高度
        window.addEventListener('resize',function(e){
            this.wrap.style.height = this.div.offsetHeight-this.header.offsetHeight + 'px'
        }.bind(this))
        this.wrap.style.height = this.div.offsetHeight-this.header.offsetHeight + 'px'
        // 如果容器可以容纳item的个数+10大于items的个数，就直接渲染所有的item
        if (Math.ceil(this.div.offsetHeight / 70 ) + 10 >= this.values['items'].length){
            for(let item in Array.from(this.values['items'])){
                let newItem = this.NewItem()
                newItem.setTitle(this.values['items'][this.itemIndex])
                this.wrap.appendChild(newItem)
            } 
        //否则滚动添加item
        }else{
            this.itemEnd = Math.ceil(this.div.offsetHeight / 70 ) + 10
            for(; this.itemIndex < this.itemEnd; this.itemIndex++){

                let newItem = this.NewItem()
                newItem.setTitle(this.values['items'][this.itemIndex])
                this.wrap.appendChild(newItem)
            }
            // 监听滚动添加事件
            this.wrap.addEventListener('scroll',function(e){
                // 如果滚动了1/3，就添加下一批item
                if(this.wrap.scrollTop / this.wrap.scrollHeight > 0.3 && this.values['items'].length != this.itemEnd){
                    this.itemIndex = this.itemEnd 
                    this.itemEnd + 10 < this.values['items'].length ? this.itemEnd = this.itemEnd + 10:this.itemEnd = this.values['items'].length
                    for(; this.itemIndex  < this.itemEnd; this.itemIndex ++){
                        let newItem = this.NewItem()
                        newItem.setTitle(this.values['items'][this.itemIndex])
                        this.wrap.appendChild(newItem)
                    }
                }
            }.bind(this))
        }
    },
    setHeader(){
        this.address.innerText = this.values['address']
        this.number.innerText = '共有'+ this.values['items'].length+'套'
    },
    setItemData(values){
        this.itemData = values
    },
    NewItem(){
        let wrap = document.createElement('div')
        wrap.style.cssText = `
            height:69px;
            width: 240px;
            background-color:#fff;
            border-bottom: 1px solid #dedede;
            cursor:pointer;
        `
        let thumb = document.createElement('div')
        thumb.style.cssText = `
            height:50px;
            width: 50px;
            background-color:#ee3b4a;
            margin: 10px 5px 10px 10px;
            border-radius:60px;
            float: left
        `
        let title = document.createElement('h1')
        title.innerText = '123'
        title.style.cssText = `
            width: 150px;
            line-height:22px;
            margin-left:70px;
            font-size:16px;
            color:#333;
            font-weight:600;
            padding-top: 12px;
        `
        let content = document.createElement('h2')
        content.innerText = '123465890'
        content.style.cssText = `
            width: 150px;
            line-height:22px;
            margin-left:70px;
            font-size:16px;
            color:#555;
            font-weight:400;
        `
        wrap.appendChild(thumb)
        wrap.appendChild(title)
        wrap.appendChild(content)

        wrap.setTitle = function(value){
            title.innerText = value
        }
        return wrap
    },
    hide(){
        chuckle.MoveTo(0,-this.div.clientWidth,4,function(value){
            this.div.style.marginLeft = value + 'px'
        }.bind(this))
    },
    show(){
        chuckle.MoveTo(-this.div.clientWidth,0,4,function(value){
            this.div.style.marginLeft = value + 'px'
        }.bind(this))
    }
}