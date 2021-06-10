var chatContainer = document.getElementById('hchat-ChatContainer');
var container = document.getElementById('container');
chatContainer.classList.add("hchat-buttonJumpClass");
var despearAnimation = "hchat-desappearInButton";
var appearAnimation = "hchat-appearFromButton";
var jmpBtn = "hchat-buttonJumpClass";

/*<input type="image" id="chatButton" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/512px-Circle-icons-chat.svg.png" onclick="openChat()"/>
        <button id="closeChatButton"  hidden="true"  onclick="closeChat()">X</button>
        <div id="webchat" hidden="true" role="main"></div>*/

  function ani(el, animClasseName=null, animClasseNameRemove=null){
    if(animClasseNameRemove != null) {
      el.classList.remove(animClasseNameRemove);
    }
    if (animClasseName != null) {
      el.classList.add(animClasseName);
    }
  }

window.onload = (async function () {
	var chatButton = document.createElement("button");
	var closeChatButton = document.createElement("button");
	var chatImage = document.createElement("img");
	var chatImageContainer = document.createElement("div");
	var closeImage = document.createElement("img");
	var webchat = document.createElement("div");
	var popover = document.createElement("div");
	var pop = document.createElement("div");
	var pop2 = document.createElement("div");
	var popointe = document.createElement("div");

	function openChat() {
	    chatButton.hidden = true;
	    closeChatButton.hidden = false;
	    webchat.hidden = false;
	    chatButton.style['z-index'] = 10;
	    //ani(chat,"appearFromButton","desappearInButton");
	    ani(chatContainer, appearAnimation, despearAnimation);
		ani(chatContainer, null, jmpBtn);
		chatContainer.style["box-shadow"] = "0px 3px 6px grey";
		popover.hidden = true;
	}

	function closeChat() {
		closeChatButton.hidden = true;
		//ani(chat,"desappearInButton","appearFromButton");
		ani(chatContainer, despearAnimation,appearAnimation);
		chatButton.hidden = false;
		ani(chatContainer, jmpBtn);
		webchat.hidden = true;
		chatContainer.style["box-shadow"] = "";
		ouverture.removeEventListener("click", clique, false);
		//popover.hidden = false;
	}

	chatButton.id = "hchat-chatButton";
	chatButton.onclick = openChat;

	chatImageContainer.id = "imageChatButtonContainer";

	chatImage.style.background = "url('images/logo1.png') center no-repeat";
	chatImage.id = "imageChatButton";
	chatImageContainer.appendChild(chatImage);

	closeChatButton.id = "hchat-closeChatButton";
	closeChatButton.hidden = "true";
	closeChatButton.onclick = closeChat;
	closeImage.src = "images/close-24px.svg";
	closeImage.id = "closeImageButton";

	webchat.id = "hchat-webchat";
	webchat.role = "main";
	webchat.hidden = "true";

	pop.innerText = "Une Question ?";
	pop.id = "pop";
	pop2.innerText = "Discutons-en";
	pop2.id = "pop2";
	popointe.setAttribute("class", "pointe");
	popover.id = "popover";

	chatButton.appendChild(chatImageContainer);
	closeChatButton.appendChild(closeImage);
	container.appendChild(chatButton);
	container.appendChild(closeChatButton);
	popover.appendChild(pop);
	popover.appendChild(pop2);
	popover.appendChild(popointe);
	container.appendChild(popover);
	chatContainer.appendChild(webchat);
	let ouverture = document.getElementById("hchat-chatButton");

	const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
            //console.log(action);
            if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
                dispatch({
                    type: 'WEB_CHAT/SEND_EVENT',
                    payload: {
                        name: 'webchat/join',
                        value: { language: window.navigator.language }
                    }
                });
            }

            return next(action);
        });

	var isFirefox = true;

	if(isFirefox) {
		window.WebChat.renderWebChat(
        {
			directLine: window.WebChat.createDirectLine({
				token: 'qEvbElt7CCw.fnHbnhDpXFxTUjh2AJpj83FSd__UO678WNUdYUYWTgE'
			}),
			store,
			userID: 'Test',
			username: 'Web Chat User',
			locale: 'fr-FR',
			botAvatarInitials: 'WC',
			userAvatarInitials: 'WW',
			styleOptions: {
				backgroundColor: '#FFFFFF',
				showAvatarInGroup: true,
				botAvatarImage: "images/logoSansTexte.png",
				botAvatarInitials: 'BF',
				userAvatarImage: "images/logo_user.svg",
				userAvatarInitials: 'WC'},
			},
	    	webchat
      	);
	} else {
		const adapters = await window.WebChat.createDirectLineSpeechAdapters({
          fetchCredentials : {
            region: 'eastus',
            subscriptionKey: '442fc2c1dde44630abaafdbca367a7db'
          }
        });



      window.WebChat.renderWebChat(
        {
        	...adapters,
          /*directLine: window.WebChat.createDirectLine({
            token: '-2sR5D6OhVw.XeKYODmvXe79EXL79HZpbiU8epiVj5tsEaxBB-E4-Lo'
          }),*/
          userID: 'Test',
          username: 'Web Chat User',
          locale: 'fr-FR',
          botAvatarInitials: 'WC',
          userAvatarInitials: 'WW',
          styleOptions: {
			  backgroundColor: '#FFFFFF',
            showAvatarInGroup: true,
			  botAvatarImage: "images/logoSansTexte.png",
            botAvatarInitials: 'BF',
			  userAvatarImage: "images/logo_user.svg",
            userAvatarInitials: 'WC'},

        },
        webchat
      );
	}

	function clique(event) {
		let label = document.getElementById(document.querySelector("[id^='webchat__basic-transcript__label--']").id);
		label.textContent = "";

		let imageContainer = document.createElement("div");
		imageContainer.id = "iconeHeaderContainer"
		label.appendChild(imageContainer);

		let image = document.createElement("img");
		image.id = "iconeHeader"
		image.src = "images/logoSansTexte.png";
		imageContainer.appendChild(image);

		let texte = document.createElement("span");
		texte.id = "texteHeader"
		texte.textContent = "BelleVie Bot";
		label.appendChild(texte);

		let sendbox = document.getElementsByClassName("webchat__send-box__main")[0];

		let sendboxbutton = document.getElementsByClassName("webchat__send-box__button")[0];
		sendboxbutton.remove();

		let sendicone = document.getElementsByClassName("webchat__send-icon")[0];
		sendicone.remove();

		let send = document.getElementsByClassName("webchat__send-box__button")[0];
		let icone = document.createElement("img");
		icone.src = "images/send.svg";
		icone.id = "icone_envoi";
		send.appendChild(icone);
	}


	ouverture.addEventListener("click", clique)
});

