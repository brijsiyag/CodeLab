import React from "react";

const AboutUs = () => {
  const style = {
    mainHeading: {
      textAlign: "center",
      color: "gray",
      margin: "30px auto",
      fontSize: "2rem",
    },
    secondaryHeading: {
      textAlign: "center",
      color: "gray",
      margin: "30px auto",
      fontSize: "1.5rem",
    },
    mainContent: {
      fontSize: "1.3rem",
    },
    secondaryContent: {
      fontSize: "1.3rem",
    },
    separateDiv: {
      margin: "15px auto",
    },
  };
  return (
    <div>
      <h1 style={style.mainHeading}>About Us</h1>
      <div style={style.mainContent}>
        <div style={style.separateDiv}>
          CodeLab is an initiative of the students of Pandit Dwarka Prasad
          Mishra Indian Institute of Information Technology Design and
          Manufacturing, Jabalpur.
        </div>
        <div style={style.separateDiv}>
          This platform is developed to make students' experience of coding
          enrich and joyful. CodeLab promotes a user-friendly interface for the
          practice of all sorts of coding questions.
        </div>
        <div style={style.separateDiv}>
          CodeLab is created to help budding programmers make it big in the
          world of Algorithms, Data Structures and all that Programming
          includes. It supports over 17+ languages for programming. So, with
          CodeLab language is not a barrier.
        </div>
        <div style={style.separateDiv}>
          A premium feature of CodeLab is the availability of canvas in the IDE.
          You can build your logic for the questions on the canvas and code it
          on our very own IDE. You can download your code super easily with a
          single click.
        </div>
      </div>
      <h2 style={style.secondaryHeading}>How We Were Able To Do It</h2>
      <div style={style.secondaryContent}>
        <div style={style.separateDiv}>
          This project was built for the final Lab Project of our course
          Database Management System. All the knowledge we gathered from the
          lecture of Prof. Pritee Khanna we put into this project. Apart from
          the support and guidance of our head TA Amit Bhati and our project
          guide Shubhangi Chaturvedi this was easier to pull off.
        </div>
        <div style={style.separateDiv}>
          As a team we learned and grew a lot from this project. Our team
          includes Brijmohan Siyag, Devendra Kumar and Sanu Gautam. Our
          collaborative effort led us to this beautiful project.
        </div>
      </div>
      <p style={{ textAlign: "center" }}>©CodeLab</p>
    </div>
  );
};

export default AboutUs;
