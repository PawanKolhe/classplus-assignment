const STUDENTS_API_ENDPOINT = process.env.API_ENDPOINT;

const fetchStudentsData = async () => {
  const response = await fetch(STUDENTS_API_ENDPOINT);
  const data = await response.json();
  return data;
};

export { fetchStudentsData };
