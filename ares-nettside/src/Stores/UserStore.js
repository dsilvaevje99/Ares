import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {

            loading: false,
            isLoggedIn: true,
            username: ''

        })
    }
}

export default new UserStore();