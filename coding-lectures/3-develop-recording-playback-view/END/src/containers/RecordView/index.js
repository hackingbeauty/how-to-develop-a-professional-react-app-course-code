import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter }           from 'react-router-dom'
import * as audioActionCreators from 'core/actions/actions-audio'
import * as uiActionCreators    from 'core/actions/actions-ui'
import { StandardModal }        from 'components/Modals'
import AppBar                   from 'components/AppBar'
import BottomNavigation         from 'components/BottomNavigation'
import Toolbar                  from '@material-ui/core/Toolbar'
import Slide                    from '@material-ui/core/Slide'
import IconButton               from '@material-ui/core/IconButton'
import CloseIcon                from '@material-ui/icons/Close'
import Typography               from '@material-ui/core/Typography'
import Controls                 from './components/Controls'
import AudioVisualRecorder      from './components/AudioVisualRecorder'
import Timer                    from './components/Timer'
import { modalStyles }          from './styles.scss'

function TransitionComponent(props) {
  return <Slide direction="left" {...props} mountOnEnter unmountOnExit />
}

class RecordView extends Component {
  componentDidMount() {
    const { actions } = this.props

    actions.ui.openModal({
      modalKey: 'record-modal'
    })
  }

  close=() => {
    const { actions, history } = this.props
    actions.audio.stopRecording()
    history.goBack()
  }

  displayHeaderMessage= () => {
    const { audio } = this.props
    const { isRecording } = audio
    const recordingCount = audio.count + 1

    if (isRecording) {
      return (
        <div className="message">
          <span>Recording </span>
          <strong>#{recordingCount + 1} Untitled.webm </strong>
          <em>...</em>
        </div>
      )
    }

    return (<span>New recording</span>)
  }

  render() {
    const { audio, ui } = this.props
    const { microphoneAccessGranted } = audio

    return (
      <StandardModal
        modalKey="record-modal"
        className="record-modal"
        modalState={ui.modalState}
        cssModule={modalStyles}
        TransitionComponent={TransitionComponent}
      >
        <div>
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="back-arrow"
                onClick={this.close}
                className="arrow-icon"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                {this.displayHeaderMessage()}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="record-view-container">
            <AudioVisualRecorder />
            <div className="bottom-section">
              <Timer on={microphoneAccessGranted} />
            </div>
          </div>
          <BottomNavigation transparent>
            <Controls />
          </BottomNavigation>
        </div>
      </StandardModal>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch),
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

RecordView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordView))
