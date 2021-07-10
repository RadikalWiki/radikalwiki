import { gql } from "@apollo/client";

export const CONTENT_SUB = gql`
  subscription ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      name
      creatorId
      published
      file {
        id
        path
        token
      }
      authors {
        name
        identity {
          displayName
          user {
            id
          }
        }
      }
      data
      category {
        name
        id
        childMode
        lockContent
        lockChildren
      }
      parent {
        name
        id
        parent {
          id
        }
      }
      children(order_by: { published: asc, createdAt: asc }) {
        name
        id
        published
        authors {
          name
          identity {
            displayName
            user {
              id
            }
          }
        }
      }
      polls {
        id
        createdAt
        total: votes_aggregate(where: {}) {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const CONTENT_GET = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      name
      creatorId
      published
      file {
        id
        path
        token
      }
      authors {
        name
        email
        identity {
          displayName
          user {
            id
          }
        }
      }
      data
      category {
        name
        id
        childMode
        lockContent
        lockChildren
      }
      parent {
        name
        id
        parent {
          id
        }
      }
      children(order_by: { published: asc, createdAt: asc }) {
        name
        id
        published
        authors {
          name
          identity {
            displayName
            user {
              id
            }
          }
        }
      }
      polls {
        id
        createdAt
        total: votes_aggregate(where: {}) {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const USER_GET_CONTENTS = gql`
  query ($id: uuid!) {
    contents(
      where: {
        _or: {
          authors: { identity: { user: { id: { _eq: $id } } } }
          creatorId: { _eq: $id }
        }
      }
    ) {
      name
      id
    }
  }
`;

export const CONTENT_ADD = gql`
  mutation (
    $name: String
    $data: String
    $categoryId: uuid
    $creatorId: uuid
    $parentId: uuid
  ) {
    insert_contents_one(
      object: {
        name: $name
        data: $data
        categoryId: $categoryId
        creatorId: $creatorId
        parentId: $parentId
      }
    ) {
      id
    }
  }
`;

export const CONTENT_UPDATE = gql`
  mutation ($id: uuid!, $set: contents_set_input!) {
    update_contents_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
    }
  }
`;

export const CONTENT_DELETE = gql`
  mutation ($id: uuid!) {
    delete_contents_by_pk(id: $id) {
      id
    }
  }
`;

export const AUTHORSHIPS_ADD = gql`
  mutation ($objects: [authorships_insert_input!]!) {
    insert_authorships(objects: $objects) {
      affected_rows
    }
  }
`;

export const FILES_ADD = gql`
  mutation ($objects: [files_insert_input!]!) {
    insert_files(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const CONTENT_DELETE_AUTHORSHIPS = gql`
  mutation ($contentId: uuid!) {
    delete_authorships(where: { contentId: { _eq: $contentId } }) {
      affected_rows
    }
  }
`;

export const CONTENT_SET_PRIORITY = gql`
  mutation ($id: uuid!, $priority: Int) {
    update_contents_by_pk(
      pk_columns: { id: $id }
      _set: { priority: $priority }
    ) {
      id
    }
  }
`;

export const TIMER_SET = gql`
  mutation ($id: uuid!, $time: Int) {
    update_timers_by_pk(pk_columns: { id: $id }, _set: { time: $time }) {
      id
    }
  }
`;

export const POLL_ADD = gql`
  mutation ($contentId: uuid!) {
    poll: insert_polls_one(object: { contentId: $contentId, active: true }) {
      id
    }
  }
`;

export const POLL_DEL = gql`
  mutation ($id: uuid!) {
    delete_polls_by_pk(id: $id) {
      id
    }
  }
`;

export const POLL_STOP = gql`
  mutation ($id: uuid) {
    update_polls(where: { active: { _eq: true } }, _set: { active: false }) {
      affected_rows
      returning {
        id
        content {
          id
        }
      }
    }
    update_events(where: { id: { _eq: 2 } }, _set: { pollId: $id }) {
      returning {
        id
      }
    }
  }
`;

export const POLL_GET_TYPE = gql`
  query ($pollId: uuid!) {
    poll: polls_by_pk(id: $pollId) {
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
  query ($id: uuid!, $userId: uuid!) {
    event: events_by_pk(id: $id) {
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
  subscription ($id: uuid!) {
    event: events_by_pk(id: $id) {
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
    poll: polls_by_pk(id: $pollId) {
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
    poll: polls_by_pk(id: $id) {
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
    polls(
      distinct_on: [contentId]
      order_by: [{ contentId: desc, createdAt: desc }]
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

export const GROUP_GET_EVENTS = gql`
  query {
    groups {
      name
      events {
        id
        name
        shortName
      }
    }
  }
`;

export const EVENT_SUB = gql`
  subscription ($id: uuid!) {
    event: events_by_pk(id: $id) {
      id
      contentId
      pollId
      timerId
      lockSpeak
    }
  }
`;

export const EVENT_GET = gql`
  query ($id: uuid!) {
    event: events_by_pk(id: $id) {
      name
      id
      contentId
      pollId
      timerId
      lockSpeak
    }
  }
`;

export const EVENT_SET_CONTENT = gql`
  mutation ($id: uuid!, $contentId: uuid) {
    update_events_by_pk(
      pk_columns: { id: $id }
      _set: { contentId: $contentId }
    ) {
      id
    }
  }
`;

export const EVENT_SET_POLL = gql`
  mutation ($id: uuid!, $pollId: uuid) {
    update_events_by_pk(pk_columns: { id: $id }, _set: { pollId: $pollId }) {
      id
    }
  }
`;

export const EVENT_SET_LOCK_SPEAK = gql`
  mutation ($id: uuid!, $lockSpeak: Boolean) {
    update_events_by_pk(
      pk_columns: { id: $id }
      _set: { lockSpeak: $lockSpeak }
    ) {
      id
    }
  }
`;

export const VOTE_ADD = gql`
  mutation ($userId: uuid, $pollId: uuid, $value: _int4) {
    insert_votes_one(
      object: { userId: $userId, pollId: $pollId, value: $value }
    ) {
      id
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

export const SPEAK_ADD = gql`
  mutation ($userId: uuid, $eventId: uuid, $type: Int) {
    insert_speaks_one(
      object: { userId: $userId, eventId: $eventId, type: $type }
    ) {
      id
    }
  }
`;

export const SPEAK_DEL = gql`
  mutation ($id: uuid!) {
    delete_speaks_by_pk(id: $id) {
      id
    }
  }
`;

export const SPEAK_DEL_ALL = gql`
  mutation ($eventId: uuid) {
    delete_speaks(where: { eventId: { _eq: $eventId } }) {
      affected_rows
    }
  }
`;

export const SPEAK_SUB = gql`
  subscription ($eventId: uuid) {
    speaks(
      order_by: { type: desc, createdAt: asc }
      where: { eventId: { _eq: $eventId } }
    ) {
      id
      createdAt
      type
      user {
        id
        identity {
          displayName
        }
      }
    }
  }
`;

export const TIMER_SUB = gql`
  subscription ($id: uuid!) {
    timer: timers_by_pk(id: $id) {
      updatedAt
      time
    }
  }
`;

export const CATEGORY_ADD = gql`
  mutation ($name: String, $eventId: uuid, $childMode: String) {
    insert_categories_one(
      object: { name: $name, eventId: $eventId, childMode: $childMode }
    ) {
      id
      name
    }
  }
`;

export const CATEGORY_UPDATE = gql`
  mutation ($id: uuid!, $set: categories_set_input!) {
    update_categories_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
    }
  }
`;

export const IDENTITIES_ADD = gql`
  mutation ($objects: [identities_insert_input!]!) {
    insert_identities(
      objects: $objects
      on_conflict: { constraint: idEmails_pkey, update_columns: displayName }
    ) {
      affected_rows
    }
  }
`;

export const IDENTITY_ADD = gql`
  mutation ($object: identities_insert_input!) {
    insert_identities_one(
      object: $object
      on_conflict: { constraint: idEmails_pkey, update_columns: displayName }
    ) {
      email
    }
  }
`;

export const MEMBERSHIPS_ADD = gql`
  mutation ($objects: [memberships_insert_input!]!) {
    insert_memberships(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const ROLES_ADD = gql`
  mutation ($objects: [roles_insert_input!]!) {
    insert_roles(objects: $objects) {
      affected_rows
    }
  }
`;

export const IDENTITIES_GET = gql`
  query {
    identities {
      displayName
      email
    }
  }
`;
export const USERS_GET = gql`
  query {
    users {
      id
      display_name
      identity {
        displayName
        email
      }
    }
  }
`;

export const USER_GET_PROFILE = gql`
  query ($id: uuid!) {
    user: users_by_pk(id: $id) {
      identity {
        memberships {
          group {
            id
            name
          }
        }
      }
    }
    contents(
      where: {
        _or: {
          authors: { identity: { user: { id: { _eq: $id } } } }
          creatorId: { _eq: $id }
        }
      }
    ) {
      name
      id
    }
  }
`;

export const USER_GET_DISPLAY_NAME = gql`
  query ($id: uuid!) {
    user: users_by_pk(id: $id) {
      identity {
        displayName
      }
    }
  }
`;

export const USER_CHECK_TOKEN = gql`
  query ($token: uuid!) {
    users(where: { token: { _eq: $token } }) {
      id
      name
      role
    }
  }
`;

export const USER_CHECK_TOKEN_ROLE = gql`
  query ($token: uuid!, $role: String!) {
    users(
      where: { _and: [{ token: { _eq: $token } }, { role: { _eq: $role } }] }
    ) {
      name
      role
    }
  }
`;

export const CATEGORY_GET = gql`
  query ($id: uuid!) {
    category: categories_by_pk(id: $id) {
      id
      name
      lockContent
      lockChildren
      contents(
        order_by: { priority: asc }
        where: { parentId: { _is_null: true } }
      ) {
        id
        name
      }
    }
  }
`;

export const CATEGORIES_GET = gql`
  query ($eventId: uuid!) {
    categories(
      order_by: { priority: desc }
      where: { eventId: { _eq: $eventId } }
    ) {
      id
      name
      childMode
    }
  }
`;

export const GROUPS_GET = gql`
  query {
    groups(order_by: { createdAt: desc }) {
      name
      shortName
      id
    }
  }
`;

export const GROUP_GET_MEMBERS = gql`
  query ($id: uuid!) {
    group: groups_by_pk(id: $id) {
      name
      memberships {
        email
      }
    }
  }
`;

export const GROUP_ADD = gql`
  mutation ($name: String, $shortName: String, $creatorId: uuid) {
    insert_groups_one(
      object: { name: $name, shortName: $shortName, creatorId: $creatorId }
    ) {
      id
      name
    }
  }
`;

export const EVENTS_GET = gql`
  query {
    events(order_by: { createdAt: desc }) {
      name
      shortName
      id
      group {
        id
        name
      }
    }
  }
`;

export const IDENTITIES_FIND = gql`
  query ($like: String) {
    identities(
      limit: 10
      where: { displayName: { _ilike: $like } }
      order_by: { displayName: asc }
    ) {
      displayName
      email
    }
  }
`;

export const EVENT_GET_ROLE = gql`
  query ($id: uuid!, $email: String) {
    event: events_by_pk(id: $id) {
      group {
        creatorId
        memberships(where: { email: { _eq: $email } }) {
          roles {
            role
          }
        }
      }
    }
  }
`;
