import CourseVideoPlayer from "@/components/features/Course/course-video-player";
import CourseNav from "@/components/features/Course/course-nav";
export default function CourseDetails2Page() {
    return <>
    <section>
        <div className="bg-primary p-10">
            <h2 className="font-semibold tracking-widest text-lg">Starting SEO as your Home Based Business</h2>
        </div>
        <div className=" p-2 md:p-5 flex items-start justify-start gap-5 flex-col h-full pt-5 ">
        <CourseVideoPlayer />
        <CourseNav />
        </div>
        <div className="w-full"></div>
       
    </section>
    </>;
}