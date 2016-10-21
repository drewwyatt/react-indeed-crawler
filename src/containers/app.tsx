import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../models';
import { ActionCreators } from '../actions';

export type AppProps = PropsFromDispatch & PropsFromState;

class App extends React.Component<AppProps, void> {
    render(): JSX.Element {
        const { performSearch } = this.props;

        const styles = {
            textAlign: 'center'
        };
        return (
            <section style={styles}>
                <p>This is the app component.</p>
                <button onClick={() => performSearch('boom')}>Perform Search</button>
            </section>
        );
    }
}

interface PropsFromState {}

function mapStateToProps(state: any): any { // TODO
    return {};
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