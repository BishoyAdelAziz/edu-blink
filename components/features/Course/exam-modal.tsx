"use client";

import Modal from "@/components/ui/Modal";
import { AlarmIcon, ArrowLeftIcon } from "@/components/ui/icons";
import { closeModal, MODAL_OPEN_EVENT } from "@/utils/modal";
import { useCallback, useEffect, useRef, useState } from "react";

type ExamOption = {
  text: string;
  isCorrect?: boolean;
};

type ExamQuestion = {
  question: string;
  options: ExamOption[];
};

const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    question: "What is the primary goal of on-page SEO?",
    options: [
      {
        text: "To improve the website's visibility in search engine results",
        isCorrect: true,
      },
      { text: "To increase the website's loading speed" },
      { text: "To remove JavaScript from every page" },
      { text: "To buy more paid ads on social media" },
    ],
  },
  {
    question: "Which HTML element is best for a page's main heading?",
    options: [
      { text: "<h1>", isCorrect: true },
      { text: "<p>" },
      { text: "<h2>" },
      { text: "<div>" },
    ],
  },
  {
    question: "What does DNS stand for in web hosting?",
    options: [
      { text: "Domain Name System", isCorrect: true },
      { text: "Digital Network Service" },
      { text: "Data Name Server" },
      { text: "Domain Network Security" },
    ],
  },
];

export const TimeComponent = () => {
  return (
    <div className="flex h-5 w-30 items-center justify-center gap-2 rounded-lg bg-yellow-500 p-5 font-semibold">
      <AlarmIcon className="z-600 cursor-pointer text-xs text-white" />
      <p className="text-lg font-semibold text-white">10:00</p>
    </div>
  );
};

export const QuestionComponent = ({
  examQuestion,
  selectedOption,
  onSelectOption,
}: {
  examQuestion: ExamQuestion;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
}) => {
  return (
    <div className="flex h-full min-h-[40vh] w-full flex-col rounded-4xl bg-zinc-50 p-5 text-gray-800">
      <p className="mb-4 text-base font-semibold leading-snug">
        {examQuestion.question}
      </p>

      <div className="flex flex-col gap-3">
        {examQuestion.options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <button
              key={index}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelectOption(index);
              }}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                isSelected
                  ? "border-secondary bg-secondary/10 font-medium text-secondary"
                  : "border-gray-200 bg-white hover:border-secondary/40"
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const QuestionNumberIndicator = ({
  index,
  isActive,
  onSelect,
}: {
  index: number;
  isActive: boolean;
  onSelect: (index: number) => void;
}) => {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onSelect(index);
      }}
      aria-current={isActive ? "step" : undefined}
      className={`relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-semibold transition-none ${
        isActive
          ? "bg-white text-secondary ring-1 ring-white"
          : "bg-secondary text-white ring-1 ring-white"
      }`}
    >
      {index + 1}
    </button>
  );
};

export default function ExamModal({ id }: { id: string }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeQuestionRef = useRef(0);
  const scrollLockIndexRef = useRef<number | null>(null);
  const manualScrollSyncTimerRef = useRef<number | null>(null);

  const applyActiveQuestion = useCallback((index: number) => {
    if (activeQuestionRef.current === index) return;
    activeQuestionRef.current = index;
    setActiveQuestion(index);
  }, []);

  const resolveActiveQuestionIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 0;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, []);

  const syncIndicatorFromScroll = useCallback(() => {
    if (scrollLockIndexRef.current !== null) return;

    const resolvedIndex = resolveActiveQuestionIndex();
    applyActiveQuestion(resolvedIndex);
  }, [applyActiveQuestion, resolveActiveQuestionIndex]);

  const goToQuestion = useCallback(
    (index: number) => {
      if (index < 0 || index >= EXAM_QUESTIONS.length) return;

      const container = scrollContainerRef.current;
      const slide = slideRefs.current[index];
      if (!container || !slide) return;

      scrollLockIndexRef.current = index;
      applyActiveQuestion(index);

      const targetLeft =
        slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2;
      const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
      const nextScrollLeft = Math.min(Math.max(0, targetLeft), maxScroll);

      container.style.scrollSnapType = "none";
      container.scrollTo({
        left: nextScrollLeft,
        behavior: "smooth",
      });

      const finishScroll = () => {
        container.style.scrollSnapType = "";
        scrollLockIndexRef.current = null;
        applyActiveQuestion(resolveActiveQuestionIndex());
      };

      if ("onscrollend" in container) {
        container.addEventListener("scrollend", finishScroll, { once: true });
      }

      window.setTimeout(finishScroll, 500);
    },
    [applyActiveQuestion, resolveActiveQuestionIndex],
  );

  const selectOption = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
    goToQuestion(questionIndex + 1);
  };

  const resetExam = useCallback(() => {
    setActiveQuestion(0);
    setSelectedAnswers({});
    activeQuestionRef.current = 0;
    scrollLockIndexRef.current = null;

    requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      container.scrollTo({ left: 0, behavior: "instant" });
      applyActiveQuestion(0);
    });
  }, [applyActiveQuestion]);

  useEffect(() => {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.addEventListener(MODAL_OPEN_EVENT, resetExam);

    return () => {
      modal.removeEventListener(MODAL_OPEN_EVENT, resetExam);
    };
  }, [id, resetExam]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (scrollLockIndexRef.current !== null) return;

      if (manualScrollSyncTimerRef.current !== null) {
        window.clearTimeout(manualScrollSyncTimerRef.current);
      }

      manualScrollSyncTimerRef.current = window.setTimeout(() => {
        syncIndicatorFromScroll();
      }, 120);
    };

    const onScrollEnd = () => {
      if (scrollLockIndexRef.current !== null) return;
      syncIndicatorFromScroll();
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("scrollend", onScrollEnd);

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scrollend", onScrollEnd);

      if (manualScrollSyncTimerRef.current !== null) {
        window.clearTimeout(manualScrollSyncTimerRef.current);
      }
    };
  }, [syncIndicatorFromScroll]);

  return (
    <Modal id={id}>
      <div
        className="relative z-1000 flex h-[70vh] w-[90vw] flex-col items-center gap-4 rounded-lg bg-secondary py-5 md:min-h-[60vh] md:max-w-[30vw]"
        onClick={(event) => event.stopPropagation()}
      >
        <ArrowLeftIcon
          onClick={() => closeModal(id)}
          className="absolute left-5 top-5 cursor-pointer text-sm font-bold text-white"
        />
        <TimeComponent />

        <div className="relative z-10 flex w-full items-center justify-center gap-2">
          {EXAM_QUESTIONS.map((_, index) => (
            <QuestionNumberIndicator
              key={index}
              index={index}
              isActive={index === activeQuestion}
              onSelect={goToQuestion}
            />
          ))}
        </div>

        <div
          ref={scrollContainerRef}
          className="flex w-full min-h-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[11%] scrollbar-none"
        >
          {EXAM_QUESTIONS.map((examQuestion, index) => (
            <div
              key={index}
              ref={(element) => {
                slideRefs.current[index] = element;
              }}
              data-question-index={index}
              className="w-[95%] shrink-0 snap-center snap-always md:w-[80%]"
            >
              <QuestionComponent
                examQuestion={examQuestion}
                selectedOption={selectedAnswers[index] ?? null}
                onSelectOption={(optionIndex) => selectOption(index, optionIndex)}
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
