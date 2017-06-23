# rentDamnIt


## 2017/06/16


### 浠婂ぉ姣曚笟涓€骞翠簡锛岀粨鏋滃伐璧勫叏浜や簡鎴跨  鈹梶锝€O鈥瞸鈹?

### 鏄椂鍊欎簡瑙ｄ笅鍗椾含鎴跨鐨勫ぇ鑷存儏鍐典簡~  /(銊抩銊?/~~ 

####2017/6/23

尚未完成:
1.扒图片
2.全局取消
3.合并数据
4.顶部搜索栏
5.优化自定义标注
6.修改样式
7.筛选器


<br>
<br>
<br>

### webpack瀛︿範

1.鍒涘缓涓枃浠跺す锛屽垵濮嬪寲涓€涓嬶紝棣栧厛鍏ㄥ眬瀹夎webpack
npm install webpack --save-dev


2.鐒跺悗瀹夎babel
npm install --save-dev babel-core babel-preset-es2015  
npm install --save-dev babel-loader


3.鍦╯rc鏂囦欢澶瑰唴鍒涘缓涓€涓枃浠禷pp.js锛岄噷闈㈠啓鍏ョ幇鍦ㄦ祻瑙堝櫒涓嶅叏鏀寔鐨別s6浠ｇ爜
let a = 111;  
let b = 222;  
var xxx = (c,d) => c*d;  
console.log(xxx(a,b));


4.鐒跺悗鍦ㄦ牴鐩綍鍒涘缓涓€涓枃浠跺悕涓簑ebpack.config.js 
    module.exports = {  
        entry: './src/app.js',  
        output: {  
            path: './bin',  
            filename: 'app.bundle.js',  
        },  
        module: {  
            loaders: [{  
                test: /\.js$/,  
                exclude: /node_modules/,  
                loader: 'babel-loader'  
            }]  
        }  
    }  


5.鐒跺悗鍐嶅垱寤轰竴涓敤浜巄abel璋冪敤鐨勬枃浠讹紝鍚嶄负.babelrc
    { "presets": [ "es2015" ] }  


6.鍛戒护琛屼腑杩愯 ./node_modules/.bin/webpack --config webpack.config.js 


6.1璋冩暣 package.json
"scripts": {
    "build": "webpack"
  },


6.2鐜板湪浣犲彲浠ラ€氳繃浣跨敤 npm run build 鍛戒护鏉ュ疄鐜颁笌涓婇潰鐩稿悓鐨勬晥鏋?
