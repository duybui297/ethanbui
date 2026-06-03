/**
 * Hand-typed schema reflecting supabase/migrations/0001_initial.sql.
 * Replace with generated types via `supabase gen types typescript` once linked.
 *
 * Shape required by @supabase/supabase-js v2.46+:
 * - Database.public has { Tables, Views, Functions, Enums, CompositeTypes }
 * - Every table needs { Row, Insert, Update, Relationships }
 * - Every function needs { Args, Returns }
 */

export type Locale = 'en' | 'vi';
export type ArticleStatus = 'draft' | 'published' | 'scheduled';
export type LeadIntent = 'workshop' | 'speaking' | 'advisory' | 'podcast' | 'other';
export type LeadStatus = 'new' | 'replied' | 'archived';

// ---- Row types ----

export interface Profile {
  id: string;
  display_name: string | null;
  role: 'reader' | 'admin';
  created_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_vi: string;
  created_at: string;
}

export interface Tag {
  id: string;
  slug: string;
  name_en: string;
  name_vi: string;
  created_at: string;
}

export interface Media {
  id: string;
  bucket_path: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  mime: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface Article {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string | null;
  body_md: string;
  status: ArticleStatus;
  published_at: string | null;
  reading_time: number | null;
  featured_image_id: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  translation_of: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  intent: LeadIntent;
  name: string;
  email: string;
  company: string | null;
  brief: string;
  locale: Locale;
  status: LeadStatus;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  locale: Locale;
  source: string | null;
  beehiiv_id: string | null;
  created_at: string;
}

// ---- Helpers ----

type Insert<T, Required extends keyof T> = Partial<T> & Pick<T, Required>;
type Update<T> = Partial<T>;

// ---- Database (Supabase-required shape) ----

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Insert<Profile, 'id'>;
        Update: Update<Profile>;
        Relationships: [];
      };
      articles: {
        Row: Article;
        Insert: Insert<Article, 'locale' | 'slug' | 'title'>;
        Update: Update<Article>;
        Relationships: [];
      };
      categories: {
        Row: Category;
        Insert: Insert<Category, 'slug' | 'name_en' | 'name_vi'>;
        Update: Update<Category>;
        Relationships: [];
      };
      tags: {
        Row: Tag;
        Insert: Insert<Tag, 'slug' | 'name_en' | 'name_vi'>;
        Update: Update<Tag>;
        Relationships: [];
      };
      media: {
        Row: Media;
        Insert: Insert<Media, 'bucket_path'>;
        Update: Update<Media>;
        Relationships: [];
      };
      article_categories: {
        Row: { article_id: string; category_id: string };
        Insert: { article_id: string; category_id: string };
        Update: { article_id?: string; category_id?: string };
        Relationships: [];
      };
      article_tags: {
        Row: { article_id: string; tag_id: string };
        Insert: { article_id: string; tag_id: string };
        Update: { article_id?: string; tag_id?: string };
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Insert<Lead, 'intent' | 'name' | 'email' | 'brief'>;
        Update: Update<Lead>;
        Relationships: [];
      };
      subscribers: {
        Row: Subscriber;
        Insert: Insert<Subscriber, 'email'>;
        Update: Update<Subscriber>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
