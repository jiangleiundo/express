/**
 *  student.js数据操作模块
 *  职责：
 *      操作文件中的数据，只操作数据，不关心业务
 * */

const dbPath = './db.json';
const fs = require('fs');

/**
 *  获取所有学生列表
 * @param callback
 *      第一个参数是err，成功是错误对象，失败是null
 *      第二个参数是结果，成功是数组对象，失败是undefined
 *
 */
exports.find = function (callback){
    fs.readFile(dbPath, 'utf8', function (err, data){
        if(err){
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
};

/**
 * 通过id找到当前目标学生信息
 * @param id 学生id
 * @param callback [第一个参数是err，第二个参数是student]
 */
exports.findById = function (id, callback){
    fs.readFile(dbPath, 'utf8', function (err, data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students;
        //find方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
        let student = students.find(function (item){
            return item.id === parseInt(id) //传过来的id是字符串，要转化为数字
        });

        callback(null, student)
    })
};

/**
 *  添加保存学生
 */
exports.save = function (student, callback){
    fs.readFile(dbPath, function (err, data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students;
        //每次新添加学生的id是最后一个学生的id+1
        student.id = parseInt(students[students.length - 1].id + 1);
        students.push(student);

        let fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err){
            if(err){
                return callback(err) //失败传错误对象
            }
            callback(null) //写文件成功时错误的回调就是null
        })
    })
};

/**
 *  更新学生信息
 */
exports.updateById = function (student, callback){
    fs.readFile(dbPath, function (err, data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students;
        //id统一成数字类型，这一步必须否则upStudent可能匹配不到
        student.id = parseInt(student.id);

        let upStudent = students.find(function (item){
            return item.id === student.id
        });

        for (let key in student){ //修改信息
            upStudent[key] = student[key]
        }

        let fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err){
            if(err){
                return callback(err) //失败传错误对象
            }
            callback(null) //写文件成功时错误的回调就是null
        })
    })
};

/**
 *  删除学生
 */
exports.deleteById = function (id, callback){
    fs.readFile(dbPath, function (err, data){
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students;

        let delIndex = students.findIndex(function (item){
            return item.id === parseInt(id)
        });

        //删除选中的项
        students.splice(delIndex, 1);

        let fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err){
            if(err){
                return callback(err) //失败传错误对象
            }
            callback(null) //写文件成功时错误的回调就是null
        })
    })
};
