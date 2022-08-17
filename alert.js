	window.alert = function(message) {
		message = (typeof message == 'undefined' ? '' : `<div style="padding: 25px 15px;flex: 1;font-size: 18px;font-family: arial;">${message}</div>`);
		var template =`<div style="position: fixed; width: 100%; background: transparent; height: 100%; top: 0; z-index: 99999; font-family: Arial; "> <div style="background: #fff; max-width: 350px; margin: 20px auto; display: flex; flex-direction: column; box-shadow: 0 3px 10px 5px rgba(0,0,0, .3); font-family: arial; ">${message} <div style="padding: 5px 15px; display: flex; justify-content: flex-end; "> <button style="background: transparent; border: none; color: #009688; font-size: 16px; margin-bottom: 5px; outline: 0; cursor: pointer; " onclick="javascript:this.parentNode.parentNode.parentNode.remove()">OK</button> </div> </div> </div> `;
			document.body.insertAdjacentHTML('beforeend', template);
	}

	window['dialog'] = function(o) {
        let {message, title, type, onOk, onCancel, onConfirm} = o;
        title = `<div class="dlg-header">${title || ''}</div>`;
        message = message ? `<div class="dlg-content">${message}</div>` : '';
        var button = `<button class="dlg-action ok-action" tabindex="1">Ok</button>`;

        if(type == "CONFIRM") {
            button = `<button class="dlg-action ok-cancel" tabindex="1">cancel</button><button class="dlg-action ok-action" tabindex="1">Ok</button>`;
        }
        var style = `<style id="dyalog-ui">@import url('https://fonts.googleapis.com/css?family=Roboto:400,500'); .du-dialog {font-family: Roboto, sans-serif; position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: -webkit-box; display: -ms-flexbox; display: flex; justify-content: center; align-items: center; visibility: hidden; opacity: 0; -moz-user-select: none; -ms-user-select: none; user-select: none; background-color: transparent; -moz-transition: background-color .2s linear, opacity .2s ease; transition: background-color .2s linear, opacity .2s ease; will-change: background-color, visibility, opacity; overflow-x: hidden; overflow-y: auto; z-index: 999999; } .du-dialog.dlg--open {background-color: rgba(0,0,0,0.35); visibility: visible; opacity: 1; } .du-dialog.dlg--closing {opacity: 0; background-color: transparent; } .du-dialog .dlg-wrapper {position: absolute; min-width: 280px; max-width: 90%; max-height: 90%; display: -webkit-box; display: -ms-flexbox; display: flex; flex-direction: column; justify-content: space-around; background-color: #ffffff; outline: none; -moz-border-radius: 4px; border-radius: 4px; -moz-transform: scale(.8); transform: scale(.8); -moz-transition: -moz-transform .18s cubic-bezier(.4,0,.2,1); transition: transform .18s cubic-bezier(.4,0,.2,1); -moz-box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12); box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12); } .du-dialog.dlg--open .dlg-wrapper {-moz-transform: scale(1); transform: scale(1); } .du-dialog .dlg-header {padding: 16px 24px 8px; font-size: 20px; font-weight: 500; letter-spacing: 0.02em; line-height: 2rem; } .du-dialog .dlg-content {padding: 0 24px 20px 24px; color: #757575; font-size: 16px; line-height: 1.5rem; letter-spacing: 0.03em; overflow-x: hidden; overflow-y: auto; } .du-dialog.dlg--no-title .dlg-content { margin-top: 20px; } .du-dialog .dlg-content.content--scrolled { border-top: 1px solid #e0e0e0; } .du-dialog .dlg-select-item {position: relative; margin: 0 -24px; padding: 0 24px; line-height: 48px; cursor: pointer; -moz-transition: background-color .2s linear; transition: background-color .2s linear; } .du-dialog .dlg-select-item:hover { background-color: #f5f5f5; } .du-dialog .dlg-select-item:active { background-color: #e0e0e0; } .du-dialog .dlg-select-item .dlg-select-radio, .du-dialog .dlg-select-item .dlg-select-checkbox {position: absolute; top: 12px; height: 18px; width: 18px; opacity: 0; } .du-dialog .dlg-select-item .dlg-select-lbl {position: relative; display: inline-block; line-height: 36px; padding-left: 32px; cursor: pointer; text-indent: 8px; } .du-dialog .dlg-select-item  .dlg-select-checkbox + .dlg-select-lbl:before {content: ''; display: block; position: absolute; width: 16px; height: 16px; top: 50%; left: 6px; cursor: pointer; border: 2px solid #757575; -moz-transform: translateY(-50%); transform: translateY(-50%); -moz-border-radius: 2px; border-radius: 2px; -moz-transition: all .2s cubic-bezier(0.0, 0.0, 0.2, 1); transition: all .2s cubic-bezier(0.0, 0.0, 0.2, 1); will-change: border-color; } .du-dialog .dlg-select-item  .dlg-select-checkbox:checked + .dlg-select-lbl:before {background-color: #1e88e5; border-color: #1e88e5; } .du-dialog .dlg-select-item  .dlg-select-checkbox + .dlg-select-lbl:after {content: ''; display: block; position: absolute; top: 50%; left: 9px; width: 12px; height: 6px; margin-top: -6px; cursor: pointer; border-left: 2px solid #FFF; border-bottom: 2px solid #FFF; -moz-transition: all .2s cubic-bezier(0.0, 0.0, 0.2, 1); transition: all .2s cubic-bezier(0.0, 0.0, 0.2, 1); -moz-transform: rotate(-45deg) scale(0); transform: rotate(-45deg) scale(0); will-change: transform; } .du-dialog .dlg-select-item  .dlg-select-checkbox:checked + .dlg-select-lbl:after {-moz-transform: rotate(-45deg) scale(1); transform: rotate(-45deg) scale(1); } .du-dialog .dlg-select-item  .dlg-select-radio + .dlg-select-lbl:before {content: ""; display: block; position: absolute; height: 16px; width: 16px; top: 50%; left: 6px; cursor: pointer; border: 2px solid #757575; -moz-transform: translateY(-50%); transform: translateY(-50%); -moz-border-radius: 50%; border-radius: 50%; -moz-transition: all .2s cubic-bezier(0.0, 0.0, 0.2, 1); transition: all .2s cubic-bezier(0.0, 0.0, 0.2, 1); will-change: border-color; } .du-dialog .dlg-select-item  .dlg-select-radio:checked + .dlg-select-lbl:before { border-color: #1e88e5; } .du-dialog .dlg-select-item  .dlg-select-radio + .dlg-select-lbl:after {content: ''; position: absolute; top: 50%; left: 11px; width: 10px; height: 10px; margin-top: -5px; cursor: pointer; background-color: #1e88e5; -moz-border-radius: 50%; border-radius: 50%; -moz-transition: -moz-transform .28s cubic-bezier(.4,0,.2,1); transition: transform .28s cubic-bezier(.4,0,.2,1); -moz-transform: scale(0); transform: scale(0); -moz-transform-origin: center; transform-origin: center; will-change: transform, background-color; } .du-dialog .dlg-select-item .dlg-select-radio:checked + .dlg-select-lbl:after {-moz-transform: scale(1); transform: scale(1); } .du-dialog .dlg-actions {padding: 8px; text-align: right; } .du-dialog .dlg-action {font-family: inherit; font-size: 14px; border: none; cursor: pointer; padding: 0 12px; min-width: 72px; line-height: 36px; letter-spacing: 0.07em; font-weight: 500; color: #3f51b5; text-transform: uppercase; background-color: transparent; border-radius: 4px; outline: none; -moz-transition: background-color .28s linear; transition: background-color .28s linear; will-change: background-color; } .du-dialog .dlg-action:focus, .du-dialog .dlg-action:hover { background-color: #f5f5f5; } .du-dialog .dlg-action:active { background-color: #e0e0e0; } .du-dialog .dlg-action + .dlg-action { margin-left: 8px; } @media (min-width: 600px) {.du-dialog .dlg-wrapper { max-width: 560px; } }</style>`;
        var e = document.querySelector('#dyalog-ui');
        var d = document.querySelector('.du-dialog');
        if(d) d.remove();
        if(!e) {document.body.insertAdjacentHTML('beforeend', style);}
        var template =`<div class="du-dialog"> <div class="dlg-wrapper" tabindex="0">${title} ${message} <div class="dlg-actions">${button}</div> </div></div>`;
        document.body.insertAdjacentHTML('beforeend', template);
        setTimeout(() => {
            var context = document.querySelector('.du-dialog');
            context.classList.add('dlg--open')
            if(type == "CONFIRM") {
                context.querySelector('.ok-cancel').addEventListener('click', function() {
                    onCancel && onCancel()
                    context.classList.add('dlg--closing');
                    setTimeout(function () {
                        document.body.removeChild(context);
                    }, 200);
                })
            }
            context.querySelector('.ok-action').addEventListener('click', function() {
                onOk && onOk();
                onConfirm && onConfirm();

                context.classList.add('dlg--closing');
                setTimeout(function () {
                    document.body.removeChild(context);
                }, 200);
            })
        }, 3e2);
    }
