import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
      pageSize: 9,
      apiKey: process.env.REACT_APP_API_KEY,
    };
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <>
        <Router>
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  key="latest"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category=""
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  key="business"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/general"
              element={
                <News
                  key="general"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  key="health"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  key="science"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  key="sports"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  key="technology"
                  setProgress={this.setProgress}
                  apiKey={this.state.apiKey}
                  pageSize={this.state.pageSize}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}
