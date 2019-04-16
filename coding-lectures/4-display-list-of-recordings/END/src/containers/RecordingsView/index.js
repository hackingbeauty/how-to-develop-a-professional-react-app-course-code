import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActionCreators  from 'core/actions/actions-ui'
import EmptyState             from 'components/EmptyState'
import ListenIcon             from '@material-ui/icons/PlaylistPlay'
import RecordedItem           from './components/RecordedItem'
import { styles }             from './styles.scss'

class RecordingsView extends Component {
  getRecordings() {
    const { list } = this.props.audio
    const recordings = list.map(recording => <RecordedItem key={recording.id} item={recording} />)
    return recordings
  }

  displayRecordings() {
    const { list } = this.props.audio

    if (list && list.length) {
      const recordings = this.getRecordings()
      return (<ul className="item-list">{recordings}</ul>)
    }

    return (
      <EmptyState
        message="You don't have any recordings yet."
        icon={<ListenIcon />}
      />
    )
  }

  render() {
    const recordings = this.displayRecordings()

    return (
      <div className={styles}>
        {recordings}
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


RecordingsView.propTypes = {
  audio: PropTypes.shape({
    list: PropTypes.array
  }).isRequired,
  history: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps)(RecordingsView)
