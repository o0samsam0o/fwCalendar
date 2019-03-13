export interface ITimetableList {
  'listId': string;
  'listName': string;
  'priority': number;
  'startDate': string;
  'endDate': string;
  'events': IEvent[];
}

export interface IEvent {
  'eventId': string;
  'eventName': string;
  'action': string;
  'startTime': string;
  'endTime': string;
}
