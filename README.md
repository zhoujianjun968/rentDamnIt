# rentDamnIt


###��|��O��|��
###�����ҵһ���ˣ��������ȫ���˷��� 

###/(��o��)/~~
###��ʱ���˽����Ͼ��ķ�����~



####2017/6/23

��δ���:
1.��ͼƬ
2.ȫ��ȡ��
3.�ϲ�����
4.����������
5.�Ż��Զ����ע
6.�޸���ʽ
7.ɸѡ��


####webpackѧϰ

1.�������ļ��У���ʼ��һ�£�����ȫ�ְ�װwebpack
npm install webpack --save-dev


2.Ȼ��װbabel
npm install --save-dev babel-core babel-preset-es2015  
npm install --save-dev babel-loader


3.��src�ļ����ڴ���һ���ļ�app.js������д�������������ȫ֧�ֵ�es6����
let a = 111;  
let b = 222;  
var xxx = (c,d) => c*d;  
console.log(xxx(a,b));


4.Ȼ���ڸ�Ŀ¼����һ���ļ���Ϊwebpack.config.js 
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


5.Ȼ���ٴ���һ������babel���õ��ļ�����Ϊ.babelrc
    { "presets": [ "es2015" ] }  


6.������������ ./node_modules/.bin/webpack --config webpack.config.js 


6.1���� package.json
"scripts": {
    "build": "webpack"
  },


6.2���������ͨ��ʹ�� npm run build ������ʵ����������ͬ��Ч��