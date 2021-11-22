const express = require("express");
const redis = require("redis");

// redis client create (Docker Compose에 명시한 컨테이너 이름을 넣어주면 된다.)
const client = redis.createClient({
    host: "redis-server",
    port: 6379
});

const app = express();

// 숫자는 0부터 시작
client.set("number", 0);

app.get('/', (req, res) => {
    client.get("number", (err, number) => {
        // 현재 숫자에 +1
        res.send("Number is going up " + number);
        client.set("number", parseInt(number) + 1);
    });
});

app.listen(8080);
console.log('Server is Running');