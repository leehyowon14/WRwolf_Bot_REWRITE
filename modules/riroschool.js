// Created on iPad.
//Riroschool School Search Module

//Use https://company.rirosoft.com/school_search.php?keyword=(학교명)

const axios = request("axios");

module.exports = {
    search: async (SchoolName) => {
        axios.get("https://company.rirosoft.com/school_search.php?keyword=" + SchoolName)
            .then(function (response) {
                let json = response.data.data
                
                if (json.length == 0) return false;
                
                let obj = {
                    name: '', //ex. 영광고등학교(영광고)
                    address: '', //학교 주소
                    link: '' //리로스쿨 링크
                };
                let arr = [];
                
                if (json.length < 3) {    
                    for (let i = 0; i < json.length; i++) {
                        obj.name = `${json[i].city} - ${json[i].name}`
                        obj.address = json[i].addressDetail
                        obj.link = json[i].link
                        arr.push(obj)
                    }
                } else {
                    json = json.slice(0, 2);
                    for (let i = 0; i < 3; i++) {
                        obj.name = `${json[i].city} - ${json[i].name}`
                        obj.address = json[i].addressDetail
                        obj.link = json[i].link
                        arr.push(obj)
                    }
                }
                return arr
                //[{name: 이름, adress: 주소, link: 링크}, {name: 이름2, adress: 주소2, link: 링크2}, ...]
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
    }
}