const app = new Vue({
    el: '#app',
    data: {
        greeting: '欢迎进入高考咨询界面',
        userInfo: {
            name: null,
            password: null
        },
        selectRange: {
            preference1: '计算机类',
            preference2: '经济学类',
            preference3: '机械类',
            province: [],
            schoolLevel_985: false,
            schoolLevel_211: true,
            ranking: 10000,
            score: 630,
            floatRange: 5000,
            bias: 15,
            subjects: [
                {
                    subject: '不限',
                    text: 'NoLimit',
                    id: 'nceeSubject_NoLimit',
                    selected: true
                }, {
                    subject: '物理',
                    text: 'Physical',
                    id: 'nceeSubject_Physical',
                    selected: false
                }, {
                    subject: '化学',
                    text: 'Chemistry',
                    id: 'nceeSubject_Chemistry',
                    selected: false
                }, {
                    subject: '生物',
                    text: 'Biological',
                    id: 'nceeSubject_Biological',
                    selected: false
                }, {
                    subject: '思想政治',
                    text: 'Biological',
                    id: 'nceeSubject_Political',
                    selected: false
                }, {
                    subject: '历史',
                    text: 'History',
                    id: 'nceeSubject_History',
                    selected: false
                }, {
                    subject: '地理',
                    text: 'Geography',
                    id: 'nceeSubject_Geography',
                    selected: false
                }, {
                    subject: '技术',
                    text: 'Technology',
                    id: 'nceeSubject_Technology',
                    selected: false
                }
            ]
        }, //选择范围

        options: {
            professionCategory: [
                "哲学类", "经济学类", "财政学类", "金融学类", "法学类", "政治学类", "社会学类", "民族学类", "公安学类",
                "司法执行及技术类", "教育学类", "心理学类", "体育学类", "中国语言文学类", "外国语言文学类", "新闻传播学类",
                "历史学类", "数学类", "物理学类", "化学类", "天文学类", "地理科学类", "海洋科学类", "大气科学类", "地球物理学类",
                "地质学类", "生物科学类", "统计学类", "力学类", "机械类", "仪器仪表类", "材料类", "能源动力类", "电气类",
                "电子信息类", "自动化类", "计算机类", "土木类", "水利类", "测绘类", "化工与制药类", "地质类", "矿业类", "纺织类",
                "轻工类", "交通运输类", "海洋工程类", "航空航天类", "武器类", "核工程类", "农业工程类", "林业工程类",
                "环境科学与工程类", "生物医学工程类", "食品工程类", "建筑类", "安全科学与工程类", "生物工程类", "公安技术类",
                "交叉类", "植物生产类", "自然保护与环境生态类", "动物生产类", "动物医学类", "林学类", "水产类", "草学类",
                "基础医学类", "临床医学类", "口腔医学类", "公共卫生与预防医学类", "中医学类", "中西医结合类", "药学类", "中药学类",
                "法医学类", "医学技术类", "护理学类", "管理科学与工程类", "工商管理类", "农业经济管理类", "公共管理类",
                "图书情报与档案管理类", "物流管理与工程类", "工业工程类", "服务业管理类", "艺术学理论类", "音乐与舞蹈学类",
                "戏剧与影视学类", "美术学类", "设计学类", "军事学类", "军事测绘与控制类", "军制学类", "军队指挥学类"
            ],
            province: [
                // {value: 0, text: '全部省市', alt: '全部省市'},
                {value: 11, text: '北京市', alt: '北京'},
                {value: 12, text: '天津市', alt: '天津'},
                {value: 13, text: '河北省', alt: '河北'},
                {value: 14, text: '山西省', alt: '山西'},
                {value: 15, text: '内蒙古自治区', alt: '内蒙古'},
                {value: 21, text: '辽宁省', alt: '辽宁'},
                {value: 22, text: '吉林省', alt: '吉林'},
                {value: 23, text: '黑龙江省', alt: '黑龙江'},
                {value: 31, text: '上海市', alt: '上海'},
                {value: 32, text: '江苏省', alt: '江苏'},
                {value: 33, text: '浙江省', alt: '浙江'},
                {value: 34, text: '安徽省', alt: '安徽'},
                {value: 35, text: '福建省', alt: '福建'},
                {value: 36, text: '江西省', alt: '江西'},
                {value: 37, text: '山东省', alt: '山东'},
                {value: 41, text: '河南省', alt: '河南'},
                {value: 42, text: '湖北省', alt: '湖北'},
                {value: 43, text: '湖南省', alt: '湖南'},
                {value: 44, text: '广东省', alt: '广东'},
                {value: 45, text: '广西壮族自治区', alt: '广西'},
                {value: 46, text: '海南省', alt: '海南'},
                {value: 50, text: '重庆市', alt: '重庆'},
                {value: 51, text: '四川市', alt: '四川'},
                {value: 52, text: '贵州市', alt: '贵州'},
                {value: 53, text: '云南省', alt: '云南'},
                {value: 54, text: '西藏自治区', alt: '西藏'},
                {value: 61, text: '陕西省', alt: '陕西'},
                {value: 62, text: '甘肃省', alt: '甘肃'},
                {value: 63, text: '青海省', alt: '青海'},
                {value: 64, text: '宁夏回族自治区', alt: '宁夏'},
                {value: 65, text: '新疆维吾尔区', alt: '新疆'},
                {value: 71, text: '台湾省', alt: '台湾'},
                {value: 81, text: '香港特别行政区', alt: '香港'},
                {value: 82, text: '澳门特别行政区', alt: '澳门'}
            ]
        },
        autoRe: true,           //是否智能推荐
        candidates: [],         //候选表
        results: [],            //模板表
        resultUri: null,
        resultCsv: 'm_data.csv',
        searchText: null
    },
    computed: {
        filterCandidates: function () {
            return this.candidates.filter(function (item) {
                if (app.$data.searchText) {
                    console.log(app.$data.searchText);
                    return item.schoolName.indexOf(app.$data.searchText) >= 0;
                }
                else {
                    return true;
                }
            })
        }
    },
    methods: {
        hello: function () {
            console.log('Using Vue FrameWork...');
            console.log('Category Length: ' + this.options.professionCategory.length);
            $('.preference').selectpicker({
                liveSearch: true,
                liveSearchPlaceholder: '请输入你要查找的专业...',
                size: 5
            });
        },

        userLogin: function () {
            console.log('User login...');
            $.post('/userLogin', this.userInfo, function (data) {
                // window.location.href = '/index';
                console.log('Login...ok');
                if (data.permission) {
                    window.location.href = '/index';
                }
            }, 'json');
        },

        clearAll: function () {
            this.candidates = [];
            this.results = [];
        },

        manualRecommend: function () {
            this.clearAll();

            this.autoRe = false;

            if (this.selectRange.score < 359) {
                window.alert('所选最低分不能低于359分！');
            }
            // console.log('Post selected data...');
            console.log('Manual recommend college volunteers...');
            let params = {};
            $.extend(true, params, app.$data.selectRange);
            params.score = parseInt(params.score);
            params.score += 15;
            console.log(params);
            $.post('/getCandidates', params, function (data) {
                for (let i = 0; i < data.length; i++) {
                    data[i].checked = false;
                    data[i].class = 'part_1';
                }
                app.$data.candidates = data.slice(0);
                // console.log(app.$data.candidates);
                console.log('Post selected data part_1 ...ok');
            }, 'json');
            params.score -= 15;
            $.post('/getCandidates', params, function (data) {
                for (let i = 0; i < data.length; i++) {
                    data[i].checked = false;
                    data[i].class = 'part_2';
                }
                app.$data.candidates.push.apply(app.$data.candidates, data.slice(0));
                // console.log(app.$data.candidates);
                console.log('Post selected data part_2 ...ok');
            }, 'json');
            params.score -= 15;
            $.post('/getCandidates', params, function (data) {
                for (let i = 0; i < data.length; i++) {
                    data[i].checked = false;
                    data[i].class = 'part_3';
                }
                app.$data.candidates.push.apply(app.$data.candidates, data.slice(0));
                // console.log(app.$data.candidates);
                console.log('Post selected data part_3 ...ok');
            }, 'json');
        },

        autoRecommend: function () {
            // console.log('11111'+this.selectRange.province);
            if(this.selectRange.province.length < 1){
                window.alert('请选择省的区域！');
            }else{
                this.clearAll();
                this.autoRe = true;
                if (this.selectRange.score < 359) {
                    window.alert('所选最低分不能低于359分！');
                }
                console.log('Auto recommend college volunteers...');

                let params = {};

                $.extend(true, params, app.$data.selectRange);

                let subjects = [];

                function compare(property) {
                    return function (a, b) {
                        let value1 = parseInt(a[property]);
                        let value2 = parseInt(b[property]);
                        switch (a['class']) {
                            case 'preference_1':
                                value1 -= 400;
                                break;
                            case 'preference_2':
                                value1 -= 200;
                                break;
                        }
                        switch (b['class']) {
                            case 'preference_1':
                                value2 -= 400;
                                break;
                            case 'preference_2':
                                value2 -= 200;
                                break;
                        }
                        return value1 - value2;
                    }
                }

                $.get('/recommend/getAutoRecommend', params, function (data) {
                    let i, j, g;
                    let result = [];

                    let classArr = ['preference_1', 'preference_2', 'preference_3'];
                    let scoreArr = ['scoreHigher', 'scoreNormal', 'scoreLower'];
                    let professionArr = ['firstStep', 'secondStep', 'thirdStep'];

                    let scoreStratify = 3;
                    let professionStratify = 3;
                    for (i = 0; i < scoreStratify; i++) {
                        let length_count = 0;
                        let segResult = [];
                        for (j = 0; j < professionStratify; j++) {
                            let itemList = data[scoreArr[i]][professionArr[j]];
                            let length_iList = itemList.length;
                            length_count += length_iList;
                            for (g = 0; g < length_iList; g++) {
                                itemList[g].class = classArr[j];
                                itemList[g].checked = true;
                            }
                            segResult.push.apply(segResult, itemList.slice(0));
                        }
                        let limit = i < 2 ? 30 : 20;
                        let step = Math.floor(length_count / limit);
                        step = step < 1 ? 1 : step;
                        let test_count = 0;
                        for (g = 0; g < segResult.length;) {
                            result.push(segResult[g]);
                            if (++test_count === limit) {
                                break;
                            }
                            g += step;
                        }
                        console.log('Stage ' + i + ': ' + segResult.length + '  step: ' + step + ' SubResult length: ' + test_count);
                    }

                    result.sort(compare('pastRankingNumber'));

                    for (i = 1; i < result.length; i++) {
                        if (result[i].professionName === result[i - 1].professionName && result[i].schoolName === result[i - 1].schoolName) {
                            result.splice(i, 1);
                        }
                    }

                    app.$data.results = result.slice(0);
                    // console.log(app.$data.results);
                    console.log('Post selected data...ok');
                }, 'json')
            }
        },

        checkCandidate: function (item) {
            if (item.checked === true) {
                // console.log(item);
                item.index = this.results.length;
                this.results.push(item);
            }
            else {
                let resultsCopy = this.results;
                for (let reIndex in resultsCopy) {
                    if (item.schoolCode === resultsCopy[reIndex].schoolCode) {
                        if (item.professionCode === resultsCopy[reIndex].professionCode) {
                            this.results.splice(reIndex, 1);
                            // resultsCopy[reIndex].checked = false;
                        }
                    }
                }
            }
        },

        deleteCheckedCandidate: function (index, item) {
            let candidatesCopy = this.candidates;
            for (let canIndex in candidatesCopy) {
                if (item.schoolCode === candidatesCopy[canIndex].schoolCode) {
                    if (item.professionCode === candidatesCopy[canIndex].professionCode) {
                        candidatesCopy[canIndex].checked = false;
                    }
                }
            }
            this.results.splice(index, 1);
        },

        upResultList: function (index) {
            this.results[index] = this.results.splice(index - 1, 1, this.results[index])[0];
        },

        downResultList: function (index) {
            this.results[index] = this.results.splice(index + 1, 1, this.results[index])[0];
        },

        downloadResultTable: function () {
            // window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
            let csvContent = "data:text/excel;charset=gb2312,";
            let resultCopy = this.results;
            resultCopy.forEach(function (infoArray, index) {
                let item = [
                    // infoArray.index,
                    infoArray.schoolCode + ' ' + infoArray.schoolName,
                    infoArray.professionCode + ' ' + infoArray.professionName
                ];
                let dataString = item.join(",");
                csvContent += index < resultCopy.length ? dataString + "\n" : dataString;
            });
            console.log(csvContent);
            let encodedUri = encodeURI(csvContent);
            // window.open(encodedUri);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "customers.csv");
            document.body.appendChild(link); // Required for FF
            link.click();
            document.body.removeChild(link)
        }
    }
});
app.hello();