import { UseQueryReturnValue } from '@gqty/react';
import {
  GeneratedSchema,
  Maybe,
  members_constraint,
  members_insert_input,
  members_set_input,
  mutation,
  nodes,
  nodes_bool_exp,
  nodes_insert_input,
  nodes_set_input,
  permissions,
  permissions_insert_input,
  relations_constraint,
  relations_insert_input,
  relations_update_column,
  resolved,
  useMutation,
  useQuery as useQueryGqty,
  useSubscription,
} from 'gql';
import { usePath } from 'hooks';

const getNamespace = (name?: string) =>
  name
    ?.trim()
    .toLocaleLowerCase()
    .replaceAll(' ', '_')
    .replaceAll('?', '')
    .replaceAll(':', '');

type Param = {
  refetch:
    | ((query: UseQueryReturnValue<GeneratedSchema>, node?: nodes) => any[])
    | boolean
    | undefined;
};

export type Node = {
  id?: string;
  name: Maybe<string | undefined>;
  mimeId: Maybe<string | undefined>;
  contextId?: Maybe<string | undefined>;
  parentId?: Maybe<string | undefined>;
  namespace: Maybe<string | undefined>;
  useQuery: () => Maybe<nodes> | undefined;
  useQuery2: () => Maybe<nodes> | undefined;
  useSubs: () => Maybe<nodes>;
  useInsert: (
    param?: Param
  ) => ({
    name,
    namespace,
    mimeId,
    data,
    parentId,
    contextId,
    mutable,
    attachable,
    index,
  }: {
    name?: string;
    namespace?: string;
    mimeId: string;
    data?: unknown;
    parentId?: string | undefined;
    contextId?: string | undefined;
    mutable?: boolean;
    attachable?: boolean;
    index?: number;
  }) => Promise<{ id: Maybe<string | undefined>; namespace?: string }>;
  useDelete: (
    param?: Param
  ) => (param?: { id?: string }) => Promise<string | undefined>;
  useUpdate: (
    param?: Param
  ) => ({
    id,
    set,
  }: {
    id?: string;
    set: nodes_set_input;
  }) => Promise<string | undefined>;
  usePermissions: () => {
    insert: (perms: permissions_insert_input[]) => Promise<number | undefined>;
  };
  useSet: () => (
    name: string,
    nodeId: string | null
  ) => Promise<string | undefined>;
  useGet: () => (name: string) => Maybe<nodes> | undefined;
  useSubsGet: () => (name: string) => Maybe<nodes> | undefined;
  useParent: () => Node;
  useContext: () => Node;
  useMembers: (param?: Param) => {
    insert: ({
      members,
      parentId,
    }: {
      members: members_insert_input[];
      parentId?: string;
    }) => Promise<number | undefined>;
    delete: () => Promise<number | undefined>;
  };
  useMember: (param?: Param) => {
    insert: (member: members_insert_input) => Promise<string | undefined>;
    update: (id: string, set: members_set_input) => Promise<string | undefined>;
    delete: (id: string) => Promise<string | undefined>;
  };
  useChildren: (param?: Param) => {
    delete: (where: nodes_bool_exp) => Promise<number | undefined>;
  };
};

const useNode = (param?: { id?: string; where?: nodes_bool_exp }): Node => {
  const where = {
    where: param?.where ?? { parentId: { _is_null: true } },
  };
  const query = useQueryGqty();
  const useQuery = () => {
    const query = useQueryGqty();
    return param?.id ? query.node({ id: param?.id }) : query.nodes(where)?.[0];
  };
  const useQuery2 = () => {
    //const query = useQueryGqty();
    return param?.id ? query.node({ id: param?.id }) : query.nodes(where)?.[0];
  };
  const node = param?.id
    ? query.node({ id: param?.id })
    : query.nodes(where)?.[0];
  const nodeId = node?.id;
  const name = node?.name;
  const parentId = node?.parentId;
  const mimeId = node?.mimeId;
  const nodeContextId = node?.contextId;
  const namespace = node?.namespace;
  const refetchQueries = [node, node?.data, query?.node({ id: parentId! })];

  const getOpts = (param?: Param) => ({
    refetchQueries:
      param?.refetch && typeof param?.refetch === 'function'
        ? [...param.refetch(query, node!)]
        : param?.refetch === false
        ? []
        : refetchQueries,
    awaitRefetchQueries: true,
  });

  const useGet = () => (name: string) =>
    query?.relations({ where: { name: { _eq: name } } })?.[0].node;

  const useSubs = () => {
    const subs = useSubscription();
    return param?.id ? subs.node({ id: param?.id }) : subs.nodes(where)?.[0];
  };

  const useSubsGet = () => {
    const subs = useSubs();
    return (name: string) => {
      const rel = subs?.relations({ where: { name: { _eq: name } } })?.[0];
      return rel?.node;
    };
  };

  const useSet = () => {
    const [insertRelation] = useMutation(
      (mutation, args: relations_insert_input) =>
        mutation.insertRelation({
          object: args,
          on_conflict: {
            constraint: relations_constraint.relations_parent_id_name_key,
            update_columns: [relations_update_column.nodeId],
          },
        })?.id
    );
    return (name: string, nodeId: string | null) =>
      insertRelation({
        args: { parentId: param?.id ?? node?.id, name, nodeId },
      });
  };

  const useInsert = (param?: Param) => {
    const [insertNode] = useMutation(
      (mutation, args: nodes_insert_input) =>
        mutation.insertNode({ object: args })?.id,
      getOpts(param)
    );
    return async ({
      name,
      namespace,
      mimeId,
      data,
      parentId,
      contextId,
      mutable,
      attachable,
      index,
    }: {
      name?: string;
      namespace?: string;
      mimeId: string;
      data?: any;
      parentId?: string;
      contextId?: string;
      mutable?: boolean;
      attachable?: boolean;
      index?: number;
    }) => {
      const childId = await insertNode({
        args: {
          name,
          namespace: getNamespace(namespace ?? name),
          data,
          parentId: parentId ? parentId : nodeId,
          mimeId,
          contextId: contextId ?? nodeContextId,
          mutable,
          attachable,
          index,
        },
      });
      return { id: childId, namespace: getNamespace(namespace ?? name) };
    };
  };

  const useDelete = (param?: Param) => {
    const [deleteNode] = useMutation(
      (mutation, id: string) => mutation.deleteNode({ id })?.id,
      getOpts(param)
    );
    return (param?: { id?: string }) => {
      return deleteNode({ args: param?.id ?? nodeId! });
    };
  };

  const useUpdate = (param?: Param) => {
    const [updateNode] = useMutation(
      (mutation, args: { id: string; set: nodes_set_input }) =>
        mutation.updateNode({
          pk_columns: { id: args.id },
          _set: args.set,
        })?.id,
      getOpts(param)
    );
    return ({ id, set }: { id?: string; set: nodes_set_input }) => {
      return updateNode({
        args: {
          id: id ?? nodeId!,
          set,
        },
      });
    };
  };

  const usePermissions = () => {
    const [insertPermissions] = useMutation(
      (mutation, { perms }: { perms: permissions_insert_input[] }) => {
        return mutation.insertPermissions({ objects: perms })?.affected_rows;
      }
    );

    return {
      insert: (perms: permissions_insert_input[]) =>
        insertPermissions({ args: { perms } }),
    };
  };

  const useMembers = (param?: Param) => {
    const [insertMembers] = useMutation(
      (
        mutation,
        {
          members,
          parentId,
        }: { members: members_insert_input[]; parentId?: string }
      ) => {
        const objects = members.map((member) => ({
          ...member,
          parentId: parentId ? parentId : nodeId,
        }));
        return mutation.insertMembers({
          objects,
          on_conflict: {
            constraint: members_constraint.members_parent_id_email_key,
            update_columns: [],
          },
        })?.affected_rows;
      },
      getOpts(param)
    );

    const [deleteMembers] = useMutation(
      (mutation) =>
        mutation.deleteMembers({ where: { parentId: { _eq: nodeId } } })
          ?.affected_rows,
      getOpts(param)
    );

    return {
      insert: ({
        members,
        parentId,
      }: {
        members: members_insert_input[];
        parentId?: string;
      }) => insertMembers({ args: { members, parentId } }),
      delete: () => deleteMembers(),
    };
  };

  const useMember = (param?: Param) => {
    const [insertMember] = useMutation(
      (mutation, object: members_insert_input) =>
        mutation.insertMember({ object })?.id,
      getOpts(param)
    );

    const [deleteMember] = useMutation(
      (mutation, id: string) => mutation.deleteMember({ id })?.id,
      getOpts(param)
    );

    const [updateMember] = useMutation(
      (mutation, args: { id: string; set: members_set_input }) =>
        mutation.updateMember({
          pk_columns: { id: args.id },
          _set: args.set,
        })?.id,
      getOpts(param)
    );

    return {
      insert: (member: members_insert_input) =>
        insertMember({ args: { ...member, parentId: nodeId } }),
      delete: (id: string) => deleteMember({ args: id }),
      update: (id: string, set: members_set_input) =>
        updateMember({ args: { id, set } }),
    };
  };

  const useChildren = () => {
    const [deleteChildren] = useMutation(
      (mutation, where: nodes_bool_exp) =>
        mutation.deleteNodes({ where })?.affected_rows
    );

    return {
      delete: (args: nodes_bool_exp) =>
        args ? deleteChildren({ args }) : Promise.resolve(0),
    };
  };

  /*
  const useChildren = (Comp: any) => node?.children().map(({ id }) => <ChildNode id={id} Comp={Comp} />);
  */

  const useContext = () => useNode({ id: nodeContextId! });
  const useParent = () => useNode({ id: parentId! });
  return {
    id: nodeId,
    name,
    parentId,
    contextId: nodeContextId,
    mimeId,
    namespace,
    useQuery,
    useQuery2,
    useSubs,
    useInsert,
    useDelete,
    useUpdate,
    usePermissions,
    useContext,
    useParent,
    useSet,
    useGet,
    useSubsGet,
    useMembers,
    useMember,
    useChildren,
  };

  /*
  const context = {
    id: nodeContextId,
    set: (name: string, nodeId: string | null) =>
      insertRelation({ args: { parentId: nodeContextId, name, nodeId } }),
  };
  */

  /*
  const perm = () => {
    const perm = query?.permissions({ where: { _or: [{ universal: { _eq: true } }, { node: { members: { nodeId: { _eq: session?.user?.id } } } }] } })

    return {
      update: perm?.some(perm => perm.update),
      delete: perm?.some(perm => perm.delete),
    }
  }

  const permMime = (name: string) => {
    const perm = query?.permMime({ args: { mime_name: name } });

    return {
      insert: perm?.some(perm => perm.insert),
      update: perm?.some(perm => perm.update),
      delete: perm?.some(perm => perm.delete),
    }
  }
  */
};

export default useNode;
