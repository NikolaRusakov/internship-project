import { combineReducers } from 'redux'
import {dashStore,connectionStore} from './app'


export default combineReducers({
    dashStore,
    connectionStore
})
