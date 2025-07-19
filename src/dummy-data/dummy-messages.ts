const messages: Message[] = [
  {
    id: '1',
    senderId: 'alice123',
    receiverId: 'bob456',
    content: 'Hey Bob! How’s it going?',
    timestamp: new Date('2025-07-18T08:00:00Z'),
  },
    {
    id: '1',
    senderId: 'alice123',
    receiverId: 'bob456',
    content: 'I want pizza?',
    timestamp: new Date('2025-07-18T09:00:00Z'),
  },

  {
    id: '2',
    senderId: 'bob456',
    receiverId: 'alice123',
    content: 'Hi Alice! All good here, just working on the app. You?',
    timestamp: new Date('2025-07-18T09:01:10Z'),
  },
  {
    id: '3',
    senderId: 'alice123',
    receiverId: 'bob456',
    content: 'Same, trying to fix the SVG curve bug 😅',
    timestamp: new Date('2025-07-18T09:02:00Z'),
  },
  {
    id: '4',
    senderId: 'bob456',
    receiverId: 'alice123',
    content: 'Oof, good luck! Let me know if you want help.',
    timestamp: new Date('2025-07-18T09:03:15Z'),
  },
  {
    id: '5',
    senderId: 'alice123',
    receiverId: 'bob456',
    content: 'Thanks! Might ping you later 💬',
    timestamp: new Date('2025-07-18T09:04:00Z'),
  },
];

export default messages;