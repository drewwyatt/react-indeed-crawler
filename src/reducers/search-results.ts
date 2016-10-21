import { ActionTypes } from '../actions';
import { Search as SearchModels, IFetchStatus, FetchStatus } from '../models';

interface ISearch {
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