import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { ReactSoundDisplay }    from 'react-sound-display'
import { getStyles }            from 'core/libs/lib-style-helpers'
import { styles }               from './styles.scss'

class DetailsVisualization extends Component {
  displayContent = () => {
    const { audioElem } = this.props
    let frequencyBars

    if (audioElem) {
      frequencyBars = (
        <ReactSoundDisplay
          className="frequency-bars"
          backgroundColor={getStyles('darkGrey35')}
          strokeColor={getStyles('lightBlue')}
          visualSetting="frequencyBars"
          audioElem={audioElem}
          height={200}
        />
      )
    }

    return (
      <div className="frequency-bars">
        {frequencyBars}
      </div>
    )
  }

  render() {
    return (
      <div className={styles}>
        {this.displayContent()}
      </div>
    )
  }
}

DetailsVisualization.propTypes = {
  audioElem: PropTypes.shape({})
}

DetailsVisualization.defaultProps = {
  audioElem: null
}

export default DetailsVisualization
