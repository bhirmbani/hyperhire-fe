const booksMock = [
  {
    id: 1,
    title: "I'll Never Smile Again",
    cover_img: "https://picsum.photos/seed/PJquMheQJ/640/480",
    point: 43,
    Tag: [
      {
        id: 1,
        name: "FICTION",
      },
      {
        id: 101,
        name: "ESSAY",
      },
    ],
    Authors: [
      {
        Author: {
          id: 100,
          name: "Jaime Hilpert",
        },
      },
      {
        Author: {
          id: 81,
          name: "Glen Konopelski",
        },
      },
    ],
  },
  {
    id: 2,
    title: "All I Have to Do is Dream",
    cover_img: "https://loremflickr.com/640/480?lock=7858477936410624",
    point: 77,
    Tag: [
      {
        id: 2,
        name: "NONFICTION",
      },
      {
        id: 102,
        name: "ESSAY",
      },
    ],
    Authors: [
      {
        Author: {
          id: 93,
          name: "Kendra Romaguera",
        },
      },
      {
        Author: {
          id: 35,
          name: "Jaime Russel DVM",
        },
      },
    ],
  },
  {
    id: 3,
    title: "You Always Hurt the One You Love",
    cover_img: "https://loremflickr.com/640/480?lock=4363475549683712",
    point: 89,
    Tag: [
      {
        id: 3,
        name: "FICTION",
      },
      {
        id: 103,
        name: "SCIENCE",
      },
    ],
    Authors: [
      {
        Author: {
          id: 81,
          name: "Glen Konopelski",
        },
      },
      {
        Author: {
          id: 5,
          name: "Krista Cronin-Roob",
        },
      },
    ],
  },
];

export { booksMock };
