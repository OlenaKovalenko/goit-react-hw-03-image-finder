import React, { Component } from "react"; 
import { fetchBySearch } from "api";
import { Circles } from "react-loader-spinner";

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = { 
    images: [],
    query: "",
    page: 1,
    isLoading: false,
    loadMore: false,
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
      // query: `${Date.now()}/${newQuery}`,
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
    const { query, page } = this.state;

    try {
      this.setState({ isLoading: true });
      const imageData = await fetchBySearch({ query, page });

      if (imageData !== null) {

        this.setState(prevState => ({
          images: [...prevState.images, ...imageData.hits],
          loadMore: page < Math.ceil(imageData.totalHits /12),
        }));
      }

    } catch (error) {
      this.setState({ error: true });

    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() { 
    const { images, isLoading, loadMore } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {isLoading && (
          <Circles
            height="320"
            width="320"
            color="#303f9f"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}

        <ImageGallery items={images} isLoading={isLoading} />
        {images.length > 0 && loadMore && (<Button onClick={this.handleLoadMore} />)}
      </>
    );
  }
}
 