/**
 * 在应用中发送付款请求，替换掉构造form的应用
 * @param req
 * @param res
 */

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *版本：3.3
 *日期：2017-9-21
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

 *提示：如何获取安全校验码和合作身份者ID
 *1.用您的签约支付宝账号登录支付宝网站(www.alipay.com)
 *2.点击“商家服务”(https://b.alipay.com/order/myOrder.htm)
 *3.点击“查询合作者身份(PID)”、“查询安全校验码(Key)”

 *安全校验码查看时，输入支付密码后，页面呈灰色的现象，怎么办？
 *解决方法：
 *1、检查浏览器配置，不让浏览器做弹框屏蔽设置
 *2、更换浏览器或电脑，重新登录查询。
 */
var AlipayConfig = {
    //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // 合作身份者ID，以2088开头由16位纯数字组成的字符串
    partner: "2088721524558520",

    // 交易安全检验码，由数字和字母组成的32位字符串
    key: "1xx1qo7c8x02a0864fm81kae2pdyaqnm",

    // 签约支付宝账号或卖家收款支付宝帐户
    seller_email: "923224994@qq.com",

    // 支付宝服务器通知的页面 要用 http://格式的完整路径，不允许加?id:123这类自定义参数
    // 必须保证其地址能够在互联网中访问的到
    notify_url: "http://127.0.0.1:3001/alipayRoute/payNotify",

    // 当前页面跳转后的页面 要用 http://格式的完整路径，不允许加?id:123这类自定义参数
    // 域名不能写成http://localhost/create_direct_pay_by_user_jsp_utf8/return_url.jsp ，否则会导致return_url执行无效
    // return_url: "http://127.0.0.1:3001/alipayRoute/payReturn",
    return_url: "http://127.0.0.1:3001/index",
    // return_url: "http://sys.zjgkzx.org/",

//      支付宝通知验证地址
    ALIPAY_HOST: "mapi.alipay.com",
    HTTPS_VERIFY_PATH: "/gateway.do?service=notify_verify&",
    ALIPAY_PATH: "gateway.do?",

//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


// 调试用，创建TXT日志路径
    log_path: "~/alipay_log_.txt",

// 字符编码格式 目前支持 gbk 或 utf-8
    input_charset: "UTF-8",

// 签名方式 不需修改
    sign_type: "MD5"
};



exports.alipayto = function (req, res) {
    //https://mapi.alipay.com/gateway.do?
    // body=11&
    // total_fee=0.01&
    // subject=11&
    // sign_type=MD5&
    // service=create_direct_pay_by_user&
    // notify_url=http%3A%2F%2Fwww.xxx.cn%2Fcreate_direct_pay_by_user_jsp_utf8%2Fnotify_url.jsp&
    // out_trade_no=20120607141151&
    // payment_type=1&
    // show_url=http%3A%2F%2Fwww.xxx.com%2Forder%2Fmyorder.jsp&
    // return_url=http%3A%2F%2F127.0.0.1%3A8080%2Fcreate_direct_pay_by_user_jsp_utf8%2Freturn_url.jsp/gateway.do?body=11&
    // 支付宝通知回调地址    notify_url=http://www.xxx.cn/create_direct_pay_by_user_jsp_utf8/notify_url.jsp&
    // 唯一订单号           out_trade_no=20120708132324&
    // payment_type=1&
    // return_url=http://127.0.0.1:8080/create_direct_pay_by_user_jsp_utf8/return_url.jsp&
    // service=create_direct_pay_by_user&
    // 商品显示地址         show_url=http://www.xxx.com/order/myorder.jsp&
    // subject=11&total_fee=0.01&sign=dfc1995af2ff01642a3cf6936ce0d57c&
    // sign_type=MD5

    ////////////////////////////////////请求参数//////////////////////////////////////

    //必填参数//

    //请与贵网站订单系统中的唯一订单号匹配
    var out_trade_no = '201701112e232';

    console.log(out_trade_no);

    //订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
    // var subject = req.body.subject;
    var subject = '新高考平台款项支付';

    //订单描述、订单详细、订单备注，显示在支付宝收银台里的“商品描述”里
    // var body = req.body.alibody;
    var body = '新高考平台款项支付，支付完毕后会自动跳转到新高考平台页面';

    //订单总金额，显示在支付宝收银台里的“应付总额”里
    // var total_fee = req.body.total_fee;
    var total_fee = 0.02;


    //扩展功能参数——默认支付方式//

    //默认支付方式，取值见“即时到帐接口”技术文档中的请求参数列表
    var payMethod = "";

    //默认网银代号，代号列表见“即时到帐接口”技术文档“附录”→“银行列表”
    var defaultBank = "";

    //扩展功能参数——防钓鱼//

    //防钓鱼时间戳
    var anti_phishing_key = "";

    //获取客户端的IP地址，建议：编写获取客户端IP地址的程序
    var exter_invoke_ip = "";

    //注意：
    //1.请慎重选择是否开启防钓鱼功能
    //2.exter_invoke_ip、anti_phishing_key一旦被设置过，那么它们就会成为必填参数
    //3.开启防钓鱼功能后，服务器、本机电脑必须支持远程XML解析，请配置好该环境。
    //4.建议使用POST方式请求数据
    //示例：
    //anti_phishing_key = AlipayService.query_timestamp();	//获取防钓鱼时间戳函数
    //exter_invoke_ip = "202.1.1.1";

    //扩展功能参数——其他///

    //自定义参数，可存放任何内容（除=、&等特殊字符外），不会显示在页面上
    var extra_common_param = "";

    //默认买家支付宝账号
    var buyer_email = "";

    //商品展示地址，要用http:// 格式的完整路径，不允许加?id=123这类自定义参数
    // var show_url = "http://www.xxx.com/order/myorder.jsp";
    var show_url = "localhost:8080/index";

    //扩展功能参数——分润(若要使用，请按照注释要求的格式赋值)//

    //提成类型，该值为固定值：10，不需要修改
    var royalty_type = "";
    //提成信息集
    var royalty_parameters = "";
    //注意：
    //与需要结合商户网站自身情况动态获取每笔交易的各分润收款账号、各分润金额、各分润说明。最多只能设置10条
    //各分润金额的总和须小于等于total_fee
    //提成信息集格式为：收款方Email_1^金额1^备注1|收款方Email_2^金额2^备注2
    //示例：
    //royalty_type = "10"
    //royalty_parameters	= "111@126.com^0.01^分润备注一|222@126.com^0.01^分润备注二"

    //////////////////////////////////////////////////////////////////////////////////

    //把请求参数打包成数组
    var sParaTemp = [];
    sParaTemp.push(["payment_type", "1"]);
    sParaTemp.push(["out_trade_no", out_trade_no]);
    sParaTemp.push(["subject", subject]);
    sParaTemp.push(["body", body]);
    sParaTemp.push(["total_fee", total_fee]);

    // sParaTemp.push(["show_url", show_url]);

    sParaTemp.push(["payMethod", payMethod]);
    sParaTemp.push(["defaultBank", defaultBank]);
    sParaTemp.push(["anti_phishing_key", anti_phishing_key]);
    sParaTemp.push(["exter_invoke_ip", exter_invoke_ip]);
    sParaTemp.push(["extra_common_param", extra_common_param]);
    sParaTemp.push(["buyer_email", buyer_email]);
    sParaTemp.push(["royalty_type", royalty_type]);
    sParaTemp.push(["royalty_parameters", royalty_parameters]);

    console.log(sParaTemp);
    /**
     * 构造即时到帐接口
     * @param sParaTemp 请求参数集合
     * @return 表单提交HTML信息
     */
    var create_direct_pay_by_user = function (sParaTemp) {
        //增加基本配置
        sParaTemp.push(["service", "create_direct_pay_by_user"]);
        sParaTemp.push(["partner", AlipayConfig.partner]);
        sParaTemp.push(["return_url", AlipayConfig.return_url]);
        sParaTemp.push(["notify_url", AlipayConfig.notify_url]);
        sParaTemp.push(["seller_email", AlipayConfig.seller_email]);
        sParaTemp.push(["_input_charset", AlipayConfig.input_charset]);

        /**
         * 构造提交表单HTML数据
         * @param sParaTemp 请求参数数组
         * param gateway 网关地址
         * param strMethod 提交方式。两个值可选：post、get
         * param strButtonName 确认按钮显示文字
         * @return 提交表单HTML文本
         */
        var buildURL = function (sParaTemp) {
            /**
             * 生成要请求给支付宝的参数数组
             * @param sParaTemp 请求前的参数数组
             * @return 要请求的参数数组
             */
            var buildRequestPara = function (sParaTemp) {
                var sPara = [];
                //除去数组中的空值和签名参数
                for (var i1 = 0; i1 < sParaTemp.length; i1++) {
                    var value = sParaTemp[i1];
                    if (value[1] === null || value[1] === "" || value[0] === "sign"
                        || value[0] === "sign_type") {
                        continue;
                    }
                    sPara.push(value);
                }
                sPara.sort();
                //生成签名结果
                var prestr = "";
                //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
                for (var i2 = 0; i2 < sPara.length; i2++) {
                    var obj = sPara[i2];
                    if (i2 === sPara.length - 1) {
                        prestr = prestr + obj[0] + "=" + obj[1];
                    } else {
                        prestr = prestr + obj[0] + "=" + obj[1] + "&";
                    }

                }
                prestr = prestr + AlipayConfig.key; //把拼接后的字符串再与安全校验码直接连接起来
                var crypto = require('crypto');
                var mysign = crypto.createHash('md5').update(prestr, AlipayConfig.input_charset).digest("hex");
                //签名结果与签名方式加入请求提交参数组中
                sPara.push(["sign", mysign]);
                sPara.push(["sign_type", AlipayConfig.sign_type]);

                return sPara;
            };
            //待请求参数数组
            var sPara = buildRequestPara(sParaTemp);
            var path = AlipayConfig.ALIPAY_PATH;


            for (var i3 = 0; i3 < sPara.length; i3++) {
                var obj = sPara[i3];
                var name = obj[0];
                var value = encodeURIComponent(obj[1]);
                if (i3 < (sPara.length - 1)) {
                    path = path + name + "=" + value + "&";
                } else {
                    path = path + name + "=" + value;
                }
            }
            return path.toString();
        };

        return buildURL(sParaTemp);
    };
    //构造函数，生成请求URL
    var sURL = create_direct_pay_by_user(sParaTemp);
    // console.log(sURL);
    //向支付宝网关发出请求
//    requestUrl(AlipayConfig.ALIPAY_HOST,show_url,function(data){
//        console.log(data);
//    });
//     res.redirect("https://" + AlipayConfig.ALIPAY_HOST + "/" + sURL);
};