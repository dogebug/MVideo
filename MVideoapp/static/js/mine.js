
const app = getApp()

Page({
  data: {
    faceUrl: "../resource/images/noneface.png",
   
  },
  onLoad:function(){
    var user = wx.getStorageSync("user");
    var userImage;
    if(user.faceImage){
      userImage = "http://localhost:8080/"+user.faceImage;
    }else{
      userImage = this.data.faceUrl;
    }
    this.setData({
      nickname:user.nickname,
      fansCounts:user.fansCounts,
      followCounts:user.followCounts,
      receiveLikeCounts:user.receiveLikeCounts,
      faceUrl:userImage
    })
  },
  changeFace:function(){
    var userId = wx.getStorageSync("user").id;
    var username = wx.getStorageSync("user").username;
    var that = this;
    wx.chooseImage({
      count:1,
      sourceType:['album'],
      success: function(res) {
        console.log(res)
        wx.uploadFile({
          url: 'http://localhost:8080/changeHead?userId='+userId,
          filePath: res.tempFiles[0].path,
          name: 'file',
          formData:{
            
          },
          success:e=>{
            var data = JSON.parse(e.data);
            if(data.status == 200){
              wx.showToast({
                title: '更换成功',
                icon:"none",
                duration:2000
              }),
              wx.request({
                url: 'http://localhost:8080/userMsg',
                method:'Get',
                data:{
                  username:username
                },
                success:g=>{
                  that.setData({
                    faceUrl:"http://localhost:8080"+g.data.data.faceImage
                  })
                }
              })
            
            }else{
              wx.showToast({
                title: '更换失败',
                icon: "none",
                duration: 2000
              })
            }
          }
        })
      },
    })
  },
  logout:function(){
    var id = wx.getStorageSync("user").id;
    wx.request({
      url: 'http://localhost:8080/logout',
      method:'Post',
      data:{
        id:id
      },
      success:e=>{
        if(e.data.status == 200){
          wx.showToast({
            title: '注销成功',
            icon:'none',
            duration:1000
          }),
          wx.navigateTo({
            url:'../userLogin/login'
          })
        }else{
          wx.showToast({
            tital:'注销失败',
            icon:'none',
            duration:1000
          })
        }
      }
    })
  } 
})
