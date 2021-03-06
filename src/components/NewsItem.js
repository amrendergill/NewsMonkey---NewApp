import React from "react";

// export class NewsItem extends Component {
  const NewsItem = (props) => {
  // render() {
    let { title, description, imageUrl, newsUrl, author, date , source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute',right:'0'}}>

          <span className=" badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://images.hindustantimes.com/img/2021/12/11/1600x900/FGTvInpVgAYgutF_1639208225981_1639208236063.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  // }
}

export default NewsItem;
