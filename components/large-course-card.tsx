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
    <div className="bg-neutral-800/80 backdrop-blur-sm w-full max-h-fit md:w-fit rounded-4xl p-5 text-neutral-50 h-full hover:shadow-xl transition-all duration-300 flex flex-col md:items-center">
      <div className="relative w-full md:max-w-md aspect-[16/9] mb-4">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={imageAlt}
          fill
          sizes="100%"
          className="rounded-3xl object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow text-left w-fit">
        <h2 className="text-2xl font-bold mb-1 font-[family-name:var(--font-days-one)] max-w-xl">
          {title.slice(0, 50)}...
        </h2>
        <h3 className="text-lg font-semibold text-slate-300 mb-2 w-fit">
          {subtitle.slice(0, 50)}...
        </h3>
        <p className="text-sm text-slate-400 mb-4 flex-grow max-w-md">
          {description.slice(0, 100)}...
        </p>
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
