import { toWhere } from "core/path";
import {
  Maybe,
  members_constraint,
  members_insert_input,
  nodes,
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
  return name?.trim().toLocaleLowerCase().replaceAll(" ", "_");
};

export type Node = {
  node: Maybe<nodes>;
  sub: Maybe<nodes>;
  get: any;
  subGet: any;
  set: any;
  insert: any;
  del: any;
  update: any;
  members: any;
  member: any;
  children: any;
  perm: any;
  permMime: any;
};

const useNode = (param?: { id?: string }) => {
  const path = usePath();
  const query = useQuery();
  const node = param?.id
    ? query.node({ id: param?.id })
    : query.nodes(toWhere(path))?.[0];
  const nodeId = param?.id ? param?.id : node?.id;
  const refetchQueries = param?.id
    ? [node]
    : [node, query.node({ id: node?.id })];
  const nodeContextId = node?.contextId;
  const subs = useSubscription();
  const sub = param?.id
    ? subs.node({ id: param?.id })
    : subs.nodes(toWhere(path))?.[0];
  const [insertNode] = useMutation(
    (mutation, args: nodes_insert_input) => {
      return mutation.insertNode({ object: args })?.id;
    },
    {
      refetchQueries,
    }
  );
  const [deleteNode] = useMutation(
    (mutation, id: string) => {
      return mutation.deleteNode({ id })?.id;
    },
    {
      refetchQueries,
    }
  );
  const [updateNode] = useMutation(
    (mutation, args: { id: string; set: nodes_set_input }) => {
      return mutation.updateNode({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
    },
    {
      refetchQueries,
    }
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

  const del = async () => {
    return await deleteNode({ args: nodeId });
  };

  const update = async (set: nodes_set_input) => {
    return await updateNode({
      args: {
        id: nodeId,
        set,
      },
    });
  };

  const get = (name: string) => {
    const [rel] = query?.relations({ where: { name: { _eq: name } } })!;
    return rel.node;
  };

  const subGet = (name: string) => {
    const [rel] = sub?.relations({ where: { name: { _eq: name } } })!;
    return rel.node;
  };

  //const subGet = (name: string) => sub?.relation({ args: { relation_name: name } })?.[0];
  //const get = (name: string) => query?.relations({ where: { name: { _eq: name } } })[0].node;
  //const subGet = (name: string) => sub?.relations({ where: { name: { _eq: name } } })[0].node;

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
  const set = async (name: string, nodeId: string | null) => {
    return await insertRelation({ args: { parentId: node?.id, name, nodeId } });
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
    {
      refetchQueries,
    }
  );

  const [deleteMembers] = useMutation(
    (mutation) => {
      return mutation.deleteMembers({ where: { parentId: { _eq: nodeId } } })
        ?.affected_rows;
    },
    {
      refetchQueries,
    }
  );

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
    {
      refetchQueries,
    }
  );

  const member = {
    insert: (member: { roles: string[]; nodeId: string }) => {
      return insertMember({ args: { ...member, parentId: nodeId } });
    },
  };

  const [deleteChildren] = useMutation((mutation, args) => {
    return mutation.deleteNodes({
      where: { parentId: { _eq: nodeId } },
    })?.affected_rows;
  });

  const children = {
    delete: async () => {
      return await deleteChildren();
    },
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
  };
};

export default useNode;
