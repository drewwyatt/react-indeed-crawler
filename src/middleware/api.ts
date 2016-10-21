import { Store, Action } from 'redux';
import { Types, Creators } from '../actions';

type Next = (action: Action) => any; // TODO

const API_BASE = 'TODO';

export default (store: Store<any>) => (next: Next) => (action: Action) => {
    next(action);
    const dispatch = store.dispatch;
    switch (action.type) {
        default:
            return;
    }
}