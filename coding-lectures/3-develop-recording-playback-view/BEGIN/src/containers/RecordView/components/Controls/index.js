import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as audioActionCreators from 'core/actions/actions-audio'
import * as uiActionCreators    from 'core/actions/actions-ui'
import Button                   from 'components/Button'
import { ConfirmationModal }    from 'components/Modals'
import SaveIcon                 from '@material-ui/icons/Save'
import MicrophoneIcon           from '@material-ui/icons/Mic'
import DeleteIcon               from '@material-ui/icons/Delete'
import Slide                    from '@material-ui/core/Slide'
import { styles }               from './styles.scss'

class Controls extends Component {
  save = () => {
    const { actions } = this.props
    actions.audio.stopRecording({ saveRecording: true })
  }

  start = () => {
    const { actions } = this.props
    actions.audio.startRecording()
  }

  stop = () => {
    const { actions } = this.props
    actions.audio.stopRecording()
  }

  confirmDelete = () => {
    const { actions } = this.props

    actions.ui.openConfirmModal({
      modalKey: 'confirm-delete-recording'
    })
  }

  renderMicrophoneButton() {
    return (
      <Button
        color="primary"
        variant="fab"
        className="microphone-btn"
        onClick={this.start}
      >
        <MicrophoneIcon />
      </Button>
    )
  }

  renderRecordingButtons = () => {
    const { audio, ui } = this.props

    return (
      <div>
        <Slide
          direction="right"
          in={audio.isRecording}
          mountOnEnter
          unmountOnExit
        >
          <Button
            className="delete-btn"
            onClick={this.confirmDelete}
            variant="contained"
          >
            <DeleteIcon />
            Delete
          </Button>
        </Slide>
        <Slide
          direction="left"
          in={audio.isRecording}
          mountOnEnter
          unmountOnExit
        >
          <Button
            className="save-btn"
            color="secondary"
            onClick={this.save}
            variant="contained"
          >
            <SaveIcon />
            Save
          </Button>
        </Slide>

        <ConfirmationModal
          modalKey="confirm-delete-recording"
          confirmModalState={ui.confirmModalState}
          okCallback={this.stop}
          title="Delete this recording?"
        />

      </div>
    )
  }

  render() {
    const { audio } = this.props
    const { isRecording } = audio
    const buttons = isRecording ? this.renderRecordingButtons() : this.renderMicrophoneButton()

    return (
      <div className={styles}>
        <div className="controls">
          {buttons}
        </div>
      </div>
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

Controls.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
