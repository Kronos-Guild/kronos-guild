import Image from "next/image";
import type { SmallCourseCardProps } from "../types";
import { getTagColors } from "@/lib/utils";


export default function SmallCourseCard({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  tags,
}: SmallCourseCardProps) {
  return (
    <div className="bg-neutral-800/80 backdrop-blur-sm rounded-3xl p-4 text-neutral-50 flex text-left gap-4 items-center hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square hidden md:block min-h-36 flex-shrink-0">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={imageAlt}
          fill
          sizes="100%"
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-bold mb-0.5 font-[family-name:var(--font-days-one)]">{title}</h2>
        <h3 className="text-sm font-semibold text-slate-300 mb-1">
          {subtitle}
        </h3>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const colors = getTagColors(tag);
            return (
              <span
                key={tag}
                className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${colors.bgColor} ${colors.textColor}`}
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
