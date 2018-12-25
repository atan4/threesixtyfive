import React, { Component, Fragment } from 'react'
import classnames from 'classnames'

import { Sort, zoomClasses, closeIcon } from '../../CONSTANTS.js'
import GalleryModal from '../GalleryModal'

import './style.css'

class Grid extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zoomIndex: 5,
      currentIndex: null,
      sortByOldest: false,
      sortDropdown: false,
      imgUrls: Sort.newest,
      enterModal: true
    }

    this.closeModal = this.closeModal.bind(this)
    this.findNext = this.findNext.bind(this)
    this.findPrev = this.findPrev.bind(this)
    this.renderImageContent = this.renderImageContent.bind(this)
    this.toggleOldest = this.toggleOldest.bind(this)
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false)
  }

  handleClickOutside = (event) => {
    if (!this.node || this.node.contains(event.target)) {
      return;
    }
    this.toggleEnterModal();
  }

  toggleOldest = () => {
    const { sortByOldest } = this.state
    if (!sortByOldest) {
      this.setState({
        sortByOldest: true,
        imgUrls: Sort.default
      }, this.toggleSortDropdown)
    }
  }

  toggleNewest = () => {
    const { sortByOldest } = this.state
    if (sortByOldest) {
      this.setState({
        sortByOldest: false,
        imgUrls: Sort.newest
      }, this.toggleSortDropdown)
    }
  }

  toggleSortDropdown = () => {
    this.setState(prevState => ({
      sortDropdown: !prevState.sortDropdown
    }))
  }

  toggleEnterModal = () => {
    this.setState(prevState => ({
      enterModal: !prevState.enterModal
    }))
  }

  renderImageContent(src, index) {
    const { sortByOldest } = this.state
    const photoNum = sortByOldest ? index + 1 : 365 - index
    return (
      <Fragment>
        <div className="photo" onClick={(e) => this.openModal(e, index)}>
          <h1>{photoNum}</h1>
          <img alt={'Photo ' + photoNum} src={src} key={src} />
        </div>
      </Fragment>
    )
  }

  openModal(e, index) {
    this.setState({ currentIndex: index })
  }

  closeModal(e) {
    if (e !== undefined) {
      e.preventDefault()
    }
    this.setState({ currentIndex: null })
  }

  findPrev(e) {
    if (e !== undefined) {
      e.preventDefault()
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }))
  }

  findNext(e) {
    if (e !== undefined) {
      e.preventDefault()
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }))
  }

  decrementScale = () => {
    const { zoomIndex } = this.state
    if (zoomIndex > 2) {
      this.setState(prevState => ({
        zoomIndex: prevState.zoomIndex - 1
      }))
    }
  }

  incrementScale = () => {
    const { zoomIndex } = this.state
    if (zoomIndex < 8) {
      this.setState(prevState => ({
        zoomIndex: prevState.zoomIndex + 1
      }))
    }
  }

  render() {
    const { imgUrls, sortByOldest, zoomIndex, sortDropdown, enterModal } = this.state
    return (
      <div className="gallery-container">
        {enterModal &&
          <div className="gallery-enter-modal-overlay">
            <div className="gallery-enter-modal" ref={node => this.node = node}>
              <header>
                <span onClick={this.toggleEnterModal}>{closeIcon}</span>
              </header>
              <div className="gallery-enter-modal-text">
                <h1>ThreeSixtyFive by Adrianna Tan</h1>
                <h3>ThreeSixtyFive is a collection of photos taken throughout a four-year period amid repeated academic hiatuses. Starting in 2014 with the original intention to produce a single photo every day, this project documents my growth as a photographer as well as the passage of time throughout high school and college.</h3>
                <h3>While the full context of each photo remains unknown to the viewer, each photo serves as a landmark through which I can navigate my personal experiences and the development of my opinions and thoughts over time.</h3>
                <h3>For comments and inquiries, reach me at <a href="mailto:atan4@wellesley.edu" className="gallery-enter-modal-link">atan4@wellesley.edu</a></h3>
              </div>
            </div>
          </div>
        }
        <div className="gallery-header">
          <span className="header-button" onClick={this.toggleEnterModal}>ThreeSixtyFive by Adrianna Tan</span>
          <h3 className="sort-button" onClick={this.toggleSortDropdown}>{sortByOldest ? 'Sort by oldest' : 'Sort by newest'}</h3>
          {sortDropdown &&
            <div className="sort-dropdown">
              <ul onClick={this.toggleNewest}>Sort by newest</ul>
              <ul onClick={this.toggleOldest}>Sort by oldest</ul>
            </div>
          }
          <div className="gallery-zoom">
            <span className="zoom-minus" onClick={this.incrementScale}>-</span>
            <span className="zoom-plus" onClick={this.decrementScale}>+</span>
          </div>
        </div>
        <div className={classnames("gallery-grid", zoomClasses[zoomIndex - 2])}>
          {imgUrls.map(this.renderImageContent)}
        </div>
        <GalleryModal
          currentIndex={this.state.currentIndex}
          closeModal={this.closeModal}
          findPrev={this.findPrev}
          findNext={this.findNext}
          hasPrev={this.state.currentIndex > 0}
          hasNext={this.state.currentIndex + 1 < imgUrls.length}
          src={imgUrls[this.state.currentIndex]}
        />
      </div>
    )
  }
}

export default Grid