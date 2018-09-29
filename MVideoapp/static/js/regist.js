const app = getApp()

Page({
    data: {

    },

   doRegist:function(e){
     var that = this;
     var username = e.detail.value.username;
     var password = e.detail.value.password;
     wx.request({
       url: 'http://localhost:8080/reg',
       data:{
        username : username,
        password : password
       },
       method:'Post',
       success:e=>{
         if(e.data.status == 200){
           wx.showToast({
             title: '注册成功',
             icon:'none',
             duration:2000
           }),
           wx.navigateTo({
             url: '../userLogin/login',
           })
         }else{
           wx.showToast({
             title: '用户已存在',
             icon:'none',
             duration:2000
           })
         }
       }
     })
   },
   goLoginPage:function(){
     wx.navigateTo({
       url: '../userLogin/login',
     })
   }
})