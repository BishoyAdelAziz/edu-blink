import { ProgressBar } from "@/components/ui/progress-bar";
import { CourseTopics as courseTopicsData } from "@/constants";
import TopicsCard from "./topics-card";

export default function CourseTopics(){
    return (
        <>
        <div id="course-topics" className="mx-2 flex min-w-0 w-full flex-1 flex-col items-start justify-start gap-[1vh] pt-5">
            <h5 className="font-semibold tracking-widest text-md">Topics for This Course</h5>
            <ProgressBar value={35} />
            <div className="flex w-full flex-col gap-4">
              {courseTopicsData.map((section) => (
                <TopicsCard key={section.id} section={section} />
              ))}
            </div>
        </div>
        </>
    )
}