import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import moment               from 'moment'
import { styles }           from './styles.scss'

class RecordedItem extends Component {
  goToDetailsView= () => {
    const { history, item } = this.props
    const { id } = item
    history.push(`/recordings/${id}`)
  }

  render() {
    const {
      title,
      blob,
      startTime,
      stopTime
    } = this.props.item

    const createdAt = moment(startTime).format('MMMM DD YYYY, h:mm a')
    const totalSize = (blob.size / 1000000).toFixed(2)
    const length = ((moment.duration(stopTime - startTime).asSeconds()) / 60)
      .toFixed(2)
      .replace('.', ':')

    return (
      <li className={styles}>
        <div
          className="item"
        >
          <div
            onClick={this.goToDetailsView}
            onKeyPress={this.goToDetailsView}
            className="title"
            role="link"
            tabIndex={0}
          >
            <h2>{title}</h2>
          </div>
          <div className="created-at">{createdAt}</div>
          <div className="length">{length}</div>
          <div className="size">{totalSize} MB</div>
        </div>
      </li>
    )
  }
}

RecordedItem.propTypes = {
  history: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({
    blob: PropTypes.shape({}).isRequired,
    startTime: PropTypes.number.isRequired,
    stopTime: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(RecordedItem)
