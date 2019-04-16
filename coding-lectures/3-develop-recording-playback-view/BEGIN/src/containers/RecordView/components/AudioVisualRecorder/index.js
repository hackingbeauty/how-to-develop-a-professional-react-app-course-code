import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter }           from 'react-router-dom'
import * as audioActionCreators from 'core/actions/actions-audio'
import { getStyles }            from 'core/libs/lib-style-helpers'
import { ReactMic }             from 'react-mic'
import uuid                     from 'uuid'
import { styles }               from './styles.scss'

class AudioVisualRecorder extends Component {
  allowMicrophoneAccess = () => {
    const { actions } = this.props
    actions.audio.allowMicrophoneAccess()
  }

  create= (recording) => {
    const { actions, audio, history } = this.props
    const { saveRecording } = audio
    const id = uuid.v1()

    if (saveRecording) {
      actions.audio.save({ id, recording }, () => {
        history.push(`/recordings/${id}`)
      })
    }
  }

  render() {
    const { audio } = this.props
    const { isRecording } = audio

    return (
      <div className={styles}>
        <div className={isRecording ? 'is-recording' : 'not-recording'}>
          <ReactMic
            record={isRecording}
            onStart={this.allowMicrophoneAccess}
            className="visualization"
            backgroundColor={getStyles('darkGrey35')}
            strokeColor={getStyles('lightBlue')}
            onStop={this.create}
            visualSetting="sinewave"
            height={200}
          />
          <div className="visualization-scrim" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch)
    }
  }
}

AudioVisualRecorder.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AudioVisualRecorder))
