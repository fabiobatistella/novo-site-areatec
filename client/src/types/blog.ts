export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  titleEs: string;
  excerpt: string;
  excerptEn: string;
  excerptEs: string;
  content: string;
  category: 'Pillar' | 'Cluster';
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  relatedProducts?: string[];
}
