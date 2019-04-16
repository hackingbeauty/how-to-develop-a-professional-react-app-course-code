import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter }         from 'react-router-dom'
import { withStyles }         from '@material-ui/core/styles'
import * as uiActionCreators  from 'core/actions/actions-ui'
import { getStoredRecording } from 'core/libs/lib-cache'
import { getCurrentId }       from 'core/libs/lib-url-helpers'
import Drawer                 from '@material-ui/core/Drawer'
import DetailsHeader          from './components/DetailsHeader'
import DetailsBody            from './components/DetailsBody'

const widthBreakpoints = theme => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      width: '500px'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
})

class DetailsView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      recording: null
    }
  }

  componentDidMount() {
    const { actions } = this.props
    const id = getCurrentId(this.props)

    actions.ui.openRightDrawer()

    getStoredRecording(id)
      .then((recordingFromStorage) => {
        this.setState({
          recording: recordingFromStorage
        })
      })
  }

  static getDerivedStateFromProps(nextProps) {
    const { rightDrawerIsOpen } = nextProps.ui
    return { open: rightDrawerIsOpen }
  }

  onClose = () => {
    const { actions, history } = this.props

    actions.ui.closeRightDrawer()

    setTimeout(() => {
      history.push('/recordings')
    }, 50)
  }

  render() {
    const { classes } = this.props
    const { open, recording } = this.state

    return (
      <Drawer
        anchor="right"
        classes={{ paper: classes.paper }}
        open={open}
        onClose={this.onClose}
      >
        <div>
          <DetailsHeader />
          <DetailsBody recording={recording} />
        </div>
      </Drawer>
    )
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

DetailsView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

/* eslint-disable */
export default withStyles(widthBreakpoints)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsView))
)
/* eslint-disable */
