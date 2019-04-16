import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import Paper                from '@material-ui/core/Paper'
import { Tabs, Tab }        from '@material-ui/core'
import FavoriteIcon         from '@material-ui/icons/Favorite'
import ListenIcon           from '@material-ui/icons/PlaylistPlay'
import SharedIcon           from '@material-ui/icons/Share'
import { styles }           from './styles.scss'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { location } = nextProps
    let currentTab

    switch (location.pathname) {
      case '/recordings':
        currentTab = 0
        break
      case '/shared':
        currentTab = 1
        break
      case '/favorites':
        currentTab = 2
        break
      default:
        currentTab = 0
        break
    }

    return { currentTab }
  }

  handleChange=(evt, tab) => {
    this.setState({ currentTab: tab })
    this.updateURL(tab)
  }

  updateURL(tab) {
    const { history } = this.props

    switch (tab) {
      case 0:
        history.push('/recordings')
        break
      case 1:
        history.push('/shared')
        break
      case 2:
        history.push('/favorites')
        break
      default:
        break
    }
  }

  render() {
    const { currentTab } = this.state

    return (
      <div className={styles}>
        <Paper>
          <Tabs
            className="main-navigation"
            value={currentTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            fullWidth
            centered
          >
            <Tab
              icon={<ListenIcon />}
              label="Listen"
            />
            <Tab
              icon={<SharedIcon />}
              label="Shared"
            />
            <Tab
              icon={<FavoriteIcon />}
              label="Favorite"
            />
          </Tabs>
        </Paper>
      </div>
    )
  }
}

Navigation.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default withRouter(Navigation)
