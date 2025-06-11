import Image from "next/image";
import type { LargeCourseCardProps } from "../types";
import { getTagColors } from "@/lib/utils";

export default function LargeCourseCard({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  tags,
}: LargeCourseCardProps) {
  return (
    <div className="bg-neutral-100/15 border border-neutral-100/10 backdrop-blur-sm w-full md:w-fit rounded-4xl p-5 text-neutral-50 shadow-2xl h-full flex flex-col md:items-center">
      <div className="relative w-full md:max-w-md aspect-[16/9] mb-4">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={imageAlt}
          fill
          sizes="100%"
          className="rounded-3xl object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow text-left">
        <h2 className="text-2xl font-bold mb-1 font-[family-name:var(--font-days-one)]">{title}</h2>
        <h3 className="text-lg font-semibold text-slate-300 mb-2">
          {subtitle}
        </h3>
        <p className="text-sm text-slate-400 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const colors = getTagColors(tag);
            return (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.bgColor} ${colors.textColor}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
