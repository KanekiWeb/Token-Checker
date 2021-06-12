function checker() {
    var input = document.getElementById("tokens").value.split("\n");

    valid = 0;
    invalid = 0;
    unknow = 0;

    input.forEach(token => {
        if(token.length == 59)
        {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://discordapp.com/api/users/@me', true);
            xhr.setRequestHeader('Authorization', `${token}`)
            xhr.onload = function () {
                if (xhr.response == '{"message": "401: Unauthorized", "code": 0}') {
                    invalid++;
                    document.getElementById("invalid-count").innerHTML = invalid;
                    document.getElementById("invalid-tokens").innerHTML += 
                        `<div class="token-checked token-checked-invalid"><a style="color: #E74C3C;">Invalid</a> | ${token}</div>`
                    
                }
                else {
                    valid++;
                    document.getElementById("valid-count").innerHTML = valid;
                    document.getElementById("valid-tokens").innerHTML += 
                        `<div class="token-checked token-checked-valid"><a style="color: #00BC8C;">Valid</a> | ${token}</div>`
                    
                }
            }
            xhr.send();
        
        } else {
            unknow++;
            document.getElementById("unknow-count").innerHTML = unknow;
            document.getElementById("unknow-tokens").innerHTML += 
                        `<div class="token-checked token-checked-unknow"><a style="color: #F39C12;">Error</a> | ${token}</div>`
        }
    });
}