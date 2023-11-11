import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchBySearch } from "api";
import { GlobalStyle } from "GlobalStyle";

export class App extends Component {
  state = { 
    images: [],
    query: "",
    page: 1,
    isLoading: false,
    error: false,
  } 

 
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      
      try {
        this.setState({ isLoading: true });
        const initialImages = await fetchBySearch(this.state.query, this.state.page);
        this.setState({ images: initialImages });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = (newQuery) => {
    this.setState({
      query: newQuery,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() { 
    return (
      <>
        <Searchbar onSubmit={ this.handleSubmit} />
        {/* <ImageGallery items={this.images } />
        <Button onClick={ this.handleLoadMore} /> */}
        <GlobalStyle />
      </>
    );
  }
}
 