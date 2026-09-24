  import React, { Component } from "react";
  import NewsItem from "./NewsItem";
  import Spinner from "./Spinner";
  import PropTypes from "prop-types";
  import InfiniteScroll from 'react-infinite-scroll-component';

  export class News extends Component {
    static defaultProps = {
      country: "in",
      pageSize: 8,
      category: "general",
      
    };
    static propTypes = {
      // Optional boolean
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    };

    // Optional: You can also define defaultProps here
    capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
      super(props);
      this.state = {
        articles: [],
        page: 1,
        loading: true,
        totalResults: 0,
      };
      document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
    }
    async Updatenews() {
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/everything?q=${this.props.country}&${this.props.category}&sortBy=publishedAt&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      this.setState({ loading: true });
      this.props.setProgress(30);

      let data = await fetch(url);
      this.props.setProgress(50);

      let parseData = await data.json();
      this.props.setProgress(70);

      this.setState({
        articles: parseData.articles || [],
        totalResults: parseData.totalResults || 0,
        loading: false,
      });

      this.props.setProgress(100);
    }
    async componentDidMount() {
      // let url = `https://newsapi.org/v2/everything?q=${this.props.country}&${this.props.category}&sortBy=publishedAt&apiKey=609369246fec417ba323f4c21ea1dda3&page=1&pageSize=${this.props.pageSize}`;

      // this.setState({ loading: true });
      // let data = await fetch(url);
      // let parseData = await data.json();

      // this.setState({
      //   articles: parseData.articles || [],
      //   totalResults: parseData.totalResults || 0,
      //   loading: false
      // });
      
      this.Updatenews();
    }

    // handlePvsClick = async () => {
    //   // let url = `https://newsapi.org/v2/everything?q=${this.props.country}&${this.props.category}&sortBy=publishedAt&apiKey=609369246fec417ba323f4c21ea1dda3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

    //   // this.setState({ loading: true });
    //   // let data = await fetch(url);
    //   // let parseData = await data.json();

    //   // this.setState({
    //   //   page: this.state.page - 1,
    //   //   articles: parseData.articles || [],
    //   //   loading: false
    //   // });
    //   this.setState({ page: this.state - 1 });
    //   this.Updatenews();
    // };

    // handleNextClick = async () => {
    //   // if (!this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
    //   //   let url = `https://newsapi.org/v2/everything?q=${this.props.country}&${this.props.category}&sortBy=publishedAt&apiKey=609369246fec417ba323f4c21ea1dda3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    //   //   this.setState({ loading: true });
    //   //   let data = await fetch(url);
    //   //   let parseData = await data.json();

    //   //   this.setState({
    //   //     page: this.state.page + 1,
    //   //     articles: parseData.articles || [],
    //   //     loading: false
    //   //   });
    //   // }
    //   this.Updatenews();
    //   this.setState({ page: this.state.page + 1 });
    // };
    fetchMoreData = async () => {
      
      const nextPage = this.state.page + 1;
      const url = `https://newsapi.org/v2/everything?q=${this.props.country}&${this.props.category}&sortBy=publishedAt&apiKey=609369246fec417ba323f4c21ea1dda3&page=${this.state.page}&pageSize=${this.props.pageSize}`;


      let data = await fetch(url);
      let parseData = await data.json();

      this.setState({
        page: nextPage,
        // Naye articles ko purane articles me concat (append) karna hai
        articles: this.state.articles.concat(parseData.articles || []),
        totalResults: parseData.totalResults || 0,
      });
    };

    render() {
      return (
        <div>
          <div className=" my-3">
            <h2 className="text-center my-4">NewsMonkey Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>

            {/* {this.state.loading && <Spinner />} */}
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner></Spinner>}
              style={{ overflow: 'hidden' }}
            >
              <div className="container">


                <div className="row">
                  {
                    this.state.articles.map((element) => {
                      return (
                        <div
                          className="col-md-4 my-3 d-flex align-items-stretch"
                          key={element.url}
                        >
                          <NewsItem
                            title={
                              element.title ? element.title.slice(0, 40) : "No Title"
                            }
                            description={
                              element.description
                                ? element.description.slice(0, 70)
                                : "No Description Available"
                            }
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source.id}
                          />
                        </div>
                      );
                    })}
                  {/* {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div
                    className="col-md-4 my-3 d-flex align-items-stretch"
                    key={element.url}
                  >
                    <NewsItem
                      title={
                        element.title ? element.title.slice(0, 40) : "No Title"
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 70)
                          : "No Description Available"
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.id}
                    />
                  </div>
                );
              })} */}
                </div>
              </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between my-4">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePvsClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div> */}
          </div>
        </div>
      );
    }
  }

  export default News;
