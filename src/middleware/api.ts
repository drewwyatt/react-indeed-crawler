import { Store, Action, Dispatch } from 'redux';
import { ActionTypes, ActionCreators } from '../actions';
import { IAppState, Search, FetchStatus } from '../models';

type Next = (action: Action) => any; // TODO

const API_BASE = 'http://api.indeed.com/ads/apisearch?publisher=4757914134515649&format=json&v=2&limit=1000';
const PAGING_CAP = 10; // arbitrary cap to speed things up
// const PAGING_CAP = 40; // arbitrary cap based on observed responses

function handleSearch(query: string, start: number): Promise<Search.IResponse> {
    return fetch(`${API_BASE}&q=${query}&start=${start}`, { method: 'GET', headers: { contentType: 'application/json' }})
        .then(response => response.json());
}

function createErrorHandler(dispatch: Dispatch<IAppState>): (q: string) => (e: Error) => void {
    return function (query: string) {
        return function (error: Error) {
            console.error(error.message);
            dispatch(ActionCreators.Search.updateSearchStatus(query, FetchStatus.ERROR));
        }
    }
}

function createResponseHandler(dispatch: Dispatch<IAppState>): (q: string) => (r: Search.IResponse) => void {
    return function (query: string) {
        return function (response: Search.IResponse) {
            if (response) {
                const { results, end, totalResults, pageNumber } = response;
                if (results) {
                    dispatch(ActionCreators.Search.loadResults(query, response.results));
                }

                if (totalResults && end && end < totalResults && pageNumber < PAGING_CAP) {
                    dispatch(ActionCreators.Search.performSearch(query, end));
                } else {
                    dispatch(ActionCreators.Search.updateSearchStatus(query, FetchStatus.SUCCESS));
                }
            }
        }
    }
}

export default (store: Store<any>) => (next: Next) => (action: Action) => {
    next(action);
    const dispatch = store.dispatch;
    switch (action.type) {
        case ActionTypes.SearchActions.ActionType.PERFORM_SEARCH:
            const { query, start } = (action as ActionTypes.SearchActions.PerformSearch).payload;
            handleSearch(query, start)
                .then(createResponseHandler(dispatch)(query))
                .catch(createErrorHandler(dispatch)(query));
        default:
            return;
    }
}