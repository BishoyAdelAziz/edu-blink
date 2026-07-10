import type { Metadata } from "next";
import JsonLd from "@/components/seo/json-ld";
import { courseDetailsSeo } from "@/constants/course-details";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pagePath = `/${courseDetailsSeo.slug}`;
const pageUrl = `${siteUrl}${pagePath}`;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description, keywords, instructor, category, language } =
    courseDetailsSeo;

  return {
    title,
    description,
    keywords: [...keywords],
    authors: [{ name: instructor }],
    creator: instructor,
    publisher: "edu-Blink",
    category,
    alternates: {
      canonical: pagePath,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: language,
      url: pageUrl,
      siteName: "edu-Blink",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@edublink",
    },
  };
}

const courseStructuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: courseDetailsSeo.title,
  description: courseDetailsSeo.description,
  url: pageUrl,
  inLanguage: courseDetailsSeo.language,
  provider: {
    "@type": "Organization",
    name: "edu-Blink",
    url: siteUrl,
  },
  educationalLevel: "Beginner",
  teaches: courseDetailsSeo.keywords.join(", "),
};

export default function CourseDetails2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <JsonLd id="course-structured-data" data={courseStructuredData} />      <header className="flex items-center justify-start gap-3 text-nowrap bg-primary p-5 md:p-10">
        <p className="cursor-pointer">Home</p> {">"}{" "}
        <p className="cursor-pointer">courses</p> {">"}{" "}
        <p className="cursor-pointer font-semibold">course details</p>
      </header>
      {children}
    </main>
  );
}
