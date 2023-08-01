import React from "react";

function NewsItem(props) {
  let {
    title,
    description,
    imageURL,
    newsURL,
    author,
    publisher,
    publishedDate,
  } = props;
  return (
    <div className="card my-2">
      <img src={imageURL} className="card-img-top" alt="..." />
      <div className="card-body">
        <span
          className="position-absolute top-0 badge rounded-pill bg-danger"
          style={{ zIndex: 1, transform: "translateY(-50%)", right: "0%" }}
        >
          {publisher ? publisher : "Unknown Source"}
        </span>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-body-secondary">
            By {author ? author : "Unknown"}{" "}
            {publishedDate
              ? "on " + new Date(publishedDate).toDateString()
              : ""}
          </small>
        </p>
        <a
          href={newsURL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-secondary"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default NewsItem;
