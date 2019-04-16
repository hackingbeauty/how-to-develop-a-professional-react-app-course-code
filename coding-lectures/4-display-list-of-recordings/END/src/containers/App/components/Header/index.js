import React, { Component } from 'react'
import AppBar               from 'components/AppBar'
import Toolbar              from '@material-ui/core/Toolbar'
import Typography           from '@material-ui/core/Typography'
import IconButton           from '@material-ui/core/IconButton'
import Menu                 from '@material-ui/core/Menu'
import MenuItem             from '@material-ui/core/MenuItem'
import AccountCircle        from '@material-ui/icons/AccountCircle'
import Navigation           from './components/Navigation'
import { styles }           from './styles.scss'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }
  }

  displayRecordingCount = () => {
    return '0 recordings'
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  close = () => {
    this.setState({ anchorEl: null })
  }

  goTo = (evt) => {
    const { history } = this.props
    const { link } = evt.currentTarget.dataset

    history.push(link)
    this.close()
  }

  render() {
    const { anchorEl } = this.state

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
