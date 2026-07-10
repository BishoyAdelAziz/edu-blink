export interface TopicSection {
  id: number;
  title: string;
  quizs: number;
  durationInMinutes: number;
  progress?: number;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  progress: number;
  quizs: number;
  durationInMinutes: number;
  sections?: TopicSection[];
}

export interface CourseTopicSection {
  id: number;
  title: string;
  description: string;
  topics: Topic[];
}

export const CourseTopics: CourseTopicSection[] = [
  {
    id: 1,
    title: "Week 1-4",
    description:
      "SEO foundations: search engines, keywords, and setting up your home-based business online.",
    topics: [
      {
        id: 1,
        title: "Course Introduction",
        description: "Core concepts every SEO beginner needs before going deeper.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Introduction",
            quizs: 0,
            durationInMinutes: 0,
            progress: 63,
          },
          {
            id: 2,
            title: "Course Overview",
            quizs: 0,
            durationInMinutes: 0,
          },
          {
            id: 3,
            title: "Course Overview",
            quizs: 0,
            durationInMinutes: 0,
          },
          {
            id: 4,
            title: "Course Overview",
            quizs: 0,
            durationInMinutes: 10,
          },
        ],
      },
      {
        id: 2,
        title: "Course Overview",
        description: "Map of the full SEO home-business learning path.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: Course Goals",
            quizs: 0,
            durationInMinutes: 5,
          },
          {
            id: 2,
            title: "Section Two: Tools You Will Use",
            quizs: 0,
            durationInMinutes: 7,
          },
        ],
      },
      {
        id: 3,
        title: "Keyword Research Basics",
        description: "Find terms your audience searches for and prioritize opportunities.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: Search Intent",
            quizs: 0,
            durationInMinutes: 9,
          },
          {
            id: 2,
            title: "Section Two: Long-Tail Keywords",
            quizs: 0,
            durationInMinutes: 11,
          },
          {
            id: 3,
            title: "Using Google Keyword Planner",
            quizs: 0,
            durationInMinutes: 14,
          },
        ],
      },
      {
        id: 4,
        title: "Week 1-4 Quiz",
        description: "Check your understanding of SEO fundamentals.",
        progress: 0,
        quizs: 4,
        durationInMinutes: 5,
      },
    ],
  },
  {
    id: 2,
    title: "Week 5-8",
    description:
      "On-page optimization, content structure, and technical SEO essentials.",
    topics: [
      {
        id: 1,
        title: "On-Page SEO",
        description: "Optimize pages so search engines and users understand your content.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: Title Tags & Meta Descriptions",
            quizs: 0,
            durationInMinutes: 10,
          },
          {
            id: 2,
            title: "Section Two: Heading Structure",
            quizs: 0,
            durationInMinutes: 8,
          },
          {
            id: 3,
            title: "Internal Linking",
            quizs: 0,
            durationInMinutes: 9,
          },
        ],
      },
      {
        id: 2,
        title: "Content Optimization",
        description: "Write content that ranks and converts for a home business.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: Content Clusters",
            quizs: 0,
            durationInMinutes: 12,
          },
          {
            id: 2,
            title: "Section Two: E-E-A-T Basics",
            quizs: 0,
            durationInMinutes: 11,
          },
        ],
      },
      {
        id: 3,
        title: "Technical SEO",
        description: "Site speed, indexing, and crawlability fundamentals.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: XML Sitemaps",
            quizs: 0,
            durationInMinutes: 7,
          },
          {
            id: 2,
            title: "Section Two: Robots.txt",
            quizs: 0,
            durationInMinutes: 6,
          },
          {
            id: 3,
            title: "What is Canonicalization",
            quizs: 0,
            durationInMinutes: 8,
          },
        ],
      },
      {
        id: 4,
        title: "Week 5-8 Quiz",
        description: "Review on-page and technical SEO concepts.",
        progress: 0,
        quizs: 5,
        durationInMinutes: 6,
      },
    ],
  },
  {
    id: 3,
    title: "Week 9-12",
    description:
      "Link building, local SEO, analytics, and growing your SEO business.",
    topics: [
      {
        id: 1,
        title: "Off-Page SEO",
        description: "Build authority with links, mentions, and trust signals.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: What Are Backlinks",
            quizs: 0,
            durationInMinutes: 9,
          },
          {
            id: 2,
            title: "Section Two: Ethical Link Building",
            quizs: 0,
            durationInMinutes: 13,
          },
        ],
      },
      {
        id: 2,
        title: "Local SEO",
        description: "Rank in local search and attract nearby customers.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: Google Business Profile",
            quizs: 0,
            durationInMinutes: 10,
          },
          {
            id: 2,
            title: "Section Two: Local Citations",
            quizs: 0,
            durationInMinutes: 8,
          },
        ],
      },
      {
        id: 3,
        title: "Analytics & Reporting",
        description: "Measure traffic, rankings, and ROI for clients or your own site.",
        progress: 0,
        quizs: 0,
        durationInMinutes: 0,
        sections: [
          {
            id: 1,
            title: "Section One: Google Search Console",
            quizs: 0,
            durationInMinutes: 12,
          },
          {
            id: 2,
            title: "Section Two: GA4 for SEO",
            quizs: 0,
            durationInMinutes: 14,
          },
        ],
      },
      {
        id: 4,
        title: "Week 9-12 Quiz",
        description: "Final assessment for advanced SEO workflows.",
        progress: 0,
        quizs: 6,
        durationInMinutes: 8,
      },
    ],
  },
];
