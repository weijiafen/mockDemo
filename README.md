### 一个mock数据的demo
启动一个node服务器来转发接口请求，使得请求url之后以一种约定规则读取mock目录下的json文件，达到模拟后台接口返回数据的效果，使得前端可以专心开发页面逻辑而忽略后台实现，是前后端分离并行开发的一种模式
#### 步骤
1. git clone 下来
2. npm install 安装依赖
3. 在router.js中配置转发规则（约定规则在router.js的注释中）
4. 使用node server.js命令启动服务器
5. 每次增加规则后都需要重启服务器