//Chat UI
class ChatUI {
    constructor(list) {
        this.list = list
    }

    clear() {
        this.list.innerHTML = ""
    }

    render(data) {
        // const time = dateFns.format(data.created_at.toDate(), "YYYY/MMMM/Do dddd hh:mm:ss a")
        const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), { addSuffix: true, includeSeconds: true })
        const li = document.createElement('li')
        li.setAttribute('class', 'list-group-item')
        const html = `
            <span class='username'>${data.username}:</span>
            <span class='message'>${data.message}</span>
            <div class='time'>${when}</div>
        `;
        li.innerHTML = html
        this.list.prepend(li);
    }
}