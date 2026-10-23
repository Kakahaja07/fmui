export interface ShowcaseItem {
  name: string;
  description: string;
  url: string;
  components: string[];
}

/**
 * Community projects built with FMUI. Entries are added by hand once a
 * project has been verified. Empty until the first submissions arrive.
 */
export const showcase: ShowcaseItem[] = [];
