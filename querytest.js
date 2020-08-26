//Global Variables 1
const englishQuery = [
  "Diploma - Project Management in Practice",
  "Project Management Professional (PMP)® Exam Prep",
  "Introduction to Project Management",
  "Project Management in Practice - Monitoring, Controlling and Change Management",
  "Diploma in Project Management - Revised 2017",
  "Diploma in Modern Project Management - Revised",
  "Certified Associate in Project Management (CAPM)® Exam Prep",
  "Project Management in Practice - From Principles and Concepts to Project Kick-Off",
  "Fundamentals of Project Management - Revised 2017",
  "Project Management in Practice - Planning, Scheduling and Resource Management",
  "Introduction to Modern Project Management Theory and Practice - Revised",
  "Modern Project Management - Quality, Risk, Procurement and Project Closeout - Revised",
  "Modern Project Management - Working with Clients and Project Teams - Revised",
  "Production and Operation Management; Project Management",
  "Modern Project Management - Managing the Start-up, Scheduling and Budgeting - Revised",
  "Microsoft Project 2013 Advanced - Supercharge Your MS Project Journey",
  "Agile Essentials: A Practical Guide to the Agile Process",
  "Microsoft Project 2013 for Beginners - Start Your MS Project Journey",
  "DevOps - Application Lifecycle Management - Revised",
  "Professionalism in the Office",
];

const spanishQuery = [
  "Fundamentos de gestión del proyecto revisado de 2017",
  "Gestión del rendimiento y planificación estratégica",
  "Diploma en Gestión Estratégica del Rendimiento",
  "Gestión del rendimiento: revisión y análisis",
  "Gestión de proyectos modernos-Calidad, Riesgo, Adquisición y Closeout de proyecto-Revisado",
  "Gestión de proyectos modernos-Gestión de la creación, la planificación y la presupuestación-Revisión",
  "Gestión de proyectos modernos-Trabajar con Clientes y Equipos de Proyecto-Revisado",
  "Gestión de proyectos en práctica-Planificación, planificación y gestión de recursos",
  "Maths de proyecto de certificado-Nivel superior-Revisado",
  "Gestión de proyectos en práctica-Supervisión, control y gestión de cambios",
  "Diplomado avanzado en ciencia y tecnología del suelo",
  "Diploma en Gestión del Estrés-Revisado",
  "Diploma en gestión del medio ambiente",
  "Evaluación de rendimiento y PMS en organizaciones indias",
  "Introducción a la gestión del estrés-Revisado",
  "Diploma en Gestión de Proyectos-revisado 2017",
  "Microsoft Project 2013 para principiantes-Inicie el proyecto MS Project Journey",
  "Maths de proyecto de certificado junior-Nivel superior-Revisado",
  "Diploma en Business Management & Entrepreneurship-revisado 2017",
  "Desarrollo de rasgos clave y estrategias de supervivencia",
];

describe("Query Tests - English Locale", () => {
  jest.setTimeout(30000);
  /*---------------------*/
  /* Setup */
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

  /*---------------------*/
  /* Test number of courses */
  /*---------------------*/
  it("Check Number of Courses", async () => {
    await page.waitForSelector("#header-search-form", {
      waitFor: "visible",
    });
    await page.type("[name=query]", query);
    await page.keyboard.press("Enter", { delay: 2000 });
    await page.waitForSelector(".start_now_course_tile", {
      waitFor: "visible",
    });

    let courses = await page.$$(".start_now_course_tile");
    let numberOfCourses = 0;
    for (let x of courses) {
      numberOfCourses++;
    }
    expect(numberOfCourses).toBe(20);
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
    await page.keyboard.press("Enter", { delay: 2000 });

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
      englishQuery.map((a) => a.id).sort()
    );
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
    await page.keyboard.press("Enter", { delay: 2000 });

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

    expect(actualTitles).toEqual(englishQuery);
  });
});

describe("Query Tests - Spanish Locale", () => {
  jest.setTimeout(30000);
  /*---------------------*/
  /* Setup */
  /*---------------------*/

  //Setup
  const { chromium, firefox } = require("playwright");
  let browser;
  let page;
  let query = "gestión del proyecto";
  beforeAll(async () => {
    browser = await firefox.launch();
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
    page.goto("https://alison.com/es/cursos");
  });
  afterEach(async () => {
    await page.close();
  });

  /*---------------------*/
  /* Test number of courses */
  /*---------------------*/
  it("Check Number of Courses", async () => {
    await page.waitForSelector("#header-search-form", {
      waitFor: "visible",
    });
    await page.type("[name=query]", query);
    await page.keyboard.press("Enter", { delay: 2000 });
    await page.waitForSelector(".start_now_course_tile", {
      waitFor: "visible",
    });

    let courses = await page.$$(".start_now_course_tile");
    let numberOfCourses = 0;
    for (let x of courses) {
      numberOfCourses++;
    }
    expect(numberOfCourses).toBe(20);
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
    await page.keyboard.press("Enter", { delay: 2000 });

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
      spanishQuery.map((a) => a.id).sort()
    );
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
    await page.keyboard.press("Enter", { delay: 2000 });

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

    expect(actualTitles).toEqual(spanishQuery);
  });
});
