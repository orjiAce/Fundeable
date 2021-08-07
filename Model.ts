
export interface Story {
  id: string;
  title: string;
  description: string;
  raised: string;
  avatars: [string, string, string];
  image: string;
}

export type SnapchatRoutes = {
  Snapchat: undefined;
  Story: { story: Story };
};
