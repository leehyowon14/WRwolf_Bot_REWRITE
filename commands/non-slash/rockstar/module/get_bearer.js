const puppeteer = require('puppeteer');
const loginData = require('./loginData.json');

module.exports = {
    run: async() => {
        //브라우저 실행
        const browser = await puppeteer.launch({
            headless: false,
        });
        
        //새 페이지 열기
        const page = await browser.newPage();
        await page.setViewport({
            width: 1366,
            height: 768
          });
        await page.goto("https://signin.rockstargames.com/signin/user-form?cid=socialclub", { waitUntil: 'networkidle2' });
    
        //이메일 & 비밀번호 불러오기
        let email = loginData.email;
        let password = loginData.password;
    
        //이메일 & 비밀번호 입력.
        await page.type('input[name=email]', email);
        await page.type('input[name=password]', password)
        await page.click('button[type=submit]');
    
        //리디렉션 대기 & 토큰 구하기
        await page.waitForResponse((response) => {
            const headers = response.headers();
            if ("set-cookie" in headers || "Set-Cookie" in headers) {
                const setCookieValue = headers["set-cookie"] || headers["Set-Cookie"];
                if (setCookieValue.includes("BearerToken=")) {
                    const tokenLine = setCookieValue.split("\n").filter(line => line.startsWith("BearerToken"))[0];
                    bearerToken = tokenLine.replace(/^.*?BearerToken=(.*?);.*?$/g, "$1");
                    return true;
                }
            }
        
            return false;
        });
        auto_refresh(page);
        global.bearerToken = bearerToken;
    }
    
}

function auto_refresh(page) {
    setInterval(async () => {
        await page.reload({ waitUntil: "networkidle2" });
        const cookies = await page.cookies();
        cookies.foreach(cookie => {
            if (cookie.name == "BearerToken") {
                bearerToken = cookie.value;
            }
        });
    }, 300000); // 5분마다 페이지 새로고침
}