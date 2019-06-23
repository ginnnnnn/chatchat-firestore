//dom query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const chatrooms = document.querySelector('.chatrooms');


//add chat submit listener
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = newChatForm.message.value.trim();
    if (!msg) {
        return newChatForm.reset();
    }
    //hook up to chatroom obj,it's to put it here cus it wont excute before
    //chatroom obj created
    chatroom.addChat(msg).then(() => {
        //reset form field 
        newChatForm.reset();
    }).catch(err => console.log(err))

});

// updating username and local storage

newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = newNameForm.name.value.trim();
    chatroom.updateName(username);
    if (chatroom.username === username) {
        newNameForm.reset()
        updateMssg.textContent = `username was updated to ${username}`
        setTimeout(() => {
            updateMssg.textContent = ""
        }, 3000)
    } else {
        newNameForm.reset();
        updateMssg.textContent = 'username update failed';
        setTimeout(() => {
            updateMssg.textContent = ""
        }, 3000)
    }
})

//update room
chatrooms.addEventListener("click", e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        const room = e.target.id
        // console.log(room)
        chatroom.updateRoom(room);
        chatroom.getChats((data) => {
            //update ui
            chatUI.render(data)
        });
    }
})

//class instances
const chatUI = new ChatUI(chatList);
const username = localStorage.username ? localStorage.username : 'anonymous';
const room = localStorage.room ? localStorage.room : 'general'
const chatroom = new Chatroom(room, username);

//get chats and render
chatroom.getChats((data) => {
    //update ui
    chatUI.render(data)
});
