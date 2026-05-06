import data from "../../ayush-resume.json";

export const resume = data;

export const basics = data.basics;
export const work = data.work;
export const education = data.education;
export const skills = data.skills.filter(
  (s) => s.keywords && s.keywords.some((k) => k.trim() !== "")
);
export const projects = data.projects;
export const awards = data.awards;
