import React, { Component } from 'react'
import FavoriteIcon         from '@material-ui/icons/Favorite'
import EmptyState           from 'components/EmptyState'
import { styles }           from './styles.scss'

class FavoritesView extends Component {
  render() {
    return (
      <div className={styles}>
        <EmptyState
          message="You don't have any favorite recordings."
          icon={<FavoriteIcon />}
        />
      </div>
    )
  }
}

export default FavoritesView
