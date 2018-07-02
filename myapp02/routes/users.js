var express = require('express');
var router = express.Router();

var db = require('../servers/dbmysql');
/* GET users listing. */
router.get('/List', function(req, res, next) { //查询所有用户
  res.header('Access-Control-Allow-Origin', '*');
  db.query('SELECT * FROM user',function(err,rows){
    if(err){
      res.json(err)
    }else{
      res.json(rows)
    }
  })
});
//用户注册
router.post('/register',function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  var reqParams = req.body
  var addSql = 'INSERT INTO user (phone,name,nickname,password) VALUES(?,?,?,?)';
  var sqlData = [reqParams.phone,reqParams.name,reqParams.nickname,reqParams.password]
  var resData = {code:0,data:[],message:''}
  db.query('SELECT * FROM user where phone = '+reqParams.phone,function(err,rows){
    if(rows.length<=0){ //数据库没数据可以注册
      db.query(addSql,sqlData,function(err,rows){
        if(err){
          resData.code = -1
          resData.err = err
          resData.message = '注册失败'
          res.json(resData)
        }else{
          resData.message = '注册成功'
          res.json(resData)
        }
      })
    }else{  //改用户已被注册
       resData.code = -1
       resData.message = '改用户已被注册'
       res.json(resData)
    }
  })
})
// 用户登录
router.post('/login',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  var reqData = req.body
  var loginSql = 'select * from user where phone = ?'
  var sqlData = [reqData.phone]
  var resData = {code:0,data:[],message:''}
  db.query(loginSql,sqlData,function(err,rows){
    if(rows.length ==1 && rows[0].password == reqData.password){ //可以登陆了
      resData.message = '查询正确'
      res.json(resData)
    }else if(rows.length ==1 && rows[0].password != reqData.password){
      console.log(rows[0].password+":"+reqData.password)
      resData.code = -1
      resData.message = '密码错误'
      res.json(resData)
    }else{
      resData.code = -1
      resData.message = '查无此人'
      res.json(resData)
    }
  })
})
//忘记密码
router.post('/updatePwd',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  var reqData = req.body
  var updatePwdSql = 'update user set password = ? where phone = ?'
  var sqlData = [reqData.password,reqData.phone]
  var resData = {code:0,data:[],message:''}
  db.query('select * from user where phone = '+reqData.phone,function(err,rows){
    if(rows.length == 1){
      db.query(updatePwdSql,sqlData,function(err,rows){
        if(!err){
          resData.message = '修改密码成功'
          res.json(resData)
        }else{
          resData.code = -1
          resData.message = '修改密码失败'
          res.json(resData)
        }
      })
    }else{
      resData.code = -1
      resData.message = '查无此号码'
      res.json(resData)
    }
  })

})

module.exports = router;
