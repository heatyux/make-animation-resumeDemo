let result = `/* 
 * 面试官你好，我是xxx
 * 我将以动画的形式来介绍我自己
 * 只用文字介绍来太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

 *{
   transition: all 1s;
 }
 html{
   background: #eee;
 }
 #code{
   border: 1px solid #aaa;
   padding: 16px;
 }

 /* 我需要一些代码高亮 */

.token.selector{
  color: #690;
}
.token.property{
  color: #905;
}

`

let result2 = `
/* 接下來正式介紹我自己 */
/* 首先准备一张白纸 */

#code{
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}
#paper {
  position: fixed;
  right: 0;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-itemts: center;
  padding: 16px;
  background: black;
}
#paper > .content {
  height: 100%;
  width: 100%;
  background: white;
}
`

let md = `
# 自我介绍
我叫xxx 自学前端半年 希望应聘前端开发岗位

# 技能介绍

熟悉 **JavaScript** **html** **css**

# 项目介绍
  1. xxx 轮播
  2. xxx 简历
  3. xxx 画板

# 联系方式

  - QQ xxxxxxx
  - Email xxxxxxxxx
  - 手机 xxxxxxxxxxx
`

writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, result2, ()=>{
      writeMaekdown(md,()=>{
        let domPaper = document.querySelector("#paper>.content");
        domPaper.innerHTML = marked(md);
      })
    })
  });
})

function writeCode(prefix, code, fn) {
  let domCode = document.querySelector('#code');
  // domCode.innerHTML = prefix || '';
  let n = 0;
  let timer = setInterval(() => {
    n += 1;
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'javascript');
    styleTag.innerHTML = prefix + code.substring(0, n);
    domCode.scrollTop = domCode.scrollHeight;
    if (n >= code.length) {
      window.clearInterval(timer);
      fn.call();
    }
  }, 50);
}

function createPaper(fn) {
  let paper = document.createElement('div');
  paper.id = 'paper';
  let content = document.createElement('pre');
  content.className = 'content';
  document.body.appendChild(paper);
  paper.appendChild(content);
  fn.call();
}

function writeMaekdown(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content');
  let n = 0;
  let timer = setInterval(() => {
    n += 1;
    domPaper.innerHTML = markdown.substring(0, n);
    domPaper.scrollTop = domPaper.scrollHeight;
    if (n >= markdown.length) {
      window.clearInterval(timer);
      fn.call();
    }
  }, 10);
}