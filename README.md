# Meteor events

A mini-application using Meteor that allows event hosts to check people into an event.

The home page shows:

- An event selector (`select`) displaying the name of each event, by default displaying `Select an event` (communities collection);
- A list of people registered in the selected event (people collection).

The list of people allows the event host to:

- See first and last name together (full name), company name, title, check-in date, and check-out date both using `MM/DD/YYYY, HH:mm` format or `N/A`;
- Check people into the event by clicking the "Check-in {person firstName and lastName}" button;
- If the user was checked-in over five seconds ago, we want to see a "Check-out {person firstName and lastName}" check-out button .

Between the event selector and the list of people there is a summary like this:

- `People in the event right now: 10`;
- `People by company in the event right now: Green Group (10), Hoppe Group (5)`;
- `People not checked-in: 200`;

The pages are reactive -- no refresh should be needed to display the latest data.

## Machine setup

- [Install Meteor](https://www.meteor.com/install)

### How to install dependencies

```bash
meteor npm install -g yarn
meteor yarn install
```

### How to run

```bash
meteor yarn start
```

### How to run tests

```bash
meteor yarn cypress
```
