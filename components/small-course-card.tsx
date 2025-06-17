import Image from "next/image";
import type { SmallCourseCardProps } from "../types";
import { getTagColors, variantStyles } from "@/lib/utils";

interface SmallCourseCardExtendedProps extends SmallCourseCardProps {
  variant?: "default" | "blue" | "green" | "purple" | "orange" | "gradient";
}

export default function SmallCourseCard({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  tags,
  variant = "default",
}: SmallCourseCardExtendedProps) {
  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div
      className={`${styles.container} border backdrop-blur-sm rounded-3xl p-4 shadow-2xl flex text-left gap-4 items-center`}
    >
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
        <h2
          className={`text-lg font-bold mb-0.5 font-[family-name:var(--font-days-one)] ${styles.title}`}
        >
          {title}
        </h2>
        <h3 className={`text-sm font-semibold mb-1 ${styles.subtitle}`}>
          {subtitle}
        </h3>
        <p className={`text-xs mb-3 leading-relaxed ${styles.description}`}>
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
