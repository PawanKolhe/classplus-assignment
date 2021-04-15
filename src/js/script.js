import { fetchStudentsData } from './api';

const classes = {};
const sidebarElement = document.getElementById('sidebar');
let isSidebarOpen = false;

const nameValueElement = document.getElementById('nameValue');
const ageValueElement = document.getElementById('ageValue');
const genderValueElement = document.getElementById('genderValue');
const sportsValueElement = document.getElementById('sportsValue');

const toggleSidebar = (expandSidebar) => {
  if (expandSidebar) {
    sidebarElement.style.right = '0px';
  } else {
    sidebarElement.style.right = '-350px';
  }
  isSidebarOpen = !isSidebarOpen;
};

document.getElementById('sidebarCloseButton').addEventListener('click', () => {
  toggleSidebar(false);
});

const createTooltip = (student) => {
  const tooltipElement = document.createElement('div');
  tooltipElement.className = 'tooltip';
  tooltipElement.innerHTML = `
    <div class="tooltip__item">
      <span class="tooltip__label">Name:</span>
      <span class="tooltip__value">${student.name}</span>
    </div>
    <div class="tooltip__item">
      <span class="tooltip__label">Age:</span>
      <span class="tooltip__value">${student.age}</span>
    </div>
    <div class="tooltip__item">
      <span class="tooltip__label">Gender:</span>
      <span class="tooltip__value">${student.gender}</span>
    </div>
    <div class="tooltip__item">
      <span class="tooltip__label">Sports:</span>
      <span class="tooltip__value">${student.sports.join(', ')}</span>
    </div>
  `;
  return tooltipElement;
};

const renderStudent = (student) => {
  const studentButton = document.createElement('button');
  studentButton.className = 'student';
  studentButton.textContent = student.name;
  studentButton.addEventListener('click', () => {
    nameValueElement.innerText = student.name;
    ageValueElement.innerText = student.age;
    genderValueElement.innerText = student.gender;
    sportsValueElement.innerText = student.sports.join(', ');
    toggleSidebar(true);
  });

  const tooltipElement = createTooltip(student);
  studentButton.insertAdjacentElement('beforeend', tooltipElement);

  return studentButton;
};

const renderSection = (singleClass, section) => {
  const sectionLi = document.createElement('li');
  sectionLi.className = 'section';
  sectionLi.textContent = `Section ${section}`;
  const studentsDiv = document.createElement('div');
  studentsDiv.className = 'students';

  classes[singleClass][section].forEach((student) => {
    const studentHTML = renderStudent(student);
    studentsDiv.insertAdjacentElement('beforeend', studentHTML);
  });
  sectionLi.insertAdjacentElement('beforeend', studentsDiv);
  return sectionLi;
};

const renderClass = (singleClass) => {
  const classLi = document.createElement('li');
  classLi.className = 'class';
  classLi.textContent = `Class ${singleClass}`;
  const sectionsUl = document.createElement('ul');
  sectionsUl.className = 'sections';

  const sections = Object.keys(classes[singleClass]);
  sections.forEach((section) => {
    const sectionHTML = renderSection(singleClass, section);
    sectionsUl.insertAdjacentElement('beforeend', sectionHTML);
  });
  classLi.insertAdjacentElement('beforeend', sectionsUl);
  return classLi;
};

const renderClasses = () => {
  const classesNode = document.getElementById('classrooms');

  const classesUl = document.createElement('ul');
  classesUl.className = 'classes';

  Object.keys(classes).forEach((singleClass) => {
    const classHTML = renderClass(singleClass);
    classesUl.insertAdjacentElement('beforeend', classHTML);
  });

  classesNode.appendChild(classesUl);
};

const main = async () => {
  const studentsData = await fetchStudentsData();

  studentsData.forEach((student) => {
    if (!(student.class in classes)) {
      classes[student.class] = {};
    }
    if (!(student.section in classes[student.class])) {
      classes[student.class][student.section] = [];
    }
    classes[student.class][student.section].push(student);
  });

  renderClasses();
};

main();
