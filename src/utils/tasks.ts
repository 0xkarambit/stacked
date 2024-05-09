const TAGS_REGEXP = /#(\w+)\s?/g;
export const extract_tags = (text: string) =>
	[...text.matchAll(TAGS_REGEXP)].map(m => m[1]); // getting the first capture group from the matches
