import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme                from 'configs/config-theme'
import {
  HashRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import RecordView           from 'containers/RecordView'
import FavoritesView        from 'containers/FavoritesView'
import SharedView           from 'containers/SharedView'
import Header               from './components/Header'
import Footer               from './components/Footer'

// global styles for entire app
import './styles.scss'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HashRouter>
          <div>
            <Header />
            <Footer />
            <div className="app-shell">
              <Switch>
                <Route path="/record" component={RecordView} />
                <Route path="/favorites" component={FavoritesView} />
                <Route path="/shared" component={SharedView} />
                <Redirect from="/" to="/recordings" />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    )
  }
}

export default App
