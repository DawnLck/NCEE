const express = require('express'),
    router = express.Router();

//获取验证码
let getMySign = function (params) {
    let sPara = [];//转换为数组利于排序 除去空值和签名参数
    if (!params) return null;
    for (let key in params) {
        if ((!params[key]) || key === "sign" || key === "sign_type") {
            console.log('null:' + key);
            continue;
        }
        sPara.push([key, params[key]]);
    }
    sPara.sort();
    //生成签名结果
    let prestr = "";
    //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
    for (let i2 = 0; i2 < sPara.length; i2++) {
        let obj = sPara[i2];
        if (i2 === sPara.length - 1) {
            prestr = prestr + obj[0] + "=" + obj[1];
        } else {
            prestr = prestr + obj[0] + "=" + obj[1] + "&";
        }

    }
    prestr = prestr + AlipayConfig.key; //把拼接后的字符串再与安全校验码直接连接起来
    //body=Hello&buyer_email=13758698870&buyer_id=2088002007013600&discount=-5&extra_common_param=你好，这是测试商户的广告。&gmt_close=2008-10-22 20:49:46&gmt_create=2008-10-22 20:49:31&gmt_payment=2008-10-22 20:49:50&gmt_refund=2008-10-29 19:38:25&is_total_fee_adjust=N&notify_id=70fec0c2730b27528665af4517c27b95&notify_time=2009-08-12 11:08:32&notify_type=交易状态同步通知(trade_status_sync)&out_trade_no=3618810634349901&payment_type=1&price=10.00&quantity=1&refund_status=REFUND_SUCCESS&seller_email=chao.chenc1@alipay.com&seller_id=2088002007018916&sign=_p_w_l_h_j0b_gd_aejia7n_ko4_m%2Fu_w_jd3_nx_s_k_mxus9_hoxg_y_r_lunli_pmma29_t_q%3D%3D&sign_type=DSA&subject=iphone手机&total_fee=10.00&trade_no=2008102203208746&trade_status=TRADE_FINISHED&use_coupon=N

    let crypto = require('crypto');
    return crypto.createHash('md5').update(prestr, AlipayConfig.input_charset).digest("hex");
};

//发送请求
let requestUrl = function (host, path, callback) {
    let https = require('https');

    let options = {
        host: host,
        port: 443,
        path: path,
        method: 'GET'
    };

    let req = https.request(options, function (res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function (d) {
            callback(d);
        });
    });
    req.end();

    req.on('error', function (e) {
        console.error(e);
    });
};

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
let AlipayConfig = {
    //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // 合作身份者ID，以2088开头由16位纯数字组成的字符串
    partner: "2088721524558520",

    // 交易安全检验码，由数字和字母组成的32位字符串
    key: "1xx1qo7c8x02a0864fm81kae2pdyaqnm",

    // 签约支付宝账号或卖家收款支付宝帐户
    seller_email: "923224994@qq.com",

    // 支付宝服务器通知的页面 要用 http://格式的完整路径，不允许加?id:123这类自定义参数
    // 必须保证其地址能够在互联网中访问的到
    notify_url: "http://127.0.0.1:3000/alipayRoute/payNotify",

// 当前页面跳转后的页面 要用 http://格式的完整路径，不允许加?id:123这类自定义参数
// 域名不能写成http://localhost/create_direct_pay_by_user_jsp_utf8/return_url.jsp ，否则会导致return_url执行无效
    return_url: "http://127.0.0.1:3000/alipayRoute/payReturn",

//      支付宝通知验证地址
    ALIPAY_HOST: "mapi.alipay.com",
    ALIPAY_PATH: "gateway.do?",
    HTTPS_VERIFY_PATH: "/gateway.do?service=notify_verify&",

//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


// 调试用，创建TXT日志路径
    log_path: "~/alipay_log_.txt",

// 字符编码格式 目前支持 gbk 或 utf-8
    input_charset: "UTF-8",

// 签名方式 不需修改
    sign_type: "MD5"
};

/* 支付宝服务付款消息回调 */
let AlipayNotify = {
    verify: function (params, callback) {
        let mysign = getMySign(params);
        let sign = params["sign"] ? params["sign"] : "";
        if (mysign === sign) {
            let responseTxt = "true";
            if (params["notify_id"]) {
                //获取远程服务器ATN结果，验证是否是支付宝服务器发来的请求

                let partner = AlipayConfig.partner;
                let veryfy_path = AlipayConfig.HTTPS_VERIFY_PATH + "partner=" + partner + "&notify_id=" + params["notify_id"];
                console.log('Verify Path: ' + veryfy_path);

                requestUrl(AlipayConfig.ALIPAY_HOST, veryfy_path, function (responseTxt) {
                    if (responseTxt) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                });
            }
        } else {
            callback(false);
        }

        //写日志记录（若要调试，请取消下面两行注释）
        //String sWord = "responseTxt=" + responseTxt + "\n notify_url_log:sign=" + sign + "&mysign="
        //              + mysign + "\n 返回参数：" + AlipayCore.createLinkString(params);
        //AlipayCore.logResult(sWord);


        //验证
        //responsetTxt的结果不是true，与服务器设置问题、合作身份者ID、notify_id一分钟失效有关
        //mysign与sign不等，与安全校验码、请求时的参数格式（如：带自定义参数等）、编码格式有关
    }
};

router.get('/alipayInit', function (req, res) {
    //https://mapi.alipay.com/gateway.do?
    // body=11&
    // total_fee=0.01&
    // subject=11&
    // sign_type=MD5&
    // service=create_direct_pay_by_user&
    // notify_url=http%3A%2F%2Fwww.xxx.cn%2Fcreate_direct_pay_by_user_jsp_utf8%2Fnotify_url.jsp&
    // out_trade_no=20120607141151&payment_type=1&
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
    let out_trade_no = new Date().getTime();

    //订单名称，显示在支付宝收银台里的“商品名称”里，显示在支付宝的交易管理的“商品名称”的列表里。
    // let subject = req.body.subject;
    let subject = '新高考平台款项支付';

    //订单描述、订单详细、订单备注，显示在支付宝收银台里的“商品描述”里
    // let body = req.body.alibody;
    let body = '新高考平台款项支付，支付完毕后会自动跳转到新高考平台页面';

    //订单总金额，显示在支付宝收银台里的“应付总额”里
    // let total_fee = req.body.total_fee;
    let total_fee = 0.01;


    //扩展功能参数——默认支付方式//

    //默认支付方式，取值见“即时到帐接口”技术文档中的请求参数列表
    let payMethod = "";

    //默认网银代号，代号列表见“即时到帐接口”技术文档“附录”→“银行列表”
    let defaultBank = "";

    //扩展功能参数——防钓鱼//

    //防钓鱼时间戳
    let anti_phishing_key = "";

    //获取客户端的IP地址，建议：编写获取客户端IP地址的程序
    let exter_invoke_ip = "";

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
    let extra_common_param = "";

    //默认买家支付宝账号
    let buyer_email = "";

    //商品展示地址，要用http:// 格式的完整路径，不允许加?id=123这类自定义参数
    // let show_url = "http://www.xxx.com/order/myorder.jsp";
    let show_url = "localhost:8080/index";

    //扩展功能参数——分润(若要使用，请按照注释要求的格式赋值)//

    //提成类型，该值为固定值：10，不需要修改
    let royalty_type = "";
    //提成信息集
    let royalty_parameters = "";
    //注意：
    //与需要结合商户网站自身情况动态获取每笔交易的各分润收款账号、各分润金额、各分润说明。最多只能设置10条
    //各分润金额的总和须小于等于total_fee
    //提成信息集格式为：收款方Email_1^金额1^备注1|收款方Email_2^金额2^备注2
    //示例：
    //royalty_type = "10"
    //royalty_parameters	= "111@126.com^0.01^分润备注一|222@126.com^0.01^分润备注二"

    //////////////////////////////////////////////////////////////////////////////////

    //把请求参数打包成数组
    let sParaTemp = [];
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
     * @return String 表单提交HTML信息
     */
    let create_direct_pay_by_user = function (sParaTemp) {
        //增加基本配置
        /* 基本配置
        * service 由用户自己选择哪种交易方式
        * partner 合作者身份ID
        * return_url 页面跳转同步通知页面
        * notify_url 服务器异步通知页面
        * seller_email 收款方支付宝账号
        * input_charset 字符编码集 默认UTF-8
        * */
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
         * @return String 提交表单HTML文本
         */
        let buildURL = function (sParaTemp) {
            /**
             * 生成要请求给支付宝的参数数组
             * @param sParaTemp 请求前的参数数组
             * @return Array 要请求的参数数组
             */
            let buildRequestPara = function (sParaTemp) {
                let sPara = [];

                //除去数组中的空值和签名参数
                for (let i1 = 0; i1 < sParaTemp.length; i1++) {
                    let value = sParaTemp[i1];
                    if (value[1] === null || value[1] === "" || value[0] === "sign"
                        || value[0] === "sign_type") {
                        continue;
                    }
                    sPara.push(value);
                }
                sPara.sort();

                //生成签名结果
                let prestr = "";
                //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
                for (let i2 = 0; i2 < sPara.length; i2++) {
                    let obj = sPara[i2];
                    if (i2 === sPara.length - 1) {
                        prestr = prestr + obj[0] + "=" + obj[1];
                    } else {
                        prestr = prestr + obj[0] + "=" + obj[1] + "&";
                    }

                }

                //把拼接后的字符串再与安全校验码直接连接起来
                prestr = prestr + AlipayConfig.key;
                let crypto = require('crypto');
                let mysign = crypto.createHash('md5').update(prestr, AlipayConfig.input_charset).digest("hex");
                //签名结果与签名方式加入请求提交参数组中
                sPara.push(["sign", mysign]);
                sPara.push(["sign_type", AlipayConfig.sign_type]);

                return sPara;
            };
            let sPara = buildRequestPara(sParaTemp);

            let path = AlipayConfig.ALIPAY_PATH;
            for (let i3 = 0; i3 < sPara.length; i3++) {
                let obj = sPara[i3];
                let name = obj[0];
                let value = encodeURIComponent(obj[1]);
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
    let sURL = create_direct_pay_by_user(sParaTemp);
    console.log(sURL);
    //向支付宝网关发出请求
    // requestUrl(AlipayConfig.ALIPAY_HOST, show_url, function (data) {
    //     console.log(data);
    // });
    res.redirect("https://" + AlipayConfig.ALIPAY_HOST + "/" + sURL);
});
router.get('/payNotify', function (req, res) {
    //http://127.0.0.1:3000/paynotify?trade_no=2008102203208746&out_trade_no=3618810634349901&discount=-5&payment_type=1&subject=iphone%E6%89%8B%E6%9C%BA&body=Hello&price=10.00&quantity=1&total_fee=10.00&trade_status=TRADE_FINISHED&refund_status=REFUND_SUCCESS&seller_email=chao.chenc1%40alipay.com&seller_id=2088002007018916&buyer_id=2088002007013600&buyer_email=13758698870&gmt_create=2008-10-22+20%3A49%3A31&is_total_fee_adjust=N&gmt_payment=2008-10-22+20%3A49%3A50&gmt_close=2008-10-22+20%3A49%3A46&gmt_refund=2008-10-29+19%3A38%3A25&use_coupon=N&notify_time=2009-08-12+11%3A08%3A32&notify_type=%E4%BA%A4%E6%98%93%E7%8A%B6%E6%80%81%E5%90%8C%E6%AD%A5%E9%80%9A%E7%9F%A5%28trade_status_sync%29&notify_id=70fec0c2730b27528665af4517c27b95&sign_type=DSA&sign=_p_w_l_h_j0b_gd_aejia7n_ko4_m%252Fu_w_jd3_nx_s_k_mxus9_hoxg_y_r_lunli_pmma29_t_q%253D%253D&extra_common_param=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E8%BF%99%E6%98%AF%E6%B5%8B%E8%AF%95%E5%95%86%E6%88%B7%E7%9A%84%E5%B9%BF%E5%91%8A%E3%80%82
    //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
    let params = req.query;

//    console.log(req.query());
    let trade_no = req.query.trade_no;				//支付宝交易号
    let order_no = req.query.out_trade_no;	        //获取订单号
    let total_fee = req.query.total_fee;	        //获取总金额
    let subject = req.query.subject;//商品名称、订单名称
    let body = "";
    if (req.query.body !== null) {
        body = req.query.body;//商品描述、订单备注、描述
    }
    let buyer_email = req.query.buyer_email;		//买家支付宝账号
    let trade_status = req.query.trade_status;		//交易状态
    //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//
    AlipayNotify.verity(params, function (result) {
        if (result) {
            //////////////////////////////////////////////////////////////////////////////////////////
            //请在这里加上商户的业务逻辑程序代码

            //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——

            if (trade_status === "TRADE_FINISHED") {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在两种情况下出现
                //1、开通了普通即时到账，买家付款成功后。
                //2、开通了高级即时到账，从该笔交易成功时间算起，过了签约时的可退款时限（如：三个月以内可退款、一年以内可退款等）后。
            } else if (trade_status === "TRADE_SUCCESS") {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在一种情况下出现——开通了高级即时到账，买家付款成功后。
            }

            //——请根据您的业务逻辑来编写程序（以上代码仅作参考）——

            res.end("success");	//请不要修改或删除——

            //////////////////////////////////////////////////////////////////////////////////////////
        } else {
            res.end("fail");
        }

    });
});
router.get('/payReturn', function (req, res) {
    //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
    let params = req.query;

//    console.log(req.query());
    let trade_no = req.query.trade_no;				//支付宝交易号
    let order_no = req.query.out_trade_no;	        //获取订单号
    let total_fee = req.query.total_fee;	        //获取总金额
    let subject = req.query.subject;//商品名称、订单名称
    let body = "";
    if (req.query.body !== null) {
        body = req.query.body;//商品描述、订单备注、描述
    }
    let buyer_email = req.query.buyer_email;		//买家支付宝账号
    let trade_status = req.query.trade_status;		//交易状态
    //获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//

    console.log(trade_status);

    AlipayNotify.verify(params, function (result) {
        //如果成功，插入表记录
        if (result) {
            //////////////////////////////////////////////////////////////////////////////////////////
            //请在这里加上商户的业务逻辑程序代码

            //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——

            if (trade_status === "TRADE_FINISHED") {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在两种情况下出现
                //1、开通了普通即时到账，买家付款成功后。
                //2、开通了高级即时到账，从该笔交易成功时间算起，过了签约时的可退款时限（如：三个月以内可退款、一年以内可退款等）后。
            } else if (trade_status === "TRADE_SUCCESS") {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在一种情况下出现——开通了高级即时到账，买家付款成功后。之后用户还是可以退款等修改的，还会再发送一遍TRADE——FINISHED。
            }

            //——请根据您的业务逻辑来编写程序（以上代码仅作参考）——

            res.redirect('/index');
            // res.end("success");	//请不要修改或删除——

            //////////////////////////////////////////////////////////////////////////////////////////
        } else {
            res.end("fail");
        }

    });
});

module.exports = router;