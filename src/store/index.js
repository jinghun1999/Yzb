import App from './common/app'
import Account from './accountStore'
import userStore from './userStore'

export default {
    app: new App(),
    account: new Account(),
    userStore,
}