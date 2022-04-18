function CheckTokens() {
    document.getElementById("results").classList.remove("hide");
    document.getElementById("results").classList.add("results");
    document.getElementById("tokens_list").classList.remove("input_tokens");
    document.getElementById("tokens_list").classList.add("hide");
    
    var input = document.getElementById("tokens").value.split("\n");

    input.forEach(token => {
        if(token.length == 59 || token.length == 88)
        {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://discord.com/api/v9/users/@me/outbound-promotions/codes', true);
            xhr.setRequestHeader('Authorization', `${token}`)
            xhr.onload = function () {
                if (xhr.status == 403) {
                    document.getElementById("invalid_tokens").innerHTML += 
                    `<div class="account">
                        <div class="box">
                            <img src="./assets/Default.png" alt="User Avatar">
                        </div>
                        <div class="box">
                            <span>XXXXX#0000</span>
                            <p>${token}</p>
                        </div>
                    </div>`
                } else {
                    let xhr2 = new XMLHttpRequest();
                    xhr2.open('GET', 'https://discordapp.com/api/v9/users/@me', true);
                    xhr2.setRequestHeader('Authorization', `${token}`)
                    xhr2.onload = function () {

                        if (xhr.status == 200) {                        
                            username = xhr2.response.split(`, "username": "`)[1].split(`", "avatar":`)[0] + "#" + xhr2.response.split(`, "discriminator": "`)[1].split(`", "public_flags":`)[0]
                            if(xhr2.response.split(`", "avatar": `)[1].split(`, "discriminator`)[0] == "null"){
                                document.getElementById("valid_tokens").innerHTML += 
                                `<div class="account">
                                    <div class="box">
                                        <img src="./assets/Default.png" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`  
                            } else {
                                var id = xhr2.response.split(`{"id": "`)[1].split(`", "username": "`)[0];
                                var scd = xhr2.response.split(`", "avatar": "`)[1].split(`", "discriminator`)[0];
                                var avatar = `https://cdn.discordapp.com/avatars/${id}/${scd}`;
                                document.getElementById("valid_tokens").innerHTML += 
                                `<div class="account">
                                    <div class="box">
                                        <img src="${avatar}" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`  
                            }
                        }
                        if (xhr.status == 403) {
                            username = xhr2.response.split(`, "username": "`)[1].split(`", "avatar":`)[0] + "#" + xhr2.response.split(`, "discriminator": "`)[1].split(`", "public_flags":`)[0]
                            if(xhr2.response.split(`", "avatar": `)[1].split(`, "discriminator`)[0] == "null"){
                                document.getElementById("locked_tokens").innerHTML += 
                                `<div class="account">
                                    <div class="box">
                                        <img src="./assets/Default.png" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`  
                            } else {
                                var id = xhr2.response.split(`{"id": "`)[1].split(`", "username": "`)[0];
                                var scd = xhr2.response.split(`", "avatar": "`)[1].split(`", "discriminator`)[0];
                                var avatar = `https://cdn.discordapp.com/avatars/${id}/${scd}`;
                                document.getElementById("valid_tokens").innerHTML += 
                                `<div class="account">
                                    <div class="box">
                                        <img src="${avatar}" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`  
                            }
                        }
                    }
                    xhr2.send();
                }
            }
            xhr.send();
        
        } else {
            document.getElementById("invalid_tokens").innerHTML += 
                `<div class="account">
                    <div class="box">
                        <img src="./assets/Default.png" alt="User Avatar">
                    </div>
                    <div class="box">
                        <span>XXXXX#0000</span>
                        <p>${token}</p>
                    </div>
                </div>`
        }
    });
}
