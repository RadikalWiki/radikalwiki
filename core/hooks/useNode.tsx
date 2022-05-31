import { toWhere } from "core/path";
import {
  Maybe,
  members_insert_input,
  nodes,
  nodes_insert_input,
  nodes_set_input,
  relations_constraint,
  relations_insert_input,
  relations_update_column,
  useMutation,
  useQuery,
  useSubscription,
} from "gql";
import slugify from "slugify"
import usePath from "./usePath";

const getNamespace = (name?: string) => {
  return name?.trim().toLocaleLowerCase().replace(" ", "_");
};

export type Node = {
    node: Maybe<nodes>,
    sub: Maybe<nodes>,
    get: any,
    subGet: any,
    set: any,
    insert: any,
    del: any,
    update: any,
    members: any,
    member: any,
    children: any,
    perm: any,
    permMime: any
};


const useNode = (param?: { id?: string }) => {
  const path = usePath();
  const query = useQuery() //.node({ id });
  const node = param?.id ? query.node({ id: param?.id }) : query.nodes(toWhere(path))?.[0];
  const nodeContextId = node?.contextId
  const subs = useSubscription();
  const sub = param?.id ? subs.node({ id: param?.id }) : subs.nodes(toWhere(path))?.[0];
  const [insertNode] = useMutation(
    (mutation, args: nodes_insert_input) => {
      return mutation.insertNode({ object: args })?.id;
    },
    {
      refetchQueries: [node],
    }
  );
  const [deleteNode] = useMutation(
    (mutation, id: string) => {
      return mutation.deleteNode({ id })?.id;
    },
    {
      refetchQueries: [query],
    }
  );
  const [updateNode] = useMutation(
    (mutation, args: { id: string; set: nodes_set_input }) => {
      return mutation.updateNode({
        pk_columns: { id: args.id },
        _set: args.set,
      })?.id;
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
    parentId?: string,
    contextId?: string,
  }) => {
    const nodeId = await insertNode({
      args: {
        name,
        namespace: namespace ? getNamespace(namespace) : getNamespace(name),
        data,
        parentId: parentId ? parentId : node?.id,
        mimeId,
        contextId: contextId ?? nodeContextId,
      },
    });
    return { id: nodeId, namespace };
  };

  const del = async () => {
    return await deleteNode({ args: node?.id });
  };

  const update = async (set: nodes_set_input) => {
    return await updateNode({
      args: {
        id: node?.id,
        set,
      },
    });
  };

  const get = (name: string) => {
    const [rel] = query?.relations({ where: { name: { _eq: name } } })!;
    return rel.node;
  }

  const subGet = (name: string) => {
    const [rel] = sub?.relations({ where: { name: { _eq: name } } })!;
    return rel.node;
  }
  
  //const subGet = (name: string) => sub?.relation({ args: { relation_name: name } })?.[0];
  //const get = (name: string) => query?.relations({ where: { name: { _eq: name } } })[0].node;
  //const subGet = (name: string) => sub?.relations({ where: { name: { _eq: name } } })[0].node;


  const [insertRelation] = useMutation(
    (mutation, args: relations_insert_input) => {
      return mutation.insertRelation({ object: args, on_conflict: { constraint: relations_constraint.relations_parent_id_name_key, update_columns: [relations_update_column.nodeId] } })?.id;
    }
  );
  const set = async (name: string, nodeId: string | null) => {
    return await insertRelation({ args: { parentId: node?.id, name, nodeId } })
  }

  const [insertMembers] = useMutation(
    (mutation, objects: members_insert_input[]) => {
      return mutation.insertMembers({ objects })?.affected_rows;
    }
  );

  const members = {
    insert: async (members: members_insert_input[]) => {
      return await insertMembers({ args: members })
    }
  }

  const [insertMember] = useMutation(
    (mutation, object: members_insert_input) => {
      return mutation.insertMember({ object })?.id;
    }
  );

  const member = {
    insert: async (member: { roles: string[], nodeId: string }) => {
      return await insertMember({ args: { ...member, parentId: node?.id } })
    }
  }

  const [deleteChildren] = useMutation(
    (mutation, args) => {
      return mutation.deleteNodes({
        where: { parentId: { _eq: node?.id } }
      })?.affected_rows;
    }
  );

  const children = {
    del: async () => {
      return await deleteChildren();
    }
  }

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
    del,
    update,
    members,
    member,
    children,
  };
};

export default useNode;
