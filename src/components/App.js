import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../api/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

export default class App extends React.Component {
    state = { videos: [] , selectedVideo: null };

    componentDidMount() {
        this.onTermSubmit('buildings');
    }
    
    onTermSubmit = async term => {
        const response = await youtube.get('/search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyAFSGGO3xsUjVi6hz3lDtPuHJ3AZw8UP0A',
                q: term
            }
        });
        // Making selectedVideo property of state as 1st element of searched video because intially page had 2 problems,
        // i) Until anything searched Loading... text was coming 
        // ii) Assume 1 video is playing after we have searched some text like "buildings" then suddenly we searched some other text, 
        // new videos update in videolist but video player will be playing old video only
        
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    };

    onVideoSelect = video => {
        this.setState({ selectedVideo: video });
    }

    render() {
        return (
            // Providing "ui container" CSS class to fit properly the SearchBar
            <div className = "ui container">
                <SearchBar onFormSubmit = {this.onTermSubmit} />
                {/* Added grid to show videos beside like video player on left with description below and video list right side */}
                <div className = "ui grid">
                    <div className = "ui row">
                        <div className = "eleven wide column">
                            <VideoDetail video = {this.state.selectedVideo} />
                        </div>
                        <div className = "five wide column">
                            <VideoList videos = {this.state.videos} onVideoSelect = {this.onVideoSelect} />
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}