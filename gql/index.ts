import { gql } from "@apollo/client";

/*
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
        identity {
          displayName
          user {
            id
          }
        }
      }
      data
      folder {
        name
        id
        mode
        parentId
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
        data
        file {
          id
          path
          token
        }
        parent {
          id
        }
        folder {
          mode
        }
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
*/

export const CONTENT_GET_DATA = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      file {
        id
        path
        token
      }
      data
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
      authors {
        id
        name
        identity {
          displayName
          user {
            id
          }
        }
      }
      folder {
        id
        name
        mode
        parentId
        lockContent
        lockChildren
      }
      parent {
        id
        name
      }
    }
  }
`;

export const CONTENT_GET_AVATAR = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      published
      folder {
        id
        contents(
          where: { published: { _eq: true }, parentId: { _is_null: true } }
          order_by: { priority: asc, createdAt: asc }
        ) {
          id
        }
      }
      parent {
        id
        children(
          where: { published: { _eq: true } }
          order_by: { priority: asc, createdAt: asc }
        ) {
          id
        }
      }
    }
  }
`;

export const CONTENT_GET_CARD = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      name
      authors {
        id
        name
        identity {
          displayName
          user {
            id
          }
        }
      }
    }
  }
`;

export const CONTENT_GET_CHILDREN = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      folder {
        id
        mode
      }
      children(order_by: { published: asc, createdAt: asc }) {
        id
        name
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
    }
  }
`;

export const CONTENT_GET_CHILDREN_ADD = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      folder {
        id
        mode
        lockChildren
      }
      children(order_by: { published: asc, createdAt: asc }) {
        id
        name
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
    }
  }
`;

export const CONTENT_GET_EDIT = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      name
      data
      creatorId
      published
      authors {
        id
        name
        identity {
          email
          displayName
          user {
            id
          }
        }
      }
      folder {
        id
        name
        mode
        parentId
        lockContent
        lockChildren
        contents {
          id
        }
      }
      parent {
        id
        name
        parent {
          id
        }
        children {
          id
        }
      }
      children(order_by: { published: asc, createdAt: asc }) {
        id
        name
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
    }
  }
`;

export const CONTENT_GET_POLLS = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
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

export const CONTENT_GET_TOOLBAR = gql`
  query ($id: uuid!) {
    content: contents_by_pk(id: $id) {
      id
      name
      creatorId
      published
      children {
        id
        name
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
      folder {
        id
        mode
        lockContent
        lockChildren
      }
      parent {
        id
      }
    }
  }
`;

/*
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
      folder {
        name
        id
        mode
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
*/

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
      id
      name
    }
  }
`;

export const CONTENTS_ADD = gql`
  mutation ($objects: [contents_insert_input!]!) {
    insert_contents(objects: $objects) {
      returning {
        id
      }
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
  mutation ($id: uuid!) {
    delete_authorships(where: { contentId: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const EVENT_TIMER_SET = gql`
  mutation ($id: uuid!, $time: Int) {
    update_timers(where: { eventId: { _eq: $id } }, _set: { time: $time }) {
      affected_rows
    }
  }
`;

export const POLL_ADD = gql`
  mutation ($object: polls_insert_input!) {
    poll: insert_polls_one(object: $object) {
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
  mutation {
    update_polls(where: { active: { _eq: true } }, _set: { active: false }) {
      returning {
        id
        content {
          id
        }
      }
    }
  }
`;

export const POLL_CHECK_VOTE = gql`
  query ($id: uuid!, $userId: uuid!) {
    poll: polls_by_pk(id: $id) {
      id
      maxVote
      minVote
      active
      options
      votes(where: { userId: { _eq: $userId } }) {
        id
      }
      content {
        folder {
          event {
            admissions(
              where: { identity: { user: { id: { _eq: $userId } } } }
            ) {
              id
              voting
              checkedIn
            }
          }
        }
      }
    }
  }
`;

export const EVENT_CHECK_VOTE = gql`
  query ($id: uuid!, $userId: uuid!) {
    event: events_by_pk(id: $id) {
      id
      admissions(where: { identity: { user: { id: { _eq: $userId } } } }) {
        id
        voting
        checkedIn
      }
      poll {
        id
        active
        votes(where: { userId: { _eq: $userId } }) {
          id
        }
      }
    }
  }
`;

export const EVENT_CHECK_VOTE_ACTION = gql`
  query ($id: uuid!) {
    canVote(eventId: $id) {
      pollId
      canVote
      active
    }
    event: events_by_pk(id: $id) {
      id
      poll {
        id
        active
      }
    }
  }
`;

export const EVENT_POLL_SUB = gql`
  subscription ($id: uuid!) {
    event: events_by_pk(id: $id) {
      id
      poll {
        id
        active
        maxVote
        minVote
        options
        content {
          id
          name
          folder {
            id
            mode
          }
        }
      }
    }
  }
`;

export const POLL_GET_CONTENT = gql`
  query ($id: uuid!) {
    poll: polls_by_pk(id: $id) {
      id
      active
      content {
        id
        name
        children {
          id
          name
        }
        parent {
          id
          name
        }
        folder {
          id
          name
          mode
        }
      }
    }
  }
`;

export const POLL_SUB_ADMIN = gql`
  subscription ($id: uuid!) {
    poll: polls_by_pk(id: $id) {
      id
      active
    }
  }
`;

export const POLL_SUB_RESULT = gql`
  subscription ($id: uuid!) {
    poll: polls_by_pk(id: $id) {
      id
      active
      content {
        id
        name
        children(order_by: { priority: asc, createdAt: asc }) {
          id
          name
        }
        parent {
          id
        }
        folder {
          id
          name
          mode
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
      id
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
      content {
        parent {
          id
        }
      }
      pollId
      timerId
      lockSpeak
    }
  }
`;

export const EVENT_GET = gql`
  query ($id: uuid!) {
    event: events_by_pk(id: $id) {
      id
      name
      contentId
      pollId
      timerId
      lockSpeak
    }
  }
`;

export const EVENT_UPDATE = gql`
  mutation ($id: uuid!, $set: events_set_input!) {
    update_events_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
    }
  }
`;

export const VOTE_ADD = gql`
  mutation ($object: votes_insert_input!) {
    insert_votes_one(object: $object) {
      id
    }
  }
`;

export const VOTE_ACTION = gql`
  mutation ($pollId: uuid, $value: [Int]) {
    addVote(vote: { pollId: $pollId, value: $value }) {
      pollId
      headers
    }
  }
`;

export const SPEAK_ADD = gql`
  mutation ($object: speaks_insert_input!) {
    insert_speaks_one(object: $object) {
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

export const EVENT_SPEAK_DEL_ALL = gql`
  mutation ($id: uuid) {
    delete_speaks(where: { eventId: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const EVENT_SUB_SPEAK = gql`
  subscription ($id: uuid) {
    speaks(
      order_by: { type: desc, createdAt: asc }
      where: { eventId: { _eq: $id } }
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

export const EVENT_TIMER_SUB = gql`
  subscription ($id: uuid!) {
    events_by_pk(id: $id) {
      id
      timer {
        id
        time
        updatedAt
      }
    }
  }
`;

export const FOLDERS_ADD = gql`
  mutation ($objects: [folders_insert_input!]!) {
    insert_folders(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const FOLDER_UPDATE = gql`
  mutation ($id: uuid!, $set: folders_set_input!) {
    update_folders_by_pk(pk_columns: { id: $id }, _set: $set) {
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

export const ADMISSIONS_ADD = gql`
  mutation ($objects: [admissions_insert_input!]!) {
    insert_admissions(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const ADMISSION_UPDATE = gql`
  mutation ($id: uuid!, $set: admissions_set_input!) {
    update_admissions_by_pk(pk_columns: { id: $id }, _set: $set) {
      id
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

export const EVENT_ADMISSIONS_GET = gql`
  query ($id: uuid!) {
    event: events_by_pk(id: $id) {
      id
      admissions(order_by: { identity: { displayName: asc } }) {
        id
        voting
        checkedIn
        identity {
          email
          displayName
        }
      }
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
        _or: [
          { authors: { identity: { user: { id: { _eq: $id } } } } }
          { creatorId: { _eq: $id } }
        ]
      }
      order_by: { createdAt: desc }
    ) {
      id
      name
      parent {
        name
      }
      folder {
        name
      }
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

export const FOLDER_GET = gql`
  query ($id: uuid!) {
    folder: folders_by_pk(id: $id) {
      id
      name
      lockContent
      lockChildren
      mode
      parent {
        id
        name
        parentId
      }
      contents(
        where: { parentId: { _is_null: true } }
        order_by: { published: asc, createdAt: asc }
      ) {
        id
        name
        priority
        published
      }
      folders {
        id
        name
        priority
        subtitle
      }
    }
  }
`;

export const FOLDER_GET_EXPORT = gql`
  query ($id: uuid!) {
    export: folders_by_pk(id: $id) {
      contents(
        order_by: { priority: asc }
        where: { parentId: { _is_null: true } }
      ) {
        name
        data
        authors {
          name
          identity {
            displayName
          }
        }
        children(order_by: { createdAt: desc }) {
          name
          data
          authors {
            name
            identity {
              displayName
            }
          }
          children(order_by: { createdAt: desc }) {
            name
            data
            authors {
              name
              identity {
                displayName
              }
            }
          }
        }
      }
    }
  }
`;

export const EVENT_GET_FOLDERS = gql`
  query ($id: uuid!) {
    folders(order_by: { priority: asc }, where: { eventId: { _eq: $id } }) {
      id
      name
      subtitle
      mode
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
  mutation ($objects: [groups_insert_input!]!) {
    insert_groups(objects: $objects) {
      affected_rows
    }
  }
`;

export const EVENTS_GET = gql`
  query {
    events(order_by: { createdAt: desc }) {
      name
      shortName
      id
      folderId
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
      id
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

export const EVENT_GET_FOLDER = gql`
  query ($id: uuid!) {
    event: events_by_pk(id: $id) {
      id
      folderId
    }
  }
`;
