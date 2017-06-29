var app = new Vue({
    el: '#app',
    data: {
        greeting: '欢迎进入高考咨询界面',
        userInfo: {
            name: null,
            password: null
        },
        selectRange: {
            preferences: {
                preference1: '软件工程',
                preference2: '信息安全',
                preference3: '网络工程'
            },
            rankingNum: 10000,
            floatRange: 500
        }, //选择范围
        candidates: [],      //候选表
        results: [],           //模板表
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
            console.log('Using Vue FrameWork...')
        },
        userLogin: function () {
            console.log('User login...');
            $.post('/userLogin', this.userInfo, function (data) {
                // window.location.href = '/index';
                console.log('Login...ok');
                if(data.permission){
                    window.location.href = '/index';
                }
            }, 'json');
        },
        postSelectRange: function () {
            console.log('Post selected data...');
            $.post('/getCandidates', this.selectRange, function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    data[i].checked = false;
                }
                app.$data.candidates = data.slice(0);
                console.log(app.$data.candidates);
                console.log('Post selected data...ok');
            }, 'json');
        },
        checkCandidate: function (item) {
            if (item.checked === true) {
                // console.log(item);
                item.index = this.results.length;
                this.results.push(item);
            }
            else {
                var resultsCopy = this.results;
                for (var reIndex in resultsCopy) {
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
            var candidatesCopy = this.candidates;
            for (var canIndex in candidatesCopy) {
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
        downResultList: function (index, item) {
            this.results[index] = this.results.splice(index + 1, 1, this.results[index])[0];
        },
        downloadResultTable: function () {
            // window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
            var csvContent = "data:text/excel;charset=gb2312,";
            var resultCopy = this.results;
            resultCopy.forEach(function (infoArray, index) {
                var item = [
                    // infoArray.index,
                    infoArray.schoolCode + ' ' + infoArray.schoolName,
                    infoArray.professionCode + ' ' + infoArray.professionName
                ];
                var dataString = item.join(",");
                csvContent += index < resultCopy.length ? dataString + "\n" : dataString;
            });
            console.log(csvContent);
            var encodedUri = encodeURI(csvContent);
            // window.open(encodedUri);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "customers.csv");
            document.body.appendChild(link); // Required for FF
            link.click();
            document.body.removeChild(link)
        }
    }
});
app.hello();