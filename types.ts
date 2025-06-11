export interface LargeCourseCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface SmallCourseCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface BlogMetadata {
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  tags: string[];
  slug: string;
}
