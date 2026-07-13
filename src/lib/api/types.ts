export type ApiResponse<T = PortfolioApiData> = {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
};

export type HeroButton = {
  text?: string;
  link?: string;
  icon?: string;
  new_tab?: boolean;
};

export type HeroSection = {
  tagline?: string;
  heading?: string;
  heading_highlight?: string;
  sub_heading?: string;
  buttons?: HeroButton[];
};

export type ContactSection = {
  heading?: string;
  heading_highlight?: string;
  button?: HeroButton;
};

export type SiteSettings = {
  hero_section?: HeroSection;
  contact_section?: ContactSection;
  [key: string]: unknown;
};

export type ProjectCategory = {
  id?: string;
  name?: string;
  slug?: string;
  display_order?: number;
  sequence?: number;
  is_active?: boolean;
  status?: string;
  [key: string]: unknown;
};

export type Project = {
  id: string;
  cat?: string;
  year?: string | number;
  title: string;
  client?: string;
  tagline?: string;
  headline?: string;
  desc?: string;
  shortDesc?: string;
  tags?: string[] | string;
  thumb?: string;
  gallery?: string[] | string;
  stats?: unknown[] | string;
  feedback?: unknown[] | string;
  status?: string;
  sequence?: number;
  created_at?: string;
  video_type?: string;
  video_url?: string;
  industry?: string;
  sprint?: string;
  client_logo?: string;
  overview_title?: string;
  challenge?: string;
  approach?: string;
  impact?: string;
  compliance?: string;
  process?: unknown[] | string;
  reelSection?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    videoUrl?: string;
    posterUrl?: string;
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
  };
  [key: string]: unknown;
};

export type ClientLogo = {
  id?: string;
  client_name?: string;
  logo_image?: string;
  display_order?: number;
  is_active?: boolean;
  deleted_at?: string | null;
  [key: string]: unknown;
};

export type ImpactNumber = {
  id?: string;
  label?: string;
  title?: string;
  name?: string;
  value?: string | number;
  num?: string | number;
  number?: string | number;
  count?: string | number;
  target?: string | number;
  numeric_value?: string | number;
  suffix?: string;
  short_desc?: string;
  sub?: string;
  subtitle?: string;
  description?: string;
  display_order?: number;
  is_active?: boolean;
  active?: boolean;
  deleted_at?: string | null;
  [key: string]: unknown;
};

export type SocialLink = {
  id?: string;
  platform?: string;
  profile_url?: string;
  icon?: string;
  display_order?: number;
  is_active?: boolean;
  deleted_at?: string | null;
  [key: string]: unknown;
};

export type PortfolioApiData = {
  projects: Project[];
  categories: ProjectCategory[];
  siteSettings: SiteSettings;
  clientLogos: ClientLogo[];
  impactNumbers: ImpactNumber[];
  socialLinks: SocialLink[];
};
