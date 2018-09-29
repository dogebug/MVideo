const app = getApp()

Page({
  data: {
  },
  doLogin:function(e){
      var that = this;
      var username = e.detail.value.username;
      var password = e.detail.value.password;
      wx.request({
        url: 'http://localhost:8080/login',
        method:'Post',
        data:{
          username:username,
          password:password
        },
        success:g=>{
          if(g.data.status == 200){
            wx.showToast({
              title: '登录成功',
              icon:'none',
              duration:1000
            }),
            wx.navigateTo({
              url: '../mine/mine',
            }),
            wx.setStorageSync("user", g.data.data);
            console.log(g);
          }else{
            wx.showToast({
              title: '用户名或密码出错',
              icon:'none',
              duration:1000
            })
          }
        }
      })
  },
  goRegistPage:function(){
    wx.navigateTo({
      url: '../userRegist/regist',
    })
  }
 
})