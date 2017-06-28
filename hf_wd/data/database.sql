SET NAMES 'utf8';
DROP DATABASE IF EXISTS wd_new;
CREATE DATABASE wd_new CHARSET=UTF8;
USE wd_new;
CREATE TABLE wd_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    img_sm VARCHAR(64),
    img_lg VARCHAR(64),
	name VARCHAR(64),
	price FLOAT(6,2),
    detail VARCHAR(248),
    count INT
);
INSERT INTO wd_dish(did,img_sm,img_lg,name,price,detail,count) VALUES
(   null,
    'gg2_x.jpg',
    'gg2.jpg',
    '【Jay】夏威夷果',
    35.00,
    '坚果零食200g*3袋',
    3
),
(   null,
    'gg3_x.jpg',
    'gg3.jpg',
    '【Jay】牛轧糖',
    45.00,
    '新疆特色牛轧糖500g',
    5
),
(   null,
    'gg4_x.jpg',
    'gg4.jpg',
    '【Jay】新疆红枣',
    42.00,
    '新疆特色红枣500g',
    4
),
(   null,
    'gg5_x.jpg',
    'gg5.jpg',
    '【Jay】枣加核桃',
    45.00,
    '新疆特色枣加核桃300g',
    3
),
(   null,
    'gg6_x.jpg',
    'gg6.jpg',
    '【Jay】西域美农葡萄干',
    37.00,
    '新疆特色葡萄干800g',
    7
),
(   null,
    'gg7_x.jpg',
    'gg7.jpg',
    '【Jay】巴旦木',
    55.00,
    '新疆特色巴旦木200g*3袋',
    8
),
(   null,
    'gg8_x.jpg',
    'gg8.jpg',
    '【Jay】杏仁',
    45.00,
    '新疆特色杏仁400g',
    3
);


CREATE TABLE wd_ganGuo(
    did INT PRIMARY KEY AUTO_INCREMENT,
    img_sm VARCHAR(64),
	name VARCHAR(64),
	price FLOAT(6,2),
    detail VARCHAR(248)
);
INSERT INTO wd_ganGuo(did,img_sm,name,price,detail) VALUES
(   null,
    'gg11.jpg',
    '【Jay】新疆巴旦木',
    42.00,
    '新疆特色巴旦木500g'
),
(   null,
    'gg12.jpg',
    '【Jay】腰果',
    45.00,
    '新疆特色腰果300g'
),
(   null,
    'gg13.jpg',
    '【Jay】开心果',
    37.00,
    '新疆特色开心果800g'
),
(   null,
    'gg14.jpg',
    '【Jay】葡萄干',
    39.00,
    '新疆特色葡萄干500g'
),
(   null,
    'gg15.jpg',
    '【Jay】西域碧根果',
    69.00,
    '新疆特色碧根果300g'
),
(   null,
    'gg16.jpg',
    '【Jay】西域核桃',
    37.00,
    '新疆特色核桃300g'
);


/*用户表*/
CREATE TABLE wd_users(
    userid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    uname VARCHAR(20),                     /*用户名*/
    pwd VARCHAR(20),                       /*密码*/
    phone VARCHAR(20)                      /*电话*/
);
INSERT INTO wd_users VALUES
(NULL,'mary','11111','13111112345'),
(NULL,'jerry','22222','13819196547'),
(NULL,'john','33333','13819196547');
/*订单表*/
CREATE TABLE wd_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,     /*订单ID*/
    userid INT,
    phone VARCHAR(16),                      /*联系电话*/
    user_name VARCHAR(16),                  /*收货方用户名*/
    order_time LONG,                        /*下单时间*/
    addr VARCHAR(256),                      /*订单地址*/
    totalprice FLOAT(6,2)                   /*订单总价*/
);
INSERT INTO wd_order VALUES
(NULL,1,'13501234567','张元',1445154859209,'南京鼓楼新百B座',20.5),
(NULL,1,'13501257543','佳林',1445154997543,'南京建邺区奥体东',12.5),
(NULL,2,'13207654321','王芳',1445254997612,'南京夫子庙32号',55);


/**购物车表**/
CREATE TABLE wd_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    userid INT,                          /*用户编号：假定有用户id为 1 和 3 的两个用户有数据*/
    did INT,                             /*产品编号*/
    dishCount INT                      /*数量*/
);
INSERT INTO wd_cart VALUES (1,1,1,1),
(2,1,2,4),
(3,1,5,2),
(4,3,2,10),
(5,3,6,1);
##SELECT * FROM wd_order;
/**订单详情表**/
CREATE TABLE wd_orderdetails(
    oid INT ,                            /*订单编号*/
    did INT,                             /*产品id*/
    dishCount INT,                     /*购买数量*/
    price FLOAT(8,2)                     /*产品单价：需要记载，因为产品价格可能波动*/
);
INSERT INTO wd_orderdetails VALUES (1,1,2,5),
(1,2,1,10.5),
(2,3,1,12.5),
(3,1,3,5),
(3,2,4,10);

