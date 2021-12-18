import React, { useEffect , useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


// export class News extends Component {
  const News = (props) =>{
    

  // static defaultProps = {
  //   country: "in",
  //   pageSize: 8,
  //   category: "general",       :- they are at the last
  // };
  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  // };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // constructor(props) {
  //   super(props);
  //   console.log("Hello i am a constructor");
  //   // this.state = {
  //   //   articles: [],
  //   //   loading: false,
  //   //   page: 1,
  //   // };
  //   // document.title = `${this.capitalizeFirstLetter(
  //   //   props.category
  //   // )} - NewsMonkey`;
  // }
  const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const[totalResults,setTotalResults] = useState(0)
   

  // async updateNews(pageNo) {
    const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
     
    // });
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  // async componentDidMount() {
  //   this.updateNews();
  // }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  },[])

  // const handlePrevClick = async () => {
  // //   console.log("prev");
  // //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=42711576fc2e44cdbf6e53e8b61ab0e9&page=${
  // //   //   this.state.page - 1
  // //   // }&pageSize=${props.pageSize}`;
  // //   // this.setState({ loading: true });
  // //   // let data = await fetch(url);
  // //   // let parsedData = await data.json();
  // //   // console.log(parsedData);
  // //   // this.setState({
  // //   //   page: this.state.page - 1,
  // //   //   articles: parsedData.articles,
  // //   //   loading: false,
  // //   // });
  //   // this.setState({ page: this.state.page - 1 });
  //   setPage(page-1)
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  // //   console.log("Next");
  // //   // if (
  // //   //   !(this.state.page + 1 >
  // //   //   Math.ceil(this.state.totalResults / props.pageSize)
  // //   // )) {
  // //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=42711576fc2e44cdbf6e53e8b61ab0e9&page=${
  // //   //     this.state.page + 1
  // //   //   }&pageSize=${props.pageSize}`;
  // //   //   this.setState({loading: true});
  // //   //   let data = await fetch(url);
  // //   //   let parsedData = await data.json();
  // //   //   console.log(parsedData);
  // //   //   this.setState({
  // //   //     page: this.state.page + 1,
  // //   //     articles: parsedData.articles,
  // //   //     loading:false
  // //   //   });
  // //   // }
  //   // this.setState({ page: this.state.page + 1 });
  //    setPage(page + 1);
  //   updateNews();
  // };
  const fetchMoreData = async() => {
    // this.setState({ page: this.state.page + 1 });
     setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    
    // })
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
  // render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' , marginTop: '90px'}}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}  Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row">
        {articles.map((element) => {
          return (
            <div className="col-md-4" key={element.url}>
            <NewsItem
            title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  // }
}
  News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

export default News
