/**
 * GQTY AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _int4: any;
  _text: any;
  citext: any;
  json: any;
  jsonb: any;
  timestamptz: any;
  uuid: any;
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export interface Boolean_comparison_exp {
  _eq?: Maybe<Scalars["Boolean"]>;
  _gt?: Maybe<Scalars["Boolean"]>;
  _gte?: Maybe<Scalars["Boolean"]>;
  _in?: Maybe<Array<Scalars["Boolean"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Boolean"]>;
  _lte?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<Scalars["Boolean"]>;
  _nin?: Maybe<Array<Scalars["Boolean"]>>;
}

export interface CanVoteInput {
  eventId?: Maybe<Scalars["uuid"]>;
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export interface Int_comparison_exp {
  _eq?: Maybe<Scalars["Int"]>;
  _gt?: Maybe<Scalars["Int"]>;
  _gte?: Maybe<Scalars["Int"]>;
  _in?: Maybe<Array<Scalars["Int"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Int"]>;
  _lte?: Maybe<Scalars["Int"]>;
  _neq?: Maybe<Scalars["Int"]>;
  _nin?: Maybe<Array<Scalars["Int"]>>;
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export interface String_comparison_exp {
  _eq?: Maybe<Scalars["String"]>;
  _gt?: Maybe<Scalars["String"]>;
  _gte?: Maybe<Scalars["String"]>;
  _ilike?: Maybe<Scalars["String"]>;
  _in?: Maybe<Array<Scalars["String"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _like?: Maybe<Scalars["String"]>;
  _lt?: Maybe<Scalars["String"]>;
  _lte?: Maybe<Scalars["String"]>;
  _neq?: Maybe<Scalars["String"]>;
  _nilike?: Maybe<Scalars["String"]>;
  _nin?: Maybe<Array<Scalars["String"]>>;
  _nlike?: Maybe<Scalars["String"]>;
  _nsimilar?: Maybe<Scalars["String"]>;
  _similar?: Maybe<Scalars["String"]>;
}

export interface VoteInput {
  pollId?: Maybe<Scalars["uuid"]>;
  value?: Maybe<Array<Maybe<Scalars["Int"]>>>;
}

/** expression to compare columns of type _int4. All fields are combined with logical 'AND'. */
export interface _int4_comparison_exp {
  _eq?: Maybe<Scalars["_int4"]>;
  _gt?: Maybe<Scalars["_int4"]>;
  _gte?: Maybe<Scalars["_int4"]>;
  _in?: Maybe<Array<Scalars["_int4"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["_int4"]>;
  _lte?: Maybe<Scalars["_int4"]>;
  _neq?: Maybe<Scalars["_int4"]>;
  _nin?: Maybe<Array<Scalars["_int4"]>>;
}

/** expression to compare columns of type _text. All fields are combined with logical 'AND'. */
export interface _text_comparison_exp {
  _eq?: Maybe<Scalars["_text"]>;
  _gt?: Maybe<Scalars["_text"]>;
  _gte?: Maybe<Scalars["_text"]>;
  _in?: Maybe<Array<Scalars["_text"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["_text"]>;
  _lte?: Maybe<Scalars["_text"]>;
  _neq?: Maybe<Scalars["_text"]>;
  _nin?: Maybe<Array<Scalars["_text"]>>;
}

/** order by aggregate values of table "admissions" */
export interface admissions_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<admissions_max_order_by>;
  min?: Maybe<admissions_min_order_by>;
}

/** input type for inserting array relation for remote table "admissions" */
export interface admissions_arr_rel_insert_input {
  data: Array<admissions_insert_input>;
  on_conflict?: Maybe<admissions_on_conflict>;
}

/** Boolean expression to filter rows from the table "admissions". All fields are combined with a logical 'AND'. */
export interface admissions_bool_exp {
  _and?: Maybe<Array<Maybe<admissions_bool_exp>>>;
  _not?: Maybe<admissions_bool_exp>;
  _or?: Maybe<Array<Maybe<admissions_bool_exp>>>;
  checkedIn?: Maybe<Boolean_comparison_exp>;
  email?: Maybe<String_comparison_exp>;
  event?: Maybe<events_bool_exp>;
  eventId?: Maybe<uuid_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  identity?: Maybe<identities_bool_exp>;
  voting?: Maybe<Boolean_comparison_exp>;
}

/** unique or primary key constraints on table "admissions" */
export enum admissions_constraint {
  /** unique or primary key constraint */
  admissions_email_eventId_key = "admissions_email_eventId_key",
  /** unique or primary key constraint */
  admissions_pkey = "admissions_pkey",
}

/** input type for inserting data into table "admissions" */
export interface admissions_insert_input {
  checkedIn?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  event?: Maybe<events_obj_rel_insert_input>;
  eventId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  identity?: Maybe<identities_obj_rel_insert_input>;
  voting?: Maybe<Scalars["Boolean"]>;
}

/** order by max() on columns of table "admissions" */
export interface admissions_max_order_by {
  email?: Maybe<order_by>;
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
}

/** order by min() on columns of table "admissions" */
export interface admissions_min_order_by {
  email?: Maybe<order_by>;
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "admissions" */
export interface admissions_obj_rel_insert_input {
  data: admissions_insert_input;
  on_conflict?: Maybe<admissions_on_conflict>;
}

/** on conflict condition type for table "admissions" */
export interface admissions_on_conflict {
  constraint: admissions_constraint;
  update_columns: Array<admissions_update_column>;
  where?: Maybe<admissions_bool_exp>;
}

/** ordering options when selecting data from "admissions" */
export interface admissions_order_by {
  checkedIn?: Maybe<order_by>;
  email?: Maybe<order_by>;
  event?: Maybe<events_order_by>;
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  identity?: Maybe<identities_order_by>;
  voting?: Maybe<order_by>;
}

/** primary key columns input for table: "admissions" */
export interface admissions_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "admissions" */
export enum admissions_select_column {
  /** column name */
  checkedIn = "checkedIn",
  /** column name */
  email = "email",
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  voting = "voting",
}

/** input type for updating data in table "admissions" */
export interface admissions_set_input {
  checkedIn?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  eventId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  voting?: Maybe<Scalars["Boolean"]>;
}

/** update columns of table "admissions" */
export enum admissions_update_column {
  /** column name */
  checkedIn = "checkedIn",
  /** column name */
  email = "email",
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  voting = "voting",
}

/** order by aggregate values of table "auth.account_providers" */
export interface auth_account_providers_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<auth_account_providers_max_order_by>;
  min?: Maybe<auth_account_providers_min_order_by>;
}

/** input type for inserting array relation for remote table "auth.account_providers" */
export interface auth_account_providers_arr_rel_insert_input {
  data: Array<auth_account_providers_insert_input>;
  on_conflict?: Maybe<auth_account_providers_on_conflict>;
}

/** Boolean expression to filter rows from the table "auth.account_providers". All fields are combined with a logical 'AND'. */
export interface auth_account_providers_bool_exp {
  _and?: Maybe<Array<Maybe<auth_account_providers_bool_exp>>>;
  _not?: Maybe<auth_account_providers_bool_exp>;
  _or?: Maybe<Array<Maybe<auth_account_providers_bool_exp>>>;
  account?: Maybe<auth_accounts_bool_exp>;
  account_id?: Maybe<uuid_comparison_exp>;
  auth_provider?: Maybe<String_comparison_exp>;
  auth_provider_unique_id?: Maybe<String_comparison_exp>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  provider?: Maybe<auth_providers_bool_exp>;
  updated_at?: Maybe<timestamptz_comparison_exp>;
}

/** unique or primary key constraints on table "auth.account_providers" */
export enum auth_account_providers_constraint {
  /** unique or primary key constraint */
  account_providers_account_id_auth_provider_key = "account_providers_account_id_auth_provider_key",
  /** unique or primary key constraint */
  account_providers_auth_provider_auth_provider_unique_id_key = "account_providers_auth_provider_auth_provider_unique_id_key",
  /** unique or primary key constraint */
  account_providers_pkey = "account_providers_pkey",
}

/** input type for inserting data into table "auth.account_providers" */
export interface auth_account_providers_insert_input {
  account?: Maybe<auth_accounts_obj_rel_insert_input>;
  account_id?: Maybe<Scalars["uuid"]>;
  auth_provider?: Maybe<Scalars["String"]>;
  auth_provider_unique_id?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  provider?: Maybe<auth_providers_obj_rel_insert_input>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
}

/** order by max() on columns of table "auth.account_providers" */
export interface auth_account_providers_max_order_by {
  account_id?: Maybe<order_by>;
  auth_provider?: Maybe<order_by>;
  auth_provider_unique_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
}

/** order by min() on columns of table "auth.account_providers" */
export interface auth_account_providers_min_order_by {
  account_id?: Maybe<order_by>;
  auth_provider?: Maybe<order_by>;
  auth_provider_unique_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "auth.account_providers" */
export interface auth_account_providers_obj_rel_insert_input {
  data: auth_account_providers_insert_input;
  on_conflict?: Maybe<auth_account_providers_on_conflict>;
}

/** on conflict condition type for table "auth.account_providers" */
export interface auth_account_providers_on_conflict {
  constraint: auth_account_providers_constraint;
  update_columns: Array<auth_account_providers_update_column>;
  where?: Maybe<auth_account_providers_bool_exp>;
}

/** ordering options when selecting data from "auth.account_providers" */
export interface auth_account_providers_order_by {
  account?: Maybe<auth_accounts_order_by>;
  account_id?: Maybe<order_by>;
  auth_provider?: Maybe<order_by>;
  auth_provider_unique_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  provider?: Maybe<auth_providers_order_by>;
  updated_at?: Maybe<order_by>;
}

/** primary key columns input for table: "auth.account_providers" */
export interface auth_account_providers_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "auth.account_providers" */
export enum auth_account_providers_select_column {
  /** column name */
  account_id = "account_id",
  /** column name */
  auth_provider = "auth_provider",
  /** column name */
  auth_provider_unique_id = "auth_provider_unique_id",
  /** column name */
  created_at = "created_at",
  /** column name */
  id = "id",
  /** column name */
  updated_at = "updated_at",
}

/** input type for updating data in table "auth.account_providers" */
export interface auth_account_providers_set_input {
  account_id?: Maybe<Scalars["uuid"]>;
  auth_provider?: Maybe<Scalars["String"]>;
  auth_provider_unique_id?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
}

/** update columns of table "auth.account_providers" */
export enum auth_account_providers_update_column {
  /** column name */
  account_id = "account_id",
  /** column name */
  auth_provider = "auth_provider",
  /** column name */
  auth_provider_unique_id = "auth_provider_unique_id",
  /** column name */
  created_at = "created_at",
  /** column name */
  id = "id",
  /** column name */
  updated_at = "updated_at",
}

/** order by aggregate values of table "auth.account_roles" */
export interface auth_account_roles_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<auth_account_roles_max_order_by>;
  min?: Maybe<auth_account_roles_min_order_by>;
}

/** input type for inserting array relation for remote table "auth.account_roles" */
export interface auth_account_roles_arr_rel_insert_input {
  data: Array<auth_account_roles_insert_input>;
  on_conflict?: Maybe<auth_account_roles_on_conflict>;
}

/** Boolean expression to filter rows from the table "auth.account_roles". All fields are combined with a logical 'AND'. */
export interface auth_account_roles_bool_exp {
  _and?: Maybe<Array<Maybe<auth_account_roles_bool_exp>>>;
  _not?: Maybe<auth_account_roles_bool_exp>;
  _or?: Maybe<Array<Maybe<auth_account_roles_bool_exp>>>;
  account?: Maybe<auth_accounts_bool_exp>;
  account_id?: Maybe<uuid_comparison_exp>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  role?: Maybe<String_comparison_exp>;
  roleByRole?: Maybe<auth_roles_bool_exp>;
}

/** unique or primary key constraints on table "auth.account_roles" */
export enum auth_account_roles_constraint {
  /** unique or primary key constraint */
  account_roles_pkey = "account_roles_pkey",
  /** unique or primary key constraint */
  user_roles_account_id_role_key = "user_roles_account_id_role_key",
}

/** input type for inserting data into table "auth.account_roles" */
export interface auth_account_roles_insert_input {
  account?: Maybe<auth_accounts_obj_rel_insert_input>;
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  role?: Maybe<Scalars["String"]>;
  roleByRole?: Maybe<auth_roles_obj_rel_insert_input>;
}

/** order by max() on columns of table "auth.account_roles" */
export interface auth_account_roles_max_order_by {
  account_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  role?: Maybe<order_by>;
}

/** order by min() on columns of table "auth.account_roles" */
export interface auth_account_roles_min_order_by {
  account_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  role?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "auth.account_roles" */
export interface auth_account_roles_obj_rel_insert_input {
  data: auth_account_roles_insert_input;
  on_conflict?: Maybe<auth_account_roles_on_conflict>;
}

/** on conflict condition type for table "auth.account_roles" */
export interface auth_account_roles_on_conflict {
  constraint: auth_account_roles_constraint;
  update_columns: Array<auth_account_roles_update_column>;
  where?: Maybe<auth_account_roles_bool_exp>;
}

/** ordering options when selecting data from "auth.account_roles" */
export interface auth_account_roles_order_by {
  account?: Maybe<auth_accounts_order_by>;
  account_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  id?: Maybe<order_by>;
  role?: Maybe<order_by>;
  roleByRole?: Maybe<auth_roles_order_by>;
}

/** primary key columns input for table: "auth.account_roles" */
export interface auth_account_roles_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "auth.account_roles" */
export enum auth_account_roles_select_column {
  /** column name */
  account_id = "account_id",
  /** column name */
  created_at = "created_at",
  /** column name */
  id = "id",
  /** column name */
  role = "role",
}

/** input type for updating data in table "auth.account_roles" */
export interface auth_account_roles_set_input {
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  role?: Maybe<Scalars["String"]>;
}

/** update columns of table "auth.account_roles" */
export enum auth_account_roles_update_column {
  /** column name */
  account_id = "account_id",
  /** column name */
  created_at = "created_at",
  /** column name */
  id = "id",
  /** column name */
  role = "role",
}

/** order by aggregate values of table "auth.accounts" */
export interface auth_accounts_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<auth_accounts_max_order_by>;
  min?: Maybe<auth_accounts_min_order_by>;
}

/** append existing jsonb value of filtered columns with new jsonb value */
export interface auth_accounts_append_input {
  custom_register_data?: Maybe<Scalars["jsonb"]>;
}

/** input type for inserting array relation for remote table "auth.accounts" */
export interface auth_accounts_arr_rel_insert_input {
  data: Array<auth_accounts_insert_input>;
  on_conflict?: Maybe<auth_accounts_on_conflict>;
}

/** Boolean expression to filter rows from the table "auth.accounts". All fields are combined with a logical 'AND'. */
export interface auth_accounts_bool_exp {
  _and?: Maybe<Array<Maybe<auth_accounts_bool_exp>>>;
  _not?: Maybe<auth_accounts_bool_exp>;
  _or?: Maybe<Array<Maybe<auth_accounts_bool_exp>>>;
  account_providers?: Maybe<auth_account_providers_bool_exp>;
  account_roles?: Maybe<auth_account_roles_bool_exp>;
  active?: Maybe<Boolean_comparison_exp>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  custom_register_data?: Maybe<jsonb_comparison_exp>;
  default_role?: Maybe<String_comparison_exp>;
  email?: Maybe<citext_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  is_anonymous?: Maybe<Boolean_comparison_exp>;
  mfa_enabled?: Maybe<Boolean_comparison_exp>;
  new_email?: Maybe<citext_comparison_exp>;
  otp_secret?: Maybe<String_comparison_exp>;
  password_hash?: Maybe<String_comparison_exp>;
  refresh_tokens?: Maybe<auth_refresh_tokens_bool_exp>;
  role?: Maybe<auth_roles_bool_exp>;
  ticket?: Maybe<uuid_comparison_exp>;
  ticket_expires_at?: Maybe<timestamptz_comparison_exp>;
  updated_at?: Maybe<timestamptz_comparison_exp>;
  user?: Maybe<users_bool_exp>;
  user_id?: Maybe<uuid_comparison_exp>;
}

/** unique or primary key constraints on table "auth.accounts" */
export enum auth_accounts_constraint {
  /** unique or primary key constraint */
  accounts_email_key = "accounts_email_key",
  /** unique or primary key constraint */
  accounts_new_email_key = "accounts_new_email_key",
  /** unique or primary key constraint */
  accounts_pkey = "accounts_pkey",
  /** unique or primary key constraint */
  accounts_user_id_key = "accounts_user_id_key",
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export interface auth_accounts_delete_at_path_input {
  custom_register_data?: Maybe<Array<Maybe<Scalars["String"]>>>;
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export interface auth_accounts_delete_elem_input {
  custom_register_data?: Maybe<Scalars["Int"]>;
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export interface auth_accounts_delete_key_input {
  custom_register_data?: Maybe<Scalars["String"]>;
}

/** input type for inserting data into table "auth.accounts" */
export interface auth_accounts_insert_input {
  account_providers?: Maybe<auth_account_providers_arr_rel_insert_input>;
  account_roles?: Maybe<auth_account_roles_arr_rel_insert_input>;
  active?: Maybe<Scalars["Boolean"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  custom_register_data?: Maybe<Scalars["jsonb"]>;
  default_role?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["citext"]>;
  id?: Maybe<Scalars["uuid"]>;
  is_anonymous?: Maybe<Scalars["Boolean"]>;
  mfa_enabled?: Maybe<Scalars["Boolean"]>;
  new_email?: Maybe<Scalars["citext"]>;
  otp_secret?: Maybe<Scalars["String"]>;
  password_hash?: Maybe<Scalars["String"]>;
  refresh_tokens?: Maybe<auth_refresh_tokens_arr_rel_insert_input>;
  role?: Maybe<auth_roles_obj_rel_insert_input>;
  ticket?: Maybe<Scalars["uuid"]>;
  ticket_expires_at?: Maybe<Scalars["timestamptz"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user?: Maybe<users_obj_rel_insert_input>;
  user_id?: Maybe<Scalars["uuid"]>;
}

/** order by max() on columns of table "auth.accounts" */
export interface auth_accounts_max_order_by {
  created_at?: Maybe<order_by>;
  default_role?: Maybe<order_by>;
  email?: Maybe<order_by>;
  id?: Maybe<order_by>;
  new_email?: Maybe<order_by>;
  otp_secret?: Maybe<order_by>;
  password_hash?: Maybe<order_by>;
  ticket?: Maybe<order_by>;
  ticket_expires_at?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** order by min() on columns of table "auth.accounts" */
export interface auth_accounts_min_order_by {
  created_at?: Maybe<order_by>;
  default_role?: Maybe<order_by>;
  email?: Maybe<order_by>;
  id?: Maybe<order_by>;
  new_email?: Maybe<order_by>;
  otp_secret?: Maybe<order_by>;
  password_hash?: Maybe<order_by>;
  ticket?: Maybe<order_by>;
  ticket_expires_at?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  user_id?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "auth.accounts" */
export interface auth_accounts_obj_rel_insert_input {
  data: auth_accounts_insert_input;
  on_conflict?: Maybe<auth_accounts_on_conflict>;
}

/** on conflict condition type for table "auth.accounts" */
export interface auth_accounts_on_conflict {
  constraint: auth_accounts_constraint;
  update_columns: Array<auth_accounts_update_column>;
  where?: Maybe<auth_accounts_bool_exp>;
}

/** ordering options when selecting data from "auth.accounts" */
export interface auth_accounts_order_by {
  account_providers_aggregate?: Maybe<auth_account_providers_aggregate_order_by>;
  account_roles_aggregate?: Maybe<auth_account_roles_aggregate_order_by>;
  active?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  custom_register_data?: Maybe<order_by>;
  default_role?: Maybe<order_by>;
  email?: Maybe<order_by>;
  id?: Maybe<order_by>;
  is_anonymous?: Maybe<order_by>;
  mfa_enabled?: Maybe<order_by>;
  new_email?: Maybe<order_by>;
  otp_secret?: Maybe<order_by>;
  password_hash?: Maybe<order_by>;
  refresh_tokens_aggregate?: Maybe<auth_refresh_tokens_aggregate_order_by>;
  role?: Maybe<auth_roles_order_by>;
  ticket?: Maybe<order_by>;
  ticket_expires_at?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
  user?: Maybe<users_order_by>;
  user_id?: Maybe<order_by>;
}

/** primary key columns input for table: "auth.accounts" */
export interface auth_accounts_pk_columns_input {
  id: Scalars["uuid"];
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export interface auth_accounts_prepend_input {
  custom_register_data?: Maybe<Scalars["jsonb"]>;
}

/** select columns of table "auth.accounts" */
export enum auth_accounts_select_column {
  /** column name */
  active = "active",
  /** column name */
  created_at = "created_at",
  /** column name */
  custom_register_data = "custom_register_data",
  /** column name */
  default_role = "default_role",
  /** column name */
  email = "email",
  /** column name */
  id = "id",
  /** column name */
  is_anonymous = "is_anonymous",
  /** column name */
  mfa_enabled = "mfa_enabled",
  /** column name */
  new_email = "new_email",
  /** column name */
  otp_secret = "otp_secret",
  /** column name */
  password_hash = "password_hash",
  /** column name */
  ticket = "ticket",
  /** column name */
  ticket_expires_at = "ticket_expires_at",
  /** column name */
  updated_at = "updated_at",
  /** column name */
  user_id = "user_id",
}

/** input type for updating data in table "auth.accounts" */
export interface auth_accounts_set_input {
  active?: Maybe<Scalars["Boolean"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  custom_register_data?: Maybe<Scalars["jsonb"]>;
  default_role?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["citext"]>;
  id?: Maybe<Scalars["uuid"]>;
  is_anonymous?: Maybe<Scalars["Boolean"]>;
  mfa_enabled?: Maybe<Scalars["Boolean"]>;
  new_email?: Maybe<Scalars["citext"]>;
  otp_secret?: Maybe<Scalars["String"]>;
  password_hash?: Maybe<Scalars["String"]>;
  ticket?: Maybe<Scalars["uuid"]>;
  ticket_expires_at?: Maybe<Scalars["timestamptz"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
  user_id?: Maybe<Scalars["uuid"]>;
}

/** update columns of table "auth.accounts" */
export enum auth_accounts_update_column {
  /** column name */
  active = "active",
  /** column name */
  created_at = "created_at",
  /** column name */
  custom_register_data = "custom_register_data",
  /** column name */
  default_role = "default_role",
  /** column name */
  email = "email",
  /** column name */
  id = "id",
  /** column name */
  is_anonymous = "is_anonymous",
  /** column name */
  mfa_enabled = "mfa_enabled",
  /** column name */
  new_email = "new_email",
  /** column name */
  otp_secret = "otp_secret",
  /** column name */
  password_hash = "password_hash",
  /** column name */
  ticket = "ticket",
  /** column name */
  ticket_expires_at = "ticket_expires_at",
  /** column name */
  updated_at = "updated_at",
  /** column name */
  user_id = "user_id",
}

/** order by aggregate values of table "auth.providers" */
export interface auth_providers_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<auth_providers_max_order_by>;
  min?: Maybe<auth_providers_min_order_by>;
}

/** input type for inserting array relation for remote table "auth.providers" */
export interface auth_providers_arr_rel_insert_input {
  data: Array<auth_providers_insert_input>;
  on_conflict?: Maybe<auth_providers_on_conflict>;
}

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export interface auth_providers_bool_exp {
  _and?: Maybe<Array<Maybe<auth_providers_bool_exp>>>;
  _not?: Maybe<auth_providers_bool_exp>;
  _or?: Maybe<Array<Maybe<auth_providers_bool_exp>>>;
  account_providers?: Maybe<auth_account_providers_bool_exp>;
  provider?: Maybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "auth.providers" */
export enum auth_providers_constraint {
  /** unique or primary key constraint */
  providers_pkey = "providers_pkey",
}

/** input type for inserting data into table "auth.providers" */
export interface auth_providers_insert_input {
  account_providers?: Maybe<auth_account_providers_arr_rel_insert_input>;
  provider?: Maybe<Scalars["String"]>;
}

/** order by max() on columns of table "auth.providers" */
export interface auth_providers_max_order_by {
  provider?: Maybe<order_by>;
}

/** order by min() on columns of table "auth.providers" */
export interface auth_providers_min_order_by {
  provider?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "auth.providers" */
export interface auth_providers_obj_rel_insert_input {
  data: auth_providers_insert_input;
  on_conflict?: Maybe<auth_providers_on_conflict>;
}

/** on conflict condition type for table "auth.providers" */
export interface auth_providers_on_conflict {
  constraint: auth_providers_constraint;
  update_columns: Array<auth_providers_update_column>;
  where?: Maybe<auth_providers_bool_exp>;
}

/** ordering options when selecting data from "auth.providers" */
export interface auth_providers_order_by {
  account_providers_aggregate?: Maybe<auth_account_providers_aggregate_order_by>;
  provider?: Maybe<order_by>;
}

/** primary key columns input for table: "auth.providers" */
export interface auth_providers_pk_columns_input {
  provider: Scalars["String"];
}

/** select columns of table "auth.providers" */
export enum auth_providers_select_column {
  /** column name */
  provider = "provider",
}

/** input type for updating data in table "auth.providers" */
export interface auth_providers_set_input {
  provider?: Maybe<Scalars["String"]>;
}

/** update columns of table "auth.providers" */
export enum auth_providers_update_column {
  /** column name */
  provider = "provider",
}

/** order by aggregate values of table "auth.refresh_tokens" */
export interface auth_refresh_tokens_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<auth_refresh_tokens_max_order_by>;
  min?: Maybe<auth_refresh_tokens_min_order_by>;
}

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export interface auth_refresh_tokens_arr_rel_insert_input {
  data: Array<auth_refresh_tokens_insert_input>;
  on_conflict?: Maybe<auth_refresh_tokens_on_conflict>;
}

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export interface auth_refresh_tokens_bool_exp {
  _and?: Maybe<Array<Maybe<auth_refresh_tokens_bool_exp>>>;
  _not?: Maybe<auth_refresh_tokens_bool_exp>;
  _or?: Maybe<Array<Maybe<auth_refresh_tokens_bool_exp>>>;
  account?: Maybe<auth_accounts_bool_exp>;
  account_id?: Maybe<uuid_comparison_exp>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  expires_at?: Maybe<timestamptz_comparison_exp>;
  refresh_token?: Maybe<uuid_comparison_exp>;
}

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum auth_refresh_tokens_constraint {
  /** unique or primary key constraint */
  refresh_tokens_pkey = "refresh_tokens_pkey",
}

/** input type for inserting data into table "auth.refresh_tokens" */
export interface auth_refresh_tokens_insert_input {
  account?: Maybe<auth_accounts_obj_rel_insert_input>;
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires_at?: Maybe<Scalars["timestamptz"]>;
  refresh_token?: Maybe<Scalars["uuid"]>;
}

/** order by max() on columns of table "auth.refresh_tokens" */
export interface auth_refresh_tokens_max_order_by {
  account_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  expires_at?: Maybe<order_by>;
  refresh_token?: Maybe<order_by>;
}

/** order by min() on columns of table "auth.refresh_tokens" */
export interface auth_refresh_tokens_min_order_by {
  account_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  expires_at?: Maybe<order_by>;
  refresh_token?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "auth.refresh_tokens" */
export interface auth_refresh_tokens_obj_rel_insert_input {
  data: auth_refresh_tokens_insert_input;
  on_conflict?: Maybe<auth_refresh_tokens_on_conflict>;
}

/** on conflict condition type for table "auth.refresh_tokens" */
export interface auth_refresh_tokens_on_conflict {
  constraint: auth_refresh_tokens_constraint;
  update_columns: Array<auth_refresh_tokens_update_column>;
  where?: Maybe<auth_refresh_tokens_bool_exp>;
}

/** ordering options when selecting data from "auth.refresh_tokens" */
export interface auth_refresh_tokens_order_by {
  account?: Maybe<auth_accounts_order_by>;
  account_id?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  expires_at?: Maybe<order_by>;
  refresh_token?: Maybe<order_by>;
}

/** primary key columns input for table: "auth.refresh_tokens" */
export interface auth_refresh_tokens_pk_columns_input {
  refresh_token: Scalars["uuid"];
}

/** select columns of table "auth.refresh_tokens" */
export enum auth_refresh_tokens_select_column {
  /** column name */
  account_id = "account_id",
  /** column name */
  created_at = "created_at",
  /** column name */
  expires_at = "expires_at",
  /** column name */
  refresh_token = "refresh_token",
}

/** input type for updating data in table "auth.refresh_tokens" */
export interface auth_refresh_tokens_set_input {
  account_id?: Maybe<Scalars["uuid"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  expires_at?: Maybe<Scalars["timestamptz"]>;
  refresh_token?: Maybe<Scalars["uuid"]>;
}

/** update columns of table "auth.refresh_tokens" */
export enum auth_refresh_tokens_update_column {
  /** column name */
  account_id = "account_id",
  /** column name */
  created_at = "created_at",
  /** column name */
  expires_at = "expires_at",
  /** column name */
  refresh_token = "refresh_token",
}

/** order by aggregate values of table "auth.roles" */
export interface auth_roles_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<auth_roles_max_order_by>;
  min?: Maybe<auth_roles_min_order_by>;
}

/** input type for inserting array relation for remote table "auth.roles" */
export interface auth_roles_arr_rel_insert_input {
  data: Array<auth_roles_insert_input>;
  on_conflict?: Maybe<auth_roles_on_conflict>;
}

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export interface auth_roles_bool_exp {
  _and?: Maybe<Array<Maybe<auth_roles_bool_exp>>>;
  _not?: Maybe<auth_roles_bool_exp>;
  _or?: Maybe<Array<Maybe<auth_roles_bool_exp>>>;
  account_roles?: Maybe<auth_account_roles_bool_exp>;
  accounts?: Maybe<auth_accounts_bool_exp>;
  role?: Maybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "auth.roles" */
export enum auth_roles_constraint {
  /** unique or primary key constraint */
  roles_pkey = "roles_pkey",
}

/** input type for inserting data into table "auth.roles" */
export interface auth_roles_insert_input {
  account_roles?: Maybe<auth_account_roles_arr_rel_insert_input>;
  accounts?: Maybe<auth_accounts_arr_rel_insert_input>;
  role?: Maybe<Scalars["String"]>;
}

/** order by max() on columns of table "auth.roles" */
export interface auth_roles_max_order_by {
  role?: Maybe<order_by>;
}

/** order by min() on columns of table "auth.roles" */
export interface auth_roles_min_order_by {
  role?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "auth.roles" */
export interface auth_roles_obj_rel_insert_input {
  data: auth_roles_insert_input;
  on_conflict?: Maybe<auth_roles_on_conflict>;
}

/** on conflict condition type for table "auth.roles" */
export interface auth_roles_on_conflict {
  constraint: auth_roles_constraint;
  update_columns: Array<auth_roles_update_column>;
  where?: Maybe<auth_roles_bool_exp>;
}

/** ordering options when selecting data from "auth.roles" */
export interface auth_roles_order_by {
  account_roles_aggregate?: Maybe<auth_account_roles_aggregate_order_by>;
  accounts_aggregate?: Maybe<auth_accounts_aggregate_order_by>;
  role?: Maybe<order_by>;
}

/** primary key columns input for table: "auth.roles" */
export interface auth_roles_pk_columns_input {
  role: Scalars["String"];
}

/** select columns of table "auth.roles" */
export enum auth_roles_select_column {
  /** column name */
  role = "role",
}

/** input type for updating data in table "auth.roles" */
export interface auth_roles_set_input {
  role?: Maybe<Scalars["String"]>;
}

/** update columns of table "auth.roles" */
export enum auth_roles_update_column {
  /** column name */
  role = "role",
}

/** order by aggregate values of table "authorships" */
export interface authorships_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<authorships_max_order_by>;
  min?: Maybe<authorships_min_order_by>;
}

/** input type for inserting array relation for remote table "authorships" */
export interface authorships_arr_rel_insert_input {
  data: Array<authorships_insert_input>;
  on_conflict?: Maybe<authorships_on_conflict>;
}

/** Boolean expression to filter rows from the table "authorships". All fields are combined with a logical 'AND'. */
export interface authorships_bool_exp {
  _and?: Maybe<Array<Maybe<authorships_bool_exp>>>;
  _not?: Maybe<authorships_bool_exp>;
  _or?: Maybe<Array<Maybe<authorships_bool_exp>>>;
  content?: Maybe<contents_bool_exp>;
  contentId?: Maybe<uuid_comparison_exp>;
  email?: Maybe<String_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  identity?: Maybe<identities_bool_exp>;
  name?: Maybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "authorships" */
export enum authorships_constraint {
  /** unique or primary key constraint */
  authorships_pkey = "authorships_pkey",
}

/** input type for inserting data into table "authorships" */
export interface authorships_insert_input {
  content?: Maybe<contents_obj_rel_insert_input>;
  contentId?: Maybe<Scalars["uuid"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  identity?: Maybe<identities_obj_rel_insert_input>;
  name?: Maybe<Scalars["String"]>;
}

/** order by max() on columns of table "authorships" */
export interface authorships_max_order_by {
  contentId?: Maybe<order_by>;
  email?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
}

/** order by min() on columns of table "authorships" */
export interface authorships_min_order_by {
  contentId?: Maybe<order_by>;
  email?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "authorships" */
export interface authorships_obj_rel_insert_input {
  data: authorships_insert_input;
  on_conflict?: Maybe<authorships_on_conflict>;
}

/** on conflict condition type for table "authorships" */
export interface authorships_on_conflict {
  constraint: authorships_constraint;
  update_columns: Array<authorships_update_column>;
  where?: Maybe<authorships_bool_exp>;
}

/** ordering options when selecting data from "authorships" */
export interface authorships_order_by {
  content?: Maybe<contents_order_by>;
  contentId?: Maybe<order_by>;
  email?: Maybe<order_by>;
  id?: Maybe<order_by>;
  identity?: Maybe<identities_order_by>;
  name?: Maybe<order_by>;
}

/** primary key columns input for table: "authorships" */
export interface authorships_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "authorships" */
export enum authorships_select_column {
  /** column name */
  contentId = "contentId",
  /** column name */
  email = "email",
  /** column name */
  id = "id",
  /** column name */
  name = "name",
}

/** input type for updating data in table "authorships" */
export interface authorships_set_input {
  contentId?: Maybe<Scalars["uuid"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
}

/** update columns of table "authorships" */
export enum authorships_update_column {
  /** column name */
  contentId = "contentId",
  /** column name */
  email = "email",
  /** column name */
  id = "id",
  /** column name */
  name = "name",
}

/** expression to compare columns of type citext. All fields are combined with logical 'AND'. */
export interface citext_comparison_exp {
  _eq?: Maybe<Scalars["citext"]>;
  _gt?: Maybe<Scalars["citext"]>;
  _gte?: Maybe<Scalars["citext"]>;
  _ilike?: Maybe<Scalars["String"]>;
  _in?: Maybe<Array<Scalars["citext"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _like?: Maybe<Scalars["String"]>;
  _lt?: Maybe<Scalars["citext"]>;
  _lte?: Maybe<Scalars["citext"]>;
  _neq?: Maybe<Scalars["citext"]>;
  _nilike?: Maybe<Scalars["String"]>;
  _nin?: Maybe<Array<Scalars["citext"]>>;
  _nlike?: Maybe<Scalars["String"]>;
  _nsimilar?: Maybe<Scalars["String"]>;
  _similar?: Maybe<Scalars["String"]>;
}

/** order by aggregate values of table "contents" */
export interface contents_aggregate_order_by {
  avg?: Maybe<contents_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<contents_max_order_by>;
  min?: Maybe<contents_min_order_by>;
  stddev?: Maybe<contents_stddev_order_by>;
  stddev_pop?: Maybe<contents_stddev_pop_order_by>;
  stddev_samp?: Maybe<contents_stddev_samp_order_by>;
  sum?: Maybe<contents_sum_order_by>;
  var_pop?: Maybe<contents_var_pop_order_by>;
  var_samp?: Maybe<contents_var_samp_order_by>;
  variance?: Maybe<contents_variance_order_by>;
}

/** input type for inserting array relation for remote table "contents" */
export interface contents_arr_rel_insert_input {
  data: Array<contents_insert_input>;
  on_conflict?: Maybe<contents_on_conflict>;
}

/** order by avg() on columns of table "contents" */
export interface contents_avg_order_by {
  priority?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "contents". All fields are combined with a logical 'AND'. */
export interface contents_bool_exp {
  _and?: Maybe<Array<Maybe<contents_bool_exp>>>;
  _not?: Maybe<contents_bool_exp>;
  _or?: Maybe<Array<Maybe<contents_bool_exp>>>;
  authors?: Maybe<authorships_bool_exp>;
  children?: Maybe<contents_bool_exp>;
  createdAt?: Maybe<timestamptz_comparison_exp>;
  creator?: Maybe<users_bool_exp>;
  creatorId?: Maybe<uuid_comparison_exp>;
  data?: Maybe<String_comparison_exp>;
  file?: Maybe<files_bool_exp>;
  fileId?: Maybe<uuid_comparison_exp>;
  folder?: Maybe<folders_bool_exp>;
  folderId?: Maybe<uuid_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  name?: Maybe<String_comparison_exp>;
  parent?: Maybe<contents_bool_exp>;
  parentId?: Maybe<uuid_comparison_exp>;
  polls?: Maybe<polls_bool_exp>;
  priority?: Maybe<Int_comparison_exp>;
  published?: Maybe<Boolean_comparison_exp>;
  updatedAt?: Maybe<timestamptz_comparison_exp>;
}

/** unique or primary key constraints on table "contents" */
export enum contents_constraint {
  /** unique or primary key constraint */
  contents_pkey = "contents_pkey",
}

/** input type for incrementing integer column in table "contents" */
export interface contents_inc_input {
  priority?: Maybe<Scalars["Int"]>;
}

/** input type for inserting data into table "contents" */
export interface contents_insert_input {
  authors?: Maybe<authorships_arr_rel_insert_input>;
  children?: Maybe<contents_arr_rel_insert_input>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  creator?: Maybe<users_obj_rel_insert_input>;
  creatorId?: Maybe<Scalars["uuid"]>;
  data?: Maybe<Scalars["String"]>;
  file?: Maybe<files_obj_rel_insert_input>;
  fileId?: Maybe<Scalars["uuid"]>;
  folder?: Maybe<folders_obj_rel_insert_input>;
  folderId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  parent?: Maybe<contents_obj_rel_insert_input>;
  parentId?: Maybe<Scalars["uuid"]>;
  polls?: Maybe<polls_arr_rel_insert_input>;
  priority?: Maybe<Scalars["Int"]>;
  published?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
}

/** order by max() on columns of table "contents" */
export interface contents_max_order_by {
  createdAt?: Maybe<order_by>;
  creatorId?: Maybe<order_by>;
  data?: Maybe<order_by>;
  fileId?: Maybe<order_by>;
  folderId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
  parentId?: Maybe<order_by>;
  priority?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
}

/** order by min() on columns of table "contents" */
export interface contents_min_order_by {
  createdAt?: Maybe<order_by>;
  creatorId?: Maybe<order_by>;
  data?: Maybe<order_by>;
  fileId?: Maybe<order_by>;
  folderId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
  parentId?: Maybe<order_by>;
  priority?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "contents" */
export interface contents_obj_rel_insert_input {
  data: contents_insert_input;
  on_conflict?: Maybe<contents_on_conflict>;
}

/** on conflict condition type for table "contents" */
export interface contents_on_conflict {
  constraint: contents_constraint;
  update_columns: Array<contents_update_column>;
  where?: Maybe<contents_bool_exp>;
}

/** ordering options when selecting data from "contents" */
export interface contents_order_by {
  authors_aggregate?: Maybe<authorships_aggregate_order_by>;
  children_aggregate?: Maybe<contents_aggregate_order_by>;
  createdAt?: Maybe<order_by>;
  creator?: Maybe<users_order_by>;
  creatorId?: Maybe<order_by>;
  data?: Maybe<order_by>;
  file?: Maybe<files_order_by>;
  fileId?: Maybe<order_by>;
  folder?: Maybe<folders_order_by>;
  folderId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
  parent?: Maybe<contents_order_by>;
  parentId?: Maybe<order_by>;
  polls_aggregate?: Maybe<polls_aggregate_order_by>;
  priority?: Maybe<order_by>;
  published?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
}

/** primary key columns input for table: "contents" */
export interface contents_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "contents" */
export enum contents_select_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  creatorId = "creatorId",
  /** column name */
  data = "data",
  /** column name */
  fileId = "fileId",
  /** column name */
  folderId = "folderId",
  /** column name */
  id = "id",
  /** column name */
  name = "name",
  /** column name */
  parentId = "parentId",
  /** column name */
  priority = "priority",
  /** column name */
  published = "published",
  /** column name */
  updatedAt = "updatedAt",
}

/** input type for updating data in table "contents" */
export interface contents_set_input {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  creatorId?: Maybe<Scalars["uuid"]>;
  data?: Maybe<Scalars["String"]>;
  fileId?: Maybe<Scalars["uuid"]>;
  folderId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  parentId?: Maybe<Scalars["uuid"]>;
  priority?: Maybe<Scalars["Int"]>;
  published?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
}

/** order by stddev() on columns of table "contents" */
export interface contents_stddev_order_by {
  priority?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "contents" */
export interface contents_stddev_pop_order_by {
  priority?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "contents" */
export interface contents_stddev_samp_order_by {
  priority?: Maybe<order_by>;
}

/** order by sum() on columns of table "contents" */
export interface contents_sum_order_by {
  priority?: Maybe<order_by>;
}

/** update columns of table "contents" */
export enum contents_update_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  creatorId = "creatorId",
  /** column name */
  data = "data",
  /** column name */
  fileId = "fileId",
  /** column name */
  folderId = "folderId",
  /** column name */
  id = "id",
  /** column name */
  name = "name",
  /** column name */
  parentId = "parentId",
  /** column name */
  priority = "priority",
  /** column name */
  published = "published",
  /** column name */
  updatedAt = "updatedAt",
}

/** order by var_pop() on columns of table "contents" */
export interface contents_var_pop_order_by {
  priority?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "contents" */
export interface contents_var_samp_order_by {
  priority?: Maybe<order_by>;
}

/** order by variance() on columns of table "contents" */
export interface contents_variance_order_by {
  priority?: Maybe<order_by>;
}

/** order by aggregate values of table "events" */
export interface events_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<events_max_order_by>;
  min?: Maybe<events_min_order_by>;
}

/** input type for inserting array relation for remote table "events" */
export interface events_arr_rel_insert_input {
  data: Array<events_insert_input>;
  on_conflict?: Maybe<events_on_conflict>;
}

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export interface events_bool_exp {
  _and?: Maybe<Array<Maybe<events_bool_exp>>>;
  _not?: Maybe<events_bool_exp>;
  _or?: Maybe<Array<Maybe<events_bool_exp>>>;
  admissions?: Maybe<admissions_bool_exp>;
  content?: Maybe<contents_bool_exp>;
  contentId?: Maybe<uuid_comparison_exp>;
  createdAt?: Maybe<timestamptz_comparison_exp>;
  folder?: Maybe<folders_bool_exp>;
  folderId?: Maybe<uuid_comparison_exp>;
  group?: Maybe<groups_bool_exp>;
  groupId?: Maybe<uuid_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  lockSpeak?: Maybe<Boolean_comparison_exp>;
  name?: Maybe<String_comparison_exp>;
  poll?: Maybe<polls_bool_exp>;
  pollId?: Maybe<uuid_comparison_exp>;
  shortName?: Maybe<String_comparison_exp>;
  timer?: Maybe<timers_bool_exp>;
  timerId?: Maybe<uuid_comparison_exp>;
}

/** unique or primary key constraints on table "events" */
export enum events_constraint {
  /** unique or primary key constraint */
  events_pkey = "events_pkey",
}

/** input type for inserting data into table "events" */
export interface events_insert_input {
  admissions?: Maybe<admissions_arr_rel_insert_input>;
  content?: Maybe<contents_obj_rel_insert_input>;
  contentId?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  folder?: Maybe<folders_obj_rel_insert_input>;
  folderId?: Maybe<Scalars["uuid"]>;
  group?: Maybe<groups_obj_rel_insert_input>;
  groupId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  lockSpeak?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  poll?: Maybe<polls_obj_rel_insert_input>;
  pollId?: Maybe<Scalars["uuid"]>;
  shortName?: Maybe<Scalars["String"]>;
  timer?: Maybe<timers_obj_rel_insert_input>;
  timerId?: Maybe<Scalars["uuid"]>;
}

/** order by max() on columns of table "events" */
export interface events_max_order_by {
  contentId?: Maybe<order_by>;
  createdAt?: Maybe<order_by>;
  folderId?: Maybe<order_by>;
  groupId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
  pollId?: Maybe<order_by>;
  shortName?: Maybe<order_by>;
  timerId?: Maybe<order_by>;
}

/** order by min() on columns of table "events" */
export interface events_min_order_by {
  contentId?: Maybe<order_by>;
  createdAt?: Maybe<order_by>;
  folderId?: Maybe<order_by>;
  groupId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
  pollId?: Maybe<order_by>;
  shortName?: Maybe<order_by>;
  timerId?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "events" */
export interface events_obj_rel_insert_input {
  data: events_insert_input;
  on_conflict?: Maybe<events_on_conflict>;
}

/** on conflict condition type for table "events" */
export interface events_on_conflict {
  constraint: events_constraint;
  update_columns: Array<events_update_column>;
  where?: Maybe<events_bool_exp>;
}

/** ordering options when selecting data from "events" */
export interface events_order_by {
  admissions_aggregate?: Maybe<admissions_aggregate_order_by>;
  content?: Maybe<contents_order_by>;
  contentId?: Maybe<order_by>;
  createdAt?: Maybe<order_by>;
  folder?: Maybe<folders_order_by>;
  folderId?: Maybe<order_by>;
  group?: Maybe<groups_order_by>;
  groupId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  lockSpeak?: Maybe<order_by>;
  name?: Maybe<order_by>;
  poll?: Maybe<polls_order_by>;
  pollId?: Maybe<order_by>;
  shortName?: Maybe<order_by>;
  timer?: Maybe<timers_order_by>;
  timerId?: Maybe<order_by>;
}

/** primary key columns input for table: "events" */
export interface events_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "events" */
export enum events_select_column {
  /** column name */
  contentId = "contentId",
  /** column name */
  createdAt = "createdAt",
  /** column name */
  folderId = "folderId",
  /** column name */
  groupId = "groupId",
  /** column name */
  id = "id",
  /** column name */
  lockSpeak = "lockSpeak",
  /** column name */
  name = "name",
  /** column name */
  pollId = "pollId",
  /** column name */
  shortName = "shortName",
  /** column name */
  timerId = "timerId",
}

/** input type for updating data in table "events" */
export interface events_set_input {
  contentId?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  folderId?: Maybe<Scalars["uuid"]>;
  groupId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  lockSpeak?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  pollId?: Maybe<Scalars["uuid"]>;
  shortName?: Maybe<Scalars["String"]>;
  timerId?: Maybe<Scalars["uuid"]>;
}

/** update columns of table "events" */
export enum events_update_column {
  /** column name */
  contentId = "contentId",
  /** column name */
  createdAt = "createdAt",
  /** column name */
  folderId = "folderId",
  /** column name */
  groupId = "groupId",
  /** column name */
  id = "id",
  /** column name */
  lockSpeak = "lockSpeak",
  /** column name */
  name = "name",
  /** column name */
  pollId = "pollId",
  /** column name */
  shortName = "shortName",
  /** column name */
  timerId = "timerId",
}

/** order by aggregate values of table "files" */
export interface files_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<files_max_order_by>;
  min?: Maybe<files_min_order_by>;
}

/** input type for inserting array relation for remote table "files" */
export interface files_arr_rel_insert_input {
  data: Array<files_insert_input>;
  on_conflict?: Maybe<files_on_conflict>;
}

/** Boolean expression to filter rows from the table "files". All fields are combined with a logical 'AND'. */
export interface files_bool_exp {
  _and?: Maybe<Array<Maybe<files_bool_exp>>>;
  _not?: Maybe<files_bool_exp>;
  _or?: Maybe<Array<Maybe<files_bool_exp>>>;
  createdAt?: Maybe<timestamptz_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  path?: Maybe<String_comparison_exp>;
  token?: Maybe<String_comparison_exp>;
  updatedAt?: Maybe<timestamptz_comparison_exp>;
  user?: Maybe<users_bool_exp>;
  userId?: Maybe<uuid_comparison_exp>;
}

/** unique or primary key constraints on table "files" */
export enum files_constraint {
  /** unique or primary key constraint */
  files_pkey = "files_pkey",
}

/** input type for inserting data into table "files" */
export interface files_insert_input {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  path?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  user?: Maybe<users_obj_rel_insert_input>;
  userId?: Maybe<Scalars["uuid"]>;
}

/** order by max() on columns of table "files" */
export interface files_max_order_by {
  createdAt?: Maybe<order_by>;
  id?: Maybe<order_by>;
  path?: Maybe<order_by>;
  token?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** order by min() on columns of table "files" */
export interface files_min_order_by {
  createdAt?: Maybe<order_by>;
  id?: Maybe<order_by>;
  path?: Maybe<order_by>;
  token?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "files" */
export interface files_obj_rel_insert_input {
  data: files_insert_input;
  on_conflict?: Maybe<files_on_conflict>;
}

/** on conflict condition type for table "files" */
export interface files_on_conflict {
  constraint: files_constraint;
  update_columns: Array<files_update_column>;
  where?: Maybe<files_bool_exp>;
}

/** ordering options when selecting data from "files" */
export interface files_order_by {
  createdAt?: Maybe<order_by>;
  id?: Maybe<order_by>;
  path?: Maybe<order_by>;
  token?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
  user?: Maybe<users_order_by>;
  userId?: Maybe<order_by>;
}

/** primary key columns input for table: "files" */
export interface files_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "files" */
export enum files_select_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  id = "id",
  /** column name */
  path = "path",
  /** column name */
  token = "token",
  /** column name */
  updatedAt = "updatedAt",
  /** column name */
  userId = "userId",
}

/** input type for updating data in table "files" */
export interface files_set_input {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  path?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  userId?: Maybe<Scalars["uuid"]>;
}

/** update columns of table "files" */
export enum files_update_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  id = "id",
  /** column name */
  path = "path",
  /** column name */
  token = "token",
  /** column name */
  updatedAt = "updatedAt",
  /** column name */
  userId = "userId",
}

/** order by aggregate values of table "folders" */
export interface folders_aggregate_order_by {
  avg?: Maybe<folders_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<folders_max_order_by>;
  min?: Maybe<folders_min_order_by>;
  stddev?: Maybe<folders_stddev_order_by>;
  stddev_pop?: Maybe<folders_stddev_pop_order_by>;
  stddev_samp?: Maybe<folders_stddev_samp_order_by>;
  sum?: Maybe<folders_sum_order_by>;
  var_pop?: Maybe<folders_var_pop_order_by>;
  var_samp?: Maybe<folders_var_samp_order_by>;
  variance?: Maybe<folders_variance_order_by>;
}

/** input type for inserting array relation for remote table "folders" */
export interface folders_arr_rel_insert_input {
  data: Array<folders_insert_input>;
  on_conflict?: Maybe<folders_on_conflict>;
}

/** order by avg() on columns of table "folders" */
export interface folders_avg_order_by {
  priority?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "folders". All fields are combined with a logical 'AND'. */
export interface folders_bool_exp {
  _and?: Maybe<Array<Maybe<folders_bool_exp>>>;
  _not?: Maybe<folders_bool_exp>;
  _or?: Maybe<Array<Maybe<folders_bool_exp>>>;
  contents?: Maybe<contents_bool_exp>;
  event?: Maybe<events_bool_exp>;
  eventId?: Maybe<uuid_comparison_exp>;
  folders?: Maybe<folders_bool_exp>;
  id?: Maybe<uuid_comparison_exp>;
  lockChildren?: Maybe<Boolean_comparison_exp>;
  lockContent?: Maybe<Boolean_comparison_exp>;
  mode?: Maybe<String_comparison_exp>;
  name?: Maybe<String_comparison_exp>;
  parent?: Maybe<folders_bool_exp>;
  parentId?: Maybe<uuid_comparison_exp>;
  priority?: Maybe<Int_comparison_exp>;
  subtitle?: Maybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "folders" */
export enum folders_constraint {
  /** unique or primary key constraint */
  categories_pkey = "categories_pkey",
}

/** input type for incrementing integer column in table "folders" */
export interface folders_inc_input {
  priority?: Maybe<Scalars["Int"]>;
}

/** input type for inserting data into table "folders" */
export interface folders_insert_input {
  contents?: Maybe<contents_arr_rel_insert_input>;
  event?: Maybe<events_obj_rel_insert_input>;
  eventId?: Maybe<Scalars["uuid"]>;
  folders?: Maybe<folders_arr_rel_insert_input>;
  id?: Maybe<Scalars["uuid"]>;
  lockChildren?: Maybe<Scalars["Boolean"]>;
  lockContent?: Maybe<Scalars["Boolean"]>;
  mode?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  parent?: Maybe<folders_obj_rel_insert_input>;
  parentId?: Maybe<Scalars["uuid"]>;
  priority?: Maybe<Scalars["Int"]>;
  subtitle?: Maybe<Scalars["String"]>;
}

/** order by max() on columns of table "folders" */
export interface folders_max_order_by {
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  mode?: Maybe<order_by>;
  name?: Maybe<order_by>;
  parentId?: Maybe<order_by>;
  priority?: Maybe<order_by>;
  subtitle?: Maybe<order_by>;
}

/** order by min() on columns of table "folders" */
export interface folders_min_order_by {
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  mode?: Maybe<order_by>;
  name?: Maybe<order_by>;
  parentId?: Maybe<order_by>;
  priority?: Maybe<order_by>;
  subtitle?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "folders" */
export interface folders_obj_rel_insert_input {
  data: folders_insert_input;
  on_conflict?: Maybe<folders_on_conflict>;
}

/** on conflict condition type for table "folders" */
export interface folders_on_conflict {
  constraint: folders_constraint;
  update_columns: Array<folders_update_column>;
  where?: Maybe<folders_bool_exp>;
}

/** ordering options when selecting data from "folders" */
export interface folders_order_by {
  contents_aggregate?: Maybe<contents_aggregate_order_by>;
  event?: Maybe<events_order_by>;
  eventId?: Maybe<order_by>;
  folders_aggregate?: Maybe<folders_aggregate_order_by>;
  id?: Maybe<order_by>;
  lockChildren?: Maybe<order_by>;
  lockContent?: Maybe<order_by>;
  mode?: Maybe<order_by>;
  name?: Maybe<order_by>;
  parent?: Maybe<folders_order_by>;
  parentId?: Maybe<order_by>;
  priority?: Maybe<order_by>;
  subtitle?: Maybe<order_by>;
}

/** primary key columns input for table: "folders" */
export interface folders_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "folders" */
export enum folders_select_column {
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  lockChildren = "lockChildren",
  /** column name */
  lockContent = "lockContent",
  /** column name */
  mode = "mode",
  /** column name */
  name = "name",
  /** column name */
  parentId = "parentId",
  /** column name */
  priority = "priority",
  /** column name */
  subtitle = "subtitle",
}

/** input type for updating data in table "folders" */
export interface folders_set_input {
  eventId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  lockChildren?: Maybe<Scalars["Boolean"]>;
  lockContent?: Maybe<Scalars["Boolean"]>;
  mode?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  parentId?: Maybe<Scalars["uuid"]>;
  priority?: Maybe<Scalars["Int"]>;
  subtitle?: Maybe<Scalars["String"]>;
}

/** order by stddev() on columns of table "folders" */
export interface folders_stddev_order_by {
  priority?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "folders" */
export interface folders_stddev_pop_order_by {
  priority?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "folders" */
export interface folders_stddev_samp_order_by {
  priority?: Maybe<order_by>;
}

/** order by sum() on columns of table "folders" */
export interface folders_sum_order_by {
  priority?: Maybe<order_by>;
}

/** update columns of table "folders" */
export enum folders_update_column {
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  lockChildren = "lockChildren",
  /** column name */
  lockContent = "lockContent",
  /** column name */
  mode = "mode",
  /** column name */
  name = "name",
  /** column name */
  parentId = "parentId",
  /** column name */
  priority = "priority",
  /** column name */
  subtitle = "subtitle",
}

/** order by var_pop() on columns of table "folders" */
export interface folders_var_pop_order_by {
  priority?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "folders" */
export interface folders_var_samp_order_by {
  priority?: Maybe<order_by>;
}

/** order by variance() on columns of table "folders" */
export interface folders_variance_order_by {
  priority?: Maybe<order_by>;
}

/** order by aggregate values of table "groups" */
export interface groups_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<groups_max_order_by>;
  min?: Maybe<groups_min_order_by>;
}

/** input type for inserting array relation for remote table "groups" */
export interface groups_arr_rel_insert_input {
  data: Array<groups_insert_input>;
  on_conflict?: Maybe<groups_on_conflict>;
}

/** Boolean expression to filter rows from the table "groups". All fields are combined with a logical 'AND'. */
export interface groups_bool_exp {
  _and?: Maybe<Array<Maybe<groups_bool_exp>>>;
  _not?: Maybe<groups_bool_exp>;
  _or?: Maybe<Array<Maybe<groups_bool_exp>>>;
  createdAt?: Maybe<timestamptz_comparison_exp>;
  creator?: Maybe<users_bool_exp>;
  creatorId?: Maybe<uuid_comparison_exp>;
  events?: Maybe<events_bool_exp>;
  id?: Maybe<uuid_comparison_exp>;
  memberships?: Maybe<memberships_bool_exp>;
  name?: Maybe<String_comparison_exp>;
  public?: Maybe<Boolean_comparison_exp>;
  shortName?: Maybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "groups" */
export enum groups_constraint {
  /** unique or primary key constraint */
  groups_pkey = "groups_pkey",
}

/** input type for inserting data into table "groups" */
export interface groups_insert_input {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  creator?: Maybe<users_obj_rel_insert_input>;
  creatorId?: Maybe<Scalars["uuid"]>;
  events?: Maybe<events_arr_rel_insert_input>;
  id?: Maybe<Scalars["uuid"]>;
  memberships?: Maybe<memberships_arr_rel_insert_input>;
  name?: Maybe<Scalars["String"]>;
  public?: Maybe<Scalars["Boolean"]>;
  shortName?: Maybe<Scalars["String"]>;
}

/** order by max() on columns of table "groups" */
export interface groups_max_order_by {
  createdAt?: Maybe<order_by>;
  creatorId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
  shortName?: Maybe<order_by>;
}

/** order by min() on columns of table "groups" */
export interface groups_min_order_by {
  createdAt?: Maybe<order_by>;
  creatorId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  name?: Maybe<order_by>;
  shortName?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "groups" */
export interface groups_obj_rel_insert_input {
  data: groups_insert_input;
  on_conflict?: Maybe<groups_on_conflict>;
}

/** on conflict condition type for table "groups" */
export interface groups_on_conflict {
  constraint: groups_constraint;
  update_columns: Array<groups_update_column>;
  where?: Maybe<groups_bool_exp>;
}

/** ordering options when selecting data from "groups" */
export interface groups_order_by {
  createdAt?: Maybe<order_by>;
  creator?: Maybe<users_order_by>;
  creatorId?: Maybe<order_by>;
  events_aggregate?: Maybe<events_aggregate_order_by>;
  id?: Maybe<order_by>;
  memberships_aggregate?: Maybe<memberships_aggregate_order_by>;
  name?: Maybe<order_by>;
  public?: Maybe<order_by>;
  shortName?: Maybe<order_by>;
}

/** primary key columns input for table: "groups" */
export interface groups_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "groups" */
export enum groups_select_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  creatorId = "creatorId",
  /** column name */
  id = "id",
  /** column name */
  name = "name",
  /** column name */
  public = "public",
  /** column name */
  shortName = "shortName",
}

/** input type for updating data in table "groups" */
export interface groups_set_input {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  creatorId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  public?: Maybe<Scalars["Boolean"]>;
  shortName?: Maybe<Scalars["String"]>;
}

/** update columns of table "groups" */
export enum groups_update_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  creatorId = "creatorId",
  /** column name */
  id = "id",
  /** column name */
  name = "name",
  /** column name */
  public = "public",
  /** column name */
  shortName = "shortName",
}

/** order by aggregate values of table "identities" */
export interface identities_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<identities_max_order_by>;
  min?: Maybe<identities_min_order_by>;
}

/** input type for inserting array relation for remote table "identities" */
export interface identities_arr_rel_insert_input {
  data: Array<identities_insert_input>;
  on_conflict?: Maybe<identities_on_conflict>;
}

/** Boolean expression to filter rows from the table "identities". All fields are combined with a logical 'AND'. */
export interface identities_bool_exp {
  _and?: Maybe<Array<Maybe<identities_bool_exp>>>;
  _not?: Maybe<identities_bool_exp>;
  _or?: Maybe<Array<Maybe<identities_bool_exp>>>;
  displayName?: Maybe<String_comparison_exp>;
  email?: Maybe<String_comparison_exp>;
  memberships?: Maybe<memberships_bool_exp>;
  user?: Maybe<users_bool_exp>;
}

/** unique or primary key constraints on table "identities" */
export enum identities_constraint {
  /** unique or primary key constraint */
  idEmails_pkey = "idEmails_pkey",
}

/** input type for inserting data into table "identities" */
export interface identities_insert_input {
  displayName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  memberships?: Maybe<memberships_arr_rel_insert_input>;
  user?: Maybe<users_obj_rel_insert_input>;
}

/** order by max() on columns of table "identities" */
export interface identities_max_order_by {
  displayName?: Maybe<order_by>;
  email?: Maybe<order_by>;
}

/** order by min() on columns of table "identities" */
export interface identities_min_order_by {
  displayName?: Maybe<order_by>;
  email?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "identities" */
export interface identities_obj_rel_insert_input {
  data: identities_insert_input;
  on_conflict?: Maybe<identities_on_conflict>;
}

/** on conflict condition type for table "identities" */
export interface identities_on_conflict {
  constraint: identities_constraint;
  update_columns: Array<identities_update_column>;
  where?: Maybe<identities_bool_exp>;
}

/** ordering options when selecting data from "identities" */
export interface identities_order_by {
  displayName?: Maybe<order_by>;
  email?: Maybe<order_by>;
  memberships_aggregate?: Maybe<memberships_aggregate_order_by>;
  user?: Maybe<users_order_by>;
}

/** primary key columns input for table: "identities" */
export interface identities_pk_columns_input {
  email: Scalars["String"];
}

/** select columns of table "identities" */
export enum identities_select_column {
  /** column name */
  displayName = "displayName",
  /** column name */
  email = "email",
}

/** input type for updating data in table "identities" */
export interface identities_set_input {
  displayName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
}

/** update columns of table "identities" */
export enum identities_update_column {
  /** column name */
  displayName = "displayName",
  /** column name */
  email = "email",
}

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export interface json_comparison_exp {
  _eq?: Maybe<Scalars["json"]>;
  _gt?: Maybe<Scalars["json"]>;
  _gte?: Maybe<Scalars["json"]>;
  _in?: Maybe<Array<Scalars["json"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["json"]>;
  _lte?: Maybe<Scalars["json"]>;
  _neq?: Maybe<Scalars["json"]>;
  _nin?: Maybe<Array<Scalars["json"]>>;
}

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export interface jsonb_comparison_exp {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars["jsonb"]>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars["jsonb"]>;
  _eq?: Maybe<Scalars["jsonb"]>;
  _gt?: Maybe<Scalars["jsonb"]>;
  _gte?: Maybe<Scalars["jsonb"]>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars["String"]>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars["String"]>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars["String"]>>;
  _in?: Maybe<Array<Scalars["jsonb"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["jsonb"]>;
  _lte?: Maybe<Scalars["jsonb"]>;
  _neq?: Maybe<Scalars["jsonb"]>;
  _nin?: Maybe<Array<Scalars["jsonb"]>>;
}

/** order by aggregate values of table "memberships" */
export interface memberships_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<memberships_max_order_by>;
  min?: Maybe<memberships_min_order_by>;
}

/** input type for inserting array relation for remote table "memberships" */
export interface memberships_arr_rel_insert_input {
  data: Array<memberships_insert_input>;
  on_conflict?: Maybe<memberships_on_conflict>;
}

/** Boolean expression to filter rows from the table "memberships". All fields are combined with a logical 'AND'. */
export interface memberships_bool_exp {
  _and?: Maybe<Array<Maybe<memberships_bool_exp>>>;
  _not?: Maybe<memberships_bool_exp>;
  _or?: Maybe<Array<Maybe<memberships_bool_exp>>>;
  email?: Maybe<String_comparison_exp>;
  group?: Maybe<groups_bool_exp>;
  groupId?: Maybe<uuid_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  identity?: Maybe<identities_bool_exp>;
  roles?: Maybe<roles_bool_exp>;
  userId?: Maybe<uuid_comparison_exp>;
}

/** unique or primary key constraints on table "memberships" */
export enum memberships_constraint {
  /** unique or primary key constraint */
  memberships_pkey = "memberships_pkey",
}

/** input type for inserting data into table "memberships" */
export interface memberships_insert_input {
  email?: Maybe<Scalars["String"]>;
  group?: Maybe<groups_obj_rel_insert_input>;
  groupId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  identity?: Maybe<identities_obj_rel_insert_input>;
  roles?: Maybe<roles_arr_rel_insert_input>;
  userId?: Maybe<Scalars["uuid"]>;
}

/** order by max() on columns of table "memberships" */
export interface memberships_max_order_by {
  email?: Maybe<order_by>;
  groupId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** order by min() on columns of table "memberships" */
export interface memberships_min_order_by {
  email?: Maybe<order_by>;
  groupId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "memberships" */
export interface memberships_obj_rel_insert_input {
  data: memberships_insert_input;
  on_conflict?: Maybe<memberships_on_conflict>;
}

/** on conflict condition type for table "memberships" */
export interface memberships_on_conflict {
  constraint: memberships_constraint;
  update_columns: Array<memberships_update_column>;
  where?: Maybe<memberships_bool_exp>;
}

/** ordering options when selecting data from "memberships" */
export interface memberships_order_by {
  email?: Maybe<order_by>;
  group?: Maybe<groups_order_by>;
  groupId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  identity?: Maybe<identities_order_by>;
  roles_aggregate?: Maybe<roles_aggregate_order_by>;
  userId?: Maybe<order_by>;
}

/** primary key columns input for table: "memberships" */
export interface memberships_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "memberships" */
export enum memberships_select_column {
  /** column name */
  email = "email",
  /** column name */
  groupId = "groupId",
  /** column name */
  id = "id",
  /** column name */
  userId = "userId",
}

/** input type for updating data in table "memberships" */
export interface memberships_set_input {
  email?: Maybe<Scalars["String"]>;
  groupId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  userId?: Maybe<Scalars["uuid"]>;
}

/** update columns of table "memberships" */
export enum memberships_update_column {
  /** column name */
  email = "email",
  /** column name */
  groupId = "groupId",
  /** column name */
  id = "id",
  /** column name */
  userId = "userId",
}

/** column ordering options */
export enum order_by {
  /** in the ascending order, nulls last */
  asc = "asc",
  /** in the ascending order, nulls first */
  asc_nulls_first = "asc_nulls_first",
  /** in the ascending order, nulls last */
  asc_nulls_last = "asc_nulls_last",
  /** in the descending order, nulls first */
  desc = "desc",
  /** in the descending order, nulls first */
  desc_nulls_first = "desc_nulls_first",
  /** in the descending order, nulls last */
  desc_nulls_last = "desc_nulls_last",
}

/** order by aggregate values of table "polls" */
export interface polls_aggregate_order_by {
  avg?: Maybe<polls_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<polls_max_order_by>;
  min?: Maybe<polls_min_order_by>;
  stddev?: Maybe<polls_stddev_order_by>;
  stddev_pop?: Maybe<polls_stddev_pop_order_by>;
  stddev_samp?: Maybe<polls_stddev_samp_order_by>;
  sum?: Maybe<polls_sum_order_by>;
  var_pop?: Maybe<polls_var_pop_order_by>;
  var_samp?: Maybe<polls_var_samp_order_by>;
  variance?: Maybe<polls_variance_order_by>;
}

/** input type for inserting array relation for remote table "polls" */
export interface polls_arr_rel_insert_input {
  data: Array<polls_insert_input>;
  on_conflict?: Maybe<polls_on_conflict>;
}

/** order by avg() on columns of table "polls" */
export interface polls_avg_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "polls". All fields are combined with a logical 'AND'. */
export interface polls_bool_exp {
  _and?: Maybe<Array<Maybe<polls_bool_exp>>>;
  _not?: Maybe<polls_bool_exp>;
  _or?: Maybe<Array<Maybe<polls_bool_exp>>>;
  active?: Maybe<Boolean_comparison_exp>;
  content?: Maybe<contents_bool_exp>;
  contentId?: Maybe<uuid_comparison_exp>;
  createdAt?: Maybe<timestamptz_comparison_exp>;
  hidden?: Maybe<Boolean_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  maxVote?: Maybe<Int_comparison_exp>;
  minVote?: Maybe<Int_comparison_exp>;
  options?: Maybe<_text_comparison_exp>;
  votes?: Maybe<votes_bool_exp>;
}

/** unique or primary key constraints on table "polls" */
export enum polls_constraint {
  /** unique or primary key constraint */
  polls_pkey = "polls_pkey",
}

/** input type for incrementing integer column in table "polls" */
export interface polls_inc_input {
  maxVote?: Maybe<Scalars["Int"]>;
  minVote?: Maybe<Scalars["Int"]>;
}

/** input type for inserting data into table "polls" */
export interface polls_insert_input {
  active?: Maybe<Scalars["Boolean"]>;
  content?: Maybe<contents_obj_rel_insert_input>;
  contentId?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  hidden?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["uuid"]>;
  maxVote?: Maybe<Scalars["Int"]>;
  minVote?: Maybe<Scalars["Int"]>;
  options?: Maybe<Scalars["_text"]>;
  votes?: Maybe<votes_arr_rel_insert_input>;
}

/** order by max() on columns of table "polls" */
export interface polls_max_order_by {
  contentId?: Maybe<order_by>;
  createdAt?: Maybe<order_by>;
  id?: Maybe<order_by>;
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** order by min() on columns of table "polls" */
export interface polls_min_order_by {
  contentId?: Maybe<order_by>;
  createdAt?: Maybe<order_by>;
  id?: Maybe<order_by>;
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "polls" */
export interface polls_obj_rel_insert_input {
  data: polls_insert_input;
  on_conflict?: Maybe<polls_on_conflict>;
}

/** on conflict condition type for table "polls" */
export interface polls_on_conflict {
  constraint: polls_constraint;
  update_columns: Array<polls_update_column>;
  where?: Maybe<polls_bool_exp>;
}

/** ordering options when selecting data from "polls" */
export interface polls_order_by {
  active?: Maybe<order_by>;
  content?: Maybe<contents_order_by>;
  contentId?: Maybe<order_by>;
  createdAt?: Maybe<order_by>;
  hidden?: Maybe<order_by>;
  id?: Maybe<order_by>;
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
  options?: Maybe<order_by>;
  votes_aggregate?: Maybe<votes_aggregate_order_by>;
}

/** primary key columns input for table: "polls" */
export interface polls_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "polls" */
export enum polls_select_column {
  /** column name */
  active = "active",
  /** column name */
  contentId = "contentId",
  /** column name */
  createdAt = "createdAt",
  /** column name */
  hidden = "hidden",
  /** column name */
  id = "id",
  /** column name */
  maxVote = "maxVote",
  /** column name */
  minVote = "minVote",
  /** column name */
  options = "options",
}

/** input type for updating data in table "polls" */
export interface polls_set_input {
  active?: Maybe<Scalars["Boolean"]>;
  contentId?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  hidden?: Maybe<Scalars["Boolean"]>;
  id?: Maybe<Scalars["uuid"]>;
  maxVote?: Maybe<Scalars["Int"]>;
  minVote?: Maybe<Scalars["Int"]>;
  options?: Maybe<Scalars["_text"]>;
}

/** order by stddev() on columns of table "polls" */
export interface polls_stddev_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "polls" */
export interface polls_stddev_pop_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "polls" */
export interface polls_stddev_samp_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** order by sum() on columns of table "polls" */
export interface polls_sum_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** update columns of table "polls" */
export enum polls_update_column {
  /** column name */
  active = "active",
  /** column name */
  contentId = "contentId",
  /** column name */
  createdAt = "createdAt",
  /** column name */
  hidden = "hidden",
  /** column name */
  id = "id",
  /** column name */
  maxVote = "maxVote",
  /** column name */
  minVote = "minVote",
  /** column name */
  options = "options",
}

/** order by var_pop() on columns of table "polls" */
export interface polls_var_pop_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "polls" */
export interface polls_var_samp_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** order by variance() on columns of table "polls" */
export interface polls_variance_order_by {
  maxVote?: Maybe<order_by>;
  minVote?: Maybe<order_by>;
}

/** order by aggregate values of table "roles" */
export interface roles_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<roles_max_order_by>;
  min?: Maybe<roles_min_order_by>;
}

/** input type for inserting array relation for remote table "roles" */
export interface roles_arr_rel_insert_input {
  data: Array<roles_insert_input>;
  on_conflict?: Maybe<roles_on_conflict>;
}

/** Boolean expression to filter rows from the table "roles". All fields are combined with a logical 'AND'. */
export interface roles_bool_exp {
  _and?: Maybe<Array<Maybe<roles_bool_exp>>>;
  _not?: Maybe<roles_bool_exp>;
  _or?: Maybe<Array<Maybe<roles_bool_exp>>>;
  id?: Maybe<uuid_comparison_exp>;
  membership?: Maybe<memberships_bool_exp>;
  membershipId?: Maybe<uuid_comparison_exp>;
  role?: Maybe<String_comparison_exp>;
}

/** unique or primary key constraints on table "roles" */
export enum roles_constraint {
  /** unique or primary key constraint */
  roles_pkey = "roles_pkey",
}

/** input type for inserting data into table "roles" */
export interface roles_insert_input {
  id?: Maybe<Scalars["uuid"]>;
  membership?: Maybe<memberships_obj_rel_insert_input>;
  membershipId?: Maybe<Scalars["uuid"]>;
  role?: Maybe<Scalars["String"]>;
}

/** order by max() on columns of table "roles" */
export interface roles_max_order_by {
  id?: Maybe<order_by>;
  membershipId?: Maybe<order_by>;
  role?: Maybe<order_by>;
}

/** order by min() on columns of table "roles" */
export interface roles_min_order_by {
  id?: Maybe<order_by>;
  membershipId?: Maybe<order_by>;
  role?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "roles" */
export interface roles_obj_rel_insert_input {
  data: roles_insert_input;
  on_conflict?: Maybe<roles_on_conflict>;
}

/** on conflict condition type for table "roles" */
export interface roles_on_conflict {
  constraint: roles_constraint;
  update_columns: Array<roles_update_column>;
  where?: Maybe<roles_bool_exp>;
}

/** ordering options when selecting data from "roles" */
export interface roles_order_by {
  id?: Maybe<order_by>;
  membership?: Maybe<memberships_order_by>;
  membershipId?: Maybe<order_by>;
  role?: Maybe<order_by>;
}

/** primary key columns input for table: "roles" */
export interface roles_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "roles" */
export enum roles_select_column {
  /** column name */
  id = "id",
  /** column name */
  membershipId = "membershipId",
  /** column name */
  role = "role",
}

/** input type for updating data in table "roles" */
export interface roles_set_input {
  id?: Maybe<Scalars["uuid"]>;
  membershipId?: Maybe<Scalars["uuid"]>;
  role?: Maybe<Scalars["String"]>;
}

/** update columns of table "roles" */
export enum roles_update_column {
  /** column name */
  id = "id",
  /** column name */
  membershipId = "membershipId",
  /** column name */
  role = "role",
}

/** order by aggregate values of table "speaks" */
export interface speaks_aggregate_order_by {
  avg?: Maybe<speaks_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<speaks_max_order_by>;
  min?: Maybe<speaks_min_order_by>;
  stddev?: Maybe<speaks_stddev_order_by>;
  stddev_pop?: Maybe<speaks_stddev_pop_order_by>;
  stddev_samp?: Maybe<speaks_stddev_samp_order_by>;
  sum?: Maybe<speaks_sum_order_by>;
  var_pop?: Maybe<speaks_var_pop_order_by>;
  var_samp?: Maybe<speaks_var_samp_order_by>;
  variance?: Maybe<speaks_variance_order_by>;
}

/** input type for inserting array relation for remote table "speaks" */
export interface speaks_arr_rel_insert_input {
  data: Array<speaks_insert_input>;
  on_conflict?: Maybe<speaks_on_conflict>;
}

/** order by avg() on columns of table "speaks" */
export interface speaks_avg_order_by {
  type?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "speaks". All fields are combined with a logical 'AND'. */
export interface speaks_bool_exp {
  _and?: Maybe<Array<Maybe<speaks_bool_exp>>>;
  _not?: Maybe<speaks_bool_exp>;
  _or?: Maybe<Array<Maybe<speaks_bool_exp>>>;
  createdAt?: Maybe<timestamptz_comparison_exp>;
  eventId?: Maybe<uuid_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  type?: Maybe<Int_comparison_exp>;
  user?: Maybe<users_bool_exp>;
  userId?: Maybe<uuid_comparison_exp>;
}

/** unique or primary key constraints on table "speaks" */
export enum speaks_constraint {
  /** unique or primary key constraint */
  speaks_pkey = "speaks_pkey",
}

/** input type for incrementing integer column in table "speaks" */
export interface speaks_inc_input {
  type?: Maybe<Scalars["Int"]>;
}

/** input type for inserting data into table "speaks" */
export interface speaks_insert_input {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  eventId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  type?: Maybe<Scalars["Int"]>;
  user?: Maybe<users_obj_rel_insert_input>;
  userId?: Maybe<Scalars["uuid"]>;
}

/** order by max() on columns of table "speaks" */
export interface speaks_max_order_by {
  createdAt?: Maybe<order_by>;
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  type?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** order by min() on columns of table "speaks" */
export interface speaks_min_order_by {
  createdAt?: Maybe<order_by>;
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  type?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "speaks" */
export interface speaks_obj_rel_insert_input {
  data: speaks_insert_input;
  on_conflict?: Maybe<speaks_on_conflict>;
}

/** on conflict condition type for table "speaks" */
export interface speaks_on_conflict {
  constraint: speaks_constraint;
  update_columns: Array<speaks_update_column>;
  where?: Maybe<speaks_bool_exp>;
}

/** ordering options when selecting data from "speaks" */
export interface speaks_order_by {
  createdAt?: Maybe<order_by>;
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  type?: Maybe<order_by>;
  user?: Maybe<users_order_by>;
  userId?: Maybe<order_by>;
}

/** primary key columns input for table: "speaks" */
export interface speaks_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "speaks" */
export enum speaks_select_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  type = "type",
  /** column name */
  userId = "userId",
}

/** input type for updating data in table "speaks" */
export interface speaks_set_input {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  eventId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  type?: Maybe<Scalars["Int"]>;
  userId?: Maybe<Scalars["uuid"]>;
}

/** order by stddev() on columns of table "speaks" */
export interface speaks_stddev_order_by {
  type?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "speaks" */
export interface speaks_stddev_pop_order_by {
  type?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "speaks" */
export interface speaks_stddev_samp_order_by {
  type?: Maybe<order_by>;
}

/** order by sum() on columns of table "speaks" */
export interface speaks_sum_order_by {
  type?: Maybe<order_by>;
}

/** update columns of table "speaks" */
export enum speaks_update_column {
  /** column name */
  createdAt = "createdAt",
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  type = "type",
  /** column name */
  userId = "userId",
}

/** order by var_pop() on columns of table "speaks" */
export interface speaks_var_pop_order_by {
  type?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "speaks" */
export interface speaks_var_samp_order_by {
  type?: Maybe<order_by>;
}

/** order by variance() on columns of table "speaks" */
export interface speaks_variance_order_by {
  type?: Maybe<order_by>;
}

/** order by aggregate values of table "timers" */
export interface timers_aggregate_order_by {
  avg?: Maybe<timers_avg_order_by>;
  count?: Maybe<order_by>;
  max?: Maybe<timers_max_order_by>;
  min?: Maybe<timers_min_order_by>;
  stddev?: Maybe<timers_stddev_order_by>;
  stddev_pop?: Maybe<timers_stddev_pop_order_by>;
  stddev_samp?: Maybe<timers_stddev_samp_order_by>;
  sum?: Maybe<timers_sum_order_by>;
  var_pop?: Maybe<timers_var_pop_order_by>;
  var_samp?: Maybe<timers_var_samp_order_by>;
  variance?: Maybe<timers_variance_order_by>;
}

/** input type for inserting array relation for remote table "timers" */
export interface timers_arr_rel_insert_input {
  data: Array<timers_insert_input>;
  on_conflict?: Maybe<timers_on_conflict>;
}

/** order by avg() on columns of table "timers" */
export interface timers_avg_order_by {
  time?: Maybe<order_by>;
}

/** Boolean expression to filter rows from the table "timers". All fields are combined with a logical 'AND'. */
export interface timers_bool_exp {
  _and?: Maybe<Array<Maybe<timers_bool_exp>>>;
  _not?: Maybe<timers_bool_exp>;
  _or?: Maybe<Array<Maybe<timers_bool_exp>>>;
  event?: Maybe<events_bool_exp>;
  eventId?: Maybe<uuid_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  time?: Maybe<Int_comparison_exp>;
  updatedAt?: Maybe<timestamptz_comparison_exp>;
}

/** unique or primary key constraints on table "timers" */
export enum timers_constraint {
  /** unique or primary key constraint */
  timers_pkey = "timers_pkey",
}

/** input type for incrementing integer column in table "timers" */
export interface timers_inc_input {
  time?: Maybe<Scalars["Int"]>;
}

/** input type for inserting data into table "timers" */
export interface timers_insert_input {
  event?: Maybe<events_obj_rel_insert_input>;
  eventId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  time?: Maybe<Scalars["Int"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
}

/** order by max() on columns of table "timers" */
export interface timers_max_order_by {
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  time?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
}

/** order by min() on columns of table "timers" */
export interface timers_min_order_by {
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  time?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "timers" */
export interface timers_obj_rel_insert_input {
  data: timers_insert_input;
  on_conflict?: Maybe<timers_on_conflict>;
}

/** on conflict condition type for table "timers" */
export interface timers_on_conflict {
  constraint: timers_constraint;
  update_columns: Array<timers_update_column>;
  where?: Maybe<timers_bool_exp>;
}

/** ordering options when selecting data from "timers" */
export interface timers_order_by {
  event?: Maybe<events_order_by>;
  eventId?: Maybe<order_by>;
  id?: Maybe<order_by>;
  time?: Maybe<order_by>;
  updatedAt?: Maybe<order_by>;
}

/** primary key columns input for table: "timers" */
export interface timers_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "timers" */
export enum timers_select_column {
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  time = "time",
  /** column name */
  updatedAt = "updatedAt",
}

/** input type for updating data in table "timers" */
export interface timers_set_input {
  eventId?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  time?: Maybe<Scalars["Int"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
}

/** order by stddev() on columns of table "timers" */
export interface timers_stddev_order_by {
  time?: Maybe<order_by>;
}

/** order by stddev_pop() on columns of table "timers" */
export interface timers_stddev_pop_order_by {
  time?: Maybe<order_by>;
}

/** order by stddev_samp() on columns of table "timers" */
export interface timers_stddev_samp_order_by {
  time?: Maybe<order_by>;
}

/** order by sum() on columns of table "timers" */
export interface timers_sum_order_by {
  time?: Maybe<order_by>;
}

/** update columns of table "timers" */
export enum timers_update_column {
  /** column name */
  eventId = "eventId",
  /** column name */
  id = "id",
  /** column name */
  time = "time",
  /** column name */
  updatedAt = "updatedAt",
}

/** order by var_pop() on columns of table "timers" */
export interface timers_var_pop_order_by {
  time?: Maybe<order_by>;
}

/** order by var_samp() on columns of table "timers" */
export interface timers_var_samp_order_by {
  time?: Maybe<order_by>;
}

/** order by variance() on columns of table "timers" */
export interface timers_variance_order_by {
  time?: Maybe<order_by>;
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export interface timestamptz_comparison_exp {
  _eq?: Maybe<Scalars["timestamptz"]>;
  _gt?: Maybe<Scalars["timestamptz"]>;
  _gte?: Maybe<Scalars["timestamptz"]>;
  _in?: Maybe<Array<Scalars["timestamptz"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["timestamptz"]>;
  _lte?: Maybe<Scalars["timestamptz"]>;
  _neq?: Maybe<Scalars["timestamptz"]>;
  _nin?: Maybe<Array<Scalars["timestamptz"]>>;
}

/** order by aggregate values of table "users" */
export interface users_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<users_max_order_by>;
  min?: Maybe<users_min_order_by>;
}

/** input type for inserting array relation for remote table "users" */
export interface users_arr_rel_insert_input {
  data: Array<users_insert_input>;
  on_conflict?: Maybe<users_on_conflict>;
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export interface users_bool_exp {
  _and?: Maybe<Array<Maybe<users_bool_exp>>>;
  _not?: Maybe<users_bool_exp>;
  _or?: Maybe<Array<Maybe<users_bool_exp>>>;
  account?: Maybe<auth_accounts_bool_exp>;
  avatar_url?: Maybe<String_comparison_exp>;
  created_at?: Maybe<timestamptz_comparison_exp>;
  display_name?: Maybe<String_comparison_exp>;
  id?: Maybe<uuid_comparison_exp>;
  identity?: Maybe<identities_bool_exp>;
  sysAdmin?: Maybe<Boolean_comparison_exp>;
  updated_at?: Maybe<timestamptz_comparison_exp>;
}

/** unique or primary key constraints on table "users" */
export enum users_constraint {
  /** unique or primary key constraint */
  users_pkey = "users_pkey",
}

/** input type for inserting data into table "users" */
export interface users_insert_input {
  account?: Maybe<auth_accounts_obj_rel_insert_input>;
  avatar_url?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  display_name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  identity?: Maybe<identities_obj_rel_insert_input>;
  sysAdmin?: Maybe<Scalars["Boolean"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
}

/** order by max() on columns of table "users" */
export interface users_max_order_by {
  avatar_url?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  display_name?: Maybe<order_by>;
  id?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
}

/** order by min() on columns of table "users" */
export interface users_min_order_by {
  avatar_url?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  display_name?: Maybe<order_by>;
  id?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "users" */
export interface users_obj_rel_insert_input {
  data: users_insert_input;
  on_conflict?: Maybe<users_on_conflict>;
}

/** on conflict condition type for table "users" */
export interface users_on_conflict {
  constraint: users_constraint;
  update_columns: Array<users_update_column>;
  where?: Maybe<users_bool_exp>;
}

/** ordering options when selecting data from "users" */
export interface users_order_by {
  account?: Maybe<auth_accounts_order_by>;
  avatar_url?: Maybe<order_by>;
  created_at?: Maybe<order_by>;
  display_name?: Maybe<order_by>;
  id?: Maybe<order_by>;
  identity?: Maybe<identities_order_by>;
  sysAdmin?: Maybe<order_by>;
  updated_at?: Maybe<order_by>;
}

/** primary key columns input for table: "users" */
export interface users_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "users" */
export enum users_select_column {
  /** column name */
  avatar_url = "avatar_url",
  /** column name */
  created_at = "created_at",
  /** column name */
  display_name = "display_name",
  /** column name */
  id = "id",
  /** column name */
  sysAdmin = "sysAdmin",
  /** column name */
  updated_at = "updated_at",
}

/** input type for updating data in table "users" */
export interface users_set_input {
  avatar_url?: Maybe<Scalars["String"]>;
  created_at?: Maybe<Scalars["timestamptz"]>;
  display_name?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  sysAdmin?: Maybe<Scalars["Boolean"]>;
  updated_at?: Maybe<Scalars["timestamptz"]>;
}

/** update columns of table "users" */
export enum users_update_column {
  /** column name */
  avatar_url = "avatar_url",
  /** column name */
  created_at = "created_at",
  /** column name */
  display_name = "display_name",
  /** column name */
  id = "id",
  /** column name */
  sysAdmin = "sysAdmin",
  /** column name */
  updated_at = "updated_at",
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export interface uuid_comparison_exp {
  _eq?: Maybe<Scalars["uuid"]>;
  _gt?: Maybe<Scalars["uuid"]>;
  _gte?: Maybe<Scalars["uuid"]>;
  _in?: Maybe<Array<Scalars["uuid"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["uuid"]>;
  _lte?: Maybe<Scalars["uuid"]>;
  _neq?: Maybe<Scalars["uuid"]>;
  _nin?: Maybe<Array<Scalars["uuid"]>>;
}

/** order by aggregate values of table "votes" */
export interface votes_aggregate_order_by {
  count?: Maybe<order_by>;
  max?: Maybe<votes_max_order_by>;
  min?: Maybe<votes_min_order_by>;
}

/** input type for inserting array relation for remote table "votes" */
export interface votes_arr_rel_insert_input {
  data: Array<votes_insert_input>;
  on_conflict?: Maybe<votes_on_conflict>;
}

/** Boolean expression to filter rows from the table "votes". All fields are combined with a logical 'AND'. */
export interface votes_bool_exp {
  _and?: Maybe<Array<Maybe<votes_bool_exp>>>;
  _not?: Maybe<votes_bool_exp>;
  _or?: Maybe<Array<Maybe<votes_bool_exp>>>;
  id?: Maybe<uuid_comparison_exp>;
  pollId?: Maybe<uuid_comparison_exp>;
  userId?: Maybe<uuid_comparison_exp>;
  value?: Maybe<_int4_comparison_exp>;
}

/** unique or primary key constraints on table "votes" */
export enum votes_constraint {
  /** unique or primary key constraint */
  votes_pkey = "votes_pkey",
  /** unique or primary key constraint */
  votes_pollId_userId_key = "votes_pollId_userId_key",
}

/** input type for inserting data into table "votes" */
export interface votes_insert_input {
  id?: Maybe<Scalars["uuid"]>;
  pollId?: Maybe<Scalars["uuid"]>;
  userId?: Maybe<Scalars["uuid"]>;
  value?: Maybe<Scalars["_int4"]>;
}

/** order by max() on columns of table "votes" */
export interface votes_max_order_by {
  id?: Maybe<order_by>;
  pollId?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** order by min() on columns of table "votes" */
export interface votes_min_order_by {
  id?: Maybe<order_by>;
  pollId?: Maybe<order_by>;
  userId?: Maybe<order_by>;
}

/** input type for inserting object relation for remote table "votes" */
export interface votes_obj_rel_insert_input {
  data: votes_insert_input;
  on_conflict?: Maybe<votes_on_conflict>;
}

/** on conflict condition type for table "votes" */
export interface votes_on_conflict {
  constraint: votes_constraint;
  update_columns: Array<votes_update_column>;
  where?: Maybe<votes_bool_exp>;
}

/** ordering options when selecting data from "votes" */
export interface votes_order_by {
  id?: Maybe<order_by>;
  pollId?: Maybe<order_by>;
  userId?: Maybe<order_by>;
  value?: Maybe<order_by>;
}

/** primary key columns input for table: "votes" */
export interface votes_pk_columns_input {
  id: Scalars["uuid"];
}

/** select columns of table "votes" */
export enum votes_select_column {
  /** column name */
  id = "id",
  /** column name */
  pollId = "pollId",
  /** column name */
  userId = "userId",
  /** column name */
  value = "value",
}

/** input type for updating data in table "votes" */
export interface votes_set_input {
  id?: Maybe<Scalars["uuid"]>;
  pollId?: Maybe<Scalars["uuid"]>;
  userId?: Maybe<Scalars["uuid"]>;
  value?: Maybe<Scalars["_int4"]>;
}

/** update columns of table "votes" */
export enum votes_update_column {
  /** column name */
  id = "id",
  /** column name */
  pollId = "pollId",
  /** column name */
  userId = "userId",
  /** column name */
  value = "value",
}

export const scalarsEnumsHash: import("gqty").ScalarsEnumsHash = {
  Boolean: true,
  Float: true,
  ID: true,
  Int: true,
  String: true,
  _int4: true,
  _text: true,
  admissions_constraint: true,
  admissions_select_column: true,
  admissions_update_column: true,
  auth_account_providers_constraint: true,
  auth_account_providers_select_column: true,
  auth_account_providers_update_column: true,
  auth_account_roles_constraint: true,
  auth_account_roles_select_column: true,
  auth_account_roles_update_column: true,
  auth_accounts_constraint: true,
  auth_accounts_select_column: true,
  auth_accounts_update_column: true,
  auth_providers_constraint: true,
  auth_providers_select_column: true,
  auth_providers_update_column: true,
  auth_refresh_tokens_constraint: true,
  auth_refresh_tokens_select_column: true,
  auth_refresh_tokens_update_column: true,
  auth_roles_constraint: true,
  auth_roles_select_column: true,
  auth_roles_update_column: true,
  authorships_constraint: true,
  authorships_select_column: true,
  authorships_update_column: true,
  citext: true,
  contents_constraint: true,
  contents_select_column: true,
  contents_update_column: true,
  events_constraint: true,
  events_select_column: true,
  events_update_column: true,
  files_constraint: true,
  files_select_column: true,
  files_update_column: true,
  folders_constraint: true,
  folders_select_column: true,
  folders_update_column: true,
  groups_constraint: true,
  groups_select_column: true,
  groups_update_column: true,
  identities_constraint: true,
  identities_select_column: true,
  identities_update_column: true,
  json: true,
  jsonb: true,
  memberships_constraint: true,
  memberships_select_column: true,
  memberships_update_column: true,
  order_by: true,
  polls_constraint: true,
  polls_select_column: true,
  polls_update_column: true,
  roles_constraint: true,
  roles_select_column: true,
  roles_update_column: true,
  speaks_constraint: true,
  speaks_select_column: true,
  speaks_update_column: true,
  timers_constraint: true,
  timers_select_column: true,
  timers_update_column: true,
  timestamptz: true,
  users_constraint: true,
  users_select_column: true,
  users_update_column: true,
  uuid: true,
  votes_constraint: true,
  votes_select_column: true,
  votes_update_column: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    admissions: {
      __type: "[admissions!]!",
      __args: {
        distinct_on: "[admissions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[admissions_order_by!]",
        where: "admissions_bool_exp",
      },
    },
    admissions_aggregate: {
      __type: "admissions_aggregate!",
      __args: {
        distinct_on: "[admissions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[admissions_order_by!]",
        where: "admissions_bool_exp",
      },
    },
    admissions_by_pk: { __type: "admissions", __args: { id: "uuid!" } },
    auth_account_providers: {
      __type: "[auth_account_providers!]!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    auth_account_providers_aggregate: {
      __type: "auth_account_providers_aggregate!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    auth_account_providers_by_pk: {
      __type: "auth_account_providers",
      __args: { id: "uuid!" },
    },
    auth_account_roles: {
      __type: "[auth_account_roles!]!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    auth_account_roles_aggregate: {
      __type: "auth_account_roles_aggregate!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    auth_account_roles_by_pk: {
      __type: "auth_account_roles",
      __args: { id: "uuid!" },
    },
    auth_accounts: {
      __type: "[auth_accounts!]!",
      __args: {
        distinct_on: "[auth_accounts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_accounts_order_by!]",
        where: "auth_accounts_bool_exp",
      },
    },
    auth_accounts_aggregate: {
      __type: "auth_accounts_aggregate!",
      __args: {
        distinct_on: "[auth_accounts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_accounts_order_by!]",
        where: "auth_accounts_bool_exp",
      },
    },
    auth_accounts_by_pk: { __type: "auth_accounts", __args: { id: "uuid!" } },
    auth_providers: {
      __type: "[auth_providers!]!",
      __args: {
        distinct_on: "[auth_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_providers_order_by!]",
        where: "auth_providers_bool_exp",
      },
    },
    auth_providers_aggregate: {
      __type: "auth_providers_aggregate!",
      __args: {
        distinct_on: "[auth_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_providers_order_by!]",
        where: "auth_providers_bool_exp",
      },
    },
    auth_providers_by_pk: {
      __type: "auth_providers",
      __args: { provider: "String!" },
    },
    auth_refresh_tokens: {
      __type: "[auth_refresh_tokens!]!",
      __args: {
        distinct_on: "[auth_refresh_tokens_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_refresh_tokens_order_by!]",
        where: "auth_refresh_tokens_bool_exp",
      },
    },
    auth_refresh_tokens_aggregate: {
      __type: "auth_refresh_tokens_aggregate!",
      __args: {
        distinct_on: "[auth_refresh_tokens_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_refresh_tokens_order_by!]",
        where: "auth_refresh_tokens_bool_exp",
      },
    },
    auth_refresh_tokens_by_pk: {
      __type: "auth_refresh_tokens",
      __args: { refresh_token: "uuid!" },
    },
    auth_roles: {
      __type: "[auth_roles!]!",
      __args: {
        distinct_on: "[auth_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_roles_order_by!]",
        where: "auth_roles_bool_exp",
      },
    },
    auth_roles_aggregate: {
      __type: "auth_roles_aggregate!",
      __args: {
        distinct_on: "[auth_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_roles_order_by!]",
        where: "auth_roles_bool_exp",
      },
    },
    auth_roles_by_pk: { __type: "auth_roles", __args: { role: "String!" } },
    authorships: {
      __type: "[authorships!]!",
      __args: {
        distinct_on: "[authorships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[authorships_order_by!]",
        where: "authorships_bool_exp",
      },
    },
    authorships_aggregate: {
      __type: "authorships_aggregate!",
      __args: {
        distinct_on: "[authorships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[authorships_order_by!]",
        where: "authorships_bool_exp",
      },
    },
    authorships_by_pk: { __type: "authorships", __args: { id: "uuid!" } },
    canVote: { __type: "CanVoteOutput", __args: { eventId: "uuid" } },
    contents: {
      __type: "[contents!]!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    contents_aggregate: {
      __type: "contents_aggregate!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    contents_by_pk: { __type: "contents", __args: { id: "uuid!" } },
    events: {
      __type: "[events!]!",
      __args: {
        distinct_on: "[events_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[events_order_by!]",
        where: "events_bool_exp",
      },
    },
    events_aggregate: {
      __type: "events_aggregate!",
      __args: {
        distinct_on: "[events_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[events_order_by!]",
        where: "events_bool_exp",
      },
    },
    events_by_pk: { __type: "events", __args: { id: "uuid!" } },
    files: {
      __type: "[files!]!",
      __args: {
        distinct_on: "[files_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[files_order_by!]",
        where: "files_bool_exp",
      },
    },
    files_aggregate: {
      __type: "files_aggregate!",
      __args: {
        distinct_on: "[files_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[files_order_by!]",
        where: "files_bool_exp",
      },
    },
    files_by_pk: { __type: "files", __args: { id: "uuid!" } },
    folders: {
      __type: "[folders!]!",
      __args: {
        distinct_on: "[folders_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[folders_order_by!]",
        where: "folders_bool_exp",
      },
    },
    folders_aggregate: {
      __type: "folders_aggregate!",
      __args: {
        distinct_on: "[folders_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[folders_order_by!]",
        where: "folders_bool_exp",
      },
    },
    folders_by_pk: { __type: "folders", __args: { id: "uuid!" } },
    groups: {
      __type: "[groups!]!",
      __args: {
        distinct_on: "[groups_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[groups_order_by!]",
        where: "groups_bool_exp",
      },
    },
    groups_aggregate: {
      __type: "groups_aggregate!",
      __args: {
        distinct_on: "[groups_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[groups_order_by!]",
        where: "groups_bool_exp",
      },
    },
    groups_by_pk: { __type: "groups", __args: { id: "uuid!" } },
    identities: {
      __type: "[identities!]!",
      __args: {
        distinct_on: "[identities_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[identities_order_by!]",
        where: "identities_bool_exp",
      },
    },
    identities_aggregate: {
      __type: "identities_aggregate!",
      __args: {
        distinct_on: "[identities_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[identities_order_by!]",
        where: "identities_bool_exp",
      },
    },
    identities_by_pk: { __type: "identities", __args: { email: "String!" } },
    memberships: {
      __type: "[memberships!]!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    memberships_aggregate: {
      __type: "memberships_aggregate!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    memberships_by_pk: { __type: "memberships", __args: { id: "uuid!" } },
    polls: {
      __type: "[polls!]!",
      __args: {
        distinct_on: "[polls_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[polls_order_by!]",
        where: "polls_bool_exp",
      },
    },
    polls_aggregate: {
      __type: "polls_aggregate!",
      __args: {
        distinct_on: "[polls_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[polls_order_by!]",
        where: "polls_bool_exp",
      },
    },
    polls_by_pk: { __type: "polls", __args: { id: "uuid!" } },
    roles: {
      __type: "[roles!]!",
      __args: {
        distinct_on: "[roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[roles_order_by!]",
        where: "roles_bool_exp",
      },
    },
    roles_aggregate: {
      __type: "roles_aggregate!",
      __args: {
        distinct_on: "[roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[roles_order_by!]",
        where: "roles_bool_exp",
      },
    },
    roles_by_pk: { __type: "roles", __args: { id: "uuid!" } },
    speaks: {
      __type: "[speaks!]!",
      __args: {
        distinct_on: "[speaks_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[speaks_order_by!]",
        where: "speaks_bool_exp",
      },
    },
    speaks_aggregate: {
      __type: "speaks_aggregate!",
      __args: {
        distinct_on: "[speaks_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[speaks_order_by!]",
        where: "speaks_bool_exp",
      },
    },
    speaks_by_pk: { __type: "speaks", __args: { id: "uuid!" } },
    timers: {
      __type: "[timers!]!",
      __args: {
        distinct_on: "[timers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[timers_order_by!]",
        where: "timers_bool_exp",
      },
    },
    timers_aggregate: {
      __type: "timers_aggregate!",
      __args: {
        distinct_on: "[timers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[timers_order_by!]",
        where: "timers_bool_exp",
      },
    },
    timers_by_pk: { __type: "timers", __args: { id: "uuid!" } },
    users: {
      __type: "[users!]!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_aggregate: {
      __type: "users_aggregate!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_by_pk: { __type: "users", __args: { id: "uuid!" } },
    votes: {
      __type: "[votes!]!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_aggregate: {
      __type: "votes_aggregate!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_by_pk: { __type: "votes", __args: { id: "uuid!" } },
  },
  mutation: {
    __typename: { __type: "String!" },
    addVote: { __type: "VoteOutput!", __args: { vote: "VoteInput!" } },
    delete_admissions: {
      __type: "admissions_mutation_response",
      __args: { where: "admissions_bool_exp!" },
    },
    delete_admissions_by_pk: { __type: "admissions", __args: { id: "uuid!" } },
    delete_auth_account_providers: {
      __type: "auth_account_providers_mutation_response",
      __args: { where: "auth_account_providers_bool_exp!" },
    },
    delete_auth_account_providers_by_pk: {
      __type: "auth_account_providers",
      __args: { id: "uuid!" },
    },
    delete_auth_account_roles: {
      __type: "auth_account_roles_mutation_response",
      __args: { where: "auth_account_roles_bool_exp!" },
    },
    delete_auth_account_roles_by_pk: {
      __type: "auth_account_roles",
      __args: { id: "uuid!" },
    },
    delete_auth_accounts: {
      __type: "auth_accounts_mutation_response",
      __args: { where: "auth_accounts_bool_exp!" },
    },
    delete_auth_accounts_by_pk: {
      __type: "auth_accounts",
      __args: { id: "uuid!" },
    },
    delete_auth_providers: {
      __type: "auth_providers_mutation_response",
      __args: { where: "auth_providers_bool_exp!" },
    },
    delete_auth_providers_by_pk: {
      __type: "auth_providers",
      __args: { provider: "String!" },
    },
    delete_auth_refresh_tokens: {
      __type: "auth_refresh_tokens_mutation_response",
      __args: { where: "auth_refresh_tokens_bool_exp!" },
    },
    delete_auth_refresh_tokens_by_pk: {
      __type: "auth_refresh_tokens",
      __args: { refresh_token: "uuid!" },
    },
    delete_auth_roles: {
      __type: "auth_roles_mutation_response",
      __args: { where: "auth_roles_bool_exp!" },
    },
    delete_auth_roles_by_pk: {
      __type: "auth_roles",
      __args: { role: "String!" },
    },
    delete_authorships: {
      __type: "authorships_mutation_response",
      __args: { where: "authorships_bool_exp!" },
    },
    delete_authorships_by_pk: {
      __type: "authorships",
      __args: { id: "uuid!" },
    },
    delete_contents: {
      __type: "contents_mutation_response",
      __args: { where: "contents_bool_exp!" },
    },
    delete_contents_by_pk: { __type: "contents", __args: { id: "uuid!" } },
    delete_events: {
      __type: "events_mutation_response",
      __args: { where: "events_bool_exp!" },
    },
    delete_events_by_pk: { __type: "events", __args: { id: "uuid!" } },
    delete_files: {
      __type: "files_mutation_response",
      __args: { where: "files_bool_exp!" },
    },
    delete_files_by_pk: { __type: "files", __args: { id: "uuid!" } },
    delete_folders: {
      __type: "folders_mutation_response",
      __args: { where: "folders_bool_exp!" },
    },
    delete_folders_by_pk: { __type: "folders", __args: { id: "uuid!" } },
    delete_groups: {
      __type: "groups_mutation_response",
      __args: { where: "groups_bool_exp!" },
    },
    delete_groups_by_pk: { __type: "groups", __args: { id: "uuid!" } },
    delete_identities: {
      __type: "identities_mutation_response",
      __args: { where: "identities_bool_exp!" },
    },
    delete_identities_by_pk: {
      __type: "identities",
      __args: { email: "String!" },
    },
    delete_memberships: {
      __type: "memberships_mutation_response",
      __args: { where: "memberships_bool_exp!" },
    },
    delete_memberships_by_pk: {
      __type: "memberships",
      __args: { id: "uuid!" },
    },
    delete_polls: {
      __type: "polls_mutation_response",
      __args: { where: "polls_bool_exp!" },
    },
    delete_polls_by_pk: { __type: "polls", __args: { id: "uuid!" } },
    delete_roles: {
      __type: "roles_mutation_response",
      __args: { where: "roles_bool_exp!" },
    },
    delete_roles_by_pk: { __type: "roles", __args: { id: "uuid!" } },
    delete_speaks: {
      __type: "speaks_mutation_response",
      __args: { where: "speaks_bool_exp!" },
    },
    delete_speaks_by_pk: { __type: "speaks", __args: { id: "uuid!" } },
    delete_timers: {
      __type: "timers_mutation_response",
      __args: { where: "timers_bool_exp!" },
    },
    delete_timers_by_pk: { __type: "timers", __args: { id: "uuid!" } },
    delete_users: {
      __type: "users_mutation_response",
      __args: { where: "users_bool_exp!" },
    },
    delete_users_by_pk: { __type: "users", __args: { id: "uuid!" } },
    delete_votes: {
      __type: "votes_mutation_response",
      __args: { where: "votes_bool_exp!" },
    },
    delete_votes_by_pk: { __type: "votes", __args: { id: "uuid!" } },
    insert_admissions: {
      __type: "admissions_mutation_response",
      __args: {
        objects: "[admissions_insert_input!]!",
        on_conflict: "admissions_on_conflict",
      },
    },
    insert_admissions_one: {
      __type: "admissions",
      __args: {
        object: "admissions_insert_input!",
        on_conflict: "admissions_on_conflict",
      },
    },
    insert_auth_account_providers: {
      __type: "auth_account_providers_mutation_response",
      __args: {
        objects: "[auth_account_providers_insert_input!]!",
        on_conflict: "auth_account_providers_on_conflict",
      },
    },
    insert_auth_account_providers_one: {
      __type: "auth_account_providers",
      __args: {
        object: "auth_account_providers_insert_input!",
        on_conflict: "auth_account_providers_on_conflict",
      },
    },
    insert_auth_account_roles: {
      __type: "auth_account_roles_mutation_response",
      __args: {
        objects: "[auth_account_roles_insert_input!]!",
        on_conflict: "auth_account_roles_on_conflict",
      },
    },
    insert_auth_account_roles_one: {
      __type: "auth_account_roles",
      __args: {
        object: "auth_account_roles_insert_input!",
        on_conflict: "auth_account_roles_on_conflict",
      },
    },
    insert_auth_accounts: {
      __type: "auth_accounts_mutation_response",
      __args: {
        objects: "[auth_accounts_insert_input!]!",
        on_conflict: "auth_accounts_on_conflict",
      },
    },
    insert_auth_accounts_one: {
      __type: "auth_accounts",
      __args: {
        object: "auth_accounts_insert_input!",
        on_conflict: "auth_accounts_on_conflict",
      },
    },
    insert_auth_providers: {
      __type: "auth_providers_mutation_response",
      __args: {
        objects: "[auth_providers_insert_input!]!",
        on_conflict: "auth_providers_on_conflict",
      },
    },
    insert_auth_providers_one: {
      __type: "auth_providers",
      __args: {
        object: "auth_providers_insert_input!",
        on_conflict: "auth_providers_on_conflict",
      },
    },
    insert_auth_refresh_tokens: {
      __type: "auth_refresh_tokens_mutation_response",
      __args: {
        objects: "[auth_refresh_tokens_insert_input!]!",
        on_conflict: "auth_refresh_tokens_on_conflict",
      },
    },
    insert_auth_refresh_tokens_one: {
      __type: "auth_refresh_tokens",
      __args: {
        object: "auth_refresh_tokens_insert_input!",
        on_conflict: "auth_refresh_tokens_on_conflict",
      },
    },
    insert_auth_roles: {
      __type: "auth_roles_mutation_response",
      __args: {
        objects: "[auth_roles_insert_input!]!",
        on_conflict: "auth_roles_on_conflict",
      },
    },
    insert_auth_roles_one: {
      __type: "auth_roles",
      __args: {
        object: "auth_roles_insert_input!",
        on_conflict: "auth_roles_on_conflict",
      },
    },
    insert_authorships: {
      __type: "authorships_mutation_response",
      __args: {
        objects: "[authorships_insert_input!]!",
        on_conflict: "authorships_on_conflict",
      },
    },
    insert_authorships_one: {
      __type: "authorships",
      __args: {
        object: "authorships_insert_input!",
        on_conflict: "authorships_on_conflict",
      },
    },
    insert_contents: {
      __type: "contents_mutation_response",
      __args: {
        objects: "[contents_insert_input!]!",
        on_conflict: "contents_on_conflict",
      },
    },
    insert_contents_one: {
      __type: "contents",
      __args: {
        object: "contents_insert_input!",
        on_conflict: "contents_on_conflict",
      },
    },
    insert_events: {
      __type: "events_mutation_response",
      __args: {
        objects: "[events_insert_input!]!",
        on_conflict: "events_on_conflict",
      },
    },
    insert_events_one: {
      __type: "events",
      __args: {
        object: "events_insert_input!",
        on_conflict: "events_on_conflict",
      },
    },
    insert_files: {
      __type: "files_mutation_response",
      __args: {
        objects: "[files_insert_input!]!",
        on_conflict: "files_on_conflict",
      },
    },
    insert_files_one: {
      __type: "files",
      __args: {
        object: "files_insert_input!",
        on_conflict: "files_on_conflict",
      },
    },
    insert_folders: {
      __type: "folders_mutation_response",
      __args: {
        objects: "[folders_insert_input!]!",
        on_conflict: "folders_on_conflict",
      },
    },
    insert_folders_one: {
      __type: "folders",
      __args: {
        object: "folders_insert_input!",
        on_conflict: "folders_on_conflict",
      },
    },
    insert_groups: {
      __type: "groups_mutation_response",
      __args: {
        objects: "[groups_insert_input!]!",
        on_conflict: "groups_on_conflict",
      },
    },
    insert_groups_one: {
      __type: "groups",
      __args: {
        object: "groups_insert_input!",
        on_conflict: "groups_on_conflict",
      },
    },
    insert_identities: {
      __type: "identities_mutation_response",
      __args: {
        objects: "[identities_insert_input!]!",
        on_conflict: "identities_on_conflict",
      },
    },
    insert_identities_one: {
      __type: "identities",
      __args: {
        object: "identities_insert_input!",
        on_conflict: "identities_on_conflict",
      },
    },
    insert_memberships: {
      __type: "memberships_mutation_response",
      __args: {
        objects: "[memberships_insert_input!]!",
        on_conflict: "memberships_on_conflict",
      },
    },
    insert_memberships_one: {
      __type: "memberships",
      __args: {
        object: "memberships_insert_input!",
        on_conflict: "memberships_on_conflict",
      },
    },
    insert_polls: {
      __type: "polls_mutation_response",
      __args: {
        objects: "[polls_insert_input!]!",
        on_conflict: "polls_on_conflict",
      },
    },
    insert_polls_one: {
      __type: "polls",
      __args: {
        object: "polls_insert_input!",
        on_conflict: "polls_on_conflict",
      },
    },
    insert_roles: {
      __type: "roles_mutation_response",
      __args: {
        objects: "[roles_insert_input!]!",
        on_conflict: "roles_on_conflict",
      },
    },
    insert_roles_one: {
      __type: "roles",
      __args: {
        object: "roles_insert_input!",
        on_conflict: "roles_on_conflict",
      },
    },
    insert_speaks: {
      __type: "speaks_mutation_response",
      __args: {
        objects: "[speaks_insert_input!]!",
        on_conflict: "speaks_on_conflict",
      },
    },
    insert_speaks_one: {
      __type: "speaks",
      __args: {
        object: "speaks_insert_input!",
        on_conflict: "speaks_on_conflict",
      },
    },
    insert_timers: {
      __type: "timers_mutation_response",
      __args: {
        objects: "[timers_insert_input!]!",
        on_conflict: "timers_on_conflict",
      },
    },
    insert_timers_one: {
      __type: "timers",
      __args: {
        object: "timers_insert_input!",
        on_conflict: "timers_on_conflict",
      },
    },
    insert_users: {
      __type: "users_mutation_response",
      __args: {
        objects: "[users_insert_input!]!",
        on_conflict: "users_on_conflict",
      },
    },
    insert_users_one: {
      __type: "users",
      __args: {
        object: "users_insert_input!",
        on_conflict: "users_on_conflict",
      },
    },
    insert_votes: {
      __type: "votes_mutation_response",
      __args: {
        objects: "[votes_insert_input!]!",
        on_conflict: "votes_on_conflict",
      },
    },
    insert_votes_one: {
      __type: "votes",
      __args: {
        object: "votes_insert_input!",
        on_conflict: "votes_on_conflict",
      },
    },
    update_admissions: {
      __type: "admissions_mutation_response",
      __args: { _set: "admissions_set_input", where: "admissions_bool_exp!" },
    },
    update_admissions_by_pk: {
      __type: "admissions",
      __args: {
        _set: "admissions_set_input",
        pk_columns: "admissions_pk_columns_input!",
      },
    },
    update_auth_account_providers: {
      __type: "auth_account_providers_mutation_response",
      __args: {
        _set: "auth_account_providers_set_input",
        where: "auth_account_providers_bool_exp!",
      },
    },
    update_auth_account_providers_by_pk: {
      __type: "auth_account_providers",
      __args: {
        _set: "auth_account_providers_set_input",
        pk_columns: "auth_account_providers_pk_columns_input!",
      },
    },
    update_auth_account_roles: {
      __type: "auth_account_roles_mutation_response",
      __args: {
        _set: "auth_account_roles_set_input",
        where: "auth_account_roles_bool_exp!",
      },
    },
    update_auth_account_roles_by_pk: {
      __type: "auth_account_roles",
      __args: {
        _set: "auth_account_roles_set_input",
        pk_columns: "auth_account_roles_pk_columns_input!",
      },
    },
    update_auth_accounts: {
      __type: "auth_accounts_mutation_response",
      __args: {
        _append: "auth_accounts_append_input",
        _delete_at_path: "auth_accounts_delete_at_path_input",
        _delete_elem: "auth_accounts_delete_elem_input",
        _delete_key: "auth_accounts_delete_key_input",
        _prepend: "auth_accounts_prepend_input",
        _set: "auth_accounts_set_input",
        where: "auth_accounts_bool_exp!",
      },
    },
    update_auth_accounts_by_pk: {
      __type: "auth_accounts",
      __args: {
        _append: "auth_accounts_append_input",
        _delete_at_path: "auth_accounts_delete_at_path_input",
        _delete_elem: "auth_accounts_delete_elem_input",
        _delete_key: "auth_accounts_delete_key_input",
        _prepend: "auth_accounts_prepend_input",
        _set: "auth_accounts_set_input",
        pk_columns: "auth_accounts_pk_columns_input!",
      },
    },
    update_auth_providers: {
      __type: "auth_providers_mutation_response",
      __args: {
        _set: "auth_providers_set_input",
        where: "auth_providers_bool_exp!",
      },
    },
    update_auth_providers_by_pk: {
      __type: "auth_providers",
      __args: {
        _set: "auth_providers_set_input",
        pk_columns: "auth_providers_pk_columns_input!",
      },
    },
    update_auth_refresh_tokens: {
      __type: "auth_refresh_tokens_mutation_response",
      __args: {
        _set: "auth_refresh_tokens_set_input",
        where: "auth_refresh_tokens_bool_exp!",
      },
    },
    update_auth_refresh_tokens_by_pk: {
      __type: "auth_refresh_tokens",
      __args: {
        _set: "auth_refresh_tokens_set_input",
        pk_columns: "auth_refresh_tokens_pk_columns_input!",
      },
    },
    update_auth_roles: {
      __type: "auth_roles_mutation_response",
      __args: { _set: "auth_roles_set_input", where: "auth_roles_bool_exp!" },
    },
    update_auth_roles_by_pk: {
      __type: "auth_roles",
      __args: {
        _set: "auth_roles_set_input",
        pk_columns: "auth_roles_pk_columns_input!",
      },
    },
    update_authorships: {
      __type: "authorships_mutation_response",
      __args: { _set: "authorships_set_input", where: "authorships_bool_exp!" },
    },
    update_authorships_by_pk: {
      __type: "authorships",
      __args: {
        _set: "authorships_set_input",
        pk_columns: "authorships_pk_columns_input!",
      },
    },
    update_contents: {
      __type: "contents_mutation_response",
      __args: {
        _inc: "contents_inc_input",
        _set: "contents_set_input",
        where: "contents_bool_exp!",
      },
    },
    update_contents_by_pk: {
      __type: "contents",
      __args: {
        _inc: "contents_inc_input",
        _set: "contents_set_input",
        pk_columns: "contents_pk_columns_input!",
      },
    },
    update_events: {
      __type: "events_mutation_response",
      __args: { _set: "events_set_input", where: "events_bool_exp!" },
    },
    update_events_by_pk: {
      __type: "events",
      __args: {
        _set: "events_set_input",
        pk_columns: "events_pk_columns_input!",
      },
    },
    update_files: {
      __type: "files_mutation_response",
      __args: { _set: "files_set_input", where: "files_bool_exp!" },
    },
    update_files_by_pk: {
      __type: "files",
      __args: {
        _set: "files_set_input",
        pk_columns: "files_pk_columns_input!",
      },
    },
    update_folders: {
      __type: "folders_mutation_response",
      __args: {
        _inc: "folders_inc_input",
        _set: "folders_set_input",
        where: "folders_bool_exp!",
      },
    },
    update_folders_by_pk: {
      __type: "folders",
      __args: {
        _inc: "folders_inc_input",
        _set: "folders_set_input",
        pk_columns: "folders_pk_columns_input!",
      },
    },
    update_groups: {
      __type: "groups_mutation_response",
      __args: { _set: "groups_set_input", where: "groups_bool_exp!" },
    },
    update_groups_by_pk: {
      __type: "groups",
      __args: {
        _set: "groups_set_input",
        pk_columns: "groups_pk_columns_input!",
      },
    },
    update_identities: {
      __type: "identities_mutation_response",
      __args: { _set: "identities_set_input", where: "identities_bool_exp!" },
    },
    update_identities_by_pk: {
      __type: "identities",
      __args: {
        _set: "identities_set_input",
        pk_columns: "identities_pk_columns_input!",
      },
    },
    update_memberships: {
      __type: "memberships_mutation_response",
      __args: { _set: "memberships_set_input", where: "memberships_bool_exp!" },
    },
    update_memberships_by_pk: {
      __type: "memberships",
      __args: {
        _set: "memberships_set_input",
        pk_columns: "memberships_pk_columns_input!",
      },
    },
    update_polls: {
      __type: "polls_mutation_response",
      __args: {
        _inc: "polls_inc_input",
        _set: "polls_set_input",
        where: "polls_bool_exp!",
      },
    },
    update_polls_by_pk: {
      __type: "polls",
      __args: {
        _inc: "polls_inc_input",
        _set: "polls_set_input",
        pk_columns: "polls_pk_columns_input!",
      },
    },
    update_roles: {
      __type: "roles_mutation_response",
      __args: { _set: "roles_set_input", where: "roles_bool_exp!" },
    },
    update_roles_by_pk: {
      __type: "roles",
      __args: {
        _set: "roles_set_input",
        pk_columns: "roles_pk_columns_input!",
      },
    },
    update_speaks: {
      __type: "speaks_mutation_response",
      __args: {
        _inc: "speaks_inc_input",
        _set: "speaks_set_input",
        where: "speaks_bool_exp!",
      },
    },
    update_speaks_by_pk: {
      __type: "speaks",
      __args: {
        _inc: "speaks_inc_input",
        _set: "speaks_set_input",
        pk_columns: "speaks_pk_columns_input!",
      },
    },
    update_timers: {
      __type: "timers_mutation_response",
      __args: {
        _inc: "timers_inc_input",
        _set: "timers_set_input",
        where: "timers_bool_exp!",
      },
    },
    update_timers_by_pk: {
      __type: "timers",
      __args: {
        _inc: "timers_inc_input",
        _set: "timers_set_input",
        pk_columns: "timers_pk_columns_input!",
      },
    },
    update_users: {
      __type: "users_mutation_response",
      __args: { _set: "users_set_input", where: "users_bool_exp!" },
    },
    update_users_by_pk: {
      __type: "users",
      __args: {
        _set: "users_set_input",
        pk_columns: "users_pk_columns_input!",
      },
    },
    update_votes: {
      __type: "votes_mutation_response",
      __args: { _set: "votes_set_input", where: "votes_bool_exp!" },
    },
    update_votes_by_pk: {
      __type: "votes",
      __args: {
        _set: "votes_set_input",
        pk_columns: "votes_pk_columns_input!",
      },
    },
  },
  subscription: {
    __typename: { __type: "String!" },
    admissions: {
      __type: "[admissions!]!",
      __args: {
        distinct_on: "[admissions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[admissions_order_by!]",
        where: "admissions_bool_exp",
      },
    },
    admissions_aggregate: {
      __type: "admissions_aggregate!",
      __args: {
        distinct_on: "[admissions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[admissions_order_by!]",
        where: "admissions_bool_exp",
      },
    },
    admissions_by_pk: { __type: "admissions", __args: { id: "uuid!" } },
    auth_account_providers: {
      __type: "[auth_account_providers!]!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    auth_account_providers_aggregate: {
      __type: "auth_account_providers_aggregate!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    auth_account_providers_by_pk: {
      __type: "auth_account_providers",
      __args: { id: "uuid!" },
    },
    auth_account_roles: {
      __type: "[auth_account_roles!]!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    auth_account_roles_aggregate: {
      __type: "auth_account_roles_aggregate!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    auth_account_roles_by_pk: {
      __type: "auth_account_roles",
      __args: { id: "uuid!" },
    },
    auth_accounts: {
      __type: "[auth_accounts!]!",
      __args: {
        distinct_on: "[auth_accounts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_accounts_order_by!]",
        where: "auth_accounts_bool_exp",
      },
    },
    auth_accounts_aggregate: {
      __type: "auth_accounts_aggregate!",
      __args: {
        distinct_on: "[auth_accounts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_accounts_order_by!]",
        where: "auth_accounts_bool_exp",
      },
    },
    auth_accounts_by_pk: { __type: "auth_accounts", __args: { id: "uuid!" } },
    auth_providers: {
      __type: "[auth_providers!]!",
      __args: {
        distinct_on: "[auth_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_providers_order_by!]",
        where: "auth_providers_bool_exp",
      },
    },
    auth_providers_aggregate: {
      __type: "auth_providers_aggregate!",
      __args: {
        distinct_on: "[auth_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_providers_order_by!]",
        where: "auth_providers_bool_exp",
      },
    },
    auth_providers_by_pk: {
      __type: "auth_providers",
      __args: { provider: "String!" },
    },
    auth_refresh_tokens: {
      __type: "[auth_refresh_tokens!]!",
      __args: {
        distinct_on: "[auth_refresh_tokens_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_refresh_tokens_order_by!]",
        where: "auth_refresh_tokens_bool_exp",
      },
    },
    auth_refresh_tokens_aggregate: {
      __type: "auth_refresh_tokens_aggregate!",
      __args: {
        distinct_on: "[auth_refresh_tokens_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_refresh_tokens_order_by!]",
        where: "auth_refresh_tokens_bool_exp",
      },
    },
    auth_refresh_tokens_by_pk: {
      __type: "auth_refresh_tokens",
      __args: { refresh_token: "uuid!" },
    },
    auth_roles: {
      __type: "[auth_roles!]!",
      __args: {
        distinct_on: "[auth_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_roles_order_by!]",
        where: "auth_roles_bool_exp",
      },
    },
    auth_roles_aggregate: {
      __type: "auth_roles_aggregate!",
      __args: {
        distinct_on: "[auth_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_roles_order_by!]",
        where: "auth_roles_bool_exp",
      },
    },
    auth_roles_by_pk: { __type: "auth_roles", __args: { role: "String!" } },
    authorships: {
      __type: "[authorships!]!",
      __args: {
        distinct_on: "[authorships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[authorships_order_by!]",
        where: "authorships_bool_exp",
      },
    },
    authorships_aggregate: {
      __type: "authorships_aggregate!",
      __args: {
        distinct_on: "[authorships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[authorships_order_by!]",
        where: "authorships_bool_exp",
      },
    },
    authorships_by_pk: { __type: "authorships", __args: { id: "uuid!" } },
    canVote: { __type: "CanVoteOutput", __args: { eventId: "uuid" } },
    contents: {
      __type: "[contents!]!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    contents_aggregate: {
      __type: "contents_aggregate!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    contents_by_pk: { __type: "contents", __args: { id: "uuid!" } },
    events: {
      __type: "[events!]!",
      __args: {
        distinct_on: "[events_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[events_order_by!]",
        where: "events_bool_exp",
      },
    },
    events_aggregate: {
      __type: "events_aggregate!",
      __args: {
        distinct_on: "[events_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[events_order_by!]",
        where: "events_bool_exp",
      },
    },
    events_by_pk: { __type: "events", __args: { id: "uuid!" } },
    files: {
      __type: "[files!]!",
      __args: {
        distinct_on: "[files_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[files_order_by!]",
        where: "files_bool_exp",
      },
    },
    files_aggregate: {
      __type: "files_aggregate!",
      __args: {
        distinct_on: "[files_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[files_order_by!]",
        where: "files_bool_exp",
      },
    },
    files_by_pk: { __type: "files", __args: { id: "uuid!" } },
    folders: {
      __type: "[folders!]!",
      __args: {
        distinct_on: "[folders_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[folders_order_by!]",
        where: "folders_bool_exp",
      },
    },
    folders_aggregate: {
      __type: "folders_aggregate!",
      __args: {
        distinct_on: "[folders_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[folders_order_by!]",
        where: "folders_bool_exp",
      },
    },
    folders_by_pk: { __type: "folders", __args: { id: "uuid!" } },
    groups: {
      __type: "[groups!]!",
      __args: {
        distinct_on: "[groups_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[groups_order_by!]",
        where: "groups_bool_exp",
      },
    },
    groups_aggregate: {
      __type: "groups_aggregate!",
      __args: {
        distinct_on: "[groups_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[groups_order_by!]",
        where: "groups_bool_exp",
      },
    },
    groups_by_pk: { __type: "groups", __args: { id: "uuid!" } },
    identities: {
      __type: "[identities!]!",
      __args: {
        distinct_on: "[identities_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[identities_order_by!]",
        where: "identities_bool_exp",
      },
    },
    identities_aggregate: {
      __type: "identities_aggregate!",
      __args: {
        distinct_on: "[identities_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[identities_order_by!]",
        where: "identities_bool_exp",
      },
    },
    identities_by_pk: { __type: "identities", __args: { email: "String!" } },
    memberships: {
      __type: "[memberships!]!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    memberships_aggregate: {
      __type: "memberships_aggregate!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    memberships_by_pk: { __type: "memberships", __args: { id: "uuid!" } },
    polls: {
      __type: "[polls!]!",
      __args: {
        distinct_on: "[polls_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[polls_order_by!]",
        where: "polls_bool_exp",
      },
    },
    polls_aggregate: {
      __type: "polls_aggregate!",
      __args: {
        distinct_on: "[polls_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[polls_order_by!]",
        where: "polls_bool_exp",
      },
    },
    polls_by_pk: { __type: "polls", __args: { id: "uuid!" } },
    roles: {
      __type: "[roles!]!",
      __args: {
        distinct_on: "[roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[roles_order_by!]",
        where: "roles_bool_exp",
      },
    },
    roles_aggregate: {
      __type: "roles_aggregate!",
      __args: {
        distinct_on: "[roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[roles_order_by!]",
        where: "roles_bool_exp",
      },
    },
    roles_by_pk: { __type: "roles", __args: { id: "uuid!" } },
    speaks: {
      __type: "[speaks!]!",
      __args: {
        distinct_on: "[speaks_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[speaks_order_by!]",
        where: "speaks_bool_exp",
      },
    },
    speaks_aggregate: {
      __type: "speaks_aggregate!",
      __args: {
        distinct_on: "[speaks_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[speaks_order_by!]",
        where: "speaks_bool_exp",
      },
    },
    speaks_by_pk: { __type: "speaks", __args: { id: "uuid!" } },
    timers: {
      __type: "[timers!]!",
      __args: {
        distinct_on: "[timers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[timers_order_by!]",
        where: "timers_bool_exp",
      },
    },
    timers_aggregate: {
      __type: "timers_aggregate!",
      __args: {
        distinct_on: "[timers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[timers_order_by!]",
        where: "timers_bool_exp",
      },
    },
    timers_by_pk: { __type: "timers", __args: { id: "uuid!" } },
    users: {
      __type: "[users!]!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_aggregate: {
      __type: "users_aggregate!",
      __args: {
        distinct_on: "[users_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[users_order_by!]",
        where: "users_bool_exp",
      },
    },
    users_by_pk: { __type: "users", __args: { id: "uuid!" } },
    votes: {
      __type: "[votes!]!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_aggregate: {
      __type: "votes_aggregate!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_by_pk: { __type: "votes", __args: { id: "uuid!" } },
  },
  Boolean_comparison_exp: {
    _eq: { __type: "Boolean" },
    _gt: { __type: "Boolean" },
    _gte: { __type: "Boolean" },
    _in: { __type: "[Boolean!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "Boolean" },
    _lte: { __type: "Boolean" },
    _neq: { __type: "Boolean" },
    _nin: { __type: "[Boolean!]" },
  },
  CanVoteInput: { eventId: { __type: "uuid" } },
  CanVoteOutput: {
    __typename: { __type: "String!" },
    active: { __type: "Boolean" },
    canVote: { __type: "Boolean" },
    pollId: { __type: "uuid!" },
  },
  Int_comparison_exp: {
    _eq: { __type: "Int" },
    _gt: { __type: "Int" },
    _gte: { __type: "Int" },
    _in: { __type: "[Int!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "Int" },
    _lte: { __type: "Int" },
    _neq: { __type: "Int" },
    _nin: { __type: "[Int!]" },
  },
  String_comparison_exp: {
    _eq: { __type: "String" },
    _gt: { __type: "String" },
    _gte: { __type: "String" },
    _ilike: { __type: "String" },
    _in: { __type: "[String!]" },
    _is_null: { __type: "Boolean" },
    _like: { __type: "String" },
    _lt: { __type: "String" },
    _lte: { __type: "String" },
    _neq: { __type: "String" },
    _nilike: { __type: "String" },
    _nin: { __type: "[String!]" },
    _nlike: { __type: "String" },
    _nsimilar: { __type: "String" },
    _similar: { __type: "String" },
  },
  VoteInput: { pollId: { __type: "uuid" }, value: { __type: "[Int]" } },
  VoteOutput: {
    __typename: { __type: "String!" },
    headers: { __type: "String" },
    pollId: { __type: "uuid!" },
  },
  _int4_comparison_exp: {
    _eq: { __type: "_int4" },
    _gt: { __type: "_int4" },
    _gte: { __type: "_int4" },
    _in: { __type: "[_int4!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "_int4" },
    _lte: { __type: "_int4" },
    _neq: { __type: "_int4" },
    _nin: { __type: "[_int4!]" },
  },
  _text_comparison_exp: {
    _eq: { __type: "_text" },
    _gt: { __type: "_text" },
    _gte: { __type: "_text" },
    _in: { __type: "[_text!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "_text" },
    _lte: { __type: "_text" },
    _neq: { __type: "_text" },
    _nin: { __type: "[_text!]" },
  },
  admissions: {
    __typename: { __type: "String!" },
    checkedIn: { __type: "Boolean!" },
    email: { __type: "String!" },
    event: { __type: "events" },
    eventId: { __type: "uuid!" },
    id: { __type: "uuid!" },
    identity: { __type: "identities" },
    voting: { __type: "Boolean" },
  },
  admissions_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "admissions_aggregate_fields" },
    nodes: { __type: "[admissions!]!" },
  },
  admissions_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[admissions_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "admissions_max_fields" },
    min: { __type: "admissions_min_fields" },
  },
  admissions_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "admissions_max_order_by" },
    min: { __type: "admissions_min_order_by" },
  },
  admissions_arr_rel_insert_input: {
    data: { __type: "[admissions_insert_input!]!" },
    on_conflict: { __type: "admissions_on_conflict" },
  },
  admissions_bool_exp: {
    _and: { __type: "[admissions_bool_exp]" },
    _not: { __type: "admissions_bool_exp" },
    _or: { __type: "[admissions_bool_exp]" },
    checkedIn: { __type: "Boolean_comparison_exp" },
    email: { __type: "String_comparison_exp" },
    event: { __type: "events_bool_exp" },
    eventId: { __type: "uuid_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    identity: { __type: "identities_bool_exp" },
    voting: { __type: "Boolean_comparison_exp" },
  },
  admissions_insert_input: {
    checkedIn: { __type: "Boolean" },
    email: { __type: "String" },
    event: { __type: "events_obj_rel_insert_input" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    identity: { __type: "identities_obj_rel_insert_input" },
    voting: { __type: "Boolean" },
  },
  admissions_max_fields: {
    __typename: { __type: "String!" },
    email: { __type: "String" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
  },
  admissions_max_order_by: {
    email: { __type: "order_by" },
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
  },
  admissions_min_fields: {
    __typename: { __type: "String!" },
    email: { __type: "String" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
  },
  admissions_min_order_by: {
    email: { __type: "order_by" },
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
  },
  admissions_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[admissions!]!" },
  },
  admissions_obj_rel_insert_input: {
    data: { __type: "admissions_insert_input!" },
    on_conflict: { __type: "admissions_on_conflict" },
  },
  admissions_on_conflict: {
    constraint: { __type: "admissions_constraint!" },
    update_columns: { __type: "[admissions_update_column!]!" },
    where: { __type: "admissions_bool_exp" },
  },
  admissions_order_by: {
    checkedIn: { __type: "order_by" },
    email: { __type: "order_by" },
    event: { __type: "events_order_by" },
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    identity: { __type: "identities_order_by" },
    voting: { __type: "order_by" },
  },
  admissions_pk_columns_input: { id: { __type: "uuid!" } },
  admissions_set_input: {
    checkedIn: { __type: "Boolean" },
    email: { __type: "String" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    voting: { __type: "Boolean" },
  },
  auth_account_providers: {
    __typename: { __type: "String!" },
    account: { __type: "auth_accounts!" },
    account_id: { __type: "uuid!" },
    auth_provider: { __type: "String!" },
    auth_provider_unique_id: { __type: "String!" },
    created_at: { __type: "timestamptz!" },
    id: { __type: "uuid!" },
    provider: { __type: "auth_providers!" },
    updated_at: { __type: "timestamptz!" },
  },
  auth_account_providers_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "auth_account_providers_aggregate_fields" },
    nodes: { __type: "[auth_account_providers!]!" },
  },
  auth_account_providers_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: {
        columns: "[auth_account_providers_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "auth_account_providers_max_fields" },
    min: { __type: "auth_account_providers_min_fields" },
  },
  auth_account_providers_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "auth_account_providers_max_order_by" },
    min: { __type: "auth_account_providers_min_order_by" },
  },
  auth_account_providers_arr_rel_insert_input: {
    data: { __type: "[auth_account_providers_insert_input!]!" },
    on_conflict: { __type: "auth_account_providers_on_conflict" },
  },
  auth_account_providers_bool_exp: {
    _and: { __type: "[auth_account_providers_bool_exp]" },
    _not: { __type: "auth_account_providers_bool_exp" },
    _or: { __type: "[auth_account_providers_bool_exp]" },
    account: { __type: "auth_accounts_bool_exp" },
    account_id: { __type: "uuid_comparison_exp" },
    auth_provider: { __type: "String_comparison_exp" },
    auth_provider_unique_id: { __type: "String_comparison_exp" },
    created_at: { __type: "timestamptz_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    provider: { __type: "auth_providers_bool_exp" },
    updated_at: { __type: "timestamptz_comparison_exp" },
  },
  auth_account_providers_insert_input: {
    account: { __type: "auth_accounts_obj_rel_insert_input" },
    account_id: { __type: "uuid" },
    auth_provider: { __type: "String" },
    auth_provider_unique_id: { __type: "String" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    provider: { __type: "auth_providers_obj_rel_insert_input" },
    updated_at: { __type: "timestamptz" },
  },
  auth_account_providers_max_fields: {
    __typename: { __type: "String!" },
    account_id: { __type: "uuid" },
    auth_provider: { __type: "String" },
    auth_provider_unique_id: { __type: "String" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    updated_at: { __type: "timestamptz" },
  },
  auth_account_providers_max_order_by: {
    account_id: { __type: "order_by" },
    auth_provider: { __type: "order_by" },
    auth_provider_unique_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    updated_at: { __type: "order_by" },
  },
  auth_account_providers_min_fields: {
    __typename: { __type: "String!" },
    account_id: { __type: "uuid" },
    auth_provider: { __type: "String" },
    auth_provider_unique_id: { __type: "String" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    updated_at: { __type: "timestamptz" },
  },
  auth_account_providers_min_order_by: {
    account_id: { __type: "order_by" },
    auth_provider: { __type: "order_by" },
    auth_provider_unique_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    updated_at: { __type: "order_by" },
  },
  auth_account_providers_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[auth_account_providers!]!" },
  },
  auth_account_providers_obj_rel_insert_input: {
    data: { __type: "auth_account_providers_insert_input!" },
    on_conflict: { __type: "auth_account_providers_on_conflict" },
  },
  auth_account_providers_on_conflict: {
    constraint: { __type: "auth_account_providers_constraint!" },
    update_columns: { __type: "[auth_account_providers_update_column!]!" },
    where: { __type: "auth_account_providers_bool_exp" },
  },
  auth_account_providers_order_by: {
    account: { __type: "auth_accounts_order_by" },
    account_id: { __type: "order_by" },
    auth_provider: { __type: "order_by" },
    auth_provider_unique_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    provider: { __type: "auth_providers_order_by" },
    updated_at: { __type: "order_by" },
  },
  auth_account_providers_pk_columns_input: { id: { __type: "uuid!" } },
  auth_account_providers_set_input: {
    account_id: { __type: "uuid" },
    auth_provider: { __type: "String" },
    auth_provider_unique_id: { __type: "String" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    updated_at: { __type: "timestamptz" },
  },
  auth_account_roles: {
    __typename: { __type: "String!" },
    account: { __type: "auth_accounts!" },
    account_id: { __type: "uuid!" },
    created_at: { __type: "timestamptz!" },
    id: { __type: "uuid!" },
    role: { __type: "String!" },
    roleByRole: { __type: "auth_roles!" },
  },
  auth_account_roles_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "auth_account_roles_aggregate_fields" },
    nodes: { __type: "[auth_account_roles!]!" },
  },
  auth_account_roles_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: {
        columns: "[auth_account_roles_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "auth_account_roles_max_fields" },
    min: { __type: "auth_account_roles_min_fields" },
  },
  auth_account_roles_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "auth_account_roles_max_order_by" },
    min: { __type: "auth_account_roles_min_order_by" },
  },
  auth_account_roles_arr_rel_insert_input: {
    data: { __type: "[auth_account_roles_insert_input!]!" },
    on_conflict: { __type: "auth_account_roles_on_conflict" },
  },
  auth_account_roles_bool_exp: {
    _and: { __type: "[auth_account_roles_bool_exp]" },
    _not: { __type: "auth_account_roles_bool_exp" },
    _or: { __type: "[auth_account_roles_bool_exp]" },
    account: { __type: "auth_accounts_bool_exp" },
    account_id: { __type: "uuid_comparison_exp" },
    created_at: { __type: "timestamptz_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    role: { __type: "String_comparison_exp" },
    roleByRole: { __type: "auth_roles_bool_exp" },
  },
  auth_account_roles_insert_input: {
    account: { __type: "auth_accounts_obj_rel_insert_input" },
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    role: { __type: "String" },
    roleByRole: { __type: "auth_roles_obj_rel_insert_input" },
  },
  auth_account_roles_max_fields: {
    __typename: { __type: "String!" },
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    role: { __type: "String" },
  },
  auth_account_roles_max_order_by: {
    account_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    role: { __type: "order_by" },
  },
  auth_account_roles_min_fields: {
    __typename: { __type: "String!" },
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    role: { __type: "String" },
  },
  auth_account_roles_min_order_by: {
    account_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    role: { __type: "order_by" },
  },
  auth_account_roles_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[auth_account_roles!]!" },
  },
  auth_account_roles_obj_rel_insert_input: {
    data: { __type: "auth_account_roles_insert_input!" },
    on_conflict: { __type: "auth_account_roles_on_conflict" },
  },
  auth_account_roles_on_conflict: {
    constraint: { __type: "auth_account_roles_constraint!" },
    update_columns: { __type: "[auth_account_roles_update_column!]!" },
    where: { __type: "auth_account_roles_bool_exp" },
  },
  auth_account_roles_order_by: {
    account: { __type: "auth_accounts_order_by" },
    account_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    id: { __type: "order_by" },
    role: { __type: "order_by" },
    roleByRole: { __type: "auth_roles_order_by" },
  },
  auth_account_roles_pk_columns_input: { id: { __type: "uuid!" } },
  auth_account_roles_set_input: {
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    id: { __type: "uuid" },
    role: { __type: "String" },
  },
  auth_accounts: {
    __typename: { __type: "String!" },
    account_providers: {
      __type: "[auth_account_providers!]!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    account_providers_aggregate: {
      __type: "auth_account_providers_aggregate!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    account_roles: {
      __type: "[auth_account_roles!]!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    account_roles_aggregate: {
      __type: "auth_account_roles_aggregate!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    active: { __type: "Boolean!" },
    created_at: { __type: "timestamptz!" },
    custom_register_data: { __type: "jsonb", __args: { path: "String" } },
    default_role: { __type: "String!" },
    email: { __type: "citext" },
    id: { __type: "uuid!" },
    is_anonymous: { __type: "Boolean!" },
    mfa_enabled: { __type: "Boolean!" },
    new_email: { __type: "citext" },
    otp_secret: { __type: "String" },
    password_hash: { __type: "String" },
    refresh_tokens: {
      __type: "[auth_refresh_tokens!]!",
      __args: {
        distinct_on: "[auth_refresh_tokens_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_refresh_tokens_order_by!]",
        where: "auth_refresh_tokens_bool_exp",
      },
    },
    refresh_tokens_aggregate: {
      __type: "auth_refresh_tokens_aggregate!",
      __args: {
        distinct_on: "[auth_refresh_tokens_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_refresh_tokens_order_by!]",
        where: "auth_refresh_tokens_bool_exp",
      },
    },
    role: { __type: "auth_roles!" },
    ticket: { __type: "uuid!" },
    ticket_expires_at: { __type: "timestamptz!" },
    updated_at: { __type: "timestamptz!" },
    user: { __type: "users!" },
    user_id: { __type: "uuid!" },
  },
  auth_accounts_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "auth_accounts_aggregate_fields" },
    nodes: { __type: "[auth_accounts!]!" },
  },
  auth_accounts_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: {
        columns: "[auth_accounts_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "auth_accounts_max_fields" },
    min: { __type: "auth_accounts_min_fields" },
  },
  auth_accounts_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "auth_accounts_max_order_by" },
    min: { __type: "auth_accounts_min_order_by" },
  },
  auth_accounts_append_input: { custom_register_data: { __type: "jsonb" } },
  auth_accounts_arr_rel_insert_input: {
    data: { __type: "[auth_accounts_insert_input!]!" },
    on_conflict: { __type: "auth_accounts_on_conflict" },
  },
  auth_accounts_bool_exp: {
    _and: { __type: "[auth_accounts_bool_exp]" },
    _not: { __type: "auth_accounts_bool_exp" },
    _or: { __type: "[auth_accounts_bool_exp]" },
    account_providers: { __type: "auth_account_providers_bool_exp" },
    account_roles: { __type: "auth_account_roles_bool_exp" },
    active: { __type: "Boolean_comparison_exp" },
    created_at: { __type: "timestamptz_comparison_exp" },
    custom_register_data: { __type: "jsonb_comparison_exp" },
    default_role: { __type: "String_comparison_exp" },
    email: { __type: "citext_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    is_anonymous: { __type: "Boolean_comparison_exp" },
    mfa_enabled: { __type: "Boolean_comparison_exp" },
    new_email: { __type: "citext_comparison_exp" },
    otp_secret: { __type: "String_comparison_exp" },
    password_hash: { __type: "String_comparison_exp" },
    refresh_tokens: { __type: "auth_refresh_tokens_bool_exp" },
    role: { __type: "auth_roles_bool_exp" },
    ticket: { __type: "uuid_comparison_exp" },
    ticket_expires_at: { __type: "timestamptz_comparison_exp" },
    updated_at: { __type: "timestamptz_comparison_exp" },
    user: { __type: "users_bool_exp" },
    user_id: { __type: "uuid_comparison_exp" },
  },
  auth_accounts_delete_at_path_input: {
    custom_register_data: { __type: "[String]" },
  },
  auth_accounts_delete_elem_input: { custom_register_data: { __type: "Int" } },
  auth_accounts_delete_key_input: {
    custom_register_data: { __type: "String" },
  },
  auth_accounts_insert_input: {
    account_providers: {
      __type: "auth_account_providers_arr_rel_insert_input",
    },
    account_roles: { __type: "auth_account_roles_arr_rel_insert_input" },
    active: { __type: "Boolean" },
    created_at: { __type: "timestamptz" },
    custom_register_data: { __type: "jsonb" },
    default_role: { __type: "String" },
    email: { __type: "citext" },
    id: { __type: "uuid" },
    is_anonymous: { __type: "Boolean" },
    mfa_enabled: { __type: "Boolean" },
    new_email: { __type: "citext" },
    otp_secret: { __type: "String" },
    password_hash: { __type: "String" },
    refresh_tokens: { __type: "auth_refresh_tokens_arr_rel_insert_input" },
    role: { __type: "auth_roles_obj_rel_insert_input" },
    ticket: { __type: "uuid" },
    ticket_expires_at: { __type: "timestamptz" },
    updated_at: { __type: "timestamptz" },
    user: { __type: "users_obj_rel_insert_input" },
    user_id: { __type: "uuid" },
  },
  auth_accounts_max_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    default_role: { __type: "String" },
    email: { __type: "citext" },
    id: { __type: "uuid" },
    new_email: { __type: "citext" },
    otp_secret: { __type: "String" },
    password_hash: { __type: "String" },
    ticket: { __type: "uuid" },
    ticket_expires_at: { __type: "timestamptz" },
    updated_at: { __type: "timestamptz" },
    user_id: { __type: "uuid" },
  },
  auth_accounts_max_order_by: {
    created_at: { __type: "order_by" },
    default_role: { __type: "order_by" },
    email: { __type: "order_by" },
    id: { __type: "order_by" },
    new_email: { __type: "order_by" },
    otp_secret: { __type: "order_by" },
    password_hash: { __type: "order_by" },
    ticket: { __type: "order_by" },
    ticket_expires_at: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    user_id: { __type: "order_by" },
  },
  auth_accounts_min_fields: {
    __typename: { __type: "String!" },
    created_at: { __type: "timestamptz" },
    default_role: { __type: "String" },
    email: { __type: "citext" },
    id: { __type: "uuid" },
    new_email: { __type: "citext" },
    otp_secret: { __type: "String" },
    password_hash: { __type: "String" },
    ticket: { __type: "uuid" },
    ticket_expires_at: { __type: "timestamptz" },
    updated_at: { __type: "timestamptz" },
    user_id: { __type: "uuid" },
  },
  auth_accounts_min_order_by: {
    created_at: { __type: "order_by" },
    default_role: { __type: "order_by" },
    email: { __type: "order_by" },
    id: { __type: "order_by" },
    new_email: { __type: "order_by" },
    otp_secret: { __type: "order_by" },
    password_hash: { __type: "order_by" },
    ticket: { __type: "order_by" },
    ticket_expires_at: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    user_id: { __type: "order_by" },
  },
  auth_accounts_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[auth_accounts!]!" },
  },
  auth_accounts_obj_rel_insert_input: {
    data: { __type: "auth_accounts_insert_input!" },
    on_conflict: { __type: "auth_accounts_on_conflict" },
  },
  auth_accounts_on_conflict: {
    constraint: { __type: "auth_accounts_constraint!" },
    update_columns: { __type: "[auth_accounts_update_column!]!" },
    where: { __type: "auth_accounts_bool_exp" },
  },
  auth_accounts_order_by: {
    account_providers_aggregate: {
      __type: "auth_account_providers_aggregate_order_by",
    },
    account_roles_aggregate: {
      __type: "auth_account_roles_aggregate_order_by",
    },
    active: { __type: "order_by" },
    created_at: { __type: "order_by" },
    custom_register_data: { __type: "order_by" },
    default_role: { __type: "order_by" },
    email: { __type: "order_by" },
    id: { __type: "order_by" },
    is_anonymous: { __type: "order_by" },
    mfa_enabled: { __type: "order_by" },
    new_email: { __type: "order_by" },
    otp_secret: { __type: "order_by" },
    password_hash: { __type: "order_by" },
    refresh_tokens_aggregate: {
      __type: "auth_refresh_tokens_aggregate_order_by",
    },
    role: { __type: "auth_roles_order_by" },
    ticket: { __type: "order_by" },
    ticket_expires_at: { __type: "order_by" },
    updated_at: { __type: "order_by" },
    user: { __type: "users_order_by" },
    user_id: { __type: "order_by" },
  },
  auth_accounts_pk_columns_input: { id: { __type: "uuid!" } },
  auth_accounts_prepend_input: { custom_register_data: { __type: "jsonb" } },
  auth_accounts_set_input: {
    active: { __type: "Boolean" },
    created_at: { __type: "timestamptz" },
    custom_register_data: { __type: "jsonb" },
    default_role: { __type: "String" },
    email: { __type: "citext" },
    id: { __type: "uuid" },
    is_anonymous: { __type: "Boolean" },
    mfa_enabled: { __type: "Boolean" },
    new_email: { __type: "citext" },
    otp_secret: { __type: "String" },
    password_hash: { __type: "String" },
    ticket: { __type: "uuid" },
    ticket_expires_at: { __type: "timestamptz" },
    updated_at: { __type: "timestamptz" },
    user_id: { __type: "uuid" },
  },
  auth_providers: {
    __typename: { __type: "String!" },
    account_providers: {
      __type: "[auth_account_providers!]!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    account_providers_aggregate: {
      __type: "auth_account_providers_aggregate!",
      __args: {
        distinct_on: "[auth_account_providers_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_providers_order_by!]",
        where: "auth_account_providers_bool_exp",
      },
    },
    provider: { __type: "String!" },
  },
  auth_providers_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "auth_providers_aggregate_fields" },
    nodes: { __type: "[auth_providers!]!" },
  },
  auth_providers_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: {
        columns: "[auth_providers_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "auth_providers_max_fields" },
    min: { __type: "auth_providers_min_fields" },
  },
  auth_providers_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "auth_providers_max_order_by" },
    min: { __type: "auth_providers_min_order_by" },
  },
  auth_providers_arr_rel_insert_input: {
    data: { __type: "[auth_providers_insert_input!]!" },
    on_conflict: { __type: "auth_providers_on_conflict" },
  },
  auth_providers_bool_exp: {
    _and: { __type: "[auth_providers_bool_exp]" },
    _not: { __type: "auth_providers_bool_exp" },
    _or: { __type: "[auth_providers_bool_exp]" },
    account_providers: { __type: "auth_account_providers_bool_exp" },
    provider: { __type: "String_comparison_exp" },
  },
  auth_providers_insert_input: {
    account_providers: {
      __type: "auth_account_providers_arr_rel_insert_input",
    },
    provider: { __type: "String" },
  },
  auth_providers_max_fields: {
    __typename: { __type: "String!" },
    provider: { __type: "String" },
  },
  auth_providers_max_order_by: { provider: { __type: "order_by" } },
  auth_providers_min_fields: {
    __typename: { __type: "String!" },
    provider: { __type: "String" },
  },
  auth_providers_min_order_by: { provider: { __type: "order_by" } },
  auth_providers_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[auth_providers!]!" },
  },
  auth_providers_obj_rel_insert_input: {
    data: { __type: "auth_providers_insert_input!" },
    on_conflict: { __type: "auth_providers_on_conflict" },
  },
  auth_providers_on_conflict: {
    constraint: { __type: "auth_providers_constraint!" },
    update_columns: { __type: "[auth_providers_update_column!]!" },
    where: { __type: "auth_providers_bool_exp" },
  },
  auth_providers_order_by: {
    account_providers_aggregate: {
      __type: "auth_account_providers_aggregate_order_by",
    },
    provider: { __type: "order_by" },
  },
  auth_providers_pk_columns_input: { provider: { __type: "String!" } },
  auth_providers_set_input: { provider: { __type: "String" } },
  auth_refresh_tokens: {
    __typename: { __type: "String!" },
    account: { __type: "auth_accounts!" },
    account_id: { __type: "uuid!" },
    created_at: { __type: "timestamptz!" },
    expires_at: { __type: "timestamptz!" },
    refresh_token: { __type: "uuid!" },
  },
  auth_refresh_tokens_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "auth_refresh_tokens_aggregate_fields" },
    nodes: { __type: "[auth_refresh_tokens!]!" },
  },
  auth_refresh_tokens_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: {
        columns: "[auth_refresh_tokens_select_column!]",
        distinct: "Boolean",
      },
    },
    max: { __type: "auth_refresh_tokens_max_fields" },
    min: { __type: "auth_refresh_tokens_min_fields" },
  },
  auth_refresh_tokens_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "auth_refresh_tokens_max_order_by" },
    min: { __type: "auth_refresh_tokens_min_order_by" },
  },
  auth_refresh_tokens_arr_rel_insert_input: {
    data: { __type: "[auth_refresh_tokens_insert_input!]!" },
    on_conflict: { __type: "auth_refresh_tokens_on_conflict" },
  },
  auth_refresh_tokens_bool_exp: {
    _and: { __type: "[auth_refresh_tokens_bool_exp]" },
    _not: { __type: "auth_refresh_tokens_bool_exp" },
    _or: { __type: "[auth_refresh_tokens_bool_exp]" },
    account: { __type: "auth_accounts_bool_exp" },
    account_id: { __type: "uuid_comparison_exp" },
    created_at: { __type: "timestamptz_comparison_exp" },
    expires_at: { __type: "timestamptz_comparison_exp" },
    refresh_token: { __type: "uuid_comparison_exp" },
  },
  auth_refresh_tokens_insert_input: {
    account: { __type: "auth_accounts_obj_rel_insert_input" },
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    expires_at: { __type: "timestamptz" },
    refresh_token: { __type: "uuid" },
  },
  auth_refresh_tokens_max_fields: {
    __typename: { __type: "String!" },
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    expires_at: { __type: "timestamptz" },
    refresh_token: { __type: "uuid" },
  },
  auth_refresh_tokens_max_order_by: {
    account_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    expires_at: { __type: "order_by" },
    refresh_token: { __type: "order_by" },
  },
  auth_refresh_tokens_min_fields: {
    __typename: { __type: "String!" },
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    expires_at: { __type: "timestamptz" },
    refresh_token: { __type: "uuid" },
  },
  auth_refresh_tokens_min_order_by: {
    account_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    expires_at: { __type: "order_by" },
    refresh_token: { __type: "order_by" },
  },
  auth_refresh_tokens_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[auth_refresh_tokens!]!" },
  },
  auth_refresh_tokens_obj_rel_insert_input: {
    data: { __type: "auth_refresh_tokens_insert_input!" },
    on_conflict: { __type: "auth_refresh_tokens_on_conflict" },
  },
  auth_refresh_tokens_on_conflict: {
    constraint: { __type: "auth_refresh_tokens_constraint!" },
    update_columns: { __type: "[auth_refresh_tokens_update_column!]!" },
    where: { __type: "auth_refresh_tokens_bool_exp" },
  },
  auth_refresh_tokens_order_by: {
    account: { __type: "auth_accounts_order_by" },
    account_id: { __type: "order_by" },
    created_at: { __type: "order_by" },
    expires_at: { __type: "order_by" },
    refresh_token: { __type: "order_by" },
  },
  auth_refresh_tokens_pk_columns_input: { refresh_token: { __type: "uuid!" } },
  auth_refresh_tokens_set_input: {
    account_id: { __type: "uuid" },
    created_at: { __type: "timestamptz" },
    expires_at: { __type: "timestamptz" },
    refresh_token: { __type: "uuid" },
  },
  auth_roles: {
    __typename: { __type: "String!" },
    account_roles: {
      __type: "[auth_account_roles!]!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    account_roles_aggregate: {
      __type: "auth_account_roles_aggregate!",
      __args: {
        distinct_on: "[auth_account_roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_account_roles_order_by!]",
        where: "auth_account_roles_bool_exp",
      },
    },
    accounts: {
      __type: "[auth_accounts!]!",
      __args: {
        distinct_on: "[auth_accounts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_accounts_order_by!]",
        where: "auth_accounts_bool_exp",
      },
    },
    accounts_aggregate: {
      __type: "auth_accounts_aggregate!",
      __args: {
        distinct_on: "[auth_accounts_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[auth_accounts_order_by!]",
        where: "auth_accounts_bool_exp",
      },
    },
    role: { __type: "String!" },
  },
  auth_roles_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "auth_roles_aggregate_fields" },
    nodes: { __type: "[auth_roles!]!" },
  },
  auth_roles_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[auth_roles_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "auth_roles_max_fields" },
    min: { __type: "auth_roles_min_fields" },
  },
  auth_roles_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "auth_roles_max_order_by" },
    min: { __type: "auth_roles_min_order_by" },
  },
  auth_roles_arr_rel_insert_input: {
    data: { __type: "[auth_roles_insert_input!]!" },
    on_conflict: { __type: "auth_roles_on_conflict" },
  },
  auth_roles_bool_exp: {
    _and: { __type: "[auth_roles_bool_exp]" },
    _not: { __type: "auth_roles_bool_exp" },
    _or: { __type: "[auth_roles_bool_exp]" },
    account_roles: { __type: "auth_account_roles_bool_exp" },
    accounts: { __type: "auth_accounts_bool_exp" },
    role: { __type: "String_comparison_exp" },
  },
  auth_roles_insert_input: {
    account_roles: { __type: "auth_account_roles_arr_rel_insert_input" },
    accounts: { __type: "auth_accounts_arr_rel_insert_input" },
    role: { __type: "String" },
  },
  auth_roles_max_fields: {
    __typename: { __type: "String!" },
    role: { __type: "String" },
  },
  auth_roles_max_order_by: { role: { __type: "order_by" } },
  auth_roles_min_fields: {
    __typename: { __type: "String!" },
    role: { __type: "String" },
  },
  auth_roles_min_order_by: { role: { __type: "order_by" } },
  auth_roles_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[auth_roles!]!" },
  },
  auth_roles_obj_rel_insert_input: {
    data: { __type: "auth_roles_insert_input!" },
    on_conflict: { __type: "auth_roles_on_conflict" },
  },
  auth_roles_on_conflict: {
    constraint: { __type: "auth_roles_constraint!" },
    update_columns: { __type: "[auth_roles_update_column!]!" },
    where: { __type: "auth_roles_bool_exp" },
  },
  auth_roles_order_by: {
    account_roles_aggregate: {
      __type: "auth_account_roles_aggregate_order_by",
    },
    accounts_aggregate: { __type: "auth_accounts_aggregate_order_by" },
    role: { __type: "order_by" },
  },
  auth_roles_pk_columns_input: { role: { __type: "String!" } },
  auth_roles_set_input: { role: { __type: "String" } },
  authorships: {
    __typename: { __type: "String!" },
    content: { __type: "contents" },
    contentId: { __type: "uuid!" },
    email: { __type: "String" },
    id: { __type: "uuid!" },
    identity: { __type: "identities" },
    name: { __type: "String" },
  },
  authorships_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "authorships_aggregate_fields" },
    nodes: { __type: "[authorships!]!" },
  },
  authorships_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[authorships_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "authorships_max_fields" },
    min: { __type: "authorships_min_fields" },
  },
  authorships_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "authorships_max_order_by" },
    min: { __type: "authorships_min_order_by" },
  },
  authorships_arr_rel_insert_input: {
    data: { __type: "[authorships_insert_input!]!" },
    on_conflict: { __type: "authorships_on_conflict" },
  },
  authorships_bool_exp: {
    _and: { __type: "[authorships_bool_exp]" },
    _not: { __type: "authorships_bool_exp" },
    _or: { __type: "[authorships_bool_exp]" },
    content: { __type: "contents_bool_exp" },
    contentId: { __type: "uuid_comparison_exp" },
    email: { __type: "String_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    identity: { __type: "identities_bool_exp" },
    name: { __type: "String_comparison_exp" },
  },
  authorships_insert_input: {
    content: { __type: "contents_obj_rel_insert_input" },
    contentId: { __type: "uuid" },
    email: { __type: "String" },
    id: { __type: "uuid" },
    identity: { __type: "identities_obj_rel_insert_input" },
    name: { __type: "String" },
  },
  authorships_max_fields: {
    __typename: { __type: "String!" },
    contentId: { __type: "uuid" },
    email: { __type: "String" },
    id: { __type: "uuid" },
    name: { __type: "String" },
  },
  authorships_max_order_by: {
    contentId: { __type: "order_by" },
    email: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
  },
  authorships_min_fields: {
    __typename: { __type: "String!" },
    contentId: { __type: "uuid" },
    email: { __type: "String" },
    id: { __type: "uuid" },
    name: { __type: "String" },
  },
  authorships_min_order_by: {
    contentId: { __type: "order_by" },
    email: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
  },
  authorships_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[authorships!]!" },
  },
  authorships_obj_rel_insert_input: {
    data: { __type: "authorships_insert_input!" },
    on_conflict: { __type: "authorships_on_conflict" },
  },
  authorships_on_conflict: {
    constraint: { __type: "authorships_constraint!" },
    update_columns: { __type: "[authorships_update_column!]!" },
    where: { __type: "authorships_bool_exp" },
  },
  authorships_order_by: {
    content: { __type: "contents_order_by" },
    contentId: { __type: "order_by" },
    email: { __type: "order_by" },
    id: { __type: "order_by" },
    identity: { __type: "identities_order_by" },
    name: { __type: "order_by" },
  },
  authorships_pk_columns_input: { id: { __type: "uuid!" } },
  authorships_set_input: {
    contentId: { __type: "uuid" },
    email: { __type: "String" },
    id: { __type: "uuid" },
    name: { __type: "String" },
  },
  citext_comparison_exp: {
    _eq: { __type: "citext" },
    _gt: { __type: "citext" },
    _gte: { __type: "citext" },
    _ilike: { __type: "String" },
    _in: { __type: "[citext!]" },
    _is_null: { __type: "Boolean" },
    _like: { __type: "String" },
    _lt: { __type: "citext" },
    _lte: { __type: "citext" },
    _neq: { __type: "citext" },
    _nilike: { __type: "String" },
    _nin: { __type: "[citext!]" },
    _nlike: { __type: "String" },
    _nsimilar: { __type: "String" },
    _similar: { __type: "String" },
  },
  contents: {
    __typename: { __type: "String!" },
    authors: {
      __type: "[authorships!]!",
      __args: {
        distinct_on: "[authorships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[authorships_order_by!]",
        where: "authorships_bool_exp",
      },
    },
    authors_aggregate: {
      __type: "authorships_aggregate!",
      __args: {
        distinct_on: "[authorships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[authorships_order_by!]",
        where: "authorships_bool_exp",
      },
    },
    children: {
      __type: "[contents!]!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    children_aggregate: {
      __type: "contents_aggregate!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    createdAt: { __type: "timestamptz" },
    creator: { __type: "users" },
    creatorId: { __type: "uuid!" },
    data: { __type: "String!" },
    file: { __type: "files" },
    fileId: { __type: "uuid" },
    folder: { __type: "folders" },
    folderId: { __type: "uuid!" },
    id: { __type: "uuid!" },
    name: { __type: "String!" },
    parent: { __type: "contents" },
    parentId: { __type: "uuid" },
    polls: {
      __type: "[polls!]!",
      __args: {
        distinct_on: "[polls_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[polls_order_by!]",
        where: "polls_bool_exp",
      },
    },
    polls_aggregate: {
      __type: "polls_aggregate!",
      __args: {
        distinct_on: "[polls_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[polls_order_by!]",
        where: "polls_bool_exp",
      },
    },
    priority: { __type: "Int!" },
    published: { __type: "Boolean!" },
    updatedAt: { __type: "timestamptz" },
  },
  contents_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "contents_aggregate_fields" },
    nodes: { __type: "[contents!]!" },
  },
  contents_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "contents_avg_fields" },
    count: {
      __type: "Int",
      __args: { columns: "[contents_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "contents_max_fields" },
    min: { __type: "contents_min_fields" },
    stddev: { __type: "contents_stddev_fields" },
    stddev_pop: { __type: "contents_stddev_pop_fields" },
    stddev_samp: { __type: "contents_stddev_samp_fields" },
    sum: { __type: "contents_sum_fields" },
    var_pop: { __type: "contents_var_pop_fields" },
    var_samp: { __type: "contents_var_samp_fields" },
    variance: { __type: "contents_variance_fields" },
  },
  contents_aggregate_order_by: {
    avg: { __type: "contents_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "contents_max_order_by" },
    min: { __type: "contents_min_order_by" },
    stddev: { __type: "contents_stddev_order_by" },
    stddev_pop: { __type: "contents_stddev_pop_order_by" },
    stddev_samp: { __type: "contents_stddev_samp_order_by" },
    sum: { __type: "contents_sum_order_by" },
    var_pop: { __type: "contents_var_pop_order_by" },
    var_samp: { __type: "contents_var_samp_order_by" },
    variance: { __type: "contents_variance_order_by" },
  },
  contents_arr_rel_insert_input: {
    data: { __type: "[contents_insert_input!]!" },
    on_conflict: { __type: "contents_on_conflict" },
  },
  contents_avg_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  contents_avg_order_by: { priority: { __type: "order_by" } },
  contents_bool_exp: {
    _and: { __type: "[contents_bool_exp]" },
    _not: { __type: "contents_bool_exp" },
    _or: { __type: "[contents_bool_exp]" },
    authors: { __type: "authorships_bool_exp" },
    children: { __type: "contents_bool_exp" },
    createdAt: { __type: "timestamptz_comparison_exp" },
    creator: { __type: "users_bool_exp" },
    creatorId: { __type: "uuid_comparison_exp" },
    data: { __type: "String_comparison_exp" },
    file: { __type: "files_bool_exp" },
    fileId: { __type: "uuid_comparison_exp" },
    folder: { __type: "folders_bool_exp" },
    folderId: { __type: "uuid_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    name: { __type: "String_comparison_exp" },
    parent: { __type: "contents_bool_exp" },
    parentId: { __type: "uuid_comparison_exp" },
    polls: { __type: "polls_bool_exp" },
    priority: { __type: "Int_comparison_exp" },
    published: { __type: "Boolean_comparison_exp" },
    updatedAt: { __type: "timestamptz_comparison_exp" },
  },
  contents_inc_input: { priority: { __type: "Int" } },
  contents_insert_input: {
    authors: { __type: "authorships_arr_rel_insert_input" },
    children: { __type: "contents_arr_rel_insert_input" },
    createdAt: { __type: "timestamptz" },
    creator: { __type: "users_obj_rel_insert_input" },
    creatorId: { __type: "uuid" },
    data: { __type: "String" },
    file: { __type: "files_obj_rel_insert_input" },
    fileId: { __type: "uuid" },
    folder: { __type: "folders_obj_rel_insert_input" },
    folderId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    parent: { __type: "contents_obj_rel_insert_input" },
    parentId: { __type: "uuid" },
    polls: { __type: "polls_arr_rel_insert_input" },
    priority: { __type: "Int" },
    published: { __type: "Boolean" },
    updatedAt: { __type: "timestamptz" },
  },
  contents_max_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    creatorId: { __type: "uuid" },
    data: { __type: "String" },
    fileId: { __type: "uuid" },
    folderId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int" },
    updatedAt: { __type: "timestamptz" },
  },
  contents_max_order_by: {
    createdAt: { __type: "order_by" },
    creatorId: { __type: "order_by" },
    data: { __type: "order_by" },
    fileId: { __type: "order_by" },
    folderId: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    parentId: { __type: "order_by" },
    priority: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
  },
  contents_min_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    creatorId: { __type: "uuid" },
    data: { __type: "String" },
    fileId: { __type: "uuid" },
    folderId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int" },
    updatedAt: { __type: "timestamptz" },
  },
  contents_min_order_by: {
    createdAt: { __type: "order_by" },
    creatorId: { __type: "order_by" },
    data: { __type: "order_by" },
    fileId: { __type: "order_by" },
    folderId: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    parentId: { __type: "order_by" },
    priority: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
  },
  contents_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[contents!]!" },
  },
  contents_obj_rel_insert_input: {
    data: { __type: "contents_insert_input!" },
    on_conflict: { __type: "contents_on_conflict" },
  },
  contents_on_conflict: {
    constraint: { __type: "contents_constraint!" },
    update_columns: { __type: "[contents_update_column!]!" },
    where: { __type: "contents_bool_exp" },
  },
  contents_order_by: {
    authors_aggregate: { __type: "authorships_aggregate_order_by" },
    children_aggregate: { __type: "contents_aggregate_order_by" },
    createdAt: { __type: "order_by" },
    creator: { __type: "users_order_by" },
    creatorId: { __type: "order_by" },
    data: { __type: "order_by" },
    file: { __type: "files_order_by" },
    fileId: { __type: "order_by" },
    folder: { __type: "folders_order_by" },
    folderId: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    parent: { __type: "contents_order_by" },
    parentId: { __type: "order_by" },
    polls_aggregate: { __type: "polls_aggregate_order_by" },
    priority: { __type: "order_by" },
    published: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
  },
  contents_pk_columns_input: { id: { __type: "uuid!" } },
  contents_set_input: {
    createdAt: { __type: "timestamptz" },
    creatorId: { __type: "uuid" },
    data: { __type: "String" },
    fileId: { __type: "uuid" },
    folderId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int" },
    published: { __type: "Boolean" },
    updatedAt: { __type: "timestamptz" },
  },
  contents_stddev_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  contents_stddev_order_by: { priority: { __type: "order_by" } },
  contents_stddev_pop_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  contents_stddev_pop_order_by: { priority: { __type: "order_by" } },
  contents_stddev_samp_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  contents_stddev_samp_order_by: { priority: { __type: "order_by" } },
  contents_sum_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Int" },
  },
  contents_sum_order_by: { priority: { __type: "order_by" } },
  contents_var_pop_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  contents_var_pop_order_by: { priority: { __type: "order_by" } },
  contents_var_samp_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  contents_var_samp_order_by: { priority: { __type: "order_by" } },
  contents_variance_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  contents_variance_order_by: { priority: { __type: "order_by" } },
  events: {
    __typename: { __type: "String!" },
    admissions: {
      __type: "[admissions!]!",
      __args: {
        distinct_on: "[admissions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[admissions_order_by!]",
        where: "admissions_bool_exp",
      },
    },
    admissions_aggregate: {
      __type: "admissions_aggregate!",
      __args: {
        distinct_on: "[admissions_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[admissions_order_by!]",
        where: "admissions_bool_exp",
      },
    },
    content: { __type: "contents" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz!" },
    folder: { __type: "folders" },
    folderId: { __type: "uuid" },
    group: { __type: "groups" },
    groupId: { __type: "uuid!" },
    id: { __type: "uuid!" },
    lockSpeak: { __type: "Boolean!" },
    name: { __type: "String!" },
    poll: { __type: "polls" },
    pollId: { __type: "uuid" },
    shortName: { __type: "String!" },
    timer: { __type: "timers" },
    timerId: { __type: "uuid" },
  },
  events_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "events_aggregate_fields" },
    nodes: { __type: "[events!]!" },
  },
  events_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[events_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "events_max_fields" },
    min: { __type: "events_min_fields" },
  },
  events_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "events_max_order_by" },
    min: { __type: "events_min_order_by" },
  },
  events_arr_rel_insert_input: {
    data: { __type: "[events_insert_input!]!" },
    on_conflict: { __type: "events_on_conflict" },
  },
  events_bool_exp: {
    _and: { __type: "[events_bool_exp]" },
    _not: { __type: "events_bool_exp" },
    _or: { __type: "[events_bool_exp]" },
    admissions: { __type: "admissions_bool_exp" },
    content: { __type: "contents_bool_exp" },
    contentId: { __type: "uuid_comparison_exp" },
    createdAt: { __type: "timestamptz_comparison_exp" },
    folder: { __type: "folders_bool_exp" },
    folderId: { __type: "uuid_comparison_exp" },
    group: { __type: "groups_bool_exp" },
    groupId: { __type: "uuid_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    lockSpeak: { __type: "Boolean_comparison_exp" },
    name: { __type: "String_comparison_exp" },
    poll: { __type: "polls_bool_exp" },
    pollId: { __type: "uuid_comparison_exp" },
    shortName: { __type: "String_comparison_exp" },
    timer: { __type: "timers_bool_exp" },
    timerId: { __type: "uuid_comparison_exp" },
  },
  events_insert_input: {
    admissions: { __type: "admissions_arr_rel_insert_input" },
    content: { __type: "contents_obj_rel_insert_input" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    folder: { __type: "folders_obj_rel_insert_input" },
    folderId: { __type: "uuid" },
    group: { __type: "groups_obj_rel_insert_input" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    lockSpeak: { __type: "Boolean" },
    name: { __type: "String" },
    poll: { __type: "polls_obj_rel_insert_input" },
    pollId: { __type: "uuid" },
    shortName: { __type: "String" },
    timer: { __type: "timers_obj_rel_insert_input" },
    timerId: { __type: "uuid" },
  },
  events_max_fields: {
    __typename: { __type: "String!" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    folderId: { __type: "uuid" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    pollId: { __type: "uuid" },
    shortName: { __type: "String" },
    timerId: { __type: "uuid" },
  },
  events_max_order_by: {
    contentId: { __type: "order_by" },
    createdAt: { __type: "order_by" },
    folderId: { __type: "order_by" },
    groupId: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    pollId: { __type: "order_by" },
    shortName: { __type: "order_by" },
    timerId: { __type: "order_by" },
  },
  events_min_fields: {
    __typename: { __type: "String!" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    folderId: { __type: "uuid" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    pollId: { __type: "uuid" },
    shortName: { __type: "String" },
    timerId: { __type: "uuid" },
  },
  events_min_order_by: {
    contentId: { __type: "order_by" },
    createdAt: { __type: "order_by" },
    folderId: { __type: "order_by" },
    groupId: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    pollId: { __type: "order_by" },
    shortName: { __type: "order_by" },
    timerId: { __type: "order_by" },
  },
  events_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[events!]!" },
  },
  events_obj_rel_insert_input: {
    data: { __type: "events_insert_input!" },
    on_conflict: { __type: "events_on_conflict" },
  },
  events_on_conflict: {
    constraint: { __type: "events_constraint!" },
    update_columns: { __type: "[events_update_column!]!" },
    where: { __type: "events_bool_exp" },
  },
  events_order_by: {
    admissions_aggregate: { __type: "admissions_aggregate_order_by" },
    content: { __type: "contents_order_by" },
    contentId: { __type: "order_by" },
    createdAt: { __type: "order_by" },
    folder: { __type: "folders_order_by" },
    folderId: { __type: "order_by" },
    group: { __type: "groups_order_by" },
    groupId: { __type: "order_by" },
    id: { __type: "order_by" },
    lockSpeak: { __type: "order_by" },
    name: { __type: "order_by" },
    poll: { __type: "polls_order_by" },
    pollId: { __type: "order_by" },
    shortName: { __type: "order_by" },
    timer: { __type: "timers_order_by" },
    timerId: { __type: "order_by" },
  },
  events_pk_columns_input: { id: { __type: "uuid!" } },
  events_set_input: {
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    folderId: { __type: "uuid" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    lockSpeak: { __type: "Boolean" },
    name: { __type: "String" },
    pollId: { __type: "uuid" },
    shortName: { __type: "String" },
    timerId: { __type: "uuid" },
  },
  files: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz!" },
    id: { __type: "uuid!" },
    path: { __type: "String!" },
    token: { __type: "String!" },
    updatedAt: { __type: "timestamptz!" },
    user: { __type: "users" },
    userId: { __type: "uuid!" },
  },
  files_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "files_aggregate_fields" },
    nodes: { __type: "[files!]!" },
  },
  files_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[files_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "files_max_fields" },
    min: { __type: "files_min_fields" },
  },
  files_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "files_max_order_by" },
    min: { __type: "files_min_order_by" },
  },
  files_arr_rel_insert_input: {
    data: { __type: "[files_insert_input!]!" },
    on_conflict: { __type: "files_on_conflict" },
  },
  files_bool_exp: {
    _and: { __type: "[files_bool_exp]" },
    _not: { __type: "files_bool_exp" },
    _or: { __type: "[files_bool_exp]" },
    createdAt: { __type: "timestamptz_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    path: { __type: "String_comparison_exp" },
    token: { __type: "String_comparison_exp" },
    updatedAt: { __type: "timestamptz_comparison_exp" },
    user: { __type: "users_bool_exp" },
    userId: { __type: "uuid_comparison_exp" },
  },
  files_insert_input: {
    createdAt: { __type: "timestamptz" },
    id: { __type: "uuid" },
    path: { __type: "String" },
    token: { __type: "String" },
    updatedAt: { __type: "timestamptz" },
    user: { __type: "users_obj_rel_insert_input" },
    userId: { __type: "uuid" },
  },
  files_max_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    id: { __type: "uuid" },
    path: { __type: "String" },
    token: { __type: "String" },
    updatedAt: { __type: "timestamptz" },
    userId: { __type: "uuid" },
  },
  files_max_order_by: {
    createdAt: { __type: "order_by" },
    id: { __type: "order_by" },
    path: { __type: "order_by" },
    token: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  files_min_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    id: { __type: "uuid" },
    path: { __type: "String" },
    token: { __type: "String" },
    updatedAt: { __type: "timestamptz" },
    userId: { __type: "uuid" },
  },
  files_min_order_by: {
    createdAt: { __type: "order_by" },
    id: { __type: "order_by" },
    path: { __type: "order_by" },
    token: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  files_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[files!]!" },
  },
  files_obj_rel_insert_input: {
    data: { __type: "files_insert_input!" },
    on_conflict: { __type: "files_on_conflict" },
  },
  files_on_conflict: {
    constraint: { __type: "files_constraint!" },
    update_columns: { __type: "[files_update_column!]!" },
    where: { __type: "files_bool_exp" },
  },
  files_order_by: {
    createdAt: { __type: "order_by" },
    id: { __type: "order_by" },
    path: { __type: "order_by" },
    token: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
    user: { __type: "users_order_by" },
    userId: { __type: "order_by" },
  },
  files_pk_columns_input: { id: { __type: "uuid!" } },
  files_set_input: {
    createdAt: { __type: "timestamptz" },
    id: { __type: "uuid" },
    path: { __type: "String" },
    token: { __type: "String" },
    updatedAt: { __type: "timestamptz" },
    userId: { __type: "uuid" },
  },
  folders: {
    __typename: { __type: "String!" },
    contents: {
      __type: "[contents!]!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    contents_aggregate: {
      __type: "contents_aggregate!",
      __args: {
        distinct_on: "[contents_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[contents_order_by!]",
        where: "contents_bool_exp",
      },
    },
    event: { __type: "events" },
    eventId: { __type: "uuid!" },
    folders: {
      __type: "[folders!]!",
      __args: {
        distinct_on: "[folders_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[folders_order_by!]",
        where: "folders_bool_exp",
      },
    },
    folders_aggregate: {
      __type: "folders_aggregate!",
      __args: {
        distinct_on: "[folders_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[folders_order_by!]",
        where: "folders_bool_exp",
      },
    },
    id: { __type: "uuid!" },
    lockChildren: { __type: "Boolean!" },
    lockContent: { __type: "Boolean!" },
    mode: { __type: "String!" },
    name: { __type: "String!" },
    parent: { __type: "folders" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int!" },
    subtitle: { __type: "String" },
  },
  folders_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "folders_aggregate_fields" },
    nodes: { __type: "[folders!]!" },
  },
  folders_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "folders_avg_fields" },
    count: {
      __type: "Int",
      __args: { columns: "[folders_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "folders_max_fields" },
    min: { __type: "folders_min_fields" },
    stddev: { __type: "folders_stddev_fields" },
    stddev_pop: { __type: "folders_stddev_pop_fields" },
    stddev_samp: { __type: "folders_stddev_samp_fields" },
    sum: { __type: "folders_sum_fields" },
    var_pop: { __type: "folders_var_pop_fields" },
    var_samp: { __type: "folders_var_samp_fields" },
    variance: { __type: "folders_variance_fields" },
  },
  folders_aggregate_order_by: {
    avg: { __type: "folders_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "folders_max_order_by" },
    min: { __type: "folders_min_order_by" },
    stddev: { __type: "folders_stddev_order_by" },
    stddev_pop: { __type: "folders_stddev_pop_order_by" },
    stddev_samp: { __type: "folders_stddev_samp_order_by" },
    sum: { __type: "folders_sum_order_by" },
    var_pop: { __type: "folders_var_pop_order_by" },
    var_samp: { __type: "folders_var_samp_order_by" },
    variance: { __type: "folders_variance_order_by" },
  },
  folders_arr_rel_insert_input: {
    data: { __type: "[folders_insert_input!]!" },
    on_conflict: { __type: "folders_on_conflict" },
  },
  folders_avg_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  folders_avg_order_by: { priority: { __type: "order_by" } },
  folders_bool_exp: {
    _and: { __type: "[folders_bool_exp]" },
    _not: { __type: "folders_bool_exp" },
    _or: { __type: "[folders_bool_exp]" },
    contents: { __type: "contents_bool_exp" },
    event: { __type: "events_bool_exp" },
    eventId: { __type: "uuid_comparison_exp" },
    folders: { __type: "folders_bool_exp" },
    id: { __type: "uuid_comparison_exp" },
    lockChildren: { __type: "Boolean_comparison_exp" },
    lockContent: { __type: "Boolean_comparison_exp" },
    mode: { __type: "String_comparison_exp" },
    name: { __type: "String_comparison_exp" },
    parent: { __type: "folders_bool_exp" },
    parentId: { __type: "uuid_comparison_exp" },
    priority: { __type: "Int_comparison_exp" },
    subtitle: { __type: "String_comparison_exp" },
  },
  folders_inc_input: { priority: { __type: "Int" } },
  folders_insert_input: {
    contents: { __type: "contents_arr_rel_insert_input" },
    event: { __type: "events_obj_rel_insert_input" },
    eventId: { __type: "uuid" },
    folders: { __type: "folders_arr_rel_insert_input" },
    id: { __type: "uuid" },
    lockChildren: { __type: "Boolean" },
    lockContent: { __type: "Boolean" },
    mode: { __type: "String" },
    name: { __type: "String" },
    parent: { __type: "folders_obj_rel_insert_input" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int" },
    subtitle: { __type: "String" },
  },
  folders_max_fields: {
    __typename: { __type: "String!" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    mode: { __type: "String" },
    name: { __type: "String" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int" },
    subtitle: { __type: "String" },
  },
  folders_max_order_by: {
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    mode: { __type: "order_by" },
    name: { __type: "order_by" },
    parentId: { __type: "order_by" },
    priority: { __type: "order_by" },
    subtitle: { __type: "order_by" },
  },
  folders_min_fields: {
    __typename: { __type: "String!" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    mode: { __type: "String" },
    name: { __type: "String" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int" },
    subtitle: { __type: "String" },
  },
  folders_min_order_by: {
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    mode: { __type: "order_by" },
    name: { __type: "order_by" },
    parentId: { __type: "order_by" },
    priority: { __type: "order_by" },
    subtitle: { __type: "order_by" },
  },
  folders_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[folders!]!" },
  },
  folders_obj_rel_insert_input: {
    data: { __type: "folders_insert_input!" },
    on_conflict: { __type: "folders_on_conflict" },
  },
  folders_on_conflict: {
    constraint: { __type: "folders_constraint!" },
    update_columns: { __type: "[folders_update_column!]!" },
    where: { __type: "folders_bool_exp" },
  },
  folders_order_by: {
    contents_aggregate: { __type: "contents_aggregate_order_by" },
    event: { __type: "events_order_by" },
    eventId: { __type: "order_by" },
    folders_aggregate: { __type: "folders_aggregate_order_by" },
    id: { __type: "order_by" },
    lockChildren: { __type: "order_by" },
    lockContent: { __type: "order_by" },
    mode: { __type: "order_by" },
    name: { __type: "order_by" },
    parent: { __type: "folders_order_by" },
    parentId: { __type: "order_by" },
    priority: { __type: "order_by" },
    subtitle: { __type: "order_by" },
  },
  folders_pk_columns_input: { id: { __type: "uuid!" } },
  folders_set_input: {
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    lockChildren: { __type: "Boolean" },
    lockContent: { __type: "Boolean" },
    mode: { __type: "String" },
    name: { __type: "String" },
    parentId: { __type: "uuid" },
    priority: { __type: "Int" },
    subtitle: { __type: "String" },
  },
  folders_stddev_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  folders_stddev_order_by: { priority: { __type: "order_by" } },
  folders_stddev_pop_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  folders_stddev_pop_order_by: { priority: { __type: "order_by" } },
  folders_stddev_samp_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  folders_stddev_samp_order_by: { priority: { __type: "order_by" } },
  folders_sum_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Int" },
  },
  folders_sum_order_by: { priority: { __type: "order_by" } },
  folders_var_pop_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  folders_var_pop_order_by: { priority: { __type: "order_by" } },
  folders_var_samp_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  folders_var_samp_order_by: { priority: { __type: "order_by" } },
  folders_variance_fields: {
    __typename: { __type: "String!" },
    priority: { __type: "Float" },
  },
  folders_variance_order_by: { priority: { __type: "order_by" } },
  groups: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz!" },
    creator: { __type: "users" },
    creatorId: { __type: "uuid" },
    events: {
      __type: "[events!]!",
      __args: {
        distinct_on: "[events_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[events_order_by!]",
        where: "events_bool_exp",
      },
    },
    events_aggregate: {
      __type: "events_aggregate!",
      __args: {
        distinct_on: "[events_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[events_order_by!]",
        where: "events_bool_exp",
      },
    },
    id: { __type: "uuid!" },
    memberships: {
      __type: "[memberships!]!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    memberships_aggregate: {
      __type: "memberships_aggregate!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    name: { __type: "String!" },
    public: { __type: "Boolean!" },
    shortName: { __type: "String" },
  },
  groups_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "groups_aggregate_fields" },
    nodes: { __type: "[groups!]!" },
  },
  groups_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[groups_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "groups_max_fields" },
    min: { __type: "groups_min_fields" },
  },
  groups_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "groups_max_order_by" },
    min: { __type: "groups_min_order_by" },
  },
  groups_arr_rel_insert_input: {
    data: { __type: "[groups_insert_input!]!" },
    on_conflict: { __type: "groups_on_conflict" },
  },
  groups_bool_exp: {
    _and: { __type: "[groups_bool_exp]" },
    _not: { __type: "groups_bool_exp" },
    _or: { __type: "[groups_bool_exp]" },
    createdAt: { __type: "timestamptz_comparison_exp" },
    creator: { __type: "users_bool_exp" },
    creatorId: { __type: "uuid_comparison_exp" },
    events: { __type: "events_bool_exp" },
    id: { __type: "uuid_comparison_exp" },
    memberships: { __type: "memberships_bool_exp" },
    name: { __type: "String_comparison_exp" },
    public: { __type: "Boolean_comparison_exp" },
    shortName: { __type: "String_comparison_exp" },
  },
  groups_insert_input: {
    createdAt: { __type: "timestamptz" },
    creator: { __type: "users_obj_rel_insert_input" },
    creatorId: { __type: "uuid" },
    events: { __type: "events_arr_rel_insert_input" },
    id: { __type: "uuid" },
    memberships: { __type: "memberships_arr_rel_insert_input" },
    name: { __type: "String" },
    public: { __type: "Boolean" },
    shortName: { __type: "String" },
  },
  groups_max_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    creatorId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    shortName: { __type: "String" },
  },
  groups_max_order_by: {
    createdAt: { __type: "order_by" },
    creatorId: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    shortName: { __type: "order_by" },
  },
  groups_min_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    creatorId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    shortName: { __type: "String" },
  },
  groups_min_order_by: {
    createdAt: { __type: "order_by" },
    creatorId: { __type: "order_by" },
    id: { __type: "order_by" },
    name: { __type: "order_by" },
    shortName: { __type: "order_by" },
  },
  groups_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[groups!]!" },
  },
  groups_obj_rel_insert_input: {
    data: { __type: "groups_insert_input!" },
    on_conflict: { __type: "groups_on_conflict" },
  },
  groups_on_conflict: {
    constraint: { __type: "groups_constraint!" },
    update_columns: { __type: "[groups_update_column!]!" },
    where: { __type: "groups_bool_exp" },
  },
  groups_order_by: {
    createdAt: { __type: "order_by" },
    creator: { __type: "users_order_by" },
    creatorId: { __type: "order_by" },
    events_aggregate: { __type: "events_aggregate_order_by" },
    id: { __type: "order_by" },
    memberships_aggregate: { __type: "memberships_aggregate_order_by" },
    name: { __type: "order_by" },
    public: { __type: "order_by" },
    shortName: { __type: "order_by" },
  },
  groups_pk_columns_input: { id: { __type: "uuid!" } },
  groups_set_input: {
    createdAt: { __type: "timestamptz" },
    creatorId: { __type: "uuid" },
    id: { __type: "uuid" },
    name: { __type: "String" },
    public: { __type: "Boolean" },
    shortName: { __type: "String" },
  },
  identities: {
    __typename: { __type: "String!" },
    displayName: { __type: "String!" },
    email: { __type: "String!" },
    memberships: {
      __type: "[memberships!]!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    memberships_aggregate: {
      __type: "memberships_aggregate!",
      __args: {
        distinct_on: "[memberships_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[memberships_order_by!]",
        where: "memberships_bool_exp",
      },
    },
    user: { __type: "users" },
  },
  identities_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "identities_aggregate_fields" },
    nodes: { __type: "[identities!]!" },
  },
  identities_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[identities_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "identities_max_fields" },
    min: { __type: "identities_min_fields" },
  },
  identities_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "identities_max_order_by" },
    min: { __type: "identities_min_order_by" },
  },
  identities_arr_rel_insert_input: {
    data: { __type: "[identities_insert_input!]!" },
    on_conflict: { __type: "identities_on_conflict" },
  },
  identities_bool_exp: {
    _and: { __type: "[identities_bool_exp]" },
    _not: { __type: "identities_bool_exp" },
    _or: { __type: "[identities_bool_exp]" },
    displayName: { __type: "String_comparison_exp" },
    email: { __type: "String_comparison_exp" },
    memberships: { __type: "memberships_bool_exp" },
    user: { __type: "users_bool_exp" },
  },
  identities_insert_input: {
    displayName: { __type: "String" },
    email: { __type: "String" },
    memberships: { __type: "memberships_arr_rel_insert_input" },
    user: { __type: "users_obj_rel_insert_input" },
  },
  identities_max_fields: {
    __typename: { __type: "String!" },
    displayName: { __type: "String" },
    email: { __type: "String" },
  },
  identities_max_order_by: {
    displayName: { __type: "order_by" },
    email: { __type: "order_by" },
  },
  identities_min_fields: {
    __typename: { __type: "String!" },
    displayName: { __type: "String" },
    email: { __type: "String" },
  },
  identities_min_order_by: {
    displayName: { __type: "order_by" },
    email: { __type: "order_by" },
  },
  identities_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[identities!]!" },
  },
  identities_obj_rel_insert_input: {
    data: { __type: "identities_insert_input!" },
    on_conflict: { __type: "identities_on_conflict" },
  },
  identities_on_conflict: {
    constraint: { __type: "identities_constraint!" },
    update_columns: { __type: "[identities_update_column!]!" },
    where: { __type: "identities_bool_exp" },
  },
  identities_order_by: {
    displayName: { __type: "order_by" },
    email: { __type: "order_by" },
    memberships_aggregate: { __type: "memberships_aggregate_order_by" },
    user: { __type: "users_order_by" },
  },
  identities_pk_columns_input: { email: { __type: "String!" } },
  identities_set_input: {
    displayName: { __type: "String" },
    email: { __type: "String" },
  },
  json_comparison_exp: {
    _eq: { __type: "json" },
    _gt: { __type: "json" },
    _gte: { __type: "json" },
    _in: { __type: "[json!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "json" },
    _lte: { __type: "json" },
    _neq: { __type: "json" },
    _nin: { __type: "[json!]" },
  },
  jsonb_comparison_exp: {
    _contained_in: { __type: "jsonb" },
    _contains: { __type: "jsonb" },
    _eq: { __type: "jsonb" },
    _gt: { __type: "jsonb" },
    _gte: { __type: "jsonb" },
    _has_key: { __type: "String" },
    _has_keys_all: { __type: "[String!]" },
    _has_keys_any: { __type: "[String!]" },
    _in: { __type: "[jsonb!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "jsonb" },
    _lte: { __type: "jsonb" },
    _neq: { __type: "jsonb" },
    _nin: { __type: "[jsonb!]" },
  },
  memberships: {
    __typename: { __type: "String!" },
    email: { __type: "String" },
    group: { __type: "groups" },
    groupId: { __type: "uuid!" },
    id: { __type: "uuid!" },
    identity: { __type: "identities" },
    roles: {
      __type: "[roles!]!",
      __args: {
        distinct_on: "[roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[roles_order_by!]",
        where: "roles_bool_exp",
      },
    },
    roles_aggregate: {
      __type: "roles_aggregate!",
      __args: {
        distinct_on: "[roles_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[roles_order_by!]",
        where: "roles_bool_exp",
      },
    },
    userId: { __type: "uuid" },
  },
  memberships_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "memberships_aggregate_fields" },
    nodes: { __type: "[memberships!]!" },
  },
  memberships_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[memberships_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "memberships_max_fields" },
    min: { __type: "memberships_min_fields" },
  },
  memberships_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "memberships_max_order_by" },
    min: { __type: "memberships_min_order_by" },
  },
  memberships_arr_rel_insert_input: {
    data: { __type: "[memberships_insert_input!]!" },
    on_conflict: { __type: "memberships_on_conflict" },
  },
  memberships_bool_exp: {
    _and: { __type: "[memberships_bool_exp]" },
    _not: { __type: "memberships_bool_exp" },
    _or: { __type: "[memberships_bool_exp]" },
    email: { __type: "String_comparison_exp" },
    group: { __type: "groups_bool_exp" },
    groupId: { __type: "uuid_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    identity: { __type: "identities_bool_exp" },
    roles: { __type: "roles_bool_exp" },
    userId: { __type: "uuid_comparison_exp" },
  },
  memberships_insert_input: {
    email: { __type: "String" },
    group: { __type: "groups_obj_rel_insert_input" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    identity: { __type: "identities_obj_rel_insert_input" },
    roles: { __type: "roles_arr_rel_insert_input" },
    userId: { __type: "uuid" },
  },
  memberships_max_fields: {
    __typename: { __type: "String!" },
    email: { __type: "String" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    userId: { __type: "uuid" },
  },
  memberships_max_order_by: {
    email: { __type: "order_by" },
    groupId: { __type: "order_by" },
    id: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  memberships_min_fields: {
    __typename: { __type: "String!" },
    email: { __type: "String" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    userId: { __type: "uuid" },
  },
  memberships_min_order_by: {
    email: { __type: "order_by" },
    groupId: { __type: "order_by" },
    id: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  memberships_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[memberships!]!" },
  },
  memberships_obj_rel_insert_input: {
    data: { __type: "memberships_insert_input!" },
    on_conflict: { __type: "memberships_on_conflict" },
  },
  memberships_on_conflict: {
    constraint: { __type: "memberships_constraint!" },
    update_columns: { __type: "[memberships_update_column!]!" },
    where: { __type: "memberships_bool_exp" },
  },
  memberships_order_by: {
    email: { __type: "order_by" },
    group: { __type: "groups_order_by" },
    groupId: { __type: "order_by" },
    id: { __type: "order_by" },
    identity: { __type: "identities_order_by" },
    roles_aggregate: { __type: "roles_aggregate_order_by" },
    userId: { __type: "order_by" },
  },
  memberships_pk_columns_input: { id: { __type: "uuid!" } },
  memberships_set_input: {
    email: { __type: "String" },
    groupId: { __type: "uuid" },
    id: { __type: "uuid" },
    userId: { __type: "uuid" },
  },
  polls: {
    __typename: { __type: "String!" },
    active: { __type: "Boolean!" },
    content: { __type: "contents" },
    contentId: { __type: "uuid!" },
    createdAt: { __type: "timestamptz" },
    hidden: { __type: "Boolean!" },
    id: { __type: "uuid!" },
    maxVote: { __type: "Int!" },
    minVote: { __type: "Int!" },
    options: { __type: "_text" },
    votes: {
      __type: "[votes!]!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
    votes_aggregate: {
      __type: "votes_aggregate!",
      __args: {
        distinct_on: "[votes_select_column!]",
        limit: "Int",
        offset: "Int",
        order_by: "[votes_order_by!]",
        where: "votes_bool_exp",
      },
    },
  },
  polls_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "polls_aggregate_fields" },
    nodes: { __type: "[polls!]!" },
  },
  polls_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "polls_avg_fields" },
    count: {
      __type: "Int",
      __args: { columns: "[polls_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "polls_max_fields" },
    min: { __type: "polls_min_fields" },
    stddev: { __type: "polls_stddev_fields" },
    stddev_pop: { __type: "polls_stddev_pop_fields" },
    stddev_samp: { __type: "polls_stddev_samp_fields" },
    sum: { __type: "polls_sum_fields" },
    var_pop: { __type: "polls_var_pop_fields" },
    var_samp: { __type: "polls_var_samp_fields" },
    variance: { __type: "polls_variance_fields" },
  },
  polls_aggregate_order_by: {
    avg: { __type: "polls_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "polls_max_order_by" },
    min: { __type: "polls_min_order_by" },
    stddev: { __type: "polls_stddev_order_by" },
    stddev_pop: { __type: "polls_stddev_pop_order_by" },
    stddev_samp: { __type: "polls_stddev_samp_order_by" },
    sum: { __type: "polls_sum_order_by" },
    var_pop: { __type: "polls_var_pop_order_by" },
    var_samp: { __type: "polls_var_samp_order_by" },
    variance: { __type: "polls_variance_order_by" },
  },
  polls_arr_rel_insert_input: {
    data: { __type: "[polls_insert_input!]!" },
    on_conflict: { __type: "polls_on_conflict" },
  },
  polls_avg_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Float" },
    minVote: { __type: "Float" },
  },
  polls_avg_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_bool_exp: {
    _and: { __type: "[polls_bool_exp]" },
    _not: { __type: "polls_bool_exp" },
    _or: { __type: "[polls_bool_exp]" },
    active: { __type: "Boolean_comparison_exp" },
    content: { __type: "contents_bool_exp" },
    contentId: { __type: "uuid_comparison_exp" },
    createdAt: { __type: "timestamptz_comparison_exp" },
    hidden: { __type: "Boolean_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    maxVote: { __type: "Int_comparison_exp" },
    minVote: { __type: "Int_comparison_exp" },
    options: { __type: "_text_comparison_exp" },
    votes: { __type: "votes_bool_exp" },
  },
  polls_inc_input: { maxVote: { __type: "Int" }, minVote: { __type: "Int" } },
  polls_insert_input: {
    active: { __type: "Boolean" },
    content: { __type: "contents_obj_rel_insert_input" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    hidden: { __type: "Boolean" },
    id: { __type: "uuid" },
    maxVote: { __type: "Int" },
    minVote: { __type: "Int" },
    options: { __type: "_text" },
    votes: { __type: "votes_arr_rel_insert_input" },
  },
  polls_max_fields: {
    __typename: { __type: "String!" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    id: { __type: "uuid" },
    maxVote: { __type: "Int" },
    minVote: { __type: "Int" },
  },
  polls_max_order_by: {
    contentId: { __type: "order_by" },
    createdAt: { __type: "order_by" },
    id: { __type: "order_by" },
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_min_fields: {
    __typename: { __type: "String!" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    id: { __type: "uuid" },
    maxVote: { __type: "Int" },
    minVote: { __type: "Int" },
  },
  polls_min_order_by: {
    contentId: { __type: "order_by" },
    createdAt: { __type: "order_by" },
    id: { __type: "order_by" },
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[polls!]!" },
  },
  polls_obj_rel_insert_input: {
    data: { __type: "polls_insert_input!" },
    on_conflict: { __type: "polls_on_conflict" },
  },
  polls_on_conflict: {
    constraint: { __type: "polls_constraint!" },
    update_columns: { __type: "[polls_update_column!]!" },
    where: { __type: "polls_bool_exp" },
  },
  polls_order_by: {
    active: { __type: "order_by" },
    content: { __type: "contents_order_by" },
    contentId: { __type: "order_by" },
    createdAt: { __type: "order_by" },
    hidden: { __type: "order_by" },
    id: { __type: "order_by" },
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
    options: { __type: "order_by" },
    votes_aggregate: { __type: "votes_aggregate_order_by" },
  },
  polls_pk_columns_input: { id: { __type: "uuid!" } },
  polls_set_input: {
    active: { __type: "Boolean" },
    contentId: { __type: "uuid" },
    createdAt: { __type: "timestamptz" },
    hidden: { __type: "Boolean" },
    id: { __type: "uuid" },
    maxVote: { __type: "Int" },
    minVote: { __type: "Int" },
    options: { __type: "_text" },
  },
  polls_stddev_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Float" },
    minVote: { __type: "Float" },
  },
  polls_stddev_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_stddev_pop_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Float" },
    minVote: { __type: "Float" },
  },
  polls_stddev_pop_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_stddev_samp_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Float" },
    minVote: { __type: "Float" },
  },
  polls_stddev_samp_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_sum_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Int" },
    minVote: { __type: "Int" },
  },
  polls_sum_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_var_pop_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Float" },
    minVote: { __type: "Float" },
  },
  polls_var_pop_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_var_samp_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Float" },
    minVote: { __type: "Float" },
  },
  polls_var_samp_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  polls_variance_fields: {
    __typename: { __type: "String!" },
    maxVote: { __type: "Float" },
    minVote: { __type: "Float" },
  },
  polls_variance_order_by: {
    maxVote: { __type: "order_by" },
    minVote: { __type: "order_by" },
  },
  roles: {
    __typename: { __type: "String!" },
    id: { __type: "uuid!" },
    membership: { __type: "memberships" },
    membershipId: { __type: "uuid!" },
    role: { __type: "String!" },
  },
  roles_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "roles_aggregate_fields" },
    nodes: { __type: "[roles!]!" },
  },
  roles_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[roles_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "roles_max_fields" },
    min: { __type: "roles_min_fields" },
  },
  roles_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "roles_max_order_by" },
    min: { __type: "roles_min_order_by" },
  },
  roles_arr_rel_insert_input: {
    data: { __type: "[roles_insert_input!]!" },
    on_conflict: { __type: "roles_on_conflict" },
  },
  roles_bool_exp: {
    _and: { __type: "[roles_bool_exp]" },
    _not: { __type: "roles_bool_exp" },
    _or: { __type: "[roles_bool_exp]" },
    id: { __type: "uuid_comparison_exp" },
    membership: { __type: "memberships_bool_exp" },
    membershipId: { __type: "uuid_comparison_exp" },
    role: { __type: "String_comparison_exp" },
  },
  roles_insert_input: {
    id: { __type: "uuid" },
    membership: { __type: "memberships_obj_rel_insert_input" },
    membershipId: { __type: "uuid" },
    role: { __type: "String" },
  },
  roles_max_fields: {
    __typename: { __type: "String!" },
    id: { __type: "uuid" },
    membershipId: { __type: "uuid" },
    role: { __type: "String" },
  },
  roles_max_order_by: {
    id: { __type: "order_by" },
    membershipId: { __type: "order_by" },
    role: { __type: "order_by" },
  },
  roles_min_fields: {
    __typename: { __type: "String!" },
    id: { __type: "uuid" },
    membershipId: { __type: "uuid" },
    role: { __type: "String" },
  },
  roles_min_order_by: {
    id: { __type: "order_by" },
    membershipId: { __type: "order_by" },
    role: { __type: "order_by" },
  },
  roles_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[roles!]!" },
  },
  roles_obj_rel_insert_input: {
    data: { __type: "roles_insert_input!" },
    on_conflict: { __type: "roles_on_conflict" },
  },
  roles_on_conflict: {
    constraint: { __type: "roles_constraint!" },
    update_columns: { __type: "[roles_update_column!]!" },
    where: { __type: "roles_bool_exp" },
  },
  roles_order_by: {
    id: { __type: "order_by" },
    membership: { __type: "memberships_order_by" },
    membershipId: { __type: "order_by" },
    role: { __type: "order_by" },
  },
  roles_pk_columns_input: { id: { __type: "uuid!" } },
  roles_set_input: {
    id: { __type: "uuid" },
    membershipId: { __type: "uuid" },
    role: { __type: "String" },
  },
  speaks: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz!" },
    eventId: { __type: "uuid!" },
    id: { __type: "uuid!" },
    type: { __type: "Int!" },
    user: { __type: "users" },
    userId: { __type: "uuid!" },
  },
  speaks_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "speaks_aggregate_fields" },
    nodes: { __type: "[speaks!]!" },
  },
  speaks_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "speaks_avg_fields" },
    count: {
      __type: "Int",
      __args: { columns: "[speaks_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "speaks_max_fields" },
    min: { __type: "speaks_min_fields" },
    stddev: { __type: "speaks_stddev_fields" },
    stddev_pop: { __type: "speaks_stddev_pop_fields" },
    stddev_samp: { __type: "speaks_stddev_samp_fields" },
    sum: { __type: "speaks_sum_fields" },
    var_pop: { __type: "speaks_var_pop_fields" },
    var_samp: { __type: "speaks_var_samp_fields" },
    variance: { __type: "speaks_variance_fields" },
  },
  speaks_aggregate_order_by: {
    avg: { __type: "speaks_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "speaks_max_order_by" },
    min: { __type: "speaks_min_order_by" },
    stddev: { __type: "speaks_stddev_order_by" },
    stddev_pop: { __type: "speaks_stddev_pop_order_by" },
    stddev_samp: { __type: "speaks_stddev_samp_order_by" },
    sum: { __type: "speaks_sum_order_by" },
    var_pop: { __type: "speaks_var_pop_order_by" },
    var_samp: { __type: "speaks_var_samp_order_by" },
    variance: { __type: "speaks_variance_order_by" },
  },
  speaks_arr_rel_insert_input: {
    data: { __type: "[speaks_insert_input!]!" },
    on_conflict: { __type: "speaks_on_conflict" },
  },
  speaks_avg_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Float" },
  },
  speaks_avg_order_by: { type: { __type: "order_by" } },
  speaks_bool_exp: {
    _and: { __type: "[speaks_bool_exp]" },
    _not: { __type: "speaks_bool_exp" },
    _or: { __type: "[speaks_bool_exp]" },
    createdAt: { __type: "timestamptz_comparison_exp" },
    eventId: { __type: "uuid_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    type: { __type: "Int_comparison_exp" },
    user: { __type: "users_bool_exp" },
    userId: { __type: "uuid_comparison_exp" },
  },
  speaks_inc_input: { type: { __type: "Int" } },
  speaks_insert_input: {
    createdAt: { __type: "timestamptz" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    type: { __type: "Int" },
    user: { __type: "users_obj_rel_insert_input" },
    userId: { __type: "uuid" },
  },
  speaks_max_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    type: { __type: "Int" },
    userId: { __type: "uuid" },
  },
  speaks_max_order_by: {
    createdAt: { __type: "order_by" },
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    type: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  speaks_min_fields: {
    __typename: { __type: "String!" },
    createdAt: { __type: "timestamptz" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    type: { __type: "Int" },
    userId: { __type: "uuid" },
  },
  speaks_min_order_by: {
    createdAt: { __type: "order_by" },
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    type: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  speaks_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[speaks!]!" },
  },
  speaks_obj_rel_insert_input: {
    data: { __type: "speaks_insert_input!" },
    on_conflict: { __type: "speaks_on_conflict" },
  },
  speaks_on_conflict: {
    constraint: { __type: "speaks_constraint!" },
    update_columns: { __type: "[speaks_update_column!]!" },
    where: { __type: "speaks_bool_exp" },
  },
  speaks_order_by: {
    createdAt: { __type: "order_by" },
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    type: { __type: "order_by" },
    user: { __type: "users_order_by" },
    userId: { __type: "order_by" },
  },
  speaks_pk_columns_input: { id: { __type: "uuid!" } },
  speaks_set_input: {
    createdAt: { __type: "timestamptz" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    type: { __type: "Int" },
    userId: { __type: "uuid" },
  },
  speaks_stddev_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Float" },
  },
  speaks_stddev_order_by: { type: { __type: "order_by" } },
  speaks_stddev_pop_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Float" },
  },
  speaks_stddev_pop_order_by: { type: { __type: "order_by" } },
  speaks_stddev_samp_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Float" },
  },
  speaks_stddev_samp_order_by: { type: { __type: "order_by" } },
  speaks_sum_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Int" },
  },
  speaks_sum_order_by: { type: { __type: "order_by" } },
  speaks_var_pop_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Float" },
  },
  speaks_var_pop_order_by: { type: { __type: "order_by" } },
  speaks_var_samp_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Float" },
  },
  speaks_var_samp_order_by: { type: { __type: "order_by" } },
  speaks_variance_fields: {
    __typename: { __type: "String!" },
    type: { __type: "Float" },
  },
  speaks_variance_order_by: { type: { __type: "order_by" } },
  timers: {
    __typename: { __type: "String!" },
    event: { __type: "events" },
    eventId: { __type: "uuid!" },
    id: { __type: "uuid!" },
    time: { __type: "Int!" },
    updatedAt: { __type: "timestamptz!" },
  },
  timers_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "timers_aggregate_fields" },
    nodes: { __type: "[timers!]!" },
  },
  timers_aggregate_fields: {
    __typename: { __type: "String!" },
    avg: { __type: "timers_avg_fields" },
    count: {
      __type: "Int",
      __args: { columns: "[timers_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "timers_max_fields" },
    min: { __type: "timers_min_fields" },
    stddev: { __type: "timers_stddev_fields" },
    stddev_pop: { __type: "timers_stddev_pop_fields" },
    stddev_samp: { __type: "timers_stddev_samp_fields" },
    sum: { __type: "timers_sum_fields" },
    var_pop: { __type: "timers_var_pop_fields" },
    var_samp: { __type: "timers_var_samp_fields" },
    variance: { __type: "timers_variance_fields" },
  },
  timers_aggregate_order_by: {
    avg: { __type: "timers_avg_order_by" },
    count: { __type: "order_by" },
    max: { __type: "timers_max_order_by" },
    min: { __type: "timers_min_order_by" },
    stddev: { __type: "timers_stddev_order_by" },
    stddev_pop: { __type: "timers_stddev_pop_order_by" },
    stddev_samp: { __type: "timers_stddev_samp_order_by" },
    sum: { __type: "timers_sum_order_by" },
    var_pop: { __type: "timers_var_pop_order_by" },
    var_samp: { __type: "timers_var_samp_order_by" },
    variance: { __type: "timers_variance_order_by" },
  },
  timers_arr_rel_insert_input: {
    data: { __type: "[timers_insert_input!]!" },
    on_conflict: { __type: "timers_on_conflict" },
  },
  timers_avg_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Float" },
  },
  timers_avg_order_by: { time: { __type: "order_by" } },
  timers_bool_exp: {
    _and: { __type: "[timers_bool_exp]" },
    _not: { __type: "timers_bool_exp" },
    _or: { __type: "[timers_bool_exp]" },
    event: { __type: "events_bool_exp" },
    eventId: { __type: "uuid_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    time: { __type: "Int_comparison_exp" },
    updatedAt: { __type: "timestamptz_comparison_exp" },
  },
  timers_inc_input: { time: { __type: "Int" } },
  timers_insert_input: {
    event: { __type: "events_obj_rel_insert_input" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    time: { __type: "Int" },
    updatedAt: { __type: "timestamptz" },
  },
  timers_max_fields: {
    __typename: { __type: "String!" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    time: { __type: "Int" },
    updatedAt: { __type: "timestamptz" },
  },
  timers_max_order_by: {
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    time: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
  },
  timers_min_fields: {
    __typename: { __type: "String!" },
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    time: { __type: "Int" },
    updatedAt: { __type: "timestamptz" },
  },
  timers_min_order_by: {
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    time: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
  },
  timers_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[timers!]!" },
  },
  timers_obj_rel_insert_input: {
    data: { __type: "timers_insert_input!" },
    on_conflict: { __type: "timers_on_conflict" },
  },
  timers_on_conflict: {
    constraint: { __type: "timers_constraint!" },
    update_columns: { __type: "[timers_update_column!]!" },
    where: { __type: "timers_bool_exp" },
  },
  timers_order_by: {
    event: { __type: "events_order_by" },
    eventId: { __type: "order_by" },
    id: { __type: "order_by" },
    time: { __type: "order_by" },
    updatedAt: { __type: "order_by" },
  },
  timers_pk_columns_input: { id: { __type: "uuid!" } },
  timers_set_input: {
    eventId: { __type: "uuid" },
    id: { __type: "uuid" },
    time: { __type: "Int" },
    updatedAt: { __type: "timestamptz" },
  },
  timers_stddev_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Float" },
  },
  timers_stddev_order_by: { time: { __type: "order_by" } },
  timers_stddev_pop_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Float" },
  },
  timers_stddev_pop_order_by: { time: { __type: "order_by" } },
  timers_stddev_samp_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Float" },
  },
  timers_stddev_samp_order_by: { time: { __type: "order_by" } },
  timers_sum_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Int" },
  },
  timers_sum_order_by: { time: { __type: "order_by" } },
  timers_var_pop_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Float" },
  },
  timers_var_pop_order_by: { time: { __type: "order_by" } },
  timers_var_samp_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Float" },
  },
  timers_var_samp_order_by: { time: { __type: "order_by" } },
  timers_variance_fields: {
    __typename: { __type: "String!" },
    time: { __type: "Float" },
  },
  timers_variance_order_by: { time: { __type: "order_by" } },
  timestamptz_comparison_exp: {
    _eq: { __type: "timestamptz" },
    _gt: { __type: "timestamptz" },
    _gte: { __type: "timestamptz" },
    _in: { __type: "[timestamptz!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "timestamptz" },
    _lte: { __type: "timestamptz" },
    _neq: { __type: "timestamptz" },
    _nin: { __type: "[timestamptz!]" },
  },
  users: {
    __typename: { __type: "String!" },
    account: { __type: "auth_accounts" },
    avatar_url: { __type: "String" },
    created_at: { __type: "timestamptz!" },
    display_name: { __type: "String" },
    id: { __type: "uuid!" },
    identity: { __type: "identities" },
    sysAdmin: { __type: "Boolean!" },
    updated_at: { __type: "timestamptz!" },
  },
  users_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "users_aggregate_fields" },
    nodes: { __type: "[users!]!" },
  },
  users_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[users_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "users_max_fields" },
    min: { __type: "users_min_fields" },
  },
  users_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "users_max_order_by" },
    min: { __type: "users_min_order_by" },
  },
  users_arr_rel_insert_input: {
    data: { __type: "[users_insert_input!]!" },
    on_conflict: { __type: "users_on_conflict" },
  },
  users_bool_exp: {
    _and: { __type: "[users_bool_exp]" },
    _not: { __type: "users_bool_exp" },
    _or: { __type: "[users_bool_exp]" },
    account: { __type: "auth_accounts_bool_exp" },
    avatar_url: { __type: "String_comparison_exp" },
    created_at: { __type: "timestamptz_comparison_exp" },
    display_name: { __type: "String_comparison_exp" },
    id: { __type: "uuid_comparison_exp" },
    identity: { __type: "identities_bool_exp" },
    sysAdmin: { __type: "Boolean_comparison_exp" },
    updated_at: { __type: "timestamptz_comparison_exp" },
  },
  users_insert_input: {
    account: { __type: "auth_accounts_obj_rel_insert_input" },
    avatar_url: { __type: "String" },
    created_at: { __type: "timestamptz" },
    display_name: { __type: "String" },
    id: { __type: "uuid" },
    identity: { __type: "identities_obj_rel_insert_input" },
    sysAdmin: { __type: "Boolean" },
    updated_at: { __type: "timestamptz" },
  },
  users_max_fields: {
    __typename: { __type: "String!" },
    avatar_url: { __type: "String" },
    created_at: { __type: "timestamptz" },
    display_name: { __type: "String" },
    id: { __type: "uuid" },
    updated_at: { __type: "timestamptz" },
  },
  users_max_order_by: {
    avatar_url: { __type: "order_by" },
    created_at: { __type: "order_by" },
    display_name: { __type: "order_by" },
    id: { __type: "order_by" },
    updated_at: { __type: "order_by" },
  },
  users_min_fields: {
    __typename: { __type: "String!" },
    avatar_url: { __type: "String" },
    created_at: { __type: "timestamptz" },
    display_name: { __type: "String" },
    id: { __type: "uuid" },
    updated_at: { __type: "timestamptz" },
  },
  users_min_order_by: {
    avatar_url: { __type: "order_by" },
    created_at: { __type: "order_by" },
    display_name: { __type: "order_by" },
    id: { __type: "order_by" },
    updated_at: { __type: "order_by" },
  },
  users_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[users!]!" },
  },
  users_obj_rel_insert_input: {
    data: { __type: "users_insert_input!" },
    on_conflict: { __type: "users_on_conflict" },
  },
  users_on_conflict: {
    constraint: { __type: "users_constraint!" },
    update_columns: { __type: "[users_update_column!]!" },
    where: { __type: "users_bool_exp" },
  },
  users_order_by: {
    account: { __type: "auth_accounts_order_by" },
    avatar_url: { __type: "order_by" },
    created_at: { __type: "order_by" },
    display_name: { __type: "order_by" },
    id: { __type: "order_by" },
    identity: { __type: "identities_order_by" },
    sysAdmin: { __type: "order_by" },
    updated_at: { __type: "order_by" },
  },
  users_pk_columns_input: { id: { __type: "uuid!" } },
  users_set_input: {
    avatar_url: { __type: "String" },
    created_at: { __type: "timestamptz" },
    display_name: { __type: "String" },
    id: { __type: "uuid" },
    sysAdmin: { __type: "Boolean" },
    updated_at: { __type: "timestamptz" },
  },
  uuid_comparison_exp: {
    _eq: { __type: "uuid" },
    _gt: { __type: "uuid" },
    _gte: { __type: "uuid" },
    _in: { __type: "[uuid!]" },
    _is_null: { __type: "Boolean" },
    _lt: { __type: "uuid" },
    _lte: { __type: "uuid" },
    _neq: { __type: "uuid" },
    _nin: { __type: "[uuid!]" },
  },
  votes: {
    __typename: { __type: "String!" },
    id: { __type: "uuid!" },
    pollId: { __type: "uuid!" },
    userId: { __type: "uuid!" },
    value: { __type: "_int4!" },
  },
  votes_aggregate: {
    __typename: { __type: "String!" },
    aggregate: { __type: "votes_aggregate_fields" },
    nodes: { __type: "[votes!]!" },
  },
  votes_aggregate_fields: {
    __typename: { __type: "String!" },
    count: {
      __type: "Int",
      __args: { columns: "[votes_select_column!]", distinct: "Boolean" },
    },
    max: { __type: "votes_max_fields" },
    min: { __type: "votes_min_fields" },
  },
  votes_aggregate_order_by: {
    count: { __type: "order_by" },
    max: { __type: "votes_max_order_by" },
    min: { __type: "votes_min_order_by" },
  },
  votes_arr_rel_insert_input: {
    data: { __type: "[votes_insert_input!]!" },
    on_conflict: { __type: "votes_on_conflict" },
  },
  votes_bool_exp: {
    _and: { __type: "[votes_bool_exp]" },
    _not: { __type: "votes_bool_exp" },
    _or: { __type: "[votes_bool_exp]" },
    id: { __type: "uuid_comparison_exp" },
    pollId: { __type: "uuid_comparison_exp" },
    userId: { __type: "uuid_comparison_exp" },
    value: { __type: "_int4_comparison_exp" },
  },
  votes_insert_input: {
    id: { __type: "uuid" },
    pollId: { __type: "uuid" },
    userId: { __type: "uuid" },
    value: { __type: "_int4" },
  },
  votes_max_fields: {
    __typename: { __type: "String!" },
    id: { __type: "uuid" },
    pollId: { __type: "uuid" },
    userId: { __type: "uuid" },
  },
  votes_max_order_by: {
    id: { __type: "order_by" },
    pollId: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  votes_min_fields: {
    __typename: { __type: "String!" },
    id: { __type: "uuid" },
    pollId: { __type: "uuid" },
    userId: { __type: "uuid" },
  },
  votes_min_order_by: {
    id: { __type: "order_by" },
    pollId: { __type: "order_by" },
    userId: { __type: "order_by" },
  },
  votes_mutation_response: {
    __typename: { __type: "String!" },
    affected_rows: { __type: "Int!" },
    returning: { __type: "[votes!]!" },
  },
  votes_obj_rel_insert_input: {
    data: { __type: "votes_insert_input!" },
    on_conflict: { __type: "votes_on_conflict" },
  },
  votes_on_conflict: {
    constraint: { __type: "votes_constraint!" },
    update_columns: { __type: "[votes_update_column!]!" },
    where: { __type: "votes_bool_exp" },
  },
  votes_order_by: {
    id: { __type: "order_by" },
    pollId: { __type: "order_by" },
    userId: { __type: "order_by" },
    value: { __type: "order_by" },
  },
  votes_pk_columns_input: { id: { __type: "uuid!" } },
  votes_set_input: {
    id: { __type: "uuid" },
    pollId: { __type: "uuid" },
    userId: { __type: "uuid" },
    value: { __type: "_int4" },
  },
} as const;

export interface Query {
  __typename?: "Query";
  admissions: (args?: {
    distinct_on?: Maybe<Array<admissions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<admissions_order_by>>;
    where?: Maybe<admissions_bool_exp>;
  }) => Array<admissions>;
  admissions_aggregate: (args?: {
    distinct_on?: Maybe<Array<admissions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<admissions_order_by>>;
    where?: Maybe<admissions_bool_exp>;
  }) => admissions_aggregate;
  admissions_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<admissions>;
  auth_account_providers: (args?: {
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_providers_order_by>>;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => Array<auth_account_providers>;
  auth_account_providers_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_providers_order_by>>;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => auth_account_providers_aggregate;
  auth_account_providers_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<auth_account_providers>;
  auth_account_roles: (args?: {
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_roles_order_by>>;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => Array<auth_account_roles>;
  auth_account_roles_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_roles_order_by>>;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => auth_account_roles_aggregate;
  auth_account_roles_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<auth_account_roles>;
  auth_accounts: (args?: {
    distinct_on?: Maybe<Array<auth_accounts_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_accounts_order_by>>;
    where?: Maybe<auth_accounts_bool_exp>;
  }) => Array<auth_accounts>;
  auth_accounts_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_accounts_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_accounts_order_by>>;
    where?: Maybe<auth_accounts_bool_exp>;
  }) => auth_accounts_aggregate;
  auth_accounts_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<auth_accounts>;
  auth_providers: (args?: {
    distinct_on?: Maybe<Array<auth_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_providers_order_by>>;
    where?: Maybe<auth_providers_bool_exp>;
  }) => Array<auth_providers>;
  auth_providers_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_providers_order_by>>;
    where?: Maybe<auth_providers_bool_exp>;
  }) => auth_providers_aggregate;
  auth_providers_by_pk: (args: {
    provider: Scalars["String"];
  }) => Maybe<auth_providers>;
  auth_refresh_tokens: (args?: {
    distinct_on?: Maybe<Array<auth_refresh_tokens_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_refresh_tokens_order_by>>;
    where?: Maybe<auth_refresh_tokens_bool_exp>;
  }) => Array<auth_refresh_tokens>;
  auth_refresh_tokens_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_refresh_tokens_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_refresh_tokens_order_by>>;
    where?: Maybe<auth_refresh_tokens_bool_exp>;
  }) => auth_refresh_tokens_aggregate;
  auth_refresh_tokens_by_pk: (args: {
    refresh_token: Scalars["uuid"];
  }) => Maybe<auth_refresh_tokens>;
  auth_roles: (args?: {
    distinct_on?: Maybe<Array<auth_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_roles_order_by>>;
    where?: Maybe<auth_roles_bool_exp>;
  }) => Array<auth_roles>;
  auth_roles_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_roles_order_by>>;
    where?: Maybe<auth_roles_bool_exp>;
  }) => auth_roles_aggregate;
  auth_roles_by_pk: (args: { role: Scalars["String"] }) => Maybe<auth_roles>;
  authorships: (args?: {
    distinct_on?: Maybe<Array<authorships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<authorships_order_by>>;
    where?: Maybe<authorships_bool_exp>;
  }) => Array<authorships>;
  authorships_aggregate: (args?: {
    distinct_on?: Maybe<Array<authorships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<authorships_order_by>>;
    where?: Maybe<authorships_bool_exp>;
  }) => authorships_aggregate;
  authorships_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<authorships>;
  canVote: (args?: {
    eventId?: Maybe<Scalars["uuid"]>;
  }) => Maybe<CanVoteOutput>;
  contents: (args?: {
    distinct_on?: Maybe<Array<contents_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<contents_order_by>>;
    where?: Maybe<contents_bool_exp>;
  }) => Array<contents>;
  contents_aggregate: (args?: {
    distinct_on?: Maybe<Array<contents_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<contents_order_by>>;
    where?: Maybe<contents_bool_exp>;
  }) => contents_aggregate;
  contents_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<contents>;
  events: (args?: {
    distinct_on?: Maybe<Array<events_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<events_order_by>>;
    where?: Maybe<events_bool_exp>;
  }) => Array<events>;
  events_aggregate: (args?: {
    distinct_on?: Maybe<Array<events_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<events_order_by>>;
    where?: Maybe<events_bool_exp>;
  }) => events_aggregate;
  events_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<events>;
  files: (args?: {
    distinct_on?: Maybe<Array<files_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<files_order_by>>;
    where?: Maybe<files_bool_exp>;
  }) => Array<files>;
  files_aggregate: (args?: {
    distinct_on?: Maybe<Array<files_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<files_order_by>>;
    where?: Maybe<files_bool_exp>;
  }) => files_aggregate;
  files_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<files>;
  folders: (args?: {
    distinct_on?: Maybe<Array<folders_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<folders_order_by>>;
    where?: Maybe<folders_bool_exp>;
  }) => Array<folders>;
  folders_aggregate: (args?: {
    distinct_on?: Maybe<Array<folders_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<folders_order_by>>;
    where?: Maybe<folders_bool_exp>;
  }) => folders_aggregate;
  folders_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<folders>;
  groups: (args?: {
    distinct_on?: Maybe<Array<groups_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<groups_order_by>>;
    where?: Maybe<groups_bool_exp>;
  }) => Array<groups>;
  groups_aggregate: (args?: {
    distinct_on?: Maybe<Array<groups_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<groups_order_by>>;
    where?: Maybe<groups_bool_exp>;
  }) => groups_aggregate;
  groups_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<groups>;
  identities: (args?: {
    distinct_on?: Maybe<Array<identities_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<identities_order_by>>;
    where?: Maybe<identities_bool_exp>;
  }) => Array<identities>;
  identities_aggregate: (args?: {
    distinct_on?: Maybe<Array<identities_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<identities_order_by>>;
    where?: Maybe<identities_bool_exp>;
  }) => identities_aggregate;
  identities_by_pk: (args: { email: Scalars["String"] }) => Maybe<identities>;
  memberships: (args?: {
    distinct_on?: Maybe<Array<memberships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<memberships_order_by>>;
    where?: Maybe<memberships_bool_exp>;
  }) => Array<memberships>;
  memberships_aggregate: (args?: {
    distinct_on?: Maybe<Array<memberships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<memberships_order_by>>;
    where?: Maybe<memberships_bool_exp>;
  }) => memberships_aggregate;
  memberships_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<memberships>;
  polls: (args?: {
    distinct_on?: Maybe<Array<polls_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<polls_order_by>>;
    where?: Maybe<polls_bool_exp>;
  }) => Array<polls>;
  polls_aggregate: (args?: {
    distinct_on?: Maybe<Array<polls_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<polls_order_by>>;
    where?: Maybe<polls_bool_exp>;
  }) => polls_aggregate;
  polls_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<polls>;
  roles: (args?: {
    distinct_on?: Maybe<Array<roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<roles_order_by>>;
    where?: Maybe<roles_bool_exp>;
  }) => Array<roles>;
  roles_aggregate: (args?: {
    distinct_on?: Maybe<Array<roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<roles_order_by>>;
    where?: Maybe<roles_bool_exp>;
  }) => roles_aggregate;
  roles_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<roles>;
  speaks: (args?: {
    distinct_on?: Maybe<Array<speaks_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<speaks_order_by>>;
    where?: Maybe<speaks_bool_exp>;
  }) => Array<speaks>;
  speaks_aggregate: (args?: {
    distinct_on?: Maybe<Array<speaks_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<speaks_order_by>>;
    where?: Maybe<speaks_bool_exp>;
  }) => speaks_aggregate;
  speaks_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<speaks>;
  timers: (args?: {
    distinct_on?: Maybe<Array<timers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<timers_order_by>>;
    where?: Maybe<timers_bool_exp>;
  }) => Array<timers>;
  timers_aggregate: (args?: {
    distinct_on?: Maybe<Array<timers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<timers_order_by>>;
    where?: Maybe<timers_bool_exp>;
  }) => timers_aggregate;
  timers_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<timers>;
  users: (args?: {
    distinct_on?: Maybe<Array<users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => Array<users>;
  users_aggregate: (args?: {
    distinct_on?: Maybe<Array<users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => users_aggregate;
  users_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<users>;
  votes: (args?: {
    distinct_on?: Maybe<Array<votes_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => Array<votes>;
  votes_aggregate: (args?: {
    distinct_on?: Maybe<Array<votes_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => votes_aggregate;
  votes_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<votes>;
}

export interface Mutation {
  __typename?: "Mutation";
  addVote: (args: { vote: VoteInput }) => VoteOutput;
  delete_admissions: (args: {
    where: admissions_bool_exp;
  }) => Maybe<admissions_mutation_response>;
  delete_admissions_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<admissions>;
  delete_auth_account_providers: (args: {
    where: auth_account_providers_bool_exp;
  }) => Maybe<auth_account_providers_mutation_response>;
  delete_auth_account_providers_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<auth_account_providers>;
  delete_auth_account_roles: (args: {
    where: auth_account_roles_bool_exp;
  }) => Maybe<auth_account_roles_mutation_response>;
  delete_auth_account_roles_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<auth_account_roles>;
  delete_auth_accounts: (args: {
    where: auth_accounts_bool_exp;
  }) => Maybe<auth_accounts_mutation_response>;
  delete_auth_accounts_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<auth_accounts>;
  delete_auth_providers: (args: {
    where: auth_providers_bool_exp;
  }) => Maybe<auth_providers_mutation_response>;
  delete_auth_providers_by_pk: (args: {
    provider: Scalars["String"];
  }) => Maybe<auth_providers>;
  delete_auth_refresh_tokens: (args: {
    where: auth_refresh_tokens_bool_exp;
  }) => Maybe<auth_refresh_tokens_mutation_response>;
  delete_auth_refresh_tokens_by_pk: (args: {
    refresh_token: Scalars["uuid"];
  }) => Maybe<auth_refresh_tokens>;
  delete_auth_roles: (args: {
    where: auth_roles_bool_exp;
  }) => Maybe<auth_roles_mutation_response>;
  delete_auth_roles_by_pk: (args: {
    role: Scalars["String"];
  }) => Maybe<auth_roles>;
  delete_authorships: (args: {
    where: authorships_bool_exp;
  }) => Maybe<authorships_mutation_response>;
  delete_authorships_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<authorships>;
  delete_contents: (args: {
    where: contents_bool_exp;
  }) => Maybe<contents_mutation_response>;
  delete_contents_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<contents>;
  delete_events: (args: {
    where: events_bool_exp;
  }) => Maybe<events_mutation_response>;
  delete_events_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<events>;
  delete_files: (args: {
    where: files_bool_exp;
  }) => Maybe<files_mutation_response>;
  delete_files_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<files>;
  delete_folders: (args: {
    where: folders_bool_exp;
  }) => Maybe<folders_mutation_response>;
  delete_folders_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<folders>;
  delete_groups: (args: {
    where: groups_bool_exp;
  }) => Maybe<groups_mutation_response>;
  delete_groups_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<groups>;
  delete_identities: (args: {
    where: identities_bool_exp;
  }) => Maybe<identities_mutation_response>;
  delete_identities_by_pk: (args: {
    email: Scalars["String"];
  }) => Maybe<identities>;
  delete_memberships: (args: {
    where: memberships_bool_exp;
  }) => Maybe<memberships_mutation_response>;
  delete_memberships_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<memberships>;
  delete_polls: (args: {
    where: polls_bool_exp;
  }) => Maybe<polls_mutation_response>;
  delete_polls_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<polls>;
  delete_roles: (args: {
    where: roles_bool_exp;
  }) => Maybe<roles_mutation_response>;
  delete_roles_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<roles>;
  delete_speaks: (args: {
    where: speaks_bool_exp;
  }) => Maybe<speaks_mutation_response>;
  delete_speaks_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<speaks>;
  delete_timers: (args: {
    where: timers_bool_exp;
  }) => Maybe<timers_mutation_response>;
  delete_timers_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<timers>;
  delete_users: (args: {
    where: users_bool_exp;
  }) => Maybe<users_mutation_response>;
  delete_users_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<users>;
  delete_votes: (args: {
    where: votes_bool_exp;
  }) => Maybe<votes_mutation_response>;
  delete_votes_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<votes>;
  insert_admissions: (args: {
    objects: Array<admissions_insert_input>;
    on_conflict?: Maybe<admissions_on_conflict>;
  }) => Maybe<admissions_mutation_response>;
  insert_admissions_one: (args: {
    object: admissions_insert_input;
    on_conflict?: Maybe<admissions_on_conflict>;
  }) => Maybe<admissions>;
  insert_auth_account_providers: (args: {
    objects: Array<auth_account_providers_insert_input>;
    on_conflict?: Maybe<auth_account_providers_on_conflict>;
  }) => Maybe<auth_account_providers_mutation_response>;
  insert_auth_account_providers_one: (args: {
    object: auth_account_providers_insert_input;
    on_conflict?: Maybe<auth_account_providers_on_conflict>;
  }) => Maybe<auth_account_providers>;
  insert_auth_account_roles: (args: {
    objects: Array<auth_account_roles_insert_input>;
    on_conflict?: Maybe<auth_account_roles_on_conflict>;
  }) => Maybe<auth_account_roles_mutation_response>;
  insert_auth_account_roles_one: (args: {
    object: auth_account_roles_insert_input;
    on_conflict?: Maybe<auth_account_roles_on_conflict>;
  }) => Maybe<auth_account_roles>;
  insert_auth_accounts: (args: {
    objects: Array<auth_accounts_insert_input>;
    on_conflict?: Maybe<auth_accounts_on_conflict>;
  }) => Maybe<auth_accounts_mutation_response>;
  insert_auth_accounts_one: (args: {
    object: auth_accounts_insert_input;
    on_conflict?: Maybe<auth_accounts_on_conflict>;
  }) => Maybe<auth_accounts>;
  insert_auth_providers: (args: {
    objects: Array<auth_providers_insert_input>;
    on_conflict?: Maybe<auth_providers_on_conflict>;
  }) => Maybe<auth_providers_mutation_response>;
  insert_auth_providers_one: (args: {
    object: auth_providers_insert_input;
    on_conflict?: Maybe<auth_providers_on_conflict>;
  }) => Maybe<auth_providers>;
  insert_auth_refresh_tokens: (args: {
    objects: Array<auth_refresh_tokens_insert_input>;
    on_conflict?: Maybe<auth_refresh_tokens_on_conflict>;
  }) => Maybe<auth_refresh_tokens_mutation_response>;
  insert_auth_refresh_tokens_one: (args: {
    object: auth_refresh_tokens_insert_input;
    on_conflict?: Maybe<auth_refresh_tokens_on_conflict>;
  }) => Maybe<auth_refresh_tokens>;
  insert_auth_roles: (args: {
    objects: Array<auth_roles_insert_input>;
    on_conflict?: Maybe<auth_roles_on_conflict>;
  }) => Maybe<auth_roles_mutation_response>;
  insert_auth_roles_one: (args: {
    object: auth_roles_insert_input;
    on_conflict?: Maybe<auth_roles_on_conflict>;
  }) => Maybe<auth_roles>;
  insert_authorships: (args: {
    objects: Array<authorships_insert_input>;
    on_conflict?: Maybe<authorships_on_conflict>;
  }) => Maybe<authorships_mutation_response>;
  insert_authorships_one: (args: {
    object: authorships_insert_input;
    on_conflict?: Maybe<authorships_on_conflict>;
  }) => Maybe<authorships>;
  insert_contents: (args: {
    objects: Array<contents_insert_input>;
    on_conflict?: Maybe<contents_on_conflict>;
  }) => Maybe<contents_mutation_response>;
  insert_contents_one: (args: {
    object: contents_insert_input;
    on_conflict?: Maybe<contents_on_conflict>;
  }) => Maybe<contents>;
  insert_events: (args: {
    objects: Array<events_insert_input>;
    on_conflict?: Maybe<events_on_conflict>;
  }) => Maybe<events_mutation_response>;
  insert_events_one: (args: {
    object: events_insert_input;
    on_conflict?: Maybe<events_on_conflict>;
  }) => Maybe<events>;
  insert_files: (args: {
    objects: Array<files_insert_input>;
    on_conflict?: Maybe<files_on_conflict>;
  }) => Maybe<files_mutation_response>;
  insert_files_one: (args: {
    object: files_insert_input;
    on_conflict?: Maybe<files_on_conflict>;
  }) => Maybe<files>;
  insert_folders: (args: {
    objects: Array<folders_insert_input>;
    on_conflict?: Maybe<folders_on_conflict>;
  }) => Maybe<folders_mutation_response>;
  insert_folders_one: (args: {
    object: folders_insert_input;
    on_conflict?: Maybe<folders_on_conflict>;
  }) => Maybe<folders>;
  insert_groups: (args: {
    objects: Array<groups_insert_input>;
    on_conflict?: Maybe<groups_on_conflict>;
  }) => Maybe<groups_mutation_response>;
  insert_groups_one: (args: {
    object: groups_insert_input;
    on_conflict?: Maybe<groups_on_conflict>;
  }) => Maybe<groups>;
  insert_identities: (args: {
    objects: Array<identities_insert_input>;
    on_conflict?: Maybe<identities_on_conflict>;
  }) => Maybe<identities_mutation_response>;
  insert_identities_one: (args: {
    object: identities_insert_input;
    on_conflict?: Maybe<identities_on_conflict>;
  }) => Maybe<identities>;
  insert_memberships: (args: {
    objects: Array<memberships_insert_input>;
    on_conflict?: Maybe<memberships_on_conflict>;
  }) => Maybe<memberships_mutation_response>;
  insert_memberships_one: (args: {
    object: memberships_insert_input;
    on_conflict?: Maybe<memberships_on_conflict>;
  }) => Maybe<memberships>;
  insert_polls: (args: {
    objects: Array<polls_insert_input>;
    on_conflict?: Maybe<polls_on_conflict>;
  }) => Maybe<polls_mutation_response>;
  insert_polls_one: (args: {
    object: polls_insert_input;
    on_conflict?: Maybe<polls_on_conflict>;
  }) => Maybe<polls>;
  insert_roles: (args: {
    objects: Array<roles_insert_input>;
    on_conflict?: Maybe<roles_on_conflict>;
  }) => Maybe<roles_mutation_response>;
  insert_roles_one: (args: {
    object: roles_insert_input;
    on_conflict?: Maybe<roles_on_conflict>;
  }) => Maybe<roles>;
  insert_speaks: (args: {
    objects: Array<speaks_insert_input>;
    on_conflict?: Maybe<speaks_on_conflict>;
  }) => Maybe<speaks_mutation_response>;
  insert_speaks_one: (args: {
    object: speaks_insert_input;
    on_conflict?: Maybe<speaks_on_conflict>;
  }) => Maybe<speaks>;
  insert_timers: (args: {
    objects: Array<timers_insert_input>;
    on_conflict?: Maybe<timers_on_conflict>;
  }) => Maybe<timers_mutation_response>;
  insert_timers_one: (args: {
    object: timers_insert_input;
    on_conflict?: Maybe<timers_on_conflict>;
  }) => Maybe<timers>;
  insert_users: (args: {
    objects: Array<users_insert_input>;
    on_conflict?: Maybe<users_on_conflict>;
  }) => Maybe<users_mutation_response>;
  insert_users_one: (args: {
    object: users_insert_input;
    on_conflict?: Maybe<users_on_conflict>;
  }) => Maybe<users>;
  insert_votes: (args: {
    objects: Array<votes_insert_input>;
    on_conflict?: Maybe<votes_on_conflict>;
  }) => Maybe<votes_mutation_response>;
  insert_votes_one: (args: {
    object: votes_insert_input;
    on_conflict?: Maybe<votes_on_conflict>;
  }) => Maybe<votes>;
  update_admissions: (args: {
    _set?: Maybe<admissions_set_input>;
    where: admissions_bool_exp;
  }) => Maybe<admissions_mutation_response>;
  update_admissions_by_pk: (args: {
    _set?: Maybe<admissions_set_input>;
    pk_columns: admissions_pk_columns_input;
  }) => Maybe<admissions>;
  update_auth_account_providers: (args: {
    _set?: Maybe<auth_account_providers_set_input>;
    where: auth_account_providers_bool_exp;
  }) => Maybe<auth_account_providers_mutation_response>;
  update_auth_account_providers_by_pk: (args: {
    _set?: Maybe<auth_account_providers_set_input>;
    pk_columns: auth_account_providers_pk_columns_input;
  }) => Maybe<auth_account_providers>;
  update_auth_account_roles: (args: {
    _set?: Maybe<auth_account_roles_set_input>;
    where: auth_account_roles_bool_exp;
  }) => Maybe<auth_account_roles_mutation_response>;
  update_auth_account_roles_by_pk: (args: {
    _set?: Maybe<auth_account_roles_set_input>;
    pk_columns: auth_account_roles_pk_columns_input;
  }) => Maybe<auth_account_roles>;
  update_auth_accounts: (args: {
    _append?: Maybe<auth_accounts_append_input>;
    _delete_at_path?: Maybe<auth_accounts_delete_at_path_input>;
    _delete_elem?: Maybe<auth_accounts_delete_elem_input>;
    _delete_key?: Maybe<auth_accounts_delete_key_input>;
    _prepend?: Maybe<auth_accounts_prepend_input>;
    _set?: Maybe<auth_accounts_set_input>;
    where: auth_accounts_bool_exp;
  }) => Maybe<auth_accounts_mutation_response>;
  update_auth_accounts_by_pk: (args: {
    _append?: Maybe<auth_accounts_append_input>;
    _delete_at_path?: Maybe<auth_accounts_delete_at_path_input>;
    _delete_elem?: Maybe<auth_accounts_delete_elem_input>;
    _delete_key?: Maybe<auth_accounts_delete_key_input>;
    _prepend?: Maybe<auth_accounts_prepend_input>;
    _set?: Maybe<auth_accounts_set_input>;
    pk_columns: auth_accounts_pk_columns_input;
  }) => Maybe<auth_accounts>;
  update_auth_providers: (args: {
    _set?: Maybe<auth_providers_set_input>;
    where: auth_providers_bool_exp;
  }) => Maybe<auth_providers_mutation_response>;
  update_auth_providers_by_pk: (args: {
    _set?: Maybe<auth_providers_set_input>;
    pk_columns: auth_providers_pk_columns_input;
  }) => Maybe<auth_providers>;
  update_auth_refresh_tokens: (args: {
    _set?: Maybe<auth_refresh_tokens_set_input>;
    where: auth_refresh_tokens_bool_exp;
  }) => Maybe<auth_refresh_tokens_mutation_response>;
  update_auth_refresh_tokens_by_pk: (args: {
    _set?: Maybe<auth_refresh_tokens_set_input>;
    pk_columns: auth_refresh_tokens_pk_columns_input;
  }) => Maybe<auth_refresh_tokens>;
  update_auth_roles: (args: {
    _set?: Maybe<auth_roles_set_input>;
    where: auth_roles_bool_exp;
  }) => Maybe<auth_roles_mutation_response>;
  update_auth_roles_by_pk: (args: {
    _set?: Maybe<auth_roles_set_input>;
    pk_columns: auth_roles_pk_columns_input;
  }) => Maybe<auth_roles>;
  update_authorships: (args: {
    _set?: Maybe<authorships_set_input>;
    where: authorships_bool_exp;
  }) => Maybe<authorships_mutation_response>;
  update_authorships_by_pk: (args: {
    _set?: Maybe<authorships_set_input>;
    pk_columns: authorships_pk_columns_input;
  }) => Maybe<authorships>;
  update_contents: (args: {
    _inc?: Maybe<contents_inc_input>;
    _set?: Maybe<contents_set_input>;
    where: contents_bool_exp;
  }) => Maybe<contents_mutation_response>;
  update_contents_by_pk: (args: {
    _inc?: Maybe<contents_inc_input>;
    _set?: Maybe<contents_set_input>;
    pk_columns: contents_pk_columns_input;
  }) => Maybe<contents>;
  update_events: (args: {
    _set?: Maybe<events_set_input>;
    where: events_bool_exp;
  }) => Maybe<events_mutation_response>;
  update_events_by_pk: (args: {
    _set?: Maybe<events_set_input>;
    pk_columns: events_pk_columns_input;
  }) => Maybe<events>;
  update_files: (args: {
    _set?: Maybe<files_set_input>;
    where: files_bool_exp;
  }) => Maybe<files_mutation_response>;
  update_files_by_pk: (args: {
    _set?: Maybe<files_set_input>;
    pk_columns: files_pk_columns_input;
  }) => Maybe<files>;
  update_folders: (args: {
    _inc?: Maybe<folders_inc_input>;
    _set?: Maybe<folders_set_input>;
    where: folders_bool_exp;
  }) => Maybe<folders_mutation_response>;
  update_folders_by_pk: (args: {
    _inc?: Maybe<folders_inc_input>;
    _set?: Maybe<folders_set_input>;
    pk_columns: folders_pk_columns_input;
  }) => Maybe<folders>;
  update_groups: (args: {
    _set?: Maybe<groups_set_input>;
    where: groups_bool_exp;
  }) => Maybe<groups_mutation_response>;
  update_groups_by_pk: (args: {
    _set?: Maybe<groups_set_input>;
    pk_columns: groups_pk_columns_input;
  }) => Maybe<groups>;
  update_identities: (args: {
    _set?: Maybe<identities_set_input>;
    where: identities_bool_exp;
  }) => Maybe<identities_mutation_response>;
  update_identities_by_pk: (args: {
    _set?: Maybe<identities_set_input>;
    pk_columns: identities_pk_columns_input;
  }) => Maybe<identities>;
  update_memberships: (args: {
    _set?: Maybe<memberships_set_input>;
    where: memberships_bool_exp;
  }) => Maybe<memberships_mutation_response>;
  update_memberships_by_pk: (args: {
    _set?: Maybe<memberships_set_input>;
    pk_columns: memberships_pk_columns_input;
  }) => Maybe<memberships>;
  update_polls: (args: {
    _inc?: Maybe<polls_inc_input>;
    _set?: Maybe<polls_set_input>;
    where: polls_bool_exp;
  }) => Maybe<polls_mutation_response>;
  update_polls_by_pk: (args: {
    _inc?: Maybe<polls_inc_input>;
    _set?: Maybe<polls_set_input>;
    pk_columns: polls_pk_columns_input;
  }) => Maybe<polls>;
  update_roles: (args: {
    _set?: Maybe<roles_set_input>;
    where: roles_bool_exp;
  }) => Maybe<roles_mutation_response>;
  update_roles_by_pk: (args: {
    _set?: Maybe<roles_set_input>;
    pk_columns: roles_pk_columns_input;
  }) => Maybe<roles>;
  update_speaks: (args: {
    _inc?: Maybe<speaks_inc_input>;
    _set?: Maybe<speaks_set_input>;
    where: speaks_bool_exp;
  }) => Maybe<speaks_mutation_response>;
  update_speaks_by_pk: (args: {
    _inc?: Maybe<speaks_inc_input>;
    _set?: Maybe<speaks_set_input>;
    pk_columns: speaks_pk_columns_input;
  }) => Maybe<speaks>;
  update_timers: (args: {
    _inc?: Maybe<timers_inc_input>;
    _set?: Maybe<timers_set_input>;
    where: timers_bool_exp;
  }) => Maybe<timers_mutation_response>;
  update_timers_by_pk: (args: {
    _inc?: Maybe<timers_inc_input>;
    _set?: Maybe<timers_set_input>;
    pk_columns: timers_pk_columns_input;
  }) => Maybe<timers>;
  update_users: (args: {
    _set?: Maybe<users_set_input>;
    where: users_bool_exp;
  }) => Maybe<users_mutation_response>;
  update_users_by_pk: (args: {
    _set?: Maybe<users_set_input>;
    pk_columns: users_pk_columns_input;
  }) => Maybe<users>;
  update_votes: (args: {
    _set?: Maybe<votes_set_input>;
    where: votes_bool_exp;
  }) => Maybe<votes_mutation_response>;
  update_votes_by_pk: (args: {
    _set?: Maybe<votes_set_input>;
    pk_columns: votes_pk_columns_input;
  }) => Maybe<votes>;
}

export interface Subscription {
  __typename?: "Subscription";
  admissions: (args?: {
    distinct_on?: Maybe<Array<admissions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<admissions_order_by>>;
    where?: Maybe<admissions_bool_exp>;
  }) => Array<admissions>;
  admissions_aggregate: (args?: {
    distinct_on?: Maybe<Array<admissions_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<admissions_order_by>>;
    where?: Maybe<admissions_bool_exp>;
  }) => admissions_aggregate;
  admissions_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<admissions>;
  auth_account_providers: (args?: {
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_providers_order_by>>;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => Array<auth_account_providers>;
  auth_account_providers_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_providers_order_by>>;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => auth_account_providers_aggregate;
  auth_account_providers_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<auth_account_providers>;
  auth_account_roles: (args?: {
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_roles_order_by>>;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => Array<auth_account_roles>;
  auth_account_roles_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_account_roles_order_by>>;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => auth_account_roles_aggregate;
  auth_account_roles_by_pk: (args: {
    id: Scalars["uuid"];
  }) => Maybe<auth_account_roles>;
  auth_accounts: (args?: {
    distinct_on?: Maybe<Array<auth_accounts_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_accounts_order_by>>;
    where?: Maybe<auth_accounts_bool_exp>;
  }) => Array<auth_accounts>;
  auth_accounts_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_accounts_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_accounts_order_by>>;
    where?: Maybe<auth_accounts_bool_exp>;
  }) => auth_accounts_aggregate;
  auth_accounts_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<auth_accounts>;
  auth_providers: (args?: {
    distinct_on?: Maybe<Array<auth_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_providers_order_by>>;
    where?: Maybe<auth_providers_bool_exp>;
  }) => Array<auth_providers>;
  auth_providers_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_providers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_providers_order_by>>;
    where?: Maybe<auth_providers_bool_exp>;
  }) => auth_providers_aggregate;
  auth_providers_by_pk: (args: {
    provider: Scalars["String"];
  }) => Maybe<auth_providers>;
  auth_refresh_tokens: (args?: {
    distinct_on?: Maybe<Array<auth_refresh_tokens_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_refresh_tokens_order_by>>;
    where?: Maybe<auth_refresh_tokens_bool_exp>;
  }) => Array<auth_refresh_tokens>;
  auth_refresh_tokens_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_refresh_tokens_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_refresh_tokens_order_by>>;
    where?: Maybe<auth_refresh_tokens_bool_exp>;
  }) => auth_refresh_tokens_aggregate;
  auth_refresh_tokens_by_pk: (args: {
    refresh_token: Scalars["uuid"];
  }) => Maybe<auth_refresh_tokens>;
  auth_roles: (args?: {
    distinct_on?: Maybe<Array<auth_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_roles_order_by>>;
    where?: Maybe<auth_roles_bool_exp>;
  }) => Array<auth_roles>;
  auth_roles_aggregate: (args?: {
    distinct_on?: Maybe<Array<auth_roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<auth_roles_order_by>>;
    where?: Maybe<auth_roles_bool_exp>;
  }) => auth_roles_aggregate;
  auth_roles_by_pk: (args: { role: Scalars["String"] }) => Maybe<auth_roles>;
  authorships: (args?: {
    distinct_on?: Maybe<Array<authorships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<authorships_order_by>>;
    where?: Maybe<authorships_bool_exp>;
  }) => Array<authorships>;
  authorships_aggregate: (args?: {
    distinct_on?: Maybe<Array<authorships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<authorships_order_by>>;
    where?: Maybe<authorships_bool_exp>;
  }) => authorships_aggregate;
  authorships_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<authorships>;
  canVote: (args?: {
    eventId?: Maybe<Scalars["uuid"]>;
  }) => Maybe<CanVoteOutput>;
  contents: (args?: {
    distinct_on?: Maybe<Array<contents_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<contents_order_by>>;
    where?: Maybe<contents_bool_exp>;
  }) => Array<contents>;
  contents_aggregate: (args?: {
    distinct_on?: Maybe<Array<contents_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<contents_order_by>>;
    where?: Maybe<contents_bool_exp>;
  }) => contents_aggregate;
  contents_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<contents>;
  events: (args?: {
    distinct_on?: Maybe<Array<events_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<events_order_by>>;
    where?: Maybe<events_bool_exp>;
  }) => Array<events>;
  events_aggregate: (args?: {
    distinct_on?: Maybe<Array<events_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<events_order_by>>;
    where?: Maybe<events_bool_exp>;
  }) => events_aggregate;
  events_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<events>;
  files: (args?: {
    distinct_on?: Maybe<Array<files_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<files_order_by>>;
    where?: Maybe<files_bool_exp>;
  }) => Array<files>;
  files_aggregate: (args?: {
    distinct_on?: Maybe<Array<files_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<files_order_by>>;
    where?: Maybe<files_bool_exp>;
  }) => files_aggregate;
  files_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<files>;
  folders: (args?: {
    distinct_on?: Maybe<Array<folders_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<folders_order_by>>;
    where?: Maybe<folders_bool_exp>;
  }) => Array<folders>;
  folders_aggregate: (args?: {
    distinct_on?: Maybe<Array<folders_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<folders_order_by>>;
    where?: Maybe<folders_bool_exp>;
  }) => folders_aggregate;
  folders_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<folders>;
  groups: (args?: {
    distinct_on?: Maybe<Array<groups_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<groups_order_by>>;
    where?: Maybe<groups_bool_exp>;
  }) => Array<groups>;
  groups_aggregate: (args?: {
    distinct_on?: Maybe<Array<groups_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<groups_order_by>>;
    where?: Maybe<groups_bool_exp>;
  }) => groups_aggregate;
  groups_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<groups>;
  identities: (args?: {
    distinct_on?: Maybe<Array<identities_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<identities_order_by>>;
    where?: Maybe<identities_bool_exp>;
  }) => Array<identities>;
  identities_aggregate: (args?: {
    distinct_on?: Maybe<Array<identities_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<identities_order_by>>;
    where?: Maybe<identities_bool_exp>;
  }) => identities_aggregate;
  identities_by_pk: (args: { email: Scalars["String"] }) => Maybe<identities>;
  memberships: (args?: {
    distinct_on?: Maybe<Array<memberships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<memberships_order_by>>;
    where?: Maybe<memberships_bool_exp>;
  }) => Array<memberships>;
  memberships_aggregate: (args?: {
    distinct_on?: Maybe<Array<memberships_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<memberships_order_by>>;
    where?: Maybe<memberships_bool_exp>;
  }) => memberships_aggregate;
  memberships_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<memberships>;
  polls: (args?: {
    distinct_on?: Maybe<Array<polls_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<polls_order_by>>;
    where?: Maybe<polls_bool_exp>;
  }) => Array<polls>;
  polls_aggregate: (args?: {
    distinct_on?: Maybe<Array<polls_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<polls_order_by>>;
    where?: Maybe<polls_bool_exp>;
  }) => polls_aggregate;
  polls_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<polls>;
  roles: (args?: {
    distinct_on?: Maybe<Array<roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<roles_order_by>>;
    where?: Maybe<roles_bool_exp>;
  }) => Array<roles>;
  roles_aggregate: (args?: {
    distinct_on?: Maybe<Array<roles_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<roles_order_by>>;
    where?: Maybe<roles_bool_exp>;
  }) => roles_aggregate;
  roles_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<roles>;
  speaks: (args?: {
    distinct_on?: Maybe<Array<speaks_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<speaks_order_by>>;
    where?: Maybe<speaks_bool_exp>;
  }) => Array<speaks>;
  speaks_aggregate: (args?: {
    distinct_on?: Maybe<Array<speaks_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<speaks_order_by>>;
    where?: Maybe<speaks_bool_exp>;
  }) => speaks_aggregate;
  speaks_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<speaks>;
  timers: (args?: {
    distinct_on?: Maybe<Array<timers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<timers_order_by>>;
    where?: Maybe<timers_bool_exp>;
  }) => Array<timers>;
  timers_aggregate: (args?: {
    distinct_on?: Maybe<Array<timers_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<timers_order_by>>;
    where?: Maybe<timers_bool_exp>;
  }) => timers_aggregate;
  timers_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<timers>;
  users: (args?: {
    distinct_on?: Maybe<Array<users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => Array<users>;
  users_aggregate: (args?: {
    distinct_on?: Maybe<Array<users_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<users_order_by>>;
    where?: Maybe<users_bool_exp>;
  }) => users_aggregate;
  users_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<users>;
  votes: (args?: {
    distinct_on?: Maybe<Array<votes_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => Array<votes>;
  votes_aggregate: (args?: {
    distinct_on?: Maybe<Array<votes_select_column>>;
    limit?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    order_by?: Maybe<Array<votes_order_by>>;
    where?: Maybe<votes_bool_exp>;
  }) => votes_aggregate;
  votes_by_pk: (args: { id: Scalars["uuid"] }) => Maybe<votes>;
}

export interface CanVoteOutput {
  __typename?: "CanVoteOutput";
  active?: Maybe<ScalarsEnums["Boolean"]>;
  canVote?: Maybe<ScalarsEnums["Boolean"]>;
  pollId: ScalarsEnums["uuid"];
}

export interface VoteOutput {
  __typename?: "VoteOutput";
  headers?: Maybe<ScalarsEnums["String"]>;
  pollId: ScalarsEnums["uuid"];
}

/**
 * columns and relationships of "admissions"
 */
export interface admissions {
  __typename?: "admissions";
  checkedIn: ScalarsEnums["Boolean"];
  email: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  event?: Maybe<events>;
  eventId: ScalarsEnums["uuid"];
  id: ScalarsEnums["uuid"];
  /**
   * An object relationship
   */
  identity?: Maybe<identities>;
  voting?: Maybe<ScalarsEnums["Boolean"]>;
}

/**
 * aggregated selection of "admissions"
 */
export interface admissions_aggregate {
  __typename?: "admissions_aggregate";
  aggregate?: Maybe<admissions_aggregate_fields>;
  nodes: Array<admissions>;
}

/**
 * aggregate fields of "admissions"
 */
export interface admissions_aggregate_fields {
  __typename?: "admissions_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<admissions_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<admissions_max_fields>;
  min?: Maybe<admissions_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface admissions_max_fields {
  __typename?: "admissions_max_fields";
  email?: Maybe<ScalarsEnums["String"]>;
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface admissions_min_fields {
  __typename?: "admissions_min_fields";
  email?: Maybe<ScalarsEnums["String"]>;
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "admissions"
 */
export interface admissions_mutation_response {
  __typename?: "admissions_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<admissions>;
}

/**
 * columns and relationships of "auth.account_providers"
 */
export interface auth_account_providers {
  __typename?: "auth_account_providers";
  /**
   * An object relationship
   */
  account: auth_accounts;
  account_id: ScalarsEnums["uuid"];
  auth_provider: ScalarsEnums["String"];
  auth_provider_unique_id: ScalarsEnums["String"];
  created_at: ScalarsEnums["timestamptz"];
  id: ScalarsEnums["uuid"];
  /**
   * An object relationship
   */
  provider: auth_providers;
  updated_at: ScalarsEnums["timestamptz"];
}

/**
 * aggregated selection of "auth.account_providers"
 */
export interface auth_account_providers_aggregate {
  __typename?: "auth_account_providers_aggregate";
  aggregate?: Maybe<auth_account_providers_aggregate_fields>;
  nodes: Array<auth_account_providers>;
}

/**
 * aggregate fields of "auth.account_providers"
 */
export interface auth_account_providers_aggregate_fields {
  __typename?: "auth_account_providers_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<auth_account_providers_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<auth_account_providers_max_fields>;
  min?: Maybe<auth_account_providers_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface auth_account_providers_max_fields {
  __typename?: "auth_account_providers_max_fields";
  account_id?: Maybe<ScalarsEnums["uuid"]>;
  auth_provider?: Maybe<ScalarsEnums["String"]>;
  auth_provider_unique_id?: Maybe<ScalarsEnums["String"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  updated_at?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * aggregate min on columns
 */
export interface auth_account_providers_min_fields {
  __typename?: "auth_account_providers_min_fields";
  account_id?: Maybe<ScalarsEnums["uuid"]>;
  auth_provider?: Maybe<ScalarsEnums["String"]>;
  auth_provider_unique_id?: Maybe<ScalarsEnums["String"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  updated_at?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * response of any mutation on the table "auth.account_providers"
 */
export interface auth_account_providers_mutation_response {
  __typename?: "auth_account_providers_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<auth_account_providers>;
}

/**
 * columns and relationships of "auth.account_roles"
 */
export interface auth_account_roles {
  __typename?: "auth_account_roles";
  /**
   * An object relationship
   */
  account: auth_accounts;
  account_id: ScalarsEnums["uuid"];
  created_at: ScalarsEnums["timestamptz"];
  id: ScalarsEnums["uuid"];
  role: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  roleByRole: auth_roles;
}

/**
 * aggregated selection of "auth.account_roles"
 */
export interface auth_account_roles_aggregate {
  __typename?: "auth_account_roles_aggregate";
  aggregate?: Maybe<auth_account_roles_aggregate_fields>;
  nodes: Array<auth_account_roles>;
}

/**
 * aggregate fields of "auth.account_roles"
 */
export interface auth_account_roles_aggregate_fields {
  __typename?: "auth_account_roles_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<auth_account_roles_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<auth_account_roles_max_fields>;
  min?: Maybe<auth_account_roles_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface auth_account_roles_max_fields {
  __typename?: "auth_account_roles_max_fields";
  account_id?: Maybe<ScalarsEnums["uuid"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  role?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface auth_account_roles_min_fields {
  __typename?: "auth_account_roles_min_fields";
  account_id?: Maybe<ScalarsEnums["uuid"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  role?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "auth.account_roles"
 */
export interface auth_account_roles_mutation_response {
  __typename?: "auth_account_roles_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<auth_account_roles>;
}

/**
 * columns and relationships of "auth.accounts"
 */
export interface auth_accounts {
  __typename?: "auth_accounts";
  /**
   * An array relationship
   */
  account_providers: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_providers_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => Array<auth_account_providers>;
  /**
   * An aggregated array relationship
   */
  account_providers_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_providers_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => auth_account_providers_aggregate;
  /**
   * An array relationship
   */
  account_roles: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_roles_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => Array<auth_account_roles>;
  /**
   * An aggregated array relationship
   */
  account_roles_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_roles_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => auth_account_roles_aggregate;
  active: ScalarsEnums["Boolean"];
  created_at: ScalarsEnums["timestamptz"];
  custom_register_data: (args?: {
    /**
     * JSON select path
     */
    path?: Maybe<Scalars["String"]>;
  }) => Maybe<ScalarsEnums["jsonb"]>;
  default_role: ScalarsEnums["String"];
  email?: Maybe<ScalarsEnums["citext"]>;
  id: ScalarsEnums["uuid"];
  is_anonymous: ScalarsEnums["Boolean"];
  mfa_enabled: ScalarsEnums["Boolean"];
  new_email?: Maybe<ScalarsEnums["citext"]>;
  otp_secret?: Maybe<ScalarsEnums["String"]>;
  password_hash?: Maybe<ScalarsEnums["String"]>;
  /**
   * An array relationship
   */
  refresh_tokens: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_refresh_tokens_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_refresh_tokens_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_refresh_tokens_bool_exp>;
  }) => Array<auth_refresh_tokens>;
  /**
   * An aggregated array relationship
   */
  refresh_tokens_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_refresh_tokens_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_refresh_tokens_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_refresh_tokens_bool_exp>;
  }) => auth_refresh_tokens_aggregate;
  /**
   * An object relationship
   */
  role: auth_roles;
  ticket: ScalarsEnums["uuid"];
  ticket_expires_at: ScalarsEnums["timestamptz"];
  updated_at: ScalarsEnums["timestamptz"];
  /**
   * An object relationship
   */
  user: users;
  user_id: ScalarsEnums["uuid"];
}

/**
 * aggregated selection of "auth.accounts"
 */
export interface auth_accounts_aggregate {
  __typename?: "auth_accounts_aggregate";
  aggregate?: Maybe<auth_accounts_aggregate_fields>;
  nodes: Array<auth_accounts>;
}

/**
 * aggregate fields of "auth.accounts"
 */
export interface auth_accounts_aggregate_fields {
  __typename?: "auth_accounts_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<auth_accounts_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<auth_accounts_max_fields>;
  min?: Maybe<auth_accounts_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface auth_accounts_max_fields {
  __typename?: "auth_accounts_max_fields";
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  default_role?: Maybe<ScalarsEnums["String"]>;
  email?: Maybe<ScalarsEnums["citext"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  new_email?: Maybe<ScalarsEnums["citext"]>;
  otp_secret?: Maybe<ScalarsEnums["String"]>;
  password_hash?: Maybe<ScalarsEnums["String"]>;
  ticket?: Maybe<ScalarsEnums["uuid"]>;
  ticket_expires_at?: Maybe<ScalarsEnums["timestamptz"]>;
  updated_at?: Maybe<ScalarsEnums["timestamptz"]>;
  user_id?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface auth_accounts_min_fields {
  __typename?: "auth_accounts_min_fields";
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  default_role?: Maybe<ScalarsEnums["String"]>;
  email?: Maybe<ScalarsEnums["citext"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  new_email?: Maybe<ScalarsEnums["citext"]>;
  otp_secret?: Maybe<ScalarsEnums["String"]>;
  password_hash?: Maybe<ScalarsEnums["String"]>;
  ticket?: Maybe<ScalarsEnums["uuid"]>;
  ticket_expires_at?: Maybe<ScalarsEnums["timestamptz"]>;
  updated_at?: Maybe<ScalarsEnums["timestamptz"]>;
  user_id?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "auth.accounts"
 */
export interface auth_accounts_mutation_response {
  __typename?: "auth_accounts_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<auth_accounts>;
}

/**
 * columns and relationships of "auth.providers"
 */
export interface auth_providers {
  __typename?: "auth_providers";
  /**
   * An array relationship
   */
  account_providers: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_providers_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => Array<auth_account_providers>;
  /**
   * An aggregated array relationship
   */
  account_providers_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_providers_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_providers_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_providers_bool_exp>;
  }) => auth_account_providers_aggregate;
  provider: ScalarsEnums["String"];
}

/**
 * aggregated selection of "auth.providers"
 */
export interface auth_providers_aggregate {
  __typename?: "auth_providers_aggregate";
  aggregate?: Maybe<auth_providers_aggregate_fields>;
  nodes: Array<auth_providers>;
}

/**
 * aggregate fields of "auth.providers"
 */
export interface auth_providers_aggregate_fields {
  __typename?: "auth_providers_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<auth_providers_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<auth_providers_max_fields>;
  min?: Maybe<auth_providers_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface auth_providers_max_fields {
  __typename?: "auth_providers_max_fields";
  provider?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface auth_providers_min_fields {
  __typename?: "auth_providers_min_fields";
  provider?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "auth.providers"
 */
export interface auth_providers_mutation_response {
  __typename?: "auth_providers_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<auth_providers>;
}

/**
 * columns and relationships of "auth.refresh_tokens"
 */
export interface auth_refresh_tokens {
  __typename?: "auth_refresh_tokens";
  /**
   * An object relationship
   */
  account: auth_accounts;
  account_id: ScalarsEnums["uuid"];
  created_at: ScalarsEnums["timestamptz"];
  expires_at: ScalarsEnums["timestamptz"];
  refresh_token: ScalarsEnums["uuid"];
}

/**
 * aggregated selection of "auth.refresh_tokens"
 */
export interface auth_refresh_tokens_aggregate {
  __typename?: "auth_refresh_tokens_aggregate";
  aggregate?: Maybe<auth_refresh_tokens_aggregate_fields>;
  nodes: Array<auth_refresh_tokens>;
}

/**
 * aggregate fields of "auth.refresh_tokens"
 */
export interface auth_refresh_tokens_aggregate_fields {
  __typename?: "auth_refresh_tokens_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<auth_refresh_tokens_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<auth_refresh_tokens_max_fields>;
  min?: Maybe<auth_refresh_tokens_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface auth_refresh_tokens_max_fields {
  __typename?: "auth_refresh_tokens_max_fields";
  account_id?: Maybe<ScalarsEnums["uuid"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  expires_at?: Maybe<ScalarsEnums["timestamptz"]>;
  refresh_token?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface auth_refresh_tokens_min_fields {
  __typename?: "auth_refresh_tokens_min_fields";
  account_id?: Maybe<ScalarsEnums["uuid"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  expires_at?: Maybe<ScalarsEnums["timestamptz"]>;
  refresh_token?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "auth.refresh_tokens"
 */
export interface auth_refresh_tokens_mutation_response {
  __typename?: "auth_refresh_tokens_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<auth_refresh_tokens>;
}

/**
 * columns and relationships of "auth.roles"
 */
export interface auth_roles {
  __typename?: "auth_roles";
  /**
   * An array relationship
   */
  account_roles: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_roles_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => Array<auth_account_roles>;
  /**
   * An aggregated array relationship
   */
  account_roles_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_account_roles_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_account_roles_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_account_roles_bool_exp>;
  }) => auth_account_roles_aggregate;
  /**
   * An array relationship
   */
  accounts: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_accounts_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_accounts_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_accounts_bool_exp>;
  }) => Array<auth_accounts>;
  /**
   * An aggregated array relationship
   */
  accounts_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<auth_accounts_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<auth_accounts_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<auth_accounts_bool_exp>;
  }) => auth_accounts_aggregate;
  role: ScalarsEnums["String"];
}

/**
 * aggregated selection of "auth.roles"
 */
export interface auth_roles_aggregate {
  __typename?: "auth_roles_aggregate";
  aggregate?: Maybe<auth_roles_aggregate_fields>;
  nodes: Array<auth_roles>;
}

/**
 * aggregate fields of "auth.roles"
 */
export interface auth_roles_aggregate_fields {
  __typename?: "auth_roles_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<auth_roles_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<auth_roles_max_fields>;
  min?: Maybe<auth_roles_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface auth_roles_max_fields {
  __typename?: "auth_roles_max_fields";
  role?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface auth_roles_min_fields {
  __typename?: "auth_roles_min_fields";
  role?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "auth.roles"
 */
export interface auth_roles_mutation_response {
  __typename?: "auth_roles_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<auth_roles>;
}

/**
 * columns and relationships of "authorships"
 */
export interface authorships {
  __typename?: "authorships";
  /**
   * An object relationship
   */
  content?: Maybe<contents>;
  contentId: ScalarsEnums["uuid"];
  email?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["uuid"];
  /**
   * An object relationship
   */
  identity?: Maybe<identities>;
  name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregated selection of "authorships"
 */
export interface authorships_aggregate {
  __typename?: "authorships_aggregate";
  aggregate?: Maybe<authorships_aggregate_fields>;
  nodes: Array<authorships>;
}

/**
 * aggregate fields of "authorships"
 */
export interface authorships_aggregate_fields {
  __typename?: "authorships_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<authorships_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<authorships_max_fields>;
  min?: Maybe<authorships_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface authorships_max_fields {
  __typename?: "authorships_max_fields";
  contentId?: Maybe<ScalarsEnums["uuid"]>;
  email?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface authorships_min_fields {
  __typename?: "authorships_min_fields";
  contentId?: Maybe<ScalarsEnums["uuid"]>;
  email?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "authorships"
 */
export interface authorships_mutation_response {
  __typename?: "authorships_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<authorships>;
}

/**
 * columns and relationships of "contents"
 */
export interface contents {
  __typename?: "contents";
  /**
   * An array relationship
   */
  authors: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<authorships_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<authorships_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<authorships_bool_exp>;
  }) => Array<authorships>;
  /**
   * An aggregated array relationship
   */
  authors_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<authorships_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<authorships_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<authorships_bool_exp>;
  }) => authorships_aggregate;
  /**
   * An array relationship
   */
  children: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<contents_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<contents_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<contents_bool_exp>;
  }) => Array<contents>;
  /**
   * An aggregated array relationship
   */
  children_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<contents_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<contents_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<contents_bool_exp>;
  }) => contents_aggregate;
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  /**
   * An object relationship
   */
  creator?: Maybe<users>;
  creatorId: ScalarsEnums["uuid"];
  data: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  file?: Maybe<files>;
  fileId?: Maybe<ScalarsEnums["uuid"]>;
  /**
   * An object relationship
   */
  folder?: Maybe<folders>;
  folderId: ScalarsEnums["uuid"];
  id: ScalarsEnums["uuid"];
  name: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  parent?: Maybe<contents>;
  parentId?: Maybe<ScalarsEnums["uuid"]>;
  /**
   * An array relationship
   */
  polls: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<polls_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<polls_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<polls_bool_exp>;
  }) => Array<polls>;
  /**
   * An aggregated array relationship
   */
  polls_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<polls_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<polls_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<polls_bool_exp>;
  }) => polls_aggregate;
  priority: ScalarsEnums["Int"];
  published: ScalarsEnums["Boolean"];
  updatedAt?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * aggregated selection of "contents"
 */
export interface contents_aggregate {
  __typename?: "contents_aggregate";
  aggregate?: Maybe<contents_aggregate_fields>;
  nodes: Array<contents>;
}

/**
 * aggregate fields of "contents"
 */
export interface contents_aggregate_fields {
  __typename?: "contents_aggregate_fields";
  avg?: Maybe<contents_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<contents_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<contents_max_fields>;
  min?: Maybe<contents_min_fields>;
  stddev?: Maybe<contents_stddev_fields>;
  stddev_pop?: Maybe<contents_stddev_pop_fields>;
  stddev_samp?: Maybe<contents_stddev_samp_fields>;
  sum?: Maybe<contents_sum_fields>;
  var_pop?: Maybe<contents_var_pop_fields>;
  var_samp?: Maybe<contents_var_samp_fields>;
  variance?: Maybe<contents_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface contents_avg_fields {
  __typename?: "contents_avg_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface contents_max_fields {
  __typename?: "contents_max_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  creatorId?: Maybe<ScalarsEnums["uuid"]>;
  data?: Maybe<ScalarsEnums["String"]>;
  fileId?: Maybe<ScalarsEnums["uuid"]>;
  folderId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  parentId?: Maybe<ScalarsEnums["uuid"]>;
  priority?: Maybe<ScalarsEnums["Int"]>;
  updatedAt?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * aggregate min on columns
 */
export interface contents_min_fields {
  __typename?: "contents_min_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  creatorId?: Maybe<ScalarsEnums["uuid"]>;
  data?: Maybe<ScalarsEnums["String"]>;
  fileId?: Maybe<ScalarsEnums["uuid"]>;
  folderId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  parentId?: Maybe<ScalarsEnums["uuid"]>;
  priority?: Maybe<ScalarsEnums["Int"]>;
  updatedAt?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * response of any mutation on the table "contents"
 */
export interface contents_mutation_response {
  __typename?: "contents_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<contents>;
}

/**
 * aggregate stddev on columns
 */
export interface contents_stddev_fields {
  __typename?: "contents_stddev_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface contents_stddev_pop_fields {
  __typename?: "contents_stddev_pop_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface contents_stddev_samp_fields {
  __typename?: "contents_stddev_samp_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface contents_sum_fields {
  __typename?: "contents_sum_fields";
  priority?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface contents_var_pop_fields {
  __typename?: "contents_var_pop_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface contents_var_samp_fields {
  __typename?: "contents_var_samp_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface contents_variance_fields {
  __typename?: "contents_variance_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "events"
 */
export interface events {
  __typename?: "events";
  /**
   * An array relationship
   */
  admissions: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<admissions_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<admissions_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<admissions_bool_exp>;
  }) => Array<admissions>;
  /**
   * An aggregated array relationship
   */
  admissions_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<admissions_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<admissions_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<admissions_bool_exp>;
  }) => admissions_aggregate;
  /**
   * An object relationship
   */
  content?: Maybe<contents>;
  contentId?: Maybe<ScalarsEnums["uuid"]>;
  createdAt: ScalarsEnums["timestamptz"];
  /**
   * An object relationship
   */
  folder?: Maybe<folders>;
  folderId?: Maybe<ScalarsEnums["uuid"]>;
  /**
   * An object relationship
   */
  group?: Maybe<groups>;
  groupId: ScalarsEnums["uuid"];
  id: ScalarsEnums["uuid"];
  lockSpeak: ScalarsEnums["Boolean"];
  name: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  poll?: Maybe<polls>;
  pollId?: Maybe<ScalarsEnums["uuid"]>;
  shortName: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  timer?: Maybe<timers>;
  timerId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregated selection of "events"
 */
export interface events_aggregate {
  __typename?: "events_aggregate";
  aggregate?: Maybe<events_aggregate_fields>;
  nodes: Array<events>;
}

/**
 * aggregate fields of "events"
 */
export interface events_aggregate_fields {
  __typename?: "events_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<events_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<events_max_fields>;
  min?: Maybe<events_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface events_max_fields {
  __typename?: "events_max_fields";
  contentId?: Maybe<ScalarsEnums["uuid"]>;
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  folderId?: Maybe<ScalarsEnums["uuid"]>;
  groupId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  pollId?: Maybe<ScalarsEnums["uuid"]>;
  shortName?: Maybe<ScalarsEnums["String"]>;
  timerId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface events_min_fields {
  __typename?: "events_min_fields";
  contentId?: Maybe<ScalarsEnums["uuid"]>;
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  folderId?: Maybe<ScalarsEnums["uuid"]>;
  groupId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  pollId?: Maybe<ScalarsEnums["uuid"]>;
  shortName?: Maybe<ScalarsEnums["String"]>;
  timerId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "events"
 */
export interface events_mutation_response {
  __typename?: "events_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<events>;
}

/**
 * columns and relationships of "files"
 */
export interface files {
  __typename?: "files";
  createdAt: ScalarsEnums["timestamptz"];
  id: ScalarsEnums["uuid"];
  path: ScalarsEnums["String"];
  token: ScalarsEnums["String"];
  updatedAt: ScalarsEnums["timestamptz"];
  /**
   * An object relationship
   */
  user?: Maybe<users>;
  userId: ScalarsEnums["uuid"];
}

/**
 * aggregated selection of "files"
 */
export interface files_aggregate {
  __typename?: "files_aggregate";
  aggregate?: Maybe<files_aggregate_fields>;
  nodes: Array<files>;
}

/**
 * aggregate fields of "files"
 */
export interface files_aggregate_fields {
  __typename?: "files_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<files_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<files_max_fields>;
  min?: Maybe<files_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface files_max_fields {
  __typename?: "files_max_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  path?: Maybe<ScalarsEnums["String"]>;
  token?: Maybe<ScalarsEnums["String"]>;
  updatedAt?: Maybe<ScalarsEnums["timestamptz"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface files_min_fields {
  __typename?: "files_min_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  path?: Maybe<ScalarsEnums["String"]>;
  token?: Maybe<ScalarsEnums["String"]>;
  updatedAt?: Maybe<ScalarsEnums["timestamptz"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "files"
 */
export interface files_mutation_response {
  __typename?: "files_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<files>;
}

/**
 * columns and relationships of "folders"
 */
export interface folders {
  __typename?: "folders";
  /**
   * An array relationship
   */
  contents: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<contents_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<contents_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<contents_bool_exp>;
  }) => Array<contents>;
  /**
   * An aggregated array relationship
   */
  contents_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<contents_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<contents_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<contents_bool_exp>;
  }) => contents_aggregate;
  /**
   * An object relationship
   */
  event?: Maybe<events>;
  eventId: ScalarsEnums["uuid"];
  /**
   * An array relationship
   */
  folders: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<folders_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<folders_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<folders_bool_exp>;
  }) => Array<folders>;
  /**
   * An aggregated array relationship
   */
  folders_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<folders_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<folders_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<folders_bool_exp>;
  }) => folders_aggregate;
  id: ScalarsEnums["uuid"];
  lockChildren: ScalarsEnums["Boolean"];
  lockContent: ScalarsEnums["Boolean"];
  mode: ScalarsEnums["String"];
  name: ScalarsEnums["String"];
  /**
   * An object relationship
   */
  parent?: Maybe<folders>;
  parentId?: Maybe<ScalarsEnums["uuid"]>;
  priority: ScalarsEnums["Int"];
  subtitle?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregated selection of "folders"
 */
export interface folders_aggregate {
  __typename?: "folders_aggregate";
  aggregate?: Maybe<folders_aggregate_fields>;
  nodes: Array<folders>;
}

/**
 * aggregate fields of "folders"
 */
export interface folders_aggregate_fields {
  __typename?: "folders_aggregate_fields";
  avg?: Maybe<folders_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<folders_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<folders_max_fields>;
  min?: Maybe<folders_min_fields>;
  stddev?: Maybe<folders_stddev_fields>;
  stddev_pop?: Maybe<folders_stddev_pop_fields>;
  stddev_samp?: Maybe<folders_stddev_samp_fields>;
  sum?: Maybe<folders_sum_fields>;
  var_pop?: Maybe<folders_var_pop_fields>;
  var_samp?: Maybe<folders_var_samp_fields>;
  variance?: Maybe<folders_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface folders_avg_fields {
  __typename?: "folders_avg_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface folders_max_fields {
  __typename?: "folders_max_fields";
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  mode?: Maybe<ScalarsEnums["String"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  parentId?: Maybe<ScalarsEnums["uuid"]>;
  priority?: Maybe<ScalarsEnums["Int"]>;
  subtitle?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface folders_min_fields {
  __typename?: "folders_min_fields";
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  mode?: Maybe<ScalarsEnums["String"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  parentId?: Maybe<ScalarsEnums["uuid"]>;
  priority?: Maybe<ScalarsEnums["Int"]>;
  subtitle?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "folders"
 */
export interface folders_mutation_response {
  __typename?: "folders_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<folders>;
}

/**
 * aggregate stddev on columns
 */
export interface folders_stddev_fields {
  __typename?: "folders_stddev_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface folders_stddev_pop_fields {
  __typename?: "folders_stddev_pop_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface folders_stddev_samp_fields {
  __typename?: "folders_stddev_samp_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface folders_sum_fields {
  __typename?: "folders_sum_fields";
  priority?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface folders_var_pop_fields {
  __typename?: "folders_var_pop_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface folders_var_samp_fields {
  __typename?: "folders_var_samp_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface folders_variance_fields {
  __typename?: "folders_variance_fields";
  priority?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "groups"
 */
export interface groups {
  __typename?: "groups";
  createdAt: ScalarsEnums["timestamptz"];
  /**
   * An object relationship
   */
  creator?: Maybe<users>;
  creatorId?: Maybe<ScalarsEnums["uuid"]>;
  /**
   * An array relationship
   */
  events: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<events_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<events_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<events_bool_exp>;
  }) => Array<events>;
  /**
   * An aggregated array relationship
   */
  events_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<events_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<events_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<events_bool_exp>;
  }) => events_aggregate;
  id: ScalarsEnums["uuid"];
  /**
   * An array relationship
   */
  memberships: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<memberships_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<memberships_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<memberships_bool_exp>;
  }) => Array<memberships>;
  /**
   * An aggregated array relationship
   */
  memberships_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<memberships_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<memberships_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<memberships_bool_exp>;
  }) => memberships_aggregate;
  name: ScalarsEnums["String"];
  public: ScalarsEnums["Boolean"];
  shortName?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregated selection of "groups"
 */
export interface groups_aggregate {
  __typename?: "groups_aggregate";
  aggregate?: Maybe<groups_aggregate_fields>;
  nodes: Array<groups>;
}

/**
 * aggregate fields of "groups"
 */
export interface groups_aggregate_fields {
  __typename?: "groups_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<groups_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<groups_max_fields>;
  min?: Maybe<groups_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface groups_max_fields {
  __typename?: "groups_max_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  creatorId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  shortName?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface groups_min_fields {
  __typename?: "groups_min_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  creatorId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  name?: Maybe<ScalarsEnums["String"]>;
  shortName?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "groups"
 */
export interface groups_mutation_response {
  __typename?: "groups_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<groups>;
}

/**
 * columns and relationships of "identities"
 */
export interface identities {
  __typename?: "identities";
  displayName: ScalarsEnums["String"];
  email: ScalarsEnums["String"];
  /**
   * An array relationship
   */
  memberships: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<memberships_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<memberships_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<memberships_bool_exp>;
  }) => Array<memberships>;
  /**
   * An aggregated array relationship
   */
  memberships_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<memberships_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<memberships_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<memberships_bool_exp>;
  }) => memberships_aggregate;
  /**
   * An object relationship
   */
  user?: Maybe<users>;
}

/**
 * aggregated selection of "identities"
 */
export interface identities_aggregate {
  __typename?: "identities_aggregate";
  aggregate?: Maybe<identities_aggregate_fields>;
  nodes: Array<identities>;
}

/**
 * aggregate fields of "identities"
 */
export interface identities_aggregate_fields {
  __typename?: "identities_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<identities_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<identities_max_fields>;
  min?: Maybe<identities_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface identities_max_fields {
  __typename?: "identities_max_fields";
  displayName?: Maybe<ScalarsEnums["String"]>;
  email?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface identities_min_fields {
  __typename?: "identities_min_fields";
  displayName?: Maybe<ScalarsEnums["String"]>;
  email?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "identities"
 */
export interface identities_mutation_response {
  __typename?: "identities_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<identities>;
}

/**
 * columns and relationships of "memberships"
 */
export interface memberships {
  __typename?: "memberships";
  email?: Maybe<ScalarsEnums["String"]>;
  /**
   * An object relationship
   */
  group?: Maybe<groups>;
  groupId: ScalarsEnums["uuid"];
  id: ScalarsEnums["uuid"];
  /**
   * An object relationship
   */
  identity?: Maybe<identities>;
  /**
   * An array relationship
   */
  roles: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<roles_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<roles_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<roles_bool_exp>;
  }) => Array<roles>;
  /**
   * An aggregated array relationship
   */
  roles_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<roles_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<roles_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<roles_bool_exp>;
  }) => roles_aggregate;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregated selection of "memberships"
 */
export interface memberships_aggregate {
  __typename?: "memberships_aggregate";
  aggregate?: Maybe<memberships_aggregate_fields>;
  nodes: Array<memberships>;
}

/**
 * aggregate fields of "memberships"
 */
export interface memberships_aggregate_fields {
  __typename?: "memberships_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<memberships_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<memberships_max_fields>;
  min?: Maybe<memberships_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface memberships_max_fields {
  __typename?: "memberships_max_fields";
  email?: Maybe<ScalarsEnums["String"]>;
  groupId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface memberships_min_fields {
  __typename?: "memberships_min_fields";
  email?: Maybe<ScalarsEnums["String"]>;
  groupId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "memberships"
 */
export interface memberships_mutation_response {
  __typename?: "memberships_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<memberships>;
}

/**
 * columns and relationships of "polls"
 */
export interface polls {
  __typename?: "polls";
  active: ScalarsEnums["Boolean"];
  /**
   * An object relationship
   */
  content?: Maybe<contents>;
  contentId: ScalarsEnums["uuid"];
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  hidden: ScalarsEnums["Boolean"];
  id: ScalarsEnums["uuid"];
  maxVote: ScalarsEnums["Int"];
  minVote: ScalarsEnums["Int"];
  options?: Maybe<ScalarsEnums["_text"]>;
  /**
   * An array relationship
   */
  votes: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<votes_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<votes_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<votes_bool_exp>;
  }) => Array<votes>;
  /**
   * An aggregated array relationship
   */
  votes_aggregate: (args?: {
    /**
     * distinct select on columns
     */
    distinct_on?: Maybe<Array<votes_select_column>>
    /**
     * limit the number of rows returned
     */;
    limit?: Maybe<Scalars["Int"]>
    /**
     * skip the first n rows. Use only with order_by
     */;
    offset?: Maybe<Scalars["Int"]>
    /**
     * sort the rows by one or more columns
     */;
    order_by?: Maybe<Array<votes_order_by>>
    /**
     * filter the rows returned
     */;
    where?: Maybe<votes_bool_exp>;
  }) => votes_aggregate;
}

/**
 * aggregated selection of "polls"
 */
export interface polls_aggregate {
  __typename?: "polls_aggregate";
  aggregate?: Maybe<polls_aggregate_fields>;
  nodes: Array<polls>;
}

/**
 * aggregate fields of "polls"
 */
export interface polls_aggregate_fields {
  __typename?: "polls_aggregate_fields";
  avg?: Maybe<polls_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<polls_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<polls_max_fields>;
  min?: Maybe<polls_min_fields>;
  stddev?: Maybe<polls_stddev_fields>;
  stddev_pop?: Maybe<polls_stddev_pop_fields>;
  stddev_samp?: Maybe<polls_stddev_samp_fields>;
  sum?: Maybe<polls_sum_fields>;
  var_pop?: Maybe<polls_var_pop_fields>;
  var_samp?: Maybe<polls_var_samp_fields>;
  variance?: Maybe<polls_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface polls_avg_fields {
  __typename?: "polls_avg_fields";
  maxVote?: Maybe<ScalarsEnums["Float"]>;
  minVote?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface polls_max_fields {
  __typename?: "polls_max_fields";
  contentId?: Maybe<ScalarsEnums["uuid"]>;
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  maxVote?: Maybe<ScalarsEnums["Int"]>;
  minVote?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate min on columns
 */
export interface polls_min_fields {
  __typename?: "polls_min_fields";
  contentId?: Maybe<ScalarsEnums["uuid"]>;
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  maxVote?: Maybe<ScalarsEnums["Int"]>;
  minVote?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * response of any mutation on the table "polls"
 */
export interface polls_mutation_response {
  __typename?: "polls_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<polls>;
}

/**
 * aggregate stddev on columns
 */
export interface polls_stddev_fields {
  __typename?: "polls_stddev_fields";
  maxVote?: Maybe<ScalarsEnums["Float"]>;
  minVote?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface polls_stddev_pop_fields {
  __typename?: "polls_stddev_pop_fields";
  maxVote?: Maybe<ScalarsEnums["Float"]>;
  minVote?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface polls_stddev_samp_fields {
  __typename?: "polls_stddev_samp_fields";
  maxVote?: Maybe<ScalarsEnums["Float"]>;
  minVote?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface polls_sum_fields {
  __typename?: "polls_sum_fields";
  maxVote?: Maybe<ScalarsEnums["Int"]>;
  minVote?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface polls_var_pop_fields {
  __typename?: "polls_var_pop_fields";
  maxVote?: Maybe<ScalarsEnums["Float"]>;
  minVote?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface polls_var_samp_fields {
  __typename?: "polls_var_samp_fields";
  maxVote?: Maybe<ScalarsEnums["Float"]>;
  minVote?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface polls_variance_fields {
  __typename?: "polls_variance_fields";
  maxVote?: Maybe<ScalarsEnums["Float"]>;
  minVote?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "roles"
 */
export interface roles {
  __typename?: "roles";
  id: ScalarsEnums["uuid"];
  /**
   * An object relationship
   */
  membership?: Maybe<memberships>;
  membershipId: ScalarsEnums["uuid"];
  role: ScalarsEnums["String"];
}

/**
 * aggregated selection of "roles"
 */
export interface roles_aggregate {
  __typename?: "roles_aggregate";
  aggregate?: Maybe<roles_aggregate_fields>;
  nodes: Array<roles>;
}

/**
 * aggregate fields of "roles"
 */
export interface roles_aggregate_fields {
  __typename?: "roles_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<roles_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<roles_max_fields>;
  min?: Maybe<roles_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface roles_max_fields {
  __typename?: "roles_max_fields";
  id?: Maybe<ScalarsEnums["uuid"]>;
  membershipId?: Maybe<ScalarsEnums["uuid"]>;
  role?: Maybe<ScalarsEnums["String"]>;
}

/**
 * aggregate min on columns
 */
export interface roles_min_fields {
  __typename?: "roles_min_fields";
  id?: Maybe<ScalarsEnums["uuid"]>;
  membershipId?: Maybe<ScalarsEnums["uuid"]>;
  role?: Maybe<ScalarsEnums["String"]>;
}

/**
 * response of any mutation on the table "roles"
 */
export interface roles_mutation_response {
  __typename?: "roles_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<roles>;
}

/**
 * columns and relationships of "speaks"
 */
export interface speaks {
  __typename?: "speaks";
  createdAt: ScalarsEnums["timestamptz"];
  eventId: ScalarsEnums["uuid"];
  id: ScalarsEnums["uuid"];
  type: ScalarsEnums["Int"];
  /**
   * An object relationship
   */
  user?: Maybe<users>;
  userId: ScalarsEnums["uuid"];
}

/**
 * aggregated selection of "speaks"
 */
export interface speaks_aggregate {
  __typename?: "speaks_aggregate";
  aggregate?: Maybe<speaks_aggregate_fields>;
  nodes: Array<speaks>;
}

/**
 * aggregate fields of "speaks"
 */
export interface speaks_aggregate_fields {
  __typename?: "speaks_aggregate_fields";
  avg?: Maybe<speaks_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<speaks_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<speaks_max_fields>;
  min?: Maybe<speaks_min_fields>;
  stddev?: Maybe<speaks_stddev_fields>;
  stddev_pop?: Maybe<speaks_stddev_pop_fields>;
  stddev_samp?: Maybe<speaks_stddev_samp_fields>;
  sum?: Maybe<speaks_sum_fields>;
  var_pop?: Maybe<speaks_var_pop_fields>;
  var_samp?: Maybe<speaks_var_samp_fields>;
  variance?: Maybe<speaks_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface speaks_avg_fields {
  __typename?: "speaks_avg_fields";
  type?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface speaks_max_fields {
  __typename?: "speaks_max_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  type?: Maybe<ScalarsEnums["Int"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface speaks_min_fields {
  __typename?: "speaks_min_fields";
  createdAt?: Maybe<ScalarsEnums["timestamptz"]>;
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  type?: Maybe<ScalarsEnums["Int"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "speaks"
 */
export interface speaks_mutation_response {
  __typename?: "speaks_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<speaks>;
}

/**
 * aggregate stddev on columns
 */
export interface speaks_stddev_fields {
  __typename?: "speaks_stddev_fields";
  type?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface speaks_stddev_pop_fields {
  __typename?: "speaks_stddev_pop_fields";
  type?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface speaks_stddev_samp_fields {
  __typename?: "speaks_stddev_samp_fields";
  type?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface speaks_sum_fields {
  __typename?: "speaks_sum_fields";
  type?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface speaks_var_pop_fields {
  __typename?: "speaks_var_pop_fields";
  type?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface speaks_var_samp_fields {
  __typename?: "speaks_var_samp_fields";
  type?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface speaks_variance_fields {
  __typename?: "speaks_variance_fields";
  type?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "timers"
 */
export interface timers {
  __typename?: "timers";
  /**
   * An object relationship
   */
  event?: Maybe<events>;
  eventId: ScalarsEnums["uuid"];
  id: ScalarsEnums["uuid"];
  time: ScalarsEnums["Int"];
  updatedAt: ScalarsEnums["timestamptz"];
}

/**
 * aggregated selection of "timers"
 */
export interface timers_aggregate {
  __typename?: "timers_aggregate";
  aggregate?: Maybe<timers_aggregate_fields>;
  nodes: Array<timers>;
}

/**
 * aggregate fields of "timers"
 */
export interface timers_aggregate_fields {
  __typename?: "timers_aggregate_fields";
  avg?: Maybe<timers_avg_fields>;
  count: (args?: {
    columns?: Maybe<Array<timers_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<timers_max_fields>;
  min?: Maybe<timers_min_fields>;
  stddev?: Maybe<timers_stddev_fields>;
  stddev_pop?: Maybe<timers_stddev_pop_fields>;
  stddev_samp?: Maybe<timers_stddev_samp_fields>;
  sum?: Maybe<timers_sum_fields>;
  var_pop?: Maybe<timers_var_pop_fields>;
  var_samp?: Maybe<timers_var_samp_fields>;
  variance?: Maybe<timers_variance_fields>;
}

/**
 * aggregate avg on columns
 */
export interface timers_avg_fields {
  __typename?: "timers_avg_fields";
  time?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate max on columns
 */
export interface timers_max_fields {
  __typename?: "timers_max_fields";
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  time?: Maybe<ScalarsEnums["Int"]>;
  updatedAt?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * aggregate min on columns
 */
export interface timers_min_fields {
  __typename?: "timers_min_fields";
  eventId?: Maybe<ScalarsEnums["uuid"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  time?: Maybe<ScalarsEnums["Int"]>;
  updatedAt?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * response of any mutation on the table "timers"
 */
export interface timers_mutation_response {
  __typename?: "timers_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<timers>;
}

/**
 * aggregate stddev on columns
 */
export interface timers_stddev_fields {
  __typename?: "timers_stddev_fields";
  time?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_pop on columns
 */
export interface timers_stddev_pop_fields {
  __typename?: "timers_stddev_pop_fields";
  time?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate stddev_samp on columns
 */
export interface timers_stddev_samp_fields {
  __typename?: "timers_stddev_samp_fields";
  time?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate sum on columns
 */
export interface timers_sum_fields {
  __typename?: "timers_sum_fields";
  time?: Maybe<ScalarsEnums["Int"]>;
}

/**
 * aggregate var_pop on columns
 */
export interface timers_var_pop_fields {
  __typename?: "timers_var_pop_fields";
  time?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate var_samp on columns
 */
export interface timers_var_samp_fields {
  __typename?: "timers_var_samp_fields";
  time?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * aggregate variance on columns
 */
export interface timers_variance_fields {
  __typename?: "timers_variance_fields";
  time?: Maybe<ScalarsEnums["Float"]>;
}

/**
 * columns and relationships of "users"
 */
export interface users {
  __typename?: "users";
  /**
   * An object relationship
   */
  account?: Maybe<auth_accounts>;
  avatar_url?: Maybe<ScalarsEnums["String"]>;
  created_at: ScalarsEnums["timestamptz"];
  display_name?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["uuid"];
  /**
   * An object relationship
   */
  identity?: Maybe<identities>;
  sysAdmin: ScalarsEnums["Boolean"];
  updated_at: ScalarsEnums["timestamptz"];
}

/**
 * aggregated selection of "users"
 */
export interface users_aggregate {
  __typename?: "users_aggregate";
  aggregate?: Maybe<users_aggregate_fields>;
  nodes: Array<users>;
}

/**
 * aggregate fields of "users"
 */
export interface users_aggregate_fields {
  __typename?: "users_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<users_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<users_max_fields>;
  min?: Maybe<users_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface users_max_fields {
  __typename?: "users_max_fields";
  avatar_url?: Maybe<ScalarsEnums["String"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  display_name?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  updated_at?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * aggregate min on columns
 */
export interface users_min_fields {
  __typename?: "users_min_fields";
  avatar_url?: Maybe<ScalarsEnums["String"]>;
  created_at?: Maybe<ScalarsEnums["timestamptz"]>;
  display_name?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["uuid"]>;
  updated_at?: Maybe<ScalarsEnums["timestamptz"]>;
}

/**
 * response of any mutation on the table "users"
 */
export interface users_mutation_response {
  __typename?: "users_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<users>;
}

/**
 * columns and relationships of "votes"
 */
export interface votes {
  __typename?: "votes";
  id: ScalarsEnums["uuid"];
  pollId: ScalarsEnums["uuid"];
  userId: ScalarsEnums["uuid"];
  value: ScalarsEnums["_int4"];
}

/**
 * aggregated selection of "votes"
 */
export interface votes_aggregate {
  __typename?: "votes_aggregate";
  aggregate?: Maybe<votes_aggregate_fields>;
  nodes: Array<votes>;
}

/**
 * aggregate fields of "votes"
 */
export interface votes_aggregate_fields {
  __typename?: "votes_aggregate_fields";
  count: (args?: {
    columns?: Maybe<Array<votes_select_column>>;
    distinct?: Maybe<Scalars["Boolean"]>;
  }) => Maybe<ScalarsEnums["Int"]>;
  max?: Maybe<votes_max_fields>;
  min?: Maybe<votes_min_fields>;
}

/**
 * aggregate max on columns
 */
export interface votes_max_fields {
  __typename?: "votes_max_fields";
  id?: Maybe<ScalarsEnums["uuid"]>;
  pollId?: Maybe<ScalarsEnums["uuid"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * aggregate min on columns
 */
export interface votes_min_fields {
  __typename?: "votes_min_fields";
  id?: Maybe<ScalarsEnums["uuid"]>;
  pollId?: Maybe<ScalarsEnums["uuid"]>;
  userId?: Maybe<ScalarsEnums["uuid"]>;
}

/**
 * response of any mutation on the table "votes"
 */
export interface votes_mutation_response {
  __typename?: "votes_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: ScalarsEnums["Int"];
  /**
   * data of the affected rows by the mutation
   */
  returning: Array<votes>;
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  CanVoteOutput: CanVoteOutput;
  VoteOutput: VoteOutput;
  admissions: admissions;
  admissions_aggregate: admissions_aggregate;
  admissions_aggregate_fields: admissions_aggregate_fields;
  admissions_max_fields: admissions_max_fields;
  admissions_min_fields: admissions_min_fields;
  admissions_mutation_response: admissions_mutation_response;
  auth_account_providers: auth_account_providers;
  auth_account_providers_aggregate: auth_account_providers_aggregate;
  auth_account_providers_aggregate_fields: auth_account_providers_aggregate_fields;
  auth_account_providers_max_fields: auth_account_providers_max_fields;
  auth_account_providers_min_fields: auth_account_providers_min_fields;
  auth_account_providers_mutation_response: auth_account_providers_mutation_response;
  auth_account_roles: auth_account_roles;
  auth_account_roles_aggregate: auth_account_roles_aggregate;
  auth_account_roles_aggregate_fields: auth_account_roles_aggregate_fields;
  auth_account_roles_max_fields: auth_account_roles_max_fields;
  auth_account_roles_min_fields: auth_account_roles_min_fields;
  auth_account_roles_mutation_response: auth_account_roles_mutation_response;
  auth_accounts: auth_accounts;
  auth_accounts_aggregate: auth_accounts_aggregate;
  auth_accounts_aggregate_fields: auth_accounts_aggregate_fields;
  auth_accounts_max_fields: auth_accounts_max_fields;
  auth_accounts_min_fields: auth_accounts_min_fields;
  auth_accounts_mutation_response: auth_accounts_mutation_response;
  auth_providers: auth_providers;
  auth_providers_aggregate: auth_providers_aggregate;
  auth_providers_aggregate_fields: auth_providers_aggregate_fields;
  auth_providers_max_fields: auth_providers_max_fields;
  auth_providers_min_fields: auth_providers_min_fields;
  auth_providers_mutation_response: auth_providers_mutation_response;
  auth_refresh_tokens: auth_refresh_tokens;
  auth_refresh_tokens_aggregate: auth_refresh_tokens_aggregate;
  auth_refresh_tokens_aggregate_fields: auth_refresh_tokens_aggregate_fields;
  auth_refresh_tokens_max_fields: auth_refresh_tokens_max_fields;
  auth_refresh_tokens_min_fields: auth_refresh_tokens_min_fields;
  auth_refresh_tokens_mutation_response: auth_refresh_tokens_mutation_response;
  auth_roles: auth_roles;
  auth_roles_aggregate: auth_roles_aggregate;
  auth_roles_aggregate_fields: auth_roles_aggregate_fields;
  auth_roles_max_fields: auth_roles_max_fields;
  auth_roles_min_fields: auth_roles_min_fields;
  auth_roles_mutation_response: auth_roles_mutation_response;
  authorships: authorships;
  authorships_aggregate: authorships_aggregate;
  authorships_aggregate_fields: authorships_aggregate_fields;
  authorships_max_fields: authorships_max_fields;
  authorships_min_fields: authorships_min_fields;
  authorships_mutation_response: authorships_mutation_response;
  contents: contents;
  contents_aggregate: contents_aggregate;
  contents_aggregate_fields: contents_aggregate_fields;
  contents_avg_fields: contents_avg_fields;
  contents_max_fields: contents_max_fields;
  contents_min_fields: contents_min_fields;
  contents_mutation_response: contents_mutation_response;
  contents_stddev_fields: contents_stddev_fields;
  contents_stddev_pop_fields: contents_stddev_pop_fields;
  contents_stddev_samp_fields: contents_stddev_samp_fields;
  contents_sum_fields: contents_sum_fields;
  contents_var_pop_fields: contents_var_pop_fields;
  contents_var_samp_fields: contents_var_samp_fields;
  contents_variance_fields: contents_variance_fields;
  events: events;
  events_aggregate: events_aggregate;
  events_aggregate_fields: events_aggregate_fields;
  events_max_fields: events_max_fields;
  events_min_fields: events_min_fields;
  events_mutation_response: events_mutation_response;
  files: files;
  files_aggregate: files_aggregate;
  files_aggregate_fields: files_aggregate_fields;
  files_max_fields: files_max_fields;
  files_min_fields: files_min_fields;
  files_mutation_response: files_mutation_response;
  folders: folders;
  folders_aggregate: folders_aggregate;
  folders_aggregate_fields: folders_aggregate_fields;
  folders_avg_fields: folders_avg_fields;
  folders_max_fields: folders_max_fields;
  folders_min_fields: folders_min_fields;
  folders_mutation_response: folders_mutation_response;
  folders_stddev_fields: folders_stddev_fields;
  folders_stddev_pop_fields: folders_stddev_pop_fields;
  folders_stddev_samp_fields: folders_stddev_samp_fields;
  folders_sum_fields: folders_sum_fields;
  folders_var_pop_fields: folders_var_pop_fields;
  folders_var_samp_fields: folders_var_samp_fields;
  folders_variance_fields: folders_variance_fields;
  groups: groups;
  groups_aggregate: groups_aggregate;
  groups_aggregate_fields: groups_aggregate_fields;
  groups_max_fields: groups_max_fields;
  groups_min_fields: groups_min_fields;
  groups_mutation_response: groups_mutation_response;
  identities: identities;
  identities_aggregate: identities_aggregate;
  identities_aggregate_fields: identities_aggregate_fields;
  identities_max_fields: identities_max_fields;
  identities_min_fields: identities_min_fields;
  identities_mutation_response: identities_mutation_response;
  memberships: memberships;
  memberships_aggregate: memberships_aggregate;
  memberships_aggregate_fields: memberships_aggregate_fields;
  memberships_max_fields: memberships_max_fields;
  memberships_min_fields: memberships_min_fields;
  memberships_mutation_response: memberships_mutation_response;
  polls: polls;
  polls_aggregate: polls_aggregate;
  polls_aggregate_fields: polls_aggregate_fields;
  polls_avg_fields: polls_avg_fields;
  polls_max_fields: polls_max_fields;
  polls_min_fields: polls_min_fields;
  polls_mutation_response: polls_mutation_response;
  polls_stddev_fields: polls_stddev_fields;
  polls_stddev_pop_fields: polls_stddev_pop_fields;
  polls_stddev_samp_fields: polls_stddev_samp_fields;
  polls_sum_fields: polls_sum_fields;
  polls_var_pop_fields: polls_var_pop_fields;
  polls_var_samp_fields: polls_var_samp_fields;
  polls_variance_fields: polls_variance_fields;
  roles: roles;
  roles_aggregate: roles_aggregate;
  roles_aggregate_fields: roles_aggregate_fields;
  roles_max_fields: roles_max_fields;
  roles_min_fields: roles_min_fields;
  roles_mutation_response: roles_mutation_response;
  speaks: speaks;
  speaks_aggregate: speaks_aggregate;
  speaks_aggregate_fields: speaks_aggregate_fields;
  speaks_avg_fields: speaks_avg_fields;
  speaks_max_fields: speaks_max_fields;
  speaks_min_fields: speaks_min_fields;
  speaks_mutation_response: speaks_mutation_response;
  speaks_stddev_fields: speaks_stddev_fields;
  speaks_stddev_pop_fields: speaks_stddev_pop_fields;
  speaks_stddev_samp_fields: speaks_stddev_samp_fields;
  speaks_sum_fields: speaks_sum_fields;
  speaks_var_pop_fields: speaks_var_pop_fields;
  speaks_var_samp_fields: speaks_var_samp_fields;
  speaks_variance_fields: speaks_variance_fields;
  timers: timers;
  timers_aggregate: timers_aggregate;
  timers_aggregate_fields: timers_aggregate_fields;
  timers_avg_fields: timers_avg_fields;
  timers_max_fields: timers_max_fields;
  timers_min_fields: timers_min_fields;
  timers_mutation_response: timers_mutation_response;
  timers_stddev_fields: timers_stddev_fields;
  timers_stddev_pop_fields: timers_stddev_pop_fields;
  timers_stddev_samp_fields: timers_stddev_samp_fields;
  timers_sum_fields: timers_sum_fields;
  timers_var_pop_fields: timers_var_pop_fields;
  timers_var_samp_fields: timers_var_samp_fields;
  timers_variance_fields: timers_variance_fields;
  users: users;
  users_aggregate: users_aggregate;
  users_aggregate_fields: users_aggregate_fields;
  users_max_fields: users_max_fields;
  users_min_fields: users_min_fields;
  users_mutation_response: users_mutation_response;
  votes: votes;
  votes_aggregate: votes_aggregate;
  votes_aggregate_fields: votes_aggregate_fields;
  votes_max_fields: votes_max_fields;
  votes_min_fields: votes_min_fields;
  votes_mutation_response: votes_mutation_response;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "CanVoteOutput"
  | "VoteOutput"
  | "admissions"
  | "admissions_aggregate"
  | "admissions_aggregate_fields"
  | "admissions_max_fields"
  | "admissions_min_fields"
  | "admissions_mutation_response"
  | "auth_account_providers"
  | "auth_account_providers_aggregate"
  | "auth_account_providers_aggregate_fields"
  | "auth_account_providers_max_fields"
  | "auth_account_providers_min_fields"
  | "auth_account_providers_mutation_response"
  | "auth_account_roles"
  | "auth_account_roles_aggregate"
  | "auth_account_roles_aggregate_fields"
  | "auth_account_roles_max_fields"
  | "auth_account_roles_min_fields"
  | "auth_account_roles_mutation_response"
  | "auth_accounts"
  | "auth_accounts_aggregate"
  | "auth_accounts_aggregate_fields"
  | "auth_accounts_max_fields"
  | "auth_accounts_min_fields"
  | "auth_accounts_mutation_response"
  | "auth_providers"
  | "auth_providers_aggregate"
  | "auth_providers_aggregate_fields"
  | "auth_providers_max_fields"
  | "auth_providers_min_fields"
  | "auth_providers_mutation_response"
  | "auth_refresh_tokens"
  | "auth_refresh_tokens_aggregate"
  | "auth_refresh_tokens_aggregate_fields"
  | "auth_refresh_tokens_max_fields"
  | "auth_refresh_tokens_min_fields"
  | "auth_refresh_tokens_mutation_response"
  | "auth_roles"
  | "auth_roles_aggregate"
  | "auth_roles_aggregate_fields"
  | "auth_roles_max_fields"
  | "auth_roles_min_fields"
  | "auth_roles_mutation_response"
  | "authorships"
  | "authorships_aggregate"
  | "authorships_aggregate_fields"
  | "authorships_max_fields"
  | "authorships_min_fields"
  | "authorships_mutation_response"
  | "contents"
  | "contents_aggregate"
  | "contents_aggregate_fields"
  | "contents_avg_fields"
  | "contents_max_fields"
  | "contents_min_fields"
  | "contents_mutation_response"
  | "contents_stddev_fields"
  | "contents_stddev_pop_fields"
  | "contents_stddev_samp_fields"
  | "contents_sum_fields"
  | "contents_var_pop_fields"
  | "contents_var_samp_fields"
  | "contents_variance_fields"
  | "events"
  | "events_aggregate"
  | "events_aggregate_fields"
  | "events_max_fields"
  | "events_min_fields"
  | "events_mutation_response"
  | "files"
  | "files_aggregate"
  | "files_aggregate_fields"
  | "files_max_fields"
  | "files_min_fields"
  | "files_mutation_response"
  | "folders"
  | "folders_aggregate"
  | "folders_aggregate_fields"
  | "folders_avg_fields"
  | "folders_max_fields"
  | "folders_min_fields"
  | "folders_mutation_response"
  | "folders_stddev_fields"
  | "folders_stddev_pop_fields"
  | "folders_stddev_samp_fields"
  | "folders_sum_fields"
  | "folders_var_pop_fields"
  | "folders_var_samp_fields"
  | "folders_variance_fields"
  | "groups"
  | "groups_aggregate"
  | "groups_aggregate_fields"
  | "groups_max_fields"
  | "groups_min_fields"
  | "groups_mutation_response"
  | "identities"
  | "identities_aggregate"
  | "identities_aggregate_fields"
  | "identities_max_fields"
  | "identities_min_fields"
  | "identities_mutation_response"
  | "memberships"
  | "memberships_aggregate"
  | "memberships_aggregate_fields"
  | "memberships_max_fields"
  | "memberships_min_fields"
  | "memberships_mutation_response"
  | "polls"
  | "polls_aggregate"
  | "polls_aggregate_fields"
  | "polls_avg_fields"
  | "polls_max_fields"
  | "polls_min_fields"
  | "polls_mutation_response"
  | "polls_stddev_fields"
  | "polls_stddev_pop_fields"
  | "polls_stddev_samp_fields"
  | "polls_sum_fields"
  | "polls_var_pop_fields"
  | "polls_var_samp_fields"
  | "polls_variance_fields"
  | "roles"
  | "roles_aggregate"
  | "roles_aggregate_fields"
  | "roles_max_fields"
  | "roles_min_fields"
  | "roles_mutation_response"
  | "speaks"
  | "speaks_aggregate"
  | "speaks_aggregate_fields"
  | "speaks_avg_fields"
  | "speaks_max_fields"
  | "speaks_min_fields"
  | "speaks_mutation_response"
  | "speaks_stddev_fields"
  | "speaks_stddev_pop_fields"
  | "speaks_stddev_samp_fields"
  | "speaks_sum_fields"
  | "speaks_var_pop_fields"
  | "speaks_var_samp_fields"
  | "speaks_variance_fields"
  | "timers"
  | "timers_aggregate"
  | "timers_aggregate_fields"
  | "timers_avg_fields"
  | "timers_max_fields"
  | "timers_min_fields"
  | "timers_mutation_response"
  | "timers_stddev_fields"
  | "timers_stddev_pop_fields"
  | "timers_stddev_samp_fields"
  | "timers_sum_fields"
  | "timers_var_pop_fields"
  | "timers_var_samp_fields"
  | "timers_variance_fields"
  | "users"
  | "users_aggregate"
  | "users_aggregate_fields"
  | "users_max_fields"
  | "users_min_fields"
  | "users_mutation_response"
  | "votes"
  | "votes_aggregate"
  | "votes_aggregate_fields"
  | "votes_max_fields"
  | "votes_min_fields"
  | "votes_mutation_response";

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {
  admissions_constraint: admissions_constraint | undefined;
  admissions_select_column: admissions_select_column | undefined;
  admissions_update_column: admissions_update_column | undefined;
  auth_account_providers_constraint:
    | auth_account_providers_constraint
    | undefined;
  auth_account_providers_select_column:
    | auth_account_providers_select_column
    | undefined;
  auth_account_providers_update_column:
    | auth_account_providers_update_column
    | undefined;
  auth_account_roles_constraint: auth_account_roles_constraint | undefined;
  auth_account_roles_select_column:
    | auth_account_roles_select_column
    | undefined;
  auth_account_roles_update_column:
    | auth_account_roles_update_column
    | undefined;
  auth_accounts_constraint: auth_accounts_constraint | undefined;
  auth_accounts_select_column: auth_accounts_select_column | undefined;
  auth_accounts_update_column: auth_accounts_update_column | undefined;
  auth_providers_constraint: auth_providers_constraint | undefined;
  auth_providers_select_column: auth_providers_select_column | undefined;
  auth_providers_update_column: auth_providers_update_column | undefined;
  auth_refresh_tokens_constraint: auth_refresh_tokens_constraint | undefined;
  auth_refresh_tokens_select_column:
    | auth_refresh_tokens_select_column
    | undefined;
  auth_refresh_tokens_update_column:
    | auth_refresh_tokens_update_column
    | undefined;
  auth_roles_constraint: auth_roles_constraint | undefined;
  auth_roles_select_column: auth_roles_select_column | undefined;
  auth_roles_update_column: auth_roles_update_column | undefined;
  authorships_constraint: authorships_constraint | undefined;
  authorships_select_column: authorships_select_column | undefined;
  authorships_update_column: authorships_update_column | undefined;
  contents_constraint: contents_constraint | undefined;
  contents_select_column: contents_select_column | undefined;
  contents_update_column: contents_update_column | undefined;
  events_constraint: events_constraint | undefined;
  events_select_column: events_select_column | undefined;
  events_update_column: events_update_column | undefined;
  files_constraint: files_constraint | undefined;
  files_select_column: files_select_column | undefined;
  files_update_column: files_update_column | undefined;
  folders_constraint: folders_constraint | undefined;
  folders_select_column: folders_select_column | undefined;
  folders_update_column: folders_update_column | undefined;
  groups_constraint: groups_constraint | undefined;
  groups_select_column: groups_select_column | undefined;
  groups_update_column: groups_update_column | undefined;
  identities_constraint: identities_constraint | undefined;
  identities_select_column: identities_select_column | undefined;
  identities_update_column: identities_update_column | undefined;
  memberships_constraint: memberships_constraint | undefined;
  memberships_select_column: memberships_select_column | undefined;
  memberships_update_column: memberships_update_column | undefined;
  order_by: order_by | undefined;
  polls_constraint: polls_constraint | undefined;
  polls_select_column: polls_select_column | undefined;
  polls_update_column: polls_update_column | undefined;
  roles_constraint: roles_constraint | undefined;
  roles_select_column: roles_select_column | undefined;
  roles_update_column: roles_update_column | undefined;
  speaks_constraint: speaks_constraint | undefined;
  speaks_select_column: speaks_select_column | undefined;
  speaks_update_column: speaks_update_column | undefined;
  timers_constraint: timers_constraint | undefined;
  timers_select_column: timers_select_column | undefined;
  timers_update_column: timers_update_column | undefined;
  users_constraint: users_constraint | undefined;
  users_select_column: users_select_column | undefined;
  users_update_column: users_update_column | undefined;
  votes_constraint: votes_constraint | undefined;
  votes_select_column: votes_select_column | undefined;
  votes_update_column: votes_update_column | undefined;
}
