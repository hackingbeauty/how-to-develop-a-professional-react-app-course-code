import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as uiActionCreators    from 'core/actions/actions-ui'
import AppBar                   from 'components/AppBar'
import Toolbar                  from '@material-ui/core/Toolbar'
import IconButton               from '@material-ui/core/IconButton'
import CloseIcon                from '@material-ui/icons/Close'
import { withRouter }           from 'react-router-dom'
import { styles }               from './styles.scss'

class DetailsHeader extends Component {
  close = () => {
    const { actions, history } = this.props

    actions.ui.closeRightDrawer()

    setTimeout(() => {
      history.push('/recordings')
    }, 50)
  }

  render() {
    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="close-icon"
              className="close-icon"
              onClick={this.close}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

DetailsHeader.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

export default withRouter(connect(null, mapDispatchToProps)(DetailsHeader))
