drop table if exists we_user;
create table we_user(
  id bigint comment '主键id',
  `name` varchar(10) comment '昵称',
  sex tinyint comment '性别',
  `level` tinyint comment '等级',
  avatar varchar(255) comment '头像',
  phone char(11) comment '手机号',
  `password` varchar(20) comment '密码',
  info varchar(100) comment '简介',
  invite_id bigint comment '邀请人id',
  `status` tinyint comment '状态',
  role_ids varchar(255) comment `角色id`,
  birthday bigint comment '出生年月日',
  wechat_id int comment '微信id',
  create_date bigint comment '创建日期',
  update_date bigint comment '更新日期',
  primary key(id),
) default charset=utf8 comment='用户表';

drop table if exists we_category;
create table we_category(
  id int comment '主键id',
  parent_id int comment '父id',
  `name` varchar(10) comment '类目名称',
  `type` tinyint comment '是否有子类目,0有子类目1无子类目',
  sex_type tinyint comment '类目适用的性别类型0男1女2通用',
  pic_url varchar(255) comment '类目图片',
  create_date bigint comment '创建时间',
) default charset=utf8 comment='类目表';

drop table if exists we_shop;
create table if exists we_shop(
  id bigint comment '店铺id',
  user_id bigint comment '用户id',
  nick varchar(20) comment '名称',
  post_limit_free decimal comment '店铺下单价格达到多少免邮,为0时则永不免邮',
  status tinyint comment '状态',

) default charset=utf8 comment='店铺表';

drop table if exists we_shop_coupon;
create table if exists we_shop_coupon(
  can_overlap tinyint comment '是否可以重复叠加',
) default charset=utf8 comment='店铺优惠券';

drop table if exists we_good;
create table we_good(
  id bigint comment '主键id',
  shop_id bigint comment '店铺id',
  `name` varchar(200) '商品名称',
  category_id varchar(40) comment '三级类目id',
  images varchar(2040) comment '详情页',
  main_sku_value bigint comment '需要展示的skuid商品',
  is_free_post bigint comment '是否免邮',
  post_money decimal comment '邮费',
  create_date bigint '创建时间',
  update_date bigint '更新时间',
) default charset=utf8 comment='商品表';

drop table if exists we_good_coupon;
create table we_good_coupon(
  id bigint comment '优惠券id',
  shop_id bigint comment '店铺id',
  good_id bigint comment '商品id',
  can_overlap tinyint comment '是否可以重复叠加',
) default charset=utf8 comment='商品优惠券表';

drop table if exists we_sku_type;
create table we_sku_type(
  id bigint comment '主键id',
  good_id bigint comment '商品id',
  `name` varchar(30) comment 'sku类型,颜色,尺寸等,如果没有就默认',
  status tinyint comment '状态',
  create_date bigint comment '创建时间',
) default charset=utf8 comment='商品分类表';

drop table if exists we_sku_value;
create table we_sku_value(
  id bigint comment '主键id',
  `name` varchar(30) comment 'sku类型值,红色,蓝色,粉色,28x28',
  status tinyint comment '状态',
  create_date bigint comment '创建时间',
) default charset=utf8 comment='商品分类值表';

drop table if exists we_good_type;
create table we_good_type(
  id bigint comment '主键id',
  shop_id bigint comment '店铺id',
  `name` bigint comment '类型名称',
  create_date bigint comment '创建时间',
  pic_url varchar(255) comment '类型图url地址',
);

drop table if exists we_good_sku;
create table we_good_sku(
  id bigint comment '主键id',
  good_id bigint comment '商品id',
  shop_id bigint comment '店铺id',
  good_type_id bigint comment '商品类型id',
  sku_value_id bigint comment 'sku类型id',
  sku_name varchar(100) comment 'sku名称',
  inventory int comment '库存',
  price decimal comment '商品价格',
  status tinyint comment '商品状态',
  deleted tinyint comment '是否删除',
  `version` bigint comment '版本号',
  create_date bigint comment '创建时间',
  update_date bigint comment '更新时间',
) default charset=utf8 comment='商品分类sku库存表';

drop table if exists we_order;
create table we_order(
  id bigint comment '订单id',
  post_id bigint comment '物流id',
  post_type tinyint comment '物流类型',
  price decimal comment '订单价格',
  status tinyint comment '订单状态',
  create_date bigint comment '创建日期',
) default charset=utf8 comment='商品订单';

drop table if exists we_order_good;
create table we_order_good() default charset=utf8 comment='商品订单明细';


