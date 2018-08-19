import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import configureStore from './store/configureStore';
import {firebase} from './firebase/firebase';
import { login, logout } from './actions/auth';
import { addStep } from './actions/steps';
import { addTemplate } from './actions/templates';
import { addContext } from './actions/contexts';
import { addTest } from './actions/tests';
import uuid from 'uuid';


const store = configureStore();

const step1 = store.dispatch(addStep({
    id: uuid(),
    description: "Login to [server.address] on [browser] for [os] using the [rightOrWrong] login information.",
    data: {},
    result: {
        right: "You are logged in and sent to the home page.",
        wrong: "A message stating that you used the wrong information shows up."
    }
}));

const context1 = store.dispatch(addContext({
    id: uuid(),
    name: "server",
    dev: {
        text: "developement",
        address: "https://dev.jamlogic.com"
    },
    prod: {
        text: "production",
        address: "https://svr1.jamlogic.com"
    }
}));

const context2 = store.dispatch(addContext({
    id: uuid(),
    name: "browser",
    chrome: "chrome",
    opera: "opera",
    safari: "safari"
}));

const context3 = store.dispatch(addContext({
    id: uuid(),
    name: "os",
    android: "android",
    windows: "windows",
    icrap: "icrap"
}));

const template1 = store.dispatch(addTemplate({
    id: uuid(),
    title: "Login to [server.address] on [browser] for [os].",
    contexts: [context1.context.id, context2.context.id, context3.context.id],
    steps: [step1.step.id]
}));

store.dispatch(addTest({
    id: uuid(),
    template: template1.template.id,
    contextSelectors: ["dev", "chrome", "windows"],
    variables: {rightOrWrong: "right"}
}));

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading ...</p>, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
    if(user){
        store.dispatch(login(user.uid));
        renderApp();
        history.push('/dashboard');

        
    }else{
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});