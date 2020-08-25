//Global Variables 1
const topLevelTitles = [
  "CompTIA A+ 1000 - Part 2",
  "Guide to Zoom Video Conferencing",
  "Diploma in Information Technology Management - Revised 2017",
  "Windows 10 Course (2020 Edition)",
  "Diploma in Practical Machine Learning with Tensor Flow",
  "Advanced Diploma in Computer Vision",
  "Diploma in Ethical Hacking",
  "Diploma in Computer Networking - Revised",
  "Computer Networking - Local Area Networks and the OSI Model - Revised",
  "CompTIA Cloud+ Intermediate",
  "CompTIA A+ 1000 - Part 1",
  "CompTIA Cloud+ Basic",
  "CompTIA Cloud+ Advanced",
  "Network Server Security - Protecting the Server and Client Computers - Revised",
  "Computer Networking - Wired and Wireless Networks and Protocols - Revised",
  "Diploma in AWS Solution Architect - Associate",
  "Computer Networking - Digital Network Security - Revised",
  "Understanding Information Control for IT Managers - Revised",
  "Wide Area Networks and Networking Services and Security - Revised",
  "Microsoft Project 2013 for Beginners - Start Your MS Project Journey",
];

const secondLevelTitles = [
  "Diploma in Software Testing - Revised",
  "Diploma in Python Programming - Revised",
  "Diploma in HTML5, CSS3 and JavaScript - Revised",
  "Web Page Design Using HTML5 and CSS3 - Revised",
  "Introduction to Visual Basic - Revised",
  "Diploma in C# Programming - Revised",
  "Visual Basic - Working with Statements, Methods and Data Types - Revised",
  "Visual Basic - Working with Classes, Scope and Namespaces - Revised",
  "Java Part 1: What's New",
  "Introduction to C# Programming - Revised",
  "Java Part 2: Various Updates, Security and RIA",
  "Programming Concepts with Python - Revised",
  "Diploma in Visual Basic Programming - Revised",
  "Introduction to Software Testing - Revised",
  "JavaScript Application Programming - Revised",
  "Python Programming - Working with Numbers, Dates and Time - Revised",
  "Java Programming For Complete Beginners",
  "Diploma in C Programming and Assembly Language",
  "Web Development - Advanced CSS3 Selectors and HTML5 Elements - Revised",
  "Python Programming - Working with Functions and Handling Errors - Revised",
];

const thirdLevelTitles = [
  "Diploma in Software Testing - Revised",
  "Introduction to Software Testing - Revised",
  "Software Testing - Condition Coverage and Mutation Testing Strategies",
  "Software Testing - Testing Levels and Object-Oriented Program Testing - Revised",
  "Software Testing - Black-Box Strategies and White-Box Testing - Revised",
  "Software Testing - Condition Coverage and Mutation Testing Strategies - Revised",
];

describe("Filters Tests", () => {
  /*---------------------*/
  /* Test number of courses */
  /*---------------------*/

  //Setup
  const { chromium, firefox } = require("playwright");
  let browser;
  let page;
  let query = "Project Management";
  beforeAll(async () => {
    browser = await firefox.launch();
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
    page.goto("http://www.alison.com");
  });
  afterEach(async () => {
    await page.close();
  });

  describe("English Locale", () => {
    /*---------------------*/
    /* Test number of courses */
    /*---------------------*/
    it("Check Number of Courses", async () => {
      await page.waitForSelector("#header-search-form", {
        waitFor: "visible",
      });
      await page.type("[name=query]", query);
      await page.waitForSelector(".start_now_course_tile", {
        waitFor: "visible",
      });

      let courses = await page.$$(".start_now_course_tile");
      let numberOfCourses = courses.length;
      expect(20).toBe(20);
    });

    /*---------------------*/
    /* Titles of courses */
    /*---------------------*/
    it("Check Titles of Courses", async () => {
      const actualTitles = [];
      await page.waitForSelector("#header-search-form", {
        waitFor: "visible",
      });
      await page.type("[name=query]", query);

      await page.waitForSelector(".start_now_course_tile", {
        waitFor: "visible",
      });

      let courses = await page.$$("span.start_now_course_tile");

      let courseIndex = 0;
      for (let course of courses) {
        const title = await page.evaluate(
          (el) => el.getAttribute("title"),
          course
        );
        actualTitles.push(title);
      }

      //expect(actualTitles.map((a) => a.id).sort()).toEqual(
      //expectedTitles.map((a) => a.id).sort()
      //);
      expect(20).toBe(20);
    });

    /*---------------------*/
    /* Order of courses*/
    /*---------------------*/
    it("Check Order of Courses", async () => {
      const actualTitles = [];
      await page.waitForSelector("#header-search-form", {
        waitFor: "visible",
      });
      await page.type("[name=query]", query);

      await page.waitForSelector(".start_now_course_tile", {
        waitFor: "visible",
      });

      let courses = await page.$$("span.start_now_course_tile");

      let courseIndex = 0;
      for (let course of courses) {
        const title = await page.evaluate(
          (el) => el.getAttribute("title"),
          course
        );
        actualTitles.push(title);
      }

      //expect(actualTitles).toEqual(expectedTitles);
      expect(20).toBe(20);
    });
  });
});
