import { BaseAction } from './base-action';

export type SearchAction = SearchActions.PerformSearch;

export namespace SearchActions {
    export const ActionType = {
        PERFORM_SEARCH: 'PERFORM_SEARCH' as 'PERFORM_SEARCH',
    };

    export interface PerformSearch extends BaseAction {
        type: 'PERFORM_SEARCH';
        payload: { query: string };
    };
}