export const mockVoters = {
  count: 123,
  next: 'http://api.example.org/accounts/?page=4',
  previous: 'http://api.example.org/accounts/?page=2',
  results: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      ward: 'string',
      zone: 'string',
      state: 'string',
      lga: 'string',
      senatorial_district: 'string',
      polling_unit: { name: 'string', code: '23-34-45-958' },
      created_at: '2022-09-03T07:44:23.889Z',
      updated_at: '2022-09-03T07:44:23.889Z',
      voter_ref: 'string',
      lastname: 'string',
      firstname: 'string',
      middle_name: 'string',
      occupation: 'string',
      phone: 'string',
      religion: 'string',
      registration_area: 'string',
      date_of_birth: '2022-09-03',
      marital_status: 'string',
      gender: 'string',
      age: 2147483647,
      loyalty_score: 0,
      tenant: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      status: 'Active',
      canvasser_id: '3456789',
    },
    {
      id: '3fa85f64-5717',
      ward: 'string',
      zone: 'string',
      state: 'string',
      lga: 'string',
      senatorial_district: 'string',
      polling_unit: { name: 'string', code: '23-34-45-958' },
      created_at: '2022-09-02T21:00:14.740Z',
      updated_at: '2022-09-02T21:00:14.740Z',
      voter_ref: 'string',
      lastname: 'string',
      firstname: 'string',
      middle_name: 'string',
      occupation: 'string',
      phone: 'string',
      religion: 'string',
      registration_area: 'string',
      date_of_birth: '2022-09-02',
      marital_status: 'string',
      gender: 'string',
      age: 2147483647,
      loyalty_score: 0,
      tenant: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      status: 'Inactive',
      canvasser_id: '3456789',
    },
  ],
};

export const topStatMock = [
  { title: 'Total voters', label: '34545545454' },
  { title: 'Total Male', label: '34545545454' },
  { title: 'Total Female ', label: '34545545454' },
  { title: 'Unknown Gender', label: '34545545454' },
];

export const pollHistoryMock = [
  {
    title: '2022 Presidential Campaign for Asiwaju',
    label: 'Q1-Popularity Rating For South-South Territorial Region',
  },
  {
    title: '2022 Presidential Campaign for Asiwaju',
    label: 'Q1-Popularity Rating For South-South Territorial Region',
  },
  {
    title: '2022 Presidential Campaign for Asiwaju',
    label: 'Q1-Popularity Rating For South-South Territorial Region',
  },
];

export const votersResponseMock = [
  {
    question:
      'Which candidate are you supporting in the coming presidential election?',
    options: ['Peter Obi', 'Atiku Abubakar', 'Bola Ahmed Tinubu'],
    answer: 'Peter Obi',
  },
  {
    question:
      'Which party are you supporting in the coming presidential election?',
    options: ['APC', 'PDP', 'LP'],
    answer: 'APC',
  },
  {
    question: 'Select all that apply:',
    options: [
      'Peter Obi is a great man',
      'Peter Obi is not a great man',
      'Tinubu is too old',
    ],
    answer: ['Peter Obi is not a great man', 'Tinubu is too old'],
  },
];

export const mockCanversser = {
  count: 123,
  next: 'http://api.example.org/accounts/?page=4',
  previous: 'http://api.example.org/accounts/?page=2',
  results: [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      created_at: '2022-09-04T18:36:00.643Z',
      updated_at: '2022-09-04T18:36:00.643Z',
      status: 'APPROVE',
      voters_id: 'string',
      middlename: 'string',
      firstname: 'string',
      lastname: 'string',
      canvasser_ref: 'string',
      phone: 'string',
      alt_phone: 'string',
      gender: 'MALE',
      residence_address: 'string',
      date_of_birth: '2022-09-04',
      age: 2147483647,
      occupation: 'string',
      highest_qualification: 'string',
      is_registered_voter: true,
      plans_to_vote: true,
      pvc: 'string',
      tenant: { id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'string' },
      state_of_residence: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      residence_lga: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      residence_ward: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      voting_state: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      voting_lga: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      voting_ward: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      voting_polling_unit: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
        code: 'string',
      },
      party_affiliated: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
      party_to_vote: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'string',
      },
    },
  ],
};
