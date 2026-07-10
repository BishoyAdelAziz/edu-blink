import { create } from "zustand";

export interface CourseComment {
  name: string;
  date: number;
  comment: string;
}

interface CommentsState {
  comments: CourseComment[];
  currentUserName: string;
  addComment: (comment: string) => void;
}

const INITIAL_COMMENTS: CourseComment[] = [
  {
    name: "Student Name",
    date: new Date("2021-10-15").getTime(),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio a cum sit, sequi recusandae vel repellendus assumenda possimus dignissimos, debitis ratione eaque totam. Suscipit, ut. Doloremque magni ab autem quam.",
  },
  {
    name: "Student Name",
    date: new Date("2021-10-15").getTime(),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio a cum sit, sequi recusandae vel repellendus assumenda possimus dignissimos, debitis ratione eaque totam. Suscipit, ut. Doloremque magni ab autem quam.",
  },
  {
    name: "Student Name",
    date: new Date("2021-10-15").getTime(),
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio a cum sit, sequi recusandae vel repellendus assumenda possimus dignissimos, debitis ratione eaque totam. Suscipit, ut. Doloremque magni ab autem quam.",
  },
];

export const useCommentsStore = create<CommentsState>((set) => ({
  comments: INITIAL_COMMENTS,
  currentUserName: "Bishoy Adel",
  addComment: (comment) =>
    set((state) => ({
      comments: [
        ...state.comments,
        {
          name: state.currentUserName,
          date: Date.now(),
          comment,
        },
      ],
    })),
}));

