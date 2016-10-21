import { BaseAction } from './base-action';
import { Search, IFetchStatus } from '../../models';

export type SearchAction = SearchActions.PerformSearch | SearchActions.LoadResults | SearchActions.UpdateSearchStatus;

export namespace SearchActions {
    export const ActionType = {
        PERFORM_SEARCH: 'SEARCH/PERFORM_SEARCH' as 'SEARCH/PERFORM_SEARCH',
        LOAD_RESULTS: 'SEARCH/LOAD_RESULTS' as 'SEARCH/LOAD_RESULTS',
        UPDATE_SEARCH_STATUS: 'SEARCH/UPDATE_SEARCH_STATUS' as 'SEARCH/UPDATE_SEARCH_STATUS'
    };

    export interface PerformSearch extends BaseAction {
        type: 'SEARCH/PERFORM_SEARCH';
        payload: { query: string; start: number; };
    };

    export interface LoadResults extends BaseAction {
        type: 'SEARCH/LOAD_RESULTS',
        payload: { query: string; results: Search.IResult[]; }
    };

    export interface UpdateSearchStatus extends BaseAction {
        type: 'SEARCH/UPDATE_SEARCH_STATUS',
        payload: { query: string; status: IFetchStatus }
    }
}