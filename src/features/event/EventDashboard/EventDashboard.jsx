import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

const eventsFromDashboard = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    dateInput: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
    ],
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    dateInput: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
    ],
  },
];

class EventDashboard extends Component {
  state = {
    events: eventsFromDashboard,
    isOpen: false,
    selectedEvent: null,
  };

  openFormHandler = () => {
    this.setState({ isOpen: true, selectedEvent: null });
  };
  closeFormHandler = () => {
    this.setState({ isOpen: false });
  };

  createEventHandler = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = './assets/images/user.png';
    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false,
    }));
  };

  updateEventHandler = (updatedEvent) => {
    this.setState(({ events }) => ({
      events: events.map((event) => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null,
    }));
  };

  selectEventHandler = (event) => {
    this.setState({ selectedEvent: event, isOpen: true });
  };

  deleteEventHandler = (id) => {
    this.setState(({ events }) => ({
      events: events.filter((event) => event.id !== id),
    }));
  };

  // changeFormBoolean = () => {
  //   // const newStatus = !this.state.isOpen;
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen,
  //   }));
  // };
  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList
              events={events}
              selectEvent={this.selectEventHandler}
              deleteEvent={this.deleteEventHandler}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Button
              positive
              onClick={this.openFormHandler}
              content='Create Event'
            />
            {isOpen && (
              <EventForm
                key={selectedEvent ? selectedEvent.id : 0}
                updateEvent={this.updateEventHandler}
                createEvent={this.createEventHandler}
                cancelFormHandler={this.closeFormHandler}
                selectedEvent={selectedEvent}
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default EventDashboard;
