import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
  state = {
    title: '',
    dateInput: '',
    city: '',
    venue: '',
    hostedBy: '',
  };

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        ...this.props.selectedEvent,
      });
    }
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
    } else {
      this.props.createEvent(this.state);
    }
  };

  onChangeInputHandler = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { title, dateInput, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.formSubmitHandler} autoComplete='off'>
          <Form.Field>
            <label>Event Title</label>
            <input
              name='title'
              onChange={this.onChangeInputHandler}
              value={title}
              placeholder='Event title'
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type='date'
              name='dateInput'
              onChange={this.onChangeInputHandler}
              value={dateInput}
              placeholder='Event Date'
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name='city'
              onChange={this.onChangeInputHandler}
              value={city}
              placeholder='City event is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name='venue'
              onChange={this.onChangeInputHandler}
              value={venue}
              placeholder='Enter the Venue of the event'
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name='hostedBy'
              onChange={this.onChangeInputHandler}
              value={hostedBy}
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button type='button' onClick={this.props.cancelFormHandler}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
