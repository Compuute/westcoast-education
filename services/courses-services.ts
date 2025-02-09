import { ICourse } from "../src/models/ICourse.js";
import { HttpClient } from "../src/utilities/HttpClient.js";

export const listAllCourses = async (): Promise<ICourse[]> => {
  const http = new HttpClient("http://localhost:3000/courses");
  const response = await http.Get();
  return response;
};

export const getCourse = async (itemNumber: string): Promise<ICourse> => {
  const http = new HttpClient(
    `http://localhost:3000/courses?itemNumber=${itemNumber}`
  );
  const response = await http.Get();
  return response;
};
