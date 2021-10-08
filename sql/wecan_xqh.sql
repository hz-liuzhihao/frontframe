drop table if exists xqh_user_interact_comment;
create table xqh_user_interact_comment(
  id bigint comment '评论交互id',
  user_id bigint comment '用户id',
  comment_id bigint comment '评论id',
  is_raise tinyint comment '是否点赞',
  is_collect tinyint comment '是否收藏',
) default charset=utf8 comment='评论交互表';

drop table if exists xqh_user_reply_comment;
create table xqh_user_reply_comment(
  id bigint comment '回复id',
  user_id bigint comment '回复用户id',
  replied_user_id bigint comment '被回复用户id',
  comment_id bigint comment '评论id',
  is_deleted tinyint comment '是否删除',
  create_date bigint comment '回复日期'
) default charset=utf8 comment='回复评论表';

drop table if exists xqh_atuser;
create table xqh_atuser(
  id bigint comment '主键id',
  user_id bigint comment '用户id',
  at_user_id bigint comment '@用户id',
  at_content_id bigint comment '内容id',
  `type` tinyint comment '文章,评论',
  create_date bigint comment '@日期',
) default charset=utf8 comment='@表';

drop table if exists xqh_complain;
create table xqh_complain(
  id bigint comment '主键id',
  complain_id bigint comment '投诉对象id',
  content varchar(300) comment '投诉内容',
  image_url varchar(300) comment '投诉图片',
  `type` tinyint comment '0 - 文章,1 - 评论,2- 回复',
  create_date bigint comment '投诉日期'
) default charset=utf8 comment='投资';

drop table if exists xqh_user_follow;
create table xqh_user_follow(
  id bigint comment '主键id';
  user_id bigint comment '发起关注用户id',
  follow_user_id bigint comment '被关注用户id',
  create_date bigint comment '关注日期'
) default charset=utf8 comment='用户关注';

drop table if exists xqh_user_message;
create table xqh_user_message(
  id bigint comment '主键id',
  user_id bigint comment '发起私信用户id',
  letter_user_id bigint comment '被私信用户id',
  create_date bigint comment '发送日期'
) default charset=utf8 comment='私信消息-只保存未读的';

drop table if exists xqh_order;
create table xqh_order(
  id bigint comment '主键id',
  order_id bigint comment '订单行id',
  order_time bigint comment '下单时间',
  finish_time bigint comment '完成时间',
  order_emt tinyint comment '下单设备',
  union_id int comment '推客id',
  plus tinyint comment '是否是会员',
  sku_id bigint comment '商品id',
  sku_name varchar(150) comment '商品名称',
  sku_num int comment '商品数量',
  sku_return_num int comment '退货数量',
  sku_frozen_num int comment '售后中数量',
  price decimal comment '商品单价',
  commission_rate decimal comment '佣金比例',
  sub_side_rate decimal comment '分成比例',
  subsidy_rate decimal comment '补贴比例',
  final_rate decimal comment '分佣比例',
  estimate_cos_price decimal comment '预估计分佣金额',
  estimate_fee decimal comment '推客佣金额',
  actual_cos_price decimal comment '最终分佣金额',
  actual_fee decimal comment '推客分佣金额',
  position_id bigint comment '推广位id',
  site_id int comment '应用id',
  cid int comment '类目id',
  pay_month bigint comment '预估结算时间',
  gift_coupon_ocs_amount decimal comment '礼金分摊金额',
  gift_coupon_key int comment '礼金批次id',
  image_url varchar(255) comment '商品图片url',
  express_status tinyint comment '发货状态',
  is_deleted tinyint comment '是否删除',
  position_commission_rate decimal comment '推广位佣金比例',
  is_settle tinyint comment '是否已结算',
  create_date bigint comment '创建时间',
  update_date bigint comment '更新时间'
) default charset=utf8 comment='订单包含佣金表';

drop table if exists xqh_consume;
create table xqh_user_consume(
  id bigint comment '主键id',
  user_id bigint comment '消费用户',
  consumed_user_id bigint comment '被消费者用户,为null则是平台所有',
  consume_id bigint comment '消费物品id',
  content_type tinyint comment '消费类型,如文章,动态,小说等',
  `type` tinyint comment '积分,人民币',
  amount decimal comment '消费金额',
  create_date bigint comment '创建日期',
  update_date bigint comment '更新日期'
) default charset=utf8 comment='用户消费表只有插入没有修改';

drop table if exists xqh_deliver_gift(
  id bigint comment '主键id',
  user_id bigint comment '送礼用户id',
  knowledge_id bigint comment '文章id',
  knowledge_title varchar(255) comment '文章标题',
  `type` tinyint comment '礼物类型0 币 1 积分',
  gift_id int comment '礼物id',
  amount decimal comment '礼物金额',
  create_date bigint comment '日期'
) default charset=utf8 comment='用户送礼表';

drop table if exists xqh_gift(
  id int comment '主键id',
  `name` varchar(20) comment '名称',
  `type` tinyint comment '0 币 1 积分',
  amount decimal comment '金额',
  image_url varchar(255) comment '礼物图url地址',
  create_date bigint comment '创建日期'
) default charset=utf8 comment='礼物类型';

drop table if exists xqh_money_inout_record;
create table xqh_user_money_inout_record(
  id bigint comment '主键id',
  user_id bigint comment '用户id',
  record_id bigint comment '来源id',
  `type` tinyint comment '类型,0佣金,1充值,2文章,3动态,4小说',
  amount decimal comment '额度'
) default charset=utf8 comment='用户金额收入支出记录表只有插入没有修改';

drop table if exists xqh_integral_inout_record;
create table xqh_user_integral_inout_record(
  id bigint comment '主键id',
  user_id bigint comment '用户id'
  record_id bigint comment '来源id',
  `type` tinyint comment '类型,0文章,1文章,2动态,3小说,4签到',
  amount decimal comment '额度'
) default charset=utf8 comment='用户积分收入支出记录表只有插入没有修改';

drop table if exists xqh_platform_income_record;
create table xqh_platform_income(
  id bigint comment '主键id',
  record_id bigint comment '来源id',
  `type` tinyint comment '类型,0文章,1订单,2动态,3小说',
  amount decimal comment '额度',
  create_date bigint comment '创建时间'
) default charset=utf8 comment='平台收益表只准插入不能修改,正+负-';

drop table if exists xqh_sign_record;
create table xqh_sign_record(
  id bigint comment '主键id',
  user_id bigint comment '签到用户',
  sign_date int comment '签到日期',
  create_date bigint comment '签到时间'
) default charset=utf8 comment='签到记录';

drop table if exists xqh_knowledge_topic;
create table xqh_knowledge_topic(
  id bigint comment '主键id',
  knowledge_id bigint comment '文章id',
  topic_id bigint comment '话题id'
) default charset=utf8 comment='文章话题-主表';

drop table if exists xqh_topic;
create table xqh_topic(
  id bigint comment '主键id',
  topic varchar(20) comment '话题',
  `status` tinyint comment '状态'
) default charset=utf8 comment='话题';

drop table if exists xqh_logs;
create table xqh_logs(
  id bigint comment '主键id',
  operate_type tinyint comment '操作类型,增加,修改,删除',
  primary_id bigint comment '操作的主键id',
  user_id bigint comment '操作的用户id',
  old_content longtext comment '新增,删除和修改的时候的当前内容',
  create_date bigint comment '记录日志日期',
) default charset=utf8 comment='操作日志';