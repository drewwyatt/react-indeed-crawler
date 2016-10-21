import { Store, Action, Dispatch } from 'redux';
import { ActionTypes, ActionCreators } from '../actions';
import { IAppState, Search } from '../models';

type Next = (action: Action) => any; // TODO

const API_BASE = 'http://api.indeed.com/ads/apisearch?publisher=4757914134515649&q=scala&format=json&v=2&limit=25';

function handleSearch(): Promise<Search.IResponse> {
    return fetch(API_BASE, { method: 'GET', headers: { contentType: 'application/json' }})
        .then(response => response.json());
}

function createResponseHandler(dispatch: Dispatch<IAppState>): (q: string) => (r: Search.IResponse) => void {
    return function (query: string) {
        return function (response: Search.IResponse) {
            if (response && response.results) {
                dispatch(ActionCreators.Search.loadResults(query, response.results));
            }
        }
    }
}

export default (store: Store<any>) => (next: Next) => (action: Action) => {
    next(action);
    const dispatch = store.dispatch;
    switch (action.type) {
        case ActionTypes.SearchActions.ActionType.PERFORM_SEARCH:
            const q = (action as ActionTypes.SearchActions.PerformSearch).payload.query;
            handleSearch()
                .then(createResponseHandler(dispatch)(q));
        default:
            return;
    }
}