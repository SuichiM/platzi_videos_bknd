const usersMock = [
  {
    id: 1,
    name: 'SuichiM',
    email: 'suichi@suichi.com',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: true,
  },
  {
    id: 2,
    name: 'Kayle',
    email: 'ksimmank1@tinypic.com',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: false,
  },
  {
    id: 3,
    name: 'Charlene',
    email: 'cnewbury2@blinklist.com',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: false,
  },
  {
    id: 4,
    name: 'Anselma',
    email: 'afulger3@deviantart.com',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: true,
  },
  {
    id: 5,
    name: 'Donia',
    email: 'dperott4@imdb.com',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: false,
  },
  {
    id: 6,
    name: 'Neala',
    email: 'ncast5@ocn.ne.jp',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: true,
  },
  {
    id: 7,
    name: 'Meir',
    email: 'msawyers6@qq.com',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: false,
  },
  {
    id: 8,
    name: 'Taddeo',
    email: 'tspedroni7@de.vu',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: true,
  },
  {
    id: 9,
    name: 'Jackelyn',
    email: 'jsalt8@clickbank.net',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: true,
  },
  {
    id: 10,
    name: 'Lilly',
    email: 'lcolhoun9@github.com',
    password: '40c37ec26b6c97e72f82b07d15d9ab986ebab938',
    isAdmin: false,
  },
];

const filteredUsersMock = (email) =>
  usersMock.filter((user) => user.email === email);

module.exports = {
  usersMock,
  filteredUsersMock
}