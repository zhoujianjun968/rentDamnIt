# rentDamnIt


###┗|｀O′|┛
###今天毕业一年了，结果工资全交了房租 

###/(ㄒoㄒ)/~~
###是时候了解下南京的房租了~



####2017/6/23

尚未完成:
1.扒图片
2.全局取消
3.合并数据
4.顶部搜索栏
5.优化自定义标注
6.修改样式
7.筛选器


####webpack学习

1.创建个文件夹，初始化一下，首先全局安装webpack
npm install webpack --save-dev


2.然后安装babel
npm install --save-dev babel-core babel-preset-es2015  
npm install --save-dev babel-loader


3.在src文件夹内创建一个文件app.js，里面写入现在浏览器不全支持的es6代码
let a = 111;  
let b = 222;  
var xxx = (c,d) => c*d;  
console.log(xxx(a,b));


4.然后在根目录创建一个文件名为webpack.config.js 
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


5.然后再创建一个用于babel调用的文件，名为.babelrc
    { "presets": [ "es2015" ] }  


6.命令行中运行 ./node_modules/.bin/webpack --config webpack.config.js 


6.1调整 package.json
"scripts": {
    "build": "webpack"
  },


6.2现在你可以通过使用 npm run build 命令来实现与上面相同的效果