import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import {Link, withRouter} from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#ffa726'}
  else
    return {color: '#ffffff'}
}
const Menu = withRouter(({history}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Grasp Configuration
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon/>
        </IconButton>
      </Link>
      {
        <span>
          <Link to="/list">
            <Button style={isActive(history, "/list")}>All Images
            </Button>
          </Link>
        </span>
      }
      {
        <span>
          <Link to="/cropimage">
            <Button style={isActive(history, "/cropimage")}>Save Grasp Config
            </Button>
          </Link>
        </span>
      }
    </Toolbar>
  </AppBar>
))

export default Menu
