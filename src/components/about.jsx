import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Team</h2>
              <h3>{props.data ? props.data.name : "loading..."}</h3>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <br />
              <h3>{props.data ? props.data.name2 : "loading..."}</h3>
              <p>{props.data ? props.data.paragraph2 : "loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
