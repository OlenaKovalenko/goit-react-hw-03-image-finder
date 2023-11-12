import React, { Component } from "react"; 
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchBySearch } from "api";
import { GlobalStyle } from "GlobalStyle";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = { 
    images: [],
    query: "",
    page: 1,
    isLoading: false,
    error: false,
  } 


  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }



  handleFormSubmit = newQuery => {
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

  fetchImages = async () => {
    const { query, page, images } = this.state;

    try {
      this.setState({ isLoading: true });
      const imageData = await fetchBySearch({ query, page });

      if (imageData !== null) {
        const newImages = [...images, ...imageData.hits];

        this.setState({ images: newImages });
      }

    } catch (error) {
      this.setState({ error: true });

    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() { 
    const { images } = this.state;

    return (
      <>
        <Searchbar onSubmit={ this.handleFormSubmit} />
        <ImageGallery items={images } />
        <Button onClick={ this.handleLoadMore} />
        {/* <GlobalStyle /> */}
      </>
    );
  }
}
 