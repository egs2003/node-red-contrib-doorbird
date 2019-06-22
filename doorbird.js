module.exports = function(RED) {
    function DoorBird(config) {
        RED.nodes.createNode(this,config);
        
		let argon2 = require('argon2');
		let chacha = require('chacha-js');
		let node = this;
        let user = this.credentials.username;
		let pass = this.credentials.password;
        
        this.on('input', function(msg) {
			if (user === undefined || pass === undefined) return;
			if (user.length < 6 || pass.length < 5) return;
			
			if (msg.payload.length === 70) {
				if (msg.payload.slice(0, 3).toString("base64") === "3q2+") { // doorbird identifier DE AD BE
					let salt = msg.payload.slice(12, 28);
					let options = {
						memoryCost: 8,
						timeCost: 4,
						raw: true,
						salt: salt
					};
					
					argon2.hash(pass.substring(0, 5), options).then((hash) => {
						let nonce = msg.payload.slice(28, 36);
						let crypt = msg.payload.slice(36, 70);
					
						let decipher = chacha.AeadLegacy(hash, nonce, true);
						let result = decipher.update(crypt);
						
						if (result.toString().substring(0, 6) === user.substring(0, 6)) {
							node.status({});
							if (result.toString().indexOf("motion") > -1) {
								node.send({"payload" : false});
							} else {
								node.send({"payload" : true});
							}
						} else {
							node.status({fill:"red", shape:"dot", text:"error in decryption"});
						}
					}).catch((error) => {
						console.warn(error);
					});						
				}
			}
        });
    }
    
    RED.nodes.registerType("doorbird", DoorBird, {
		credentials: {
			username: {type:"text"},
			password: {type:"password"}
		}    
    });
}