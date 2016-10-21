import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Spinner } from 'react-mdl';

import { IAppState, Search, IFetchStatus, FetchStatus } from '../models';
import { ActionCreators } from '../actions';
import { ISearch } from '../reducers/search-results';

export type AppProps = PropsFromDispatch & PropsFromState;

class App extends React.Component<AppProps, void> {
    render(): JSX.Element {
        const { performSearch } = this.props;

        const styles = {
            textAlign: 'center'
        };

        return (
            <section style={styles}>
                {this._searchData()}
                <button onClick={() => performSearch('scala')}>Perform Search</button>
            </section>
        );
    }

    private _searchData(): JSX.Element {
        const { searches } = this.props;
        if (!searches.length) {
            return <p>Search for jobs.</p>;
        }

        return <ul>{searches.map((s, i) => this._mapSearchToData(s, i))}</ul>;
    }

    private _mapSearchToData(search: ISearch, idx: number): JSX.Element {
        return (
            <li key={idx}>
                <strong>{search.query}: &nbsp;&nbsp;</strong>
                {search.results.length} results found
                {this._fetchGlyph(search.status)}
            </li>
        );
    }

    private _fetchGlyph(status: IFetchStatus): JSX.Element {
        if (status === FetchStatus.FETCHING) {
            return <Spinner />;
        }

        if (status === FetchStatus.ERROR) {
            return <strong>ERROR</strong>;
        }
    }
}

interface PropsFromState {
    searches: ISearch[];
}

function mapStateToProps(state: IAppState): PropsFromState { 
    return {
        searches: state.searches
    };
}

interface PropsFromDispatch {
    performSearch(query: string): void;
}

function mapDispatchToProps(dispatch: Dispatch<IAppState>): PropsFromDispatch {
    return {
        performSearch: function(query) {
            dispatch(ActionCreators.Search.performSearch(query));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);