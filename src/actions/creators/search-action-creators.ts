import { SearchActions } from '../types';
import { Search as SearchModel, IFetchStatus } from '../../models';

export namespace Search {
    export function performSearch(query: string, start: number = 1): SearchActions.PerformSearch {
        return {
            type: SearchActions.ActionType.PERFORM_SEARCH,
            payload: { query, start }
        };
    }

    export function loadResults(query: string, results: SearchModel.IResult[]): SearchActions.LoadResults {
        return {
            type: SearchActions.ActionType.LOAD_RESULTS,
            payload: { query, results }
        };
    }

    export function updateSearchStatus(query: string, status: IFetchStatus): SearchActions.UpdateSearchStatus {
        return {
            type: SearchActions.ActionType.UPDATE_SEARCH_STATUS,
            payload: { query, status }
        };
    }
}