import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logo from '../images/logo2.png'
import '../style/Css.css'
import { deleteUser } from './UserFunctions'

class route extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  deleteAccount() {
    deleteUser(localStorage.usertoken)
      .then((response) => {
        console.log(response + 'then')
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
      })
      .catch((err) => {
        console.log(err + 'catch')
      })
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <button className="btn btn-lg btn-dark btn-block">Login</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <button className="btn btn-lg btn-dark btn-block">Register</button>
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <button className="btn btn-lg btn-dark btn-block">profile</button>
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            <button className="btn btn-lg btn-dark btn-block">Logout</button>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <button
              className="btn btn-lg btn-dark btn-block"
              onClick={() => {
                this.deleteAccount()
              }}
            >
              Delete Account
            </button>
          </a>
        </li>
      </ul>
    )

    return (
      <nav
        className="navbar navbar-expand-md navbar-dark fixed-top "
        style={{
          borderBottomColor: '#051438',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          backgroundColor: '#051438',
        }}
      >
        <Link to="/shorten">
          <div className="brand">URL Shortener </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarsExample10">
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(route)
