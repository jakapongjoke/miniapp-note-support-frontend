class Warroom {

    constructor() {
        this.appType = ""
        this.token = ""
        this.isReady = false
        this.appId = ""
        this.urlParams = new URLSearchParams(window.location.search);
        this.mode = this.urlParams.get('mode');
        this.verifyUrl = "https://miniapp-core.warroom.wisesight.com/token/verify"
    }
    
    postMessageToParent (eventName, payload) {
        if(this.token === "") {
            throw Error('Authentication is not valid please init app before use')
        } else {
            parent.postMessage({'warroom-miniapp-type': this.appType, event: eventName, payload:payload, token: this.token, appId: this.appId }, "*")
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleMessageFromWarroom (event) {

        if(event.data.provider === 'warroom') {
            
            if ((event.data.token !== this.token || this.token === "") && event.data.event !== 'response-to:status:init') {
                throw Error('Authentication is not valid please init app before use')
            } else {

                const eventName = event.data.event.replace('response-to','warroom-miniapp')
                document.dispatchEvent(new CustomEvent(eventName, { detail: event.data.payload }));
            }
            if(this.mode !== 'production') {
                console.info('[MINI APP]',event.data)
            }
        }
    }

    async init ({appType, appId}) {
        window.addEventListener('message', this.handleMessageFromWarroom.bind(this));
        this.appType = appType

        const token = this.urlParams.get('token');

        if(this.mode === 'devtool') {
            await this.sleep(3000)
            this.appId = appId
            this.token = token
        } else {
            const verifyRespone = await fetch(this.verifyUrl,
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({token: token})
                })
        
                if(verifyRespone.status === 200) {
                    this.appId = appId
                    this.token = token
                }
        }
        
        this.postMessageToParent('status:init', new Date())
        return new Promise ((resolve,reject) => {

            document.addEventListener('warroom-miniapp:status:init', (e) => {
                this.isReady = true
                resolve(true)
            });
        })
    }

    isInMiniApp () {
        return document.referrer.includes('warroom.wisewsight.com')  && isInIframe()
    }
    
    isInIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    resize(size) {
        this.postMessageToParent('control:resize', {size: size})
    }

    getClientInformation () {
        return this.getMethodInterface('client-information')
    }

    getSubject () {
        return this.getMethodInterface('subject')
    }

    getCurrentAgent () {
        return this.getMethodInterface('current-agent')
    }

    getCurrentThread () {
        return this.getMethodInterface('current-thread')
    }

    getCurrentCase () {
        return this.getMethodInterface('current-case')
    }

    getCurrentUser () {
        return this.getMethodInterface('current-user')
    }

    getUserCaseHistory (payload) {
        return this.getMethodInterface('user-case-history', payload)
    }

    onCloseCase (cb) {
        this.eventMethodInterface('send:on-close-case',cb)
    }

    onNewCase (cb) {
        this.eventMethodInterface('send:on-new-case',cb)
    }

    onAssignedCase (cb) {
        this.eventMethodInterface('send:on-assigned-case',cb)
    }

    onReply (cb) {
        this.eventMethodInterface('send:on-reply',cb)
    }

    onReplyFormChange (cb) {
        this.eventMethodInterface('send:on-form-change',cb)
    }

    onTagged (cb) {
        this.eventMethodInterface('send:on-tag-message',cb)
    }

    onFilterChanged (cb) {
        this.eventMethodInterface('send:agent-filter-changed',cb)
    }

    onAgentStatusChanged (cb) {
        this.eventMethodInterface('send:agent-status-changed',cb)
    }

    onRefreshThread (cb) {
        this.eventMethodInterface('send:agent-refresh-thread',cb)
    }

    onFocusPost (payload) {
        this.eventMethodInterface('send:on-focus-post', payload)
    }

    setReplyMessage (payload) {
        this.postMessageToParent('send:set-reply-message', payload)
    }

    eventMethodInterface (eventName,cb) {
        document.addEventListener(`warroom-miniapp:${eventName}`, (e) => {
            cb(e.detail)
        }, false);
    } 

    getMethodInterface (eventName, payload) {
        this.postMessageToParent(`get:${eventName}`, payload)

        return new Promise ((resolve, reject) => {

            document.addEventListener(`warroom-miniapp:get:${eventName}`, (e) => {
                resolve(e.detail)
            }, false);
        })
    } 

}

export default Warroom

