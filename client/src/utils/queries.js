import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userName: String!) {
    user(userName: $userName) {
      _id
      userName
      userZipCode
      email
      contacts {
        _id
        contactName
        contactZipCode
        createdAt
      }
    }
  }
`;

export const QUERY_CONTACTS = gql`
  query getContacts {
    contacts {
      _id
      contactName
      contactZipCode
      contactAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_CONTACT = gql`
  query getSingleContact($contactId: ID!) {
    contact(contactId: $contactId) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      userName
      userZipCode
      email
      contacts {
        _id
        contactName
        contactZipCode
        contactAuthor
        createdAt
      }
    }
  }
`;
