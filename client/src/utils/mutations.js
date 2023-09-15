import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userName: String!, $userZipCode: String!, $email: String!, $password: String!) {
    addUser(userName: $userName, userZipCode: $userZipCode, email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($contactName: String!, $contactZipCode: String!) {
    addContact(contactName: $contactName, contactZipCode: $contactZipCode) {
      _id
      contactName
      contactZipCode
      contactAuthor
      createdAt
      events {
        _id
        eventName
        eventDate
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($contactId: ID!, $eventName: String!, $eventDate: String!) {
    addEvent(contactId: $contactId, eventName: $eventName, eventDate: $eventDate) {
      _id
      contactName
      contactZipCode
      contactAuthor
      createdAt
      events {
        _id
        eventName
        eventDate
      }
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($contactId: ID!, $eventId: ID!) {
    removeEvent(contactId: $contactId, eventId: $eventId) {
      _id
      events {
        _id
      }
    }
  }
`;
