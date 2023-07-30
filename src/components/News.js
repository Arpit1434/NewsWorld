import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  static defaultProps = {
    pageSize: 18,
    country: "in",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${
      this.props.category
        ? this.capitalizeFirstLetter(this.props.category) + " | NewsWorld"
        : "NewsWorld"
    }`;
  }

  updateNews = async () => {
    await this.props.setProgress(25);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }${this.props.category ? "&category=" + this.props.category : ""}&apiKey=${
      this.props.apiKey
    }&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    await this.props.setProgress(50);
    let parsedData = await data.json();
    await this.props.setProgress(75);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    await this.props.setProgress(100);
  };

  componentDidMount = () => {
    this.updateNews();
  };

  // handlePreviousClick = () => {
  //   this.setState({ page: this.state.page - 1 }, () => {
  //     this.updateNews();
  //   });
  // };

  // handleNextClick = () => {
  //   this.setState({ page: this.state.page + 1 }, () => {
  //     this.updateNews();
  //   });
  // };

  fetchMoreNews = () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }${
        this.props.category ? "&category=" + this.props.category : ""
      }&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${
        this.props.pageSize
      }`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      });
    });
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <>
        <div className="container my-4">
          <h1 className="mb-3">
            {this.props.category
              ? `${this.capitalizeFirstLetter(this.props.category)}`
              : "Latest News"}
          </h1>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreNews}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles &&
                  this.state.articles.map((element, index) => {
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
          {this.state.loading && <Spinner />}
          {/* {!this.state.loading && (
          <div className="container d-flex justify-content-between mb-4">
          <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-primary"
              onClick={this.handlePreviousClick}
              >
              &larr; Previous
              </button>
              <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-primary"
              onClick={this.handleNextClick}
              >
              Next &rarr;
              </button>
              </div>
            )} */}
        </div>
      </>
    );
  }
}

export default News;
