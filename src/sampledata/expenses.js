function daysAgo(n, hour = 12, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, minute, 0, 0);
  return d;
}

let id = 1;

const SAMPLE_EXPENSES = [
  {
    id: id++,
    title: "Grocery shopping",
    description: "Weekly market run",
    category: "Shopping",
    amount: 326,
    createdAt: daysAgo(0, 0, 45),
  },
  {
    id: id++,
    title: "Electricity bill",
    description: "Monthly electricity",
    category: "Bills",
    amount: 185,
    createdAt: daysAgo(0, 5, 20),
  },
  {
    id: id++,
    title: "Bus fare",
    description: "Public bus commute",
    category: "Transport",
    amount: 15,
    createdAt: daysAgo(0, 7, 10),
  },
  {
    id: id++,
    title: "Steak dinner",
    description: "Dinner at steakhouse",
    category: "Food",
    amount: 1560,
    createdAt: daysAgo(1, 20, 30),
  },
  {
    id: id++,
    title: "Movie tickets",
    description: "Weekend movie night",
    category: "Entertainment",
    amount: 35,
    createdAt: daysAgo(1, 15, 45),
  },
  {
    id: id++,
    title: "Doctor visit",
    description: "Routine checkup",
    category: "Health",
    amount: 2500,
    createdAt: daysAgo(3, 16, 30),
  },
  {
    id: id++,
    title: "Weekly groceries",
    description: "Supermarket haul",
    category: "Shopping",
    amount: 41,
    createdAt: daysAgo(3, 11, 15),
  },
  {
    id: id++,
    title: "Internet bill",
    description: "Monthly internet",
    category: "Bills",
    amount: 100,
    createdAt: daysAgo(5, 17, 40),
  },
  {
    id: id++,
    title: "Taxi ride",
    description: "Ride to airport",
    category: "Transport",
    amount: 8,
    createdAt: daysAgo(5, 6, 25),
  },
  {
    id: id++,
    title: "Coffee & snacks",
    description: "Afternoon cafe visit",
    category: "Food",
    amount: 6,
    createdAt: daysAgo(7, 16, 50),
  },
  {
    id: id++,
    title: "New shoes",
    description: "New running shoes",
    category: "Shopping",
    amount: 599,
    createdAt: daysAgo(7, 12, 10),
  },
  {
    id: id++,
    title: "Concert tickets",
    description: "Live music show",
    category: "Entertainment",
    amount: 450,
    createdAt: daysAgo(10, 19, 55),
  },
];

export default SAMPLE_EXPENSES;
