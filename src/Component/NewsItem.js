import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <>

        <div className='my-3'>
          <div className="card">

            <img src={!imageUrl ? 'https://www.thestreet.com/.image/NDA6MDAwMDAwMDAyOTIwMTky/succulent-prime-rib-dinner.jpg?profile=share16-9' : imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">

              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
                {!source ? 'Unknown' : source}
                <span className="visually-hidden">unread messages</span>
              </span>
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className=" text-danger">By <b>{!author ? 'Unknown' : author}</b> On {new Date(date).toDateString()}</small></p>
              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn text-bg-warning">Read More</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem
