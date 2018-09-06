import React, { Component } from 'react'

import './style.css'

class GalleryModal extends Component {
  constructor() {
    super()
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnMount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(e) {
    if (e.keyCode === 27)
      this.props.closeModal()
    if (e.keyCode === 37 && this.props.hasPrev)
      this.props.findPrev()
    if (e.keyCode === 39 && this.props.hasNext)
      this.props.findNext()
  }

  render() {
    const { closeModal, hasNext, hasPrev, findNext, findPrev, src, currentIndex } = this.props
    if (!src) {
      return null
    }

    return (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div isOpen={!!src} className="modal">
          <div className='modal-body'>
            {hasPrev && <a className='modal-prev' onClick={findPrev} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
            {hasNext && <a className='modal-next' onClick={findNext} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
            <img alt={'Photo ' + currentIndex} className="gallery-img" src={src} />
          </div>
        </div>
      </div>
    )
  }
}

export default GalleryModal