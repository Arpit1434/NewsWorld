import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

function News(props) {
  let [articles, setArticles] = useState([]);
  let [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  let [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    await props.setProgress(25);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}${
      props.category ? "&category=" + props.category : ""
    }&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    await props.setProgress(50);
    let parsedData = await data.json();
    await props.setProgress(75);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    await props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${
      props.category
        ? capitalizeFirstLetter(props.category) + " | NewsWorld"
        : "NewsWorld"
    }`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handlePreviousClick = async () => {
  //   await setPage(page -  1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   await setPage(page +  1);
  //   updateNews();
  // };
  // };

  const fetchMoreNews = async () => {
    await setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}${
      props.category ? "&category=" + props.category : ""
    }&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <div className="container my-4">
        <h1 className="mb-3" style={{ marginTop: "90px" }}>
          {props.category
            ? `${capitalizeFirstLetter(props.category)}`
            : "Latest News"}
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreNews}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles &&
                articles.map((element, index) => {
                  return (
                    <div key={index} className="col-md-4">
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imageURL={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://www.tolerans.com/wp-content/uploads/2016/09/the-news-international-logo-ref.jpg"
                        }
                        newsURL={element.url}
                        author={element.author}
                        publisher={element.source.name}
                        publishedDate={element.publishedAt}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {loading && <Spinner />}
        {/* {!loading && (
          <div className="container d-flex justify-content-between mb-4">
          <button
              disabled={page <= 1}
              type="button"
              className="btn btn-primary"
              onClick={handlePreviousClick}
              >
              &larr; Previous
              </button>
              <button
              disabled={
                page + 1 >
                Math.ceil(totalResults / props.pageSize)
              }
              type="button"
              className="btn btn-primary"
              onClick={handleNextClick}
              >
              Next &rarr;
              </button>
              </div>
            )} */}
      </div>
    </>
  );
}

News.defaultProps = {
  pageSize: 18,
  country: "in",
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
};

export default News;
