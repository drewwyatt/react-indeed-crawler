import { ActionTypes } from '../actions';
import { Search as SearchModels, IFetchStatus, FetchStatus } from '../models';

export interface ISearch {
    query: string;
    results: SearchModels.IResult[];
    status: IFetchStatus;
}

export type ISearchesState = ISearch[];

const DEFAULT_StATE = [];

export default function searches(state: ISearchesState = DEFAULT_StATE, action: ActionTypes.SearchAction): ISearchesState {
    switch (action.type) {
        case ActionTypes.SearchActions.ActionType.LOAD_RESULTS:
            return handleLoadResults(state, action);
        case ActionTypes.SearchActions.ActionType.UPDATE_SEARCH_STATUS:
            return handleUpdateStatus(state, action);
        default:
            return state;
    }
}

function handleLoadResults(state: ISearchesState, action: ActionTypes.SearchActions.LoadResults): ISearchesState {
    const { query, results } = action.payload;
    const idx = state.findIndex(s => s.query === query);
    if (idx > -1) {
        return [
            ...state.slice(0, idx),
            Object.assign({}, state[idx], {
                results: [
                    ...state[idx].results,
                    ...results
                ]
            }),
            ...state.slice(idx + 1)
        ];
    }

    return [
        ...state,
        {
            query,
            results,
            status: FetchStatus.FETCHING
        }
    ];
}

function handleUpdateStatus(state: ISearchesState, action: ActionTypes.SearchActions.UpdateSearchStatus): ISearchesState {
    const { query, status } = action.payload;
    const idx = state.findIndex(s => s.query === query);
    return [
        ...state.slice(0, idx),
        Object.assign({}, state[idx], {
            status
        }),
        ...state.slice(idx + 1)
    ];
}
