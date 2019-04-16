import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import ReactSimpleTimer     from 'react-simple-timer'
import { styles }           from './styles.scss'

class Timer extends Component {
  render() {
    const { on } = this.props

    return (
      <div className={styles}>
        <ReactSimpleTimer play={on} />
      </div>
    )
  }
}

Timer.propTypes = {
  on: PropTypes.bool.isRequired
}

export default Timer
