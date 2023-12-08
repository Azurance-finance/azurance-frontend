import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Comment = {
  __typename?: "Comment";
  _id: Scalars["ID"]["output"];
  like?: Maybe<Array<Maybe<Profile>>>;
  likeId?: Maybe<Array<Maybe<Scalars["ID"]["output"]>>>;
  message: Scalars["String"]["output"];
  owner?: Maybe<Profile>;
  ownerId: Scalars["ID"]["output"];
  postId: Scalars["ID"]["output"];
};

export type CreateCommentInput = {
  message: Scalars["String"]["input"];
  ownerId: Scalars["ID"]["input"];
  postId: Scalars["ID"]["input"];
};

export type CreatePostInput = {
  chainId: Scalars["String"]["input"];
  ipfsHash: Scalars["String"]["input"];
  ownerId: Scalars["ID"]["input"];
};

export type CreateProfileInput = {
  avatar?: InputMaybe<Scalars["String"]["input"]>;
  bio?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  walletAddress: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createComment?: Maybe<Comment>;
  createPost?: Maybe<Post>;
  createProfile?: Maybe<Profile>;
  deleteComment?: Maybe<Comment>;
  likeComment?: Maybe<Comment>;
  likePost?: Maybe<Post>;
  unLikeComment?: Maybe<Comment>;
  unLikePost?: Maybe<Post>;
  updateComment?: Maybe<Comment>;
  updateProfile?: Maybe<Profile>;
};

export type MutationCreateCommentArgs = {
  comment: CreateCommentInput;
};

export type MutationCreatePostArgs = {
  post?: InputMaybe<CreatePostInput>;
};

export type MutationCreateProfileArgs = {
  profile: CreateProfileInput;
};

export type MutationDeleteCommentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationLikeCommentArgs = {
  commentId: Scalars["ID"]["input"];
  ownerId: Scalars["ID"]["input"];
};

export type MutationLikePostArgs = {
  ownerId: Scalars["ID"]["input"];
  postId: Scalars["ID"]["input"];
};

export type MutationUnLikeCommentArgs = {
  commentId: Scalars["ID"]["input"];
  ownerId: Scalars["ID"]["input"];
};

export type MutationUnLikePostArgs = {
  ownerId: Scalars["ID"]["input"];
  postId: Scalars["ID"]["input"];
};

export type MutationUpdateCommentArgs = {
  comment: UpdateCommentInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateProfileArgs = {
  id: Scalars["ID"]["input"];
  profile: UpdateProfileInput;
};

export type Post = {
  __typename?: "Post";
  _id: Scalars["ID"]["output"];
  chainId: Scalars["String"]["output"];
  comment?: Maybe<Array<Maybe<Comment>>>;
  ipfsHash: Scalars["String"]["output"];
  like?: Maybe<Array<Maybe<Profile>>>;
  likeId?: Maybe<Array<Maybe<Scalars["ID"]["output"]>>>;
  owner?: Maybe<Profile>;
  ownerId: Scalars["ID"]["output"];
};

export type Profile = {
  __typename?: "Profile";
  _id: Scalars["ID"]["output"];
  avatar?: Maybe<Scalars["String"]["output"]>;
  bio?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  post?: Maybe<Array<Maybe<Post>>>;
  walletAddress: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  hello?: Maybe<Scalars["String"]["output"]>;
  posts?: Maybe<Array<Maybe<Post>>>;
  profile?: Maybe<Profile>;
  profiles?: Maybe<Array<Maybe<Profile>>>;
};

export type QueryProfileArgs = {
  walletAddress: Scalars["String"]["input"];
};

export type UpdateCommentInput = {
  message: Scalars["String"]["input"];
};

export type UpdatePostInput = {
  ipfsHash: Scalars["String"]["input"];
};

export type UpdateProfileInput = {
  avatar?: InputMaybe<Scalars["String"]["input"]>;
  bio?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Comment: ResolverTypeWrapper<Comment>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateProfileInput: CreateProfileInput;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateProfileInput: UpdateProfileInput;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Comment: Comment;
  ID: Scalars["ID"]["output"];
  String: Scalars["String"]["output"];
  CreateCommentInput: CreateCommentInput;
  CreatePostInput: CreatePostInput;
  CreateProfileInput: CreateProfileInput;
  Mutation: {};
  Post: Post;
  Profile: Profile;
  Query: {};
  UpdateCommentInput: UpdateCommentInput;
  UpdatePostInput: UpdatePostInput;
  UpdateProfileInput: UpdateProfileInput;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars["Boolean"]["output"];
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars["String"]["input"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = UnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars["String"]["input"];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars["Boolean"]["input"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars["String"]["input"]>;
};

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {};

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = IdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars["String"]["input"]>;
};

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = LinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {};

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars["String"]["input"];
};

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = MapDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  like?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Profile"]>>>,
    ParentType,
    ContextType
  >;
  likeId?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes["Profile"]>, ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCommentArgs, "comment">
  >;
  createPost?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    Partial<MutationCreatePostArgs>
  >;
  createProfile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateProfileArgs, "profile">
  >;
  deleteComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, "id">
  >;
  likeComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLikeCommentArgs, "commentId" | "ownerId">
  >;
  likePost?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLikePostArgs, "ownerId" | "postId">
  >;
  unLikeComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUnLikeCommentArgs, "commentId" | "ownerId">
  >;
  unLikePost?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUnLikePostArgs, "ownerId" | "postId">
  >;
  updateComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCommentArgs, "comment" | "id">
  >;
  updateProfile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProfileArgs, "id" | "profile">
  >;
};

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  chainId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  comment?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comment"]>>>,
    ParentType,
    ContextType
  >;
  ipfsHash?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  like?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Profile"]>>>,
    ParentType,
    ContextType
  >;
  likeId?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ID"]>>>,
    ParentType,
    ContextType
  >;
  owner?: Resolver<Maybe<ResolversTypes["Profile"]>, ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Profile"] = ResolversParentTypes["Profile"]
> = {
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  post?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Post"]>>>,
    ParentType,
    ContextType
  >;
  walletAddress?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  hello?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  posts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Post"]>>>,
    ParentType,
    ContextType
  >;
  profile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProfileArgs, "walletAddress">
  >;
  profiles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Profile"]>>>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};
