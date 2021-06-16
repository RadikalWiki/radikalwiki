import { gql } from "@apollo/client";

export const CONTENT_GET = gql`
  query ($id: uuid!) {
    content: content_by_pk(id: $id) {
      id
      name
      creators
      data
      category {
        name
        id
      }
      parent {
        name
        id
      }
      children {
        name
        id
      }
      polls {
        id
        created
        total: votes_aggregate(where: {}) {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const CONTENT_ADD = gql`
  mutation (
    $name: String
    $data: String
    $categoryId: uuid
    $creators: String
    $priority: Int
  ) {
    insert_content(
      objects: [
        {
          name: $name
          data: $data
          categoryId: $categoryId
          creators: $creators
          priority: $priority
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

export const CONTENT_SET_PRIORITY = gql`
  mutation ($name: String, $priority: Int) {
    update_content(
      where: { name: { _eq: $name } }
      _set: { priority: $priority }
    ) {
      returning {
        id
      }
    }
  }
`;

export const TIMER_SET = gql`
  mutation ($time: Int) {
    update_timer_by_pk(pk_columns: { id: 1 }, _set: { time: $time }) {
      id
    }
  }
`;

export const POLL_ADD = gql`
  mutation ($contentId: uuid!) {
    poll: insert_poll_one(object: { contentId: $contentId, active: true }) {
      id
    }
  }
`;

export const POLL_DEL = gql`
  mutation ($id: uuid!) {
    delete_poll_by_pk(id: $id) {
      id
    }
  }
`;

export const POLL_STOP = gql`
  mutation ($id: uuid) {
    update_poll(where: { active: { _eq: true } }, _set: { active: false }) {
      affected_rows
      returning {
        id
        content {
          id
        }
      }
    }
    update_event(where: { id: { _eq: 2 } }, _set: { pollId: $id }) {
      returning {
        id
      }
    }
  }
`;

export const POLL_GET_TYPE = gql`
  query ($pollId: uuid!) {
    poll: poll_by_pk(id: $pollId) {
      content {
        pollType {
          id
          options {
            value
          }
          maxVote
          minVote
        }
      }
    }
  }
`;

export const EVENT_CHECK_VOTE = gql`
  query ($userId: uuid!) {
    event: event_by_pk(id: 2) {
      id
      poll {
        id
        votes(where: { userId: { _eq: $userId } }) {
          id
        }
      }
    }
  }
`;

export const EVENT_CHECK_VOTE_ACTION = gql`
  query {
    hasVoted {
      pollId
    }
  }
`;

export const EVENT_POLL_SUB = gql`
  subscription {
    event: event_by_pk(id: 2) {
      id
      poll {
        id
        content {
          id
          name
          pollType {
            id
            options {
              name
              value
            }
            maxVote
            minVote
          }
        }
      }
    }
  }
`;

export const POLL_RESULT_ACTION = gql`
  query ($pollId: uuid) {
    getPollResult(pollId: $pollId) {
      id
      name
      count
      keys
      values
    }
  }
`;

export const POLL_RESULT = gql`
  query ($pollId: uuid!) {
    poll: poll_by_pk(id: $pollId) {
      active
      content {
        id
        name
        pollType {
          id
          options {
            name
          }
        }
      }
      votes {
        value
      }
      total: votes_aggregate(where: {}) {
        aggregate {
          count
        }
      }
    }
  }
`;

export const POLL_SUB_RESULT = gql`
  subscription ($id: uuid!) {
    poll: poll_by_pk(id: $id) {
      active
      content {
        id
        name
        pollType {
          id
          options {
            name
          }
        }
      }
      votes {
        value
      }
      total: votes_aggregate(where: {}) {
        aggregate {
          count
        }
      }
    }
  }
`;

export const POLL_SUB_ALL_RESULT = gql`
  subscription {
    poll(
      distinct_on: [contentId]
      order_by: [{ contentId: desc, created: desc }]
      where: { content: { pollType: { id: { _eq: 0 } } } }
    ) {
      content {
        name
        pollType {
          options {
            name
          }
        }
      }
      votes {
        value
      }
      total: votes_aggregate(where: {}) {
        aggregate {
          count
        }
      }
    }
  }
`;

export const EVENT_SUB = gql`
  subscription {
    event: event_by_pk(id: 2) {
      id
      contentId
      pollId
      timerId
      lockSpeak
    }
  }
`;

export const EVENT_SET_CONTENT = gql`
  mutation ($contentId: uuid) {
    update_event(where: { id: { _eq: 2 } }, _set: { contentId: $contentId }) {
      returning {
        id
      }
    }
  }
`;

export const EVENT_SET_POLL = gql`
  mutation ($pollId: uuid) {
    update_event(where: { id: { _eq: 2 } }, _set: { pollId: $pollId }) {
      returning {
        id
      }
    }
  }
`;

export const EVENT_SET_LOCK_SPEAK = gql`
  mutation ($lockSpeak: Boolean) {
    update_event(where: { id: { _eq: 2 } }, _set: { lockSpeak: $lockSpeak }) {
      returning {
        id
      }
    }
  }
`;

export const VOTE_ADD = gql`
  mutation ($userId: uuid, $pollId: uuid, $value: _int4) {
    insert_vote(
      objects: [{ userId: $userId, pollId: $pollId, value: $value }]
    ) {
      returning {
        id
      }
    }
  }
`;

export const VOTE_ACTION = gql`
  mutation ($pollId: uuid, $value: [Int]) {
    addVote(vote: { pollId: $pollId, value: $value }) {
      pollId
    }
  }
`;

export const VOTE_DEL = gql`
  mutation ($userId: uuid, $pollId: uuid) {
    delete_vote(where: { _and: [{ pollId: { _eq: $pollId } }] }) {
      affected_rows
    }
  }
`;

export const SPEAK_ADD = gql`
  mutation ($id: uuid, $type: Int) {
    insert_speak_one(object: { userId: $id, type: $type }) {
      id
    }
  }
`;

export const SPEAK_DEL = gql`
  mutation ($id: uuid!) {
    delete_speak_by_pk(id: $id) {
      id
    }
  }
`;

export const SPEAK_DEL_ALL = gql`
  mutation {
    delete_speak(where: {}) {
      affected_rows
    }
  }
`;

export const SPEAK_SUB = gql`
  subscription ($id: uuid) {
    speak(order_by: { type: desc, created: asc }) {
      id
      created
      type
      user {
        name
        id
      }
    }
  }
`;

export const TIMER_SUB = gql`
  subscription {
    timer: timer_by_pk(id: 1) {
      updated_at
      time
    }
  }
`;

export const CATEGORY_ADD = gql`
  mutation ($name: String) {
    insert_category(objects: [{ name: $name }]) {
      returning {
        id
        name
      }
    }
  }
`;

export const USER_ADD = gql`
  mutation ($name: String, $email: String) {
    insert_user(objects: [{ name: $name, email: $email }]) {
      returning {
        id
      }
    }
  }
`;

export const USER_CHECK_TOKEN = gql`
  query ($token: uuid!) {
    user(where: { token: { _eq: $token } }) {
      id
      name
      role
    }
  }
`;

export const USER_CHECK_TOKEN_ROLE = gql`
  query ($token: uuid!, $role: String!) {
    user(
      where: { _and: [{ token: { _eq: $token } }, { role: { _eq: $role } }] }
    ) {
      name
      role
    }
  }
`;

export const CATEGORY_GET = gql`
  query ($id: uuid!) {
    category: category_by_pk(id: $id) {
      name
      contents(order_by: { priority: desc }) {
        id
        name
      }
    }
  }
`;

export const CATEGORIES_GET = gql`
  query {
    category(order_by: { priority: desc }) {
      name
      id
    }
  }
`;
