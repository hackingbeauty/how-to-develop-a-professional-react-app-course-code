import React, { Component } from 'react'
import EmptyState           from 'components/EmptyState'
import SharedIcon           from '@material-ui/icons/Share'
import { styles }           from './styles.scss'

class SharedView extends Component {
  render() {
    return (
      <div className={styles}>
        <EmptyState
          message="You don't have any shared recordings yet."
          icon={<SharedIcon />}
        />
      </div>
    )
  }
}

export default SharedView
