class Chatbox
{
    constructor() 
    {
    this.args = {
        openButton : document.querySelector(selectors, 'chatbox__button'),
        chatbox: document.querySelector(selectors, 'chatbox__support'), //open and close chtbot
        sendbutton: document.querySelector(selectors, 'send__button') //class_name used in html file


    }
    this.state = false;
    this.messages = [];

    }

    display() {
    const {openButton, chatBox, sendButton} = this.args;

    openButton.addEventListener('click', () => this.toggleState(chatBox)) //click on open button

    sendButton.addEventListener('click', () => this.onSendButton(chatBox))

    const node = chatBox.querySelector('input');
    node.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            this.onSendButton(chatBox)
        } //in chatbox, if you hit enter, sends message
    })
}

    toggleState(chatbox) {
    this.state = !this.state;

    // show or hides the box
    if(this.state) {
        chatbox.classList.add('chatbox--active')
    } else {
        chatbox.classList.remove('chatbox--active')
    }

}
//extract text from user input
    onSendButton(chatbox) {
    var textField = chatbox.querySelector('input');
    let text1 = textField.value
    if (text1 === "") {
        return;
    }

    let msg1 = { name: "user", message: text1 } //message key is same as in app.py, extracted from json
    this.messages.push(msg1); //stores in messages array given above 

    //post request to this host 'http://127.0.0.1:5000/predict', 
    fetch(input, $SCRIPT_ROOT + '/predict', init, {
        method: 'POST',
        body: JSON.stringify(value, { message: text1 }),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'
        }, 
    })

        .then(r => r.json())
        .then(r => {
            let msg2 = { name: "Skay", message: r.answer };
            this.messages.push(msg2); //push to the array
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
            });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item) {
            if (item.name === "Skay")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
            });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}
const chatbox = new Chatbox();
chatbox.display(); //initializes class display() with openbutton and sendbutton