// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { AzuranceTypes } from './sources/azurance/types';
import * as importedModule$0 from "./sources/azurance/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type InsurancePool = {
  id: Scalars['ID'];
  multiplier: Scalars['BigInt'];
  multiplierDecimals: Scalars['BigInt'];
  maturityTimestamp: Scalars['BigInt'];
  staleTimestamp: Scalars['BigInt'];
  underlyingToken: Token;
  fee: Scalars['BigInt'];
  feeDecimals: Scalars['BigInt'];
  feeTo: Scalars['Bytes'];
  condition: Scalars['Bytes'];
  buyerToken: Token;
  sellerToken: Token;
  status: Scalars['Int'];
  buyerShares: Scalars['BigInt'];
  sellerShares: Scalars['BigInt'];
  totalShares: Scalars['BigInt'];
  buyerValue: Scalars['BigInt'];
  sellerValue: Scalars['BigInt'];
  totalValue: Scalars['BigInt'];
  createdAt: Scalars['BigInt'];
};

export type InsurancePool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  multiplier?: InputMaybe<Scalars['BigInt']>;
  multiplier_not?: InputMaybe<Scalars['BigInt']>;
  multiplier_gt?: InputMaybe<Scalars['BigInt']>;
  multiplier_lt?: InputMaybe<Scalars['BigInt']>;
  multiplier_gte?: InputMaybe<Scalars['BigInt']>;
  multiplier_lte?: InputMaybe<Scalars['BigInt']>;
  multiplier_in?: InputMaybe<Array<Scalars['BigInt']>>;
  multiplier_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  multiplierDecimals?: InputMaybe<Scalars['BigInt']>;
  multiplierDecimals_not?: InputMaybe<Scalars['BigInt']>;
  multiplierDecimals_gt?: InputMaybe<Scalars['BigInt']>;
  multiplierDecimals_lt?: InputMaybe<Scalars['BigInt']>;
  multiplierDecimals_gte?: InputMaybe<Scalars['BigInt']>;
  multiplierDecimals_lte?: InputMaybe<Scalars['BigInt']>;
  multiplierDecimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  multiplierDecimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maturityTimestamp?: InputMaybe<Scalars['BigInt']>;
  maturityTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  maturityTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  maturityTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  maturityTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  maturityTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  maturityTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maturityTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  staleTimestamp?: InputMaybe<Scalars['BigInt']>;
  staleTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  staleTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  staleTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  staleTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  staleTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  staleTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  staleTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  underlyingToken?: InputMaybe<Scalars['String']>;
  underlyingToken_not?: InputMaybe<Scalars['String']>;
  underlyingToken_gt?: InputMaybe<Scalars['String']>;
  underlyingToken_lt?: InputMaybe<Scalars['String']>;
  underlyingToken_gte?: InputMaybe<Scalars['String']>;
  underlyingToken_lte?: InputMaybe<Scalars['String']>;
  underlyingToken_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlyingToken_contains?: InputMaybe<Scalars['String']>;
  underlyingToken_contains_nocase?: InputMaybe<Scalars['String']>;
  underlyingToken_not_contains?: InputMaybe<Scalars['String']>;
  underlyingToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  underlyingToken_starts_with?: InputMaybe<Scalars['String']>;
  underlyingToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  underlyingToken_not_starts_with?: InputMaybe<Scalars['String']>;
  underlyingToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  underlyingToken_ends_with?: InputMaybe<Scalars['String']>;
  underlyingToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  underlyingToken_not_ends_with?: InputMaybe<Scalars['String']>;
  underlyingToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  underlyingToken_?: InputMaybe<Token_filter>;
  fee?: InputMaybe<Scalars['BigInt']>;
  fee_not?: InputMaybe<Scalars['BigInt']>;
  fee_gt?: InputMaybe<Scalars['BigInt']>;
  fee_lt?: InputMaybe<Scalars['BigInt']>;
  fee_gte?: InputMaybe<Scalars['BigInt']>;
  fee_lte?: InputMaybe<Scalars['BigInt']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeDecimals?: InputMaybe<Scalars['BigInt']>;
  feeDecimals_not?: InputMaybe<Scalars['BigInt']>;
  feeDecimals_gt?: InputMaybe<Scalars['BigInt']>;
  feeDecimals_lt?: InputMaybe<Scalars['BigInt']>;
  feeDecimals_gte?: InputMaybe<Scalars['BigInt']>;
  feeDecimals_lte?: InputMaybe<Scalars['BigInt']>;
  feeDecimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeDecimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeTo?: InputMaybe<Scalars['Bytes']>;
  feeTo_not?: InputMaybe<Scalars['Bytes']>;
  feeTo_gt?: InputMaybe<Scalars['Bytes']>;
  feeTo_lt?: InputMaybe<Scalars['Bytes']>;
  feeTo_gte?: InputMaybe<Scalars['Bytes']>;
  feeTo_lte?: InputMaybe<Scalars['Bytes']>;
  feeTo_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  feeTo_contains?: InputMaybe<Scalars['Bytes']>;
  feeTo_not_contains?: InputMaybe<Scalars['Bytes']>;
  condition?: InputMaybe<Scalars['Bytes']>;
  condition_not?: InputMaybe<Scalars['Bytes']>;
  condition_gt?: InputMaybe<Scalars['Bytes']>;
  condition_lt?: InputMaybe<Scalars['Bytes']>;
  condition_gte?: InputMaybe<Scalars['Bytes']>;
  condition_lte?: InputMaybe<Scalars['Bytes']>;
  condition_in?: InputMaybe<Array<Scalars['Bytes']>>;
  condition_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  condition_contains?: InputMaybe<Scalars['Bytes']>;
  condition_not_contains?: InputMaybe<Scalars['Bytes']>;
  buyerToken?: InputMaybe<Scalars['String']>;
  buyerToken_not?: InputMaybe<Scalars['String']>;
  buyerToken_gt?: InputMaybe<Scalars['String']>;
  buyerToken_lt?: InputMaybe<Scalars['String']>;
  buyerToken_gte?: InputMaybe<Scalars['String']>;
  buyerToken_lte?: InputMaybe<Scalars['String']>;
  buyerToken_in?: InputMaybe<Array<Scalars['String']>>;
  buyerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyerToken_contains?: InputMaybe<Scalars['String']>;
  buyerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_not_contains?: InputMaybe<Scalars['String']>;
  buyerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_starts_with?: InputMaybe<Scalars['String']>;
  buyerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  buyerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_ends_with?: InputMaybe<Scalars['String']>;
  buyerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  buyerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyerToken_?: InputMaybe<Token_filter>;
  sellerToken?: InputMaybe<Scalars['String']>;
  sellerToken_not?: InputMaybe<Scalars['String']>;
  sellerToken_gt?: InputMaybe<Scalars['String']>;
  sellerToken_lt?: InputMaybe<Scalars['String']>;
  sellerToken_gte?: InputMaybe<Scalars['String']>;
  sellerToken_lte?: InputMaybe<Scalars['String']>;
  sellerToken_in?: InputMaybe<Array<Scalars['String']>>;
  sellerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  sellerToken_contains?: InputMaybe<Scalars['String']>;
  sellerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  sellerToken_not_contains?: InputMaybe<Scalars['String']>;
  sellerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sellerToken_starts_with?: InputMaybe<Scalars['String']>;
  sellerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sellerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  sellerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sellerToken_ends_with?: InputMaybe<Scalars['String']>;
  sellerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sellerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  sellerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sellerToken_?: InputMaybe<Token_filter>;
  status?: InputMaybe<Scalars['Int']>;
  status_not?: InputMaybe<Scalars['Int']>;
  status_gt?: InputMaybe<Scalars['Int']>;
  status_lt?: InputMaybe<Scalars['Int']>;
  status_gte?: InputMaybe<Scalars['Int']>;
  status_lte?: InputMaybe<Scalars['Int']>;
  status_in?: InputMaybe<Array<Scalars['Int']>>;
  status_not_in?: InputMaybe<Array<Scalars['Int']>>;
  buyerShares?: InputMaybe<Scalars['BigInt']>;
  buyerShares_not?: InputMaybe<Scalars['BigInt']>;
  buyerShares_gt?: InputMaybe<Scalars['BigInt']>;
  buyerShares_lt?: InputMaybe<Scalars['BigInt']>;
  buyerShares_gte?: InputMaybe<Scalars['BigInt']>;
  buyerShares_lte?: InputMaybe<Scalars['BigInt']>;
  buyerShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyerShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellerShares?: InputMaybe<Scalars['BigInt']>;
  sellerShares_not?: InputMaybe<Scalars['BigInt']>;
  sellerShares_gt?: InputMaybe<Scalars['BigInt']>;
  sellerShares_lt?: InputMaybe<Scalars['BigInt']>;
  sellerShares_gte?: InputMaybe<Scalars['BigInt']>;
  sellerShares_lte?: InputMaybe<Scalars['BigInt']>;
  sellerShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellerShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares?: InputMaybe<Scalars['BigInt']>;
  totalShares_not?: InputMaybe<Scalars['BigInt']>;
  totalShares_gt?: InputMaybe<Scalars['BigInt']>;
  totalShares_lt?: InputMaybe<Scalars['BigInt']>;
  totalShares_gte?: InputMaybe<Scalars['BigInt']>;
  totalShares_lte?: InputMaybe<Scalars['BigInt']>;
  totalShares_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyerValue?: InputMaybe<Scalars['BigInt']>;
  buyerValue_not?: InputMaybe<Scalars['BigInt']>;
  buyerValue_gt?: InputMaybe<Scalars['BigInt']>;
  buyerValue_lt?: InputMaybe<Scalars['BigInt']>;
  buyerValue_gte?: InputMaybe<Scalars['BigInt']>;
  buyerValue_lte?: InputMaybe<Scalars['BigInt']>;
  buyerValue_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyerValue_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellerValue?: InputMaybe<Scalars['BigInt']>;
  sellerValue_not?: InputMaybe<Scalars['BigInt']>;
  sellerValue_gt?: InputMaybe<Scalars['BigInt']>;
  sellerValue_lt?: InputMaybe<Scalars['BigInt']>;
  sellerValue_gte?: InputMaybe<Scalars['BigInt']>;
  sellerValue_lte?: InputMaybe<Scalars['BigInt']>;
  sellerValue_in?: InputMaybe<Array<Scalars['BigInt']>>;
  sellerValue_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalValue?: InputMaybe<Scalars['BigInt']>;
  totalValue_not?: InputMaybe<Scalars['BigInt']>;
  totalValue_gt?: InputMaybe<Scalars['BigInt']>;
  totalValue_lt?: InputMaybe<Scalars['BigInt']>;
  totalValue_gte?: InputMaybe<Scalars['BigInt']>;
  totalValue_lte?: InputMaybe<Scalars['BigInt']>;
  totalValue_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalValue_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<InsurancePool_filter>>>;
  or?: InputMaybe<Array<InputMaybe<InsurancePool_filter>>>;
};

export type InsurancePool_orderBy =
  | 'id'
  | 'multiplier'
  | 'multiplierDecimals'
  | 'maturityTimestamp'
  | 'staleTimestamp'
  | 'underlyingToken'
  | 'underlyingToken__id'
  | 'underlyingToken__name'
  | 'underlyingToken__symbol'
  | 'underlyingToken__decimals'
  | 'fee'
  | 'feeDecimals'
  | 'feeTo'
  | 'condition'
  | 'buyerToken'
  | 'buyerToken__id'
  | 'buyerToken__name'
  | 'buyerToken__symbol'
  | 'buyerToken__decimals'
  | 'sellerToken'
  | 'sellerToken__id'
  | 'sellerToken__name'
  | 'sellerToken__symbol'
  | 'sellerToken__decimals'
  | 'status'
  | 'buyerShares'
  | 'sellerShares'
  | 'totalShares'
  | 'buyerValue'
  | 'sellerValue'
  | 'totalValue'
  | 'createdAt';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  insurancePool?: Maybe<InsurancePool>;
  insurancePools: Array<InsurancePool>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryinsurancePoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinsurancePoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InsurancePool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<InsurancePool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  insurancePool?: Maybe<InsurancePool>;
  insurancePools: Array<InsurancePool>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptioninsurancePoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninsurancePoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InsurancePool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<InsurancePool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Token = {
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  decimals: Scalars['Int'];
};

export type Token_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  decimals?: InputMaybe<Scalars['Int']>;
  decimals_not?: InputMaybe<Scalars['Int']>;
  decimals_gt?: InputMaybe<Scalars['Int']>;
  decimals_lt?: InputMaybe<Scalars['Int']>;
  decimals_gte?: InputMaybe<Scalars['Int']>;
  decimals_lte?: InputMaybe<Scalars['Int']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
};

export type Token_orderBy =
  | 'id'
  | 'name'
  | 'symbol'
  | 'decimals';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InsurancePool: ResolverTypeWrapper<InsurancePool>;
  InsurancePool_filter: InsurancePool_filter;
  InsurancePool_orderBy: InsurancePool_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  InsurancePool: InsurancePool;
  InsurancePool_filter: InsurancePool_filter;
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Token: Token;
  Token_filter: Token_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type InsurancePoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['InsurancePool'] = ResolversParentTypes['InsurancePool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  multiplier?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  multiplierDecimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  maturityTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  staleTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  underlyingToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeDecimals?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeTo?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  condition?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  buyerToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  sellerToken?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  buyerShares?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sellerShares?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalShares?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  buyerValue?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  sellerValue?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalValue?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  insurancePool?: Resolver<Maybe<ResolversTypes['InsurancePool']>, ParentType, ContextType, RequireFields<QueryinsurancePoolArgs, 'id' | 'subgraphError'>>;
  insurancePools?: Resolver<Array<ResolversTypes['InsurancePool']>, ParentType, ContextType, RequireFields<QueryinsurancePoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  insurancePool?: SubscriptionResolver<Maybe<ResolversTypes['InsurancePool']>, "insurancePool", ParentType, ContextType, RequireFields<SubscriptioninsurancePoolArgs, 'id' | 'subgraphError'>>;
  insurancePools?: SubscriptionResolver<Array<ResolversTypes['InsurancePool']>, "insurancePools", ParentType, ContextType, RequireFields<SubscriptioninsurancePoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  decimals?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  InsurancePool?: InsurancePoolResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = AzuranceTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/azurance/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const azuranceTransforms = [];
const additionalTypeDefs = [] as any[];
const azuranceHandler = new GraphqlHandler({
              name: "azurance",
              config: {"endpoint":"https://api.studio.thegraph.com/query/67556/azurance/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("azurance"),
              logger: logger.child("azurance"),
              importFn,
            });
sources[0] = {
          name: 'azurance',
          handler: azuranceHandler,
          transforms: azuranceTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: ActiveInsuranceDocument,
        get rawSDL() {
          return printWithCache(ActiveInsuranceDocument);
        },
        location: 'ActiveInsuranceDocument.graphql'
      },{
        document: InactiveInsuranceDocument,
        get rawSDL() {
          return printWithCache(InactiveInsuranceDocument);
        },
        location: 'InactiveInsuranceDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type ActiveInsuranceQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type ActiveInsuranceQuery = { insurancePools: Array<(
    Pick<InsurancePool, 'id' | 'status' | 'condition' | 'fee' | 'feeDecimals' | 'feeTo' | 'maturityTimestamp' | 'staleTimestamp' | 'multiplier' | 'multiplierDecimals' | 'buyerValue' | 'sellerValue' | 'totalValue' | 'buyerShares' | 'sellerShares' | 'totalShares' | 'createdAt'>
    & { underlyingToken: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, buyerToken: Pick<Token, 'id' | 'name' | 'symbol'>, sellerToken: Pick<Token, 'id' | 'name' | 'symbol'> }
  )> };

export type InactiveInsuranceQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type InactiveInsuranceQuery = { insurancePools: Array<(
    Pick<InsurancePool, 'id' | 'status' | 'condition' | 'fee' | 'feeDecimals' | 'feeTo' | 'maturityTimestamp' | 'staleTimestamp' | 'multiplier' | 'multiplierDecimals' | 'buyerValue' | 'sellerValue' | 'totalValue' | 'buyerShares' | 'sellerShares' | 'totalShares' | 'createdAt'>
    & { underlyingToken: Pick<Token, 'id' | 'name' | 'symbol' | 'decimals'>, buyerToken: Pick<Token, 'id' | 'name' | 'symbol'>, sellerToken: Pick<Token, 'id' | 'name' | 'symbol'> }
  )> };


export const ActiveInsuranceDocument = gql`
    query ActiveInsurance($first: Int = 100, $skip: Int = 0) {
  insurancePools(
    first: $first
    skip: $skip
    orderBy: createdAt
    orderDirection: desc
    where: {status: 0}
  ) {
    id
    status
    condition
    fee
    feeDecimals
    feeTo
    maturityTimestamp
    staleTimestamp
    multiplier
    multiplierDecimals
    buyerValue
    sellerValue
    totalValue
    buyerShares
    sellerShares
    totalShares
    underlyingToken {
      id
      name
      symbol
      decimals
    }
    buyerToken {
      id
      name
      symbol
    }
    sellerToken {
      id
      name
      symbol
    }
    createdAt
  }
}
    ` as unknown as DocumentNode<ActiveInsuranceQuery, ActiveInsuranceQueryVariables>;
export const InactiveInsuranceDocument = gql`
    query InactiveInsurance($first: Int = 100, $skip: Int = 0) {
  insurancePools(
    first: $first
    skip: $skip
    orderBy: createdAt
    orderDirection: desc
    where: {status_not: 0}
  ) {
    id
    status
    condition
    fee
    feeDecimals
    feeTo
    maturityTimestamp
    staleTimestamp
    multiplier
    multiplierDecimals
    buyerValue
    sellerValue
    totalValue
    buyerShares
    sellerShares
    totalShares
    underlyingToken {
      id
      name
      symbol
      decimals
    }
    buyerToken {
      id
      name
      symbol
    }
    sellerToken {
      id
      name
      symbol
    }
    createdAt
  }
}
    ` as unknown as DocumentNode<InactiveInsuranceQuery, InactiveInsuranceQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    ActiveInsurance(variables?: ActiveInsuranceQueryVariables, options?: C): Promise<ActiveInsuranceQuery> {
      return requester<ActiveInsuranceQuery, ActiveInsuranceQueryVariables>(ActiveInsuranceDocument, variables, options) as Promise<ActiveInsuranceQuery>;
    },
    InactiveInsurance(variables?: InactiveInsuranceQueryVariables, options?: C): Promise<InactiveInsuranceQuery> {
      return requester<InactiveInsuranceQuery, InactiveInsuranceQueryVariables>(InactiveInsuranceDocument, variables, options) as Promise<InactiveInsuranceQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;