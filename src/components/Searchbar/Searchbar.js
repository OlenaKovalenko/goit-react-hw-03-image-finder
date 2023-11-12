import { Component } from "react";

export class Searchbar extends Component {
   
    state = {
        query: '',
    }
    
    handleChange = (e) => this.setState({ query: e.target.value });

    handleSubmit = (e) => {
        e.preventDefault();
        const { query } = this.state;

        if (query.trim() === '') {
            alert('Please fill out the search field!');
            return;
        }

        this.props.onSubmit(query);
    }

    render() { 
        const { query } = this.state;

        return (
        <header className="searchbar">
            <form className="form" onSubmit={onSubmit}>
                <button type="submit" className="button">
                    <span className="button-label">Search</span>
                </button>

                <input
                        className="input"
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={ this.handleChange}
                />
            </form>
        </header>
    )
    }
}


