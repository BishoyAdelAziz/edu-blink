"use client";

import { useState } from "react";
import { DocumentIcon, LockIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import type { CourseTopicSection, Topic, TopicSection } from "@/constants";

type TopicsCardProps = {
  section: CourseTopicSection;
};

function SectionBadges({
  quizs,
  durationInMinutes,
}: {
  quizs: number;
  durationInMinutes: number;
}) {
  return (
    <>
      <span className="rounded bg-green-100 px-2 py-1 text-xs  whitespace-nowrap uppercase tracking-wide text-green-500">
        {quizs} {quizs === 1 ? "Question" : "Questions"}
      </span>
      {durationInMinutes > 0 && (
        <span className="rounded bg-pink-100 px-2 py-1 text-xs whitespace-nowrap  uppercase tracking-wide text-pink-500">
          {durationInMinutes} {durationInMinutes === 1 ? "Minute" : "Minutes"}
        </span>
      )}
    </>
  );
}

function TopicLeafRow({ topic }: { topic: Topic }) {
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <DocumentIcon size={20} />
        <p className="text-sm font-medium text-gray-800">{topic.title}</p>
      </div>
      <div className="flex items-center gap-2">
        {(topic.quizs > 0 || topic.durationInMinutes > 0) && (
          <SectionBadges
            quizs={topic.quizs}
            durationInMinutes={topic.durationInMinutes}
          />
        )}
        <LockIcon size={20} />
      </div>
    </div>
  );
}

function SectionRow({ subSection }: { subSection: TopicSection }) {
  const showBadges =
    subSection.quizs > 0 || subSection.durationInMinutes > 0;
  const showProgress = (subSection.progress ?? 0) > 0;

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <DocumentIcon size={20} />
        <p className="text-sm font-medium text-gray-800">{subSection.title}</p>
      </div>
      <div className="flex items-center gap-2">
        {showBadges && (
          <SectionBadges
            quizs={subSection.quizs}
            durationInMinutes={subSection.durationInMinutes}
          />
        )}
        {showProgress && (
          <span className="text-sm font-medium text-gray-700">
            {subSection.progress}%
          </span>
        )}
        <LockIcon size={20} />
      </div>
    </div>
  );
}

function TopicAccordion({
  topic,
  defaultOpen = false,
}: {
  topic: Topic;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-4 text-left"
        aria-expanded={isOpen}
      >
        <p className="text-base font-semibold text-gray-900">{topic.title}</p>
        {isOpen ? <MinusIcon size="md" /> : <PlusIcon size="md" />}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`flex flex-col transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {topic.sections!.map((subSection) => (
              <SectionRow
                key={`${topic.id}-${subSection.id}`}
                subSection={subSection}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicRow({
  topic,
  defaultOpen = false,
}: {
  topic: Topic;
  defaultOpen?: boolean;
}) {
  const hasSections = Boolean(topic.sections?.length);

  if (!hasSections) {
    return <TopicLeafRow topic={topic} />;
  }

  return <TopicAccordion topic={topic} defaultOpen={defaultOpen} />;
}

export default function TopicsCard({ section }: TopicsCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-md border border-gray-200 bg-white">
      {section.topics.map((topic, index) => (
        <TopicRow
          key={`${section.id}-${topic.id}`}
          topic={topic}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}
