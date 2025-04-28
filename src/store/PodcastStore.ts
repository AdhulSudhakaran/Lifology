import { types, flow, Instance,  } from "mobx-state-tree";

export const Podcast = types.model("Podcast", {
  id: types.identifier,
  title: types.string,
  author: types.string,
  coverImage: types.string,
});


export const PodcastStore = types
  .model("PodcastStore", {
    podcasts: types.array(Podcast),
    subscribedPodcastIds: types.array(types.string), // Store only IDs
    isLoading: false,
    error: types.maybe(types.string),
    isModalVisible: false,
  })

  .views((self) => ({
    get subscribedPodcasts() {
      return self.subscribedPodcastIds
        .map(id => self.podcasts.find(p => p.id === id))
        .filter(Boolean); // Filter out undefined
    },

    get subscribedCount() {
      return self.subscribedPodcastIds.length;
    },


    isSubscribed(id: string) {
      return self.subscribedPodcastIds.includes(id);
    }
  }))


  .actions((self) => ({
    toggleSubscribe(podcastId: string) {
      const index = self.subscribedPodcastIds.indexOf(podcastId);
      if (index > -1) {
        self.subscribedPodcastIds.splice(index, 1);
      } else {
        self.subscribedPodcastIds.push(podcastId);
      }
    },


    removeSubscribed(podcastId: string) {
      const index = self.subscribedPodcastIds.indexOf(podcastId);
      if (index > -1) {
        self.subscribedPodcastIds.splice(index, 1);
      }
    },


    toggleModal(visible?: boolean) {
      self.isModalVisible = visible !== undefined ? visible : !self.isModalVisible;
    },


    fetchPodcasts: flow(function* fetchPodcasts() {
      self.isLoading = true;
      try {
        const mockData = Array(300).fill(0).map((_, i) => ({
          id: `${i+1}`,
          title: `Podcast ${i+1}`,
          author: `Author ${i+1}`,
          coverImage: `https://picsum.photos/200/200?${i}`,
        })); //@ts-ignore
        self.podcasts = mockData;
      } catch (error:any) {
        self.error = error.message;
      } finally {
        self.isLoading = false;
      }
    })
  }));

export type IPodcastStore = Instance<typeof PodcastStore>;