	window.alert = function(message) {
		message = (typeof message == 'undefined' ? '' : `<div style="padding: 25px 15px;flex: 1;font-size: 18px;font-family: arial;">${message}</div>`);
		var template =`<div style="position: fixed; width: 100%; background: transparent; height: 100%; top: 0; z-index: 99999; font-family: Arial; "> <div style="background: #fff; max-width: 350px; margin: 20px auto; display: flex; flex-direction: column; box-shadow: 0 3px 10px 5px rgba(0,0,0, .3); font-family: arial; ">${message} <div style="padding: 5px 15px; display: flex; justify-content: flex-end; "> <button style="background: transparent; border: none; color: #009688; font-size: 16px; margin-bottom: 5px; outline: 0; cursor: pointer; " onclick="javascript:this.parentNode.parentNode.parentNode.remove()">OK</button> </div> </div> </div> `;
			document.body.insertAdjacentHTML('beforeend', template);
	}
