import { SearchActions } from '../types';

export namespace Search {
    export function performSearch(query: string): SearchActions.PerformSearch {
        return {
            type: SearchActions.ActionType.PERFORM_SEARCH,
            payload: { query }
        };
    }
}