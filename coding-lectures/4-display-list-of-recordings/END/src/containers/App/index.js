import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { MuiThemeProvider }   from '@material-ui/core/styles'
import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import FavoritesView            from 'containers/FavoritesView'
import SharedView               from 'containers/SharedView'
import RecordView               from 'containers/RecordView'
import RecordingsView           from 'containers/RecordingsView'
import DetailsView              from 'containers/DetailsView'
import * as audioActionCreators from 'core/actions/actions-audio'
import theme                    from 'configs/config-theme'
import Header                   from './components/Header'
import Footer                   from './components/Footer'

// global styles for entire app
import './styles.scss'

class App extends Component {
  componentDidMount() {
    const { actions } = this.props
    actions.audio.getAll()
  }

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
                <Route path="/recordings/:id" component={DetailsView} />
                <Route path="/recordings" component={RecordingsView} />
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

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch)
    }
  }
}

App.propTypes = {
  actions: PropTypes.shape({}).isRequired
}

export default connect(null, mapDispatchToProps)(App)
