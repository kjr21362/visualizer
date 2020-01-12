const INITIAL_STATE = {
  sections: [
    {
      title: "search",
      imageUrl:
        "https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20181010052900/breadth-first-search-graph-algorithm-example.png",
      id: 1,
      linkUrl: "/search"
    },
    {
      title: "sort",
      imageUrl: "https://miro.medium.com/max/7680/1*s0r4FadYBWCbqS1TAd5OJQ.png",
      id: 2,
      linkUrl: "/sort"
    }
  ]
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
