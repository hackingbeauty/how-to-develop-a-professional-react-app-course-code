import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import Button                 from 'components/Button'
import PlayIcon               from '@material-ui/icons/PlayArrow'
import PauseIcon              from '@material-ui/icons/Pause'
import { styles }             from './styles.scss'

class DetailsControls extends Component {
  static checkMediaSupport() {
    return navigator.mediaDevices
  }

  constructor(props) {
    super(props)
    const { audioElem } = props

    audioElem.onended = this.stopAudio

    this.state = {
      audioElem: props.audioElem,
      isPlaying: false
    }
  }

  componentWillUnmount() {
    this.stopAudio()
  }

  stopAudio = () => {
    const { audioElem } = this.state

    this.setState({
      isPlaying: false
    })

    if (audioElem) { audioElem.pause() }
  }

  toggleAudio= () => {
    const { audioElem, isPlaying } = this.state

    if (audioElem && DetailsControls.checkMediaSupport()) {
      this.setState({
        isPlaying: !isPlaying
      })

      if (isPlaying) {
        audioElem.pause()
      } else {
        audioElem.play()
      }
    }
  }

  render() {
    const { isPlaying } = this.state
    const buttonType = isPlaying ? <PauseIcon /> : <PlayIcon />

    return (
      <div className={styles}>
        <Button
          variant="fab"
          className="play-btn"
          color="primary"
          onClick={this.toggleAudio}
        >
          {buttonType}
        </Button>

        {!isPlaying && <div className="scrim" />}

      </div>
    )
  }
}


DetailsControls.propTypes = {
  audioElem: PropTypes.shape({}).isRequired
}

export default DetailsControls
