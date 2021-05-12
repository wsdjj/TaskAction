/*
tgchannel：https://t.me/ZhiYi_Script
github：https://github.com/ZhiYi-N/script
boxjs：https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/ZhiYi-N.boxjs.json
转载留个名字，谢谢
邀请码：7672016831
谢谢
作者：执意ZhiYi-N
#签到界面或者签到详情
#读书任务可以完成，时长上传没做好，广告偶尔可以
[mitm]
hostname = *.snssdk.com
#圈x
[rewrite local]
luckycat/novel/v1/task/sign_in/* url script-request-header https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/fqxs.js


#loon
http-request luckycat/novel/v1/task/sign_in/* script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/fqxs.js, requires-body=true, timeout=10, tag=🍅番茄小说


#surge
🍅番茄小说 = type=http-request,pattern=luckycat/novel/v1/task/sign_in/*,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/fqxs.js,script-update-interval=0

*/


const zhiyi = '🍅番茄小说'
const $ = Env(zhiyi)
const notify = $.isNode() ?require('./sendNotify') : '';
let status,no;
status = (status = ($.getval("fqxsstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const fqxsurlArr = [],fqxsArr = []
//let fqxaurl = $.getdata('fqxsurl')
let fqxaurl = '&_request_from=web&ip=192.168.1.103&caid1=37591ddb2fb0a1499ab9b53ffde8ad2c&version_code=405&app_name=novelapp&vid=61E98B3D-BCB8-48FC-9AB7-92BDB5BBD44F&device_id=2340181320927880&channel=App%20Store&resolution=828*1792&aid=1967&version_name=4.0.5.32&update_version_code=40532&gender=2&cdid=6F7F465E-217D-4A35-B118-B9DDAFDD505F&idfv=61E98B3D-BCB8-48FC-9AB7-92BDB5BBD44F&ac=wifi&os_version=14.4&ssmix=a&ab_sdk_version=2395734,2379405,2413569&caid2=&device_platform=iphone&iid=1390215082287416&device_type=iPhone%2011&idfa=6D904FEA-DCAE-494D-9CE0-B157E5B760E5'
//let fqxs= $.getdata('fqxs')
let fqxs= '{"x-tt-trace-id":"00-4518fdd00d85061ec580a88aed6807af-4518fdd00d85061e-01","Connection":"keep-alive","Accept-Encoding":"gzip, deflate","X-SS-DP":"1967","sdk-version":"2","x-Tt-Token":"00506aba8b2312957bf670e1526a423d0e00a1ab254b9be818e5379ea7d5ed6c3b5aa132a2f0a9cb08150443abeb806a27330a20149008d3a7eb3d53a54d7bb9dcc8d0fcb41e722b3c1f8fdc62b64ab7bc9e5d999e38d819ae6369ced4693f5e79fec-1.0.1","X-Khronos":"1616066968","User-Agent":"Reading 4.0.5 rv:4.0.5.32 (iPhone; iOS 14.4; zh_CN) Cronet","x-vc-bdturing-sdk-version":"2.0.0","Cookie":"excgd=20210318; passport_csrf_token=c52f98d2063b6b6c0717c4f5a2f1b2dd; passport_csrf_token_default=c52f98d2063b6b6c0717c4f5a2f1b2dd; d_ticket=df7c17636cefa67c2b63e0eb3687a5d9857a3; n_mh=sS1gaGw52xzBsOqocJ0fQhcneconSWFAPOiQrwVi4Hk; odin_tt=d4f016880696ad0af41ff12624fedd13cdf477721f32447c014590a60bf4019c2a7c381c7c255a2d04784d01b1fe4c46; sessionid=506aba8b2312957bf670e1526a423d0e; sessionid_ss=506aba8b2312957bf670e1526a423d0e; sid_guard=506aba8b2312957bf670e1526a423d0e%7C1615512598%7C5184000%7CTue%2C+11-May-2021+01%3A29%3A58+GMT; sid_tt=506aba8b2312957bf670e1526a423d0e; uid_tt=28f6f643ad99dfd22fa5a39a37016eac; uid_tt_ss=28f6f643ad99dfd22fa5a39a37016eac; install_id=1390215082287416; ttreq=1$a16911f38838f83f3aaa50a0512c98133fe5febd; MONITOR_WEB_ID=2340181320927880","Host":"i-lq.snssdk.com","X-Tyhon":"PwDQ6CPe2/ZJ1OfuOp3HwBP3oecBg6H3NMjYo5I=","passport-sdk-version":"5.13.3","X-Gorgon":"840460aa0000ef53f37feb414d24b188167d615a53ff85f2d876"}'
//let host = $.getdata('host')
let host = 'i-lq.snssdk.com'
let tz = ($.getval('tz') || '0');//0关闭通知，1默认开启
const invite=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行
let isfqxsck = typeof $request !== 'undefined'
if (isfqxsck) {
   fqxsck();
   $.done()
}
if ($.isNode()) {
   if (process.env.FQXSURL && process.env.FQXSURL .indexOf('#') > -1) {
   fqxsurl = process.env.FQXSURL .split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.FQXSURL && process.env.FQXSURL .indexOf('\n') > -1) {
   fqxsurl = process.env.FQXSURL .split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   fqxsurl = process.env.FQXSURL .split()
  };
  if (process.env.FQXS&& process.env.FQXS.indexOf('#') > -1) {
   fqxs= process.env.FQXS.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.FQXS&& process.env.FQXS.indexOf('\n') > -1) {
   fqxs= process.env.FQXS.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   fqxs= process.env.FQXS.split()
  };
   
  fqxsurlArr.push('&_request_from=web&ip=192.168.1.101&caid1=37591ddb2fb0a1499ab9b53ffde8ad2c&version_code=440&app_name=novelapp&vid=B451BC8A-5F34-4A83-8D03-D00CBF332D29&device_id=2340181320927880&channel=App%20Store&resolution=828*1792&aid=1967&version_name=4.4.0.32&update_version_code=44032&gender=2&cdid=6F7F465E-217D-4A35-B118-B9DDAFDD505F&idfv=B451BC8A-5F34-4A83-8D03-D00CBF332D29&ac=wifi&os_version=14.4&ssmix=a&ab_sdk_version=2559153&caid2=&device_platform=iphone&iid=3079086596949031&device_type=iPhone%2011&idfa=6D904FEA-DCAE-494D-9CE0-B157E5B760E5')

       fqxsArr.push('{"x-tt-trace-id":"00-5f2a73a90d85061ec580a882457c07af-5f2a73a90d85061e-01","Connection":"keep-alive","Accept-Encoding":"gzip, deflate","X-SS-DP":"1967","sdk-version":"2","X-Ladon":"8kYrWnFlLdpnqsCYqwvT/cN2fz/ndRuhwchdzvpcgl240p16","X-Argus":"owZFyWSvR4UmP3dRGc50r+5VGJfi2yJbLbfv3D1wwkIeo6J9/kUVYrKZstd5eRiAoA7zVtHWFqSTgTonFRLeSVLls0stqrLm5+HZSITNwjtTUavV+qn8LCIMygixZR1p3CS9YMy6J75R7VIZ67T0BNSepskmp+5Pq377lt46I4dMjPbVcOYkimfklWP6pZNd7d0oGMxzV03eJD+wnKb3GOsGBjCvMlnw+U+3MjN7KvlVGoVKgfUi3lU8iZ4eC5hJ0LA=","x-Tt-Token":"005947208df6a036f03c74d1d50506ebf60033e6005d5200f641d810d1df633aa7811808c2780a8a69e54a9efbb8d377b377650e626f1a25ee5e116eb3ef16a677d194de6966da76ffcd30c0e5e491abd3c7b0a8d2f679b3a0a43f6646e32b2adf542-1.0.1","X-Khronos":"1620799287","User-Agent":"Reading 4.4.0 rv:4.4.0.32 (iPhone; iOS 14.4; zh_CN) Cronet","x-vc-bdturing-sdk-version":"2.0.0","Cookie":"excgd=20210512; install_id=3079086596949031; ttreq=1$e93c574044b1db4f25f7d1c5d2cf84e6261bcb96; passport_csrf_token_default=200ba3dab5aae01b08f8ee52b667146e; passport_csrf_token=200ba3dab5aae01b08f8ee52b667146e; n_mh=sS1gaGw52xzBsOqocJ0fQhcneconSWFAPOiQrwVi4Hk; d_ticket=fa65a982d689f35748429d7b2e4aaca9857a3; sid_guard=5947208df6a036f03c74d1d50506ebf6%7C1620799221%7C5184000%7CSun%2C+11-Jul-2021+06%3A00%3A21+GMT; uid_tt=0ca0081df0e977f3471808a6591c06ad; uid_tt_ss=0ca0081df0e977f3471808a6591c06ad; sid_tt=5947208df6a036f03c74d1d50506ebf6; sessionid=5947208df6a036f03c74d1d50506ebf6; sessionid_ss=5947208df6a036f03c74d1d50506ebf6; odin_tt=615a698be8a727a390da5c34c71b412c8053ef370bdb695bba70d970775b2eb841c345d395610e2dc490a779e6dbcc6b","Host":"i-lq.snssdk.com","passport-sdk-version":"5.13.3","X-Gorgon":"840480210000a52aff02726a963c02af9cc0553b101bcbedbe30"}')
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    fqxsurlArr.push($.getdata('fqxsurl'))
    fqxsArr.push($.getdata('fqxs'))
    let fqxscount = ($.getval('fqxscount') || '1');
  for (let i = 2; i <= fqxscount; i++) {
    fqxsurlArr.push($.getdata(`fqxsurl${i}`))
    fqxsArr.push($.getdata(`fqxs${i}`))
  }
}
!(async () => {
if (!fqxsurlArr[0] && !fqxsArr[0] ) {
    $.msg($.name, '【提示】请先获取🍅番茄小说一cookie')
    return;
  }
   console.log(`------------- 共${fqxsurlArr.length}个账号----------------\n`)
  for (let i = 0; i < fqxsArr.length; i++) {
    if (fqxsArr[i]) {
      message = ''
      note = ''
      fqxsurl= fqxsurlArr[i];
      fqxs = fqxsArr[i];
      $.index = i + 1;
      console.log(`\n开始【番茄小说${$.index}】`)
      await task_list() 
      await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
function fqxsck() {
if($request&&$request.url.indexOf("sign_in")>=0) {
   const fqxsurl = $request.url.split('?')[1]
   if(fqxsurl)     $.setdata(fqxsurl,`fqxsurl${status}`)
   $.log(`[${zhiyi}] 获取fqxsurl请求: 成功,fqxsurl: ${fqxsurl}`)
   $.msg(`fqxsurl${status}: 成功🎉`, ``)
   const host = $request.headers['Host']
   if(host)   $.setdata(host,'host')
   $.log(`[${zhiyi}] 获取host请求: 成功,host: ${host}`)
   const fqxs = JSON.stringify($request.headers)
    if(fqxs)    $.setdata(fqxs,`fqxs${status}`)
    $.log(`[${zhiyi}] 获取fqxs请求: 成功,fqxs: ${fqxs}`)
    $.msg(`fqxs${status}: 成功🎉`, ``)
}
}
//task_list
async function task_list(){
 return new Promise((resolve) => {
    let task_list_url = {
   	url: `https://${host}/luckycat/novel/v1/task/list?${fqxsurl}polaris_page=client_task_page&new_bookshelf=1`,
    	headers: JSON.parse(fqxs),
    	}
   $.get(task_list_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        let qd_status = result.data.task_list.daily.find(item => item.task_id === 203)
        let sign_status = qd_status.completed
        if(!sign_status) 
        await sign_in()
        let yd_status_5 = result.data.task_list.daily.find(item => item.task_id === 1006)
        if(!yd_status_5.completed) 
        no = 5
        let yd_status_10 = result.data.task_list.daily.find(item => item.task_id === 1003)
        if(!yd_status_10.completed) 
        no = 10
        let yd_status_30 = result.data.task_list.daily.find(item => item.task_id === 1009)
        if(!yd_status_30.completed) 
        no = 30
        let yd_status_60 = result.data.task_list.daily.find(item => item.task_id === 1010)
        if(!yd_status_60.completed) 
        no = 60
        let yd_status_120 = result.data.task_list.daily.find(item => item.task_id === 1011)
        if(!yd_status_120.completed) 
        no = 120
        let yd_status_180 = result.data.task_list.daily.find(item => item.task_id === 1012)
        if(!yd_status_180.completed) 
        no = 180
        if(yd_status_180.completed && yd_status_120.completed && yd_status_120.completed && yd_status_60.completed && yd_status_30.completed && yd_status_10.completed && yd_status_5.completed){
        console.log('阅读任务已经完成\n')
        message += '阅读任务已经完成\n'
        }else{
        $.log('开始阅读任务\n')
        await read()
        }
        let sp_status = result.data.task_list.daily.find(item => item.task_id === 111)
        let video_status = sp_status.completed
        console.log('开始视频任务\n视频任务进度：'+sp_status.desc)
        if(!video_status) 
        await ad()
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//sign_in
async function sign_in(){
 return new Promise((resolve) => {
    let sign_in_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/sign_in?${fqxsurl}`,
    	headers: JSON.parse(fqxs),
    	body: `{}`
    	}
   $.post(sign_in_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log(result.err_tips+'获得'+result.data.amount+'🍅') 
        message += result.err_tips+'获得'+result.data.amount+'🍅\n'
        }else{
        console.log('签到任务：'+result.err_tips)
        message += '签到任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这是因为之前提交数据错误导致的\n')
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//read
async function read(){
 return new Promise((resolve) => {
    let read_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/daily_read_${no}m?${fqxsurl}`,
    	headers: JSON.parse(fqxs),
    	body: `{
  "new_bookshelf" : true,
  "task_key" : "daily_read_${no}m"
}`
    	}
   $.post(read_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log(`第${no}时段阅读`+result.err_tips+'获得'+result.data.amount+'🍅\n') 
        message += `第${no}时段阅读`+ result.err_tips+'获得'+result.data.amount+'🍅\n'
        }else{
        console.log('阅读任务：'+result.err_tips)
        message += '阅读任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这是因为之前提交数据错误导致的\n')
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//ad
async function ad(){
 return new Promise((resolve) => {
    let ad_url = {
   	url: `https://${host}/luckycat/novel/v1/task/done/excitation_ad?${fqxsurl}`,
    	headers: JSON.parse(fqxs),
    	body: `{
  "new_bookshelf" : true,
  "task_key" : "excitation_ad"
}`
    	}
   $.post(ad_url,async(error, response, data) =>{
    try{
        if (error) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(error));
          $.logErr(error);
        } else {
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.err_no == 0){
        console.log('视频任务：'+result.err_tips+'获得'+result.data.amount+'🍅') 
        message += '视频任务：'+result.err_tips+'获得'+result.data.amount+'🍅'
        }else{
        console.log('视频任务：'+result.err_tips)
        message += '视频任务：'+result.err_tips+'\n'
        console.log('\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号，这个广告没找到解决办法')
        note = '\n来自执意⏰：请稍后再试，等几个小时之后试试就好了,这不是黑号'
        }
        }
       }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
}
//showmsg
async function showmsg(){
  if(tz == 1){
   if ($.isNode()){
       await notify.sendNotify($.name,message)
   }else{
       $.msg(zhiyi,'',message+note)
   }
  }else{
       console.log(message+note)
   }
 }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
