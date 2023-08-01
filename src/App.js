import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  let [progress, setProgress] = useState(0);
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <>
      <Router>
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <News
                key="latest"
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
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
