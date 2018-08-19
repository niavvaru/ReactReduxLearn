import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';

import { SearchBar } from './components/searchBar.js';
import VideoDetail from './components/videoDetail';
import VideoList from './components/videoList.js';

const API_KEY = 'AIzaSyAfCxfMHv5drHYwbPtZo1-ZH9rhKabnCK8';
const INITIAL_SEARCH_TERM = 'React application development';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch(INITIAL_SEARCH_TERM);
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
        
        return (
            <div>
                <SearchBar term={INITIAL_SEARCH_TERM} onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDom.render(<App />, document.querySelector('.container'));