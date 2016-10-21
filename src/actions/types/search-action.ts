import { BaseAction } from './base-action';
import { Search } from '../../models';

export type SearchAction = SearchActions.PerformSearch | SearchActions.LoadResults;

export namespace SearchActions {
    export const ActionType = {
        PERFORM_SEARCH: 'SEARCH/PERFORM_SEARCH' as 'SEARCH/PERFORM_SEARCH',
        LOAD_RESULTS: 'SEARCH/LOAD_RESULTS' as 'SEARCH/LOAD_RESULTS'
    };

    export interface PerformSearch extends BaseAction {
        type: 'SEARCH/PERFORM_SEARCH';
        payload: { query: string; start: number; };
    };

    export interface LoadResults extends BaseAction {
        type: 'SEARCH/LOAD_RESULTS',
        payload: { query: string; results: Search.IResult[]; }
    };
}