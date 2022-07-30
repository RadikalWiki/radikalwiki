import { UseQueryReturnValue } from "@gqty/react";
import { toWhere } from "core/path";
import {
  GeneratedSchema,
  Maybe,
  members_constraint,
  members_insert_input,
  members_set_input,
  nodes,
  nodes_bool_exp,
  nodes_insert_input,
  nodes_set_input,
  relations_constraint,
  relations_insert_input,
  relations_update_column,
  resolved,
  useMutation,
  useQuery,
  useSubscription,
} from "gql";
import { usePath } from "hooks";

const getNamespace = (name?: string) => {
  return name
    ?.trim()
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("?", "");
};

export type Node = {
  id: string;
  query: Maybe<nodes> | undefined;
  sub: Maybe<nodes> | undefined;
  get: (name: string) => Maybe<nodes> | undefined;
  subGet: (name: string) => Maybe<nodes> | undefined;
  set: any;
  insert: any;
  delete: any;
  update: any;
  members: any;
  member: any;
  children: {
    delete: any;
  };
  context: {
    set: any;
  };
};

const useNode = (param?: {
  id?: string;
  refetch?: (
    query: UseQueryReturnValue<GeneratedSchema>,
    node?: nodes
  ) => any[];
}) => {
  const path = usePath();
  const query = useQuery();
  const node = param?.id
    ? query.node({ id: param?.id })
    : query.nodes(toWhere(path))?.[0];
  const nodeId = param?.id ? param?.id : node?.id;
  const parentId = node?.parentId;
  const parentQueries = [
    query.nodes(toWhere(path.slice(0, -1))),
    query.node({ id: parentId }),
  ];
  const refetchQueries = param?.refetch
    ? [...param?.refetch(query, node!), node, node?.data, ...parentQueries]
    : [node, node?.data, ...parentQueries];
  const nodeContextId = node?.contextId;
  const subs = useSubscription();
  const opts = {
    refetchQueries,
    awaitRefetchQueries: true,
  };
  const sub = param?.id
    ? subs.node({ id: param?.id })
    : subs.nodes(toWhere(path))?.[0];
  const [insertNode] = useMutation((mutation, args: nodes_insert_input) => {
    return mutation.insertNode({ object: args })?.id;
  }, opts);
  const [deleteNode] = useMutation((mutation, id: string) => {
    return mutation.deleteNode({ id })?.id;
  }, opts);
  const [updateNode] = useMutation(
    (mutation, args: { id: string; set: nodes_set_input }) => {
      return mutation.updateNode({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    opts
  );

  const insert = async ({
    name,
    namespace,
    mimeId,
    data,
    parentId,
    contextId,
  }: {
    name?: string;
    namespace?: string;
    mimeId: string;
    data?: any;
    parentId?: string;
    contextId?: string;
  }) => {
    const childId = await insertNode({
      args: {
        name,
        namespace: getNamespace(namespace ?? name),
        data,
        parentId: parentId ? parentId : nodeId,
        mimeId,
        contextId: contextId ?? nodeContextId,
      },
    });
    return { id: childId, namespace: getNamespace(namespace ?? name) };
  };

  const del = (param?: { id?: string }) => {
    return deleteNode({ args: param?.id ?? nodeId });
  };

  const update = ({ id, set }: { id?: string; set: nodes_set_input }) => {
    return updateNode({
      args: {
        id: id ?? nodeId,
        set,
      },
    });
  };

  const get = (name: string) => {
    const rel = node?.relations({ where: { name: { _eq: name } } })?.[0];
    return rel?.node;
  };

  const subGet = (name: string) => {
    const rel = sub?.relations({ where: { name: { _eq: name } } })?.[0];
    return rel?.node;
  };

  const [insertRelation] = useMutation(
    (mutation, args: relations_insert_input) => {
      return mutation.insertRelation({
        object: args,
        on_conflict: {
          constraint: relations_constraint.relations_parent_id_name_key,
          update_columns: [relations_update_column.nodeId],
        },
      })?.id;
    }
  );
  const set = (name: string, nodeId: string | null) => {
    return insertRelation({ args: { parentId: node?.id, name, nodeId } });
  };

  const [insertMembers] = useMutation(
    (mutation, objects: members_insert_input[]) => {
      const members = objects.map((member) => ({
        ...member,
        parentId: node?.id,
      }));
      return mutation.insertMembers({
        objects: members,
        on_conflict: {
          constraint: members_constraint.members_parent_id_node_id_key,
          update_columns: [],
        },
      })?.affected_rows;
    },
    opts
  );

  const [deleteMembers] = useMutation((mutation) => {
    return mutation.deleteMembers({ where: { parentId: { _eq: nodeId } } })
      ?.affected_rows;
  }, opts);

  const members = {
    insert: (members: members_insert_input[]) => {
      return insertMembers({ args: members });
    },
    delete: () => {
      return deleteMembers();
    },
  };

  const [insertMember] = useMutation(
    (mutation, object: members_insert_input) => {
      return mutation.insertMember({ object })?.id;
    },
    opts
  );

  const [deleteMember] = useMutation((mutation, id: string) => {
    return mutation.deleteMember({ id })?.id;
  }, opts);

  const [updateMember] = useMutation(
    (mutation, args: { id: string; set: members_set_input }) => {
      return mutation.updateMember({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    opts
  );

  const member = {
    insert: (member: { roles: string[]; nodeId: string }) => {
      return insertMember({ args: { ...member, parentId: nodeId } });
    },
    delete: (id: string) => {
      return deleteMember({ args: id });
    },
    update: (id: string, set: members_set_input) => {
      return updateMember({ args: { id, set } });
    },
  };

  const [deleteChildren] = useMutation((mutation, where: nodes_bool_exp) => {
    return mutation.deleteNodes({ where })?.affected_rows;
  });

  const children = {
    delete: (args: nodes_bool_exp) => {
      return deleteChildren({ args });
    },
  };

  const context = {
    id: nodeContextId,
    set: (name: string, nodeId: string | null) =>
      insertRelation({ args: { parentId: nodeContextId, name, nodeId } }),
  };

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

  return {
    id: nodeId,
    query: node,
    sub,
    get,
    subGet,
    set,
    insert,
    delete: del,
    update,
    members,
    member,
    children,
    context,
  };
};

export default useNode;
