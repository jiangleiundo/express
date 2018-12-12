/**
 *  router.js路由模块
 *  职责：
 *      处理路由
 *      根据不同请求方式+请求路径设置具体的请求处理函数
 *   模块职责要单一，有利于提高开发效率
 */

// express提供一种专门包装路由的方式
const express = require('express');

// 1.创建一个路由容器
const router = express.Router();

//引入处理学生数据模块
const Students = require('./student.js');

// 2.把router挂载到router路由容器中
router.get('/students', function (req, res){
    Students.find(function (err, students){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('index.html', {
            title: ['title名1', 'title名2', 'title名3'],
            students: students
        })
    })
});

router.get('/students/new', function (req, res){
    //添加新学生，直接渲染添加页面
    res.render('new.html')
});

router.post('/students/new', function (req, res){
    Students.save(req.body, function (err){
        if(err){
            return res.status(500).send('server error')
        }
        //保存数据成功后重定向到首页
        res.redirect('/students')
    })
});

router.get('/students/edit', function (req, res){
    //根据编辑学生的id填写表单
    Students.findById(req.query.id, function (err, student){
        if(err){
            return res.status(500).send('server error')
        }
        res.render('edit.html', {
            student: student
        })
    });
});

router.post('/students/edit', function (req, res){
    Students.updateById(req.body, function (err){
        if(err){
            return res.status(500).send('server error')
        }
        //保存数据成功后重定向到首页
        res.redirect('/students')
    })
});

router.get('/students/delete', function (req, res){
    Students.deleteById(req.query.id, function (err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })

});


// 3.把路由导出，谁引用它谁就得到router
module.exports = router;
