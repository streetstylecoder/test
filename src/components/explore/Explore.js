import React, { useEffect, useState } from "react";
import "./explore.css";
import { Link } from "react-router-dom";
import PaperCard from "./PaperCard";
import { useSelector } from "react-redux";
import { PaperCardLoading } from "../paperCardLoading";
import Nopaperloading from "../assets/NoPapers-explore.png";
export const Explore = () => {
  const [category, setcategory] = useState("all");
  const [paperbycat, setpaperbycat] = useState([]);
  const papers = useSelector((state) => state.paper.papers.data);
  useEffect(() => {
    if (papers.length != 0) {
      setpaperbycat(papers);
    }
  }, [papers]);
  useEffect(() => {
    setpaperbycat([]);
    if (papers.length != 0) {
      if (category === "all") {
        setpaperbycat(papers);
      } else {
        let paper_byCategory = [];
        papers.forEach((paper) => {
          if (paper.category === category) {
            paper_byCategory.push(paper);
            setpaperbycat(paper_byCategory);
          }
        });
      }
    }
  }, [category]);
  return (
    <div className="explore container">
      <div className="explore_title">
        <h3>Explore</h3>
      </div>
      <div className="explore_categories">
        
       
       
       
      
       
      </div>
      {papers.length === 0 ? (
        <div className="explore_papers">
          {[1, 2, 3, 4].map((data, index) => {
            return <PaperCardLoading key={index} page={"/explore"} />;
          })}
        </div>
      ) : null}
      {papers.length != 0 ? (
        paperbycat.length != 0 ? (
          <div className="explore_papers">
            {paperbycat.map((paper, index) => {
              return (
                <Link to={`/paper/${paper.paperid}`} key={index}>
                  <PaperCard data={paper} />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="explore_nopapers">
            <img src={Nopaperloading} alt="" />
            <h3>No Papers</h3>
          </div>
        )
      ) : null}
    </div>
  );
};
