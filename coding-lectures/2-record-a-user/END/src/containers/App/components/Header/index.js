import React, { Component } from 'react'
import AppBar               from 'components/AppBar'
import Toolbar              from '@material-ui/core/Toolbar'
import Typography           from '@material-ui/core/Typography'
import Navigation           from './components/Navigation'
import { styles }           from './styles.scss'

class Header extends Component {
  displayRecordingCount() {
    return '0 recordings'
  }

  render() {
    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              { this.displayRecordingCount() }
            </Typography>
          </Toolbar>
        </AppBar>
        <Navigation />
      </div>
    )
  }
}

export default Header
