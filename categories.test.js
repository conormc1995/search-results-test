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

describe("Categories - Titles", () => {
  //Setup
  const { chromium, firefox } = require("playwright");
  let browser;
  let page;
  beforeAll(async () => {
    browser = await firefox.launch();
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  //Tests
  it("Top Level Categories - Check Titles", async () => {
    const actualTitles = [];

    await page.goto("https://alison.com/courses/it");
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
    console.log(actualTitles);
    expect(actualTitles.map((a) => a.id).sort()).toEqual(
      topLevelTitles.map((a) => a.id).sort()
    );
  });

  it("Second Level Categories - Check Titles", async () => {
    const actualTitles = [];
    await page.goto("https://alison.com/courses/software-development");
    await page.waitForSelector(".start_now_course_tile", {
      waitFor: "visible",
    });
    let courses = await page.$$("span.start_now_course_tile");

    for (let course of courses) {
      const title = await page.evaluate(
        (el) => el.getAttribute("title"),
        course
      );
      actualTitles.push(title);
    }
    console.log(actualTitles);
    expect(secondLevelTitles.map((a) => a.id).sort()).toEqual(
      actualTitles.map((a) => a.id).sort()
    );
  });

  it("Third Level Categories - Check Titles", async () => {
    const actualTitles = [];
    await page.goto("https://alison.com/courses/software-testing");
    await page.waitForSelector(".start_now_course_tile", {
      waitFor: "visible",
    });
    let courses = await page.$$("span.start_now_course_tile");

    for (let course of courses) {
      const title = await page.evaluate(
        (el) => el.getAttribute("title"),
        course
      );
      actualTitles.push(title);
    }
    console.log(actualTitles);
    expect(thirdLevelTitles.map((a) => a.id).sort()).toEqual(
      actualTitles.map((a) => a.id).sort()
    );
  });
});

describe("Categories - Course Order", () => {
  it("Top Level Categories - Check Titles", async () => {
    const actualTitles = [];

    await page.goto("https://alison.com/courses/it");
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
    console.log(actualTitles);
    expect(actualTitles).toEqual(topLevelTitles);
  });

  it("Second Level Categories - Course Order", async () => {
    const actualTitles = [];
    await page.goto("https://alison.com/courses/software-development");
    await page.waitForSelector(".start_now_course_tile", {
      waitFor: "visible",
    });
    let courses = await page.$$("span.start_now_course_tile");

    for (let course of courses) {
      const title = await page.evaluate(
        (el) => el.getAttribute("title"),
        course
      );
      actualTitles.push(title);
    }
    console.log(actualTitles);
    expect(secondLevelTitles).toEqual(actualTitles);
  });

  it("Third Level Categories - Course Order", async () => {
    const actualTitles = [];
    await page.goto("https://alison.com/courses/software-testing");
    await page.waitForSelector(".start_now_course_tile", {
      waitFor: "visible",
    });
    let courses = await page.$$("span.start_now_course_tile");

    for (let course of courses) {
      const title = await page.evaluate(
        (el) => el.getAttribute("title"),
        course
      );
      actualTitles.push(title);
    }
    console.log(actualTitles);
    expect(thirdLevelTitles).toEqual(actualTitles);
  });
});
