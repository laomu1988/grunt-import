grunt-import
============

这是一个导入CSS和JS到HTML的应用，使用&lt;script>&lt;/script>或&lt;style>&lt;/style>将引用文件改为页内文件。

### grunt配置说明

  	// 自动雪碧图
      import: {
          test: {
              files: [
                  {
                      //启用动态扩展
                      expand: true,
                      // css文件源的文件夹
                      cwd: 'html/',
                      // 匹配规则
                      src: ['*.html'],
                      //导出的网页存放目录
                      dest: 'tmp/',
                      // 导出的网页扩展名
                      ext: '.html'
                  }
              ]
          }
      }
### html网页格式
  
  在需要引入的css和js标签上添加属性import="import",则输出的网页将自动改为页内引用.
  例如：
  <link href="css/mian.css" import="import" />
  <script src="test.js" import="import"></script>

### 特别注意

1. 假如没有修改修改扩展名，请不要将网页输出到原目录，否则将被覆盖，不能撤销操作
2. 每个需要引入的文件放在一行，不要分成多行，多个引用也不要写在同一行

### 版本记录

`0.0.1` 引入CSS和JS文件
