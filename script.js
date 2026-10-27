const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (glow && event.pointerType !== 'touch') {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
});
nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Buka navigasi');
  });
});

/* =========================================================
   MALIK PORTFOLIO
   SELECTED WORK INTERACTION
   ========================================================= */


/* ---------------------------------------------------------
   PROJECT FILTER
   --------------------------------------------------------- */

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".enhanced-project");

const projectVisible = document.getElementById("projectVisible");
const projectCount = document.getElementById("projectCount");

function updateProjectCounter() {

  const visibleProjects = [
    ...projects
  ].filter(project => !project.classList.contains("hidden"));

  if (projectVisible) {
    projectVisible.textContent =
      String(visibleProjects.length).padStart(2, "0");
  }

  if (projectCount) {
    projectCount.textContent =
      String(projects.length).padStart(2, "0");
  }
}


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const filter =
      button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");


    projects.forEach(project => {

      const category =
        project.dataset.category;

      if (
        filter === "all" ||
        category === filter
      ) {

        project.classList.remove("hidden");

        project.style.opacity = "0";

        requestAnimationFrame(() => {

          project.style.opacity = "1";

        });

      } else {

        project.classList.add("hidden");

      }

    });

    updateProjectCounter();

  });

});

updateProjectCounter();



/* ---------------------------------------------------------
   PROJECT 3D TILT
   --------------------------------------------------------- */

const interactiveProjects =
  document.querySelectorAll(".project-interactive");


interactiveProjects.forEach(project => {

  project.addEventListener("pointermove", event => {

    if (
      event.pointerType === "touch"
    ) return;


    const rect =
      project.getBoundingClientRect();


    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;


    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;


    const rotateY =
      ((x - centerX) / centerX) * 4;


    const rotateX =
      ((centerY - y) / centerY) * 4;


    project.style.transform =
      `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.008)
      `;


    project.style.setProperty(
      "--mouse-x",
      `${x}px`
    );


    project.style.setProperty(
      "--mouse-y",
      `${y}px`
    );


    /* depth movement */

    const innerElements =
      project.querySelectorAll(
        ".project-topline, .visual-corner"
      );


    innerElements.forEach(element => {

      element.style.transform =
        `
        translateZ(20px)
        translate(
          ${rotateY * .7}px,
          ${-rotateX * .5}px
        )
        `;

    });

  });


  project.addEventListener(
    "pointerleave",
    () => {

      project.style.transform =
        "";


      const innerElements =
        project.querySelectorAll(
          ".project-topline, .visual-corner"
        );


      innerElements.forEach(element => {

        element.style.transform =
          "";

      });

    }
  );

});



/* ---------------------------------------------------------
   CASE STUDY DATA
   --------------------------------------------------------- */

const caseStudies = {

  ziltrx: {

    number: "01 / CASE STUDY",

    category: "BRANDING",

    title: "ZILTRX",

    description:
      "Eksplorasi brand apparel lokal dengan pendekatan minimal, elegan, dan modern. ZILTRX dirancang untuk membawa karakter premium ke dalam pakaian sehari-hari tanpa terlihat berlebihan.",

    role:
      "Brand & Visual Designer",

    focus:
      "Brand Identity",

    approach:
      "Minimal / Elegant / Modern"

  },


  closr: {

    number: "02 / CASE STUDY",

    category: "CREATIVE",

    title: "CLOSR",

    description:
      "Eksplorasi identitas visual untuk bisnis thrift dengan pendekatan yang lebih berani, youthful, dan editorial. Fokusnya adalah membuat fashion second-hand terasa relevan dan punya karakter.",

    role:
      "Creative Designer",

    focus:
      "Creative Direction",

    approach:
      "Editorial / Youthful / Bold"

  },


  zenko: {

    number: "03 / CASE STUDY",

    category: "DIGITAL",

    title: "ZENKO",

    description:
      "Konsep pengalaman digital untuk Japanese kissaten yang menggabungkan atmosfer klasik Jepang dengan pendekatan web modern yang tenang, elegan, dan immersive.",

    role:
      "UI/UX & Visual Designer",

    focus:
      "Digital Experience",

    approach:
      "Japanese / Minimal / Immersive"

  }

};



/* ---------------------------------------------------------
   CASE STUDY MODAL
   --------------------------------------------------------- */

const caseModal =
  document.getElementById("caseModal");

const caseClose =
  document.getElementById("caseClose");

const caseTitle =
  document.getElementById("caseTitle");

const caseNumber =
  document.getElementById("caseNumber");

const caseCategory =
  document.getElementById("caseCategory");

const caseDescription =
  document.getElementById("caseDescription");

const caseRole =
  document.getElementById("caseRole");

const caseFocus =
  document.getElementById("caseFocus");

const caseApproach =
  document.getElementById("caseApproach");



function openCaseStudy(projectName) {

  const data =
    caseStudies[projectName];

  if (!data || !caseModal) return;


  caseNumber.textContent =
    data.number;

  caseCategory.textContent =
    data.category;

  caseTitle.textContent =
    data.title;

  caseDescription.textContent =
    data.description;

  caseRole.textContent =
    data.role;

  caseFocus.textContent =
    data.focus;

  caseApproach.textContent =
    data.approach;


  caseModal.classList.add("active");

  caseModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}



function closeCaseStudy() {

  if (!caseModal) return;


  caseModal.classList.remove("active");

  caseModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}



document
  .querySelectorAll(".project-view")
  .forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        const project =
          button.closest(".enhanced-project");

        if (!project) return;

        openCaseStudy(
          project.dataset.project
        );

      }
    );

  });



caseClose?.addEventListener(
  "click",
  closeCaseStudy
);



document
  .querySelector(".case-modal-backdrop")
  ?.addEventListener(
    "click",
    closeCaseStudy
  );



document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeCaseStudy();

    }

  }
);



/* ---------------------------------------------------------
   MAGNETIC PROJECT VIEW BUTTON
   --------------------------------------------------------- */

document
  .querySelectorAll(".project-view")
  .forEach(button => {

    button.addEventListener(
      "pointermove",
      event => {

        if (
          event.pointerType === "touch"
        ) return;


        const rect =
          button.getBoundingClientRect();


        const x =
          event.clientX - rect.left -
          rect.width / 2;


        const y =
          event.clientY - rect.top -
          rect.height / 2;


        button.style.transform =
          `
          translate(
            ${x * .12}px,
            ${y * .12}px
          )
          `;

      }
    );


    button.addEventListener(
      "pointerleave",
      () => {

        button.style.transform =
          "";

      }
    );

  });