// shortCourseType.ts
export type HighlightType = {
  label: string;
  value: string;
  desc: string;
};

export type shortCoursesType = {
  id: number;
  bg: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  scholarship?: number;
  highlights?: HighlightType[];   // 👈 new
};
