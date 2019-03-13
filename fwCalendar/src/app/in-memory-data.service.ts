import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {moment} from 'fullcalendar';
import {CalEvents, Camera, Daylist, EventAction, Timetable} from './modules/calendar/interfaces';

@Injectable({providedIn: 'root'})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    moment().locale('de');
    moment().format('LLLL');

    const daylists: Daylist[] = [
      {
        id: '1',
        name: 'Werktags',
        validity: [
          {
            dateRanges: [
              {
                start: moment(),
                end: moment()
              }
            ],
            recurrences: ['*****'],
            timeRanges: [
              {
                id: '',
                start: moment(),
                end: moment()
              }
            ]
          }
        ],
        priority: 1
      },
      {
        id: '2',
        name: 'Wochenende',
        validity: [
          {
            dateRanges: [
              {
                start: moment(),
                end: moment()
              }
            ],
            recurrences: ['*****'],
            timeRanges: [
              {
                id: '',
                start: moment(),
                end: moment()
              }
            ]
          }
        ],
        priority: 2
      },
      {
        id: '3',
        name: 'Feiertag',
        validity: [
          {
            dateRanges: [
              {
                start: moment(),
                end: moment()
              }
            ],
            recurrences: ['*****'],
            timeRanges: [
              {
                id: '',
                start: moment(),
                end: moment()
              }
            ]
          }
        ],
        priority: 3
      }
    ];

    const timetable: Timetable[] = [
      {
        id: 11,
        name: 'Zeitplan1',
        condition: [{
          id: '1',
          name: 'Werktags',
          validity: [
            {
              dateRanges: [
                {
                  start: moment(),
                  end: moment()
                }
              ],
              recurrences: ['*****'],
              timeRanges: [
                {
                  id: '',
                  start: moment(),
                  end: moment()
                }
              ]
            }
          ],
          priority: 1
        },
          {
            id: '2',
            name: 'Wochenende',
            validity: [
              {
                dateRanges: [
                  {
                    start: moment(),
                    end: moment()
                  }
                ],
                recurrences: ['*****'],
                timeRanges: [
                  {
                    id: '',
                    start: moment(),
                    end: moment()
                  }
                ]
              }
            ],
            priority: 2
          }
        ]
      },
      {
        id: 12,
        name: 'Zeitplan2',
        condition: [
          {
            id: '2',
            name: 'Wochenende',
            validity: [
              {
                dateRanges: [
                  {
                    start: moment(),
                    end: moment()
                  }
                ],
                recurrences: ['*****'],
                timeRanges: [
                  {
                    id: '',
                    start: moment(),
                    end: moment()
                  }
                ]
              }
            ],
            priority: 2
          }]
      }
    ];

    const eventActions: EventAction[] = [
      {
        id: 111,
        action: 'record',
        timetable:
          {
            id: 11,
            name: 'Zeitplan1',
            condition: [
              {
                id: '1',
                name: 'Werktags',
                validity: [
                  {
                    dateRanges: [
                      {
                        start: moment(),
                        end: moment()
                      }
                    ],
                    recurrences: ['*****'],
                    timeRanges: [
                      {
                        id: '',
                        start: moment(),
                        end: moment()
                      }
                    ]
                  }
                ],
                priority: 1
              },
              {
                id: '2',
                name: 'Wochenende',
                validity: [
                  {
                    dateRanges: [
                      {
                        start: moment(),
                        end: moment()
                      }
                    ],
                    recurrences: ['*****'],
                    timeRanges: [
                      {
                        id: '',
                        start: moment(),
                        end: moment()
                      }
                    ]
                  }
                ],
                priority: 2
              }
            ]
          },
        device: [1170, 1225]
      },
      {
        id: 112,
        action: 'alarm',
        timetable:
          {
            id: 12,
            name: 'Zeitplan2',
            condition: [{
              id: '2',
              name: 'Wochenende',
              validity: [
                {
                  dateRanges: [
                    {
                      start: moment(),
                      end: moment()
                    }
                  ],
                  recurrences: ['*****'],
                  timeRanges: [
                    {
                      id: '',
                      start: moment(),
                      end: moment()
                    }
                  ]
                }
              ],
              priority: 2
            }]
          },
        device: [1206, 1225]
      }
    ];

    const cameras: Camera[] = [
      {
        id: 1,
        name: 'axis 231D'
      },
      {
        id: 2,
        name: 'JVC VN-V686D'
      },
      {
        id: 3,
        name: 'FAC 9400'
      },
    ];

    const calEvents1: CalEvents[] = [
      {
        id: '1',
        title: 'record',
        start: '2019-03-07',
        end: '2019-03-10',
      },
      {
        id: '2',
        title: 'alarm',
        start: '2019-03-11T00:00:01',
        end: '2019-03-13T23:59:59',
      },
    ];

    const calEvents2: CalEvents[] = [
      {
        id: '1',
        title: 'record',
        start: '2019-03-07T16:00:00',
        end: '2019-03-10T18:00:00',
      },
      {
        id: '2',
        title: 'alarm',
        start: '2019-03-11',
        end: '2019-03-13',
      },
    ];

    const calEvents3: CalEvents[] = [
      {
        id: '1',
        title: 'record',
        start: '2019-03-07T18:00:00',
        end: '2019-03-10T18:00:00',
      },
      {
        id: '2',
        title: 'alarm',
        start: '2019-03-11T18:00:00',
        end: '2019-03-13T18:00:00',
      },
    ];

    const actions: String[] = [
      'record', 'alarm'
    ];

    return {eventActions, timetable, daylists, cameras, calEvents1, calEvents2, calEvents3, actions};
  }
}
