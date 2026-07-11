"use client";

import { courseDetailsSeo } from "@/constants/course-details";
import CourseVideoPlayer from "@/components/features/Course/course-video-player";
import CourseNav from "@/components/features/Course/course-nav";
import { ChatIcon, CurriculumIcon, FAQIcon, LeaderBoardIcon } from "@/components/ui/icons";
import CourseMaterials from "@/components/features/Course/course-materials";
import CourseTopics from "@/components/features/Course/course-topics";
import Testomonials from "@/components/features/Course/testomonials";
import ExamModal from "@/components/features/Course/exam-modal";
import { ASK_QUESTION_MODAL_ID, EXAM_MODAL_ID, handleLeaderBoardModalOpen, LEADER_BOARD_MODAL_ID, openAskQuestionModal, openModal } from "@/utils/modal";
import LeaderBoardModal from "@/components/features/Course/leaderboard-modal";
import AskQuesModal from "@/components/features/Course/ask-ques-modal";

export default function CourseDetails2Page() {
  return (
    <section className="overflow-x-clip">
      <div className="bg-primary p-5 md:p-10">
        <h1 className="text-lg font-semibold tracking-widest">
          {courseDetailsSeo.title}
        </h1>
      </div>
      <div
        id="course-details-layout"
        className="group/layout mx-auto grid w-full grid-cols-1 gap-5 px-5 py-5 transition-all duration-700 ease-in-out motion-reduce:transition-none md:gap-8 md:px-10 lg:grid-cols-3"
      >
        <div className="video-slot order-1 sticky top-0 z-100 min-w-0 bg-white pt-5 md:static lg:col-span-2 group-data-[theater=true]/layout:static group-data-[theater=true]/layout:lg:col-span-3">
          <CourseVideoPlayer />
          <div className="mt-5">
            <CourseNav
              routes={[
                {
                  name: "Curriculum",
                  href: "#curriculum",
                  icon: <CurriculumIcon />,
                },
                {
                  name: "FAQ",
                  onClick: () => openAskQuestionModal(),
                  icon: <FAQIcon />,
                },
                {
                  name: "Leaderboard",
                  onClick: () => handleLeaderBoardModalOpen(),
                  icon: <LeaderBoardIcon />,
                },
                { name: "Chat", href: "#comments", icon: <ChatIcon /> },
              ]}
            />
          </div>
        </div>
        <div className="materials-slot order-2 min-w-0 lg:col-span-2 group-data-[theater=true]/layout:lg:col-span-3">
          <CourseMaterials />
        </div>
        <div className="topics-slot order-3 min-w-0 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-3 lg:self-start group-data-[theater=true]/layout:lg:col-span-3 group-data-[theater=true]/layout:lg:col-start-1 group-data-[theater=true]/layout:lg:row-span-1 group-data-[theater=true]/layout:lg:row-start-auto">
          <CourseTopics />
        </div>
        <div id="comments" className="testimonials-slot order-4 min-w-0 lg:col-span-2 group-data-[theater=true]/layout:lg:col-span-3">
          <Testomonials />
        </div>
      </div>

      <ExamModal id={EXAM_MODAL_ID} />
      <LeaderBoardModal  id={LEADER_BOARD_MODAL_ID} lessonName="Lesson 1" />
      <AskQuesModal id={ASK_QUESTION_MODAL_ID} />
    </section>
  );
}
