import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ErrorIcon            from '@material-ui/icons/ErrorOutline'
import DetailsControls      from '../DetailsControls'
import DetailsVisualization from '../DetailsVisualization'
import { styles }           from './styles.scss'

class DetailsBody extends Component {
  constructor(props) {
    super(props)

    this.state = {
      audioElem: null
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { recording } = nextProps

    if (recording) {
      const audioElem = DetailsBody.getAudioElem(recording)

      return {
        audioElem
      }
    }

    return { recording }
  }


  static getAudioElem(recording) {
    if (recording) {
      const audioBlob = new Blob([recording.blob], { type: 'audio/webm' })
      const audioElem = new Audio()

      audioElem.src = URL.createObjectURL(audioBlob)
      return audioElem
    }

    return null
  }

  displayContent = () => {
    const { audioElem } = this.state

    if (audioElem) {
      return (
        <div>
          <DetailsControls audioElem={audioElem} />
        </div>
      )
    }

    return (
      <div>
        <div className="scrim" />
        <div className="not-found">
          <span className="msg">Recording not found</span>
          <ErrorIcon />
        </div>
      </div>
    )
  }

  render() {
    const { audioElem } = this.state

    return (
      <div className={styles}>
        <DetailsVisualization audioElem={audioElem} />
        {this.displayContent()}
      </div>
    )
  }
}


DetailsBody.defaultProps = {
  recording: null
}

export default DetailsBody
