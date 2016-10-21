import * as React from 'react';
import { connect } from 'react-redux';

export interface AppProps {
}

class App extends React.Component<AppProps, void> {
    render(): JSX.Element {
        const styles = {
            textAlign: 'center'
        };
        return (
            <section style={styles}>
                <p>This is the app component.</p>
            </section>
        );
    }
}

function mapStateToProps(state: any): any { // TODO
    return {};
}

export default connect(mapStateToProps)(App);